<template>
  <div class="drawer">
    <div @click="open()">11111</div>
  
    <div class="setbox" :class="{show: isshow}">
      <div class="header">
        <p class="fl">标题</p>
        <button class="off" @click="close">关闭</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'demo',
    data() {
      return {
        isshow: false
      }
    },
    created(){
    },
    methods: {
      close() {
        this.isshow = false
      },
      open(){
        this.isshow = true
      }
    }
  }
</script>
<style lang="scss" scoped>
  .drawer {
    height: 500px;
    width:100%;
    display:flex;
    display:-webkit-flex;
    flex-direction:column;  
    .setbox{
        position:fixed;
        z-index:1000;
        top:0px;
        bottom:0px;
        width:50%;
        height:100%;
        background:gray;
        border-left: 1px solid #CFD8DC!important;
        box-shadow:0px 3px 12px rgba(0,0,0,0.12);
        -webkit-transition: all 0.3s ease;
        transition: all 0.3s ease;
        right:-460px;
        padding:0px 0px 0px 20px;
    }
    .show {
     right: 0;
    }
  }

</style>