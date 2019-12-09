<template>
  <div class="release">
    <div class="release-header header">
      <mt-header fixed title="创建分利计划">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="release-token">
      <div class="home-pub-token">
        <img :src="this.$route.params.icon" alt="" class="fl icon">
        <span><b>{{this.$route.params.code}}</b>( {{this.$route.params.nickname}} ) <p>{{this.$route.params.subject}}
          </p></span>
      </div>
    </div>
    <div class="release-item">
      <p>分利总额</p>
      <mt-field placeholder="请输入整数" v-model="releaseParams.total_amount" @blur.native.capture="integer"></mt-field>
      <p>锁仓期限</p>
      <mt-field placeholder="请选择锁仓期限 >" readonly @click.native="showPicker = true" v-model="releaseParams.freeze_days">
      </mt-field>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
      </van-popup>
      <p>年化利率</p>
      <mt-field placeholder="0~200 %" v-model="releaseParams.air" @blur.native.capture="air"></mt-field>
      <p>转入限额</p>
      <mt-field placeholder="最少转入量" class="input-box"v-model="releaseParams.min_amount">
      </mt-field>
      <mt-field placeholder="最多转入量" @blur.native.capture="limit" class="input-box" v-model="releaseParams.high_amount">
      </mt-field>
      <div class="release-interest">
        <span>支付利息:{{releaseParams.total_amount*releaseParams.air*releaseParams.freeze_days*0.01}}</span>
        <span>可用数量:{{this.balanceData.balance}}</span>
      </div>
    </div>
    <div class="release-button">
      <van-button type="warning" size="large" @click.native="release" :disabled="disabled">确定发布</van-button>
    </div>
    <!-- 数字键盘 -->
    <div>
      <van-popup class="popupbox" position="bottom" v-model="popupVisible">
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
        releaseParams: {
          code: this.$route.params.code,
          total_amount: '',
          min_amount: '',
          high_amount: '',
          freeze_days: '',
          air: '',
          pay_pwd: ''
        },
        value: '',
        showKeyboard: false,
        val:'0.0001'
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
          }
        }).catch(err => {
        })
      },
      // 判断输入是否是整数
      integer() {
        if (!(/(^[1-9]\d*$)/.test(this.releaseParams.total_amount))) {
          Toast({
            message: '请输入整数',
            className: 'zZindex'
          })
          return false
        }
      },
      // 最大和最小值
      limit(){
        if (this.releaseParams.high_amount < this.releaseParams.min_amount) {
          Toast({
            message: '最少转入量不得大于最多转入量',
            className: 'zZindex'
          })
        }
         if(this.releaseParams.total_amount/1000<this.releaseParams.high_amount){
          Toast({
            message: '上下限额设置错误, 请重新设置',
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
          if (val.total_amount && val.min_amount && val.high_amount && val.freeze_days && val.air != '') {
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

      p {
        margin: 0 50px;
        font-size: 26px;
      }

      .mint-field-core {
        text-align: right;
        border-bottom: 1px solid #ccc;
        width: 85%;
        flex: unset;
        margin: 0 auto;
      }

      .input-box {
        width: 40%;
        display: inline-block;
        margin-left: 55px;

        .mint-field-core {
          text-align: left;
        }
      }

      .release-interest {
        text-align: right;
        padding-bottom: 10px;

        span {
          display: block;
          color: #036EB8;
          margin-right: 30px;
        }
      }
    }

  }
</style>