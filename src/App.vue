<template>
  <div id="app">
    <div :class="{blur_box:$store.getters.loading}">
      <router-view />
    </div>
    <div class="loadingbox" v-if="$store.getters.loading">
      <mt-spinner class="loading_show" :size="28" color="#1989fa" type="fading-circle"><span
          style="color:#1989fa">加载中...</span></mt-spinner>
    </div>
    <div class="loadingbox" v-if="num==5 && loading">
      <p class="loading_show">
        <mt-button size="small" @click="handleJump" type="default">网络不给力,请重新加载</mt-button>
      </p>
    </div>
  </div>
</template>
<script>
import api from "@/api/system/System.js"
  export default { 
  data() {
      return {
        versionData: '',
      }
    }, 
mounted() {
      this.version()
    },
methods: {
  //版本升级
      
}
}    
</script>      
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
    background: #fff;
    /* background: rgba(0, 0, 0, 0.5); */
    position: absolute;
    left: 0;
    top: 0px;
    bottom: 0;
    right: 0;
    z-index: 99;

  }

  .loading_show {
    color: #ccc;
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
        loading: false,
        num:0
      };
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() { },
    methods: {
      handleJump() {
        this.$router.go(0)
      }
    },
    watch: {
      num: {
        deep: true,
        immediate: true,
        handler(val) {
          this.loading = this.$store.getters.loading
          if (this.num < 5) {
            setTimeout(() => {
              this.num++
            }, 1000)
          }
        }
      }
    }
  };
</script>