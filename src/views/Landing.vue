<template>
  <div>
    <h1>Redirecting...</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

//import { mapState } from "vuex";
@Component
export default class Landing extends Vue {
  created() {
    const params = this.$route.params;
    this.$store.dispatch("updateMap", {
      center:
        params.long && params.lat
          ? [params.long, params.lat]
          : [-1.7030681187784467, 48.11947479723537],
      pitch: params.pitch ? params.pitch : 60,
      maxPitch: 60,
      bearing: params.bearing ? params.bearing : 0,
      zoom: params.zoom ? params.zoom : 18,
      country: params.country ? params.country : "france",
      building: params.building ? params.building : "",
      floor: params.floor ? params.floor : ""
    });

    this.$router.push({ path: "/map" });
  }
}
</script>
