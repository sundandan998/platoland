<template>
  <div id="app">
    <div :class="{blur_box:$store.getters.loading}">
      <router-view />
    </div>
    <div class="loadingbox" v-if="$store.getters.loading">
      <mt-spinner class="loading_show" :size="28" color="#1989fa" type="fading-circle"><span
          style="color:#1989fa">加载中...</span></mt-spinner>
    </div>
  </div>
</template>

<style lang="scss">
  /* prettier-ignore */
  #app {
    font-family: "微软雅黑";
  }

  .blur_box {
    filter: blur(5px);
  }

  .loadingbox {
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
  }

  .loading_show {

    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<script>
  export default {
    data() {
      return {
        loading: false
      };
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() { },
    methods: {},
    watch: {}
  };
</script>