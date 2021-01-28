<template>
  <div>
    <div
      :style="{ height: fullHeight, width: fullWidth }"
      class="map-wr"
      ref="map"
    ></div>
    <div class="g-link">
      <a-button type="dashed" @click="generateLink">
        Generate Link
      </a-button>
    </div>
    <a-modal v-model="linkVisible" title="Link Info" @ok="handleOk">
      <a-row type="flex" justify="center">
        <a-col span="20">
          <a-alert :message="this.link" type="success" show-icon />
        </a-col>
        <a-col span="4" class="text-center">
          <a-button type="primary" icon="copy" @click="copyLink" />
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import mapboxgl from "mapbox-gl";
import OpenIndoor from "../custom-gl/src/index";
import store from "../store";
import { State } from "vuex-class";
import { MapState, Map } from "../types";
import config from "../config";

const OpenMap = namespace("OpenMap");

@Component
export default class MapComponent extends Vue {
  @Prop() private!: string;
  link = "";
  map: any = {};
  focus: any = [];
  zoom: any = 17;
  openIndoor: any;
  focusLevel: any;
  select: any;
  hoveredBuilding: any;
  hovered: any;
  hoveredLevels: any;
  linkVisible = false;
  fullHeight = window.innerHeight + "px";
  fullWidth = window.innerWidth + "px";
  level = 0;
  btnText = "Copy Link to Clipboard";

  get mapState(): Map {
    const map = this.$store.state.map;
    return map;
  }

  trucateDecimal(number, decimalPlaces) {
    return +parseFloat(number).toFixed(decimalPlaces);
  }

  generateLink() {
    //landing/thailand/100.55532/13.98083/17/51/60/0/0
    const cen = this.map.getCenter();

    const longitude = this.trucateDecimal(cen.lng, 6);
    const latitude = this.trucateDecimal(cen.lat, 6);
    const zoomLevel = this.trucateDecimal(this.map.getZoom(), 4);
    const bearing = this.trucateDecimal(this.map.getBearing(), 4);

    this.link = `${window.location.protocol}//${window.location.host}/map/${
      this.mapState.country
    }/${longitude}/${latitude}/${zoomLevel}/${bearing}/${this.map.getPitch()}/${
      typeof this.openIndoor !== "undefined" ? this.openIndoor.level : "0"
    }/0  
      `;
    this.linkVisible = true;
  }

  copyLink() {
    // Dynamically create / destroy input element for copying text
    const inputElement = document.createElement("input");
    inputElement.value = this.link.trim();
    document.body.appendChild(inputElement);
    inputElement.select();
    document.execCommand("copy");
    document.body.removeChild(inputElement);
  }

  handleOk() {
    this.linkVisible = false;
  }

  created() {
    const params = this.$route.params;
    this.$store.dispatch("updateMap", {
      center:
        params.long && params.lat
          ? [params.long, params.lat]
          : [-1.7030681187784467, 48.11947479723537],
      pitch: params.pitch ? Number(params.pitch) : 60,
      maxPitch: 60,
      bearing: params.bearing ? Number(params.bearing) : 51,
      zoom: params.zoom ? Number(params.zoom) : 17,
      country: params.country ? params.country : "france",
      building: params.building ? params.building : "",
      floor: params.floor ? Number(params.floor) : ""
    });

    if (this.mapState.floor !== "") {
      this.level = Number(this.mapState.floor);
    }
  }
  mounted() {
    /*this.$store.watch(
    (state:MapState)=>{
        return state.map
    },
    (d)=>{
        alert(1);
        debugger;
      
    },
    {
        deep: true //add this if u need to watch object properties change etc.
    }
  );*/
    this.renderMap();
    this.addControl();
    this.bindEvent();
  }

  renderMap() {
    this.map = new mapboxgl.Map({
      container: this.$refs.map as HTMLElement,
      style: `${config.APP_URL}/style/openindoorStyle_${this.mapState.country}.json`,
      center: this.mapState.center,
      pitch: this.mapState.pitch,
      maxPitch: this.mapState.maxPitch,
      bearing: this.mapState.bearing,
      zoom: this.mapState.zoom,
      attributionControl: false,
      trackResize: true
    });
  }

  addControl() {
    this.map.addControl(new mapboxgl.FullscreenControl(), "bottom-right");
  }

  resizeMap() {
    this.fullHeight = window.innerHeight + "px";
    this.fullWidth = window.innerWidth + "px";
    setTimeout(() => {
      this.map.resize();
    }, 0);
  }

