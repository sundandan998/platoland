<template>
  <div class="Purchase-pass">
    <div class="Purchase-pass-header header">
      <mt-header fixed :title="$t('m.buyToken')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)"><span>{{$t('m.back')}}</span></mt-button>
      </mt-header>
    </div>
    <div class="purchase-pass-content">
      <div class="purchase-pass-content-top">
        <img :src="buyDataToken.icon" alt="" class="fl" />
        <span>{{buyDataToken.code}}({{buyDataToken.nickname}})</span>
        <span>{{buyDataToken.subject}}</span>
        <p>{{buyData.publish_name}}</p>
        <!-- <P>{{infoData}}</P> -->
      </div>
      <div class="purchase-pass-content-bot">
        <img :src="buyData.d_icon" alt="" />
        <span>{{buyData.price|number}}</span>
      </div>
    </div>
    <!-- 备注 -->
    <div class="note">
      <p>{{$t('m.remark')}}</p>
    </div>
    <div class="purchase-pass-tabbar">
      <van-tabs @click="buyIndex">
        <van-tab :title="$t('m.numBuy')">
          <mt-field :placeholder="buyData.low_number+$t('m.purchase')" type="number" v-model="reqPay.amount"></mt-field>
          <p>{{$t('m.available')}}: {{balData.available_amount|number}} {{buyData.denominated_assets}}</p>
        </van-tab>
        <van-tab :title="$t('m.priceBuy')">
          <mt-field :placeholder="buyData.low_number* buyData.price+$t('m.purchase')" type="number"
            v-model="reqPay.amount">
          </mt-field>
          <p>{{$t('m.available')}}: {{balData.available_amount|number}} {{buyData.denominated_assets}}</p>
        </van-tab>
      </van-tabs>
    </div>
    <div class="purchase-pass-btn">
      <mt-button size="large" type="primary" @click="passwordShow" :disabled="disabled">{{$t('m.sure')}}</mt-button>
    </div>
    <div>
      <van-popup class="popupbox" position="bottom" v-model="popupVisible">
        <span v-if="buyTitle"
          class="paymentamount">{{reqPay.amount*buyData.price}}&nbsp;({{buyData.denominated_assets}})</span>
        <!-- <span  v-if="buyTitle" class="paymentamount">{{reqPay.amount}}&nbsp;({{buyData.denominated_assets}})</span> -->
        <span v-else class="paymentamount">{{reqPay.amount}}&nbsp;({{buyData.denominated_assets}})</span>
        <van-password-input :value="value" @focus="showKeyboard = true" />
        <!-- 数字键盘 -->
        <van-number-keyboard  :show="showKeyboard" @input="onInput" @delete="onDelete" delete-button-text="Delete"
          @blur="showKeyboard = false" />
      </van-popup>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { Toast } from 'mint-ui'
  import api from '@/api/market/Market.js'
  import { toast } from '@/assets/js/pub.js'
  import { MessageBox } from 'mint-ui'
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
      this.balance()
      this.buyIndex(0, '111')
      // console.log(this.$route.params.code)
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
          this.balance()
        } else {
          this.reqPay.action_type = 1
          this.buyTitle = false
          this.balance()
        }
      },
      // 点击确定发送请求
      passwordShow() {
        // 判断pay_pwd_active是否为true,如果是true表示已经设置支付密码
        // 如果是false表示已为设置支付密码，不弹遮罩层，直接弹提示
        // 点击确定按钮发请求
        let pay_pwd = window.sessionStorage.getItem('pay_pwd_active')
        if (pay_pwd == 'true') {
          // 请求支付
          this.reqPay.transaction_id = this.$route.params.id
          api.reqPay(this.reqPay).then(res => {
            if (res.code == 0) {
              this.value = ''
              this.popupVisible = true
              this.confirmPay.order_type = res.order_type
              this.confirmPay.payment_id = res.transaction_id
            }
          }).catch(err => {
            if (err.code != 0) {
              toast(err)
              this.popupVisible = false
            }
          })
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
      // 交易详情
      buyDetail() {
        api.buyDetail({ id: this.$route.params.id }).then(res => {
          this.buyData = res.data
          this.buyDataToken = res.data.token
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取资产余额
      balance() {
        this.balanceData.token_code = this.$route.params.code
        api.balance(this.balanceData).then(res => {
          this.balData = res.data
        }).catch(err => {
          toast(err)
        })
      },
    },
    computed: {
      ...mapGetters([
        'detail'
      ])
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
          } else {
            this.disabled = true
          }
        }
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/global';

  .Purchase-pass {
    .purchase-pass-content {
      background-color: #fff;
      margin: 10px 24px;
      border-radius: 10px;
      padding: 10px;

      img {
        margin-right: 10px;
      }

      .purchase-pass-content-top {
        span {
          display: block;
        }

        p {
          margin: 10px 0 0 75px;
        }
      }

      .purchase-pass-content-bot {
        margin-top: 10px;
        margin-left: 70px;

        img {
          width: 35px;
          margin-left: 5px;
          position: relative;
          top: 5px;
        }
      }
    }
    .note{
			margin: 10px 24px;
			background-color: #fff;
		}
    .purchase-pass-tabbar {
      margin: 0 24px;
      height: 250px;
      border-radius: 10px;
      background-color: #fff;

      .van-tabs--line .van-tabs__wrap {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }

      p {
        margin-left: 15px;
      }
    }

    .purchase-pass-btn {
      width: 100%;
      position: fixed;
      bottom: 10px;
    }
  }
</style>