<template>
  <div class="buy-record">
    <div class="buy-record-header">
      <mt-header fixed title="买入记录">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <!-- 列表部分 -->
    <!-- <div class="buy-record-list" v-for="item in transactionList">
      <p><span>{{item.flow_type}}{{item.token.code}}</span><span>{{item.status}}</span></p>
      <p><span>时间</span>
        <span>价格</span>
        <span>数量</span></p>
      <p><span></span>
        <span></span>
        <span></span></p>
    </div> -->
  </div>
</template>
<script>
  import api from "@/api/user/User.js"

  export default {
    data() {
      return {
        transactionList:{}
      }
    },
    created() {
      this.transaction()
    },
    methods: {
      // transaction() {
      //   api.transaction().then(res => {
      //     if (res.code == 0) {
      //       this.transactionList = res.data
      //     }
      //   }).catch(err => {

      //   })
      // }
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/global';
  .buy-record-header{
    margin-bottom: 20px;
  }
</style>