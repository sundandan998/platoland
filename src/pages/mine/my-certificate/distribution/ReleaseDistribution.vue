<template>
  <div class="release">
    <div class="release-header header">
      <mt-header fixed :title="$t('m.releasePlan')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="release-token">
      <div class="home-pub-token">
        <img :src="balanceToken.icon" alt="" class="fl icon">
        <span><b>{{balanceToken.code}}</b>( {{balanceToken.nickname}} )
          <p>{{balanceToken.subject}} </p>
        </span>
      </div>
    </div>
    <div class="release-item">
      <mt-field :label="$t('m.numberOfReleases')" placeholder="最低100" v-model="releaseParams.total_part" @blur.native.capture="num">{{$t('m.share')}}
      </mt-field>
      <mt-field :label="$t('m.perServing')" :placeholder="$t('m.integer')" v-model="releaseParams.step_amount" @blur.native.capture="integer">
      </mt-field>
      <mt-field :label="$t('m.freezeDuration')" :placeholder="$t('m.freezeDuration')+'>'" readonly @click.native="showPicker = true"
        v-model="releaseParams.freeze_days">
      </mt-field>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
      </van-popup>
      <mt-field :label="$t('m.interestRate')" placeholder="0~50%" v-model="releaseParams.air" @blur.native.capture="air">
      </mt-field>
      <img src="../../../../assets/images/prompt.svg" alt="" @click="prompt">
      <div class="release-interest">
        <span>{{$t('m.expenditureProfit')}}:{{(releaseParams.total_part*(releaseParams.air/100)*releaseParams.step_amount/365*releaseParams.freeze_days).toFixed(2)}}{{balanceToken.code}}</span>
        <span>{{$t('m.quantityAvailable')}}:{{this.balanceData.balance|number}}</span>
      </div>
      <div class="purchase-quantity">
        <mt-field :label="$t('m.purchaseQuantity')" :placeholder="$t('m.integer')" @blur.native.capture="integer" v-model="releaseParams.min_part">{{$t('m.share')}}
        </mt-field>
        <mt-field :label="$t('m.maxServing')" :placeholder="$t('m.integer')" @blur.native.capture="limit" v-model="releaseParams.high_part">
          {{$t('m.share')}}</mt-field>
      </div>
      <mt-field :label="$t('m.deadline')" placeholder="请输入时间" type="date" v-model="releaseParams.deadline_date"></mt-field>
    </div>
    <div class="release-button">
      <mt-button type="primary" size="large" @click.native="release" :disabled="disabled">{{$t('m.sureRelease')}}</mt-button>
    </div>
    <!-- 数字键盘 -->
    <div>
      <van-popup class="popupbox" position="bottom" v-model="popupVisible">
        <span
          class="paymentamount">{{(releaseParams.total_part*releaseParams.air*releaseParams.step_amount/365*releaseParams.freeze_days).toFixed(2)}}&nbsp;{{balanceToken.code}}</span>
        <van-password-input :value="value" @focus="showKeyboard = true" />
        <van-number-keyboard  :show="showKeyboard" @input="onInput" @delete="onDelete" delete-button-text="Delete"
          @blur="showKeyboard = false" />
      </van-popup>
    </div>
  </div>
