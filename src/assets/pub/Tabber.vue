<template>
  <mt-tabbar  :selected.sync ="message" fixed>
    <!-- <mt-tab-item id="home"  @click.native="home">
      <img slot="icon" src="../../assets/images/home-b.svg" v-if="message == 'home'">
      <img slot="icon" src="../../assets/images/home.svg" v-else>
      <font :class="message === 'home'? 'color' :''">{{$t('m.homepage')}}</font>
    </mt-tab-item> -->
    <mt-tab-item id="home"  @click.native="home">
      <img slot="icon" src="../../assets/images/home-b.svg" v-if="message == 'home'">
      <img slot="icon" src="../../assets/images/home.svg"v-else>
      <font :class="message === 'home'? 'color' :''">{{$t('m.homepage')}}</font>
    </mt-tab-item>
    <!-- mt-tab-item id="explore" @click.native="explore">
      <img slot="icon" src="../../assets/images/explore-b.svg" v-if="message == 'explore'">
      <img slot="icon" src="../../assets/images/explore.svg"v-else>
      <font :class="message === 'explore'? 'color' :''">{{$t('m.explore')}}</font>
    </mt-tab-item -->
    <mt-tab-item id="mine"  @click.native="mine">
      <img slot="icon" src="../../assets/images/mine-b.svg" v-if="message == 'mine'">
      <img slot="icon" src="../../assets/images/mine.svg"v-else>
      <font :class="message === 'mine'? 'color' :''">{{$t('m.mine')}}</font>
    </mt-tab-item>
  </mt-tabbar>
</template>
<script>
export default {
  props:{
    message:{
      type:String,
      default:''
    }
  },
  data () {
    return {
    }
  },
  methods:{
    home(){
      this.$router.push({
        name:'Home'
      })
    },
    explore(){
      this.$router.push({
        name:'Explore'
      })
    },
    mine(){
      this.$router.push({
        name:'Mine'
      })
    }
  }
}
</script>
<style>
.color{color:#1296DB;}
</style>
