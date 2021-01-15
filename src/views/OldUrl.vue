<template>
  <div>
    <h1>Redirecting...</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

//import { mapState } from "vuex";
@Component
export default class OldUrl extends Vue {
  created(){
    const params = this.$route.params
    // Manage old url format
    const hash = this.$route.hash;
    // if (hash.match("^map=.*$")) {
        let hashValues = hash.replace('#map=', '')
        let hashArray = hashValues.split('/')
        // 0: zoom
        // 1: lon
        // 2: lat
        // 3: bearing
        // 4: pitch
        // 5: level
        this.$store.dispatch('updateMap',{
            center: [hashArray[1], hashArray[2]],
            pitch: hashArray[4],
            maxPitch: 60,
            bearing: hashArray[3],
            zoom: hashArray[0],
            country: params.country,
            building: 0
        })        
    // }
    this.$router.push({path: '/map'})
  }
}
</script>