</template>
<script>
  import api from "@/api/token/Token.js"
  import { toast } from '@/assets/js/pub.js'
  import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        popupVisible: false,
        message: '',
        disabled: true,
        showPicker: false,
        columns: ['7', '15', '30', '60', '90', '120', '180', '365'],
        balanceData: '',
        balanceToken: '',
        releaseParams: {
          code: this.$route.params.code,
          total_part: '',
          min_part: '',
          high_part: '',
          step_amount: '',
          freeze_days: '',
          air: '',
          pay_pwd: '',
          deadline_date: ''
        },
        value: '',
        showKeyboard: false,
        val: '0.0001'
      }
    },
    created() {
      this.balance()
    },
    methods: {
      onInput(key) {
        this.value = (this.value + key).slice(0, 6)
      },
      onDelete() {
        this.value = this.value.slice(0, this.value.length - 1)
      },
      release() {
        this.popupVisible = true
      },
      onConfirm(value) {
        this.releaseParams.freeze_days = value
        this.showPicker = false
      },
      // 余额
      balance() {
        // this.$route.params.code
        api.balance({ token_code: this.$route.params.code }).then(res => {
          if (res.code == 0) {
            this.balanceData = res.data
            this.balanceToken = res.data.token
          }
        }).catch(err => {
        })
      },
      // 提示
      prompt() {
        this.$messagebox({
          title: '분리율',
          message: '배당률은 분리바오에 전입한 1년 기한인 수익률을 말합니다.실제 획득한 수익 계산 공식: 자본금×배당률×투자일수/360. 예:A토큰은 분리바오에 표시된 배당률이 24%이고, 잠금기한이 30일입니다. 만약 10000위안(RMB)을 전입하면 수익=10000*24%*30/360입니다',
          confirmButtonText: '알겠습니다',
        })
      },
      // 判断输入是否是整数
      integer() {
        if (!(/(^[1-9]\d*$)/.test(this.releaseParams.total_part))) {
          Toast({
            message: '정수를입력하세요',
            className: 'zZindex'
          })
          return false
        }
      },

      num() {
        if (this.releaseParams.total_part < 100) {
          Toast({
            message: '입력한 수량이 100보다 큽니다',
            className: 'zZindex'
          })
        }
      },
      // 最大和最小值
      limit() {
        if (this.releaseParams.high_part < this.releaseParams.total_part) {
          Toast({
            message: '최대 구매 수량은 발행 수량보다 크면 안 됩니다',
            className: 'zZindex'
          })
        }
        if (this.releaseParams.high_part < 0) {
          Toast({
            message: '0보다 큰 부수를 입력하십시오',
            className: 'zZindex'
          })
        }
      },
      air() {
        if (!(this.releaseParams.air < 200 && this.releaseParams.air > 0)) {
          Toast({
            message: '연이율0%~200%',
            className: 'zZindex'
          })
          return false
        }
      }
    },
    watch: {
      value() {
        if (this.value.length == 6) {
          this.releaseParams.pay_pwd = this.value
          api.releaseFl(this.releaseParams).then(res => {
            if (res.code === 0) {
              toast(res)
              this.$router.push({
                name: 'Certificate',
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
      },
      releaseParams: {
        immediate: true,
        deep: true,
        handler(val) {
          if (val.total_part && val.min_part && val.high_part && val.freeze_days && val.air != ''&val.deadline_date!='') {
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
  @import '../../../../assets/scss/global';

  .release {
    .release-token {
      border-radius: 10px;
      background-color: #fff;
      margin: 90px 24px 10px 24px;
    }

    .release-item {
      margin: 0px 24px;
      padding-top: 20px;
      background-color: #fff;
      border-radius: 10px;

      img {
        position: relative;
        top: -70px;
        left: 160px;
      }


      p {
        margin: 0 50px;
        font-size: 26px;
      }

      .mint-field-core {
        text-align: right;
        width: 100%;
        flex: unset;
        margin: 0 auto;
      }

      .release-interest {
        text-align: right;

        span {
          display: block;
          color: #036EB8;
          margin-right: 30px;
          margin-top: 10px;
        }
      }

      .purchase-quantity {
        border-top: 10px solid #f2f2f2;
        border-bottom: 10px solid #f2f2f2;

        .mint-cell-value {
          background-color: #fff;
        }
      }
      /* .date{
        input.mint-field-core{
          position: relative;
          right:-40px;
        }
      } */
      .mint-cell-wrapper {
        border-bottom: 1px solid #f2f2f2;
      }
    }

    .release-button {
      position: fixed;
      bottom: 10px;
      width: 100%;
    }

    input.mint-field-core {
      background-color: #fff;
    }
  }
</style>