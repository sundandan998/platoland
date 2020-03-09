<template>
  <div class="my-token">
    <div class="token-header header">
      <mt-header fixed :title="$t('m.myToken')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <p class="select-token">选择您要认证的通证</p>
    <div class="token-list" v-for="(item,index) in listData">
      <mt-cell :title="item.code+'('+ item.nickname+')'" :label="item.subject">
        <img class="assets-icon" slot="icon" :src="item.icon">
        <!-- <mt-switch  @change="turn(item,value,index)" v-model="item.value"></mt-switch> -->
      </mt-cell>
      <van-radio-group class="radio" v-model="radio">
        <van-radio :name="item.id" @click="turn(item)"/>
      </van-radio-group>
    </div>
    <div class="token-list-button">
      <mt-button size="large" type="primary" :disabled="disabled" @click.native="submit">提交审核</mt-button>
    </div>
  </div>
</template>
<script>
  import api from "@/api/token/Token.js"
  import { toast } from '@/assets/js/pub.js'
  export default {
    data() {
      return {
        listData: '',
        disabled: true,
        listData: '',
        radio: false,
        applyParams: {
          code: ''
        }
      }
    },
    created() {
      this.list()
    },
    methods: {
      // 列表
      list() {
        api.tokenList({ has_admin: false }).then(res => {
          this.listData = res.data
        }).catch(err => {

        })
      },
      turn(item) {
        this.applyParams.code = item.code
        if(this.radio!=''){
          this.disabled=false
        }
      },
      // 提交按钮
      submit() {
        api.Apply(this.applyParams).then(res => {
          if (res.code == 0) {
            this.$router.push({
              name: 'CertificationToken',
              // c
              params: { order_id: res.data.order_id, token: res.data.token, address: res.data.user_address }
            })
          }
        }).catch(err => {
          toast(err)
        })
      }
    },
  
  }
</script>
<style lang="scss">
  @import '../../../../assets/scss/global';

  .my-token {
    .select-token {
      background-color: #fff;
      height: 60px;
      line-height: 60px;
      padding-left: 24px;
    }

    .token-list {
      margin-top: 10px;
      height: 120px;

      .mint-cell-label {
        padding-bottom: 10px;
      }
    }

    .token-list-button {
      position: fixed;
      bottom: 10px;
      width: 100%;
    }

    .radio {
      position: relative;
      top: -70px;
      right: 20px;
      text-align: right;
    }
  }
</style>