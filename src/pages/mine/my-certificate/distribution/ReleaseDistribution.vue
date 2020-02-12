<template>
  <div class="release">
    <div class="release-header header">
      <mt-header fixed title="发布分利计划">
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
      <mt-field label="发布份数" placeholder="最低100" v-model="releaseParams.total_part" @blur.native.capture="num">份
      </mt-field>
      <mt-field label="每份数量" placeholder="请输入整数" v-model="releaseParams.step_amount" @blur.native.capture="integer">
      </mt-field>
      <mt-field label="冻结时长" placeholder="请选择冻结时长 >" readonly @click.native="showPicker = true"
        v-model="releaseParams.freeze_days">
      </mt-field>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
      </van-popup>
      <mt-field label="分利率" placeholder="0~50%" v-model="releaseParams.air" @blur.native.capture="air">
      </mt-field>
      <img src="../../../../assets/images/prompt.svg" alt="" @click="prompt">
      <div class="release-interest">
        <span>支出利润:{{(releaseParams.total_part*(releaseParams.air/100)*releaseParams.step_amount/365*releaseParams.freeze_days).toFixed(2)}}{{balanceToken.code}}</span>
        <span>可用数量:{{this.balanceData.balance|number}}</span>
      </div>
      <div class="purchase-quantity">
        <mt-field label="起购份数" placeholder="请输入整数" @blur.native.capture="integer" v-model="releaseParams.min_part">份
        </mt-field>
        <mt-field label="最多可购份数" placeholder="请输入整数" @blur.native.capture="limit" v-model="releaseParams.high_part">
          份</mt-field>
      </div>
      <mt-field label="截止时间" placeholder="请输入时间" type="date" v-model="releaseParams.deadline_date"></mt-field>
    </div>
    <div class="release-button">
      <mt-button type="primary" size="large" @click.native="release" :disabled="disabled">确定发布</mt-button>
    </div>
    <!-- 数字键盘 -->
    <div>
      <van-popup class="popupbox" position="bottom" v-model="popupVisible">
        <span
          class="paymentamount">{{(releaseParams.total_part*releaseParams.air*releaseParams.step_amount/365*releaseParams.freeze_days).toFixed(2)}}&nbsp;{{balanceToken.code}}</span>
        <van-password-input :value="value" @focus="showKeyboard = true" />
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
          title: '分利率',
          message: '分利率是指，转入分利宝期限为一年所获的收益率。实际获得的收益计算公式为：本金×分利率×投资天数/360 , 例如，A通证分利宝活动标明的分利率是24%，而其冻结时长为30天。您如果转入10000元，那么您的收益为= 10000*24%*30/360',
          confirmButtonText: '我知道了',
        })
      },
      // 判断输入是否是整数
      integer() {
        if (!(/(^[1-9]\d*$)/.test(this.releaseParams.total_part))) {
          Toast({
            message: '请输入整数',
            className: 'zZindex'
          })
          return false
        }
      },

      num() {
        if (this.releaseParams.total_part < 100) {
          Toast({
            message: '输入的份数大于100',
            className: 'zZindex'
          })
        }
      },
      // 最大和最小值
      limit() {
        if (this.releaseParams.high_part < this.releaseParams.total_part) {
          Toast({
            message: '最多可购份数不得大于发行数量',
            className: 'zZindex'
          })
        }
        if (this.releaseParams.high_part < 0) {
          Toast({
            message: '输入的份数大于0的数',
            className: 'zZindex'
          })
        }
      },
      air() {
        if (!(this.releaseParams.air < 200 && this.releaseParams.air > 0)) {
          Toast({
            message: '年化利率在0%~200%',
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
          if (val.total_part && val.min_part && val.high_part && val.freeze_days && val.air != '') {
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