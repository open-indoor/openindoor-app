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
  created(){
    const params = this.$route.params
    this.$store.dispatch('updateMap',{
        center: [params.long, params.lat],
        pitch: params.pitch,
        maxPitch: 60,
        bearing: params.bearing,
        zoom: params.zoom,
        country:params.country,
        building:params.building
    })

    this.$router.push({path: '/map'})
  }
}
</script>
