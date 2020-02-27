<template>
  <div class="buy-pass">
    <div class="buy-pass-header">
      <mt-header fixed :title="$t('m.purchaseToken')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <!-- token部分 -->
    <div class="buy-pass-token">
      <img :src="this.detail.token.icon" alt="" class="fl">
      <span>
        {{this.detail.token.code}} ( {{this.detail.token.name}} )
        <p>{{this.detail.token.subject}}</p>
      </span>
    </div>
  
    <!-- 发行期数 -->
    <div class="buy-pass-period">
      <div class="buy-pass-period-top">
        <div class="buy-pass-period-top-left fl">
          <span class="fl">{{this.detail.periods}}</span>
          <span class="fr">{{this.detail.issue_price|number}}</span>
        </div>
        <span class="fr">{{this.detail.freeze_days}}</span>
      </div>
      <div class="buy-pass-period-text">
        <div class="buy-pass-period-text-left fl">
          <span class="fl">{{$t('m.issuePeriod')}}({{$t('m.qi')}})</span>
          <span class="fr">{{$t('m.price')}}(USDT)</span>
        </div>
        <span class="fr">{{$t('m.term')}}({{$t('m.day')}})</span>
      </div>
      <div class="buy-pass-progress progress">
        <mt-progress :value="progress" :bar-height="7">
        </mt-progress>
        <div slot="start" class="fl">{{$t('m.sold')}} {{(this.detail.sold_number/this.detail.step_number).toFixed(0)}} {{$t('m.share')}}</div>
        <div slot="end" class="fr">{{$t('m.total')}} {{(this.detail.first_number/this.detail.step_number).toFixed(0)}} {{$t('m.share')}}</div>
      </div>
    </div>
    <!-- tab切换 -->
    <div class="buy-pass-tab">
      <van-tabs @click="getActionType">
        <van-tab :title="$t('m.buyShare')">
          <!-- @blur.native.capture="maxnum" -->
          <mt-field type="number" :placeholder="this.detail.purchase_number/this.detail.step_number+$t('m.share')+$t('m.purchase')"
            v-model="requsetPay.amount"></mt-field>
          <span>{{$t('m.transactionAmount')}}：{{requsetPay.amount*this.detail.issue_price*this.detail.step_number}}
            {{this.detail.denominated_assets}}</span>
        </van-tab>
        <van-tab :title="$t('m.priceBuy')">
          <mt-field
            :placeholder="$t('m.least')+this.detail.purchase_number/this.detail.step_number*detail.step_number*detail.issue_price"
            type="number" v-model="requsetPay.amount"> <b>{{this.detail.denominated_assets}}</b></mt-field>
          <span>{{$t('m.buyableShares')}}：{{requsetPay.amount/detail.step_number/this.detail.issue_price }} {{$t('m.share')}}</span>
        </van-tab>
        <div class="fr day">
          <p>{{$t('m.availableQuota')}}{{this.balanceData.available_amount|number}} {{this.detail.denominated_assets}}</p>
          <p>{{$t('m.unlockTime')}}:{{this.timeDate}}</p>
          <!-- <p>解锁日:{{this.date.time}}</p> -->
        </div>
      </van-tabs>
    </div>
    <!-- 数字键盘 -->
    <div>
      <van-popup class="popupbox" position="bottom" v-model="popupVisible">
        <!-- 展示键盘弹起的title -->
        <span class="paymentamount"
          v-if="numTitle">{{this.detail.issue_price*requsetPay.amount*detail.step_number}}&nbsp;({{this.detail.denominated_assets}})</span>
        <span class="paymentamount" v-else>{{requsetPay.amount}}&nbsp;({{this.detail.denominated_assets}})</span>
        <van-password-input :value="value" @focus="showKeyboard = true" />
        <!-- 数字键盘 -->
        <van-number-keyboard  :show="showKeyboard" @input="onInput" @delete="onDelete" delete-button-text="Delete"
          @blur="showKeyboard = false" />
      </van-popup>
    </div>
    <div class="transfer-button">
      <mt-button size="large" type="primary" :disabled="disabled" @click="passwordShow">{{$t('m.sureBuy')}}</mt-button>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import api from "@/api/market/Market.js"
  import { Toast } from 'mint-ui'
  import { toast } from '@/assets/js/pub.js'
  import { MessageBox } from 'mint-ui'
  export default {
    data() {
      return {
        value: '',
        // 键盘上标题显隐
        numTitle: true,
        disabled: true,
        showKeyboard: false,
        popupVisible: false,
        balanceData: '',
        timeDate: '',
        // 请求参数
        requsetPay: {
          order_type: 0,
          transaction_id: '',
          amount: '',
          action_type: 0
        },
        // 确认支付参数
        confirm: {
          order_type: 0,
          payment_id: '',
          pay_pwd: ''
        },
        progress: 0,
      }
    },
    created() {
      this.balance()
      this.date()
      this.progress = ((this.detail.sold_number / this.detail.step_number) / (this.detail.first_number / this.detail.step_number)) * 100
    },
    methods: {
      onInput(key) {
        this.value = (this.value + key).slice(0, 6)
      },
      onDelete() {
        this.value = this.value.slice(0, this.value.length - 1)
      },
      // 展示可用余额
      balance() {
        api.balance({ token_code: this.detail.denominated_assets }).then(res => {
          if (res.code == 0) {
            this.balanceData = res.data
          }
        }).catch(err => {
        })
      },
      // 获取当前日期
      date() {
        var date1 = new Date()
        var date2 = new Date(date1)
        date2.setDate(date1.getDate() + this.detail.freeze_days)
        const resDate = date2.getFullYear() + '-' + this.p((date2.getMonth() + 1)) + '-' + this.p(date2.getDate())
        this.timeDate = resDate
      },
      p(s) {
        return s < 10 ? '0' + s : s
      },
      // tab栏展示
      getActionType(index, title) {
        if (index == 0) {
          this.requsetPay.action_type = 0
          // 键盘上标题显隐
          this.numTitle = true
          // this.balance()
        } else {
          if (index == 1) {
            this.requsetPay.action_type = 1
            // 键盘上标题显隐
            this.numTitle = false
            // this.balance()
          }
        }
      },
      // 点击确定按钮
      passwordShow() {
        // 判断pay_pwd_active是否为true,如果是true表示已经设置支付密码
        // 如果是false表示已为设置支付密码，不弹遮罩层，直接弹提示
        // 点击确定按钮发请求
        let pay_pwd = window.sessionStorage.getItem('pay_pwd_active')
        if (pay_pwd == 'true') {
          // if (this.requsetPay.amount > this.detail.max_purchase_number / this.detail.step_number) {
          //   Toast({
          //     message: '最多购买' + this.detail.max_purchase_number / this.detail.step_number + '份',
          //     className: 'zZindex'
          //   })
          // }else{
          //   Toast({
          //     message: '最少购买' + this.detail.min_purchase_number / this.detail.step_number + '份',
          //     className: 'zZindex'
          //   })
          // }
          this.requsetPay.transaction_id = this.detail.token.id
          api.reqPay(this.requsetPay).then(res => {
            this.value = ''
            if (res.code == 0) {
              this.popupVisible = true
              this.confirm.order_type = res.order_type
              this.confirm.payment_id = res.transaction_id
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
    },
    watch: {
      value() {
        if (this.value.length == 6) {
          // debugger
          this.popupVisible = false
          this.confirm.pay_pwd = this.value
          // 清空密码输入框
          this.value = ''
          // 确认支付接口
          api.confirmPay(this.confirm).then(res => {
            if (res.code == 0) {
              toast(res)
              this.$router.push({
                name: 'OrderDetail',
                params: {
                  order_id: res.order_id
                }
              })
            }
          }).catch(err => {
            if (err.code != 0) {
              toast(err)
            }
          })
        }
      },
      requsetPay: {
        immediate: true,
        deep: true,
        handler(val) {
          if (val.amount != '' && val.amount != 0) {
            this.disabled = false
          } else {
            this.disabled = true
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'detail'
      ])
    }
  }

</script>
<style lang="scss">
  @import '../../../assets/scss/global';

  .buy-pass {
    .note{
			margin: 10px 24px;
			background-color: #fff;
		}
    .buy-pass-token {
      background-color: #fff;
      margin: 100px 24px 2px 24px;
      height: 130px;

      img {
        margin: 30px 20px;
      }

      span {
        display: inline-block;
        margin-top: 30px;
      }
    }

    /* 发行期数 */
    .buy-pass-period {
      overflow: hidden;
      background-color: #fff;
      margin: 0 24px;

      .buy-pass-period-top {
        height: 50px;
        margin: 20px 40px 0 50px;

        .buy-pass-period-top-left {
          width: 50%;
        }

      }

      .buy-pass-period-text {
        height: 50px;
        margin: 0px 20px;
        padding-bottom: 10px;

        .buy-pass-period-text-left {
          width: 60%;
        }
      }

      .buy-pass-progress {
        height: 130px;
      }
    }

    /* tab栏切换 */
    .buy-pass-tab {
      margin: 20px 24px;
      height: 320px;
      background-color: #fff;

      span {
        margin: 10px 0 10px 20px;
        display: inline-block;
        font-size: 26px;
        color: #036EB8;
      }

      .mint-field-core {
        font-size: 14px;
      }

      b {
        font-size: 16px;
        font-weight: 400;
      }

      .van-tab {
        text-align: left;
      }

      .van-tabs__line {
        margin-left: -40px;
      }

      .mint-cell-wrapper {
        border-bottom: 1px solid #ccc;
        margin: 0 20px;
      }

      .day {
        margin-right: 20px;
      }
    }

    .transfer-button {
      position: fixed;
      bottom: 10px;
      width: 100%;
    }
  }
</style>