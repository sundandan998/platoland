<template>
  <div class="transfer">
    <div class="transfer-header">
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
    <div class="transfer-token-days">
      <div class="transfer-token-days-top">
        <div class="transfer-token-days-top-left fl">
          <span class="fl"> {{flbData.air}} <p>年化利率(%)</p></span><span class="fr">{{flbData.freeze_days}}<p>锁仓期限(天)</p>
          </span>
        </div>
        <div class="transfer-token-days-top-right fr">
          <span class="fr">{{flbData.total_amount}} <p>分利总量(万)</p></span>
        </div>
      </div>
      <div class="token-progress">
        <mt-progress :value="flbData.sold_amount/100" :bar-height="7"></mt-progress>
      </div>
      <b>可转入数量{{flbData.total_amount-flbData.sold_amount}}</b>
    </div>
    <!-- 转入数量 -->
    <div class="transfer-num">
      <p>转入数量</p>
      <div class="progress">
        <!-- @blur.native.capture="maxnum" -->
        <van-stepper step="2" v-model="transferParams.amount" />
      </div>
      <!-- <div class="progress">
        <mt-progress :value="20" :bar-height="7"></mt-progress>
        <div slot="start" class="fl">0%</div>
        <div slot="end" class="fr">100%</div>
      </div> -->
      <!-- .substr(0,11) -->
      <div class=" transfer-num-date">
        <span>到期分利{{transferParams.amount*flbData.air/365*flbData.freeze_days}}</span>
        <!-- <span v-html="'到期日期'+flbData.create_time.substr(0,11)"></span> -->
      </div>
    </div>
    <div class="release-button">
      <van-button type="warning" size="large" @click.native="transfer">确定转入</van-button>
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
        transferParams: {
          pk: this.$route.params.id,
          amount: '',
          pay_pwd: ''
        }
      }
    },
    created() {
      this.flbDetail()
    },
    methods: {
      onInput(key) {
        this.value = (this.value + key).slice(0, 6)
      },
      onDelete() {
        this.value = this.value.slice(0, this.value.length - 1)
      },
      transfer() {
        if (this.transferParams.amount > this.flbData.high_amount ) {
          Toast({
            message: '最多转入' + this.flbData.high_amount+'份' ,
            className: 'zZindex'
          })
        }else if(this.transferParams.amount < this.flbData.min_amount){
          Toast({
            message: '最少转入' + this.flbData.min_amount+'份' ,
            className: 'zZindex'
          })
        }else{
          this.popupVisible = true
        }
      },
      flbDetail() {
        api.flDetail({ id: this.$route.params.id }).then(res => {
          if (res.code == 0) {
            this.flbData = res.data
            this.flToken = res.data.token
          }
        }).catch(err => {

        })
      }
      // 最多转入
      // maxnum(){
      //   if(this.transferParams.amount>flbData.max_purchase_number/flbData.step_number){
      //   Toast({
      //       message: '最多只能购买'+flbData.max_purchase_number/flbData.step_number+'份',
      //       className: 'zZindex'
      //     })
      //  }
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

    .transfer-header {
      margin-bottom: 81px;
    }

    .transfer-token {
      margin: 20px 24px 0 24px;
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

    .transfer-token-days {
      background-color: #fff;
      margin: 20px 24px;
      border-radius: 10px;

      .transfer-token-days-top {
        overflow: hidden;
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
      height: 300px;
      background-color: #fff;
      border-radius: 10px;

      p {
        padding: 10px 20px;
        font-size: 26px;
      }

      .transfer-num-date {
        height: 50px;
        text-align: right;
        margin: 40px 20px 0 0;

        span {
          display: block;
          margin-top: 20px;
          display: block;
        }
      }
    }

    .van-stepper__input {
      width: 80%;
    }
  }
</style>