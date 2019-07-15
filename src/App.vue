<template>
  <div id="app">
    <router-view />
   <!-- loading加载 -->
   <div class="loadingBox" v-if="$store.getters.loading">
      <van-loading type="spinner" color="#1989fa" vertical >加载中...</van-loading>
   </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
</style>