<template>
  <div class="transfer">
    <div class="transfer-progress-name">
      <span>收款人</span>
      <mt-field placeholder="输入收款人邮箱" v-model="transferParams.email"></mt-field>
    </div>
    <div class="transfer-progress-amount">
      <span>数量</span>
      <mt-field placeholder="请输入数量" type="number" v-model="transferParams.amount"></mt-field>
      <span class="transfer-fee">手续费：0</span>
    </div>
    <!-- <router-link :to="{name:'ConfirmTransfer',params:{transferParams:transferParams}}"> -->
    <mt-button size="large" type="primary" @click="transfer">转让</mt-button>
    <!-- </router-link> -->
  </div>
</template>
<script>
   import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        transferParams: {
          id:this.$route.params.id,
          code: this.$route.params.code,
          email: '',
          amount: '',
          action: 'freeze',
          type: this.$route.params.type,
          num: this.$route.params.num,
          date: this.$route.params.date,
          order_id: this.$route.params.order_id
        }
      }
    },
    created() {
      document.title = '转让'
      console.log(this.$route.params.id)
    },
    methods: {
      // 判断输入的邮箱和用户名不能为空
      transfer() {
        if (this.transferParams.email == '' || this.transferParams.amount == '') {
          Toast({
            message: '接收人和转出数量不能为空',
            className: 'zZindex'
          })
        } else {
          this.$router.push({
            name: 'ConfirmTransfer',
            params: { transferParams: this.transferParams }
          })
        }
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/global';

  body {
    background-color: #fff;
  }

  .transfer {
    button {
      position: fixed;
      bottom: 10px;
    }

    span {
      margin-left: 15px;
    }

    .transfer-fee {
      color: #486FF0;
    }
  }
</style>