<template>
  <div class="my-token">
    <div class="token-header header">
      <mt-header fixed :title="$t('m.myToken')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <p class="select-token">选择您要认证的通证</p>
    <div class="token-list" v-for="item in listData">
      <mt-cell :title="item.code+'('+ item.nickname+')'" :label="item.subject">
        <img class="assets-icon" slot="icon" :src="item.icon">
        <mt-switch v-model="value"></mt-switch>
      </mt-cell>
    </div>
    <div class="token-list-button">
        <mt-button size="large" type="primary" :disabled="disabled">提交审核</mt-button>
    </div>
  </div>
</template>
<script>
  import api from "@/api/token/Token.js"
  export default {
    data() {
      return {
        listData: '',
        value:false,
        disabled:true,
      }
    },
    created() {
      this.list()
    },
    methods: {
      list() {
        api.tokenList().then(res => {
          this.listData = res.data
        }).catch(err => {

        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../../assets/scss/global';
  .my-token{
    .select-token{
      background-color: #fff;
      height: 60px;
      line-height:60px;
      padding-left: 24px;
    }
    .token-list{
      .mint-cell-label{
        padding-bottom: 10px;
      }
    }
    .token-list-button{
      position: fixed;
      bottom:10px;
      width: 100%;
    }
  }
</style>