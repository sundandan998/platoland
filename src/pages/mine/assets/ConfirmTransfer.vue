<template>
  <div class="confirm-transfer">
    <div class="freeze-header">
      <mt-header fixed title="确认转让">
        <!-- v-on:click="$router.go(-2)" -->
        <mt-button icon="back"  slot="left"  v-on:click="$router.go(-2)">取消</mt-button>
      </mt-header>
    </div>
    <div class="confirm-transfer-notice">
      <van-notice-bar :scrollable="false">
        请仔细核实交易信息,交易成功后资产无法撤回
      </van-notice-bar>
    </div>
    <div class="confirm-transfer-info">
      <mt-cell title="收款人" :value="this.$route.params.transferParams.email"></mt-cell>
      <mt-cell title="数量"
        :value="this.$route.params.transferParams.amount+'('+this.$route.params.transferParams.code+')'"></mt-cell>
      <mt-cell title="手续费" value="0"></mt-cell>
    </div>
    <div class="confirm-transfer-progress" v-if="this.$route.params.transferParams.action=='freeze'">
      <span class="confirm-transfer-type">{{this.$route.params.transferParams.type}}</span>
      <p><span>{{this.$route.params.transferParams.num}}</span><span
          class="fr">还剩{{freezeData.unfreeze_date|days}}天解冻</span></p>
      <div class="confirm-transfer-num">
        <van-slider disabled :value="freezeData.unfreeze_date | total_days(freezeData.transaction_time)" />
      </div>
      <span>到期日 {{this.$route.params.transferParams.date}}</span>
    </div>
    <div class="confirm-transfer-button">
      <mt-button size="large" type="primary" @click.native="transfer">转让</mt-button>
      <!-- <mt-button size="large" type="primary" @click.native="transfer">转让</mt-button> -->
    </div>
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
        value: '',
        showKeyboard: false,
        popupVisible: false,
        confirmTransfer: {
          action: this.$route.params.transferParams.action,
          email: this.$route.params.transferParams.email,
          amount: this.$route.params.transferParams.amount,
          code: this.$route.params.transferParams.code,
          pay_pwd: '',
          order_id: this.$route.params.transferParams.order_id,
          out: this.$route.params.transferParams.out
        },
        freezeData: []
      }
    },
    created() {
      document.title = '确认转让'
      this.freeze()
      // console.log(this.$route.params.transferParams)
      console.log(this.$route.params.transferParams.code)
    },
    methods: {
      onInput(key) {
        this.value = (this.value + key).slice(0, 6)
      },
      onDelete() {
        this.value = this.value.slice(0, this.value.length - 1)
      },
      // 判断是否设置支付密码
      setPwd() {
        let pay_pwd = window.sessionStorage.getItem('pay_pwd_active')
        if (pay_pwd == 'true') {
          this.popupVisible = true
        } else {
          this.$messagebox({
            title: '提示',
            message: `请先设置支付密码再进行操作`,
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            showCancelButton: true
          }).then(action => {
            if (action == 'confirm') {
              this.$router.push({
                name: 'Safety'
                // params: { id: 'reservation' }
              })
            }
          })
        }
      },
      //转让
      transfer() {
        // 判断是否转到千企商城
        if (this.$route.params.transferParams.out == true) {
          this.$messagebox({
            title: '提示',
            message: `将转让至收款人千企商城账号是否继续?`,
            cancelButtonText: '取消',
            confirmButtonText: '继续',
            showCancelButton: true
          }).then(action => {
            if (action == 'confirm') {
              // 调用
              this.setPwd()
            }
          })
        } else {
          // 调用
          this.setPwd()
        }
      },
      // 冻结详情
      freeze() {
        api.detail({ order_id: this.$route.params.transferParams.order_id }).then(res => {
          this.freezeData = res.data
        }).catch(err => {
        })
      },
    },
    filters: {
      // 到期时间
      days(unfreeze_date) {
        let today = new Date()
        today.setHours(0, 0, 0, 0)
        let date = new Date(unfreeze_date + ' 00:00:00')
        let days_number = date - today
        return days_number / (24 * 3600 * 1000)
      },
      total_days(unfreeze_date, transaction_time) {
        let today = new Date()
        today.setHours(0, 0, 0, 0)
        let date = new Date(unfreeze_date + ' 00:00:00')
        let days_number = date - today
        let freeze_days = days_number / (24 * 3600 * 1000)
        let transaction_date = new Date(transaction_time.split(' ')[0] + ' 00:00:00')
        let holding_days = today - transaction_date
        holding_days = holding_days / (24 * 3600 * 1000)
        let percent = holding_days / (freeze_days + holding_days) * 100
        return percent
      },
    },
    watch: {
      value() {
        if (this.value.length == 6) {
          this.confirmTransfer.pay_pwd = this.value
          api.transfer(this.confirmTransfer).then(res => {
            if (res.code === 0) {
              toast(res)
              this.$router.push({
                name: 'OrderDetail',
                params: { order_id: res.order_id, path: 'confirm' }
              })
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
    .confirm-transfer-button {
      button {
        position: fixed;
        bottom: 10px;
      }
    }

    .freeze-header {
      margin-bottom: 20px;
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

    .van-slider__bar {
      border-radius: inherit;
      background-color: #ccc !important;
    }
  }
</style>