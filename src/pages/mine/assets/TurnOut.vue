<template>
  <div class="turn-out">
    <div class="turn-out-header header">
      <mt-header fixed :title="$t('m.changeout')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
        <!-- <mt-button icon="" slot="right">
          <router-link to="/scan">
            <img src="../../../assets/images/scan.png" alt="" />
          </router-link>
        </mt-button> -->
      </mt-header>
    </div>
    <div class="turn-out-exhibition">
      <div class="turn-out-exhibition-img">
        <img :src="this.detail.token.icon" alt="" class="fl">
        <span>{{this.detail.token.code}}({{this.detail.token.nickname}})</span>
        <p>{{this.detail.token.subject}}</p>
        <!-- <span>{{this.$route.params.token.code}}({{this.$route.params.token.nickname}})</span>
        <span>{{this.$route.params.token.subject}}</span> -->
      </div>
    </div>
    <div class="payment-input">
      <p>{{$t('m.payment')}}</p>
      <mt-field type="text" readonly="readonly" v-model="this.$route.params.name" placeholder="请选择收款地址">
        <router-link :to="{name:'Book',params:{token_code:this.detail.token.code}}">
          <!-- <router-link :to="/book/+this.detail.token.code"> -->
          <img src="../../../assets/images/book.png" alt="" />
          <router-link to="/scan">
            <img src="../../../assets/images/scan.png" alt="" />
          </router-link>
        </router-link>
      </mt-field>
      <mt-field type="text" readonly="readonly" v-model="this.$route.params.address" class="address"></mt-field>
    </div>
    <div class="turn-out-input">
      <p>{{$t('m.turnnum')}}</p>
      <mt-field :placeholder="'最小转出数量' + parseInt(this.detail.token.min_limit)" v-model="turnOut.amount" type="number">
      </mt-field>
      <p>{{$t('m.available')}}：{{this.detail.available_amount|number}} {{this.detail.code}}</p>
      <p>{{$t('m.servicecharge')}}：{{turnOut.amount*0.002}} ({{this.detail.token.code}})</p>
    </div>
    <div>
      <van-popup class="popupbox" position="bottom" v-model="popupVisible">
        <span class="paymentamount">{{turnOut.amount+turnOut.amount*0.002}}{{this.detail.token.code}}</span>
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
    <div class="turn-out-exhibition-btn">
      <p class="expenditure"><span class="fl">实际支出</span><span class="fr cost">{{turnOut.amount+turnOut.amount*0.002}}
          ({{this.detail.token.code}})</span></p>
      <mt-button type="primary" size="large" @click="passwordShow" :disabled="disabled">确定</mt-button>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import api from "@/api/user/User.js"
  import { Toast } from 'mint-ui'
  import { toast } from '@/assets/js/pub.js'
  import { MessageBox } from 'mint-ui'
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
    created() {
      this.addAddress = this.$route.params
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
          if (val.amount != '' && val.amount != 0) {
            this.disabled = false
          } else {
            this.disabled = true
          }
        }
      },

    }
  }
</script>

<style lang="scss">
  @import '../../../assets/scss/global';

  .turn-out {
    .turn-out-exhibition {
      margin: 0 24px 10px 24px;
      border-radius: 10px;
      height: 120px;
      background-color: #fff;

      img {
        margin: 40px 10px 0 10px;
      }

      span {
        margin-top: 20px;
        display: inline-block;
      }
    }

    .payment-input {
      margin: 10px 24px 20px 24px;
      background-color: #fff;
      /* height: 160px; */
      border-radius: 10px;

      p {
        margin: 10px 0 0 24px;
        display: inline-block;
        font-size: 28px;
      }

      .mint-cell:last-child {
        border-radius: 10px;
      }

      .address {
        .mint-cell-wrapper {
          position: relative;
          top: -17px;
        }
      }
    }

    .turn-out-input {
      background-color: #fff;
      margin: 20px 24px 0 24px;
      padding-bottom: 40px;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;

      p {
        margin: 10px 0 0 24px;
        font-size: 28px;
        padding-top: 10px;
      }
    }

    .turn-out-exhibition-btn {
      width: 100%;
      position: fixed;
      bottom: 10px;

      .expenditure {
        margin: 0 0 20px 24px;
        display: flow-root;

        .cost {
          margin-right: 20px;
        }
      }
    }

    .turn-out-exhibition-text {
      margin: 0 24px;
      color: #666;
      background-color: #fff;
      padding: 10px 20px;
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
    }
  }
</style>