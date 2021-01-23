export const styleJson = {
  version: 8,
  id: "openindoor",
  name: "openindoor",
  center: [0, 0],
  sprite: "https://app-sandbox.openindoor.io/sprite/sprite",
  glyphs: "https://app-sandbox.openindoor.io/fonts/{fontstack}/{range}.pbf",
  sources: {
    none: {
      type: "vector",
      url: ""
    },
    "raster-tiles": {
      type: "raster",
      tiles: [
        "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
        "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ],
      tileSize: 256
    },
    building: {
      type: "geojson", // vector
      url:
        "https://api.openindoor.io/geojson/data/france/FranceToulouseUniversiteToulouseJeanJaures.geojson",
      minzoom: 14,
      maxzoom: 19
    },
    shape: {
      type: "geojson", // vector
      url:
        "https://api.openindoor.io/geojson/data/france/FranceToulouseUniversiteToulouseJeanJaures.geojson",
      minzoom: 15,
      maxzoom: 19
    },
    indoor: {
      type: "geojson", //vector
      url:
        "https://api.openindoor.io/geojson/data/france/FranceToulouseUniversiteToulouseJeanJaures.geojson",
      minzoom: 19
    }
  },
  layers: [
    {
      id: "background",
      type: "background",
      paint: {
        "background-color": "#e0dfdf"
      }
    },
    {
      id: "simple-tiles",
      type: "raster",
      source: "raster-tiles",
      minzoom: 0,
      maxzoom: 19,
      "raster-opacity": ["interpolate", ["linear"], ["zoom"], 18, 1, 19, 0]
    },
    {
      id: "poi-indoor-room",
      type: "symbol",
      "source-layer": "osm-indoor",
      source: "indoor",
      minzoom: 19,
      interactive: true,
      filter: ["all", ["==", ["get", "indoor"], "room"]],
      layout: {
        "text-line-height": 1.2,
        "icon-size": {
          base: 1,
          stops: [
            [17, 0.5],
            [20, 1]
          ]
        },
        "text-size": {
          base: 1,
          stops: [
            [17, 11],
            [20, 13]
          ]
        },
        "text-allow-overlap": false,
        "icon-image": "",
        "icon-anchor": "center",
        "text-ignore-placement": false,
        "text-max-angle": 38,
        "symbol-spacing": 250,
        "text-font": ["Open Sans Regular"],
        "symbol-placement": "point",
        "text-padding": 2,
        visibility: "visible",
        "text-offset": [0, 1],
        "icon-optional": false,
        "text-rotation-alignment": "viewport",
        "text-anchor": "top",
        "text-field": "{name}",
        "text-letter-spacing": 0.02,
        "text-max-width": 8,
        "icon-allow-overlap": true
      },
      paint: {
        "text-color": "#65513d",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
        "text-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        },
        "icon-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        }
      }
    },
    {
      id: "poi-indoor-shop",
      type: "symbol",
      "source-layer": "osm-indoor",
      source: "indoor",
      minzoom: 19,
      interactive: true,
      filter: ["any", ["has", "shop"]],
      layout: {
        "text-line-height": 1.2,
        "icon-size": {
          base: 1,
          stops: [
            [17, 0.5],
            [20, 1]
          ]
        },
        "text-size": {
          base: 1,
          stops: [
            [17, 11],
            [20, 13]
          ]
        },
        "text-allow-overlap": false,
        "icon-image": "shop_64",
        "icon-anchor": "center",
        "text-ignore-placement": false,
        "text-max-angle": 38,
        "symbol-spacing": 250,
        "text-font": ["Open Sans Regular"],
        "symbol-placement": "point",
        "text-padding": 2,
        visibility: "visible",
        "text-offset": [0, 1],
        "icon-optional": false,
        "text-rotation-alignment": "viewport",
        "text-anchor": "top",
        "text-field": "{name}",
        "text-letter-spacing": 0.02,
        "text-max-width": 8,
        "icon-allow-overlap": true
      },
      paint: {
        "text-color": "#65513d",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
        "text-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        },
        "icon-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        }
      }
    },
    {
      id: "poi-indoor-fast-food",
      type: "symbol",
      "source-layer": "osm-indoor",
      source: "indoor",
      minzoom: 19,
      interactive: true,
      filter: ["all", ["==", ["get", "amenity"], "fast_food"]],
      layout: {
        "text-line-height": 1.2,
        "icon-size": {
          base: 1,
          stops: [
            [17, 0.5],
            [20, 1]
          ]
        },
        "text-size": {
          base: 1,
          stops: [
            [17, 11],
            [20, 13]
          ]
        },
        "text-allow-overlap": false,
        "icon-image": "fast_food_64",
        "icon-anchor": "center",
        "text-ignore-placement": false,
        "text-max-angle": 38,
        "symbol-spacing": 250,
        "text-font": ["Open Sans Regular"],
        "symbol-placement": "point",
        "text-padding": 2,
        visibility: "visible",
        "text-offset": [0, 1],
        "icon-optional": false,
        "text-rotation-alignment": "viewport",
        "text-anchor": "top",
        "text-field": "{name}",
        "text-letter-spacing": 0.02,
        "text-max-width": 8,
        "icon-allow-overlap": true
      },
      paint: {
        "text-color": "#65513d",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
        "text-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        },
        "icon-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        }
      }
    },
    {
      id: "poi-indoor-toilets",
      type: "symbol",
      "source-layer": "osm-indoor",
      source: "indoor",
      minzoom: 19,
      interactive: true,
      filter: ["all", ["==", ["get", "amenity"], "toilets"]],
      layout: {
        "text-line-height": 1.2,
        "icon-size": {
          base: 1,
          stops: [
            [17, 0.5],
            [20, 1]
          ]
        },
        "text-size": {
          base: 1,
          stops: [
            [17, 11],
            [20, 13]
          ]
        },
        "text-allow-overlap": false,
        "icon-image": "toilet_64",
        "icon-anchor": "center",
        "text-ignore-placement": false,
        "text-max-angle": 38,
        "symbol-spacing": 250,
        "text-font": ["Open Sans Regular"],
        "symbol-placement": "point",
        "text-padding": 2,
        visibility: "visible",
        "text-offset": [0, 1],
        "icon-optional": false,
        "text-rotation-alignment": "viewport",
        "text-anchor": "top",
        "text-field": "{name}",
        "text-letter-spacing": 0.02,
        "text-max-width": 8,
        "icon-allow-overlap": true
      },
      paint: {
        "text-color": "#65513d",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
        "text-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        },
        "icon-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        }
      }
    },
    {
      id: "poi-indoor-shop-coffee",
      type: "symbol",
      "source-layer": "osm-indoor",
      source: "indoor",
      minzoom: 19,
      interactive: true,
      filter: ["all", ["==", ["get", "amenity"], "cafe"]],
      layout: {
        "text-line-height": 1.2,
        "icon-size": {
          base: 1,
          stops: [
            [17, 0.5],
            [20, 1]
          ]
        },
        "text-size": {
          base: 1,
          stops: [
            [17, 11],
            [20, 13]
          ]
        },
        "text-allow-overlap": false,
        "icon-image": "cafe_64",
        "icon-anchor": "center",
        "text-ignore-placement": false,
        "text-max-angle": 38,
        "symbol-spacing": 250,
        "text-font": ["Open Sans Regular"],
        "symbol-placement": "point",
        "text-padding": 2,
        visibility: "visible",
        "text-offset": [0, 1],
        "icon-optional": false,
        "text-rotation-alignment": "viewport",
        "text-anchor": "top",
        "text-field": "{name}",
        "text-letter-spacing": 0.02,
        "text-max-width": 8,
        "icon-allow-overlap": true
      },
      paint: {
        "text-color": "#65513d",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
        "text-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        },
        "icon-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        }
      }
    },
    {
      id: "poi-indoor-shop-cosmetics",
      type: "symbol",
      "source-layer": "osm-indoor",
      source: "indoor",
      minzoom: 19,
      interactive: true,
      filter: ["any", ["==", ["get", "shop"], "cosmetics"]],
      layout: {
        "text-line-height": 1.2,
        "icon-size": {
          base: 1,
          stops: [
            [17, 0.5],
            [20, 1]
          ]
        },
        "text-size": {
          base: 1,
          stops: [
            [17, 11],
            [20, 13]
          ]
        },
        "text-allow-overlap": false,
        "icon-image": "perfumery_64",
        "icon-anchor": "center",
        "text-ignore-placement": false,
        "text-max-angle": 38,
        "symbol-spacing": 250,
        "text-font": ["Open Sans Regular"],
        "symbol-placement": "point",
        "text-padding": 2,
        visibility: "visible",
        "text-offset": [0, 1],
        "icon-optional": false,
        "text-rotation-alignment": "viewport",
        "text-anchor": "top",
        "text-field": "{name}",
        "text-letter-spacing": 0.02,
        "text-max-width": 8,
        "icon-allow-overlap": true
      },
      paint: {
        "text-color": "#65513d",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
        "text-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        },
        "icon-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        }
      }
    },
    {
      id: "poi-indoor-shop-clothes",
      type: "symbol",
      "source-layer": "osm-indoor",
      source: "indoor",
      minzoom: 19,
      interactive: true,
      filter: ["any", ["==", ["get", "shop"], "clothes"]],
      layout: {
        "text-line-height": 1.2,
        "icon-size": {
          base: 1,
          stops: [
            [17, 0.5],
            [20, 1]
          ]
        },
        "text-size": {
          base: 1,
          stops: [
            [17, 11],
            [20, 13]
          ]
        },
        "text-allow-overlap": false,
        "icon-image": "clothing_store_64",
        "icon-anchor": "center",
        "text-ignore-placement": false,
        "text-max-angle": 38,
        "symbol-spacing": 250,
        "text-font": ["Open Sans Regular"],
        "symbol-placement": "point",
        "text-padding": 2,
        visibility: "visible",
        "text-offset": [0, 1],
        "icon-optional": false,
        "text-rotation-alignment": "viewport",
        "text-anchor": "top",
        "text-field": "{name}",
        "text-letter-spacing": 0.02,
        "text-max-width": 8,
        "icon-allow-overlap": true
      },
      paint: {
        "text-color": "#65513d",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
        "text-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        },
        "icon-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        }
      }
    },
    {
      id: "poi-indoor-shop-electronics",
      type: "symbol",
      "source-layer": "osm-indoor",
      source: "indoor",
      minzoom: 19,
      interactive: true,
      filter: ["any", ["==", ["get", "shop"], "electronics"]],
      layout: {
        "text-line-height": 1.2,
        "icon-size": {
          base: 1,
          stops: [
            [17, 0.5],
            [20, 1]
          ]
        },
        "text-size": {
          base: 1,
          stops: [
            [17, 11],
            [20, 13]
          ]
        },
        "text-allow-overlap": false,
        "icon-image": "electronics_64",
        "icon-anchor": "center",
        "text-ignore-placement": false,
        "text-max-angle": 38,
        "symbol-spacing": 250,
        "text-font": ["Open Sans Regular"],
        "symbol-placement": "point",
        "text-padding": 2,
        visibility: "visible",
        "text-offset": [0, 1],
        "icon-optional": false,
        "text-rotation-alignment": "viewport",
        "text-anchor": "top",
        "text-field": "{name}",
        "text-letter-spacing": 0.02,
        "text-max-width": 8,
        "icon-allow-overlap": true
      },
      paint: {
        "text-color": "#65513d",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
        "text-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        },
        "icon-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        }
      }
    },
    {
      id: "poi-indoor-shop-jewelry",
      type: "symbol",
      "source-layer": "osm-indoor",
      source: "indoor",
      minzoom: 19,
      interactive: true,
      filter: ["any", ["==", ["get", "shop"], "jewelry"]],
      layout: {
        "text-line-height": 1.2,
        "icon-size": {
          base: 1,
          stops: [
            [17, 0.5],
            [20, 1]
          ]
        },
        "text-size": {
          base: 1,
          stops: [
            [17, 11],
            [20, 13]
          ]
        },
        "text-allow-overlap": false,
        "icon-image": "jewelry_64",
        "icon-anchor": "center",
        "text-ignore-placement": false,
        "text-max-angle": 38,
        "symbol-spacing": 250,
        "text-font": ["Open Sans Regular"],
        "symbol-placement": "point",
        "text-padding": 2,
        visibility: "visible",
        "text-offset": [0, 1],
        "icon-optional": false,
        "text-rotation-alignment": "viewport",
        "text-anchor": "top",
        "text-field": "{name}",
        "text-letter-spacing": 0.02,
        "text-max-width": 8,
        "icon-allow-overlap": true
      },
      paint: {
        "text-color": "#65513d",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
        "text-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        },
        "icon-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        }
      }
    },
    {
      id: "poi-indoor-shop-bakery",
      type: "symbol",
      "source-layer": "osm-indoor",
      source: "indoor",
      minzoom: 19,
      interactive: true,
      filter: ["any", ["==", ["get", "shop"], "bakery"]],
      layout: {
        "text-line-height": 1.2,
        "icon-size": {
          base: 1,
          stops: [
            [17, 0.5],
            [20, 1]
          ]
        },
        "text-size": {
          base: 1,
          stops: [
            [17, 11],
            [20, 13]
          ]
        },
        "text-allow-overlap": false,
        "icon-image": "bakery_64",
        "icon-anchor": "center",
        "text-ignore-placement": false,
        "text-max-angle": 38,
        "symbol-spacing": 250,
        "text-font": ["Open Sans Regular"],
        "symbol-placement": "point",
        "text-padding": 2,
        visibility: "visible",
        "text-offset": [0, 1],
        "icon-optional": false,
        "text-rotation-alignment": "viewport",
        "text-anchor": "top",
        "text-field": "{name}",
        "text-letter-spacing": 0.02,
        "text-max-width": 8,
        "icon-allow-overlap": true
      },
      paint: {
        "text-color": "#65513d",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
        "text-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        },
        "icon-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        }
      }
    },
    {
      id: "poi-indoor-shop-dim",
      type: "symbol",
      "source-layer": "osm-indoor",
      source: "indoor",
      minzoom: 19,
      interactive: true,
      filter: ["any", ["==", ["get", "name"], "DIM"]],
      layout: {
        "text-line-height": 1.2,
        "icon-size": {
          base: 1,
          stops: [
            [17, 0.5],
            [20, 1]
          ]
        },
        "text-size": {
          base: 1,
          stops: [
            [17, 11],
            [20, 13]
          ]
        },
        "text-allow-overlap": false,
        "icon-image": "dim_64",
        "icon-anchor": "center",
        "text-ignore-placement": false,
        "text-max-angle": 38,
        "symbol-spacing": 250,
        "text-font": ["Open Sans Regular"],
        "symbol-placement": "point",
        "text-padding": 2,
        visibility: "visible",
        "text-offset": [0, 1],
        "icon-optional": false,
        "text-rotation-alignment": "viewport",
        "text-anchor": "top",
        "text-field": "{name}",
        "text-letter-spacing": 0.02,
        "text-max-width": 8,
        "icon-allow-overlap": true
      },
      paint: {
        "text-color": "#65513d",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
        "text-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        },
        "icon-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        }
      }
    },
    {
      id: "poi-indoor-shop-fnac",
      type: "symbol",
      "source-layer": "osm-indoor",
      source: "indoor",
      minzoom: 19,
      interactive: true,
      filter: ["any", ["==", ["get", "name"], "Fnac"]],
      layout: {
        "text-line-height": 1.2,
        "icon-size": {
          base: 1,
          stops: [
            [17, 0.5],
            [20, 1]
          ]
        },
        "text-size": {
          base: 1,
          stops: [
            [17, 11],
            [20, 13]
          ]
        },
        "text-allow-overlap": false,
        "icon-image": "fnac_64",
        "icon-anchor": "center",
        "text-ignore-placement": false,
        "text-max-angle": 38,
        "symbol-spacing": 250,
        "text-font": ["Open Sans Regular"],
        "symbol-placement": "point",
        "text-padding": 2,
        visibility: "visible",
        "text-offset": [0, 1],
        "icon-optional": false,
        "text-rotation-alignment": "viewport",
        "text-anchor": "top",
        "text-field": "{name}",
        "text-letter-spacing": 0.02,
        "text-max-width": 8,
        "icon-allow-overlap": true
      },
      paint: {
        "text-color": "#65513d",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
        "text-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        },
        "icon-opacity": {
          base: 1,
          stops: [
            [17, 0],
            [17.5, 0.5],
            [19, 1]
          ]
        }
      }
    },
    {
      id: "indoor-room-extrusion",
      "source-layer": "osm-indoor",
      source: "building",
      type: "fill-extrusion",
      minzoom: 19,
      filter: ["all", ["==", ["get", "indoor"], "room"]],
      paint: {
        "fill-extrusion-color": "#fddaa0",
        "fill-extrusion-height": 3,
        "fill-extrusion-base": 0,
        "fill-extrusion-opacity": 0.5
      }
    },
    {
      id: "indoor-area-extrusion",
      "source-layer": "osm-indoor",
      source: "building",
      type: "fill-extrusion",
      minzoom: 19,
      filter: ["all", ["==", ["get", "indoor"], "area"]],
      paint: {
        "fill-extrusion-color": "#9559f8",
        "fill-extrusion-height": 0,
        "fill-extrusion-base": 0,
        "fill-extrusion-opacity": 0.5
      }
    },
    {
      id: "indoor-indoor-extrusion",
      "source-layer": "osm-indoor",
      source: "building",
      type: "fill-extrusion",
      minzoom: 19,
      filter: ["all", ["has", "indoor"]],
      paint: {
        "fill-extrusion-color": "#ddb7b0",
        "fill-extrusion-height": 0,
        "fill-extrusion-base": 0,
        "fill-extrusion-opacity": 0.5
      }
    },
    {
      id: "indoor-highway-line",
      type: "line",
      "source-layer": "osm-indoor",
      source: "indoor",
      minzoom: 19,
      interactive: true,
      filter: ["all", ["has", "highway"]],
      paint: {
        "line-width": 5,
        "line-color": "#ebbc00"
      }
    },
    {
      id: "indoor-footway-line",
      type: "line",
      "source-layer": "osm-indoor",
      source: "indoor",
      minzoom: 19,
      interactive: true,
      filter: [
        "all",
        ["has", "highway"],
        ["==", ["get", "highway"], "footway"]
      ],
      paint: {
        "line-width": 5,
        "line-color": "#ff0000"
      }
    },
    {
      id: "shape-area-extrusion-indoor-00",
      "source-layer": "osm-indoor",
      source: "shape",
      type: "fill-extrusion",
      minzoom: 15,
      maxzoom: 19,
      filter: [
        "all",
        ["has", "indoor"],
        ["has", "level"],
        ["==", ["index-of", ";", ["get", "level"]], -1],
        [">=", ["to-number", ["get", "level"]], 0]
      ],
      paint: {
        "fill-extrusion-color": [
          "case",
          ["==", ["feature-state", "hover"], null],
          "#6a615b",
          ["boolean", ["feature-state", "hover"]],
          "#00ff00",
          "#6a615b"
        ],
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          18,
          ["*", 5, ["to-number", ["get", "level"]]],
          19,
          0
        ],
        "fill-extrusion-base": [
          "interpolate",
          ["linear"],
          ["zoom"],
          18,
          ["*", 5, ["to-number", ["get", "level"]]],
          19,
          0
        ],
        "fill-extrusion-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15.5,
          0,
          16.5,
          1
        ]
      }
    },
    {
      id: "building-part-extrusion",
      "source-layer": "osm-indoor",
      source: "building",
      type: "fill-extrusion",
      minzoom: 14,
      maxzoom: 19,
      filter: ["any", ["has", "building:part"], ["has", "building"]],
      paint: {
        "fill-extrusion-color": "#fcffe4",
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          18,
          ["case", ["has", "height"], ["to-number", ["get", "height"]], 30],
          19,
          0
        ],
        "fill-extrusion-base": [
          "interpolate",
          ["linear"],
          ["zoom"],
          18,
          [
            "case",
            ["has", "min_height"],
            ["to-number", ["get", "min_height"]],
            0
          ],
          19,
          0
        ],
        "fill-extrusion-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          14.5,
          0,
          16,
          0.5
        ]
      }
    }
  ]
};
