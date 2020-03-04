<template>
  <div class="certification-token">
    <div class="token-header header">
      <mt-header fixed title="认证通证">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="certification-token-body">
      <p>通过LIFE+ 合约管理地址向下方地址转入一笔</p>
      <div class="certification-token-btn">
        <mt-button size="large" type="primary" @click.native="turn">已转入</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
  import api from "@/api/token/Token.js"
  import { toast } from '@/assets/js/pub.js'
  export default {
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
      turn() {
        api.confirmApply({ order_id: this.$route.params.order_id }).then(res => {
          if (res.code == 0) {
            this.$router.push({
              name: 'UnderReview',
              params: { token: res.data.token,time:res.data.create_time}
            })
          }
        }).catch(err => {
          toast(err)
        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../../assets/scss/global';

  .certification-token {
    .certification-token-btn {
      position: fixed;
      bottom: 10px;
      width: 100%;
    }
  }
</style>