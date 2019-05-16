<template>
  <app-tabber/>
</template>
<script>
  import Tabber from './../../../assets/pub/Tabber.vue'
  export default {
     data () {
       return {
      selected: 'explore'
      }
     },
    components: {
    'app-tabber': Tabber
  },
  }
</script>