  bindEvent() {
    const that = this;
    window.addEventListener("resize", this.resizeMap);
    window.addEventListener("orientationchange", this.resizeMap);
    that.map.on("mousemove", e => {
      const features = that.map.queryRenderedFeatures(e.point, {
        // layers: ["building-part-extrusion"],
      });

      //(features);
      //return all feature
      const allFeatures = that.map.queryRenderedFeatures();

      for (const feature of that.focus) {
        if (feature.id === null) {
          console.log(
            "Cannot manage feature without id field (01):",
            JSON.stringify(feature)
          );
          continue;
        }
        that.map.setFeatureState(feature, { hover: false });
      }

      const seen = {};
      that.hovered = features;

      // select focusLevel
      that.hoveredLevels = that.hovered.filter(function(feature) {
        if (
          "properties" in feature &&
          "level" in feature.properties &&
          !isNaN(feature.properties.level)
        ) {
          // console.log('feature.properties.level:', feature.properties.level);
          // console.log('typeof feature.properties.level:', typeof feature.properties.level);
          // console.log('isFinite:', isFinite(feature.properties.level));

          //   && typeof feature.properties.level === 'number'
          // && isFinite(feature.properties.level)

          return true;
        }
        return false;
      });
      // if (hovered.length > 0) {
      //   console.log('hoveredLevels:' + JSON.stringify(hoveredLevels));
      // }

      const maxLevel = Math.max(
        ...that.hoveredLevels.map(feature =>
          // console.log('level:', feature.properties.level)
          Number(feature.properties.level)
        )
      );

      that.focusLevel = isFinite(maxLevel) ? maxLevel : null;

      //console.log("focusLevel:", focusLevel)

      //VL++ coniddering it only one building
      that.hoveredBuilding = that.hovered.filter(
        feature =>
          "properties" in feature &&
          ("building" in feature.properties ||
            "building;part" in feature.properties)
      );
      //console.log(hoveredBuilding[0].properties["openindoor:id"])
      if (that.focusLevel !== undefined) {
        //console.log("Filtering by",hoveredBuilding[0])
        if (Number(that.zoom) >= 19) {
          that.focus = features;
        } else {
          that.focus = allFeatures.filter(
            feature =>
              feature.properties &&
              feature.properties.level &&
              that.hoveredBuilding[0] &&
              feature.properties["openindoor:id"] ==
                that.hoveredBuilding[0].properties["openindoor:id"] &&
              Number(feature.properties.level) === that.focusLevel
          );
        }
      } else {
        that.focus = [];
      }

      // const maxValues = hovered.map(item => Math.max(...item));

      let i = 0;
      //console.log(that.focus.map(el => el.properties["openindoor:id"]));
      for (const feature of that.focus) {
        if (feature.id === null) {
          console.log(
            "Cannot manage feature without id field (02):",
            JSON.stringify(feature)
          );
          continue;
        }
        //console.log(,feature.properties["openindoor:id"],hoveredBuilding[0].properties["openindoor:id"],hoveredBuilding)
        if (seen[feature.id] && Number(that.zoom) >= 19) continue;

        if (
          seen[feature.id] ||
          (Number(that.zoom) < 19 &&
            feature.properties["openindoor:id"] !==
              that.hoveredBuilding[0].properties["openindoor:id"])
        )
          continue;

        seen[feature.id] = true;
        //console.log(feature.properties["openindoor:id"],true)
        that.map.setFeatureState(feature, { hover: true });
        //        if (openIndoor) {
        //          level = focusLevel
        //          // console.log('set selected level:', level)
        //          openIndoor.setLevel(level)
        //        }

        //console.log("hover features:",feature.properties.id)
        i++;
      }
      /*console.log(
        that.map
          .queryRenderedFeatures()
          .filter(el => Object.keys(el.state).length)
      );*/
      //if(hoveredBuilding.length > 0)
      //console.log(map.queryRenderedFeatures().filter(el=>Object.keys(el.state).length && el.properties["openindoor:id"] !== hoveredBuilding[0].properties["openindoor:id"]))
      /*map.queryRenderedFeatures().filter(el=>Object.keys(el.state).length && el.properties["openindoor:id"] !== hoveredBuilding[0].properties["openindoor:id"]).forEach(f=>
      map.setFeatureState(f, { hover: false })
      )*/
    });

    that.map.on("click", e => {
      const features = that.map.queryRenderedFeatures(e.point, {
        // layers: ["building-part-extrusion"],
      });

      that.level = that.focusLevel;
      for (const feature of that.focus) {
        that.map.setFeatureState(feature, { select: false });
      }
      that.select = that.focus;
      if (that.openIndoor && that.level != null) {
        // that.map.setZoom(19);
        let coordinates = features[0].geometry.coordinates;
        //NOTE  handling two different type of coordinates for line and polygon type feature
        if (coordinates[0].length == 2) {
          coordinates = coordinates[0];
        } else {
          coordinates = coordinates[0][0];
        }

        that.map.flyTo({
          center: coordinates,
          zoom: 19
        });

        that.openIndoor.setLevel(that.level.toString());

        const mapState = Object.assign({}, that.mapState, {
          floor: that.level.toString()
        });
        that.$store.dispatch("updateMap", mapState);
      }
      for (const feature of that.select) {
        that.map.setFeatureState(feature, { select: true });
      }
    });

    that.map.on("moveend", function(event) {
      //spreserveDataPoints(false);
      that.updateMapStoreDetail();
    });

    that.map.on("wheel", function(event) {
      that.updateMapStoreDetail();
    });

    that.map.on("load", () => {
      that.map.loadImage("/custom_marker.png", (error, image) => {
        if (error) throw error;
        that.map.addImage("custom-marker", image);
        // Add a GeoJSON source with 2 points

        that.map.addSource("pins", {
          type: "geojson",
          data: `${config.API_URL}/places/pins/${this.mapState.country}`
        });
        that.map.addLayer({
          id: "pins",
          type: "symbol",
          source: "pins",
          layout: {
            "icon-image": "custom-marker",
            // get the title name from the source's "title" property
            "text-field": ["get", "title"],
            "text-font": ["Open Sans Regular"],
            "text-offset": [0, 1.25],
            "text-anchor": "top"
          }
        });
      });

      that.map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
      fetch(`${config.APP_URL}/style/indoor/indoorLayers.json`)
        .then(response => response.json())
        .then(response => {
          // debugger;
          const indoorLayers = response;
          console.log("indoorLayers:", indoorLayers);

          const INDOOR_SOURCE_ID = "indoor";
          const INDOOR_LAYER_ID = "osm-indoor";

          that.openIndoor = new OpenIndoor(that.map, {
            sourceId: INDOOR_SOURCE_ID,

            layerId: INDOOR_LAYER_ID,
            layers: indoorLayers,
            level: that.level.toString()
          });
          // add level control on map
          that.map.addControl(that.openIndoor);
        })
        .catch(error => alert("Erreur : " + error));
    });
  }

