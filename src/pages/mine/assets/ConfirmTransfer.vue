<template>
  <div class="confirm-transfer">
    <div class="confirm-transfer-notice">
      <van-notice-bar :scrollable="false">
        请仔细核实交易信息,交易成功后资产无法撤回
      </van-notice-bar>
    </div>
    <div class="confirm-transfer-info">
      <mt-cell title="收款人" :value="this.$route.params.transferParams.email"></mt-cell>
      <mt-cell title="数量" :value="this.$route.params.transferParams.amount"></mt-cell>
      <mt-cell title="手续费" :value="this.$route.params.token"></mt-cell>
    </div>
    <div class="confirm-transfer-progress" v-if="this.$route.params.transferParams.action=='freeze'">
      <span class="confirm-transfer-type">{{this.$route.params.transferParams.type}}</span>
      <p><span>{{this.$route.params.transferParams.num}}</span><span class="fr">还剩{{}}天解冻</span></p>
      <div class="confirm-transfer-num">
        <van-slider disabled />
      </div>
      <span>到期日 {{this.$route.params.transferParams.date}}</span>
    </div>
    <mt-button size="large" type="primary" @click.native="transfer">转让</mt-button>
    <!-- 数字键盘 -->
    <div>
      <van-popup class="popupbox" position="bottom" v-model="popupVisible">
        <span
          class="paymentamount">{{this.$route.params.transferParams.amount}}({{this.$route.params.transferParams.code}})</span>
        <van-password-input :value="value" @focus="showKeyboard = true" />
        <!-- 数字键盘 -->
        <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" delete-button-text="Delete"
          @blur="showKeyboard = false" />
      </van-popup>
    </div>
  </div>
</template>
<script>
  import api from "@/api/token/Token.js"
  import { toast } from '@/assets/js/pub.js'
  export default {
    data() {
      return {
        // pay_pwd: '',
        value: '',
        showKeyboard: false,
        popupVisible: false,
        confirmTransfer: {
          action: this.$route.params.transferParams.action,
          email: this.$route.params.transferParams.email,
          amount: this.$route.params.transferParams.amount,
          code: this.$route.params.transferParams.code,
          pay_pwd:'',
          order_id: this.$route.params.transferParams.order_id
        }
      }
    },
    created() {
      document.title = '确认转让'
    },
    methods: {
      onInput(key) {
        this.value = (this.value + key).slice(0, 6)
      },
      onDelete() {
        this.value = this.value.slice(0, this.value.length - 1)
      },
      //转让
      transfer() {
        this.popupVisible = true
      }
    },
    watch: {
      value() {
        if (this.value.length == 6) {
          this.confirmTransfer.pay_pwd = this.value
          api.transfer(this.confirmTransfer).then(res => {
            if (res.code === 0) {
              toast(res)
            }
          }).catch(err => {
            if (err.code !== 0) {
              toast(err)
            }
          })
          this.value = ''
          this.popupVisible = false
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

  .confirm-transfer {
    button {
      position: fixed;
      bottom: 10px;
    }
  }

  .confirm-transfer-progress {
    margin: 0 10px 0 20px;

    .confirm-transfer-type {
      padding-bottom: 10px;
      display: block;
    }

    .confirm-transfer-num {
      margin: 15px 0 20px 0px;
    }
  }
</style>