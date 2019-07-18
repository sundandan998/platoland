<template>
  <div class="turn-out">
    <div class="turn-out-header">
      <mt-header fixed :title="$t('m.changeout')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
        <mt-button icon="" slot="right">
          <router-link to="/scan">
            <img src="../../../assets/images/scan.png" alt="" />
          </router-link>
        </mt-button>
      </mt-header>
    </div>
    <div class="turn-out-exhibition">
      <div class="turn-out-exhibition-img">
        <img :src="this.detail.token.icon" alt="" class="fl">
        <span>{{this.detail.token.code}}({{this.detail.token.nickname}})</span>
        <span>{{this.detail.token.subject}}</span>
      </div>
    </div>
    <div class="purchase-pass-input">
      <p>{{$t('m.payment')}}</p>
      <mt-field type="text" readonly="readonly" v-model="this.$route.params.address">
        <router-link to="/book">
          <img src="../../../assets/images/book.png" alt="" />
        </router-link>
      </mt-field>
    </div>
    <div class="purchase-pass-input">
      <p>{{$t('m.turnnum')}}</p>
      <mt-field :placeholder="'最小转出数量' + parseInt(this.detail.token.min_limit)" v-model="turnOut.amount" type="number">
      </mt-field>
      <p>{{$t('m.available')}}：{{this.detail.available_amount}} {{this.detail.code}}</p>
      <p>{{$t('m.servicecharge')}}：{{turnOut.amount*0.002}} PLD</p>
    </div>
    <div class="turn-out-exhibition-qrcode">
      <router-link to="/scan">
        <span>{{$t('m.scan')}}</span>
      </router-link>
    </div>
    <div class="turn-out-exhibition-btn">
      <mt-button type="primary" size="large" @click="passwordShow" :disabled="disabled">确定</mt-button>
    </div>
    <div>
      <van-popup class="popupbox" position="bottom" v-model="popupVisible">
        <span class="paymentamount">{{turnOut.amount}}{{this.detail.token.code}}</span>
        <van-password-input :value="value" @focus="showKeyboard = true" />
        <!-- 数字键盘 -->
        <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" delete-button-text="Delete"
          @blur="showKeyboard = false" />
      </van-popup>
    </div>
    <div class="turn-out-exhibition-text">
      <p>{{$t('m.becareful')}}</p>
      <p>{{$t('m.becarefulone')}}</p>
      <p>{{$t('m.becarefultwo')}}</p>
      <p>{{$t('m.becarefulthree')}}</p>
      <p>{{$t('m.becarefulfour')}}</p>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import api from "@/api/user/User.js"
	import { Toast } from 'mint-ui'
	import { toast } from '@/assets/js/pub.js'
  export default {
    data() {
      return {
        value: '',
        show: '',
        disabled: true,
        showKeyboard: false,
        popupVisible: false,
        // 转出参数
        turnOut: {
          token: '',
          address: '',
          amount: '',
          pay_pwd: ''
        },
      }
    },
    created () {
    },
    computed: {
      ...mapGetters([
        'detail'
      ])
    },
    methods: {
      onInput(key) {
        this.value = (this.value + key).slice(0, 6)
      },
      onDelete() {
        this.value = this.value.slice(0, this.value.length - 1)
      },
      passwordShow(hide) {
        this.value = ''
        this.hide = !(hide === 'show')
        this.popupVisible = !(false === 'true')
        this.value = ''
        let pay_pwd = window.sessionStorage.getItem('pay_pwd_active')
        if (pay_pwd == 'true') {
          this.popupVisible = true
        } else {
          this.popupVisible = false
          Toast({
            message: '请先设置支付密码',
            position: 'top',
          })
        }
      }
    },
    watch: {
      value() {
        if (this.value.length == 6) {
          this.turnOut.token = this.detail.token.code
          this.turnOut.address = this.$route.params.address
          this.turnOut.pay_pwd = this.value
          api.outAsset(this.turnOut).then(res => {
            if (res.code == 0) {
              toast(res)
              window.history.go(-1)
            }
          }).catch(err => {
            if (err.code != 0) {
              toast(err)
            }
          })
          this.popupVisible = false
        }
      },
      turnOut: {
        immediate: true,
        deep: true,
        handler(val) {
          let outAddress = document.getElementById('outAddress')
          if (val.amount != ''&& val.amount != 0 ) {
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
  @import '../../../assets/scss/global'
</style>