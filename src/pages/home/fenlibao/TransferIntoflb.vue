<template>
  <div class="transfer">
    <div class="transfer-header">
      <mt-header fixed title="转入分利宝">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <!-- <router-link to="buy"> -->
    <div class="transfer-token">
      <img src="../../../assets/images/ld.png" alt="" class="fl">
      <div class="transfer-token-text">
        <span>{{this.$route.params.item.token.code}} ({{this.$route.params.item.token.nickname}})</span>
        <p>{{this.$route.params.item.token.subject}}</p>
      </div>
      <img src="../../../assets/images/right.png" alt="" class="fr arrow">
    </div>
    <!-- </router-link> -->
    <div class="transfer-token-days">
      <div class="transfer-token-days-top">
        <div class="transfer-token-days-top-left fl">
          <span class="fl"> {{this.$route.params.item.air}} <p>年化利率(%)</p></span><span
            class="fr">{{this.$route.params.item.freeze_days}}<p>锁仓期限(天)</p></span>
        </div>
        <div class="transfer-token-days-top-right fr">
          <span class="fr">{{this.$route.params.item.total_amount}} <p>万利总量(万)</p></span>
        </div>
      </div>
      <div class="token-progress">
        <mt-progress :value="this.$route.params.item.high_amount" :bar-height="7"></mt-progress>
      </div>
      <b>可转入数量{{this.$route.params.item.high_amount}}</b>
    </div>
    <!-- 转入数量 -->
    <div class="transfer-num">
      <p>转入数量</p>
      <div class="progress">
        <van-stepper step="2" v-model="transferParams.amount" />
      </div>
      <!-- <div class="progress">
        <mt-progress :value="20" :bar-height="7"></mt-progress>
        <div slot="start" class="fl">0%</div>
        <div slot="end" class="fr">100%</div>
      </div> -->
      <div class=" transfer-num-date">
        <span>到期分利{{transferParams.amount*this.$route.params.item.air/365*this.$route.params.item.freeze_days}}</span>
        <span>到期日期 {{this.$route.params.item.update_time}}</span>
      </div>
    </div>
    <div class="release-button">
      <van-button type="warning" size="large" @click.native="transfer">确定转入</van-button>
    </div>
    <!-- 数字键盘 -->
    <div>
      <van-popup class="popupbox" position="bottom" v-model="popupVisible">
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
  export default {
    data() {
      return {
        popupVisible: false,
        showKeyboard: false,
        value: '',
        transferParams: {
          pk: this.$route.params.item.id,
          amount: '',
          pay_pwd: ''
        }
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
      transfer() {
        this.popupVisible = true
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