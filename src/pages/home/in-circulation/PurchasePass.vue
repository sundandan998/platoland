<template>
  <div class="Purchase-pass">
    <div class="Purchase-pass-header">
      <mt-header fixed :title="$t('m.purchasepass')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)"><span>{{$t('m.back')}}</span></mt-button>
      </mt-header>
    </div>
    <div class="Purchase-pass-content">
      <div class="Purchase-pass-content-top">
        <img :src="buyDataToken.icon" alt="" class="fl" />
        <span>{{buyDataToken.code}}({{buyDataToken.nickname}})</span>
        <span>{{buyDataToken.subject}}</span>
        <p>{{buyData.publish_name}}</p>
        <!-- <P>{{infoData}}</P> -->
      </div>
      <div class="Purchase-pass-content-bot">
        <img :src="buyData.d_icon" alt="" />
        <span>{{buyData.price}}</span>
      </div>
    </div>
    <div class="Purchase-pass-tabbar">
      <van-tabs @click="buyIndex">
        <van-tab :title="$t('m.number')">
          <mt-field :placeholder="buyName.low_number" type="number" v-model="reqPay.amount"></mt-field>
          <p>{{$t('m.available')}}: {{balData.available_amount}} {{this.detail.release.denominated_assets}}</p>
        </van-tab>
        <van-tab :title="$t('m.price')">
          <mt-field :placeholder="buyName.high_number" type="number" V-model="reqPay.amount"></mt-field>
          <p>{{$t('m.available')}}: {{balData.available_amount}} {{this.detail.release.denominated_assets}}</p>
        </van-tab>
      </van-tabs>
    </div>
    <div class="Purchase-pass-btn">
      <mt-button size="large" type="primary" @click="passwordShow" :disabled="disabled">{{$t('m.sure')}}</mt-button>
    </div>
    <div>
      <van-popup class="popupbox" position="bottom" v-model="popupVisible">
        <span v-if="buyTitle" class="paymentamount">{{reqPay.amount}}{{buyDataToken.code}}</span>
        <span v-else class="paymentamount">{{reqPay.amount}}{{buyData.denominated_assets}}</span>
        <van-password-input :value="value" @focus="showKeyboard = true" />
        <!-- 数字键盘 -->
        <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" delete-button-text="Delete"
          @blur="showKeyboard = false" />
      </van-popup>
    </div>
  </div>
</template>
<script>
	import { Toast } from 'mint-ui'
  import api from '@/api/market/Market.js'
  import { toast } from '@/assets/js/pub.js'
  export default {
    data() {
      return {
        value: '',
        showKeyboard: false,
        popupVisible: false,
        buyData: {},
        buyDataToken: {},
        buyName: {},
        // 键盘上标题
        buyTitle: true,
        disabled: true,
        // 请求支付参数
        reqPay: {
          order_type: 1,
          transaction_id: '',
          amount: '',
          action_type: 0
        },
        // 确认支付参数
        confirmPay: {
          order_type: '',
          payment_id: '',
          pay_pwd: ''
        },
        // 获取资产余额参数
        balanceData: {
          token_code: ''
        },
        balData: '',
      }
    },
    created() {
      this.buyDetail()
      this.buyDetailCode = this.$route.params
    },
    methods: {
      onInput(key) {
        this.value = (this.value + key).slice(0, 6)
      },
      onDelete() {
        this.value = this.value.slice(0, this.value.length - 1)
      },
      // 获取tab中index
      buyIndex(index, title) {
        if (index == 0) {
          this.buyTitle = true
          this.reqPay.action_type = 0
        } else {
          this.reqPay.action_type = 1
          this.buyTitle = false
        }
      },
      // 点击确定发送请求
      passwordShow() {
        // 判断pay_pwd_active是否为true,如果是true表示已经设置支付密码
        // 如果是false表示已为设置支付密码，不弹遮罩层，直接弹提示
        // 点击确定按钮发请求
        let pay_pwd = window.sessionStorage.getItem('pay_pwd_active')
        if (pay_pwd == 'true') {
          this.popupVisible = true
          // 请求支付
          this.reqPay.transaction_id = this.$route.params.id
          api.reqPay(this.reqPay).then(res => {
            if (res.code == 0) {
              this.confirmPay.order_type = res.order_type
              this.confirmPay.payment_id = res.transaction_id
            }
          }).catch(err => {
            if (err.code != 0) {
              toast(err)
            }
          })
        } else {
          Toast({
            message: '请先设置支付密码',
            position: 'top',
          })
        }
      },
      // 交易详情
      buyDetail() {
        api.buyDetail(this.$route.params).then(res => {
          this.buyData = res.data
          this.buyDataToken = res.data.token
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取资产余额
      balance() {
        this.balanceData.token_code = this.detail.release.denominated_assets
        api.balance(this.balanceData).then(res => {
          this.balData = res.data
        }).catch(err => {
          toast(err)
        })
      },
    },
    watch: {
      value() {
        if (this.value.length == 6) {
          this.confirmPay.pay_pwd = this.value
          // 清空密码输入框
          this.value = ''
          // 确认支付
          api.confirmPay(this.confirmPay).then(res => {
            if (res.code == 0) {
              toast(res)
              this.$router.push({
                path: '/deal'
              })
            }
          }).catch(err => {
            toast(err)
          })
        }
      },
      reqPay: {
        immediate: true,
        deep: true,
        handler(val) {
          if (val.amount != '') {
            this.disabled = false
          }
        }
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/global'
</style>