  updateMapStoreDetail() {
    const cen = this.map.getCenter();
    const longitude = this.trucateDecimal(cen.lng, 6);
    const latitude = this.trucateDecimal(cen.lat, 6);
    const zoomLevel = this.trucateDecimal(this.map.getZoom(), 4);
    const bearing = this.trucateDecimal(this.map.getBearing(), 4);

    // update store
    const mapState = Object.assign({}, this.mapState, {
      floor: this.map.getZoom() < 19 ? "" : this.level.toString(),
      center: [longitude, latitude],
      zoom: zoomLevel,
      bearing: bearing
    });
    this.$store.dispatch("updateMap", mapState);

    // :country?/:long?/:lat?/:zoom?/:bearing?/:pitch?/:floor?/:building?

    const postParams: {
      country: string;
      long: string;
      lat: string;
      zoom: string;
      bearing: string;
      pitch: string;
      floor: string;
      building: string;
    } = {
      country: "france",
      long: longitude.toString(),
      lat: latitude.toString(),
      zoom: zoomLevel.toString(),
      bearing: this.mapState.bearing.toString(),
      pitch: this.mapState.pitch.toString(),
      floor: "0",
      building: "0"
    };

    if (this.mapState.floor !== undefined && this.mapState.floor !== "") {
      // set floor only if it is set
      postParams.floor = this.mapState.floor;
    }

    if (this.mapState.building !== undefined && this.mapState.building !== "") {
      // set building only if it is set
      postParams.building = this.mapState.building;
    }

    this.$router
      .push({
        name: "Map",
        params: postParams
      })
      .catch(() => {
        // const error = err;
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.map-wr {
  width: 100%;
}

.g-link {
  position: absolute;
  left: 16px;
  top: 16px;
}

.text-center {
  text-align: center;
}
</style>
