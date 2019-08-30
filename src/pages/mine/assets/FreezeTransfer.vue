<template>
  <div class="transfer">
    <div class="freeze-header">
      <mt-header fixed title="转让">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="transfer-content">
      <div class="transfer-progress-name">
        <span>收款人</span>
        <mt-field v-model="transferParams.email" placeholder="请输入收款人邮箱" type="email" @blur.native.capture="emailCheck" :state="emailStatus">
        </mt-field>
      </div>
      <div class="transfer-progress-amount">
        <span>数量</span>
        <mt-field placeholder="请输入数量" type="number" v-model="transferParams.amount"></mt-field>
        <span class="transfer-fee">手续费：0</span>
      </div>
    </div>
    <div class="transfer-button">
      <mt-button size="large" type="primary" @click="transfer" v-show="showBtn">转让</mt-button>
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        emailStatus: '',
        transferParams: {
          id: this.$route.params.id,
          code: this.$route.params.code,
          email: '',
          amount: '',
          action: 'freeze',
          type: this.$route.params.type,
          num: this.$route.params.num,
          date: this.$route.params.date,
          order_id: this.$route.params.order_id
        },
        // 解决底部按钮被弹起问题
        clientHeight: document.documentElement.clientHeight,
        showBtn: true,  // 控制按钮盒子显示隐藏
      }
    },
    created() {
      document.title = '转让'
    },
    // 解决底部按钮被弹起问题
    mounted() {
      window.onresize = () => {
        if (this.clientHeight > document.documentElement.clientHeight) {
          this.showBtn = false
        } else {
          this.showBtn = true
        }
      }
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

      },
      // 邮箱校验
      emailCheck() {
        var email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
        if (!email.test(this.transferParams.email)) {
          this.emailStatus = 'error'
        } else {
          this.emailStatus = 'success'
        }
      },
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/global';

  body {
    background-color: #fff;
  }

  .transfer {
    .transfer-button {
      button {
        position: fixed;
        bottom: 10px;
      }
    }

    .transfer-content {
      span {
        margin-left: 20px;
      }
    }

    .transfer-fee {
      color: #486FF0;
    }
  }
</style>