<template>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="home" @click="home">
        <img slot="icon" src="../../assets/images/home-b.svg" v-if="this.selected == 'home'">
        <img slot="icon" src="../../assets/images/home.svg" v-else>
        {{$t('m.homepage')}}
      </mt-tab-item>
      <mt-tab-item id="explore" @click="explore">
        <img slot="icon" src="../../assets/images/explore-b.svg" v-if="this.selected == 'explore'">
        <img slot="icon" src="../../assets/images/explore.svg"v-else>
        {{$t('m.explore')}}
      </mt-tab-item>
      <mt-tab-item id="mine" @click="mine">
        <img slot="icon" src="../../assets/images/mine-b.svg" v-if="this.selected == 'mine'">
        <img slot="icon" src="../../assets/images/mine.svg"v-else>
        {{$t('m.mine')}}
      </mt-tab-item>
    </mt-tabbar>
</template>
<script>
export default {
data () {
    return {
      selected: 'home',
      // message:'home'
    }
  },
  methods:{
      home(){
        this.$router.push('/home')
      },
      explore(){
        this.$router.push('/explore')
      },
      mine(){
        this.$router.push('/mine')
      }
    }
}
</script>
