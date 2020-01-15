<template>
  <div class="transfer">
    <div class="transfer-header header">
      <mt-header fixed title="转入分利宝">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <!-- <router-link to="buy"> -->
    <div class="transfer-token">
      <img :src="flToken.icon" alt="" class="fl">
      <div class="transfer-token-text">
        <span>{{flToken.code}} ({{flToken.nickname}})</span>
        <p>{{flToken.subject}}</p>
      </div>
      <!-- <img src="../../../assets/images/right.png" alt="" class="fr arrow"> -->
    </div>
    <!-- </router-link> -->
    <div class="remaining-days">
      <img src="../../../assets/images/note.svg" alt="">
      <span> 距离活动结束还有{{flbData.freeze_days}}天</span>
    </div>
    <div class="transfer-token-days">
      <div class="transfer-token-days-top">
        <div class="transfer-token-days-top-left fl">
          <img src="../../../assets/images/prompt.svg" alt="" @click="prompt">
          <span class="fl"> {{flbData.air}} <p>分利率(%)</p></span>
          <span class="fr">{{flbData.freeze_days}}<p>冻结时长(天)</p>
          </span>
        </div>
        <img src="../../../assets/images/prompt.svg" alt="" @click="duration" class="duration">
        <div class="transfer-token-days-top-right fr">
          <span class="fr">{{flbData.total_amount}} <p>分利总量(万)</p></span>
        </div>
      </div>
      <div class="token-progress">
        <mt-progress :value="flbData.sold_amount/100" :bar-height="7"></mt-progress>
      </div>
      <b>已转入份数{{flbData.total_amount-flbData.sold_amount}}</b>
      <mt-cell title="每份数量" value="">{{flbData.step_amount}} {{flToken.code}}/份</mt-cell>
      <router-link :to="{name:'ReleaseHistory'}">
        <mt-cell title="发布情况" value="查看" class="release-status" is-link></mt-cell>
      </router-link>
    </div>
    <!-- 转入数量 -->
    <div class="transfer-num">
      <mt-field @blur.native.capture="maxnum" :placeholder="flbData.min_amount+'~'+flbData.high_amount"
        v-model="transferParams.amount">份</mt-field>
      <div class="transfer-num-amount fl">
        <span>交易数量 {{transferParams.amount*flbData.step_amount}}{{flToken.code}}</span>
        <span>到期分利 {{transferParams.amount*flbData.air/365*flbData.freeze_days}}{{flToken.code}}</span>
        <!-- <span v-html="'到期日期'+flbData.create_time.substr(0,11)"></span> -->
      </div>
      <div class="transfer-num-date fr">
        <span>可用份数 {{(balanceData.available_amount/flbData.step_amount).toFixed(0)}}</span>
        <span>解冻日 {{flbData.deadline_date}}</span>
        <!-- <span v-html="'到期日期'+flbData.create_time.substr(0,11)"></span> -->
      </div>
    </div>
    <div class="release-button">
      <van-button type="warning" size="large" @click.native="transfer" :disabled="disabled">确定转入</van-button>
    </div>
    <!-- 数字键盘 -->
    <div>
      <van-popup class="popupbox" position="bottom" v-model="popupVisible">
        <span class="paymentamount">{{transferParams.amount}}&nbsp;({{flToken.code}})</span>
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
  import { Toast } from 'mint-ui'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        popupVisible: false,
        showKeyboard: false,
        value: '',
        flbData: '',
        flToken: '',
        balanceData: '',
        disabled: true,
        transferParams: {
          pk: this.$route.params.id,
          amount: '',
          pay_pwd: ''
        }
      }
    },
    created() {
      this.flbDetail()
      this.balance()
    },
    methods: {
      onInput(key) {
        this.value = (this.value + key).slice(0, 6)
      },
      onDelete() {
        this.value = this.value.slice(0, this.value.length - 1)
      },
      transfer() {
        if (this.transferParams.amount > this.flbData.high_amount) {
          Toast({
            message: '最多转入' + this.flbData.high_amount + '份',
            className: 'zZindex'
          })
        } else if (this.transferParams.amount < this.flbData.min_amount) {
          Toast({
            message: '最少转入' + this.flbData.min_amount + '份',
            className: 'zZindex'
          })
        } else {
          this.popupVisible = true
        }
      },
      flbDetail() {
        api.flDetail({ id: this.$route.params.id }).then(res => {
          if (res.code == 0) {
            this.flbData = res.data
            this.flToken = res.data.token
            this.$store.commit('detail', res.data)
          }
        }).catch(err => {

        })
      },
      // 提示
      prompt() {
        this.$messagebox({
          title: '分利率',
          message: '分利率是指，转入分利宝期限为一年所获的收益率。实际获得的收益计算公式为：本金×分利率×投资天数/360 , 例如，A通证分利宝活动标明的分利率是24%，而其冻结时长为30天。您如果转入10000元，那么您的收益为= 10000*24%*30/360',
          confirmButtonText: '我知道了',
        })
      },
      duration() {
        this.$messagebox({
          title: '冻结时长',
          message: '冻结时长是指，将交易的资产冻结部分功能一定时间发行买入、受让的资产，在冻结时长内，不可转出至第三方钱包、不可在交易市场发布。',
          confirmButtonText: '我知道了',
        })
      },
      // 可用
      balance() {
        api.balance({ token_code:this.detail.token.code}).then(res => {
          if (res.code == 0) {
            this.balanceData = res.data
          }
        }).catch(err => {
        })
      },
      // 最多转入
      maxnum() {
        if (this.transferParams.amount > this.flbData.high_amount || this.transferParams.amount < this.flbData.min_amount) {
          Toast({
            message: '请输入的数量在' + this.flbData.min_amount + '~' + this.flbData.high_amount + '份之间',
            className: 'zZindex'
          })
          this.disabled = true
        } else {
          this.disabled = false
        }
      }
    },
    watch: {
      value() {
        if (this.value.length == 6) {
          this.transferParams.pay_pwd = this.value
          api.transferFlb(this.transferParams).then(res => {
            if (res.code === 0) {
              toast(res)
              this.$router.push({
                name: 'OrderDetail',
                params: { order_id: res.order_id }
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

  .transfer {
    .mt-progress-runway {
      border-radius: 7px;
    }

    .mt-progress-progress {
      border-radius: 7px;
    }

    .transfer-token {
      margin: 50px 24px 0 24px;
      background-color: #fff;
      padding: 10px 0;
      border-radius: 10px;

      img {
        margin: 10px 20px 0 20px;
      }

      span {
        color: #999;
        margin-bottom: 10px;
        display: inline-block;
      }

      .transfer-token-text {
        display: inline-block;
      }

      .arrow {
        margin-top: 20px;
      }
    }

    .remaining-days {
      margin: 20px 24px 10px 24px;
      background-color: #FFFBE6;
      height: 60px;
      line-height: 60px;
      border-radius: 10px;

      img {
        position: relative;
        top: 4px;
        left: 25px;
      }

      span {
        margin-left: 35px;
      }
    }

    .transfer-token-days {
      background-color: #fff;
      margin: 20px 24px;
      border-radius: 10px;

      .mint-cell-text {
        vertical-align: middle;
        font-size: 12px;
        margin-left: -13px;
      }

      .mint-cell-value {
        font-size: 12px;
      }

      .release-status {
        span {
          color: #036EB8;
        }
      }

      .transfer-token-days-top {
        overflow: hidden;

        img {
          position: relative;
          top: 30px;
          left: 10px;
        }

        .duration {
          position: relative;
          left: -70px;
        }
      }

      b {
        font-weight: 400;
        text-align: right;
        display: block;
        margin-right: 20px;
        padding-bottom: 10px;
      }

      .transfer-token-days-top-left {
        width: 60%;

        span {
          margin: 20px 0 20px 30px;
          font-size: 44px;

          p {
            font-size: 24px;
          }
        }
      }

      .transfer-token-days-top-right {
        span {
          margin: 20px 20px 20px 0px;
          font-size: 44px;

          p {
            font-size: 24px;
          }
        }
      }

      .token-progress {
        margin: 0 20px;


      }
    }

    .transfer-num {
      margin: 0 24px;
      height: 230px;
      background-color: #fff;
      border-radius: 10px;

      p {
        padding: 10px 20px;
        font-size: 26px;
      }

      .transfer-num-date {
        height: 50px;
        margin-right: 20px;

        span {
          display: block;
          margin-top: 20px;
        }
      }

      .transfer-num-amount {
        span {
          display: block;
          margin: 20px 0 0 24px;
        }

      }
    }

    .van-stepper__input {
      width: 80%;
    }
  }
</style>