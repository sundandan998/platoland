<template>
  <div class="issued-token">
    <div class="issued-token-header">
      <mt-header fixed title="发行通证">
        <mt-button icon="back" slot="left"v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="issued-token-code">
      <img :src="this.$route.params.token.icon" alt="" class="fl">
      <span>{{this.$route.params.token.code}} ({{this.$route.params.token.nickname}})
        <p>{{this.$route.params.token.subject}}</p>
      </span>
    </div>
    <div class="issued-token-text">
      <div class="issued-token-price">
        <mt-field placeholder="支付通证" to="" v-model="issuedParams.exchange_code"> ></mt-field>
        <mt-field placeholder="单价" v-model="issuedParams.price"></mt-field>
      </div>
      <div class="issued-token-num distance">
        <mt-field placeholder="发行份数" v-model="issuedParams.total_part"></mt-field>
        <mt-field placeholder="每份数量" v-model="issuedParams.step_number"></mt-field>
        <div class="fr">
          <p>发行总量</p>
          <p>可用余额</p>
        </div>
      </div>
      <div class="issued-token-time distance">
        <!-- v-model="releaseParams.freeze_days" -->
        <mt-field placeholder="请选择锁仓期限 >" readonly @click.native="showPicker = true" v-model="issuedParams.freeze_days">
        </mt-field>
        <van-popup v-model="showPicker" position="bottom">
          <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
        </van-popup>
      </div>
      <div class="issued-token-date">
        <mt-field placeholder="发行开始日期" to="" is-link v-model="issuedParams.start_date"></mt-field>
        <mt-field placeholder="锁定股权" v-model="issuedParams.equity"></mt-field>
        <mt-field placeholder="起购份数" v-model="issuedParams.min_buy_part"></mt-field>
        <mt-field placeholder="最多可购份数" v-model="issuedParams.max_buy_part"></mt-field>
      </div>
    </div>
    <div class="release-button">
      <van-button type="warning" size="large" :disabled="disabled" @click.native="release">确定发布</van-button>
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
  export default {
    data() {
      return {
        showPicker: false,
        disabled: '',
        popupVisible:false,
        showKeyboard: false,
        value:'',
        columns: ['7', '15', '30', '60', '90', '120', '180', '365'],
        happeDetail: '',
        issuedParams: {
          code: this.$route.params.token.code,
          exchange_code: '',
          price: '',
          total_part: '',
          step_number: '',
          freeze_days: '',
          start_date: '',
          equity: '',
          min_buy_part: '',
          max_buy_part: '',
          pay_pwd: ''
        },

      }
    },
    created() {
    },
    methods: {
  
      onConfirm(value) {
        this.releaseParams.freeze_days = value
        this.showPicker = false
      },
      onInput(key) {
        this.value = (this.value + key).slice(0, 6)
      },
      onDelete() {
        this.value = this.value.slice(0, this.value.length - 1)
      },
      release() {
        this.popupVisible = true
       
      }
    },
    watch: {
      value() {
        if (this.value.length == 6) {
          this.releaseParams.pay_pwd = this.value
          api.releaseToken(this.issuedParams).then(res => {
            if (res.code === 0) {
              toast(res)
              // this.$router.push({
              //   name: 'Certificate',
              // })
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
      issuedParams: {
        immediate: true,
        deep: true,
        handler(val) {
          if (val.code && val.exchange_code && val.price && val.total_part && val.step_number&&val.freeze_days&&val.start_date
          &&val.equity&&val.min_buy_part&&val.max_buy_part!= '') {
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

  .issued-token {
    .issued-token-code {
      background-color: #fff;
      margin: 100px 24px 20px 24px;
      height: 120px;

      img {
        margin: 30px 20px;
      }

      span {
        margin-top: 30px;
        display: inline-block;
      }
    }

    .issued-token-text {
      margin: 0 24px;

      .distance {
        margin: 20px 0;
      }

      .issued-token-time {
        margin-top: 80px;
      }
    }
  }
</style>