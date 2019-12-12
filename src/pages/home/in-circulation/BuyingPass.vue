<template>
  <div class="buy-pass">
    <div class="buy-pass-header">
      <mt-header fixed title="买入通证">
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
          <span class="fl">发行期数(期)</span>
          <span class="fr">单价(USDT)</span>
        </div>
        <span class="fr">期限(天)</span>
      </div>
      <div class="buy-pass-progress progress">
        <mt-progress :value="20" :bar-height="7"></mt-progress>
        <div slot="start" class="fl">已售 {{this.detail.sold_number|number}} 份</div>
        <div slot="end" class="fr">总量 {{this.detail.first_number|number}} 份</div>
      </div>
    </div>
    <!-- tab切换 -->
    <div class="buy-pass-tab">
      <van-tabs  @click="getActionType">
        <van-tab title="按份数买入">
          <mt-field placeholder="份起购" type="number" v-model="requsetPay.amount"></mt-field>
          <span>交易额：24 USDT</span>
        </van-tab>
        <van-tab title="按金额买入">
          <mt-field placeholder="最少" type="number" v-model="requsetPay.amount"><b>{{detail.denominated_assets}}</b></mt-field>
          <span>可买入份数：2 份</span>
        </van-tab>
        <div class="fr day">
          <p>可用额{{detail.denominated_assets}}</p>
          <p>解锁日:{{detail.end_time}}</p>
        </div>
      </van-tabs>
    </div>
    <!-- 数字键盘 -->
    <div>
      <van-popup class="popupbox" position="bottom" v-model="popupVisible">
        <!-- 展示键盘弹起的title -->
        <span class="paymentamount"
          v-if="numTitle">{{this.detail.issue_price*requsetPay.amount}}&nbsp;({{this.detail.denominated_assets}})</span>
        <span class="paymentamount"
          v-else>{{requsetPay.amount}}&nbsp;({{this.detail.denominated_assets}})</span>
        <van-password-input :value="value" @focus="showKeyboard = true" />
        <!-- 数字键盘 -->
        <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" delete-button-text="Delete"
          @blur="showKeyboard = false" />
      </van-popup>
    </div>
    <div class="transfer-button">
      <mt-button size="large" type="primary" :disabled="disabled" @click="passwordShow">确定买入</mt-button>
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
      }
    },
    created() {
    },
    methods: {
      onInput(key) {
				this.value = (this.value + key).slice(0, 6)
			},
			onDelete() {
				this.value = this.value.slice(0, this.value.length - 1)
      },
      	// tab栏展示
			getActionType(index, title) {
				if (index == 0) {
					this.requsetPay.action_type = 0
					// 键盘上标题显隐
					this.numTitle = true
					this.balance()
				} else {
					if (index == 1) {
						this.requsetPay.action_type = 1
						// 键盘上标题显隐
						this.numTitle = false
						this.balance()
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
							// if()
							this.$router.push({
								name: 'Home',
								params: {
									code: this.detail.code
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
  }
</style>