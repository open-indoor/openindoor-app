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

  generateLink() {
    //landing/thailand/100.55532/13.98083/17/51/60/0/0
    const cen = this.map.getCenter();

    this.link = `${window.location.protocol}//${window.location.host}/landing/${
      this.mapState.country
    }/${cen.lng}/${
      cen.lat
    }/${this.map.getZoom()}/${this.map.getBearing()}/${this.map.getPitch()}/${
      typeof this.openIndoor !== "undefined" ? this.openIndoor.level : "0"
    }/0  
      `;
    this.linkVisible = true;
  }

  copyLink() {
    navigator.clipboard.writeText(this.link);
  }

  handleOk() {
    this.linkVisible = false;
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
      that.level = that.focusLevel;
      for (const feature of that.focus) {
        that.map.setFeatureState(feature, { select: false });
      }
      that.select = that.focus;
      if (that.openIndoor && that.level != null) {
        that.map.setZoom(19);

        that.openIndoor.setLevel(that.level.toString());
      }
      for (const feature of that.select) {
        that.map.setFeatureState(feature, { select: true });
      }
    });

    that.map.on("moveend", function(event) {
      //spreserveDataPoints(false);
    });

    that.map.on("load", () => {
      that.map.loadImage("custom_marker.png", (error, image) => {
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
      fetch(`/style/indoor/indoorLayers.json`)
        .then(response => response.json())
        .then(response => {
          const indoorLayers = response;
          //console.log("indoorLayers:", indoorLayers);

          const INDOOR_SOURCE_ID = "indoor";
          const INDOOR_LAYER_ID = "osm-indoor";

          that.openIndoor = new OpenIndoor(that.map, {
            sourceId: INDOOR_SOURCE_ID,

            layerId: INDOOR_LAYER_ID,
            layers: indoorLayers,
            level: that.level.toString()
          });
          that.map.addControl(that.openIndoor);
        })
        .catch(error => alert("Erreur : " + error));
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
