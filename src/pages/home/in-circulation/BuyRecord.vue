<template>
  <div class="buy-record">
    <div class="buy-record-header">
			<mt-header fixed title="买入记录">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
			</mt-header>
    </div>
    <!-- 列表部分 -->
    <div class="buy-record-list">
      
    </div>
  </div>
</template>
<script></script>
<style lang="scss">
  @import '../../../assets/scss/global';
</style>