<template>
  <div class="transfer">
    <div class="transfer-header header">
      <mt-header fixed :title="$t('m.transferFLB')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <!-- <router-link to="buy"> -->
    <div class="transfer-token">
      <img :src="flToken.icon" alt="" class="fl">
      <div class="transfer-token-text">
        <span>{{this.flToken.code}} ({{this.flToken.nickname}})</span>
        <p>{{this.flToken.subject}}</p>
      </div>
      <!-- <img src="../../../assets/images/right.png" alt="" class="fr arrow"> -->
    </div>
    <!-- </router-link> -->
    <div class="remaining-days" v-if="this.days>0">
      <img src="../../../assets/images/note.svg" alt="">
      <span> {{$t('m.endDays')}}{{this.days}}{{$t('m.day')}}</span>
    </div>
    <div class="transfer-token-days">
      <div class="transfer-token-days-top">
        <div class="transfer-token-days-top-left fl">
          <img src="../../../assets/images/prompt.svg" alt="" @click="prompt">
          <span class="fl"> {{flbData.air}} <p>{{$t('m.interestRate')}}(%)</p></span>
          <span class="fr">{{flbData.freeze_days}}<p>{{$t('m.freezeDuration')}}({{$t('m.day')}})</p>
          </span>
        </div>
        <img src="../../../assets/images/prompt.svg" alt="" @click="duration" class="duration">
        <div class="transfer-token-days-top-right fr">
          <span class="fr">{{flbData.total_amount/10000}} <p>
              {{$t('m.totaldistribution')}}({{$t('m.wan')}})</p></span>
        </div>
      </div>
      <div class="token-progress">
        <mt-progress :value="(flbData.sold_amount/flbData.step_amount)/(flbData.total_amount/flbData.step_amount)"
          :bar-height="7"></mt-progress>
      </div>
      <b>{{$t('m.transfersIn')}}{{flbData.sold_amount/flbData.step_amount}}</b>
      <mt-cell :title="$t('m.perServing')" value="">{{flbData.step_amount}} {{flToken.code}}/{{$t('m.share')}}</mt-cell>
      <router-link :to="{name:'ReleaseHistory'}">
        <mt-cell :title="$t('m.releaseStatus')" :value="$t('m.view')" class="release-status" is-link></mt-cell>
      </router-link>
    </div>
    <!-- 转入数量 -->
    <div class="transfer-num">
      <!-- @blur.native.capture="maxnum" -->
      <mt-field :placeholder="flbData.min_amount/flbData.step_amount+'~'+flbData.high_amount/flbData.step_amount"
        v-model="transferParams.part">
        {{$t('m.share')}}</mt-field>
      <div class="transfer-num-amount fl">
        <span>{{$t('m.transactionNumber')}} {{transferParams.part*flbData.step_amount}}{{flToken.code}}</span>
        <span>{{$t('m.dividendMaturity')}}
          {{(transferParams.part*flbData.step_amount*flbData.air/365*flbData.freeze_days).toFixed(2)}}{{flToken.code}}</span>
        <!-- <span v-html="'到期日期'+flbData.create_time.substr(0,11)"></span> -->
      </div>
      <div class="transfer-num-date fr">
        <span>{{$t('m.availableCopies')}} {{(balanceData.available_amount/flbData.step_amount|number)}}</span>
        <span>{{$t('m.thawDay')}} {{flbData.deadline_date}}</span>
        <!-- <span v-html="'到期日期'+flbData.create_time.substr(0,11)"></span> -->
      </div>
    </div>
    <div class="release-button">
      <van-button type="primary" size="large" @click.native="transfer" :disabled="disabled">{{$t('m.sureTransfer')}}
      </van-button>
    </div>
    <!-- 数字键盘 -->
    <div>
      <van-popup class="popupbox" position="bottom" v-model="popupVisible">
        <span class="paymentamount">{{transferParams.part*flbData.step_amount}}&nbsp;({{flToken.code}})</span>
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
        times: '',
        date: '',
        we: '',
        days: '',
        number: '',
        transferParams: {
          pk: this.$route.params.id,
          part: '',
          pay_pwd: ''
        }
      }
    },
    created() {
      this.flbDetail()
      this.balance()
      this.dateFormat()
      this.info()
    },
    methods: {
      dateFormat() {
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
        // 拼接
        this.times = year + "-" + month + "-" + day
      },
      onInput(key) {
        this.value = (this.value + key).slice(0, 6)
      },
      onDelete() {
        this.value = this.value.slice(0, this.value.length - 1)
      },
      transfer() {
        this.value = ''
        if (this.flToken.code == this.infoData.token_code) {
          Toast({
            message: '不能购买自己发布的分利计划',
            className: 'zZindex'
          })
        } else if (this.transferParams.part > this.flbData.high_amount) {
          Toast({
            message: '最多转入' + this.flbData.high_amount / this.flbData.step_amount + '份',
            className: 'zZindex'
          })
        } else if (this.transferParams.part < this.flbData.min_amount / this.flbData.step_amount) {
          Toast({
            message: '最少转入' + this.flbData.min_amount / this.flbData.step_amount + '份',
            className: 'zZindex'
          })
        } else {
          this.popupVisible = true
        }
      },
      flbDetail() {
        // debugger
        api.flDetail({ id: this.$route.params.id }).then(res => {
          if (res.code == 0) {
            this.flbData = res.data
            this.flToken = res.data.token
            this.we = Date.parse(this.flbData.deadline_date)
            this.date = Date.parse(this.times)
            this.days = ((this.we - this.date) / (24 * 60 * 60 * 1000))
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
      // 用户信息
      info() {
        api.getUserInfo().then(res => {
          this.infoData = res.data
          window.sessionStorage.setItem('pay_pwd_active', this.infoData.pay_pwd_active)
        }).catch(err => {
          // console.log(err)
        })
      },
      // 可用
      balance() {
        api.balance({ token_code: this.$route.params.code }).then(res => {
          if (res.code == 0) {
            this.balanceData = res.data
          }
        }).catch(err => {
        })
      },
      // 最多转入
      // maxnum() {
      //   if (this.transferParams.part > this.flbData.high_amount || this.transferParams.part < this.flbData.min_amount) {
      //     Toast({
      //       message: '请输入的数量在' + this.flbData.min_amount + '~' + this.flbData.high_amount + '份之间',
      //       className: 'zZindex'
      //     })
      //     this.disabled = true
      //   } else {
      //     this.disabled = false
      //   }
      // }
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
          // this.value = ''
          this.popupVisible = false
        }
      },
      transferParams: {
        immediate: true,
        deep: true,
        handler(val) {
          // if (val.part != '' && (val.part < this.flbData.high_amount / this.flbData.step_amount || val.part > this.flbData.min_amount / this.flbData.step_amount)) {
          //   Toast({
          //     message: '转入份数限额为' + this.flbData.min_amount / this.flbData.step_amount + '~' + this.flbData.high_amount / this.flbData.step_amount + '份',
          //     className: 'zZindex'
          //   })
          //   this.disabled = false
          // } else {
          //   this.disabled = true
          // }
          // 
          if (val.part != ''&&(val.part <= this.flbData.high_amount / this.flbData.step_amount) && (val.part >= this.flbData.min_amount / this.flbData.step_amount)) {
            // Toast({
            //   message: '转入份数限额为' + this.flbData.min_amount / this.flbData.step_amount + '~' + this.flbData.high_amount / this.flbData.step_amount + '份',
            //   className: 'zZindex'
            // })
            this.disabled = false
          }else{
            this.disabled = true
            Toast({
              message: '请输入正确的转出数量',
              className: 'zZindex'
            })
          }
        }
      },
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