<template>
  <div class="order">
    <mt-header fixed title="订单">
      <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      <mt-button icon slot="right">
        <router-link to="/detailedlist">
          <span>筛选</span><img src="../../../assets/images/filter.svg" alt>
        </router-link>
      </mt-button>
    </mt-header>
  </div>
</template>
<script></script>
<style lang="scss">
	@import '../../../assets/scss/global'
</style>