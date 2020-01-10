<template>
  <div class="out-confirm">
    <div class="freeze-header header">
      <mt-header fixed title="转出确认">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">返回</mt-button>
      </mt-header>
    </div>
    <div class="confirm-title">
      <span>请仔细核实转出信息,转出成功后资产无法返还</span>
    </div>
    <div class="payment">
      <mt-cell title="付款给" :value="this.detail.address"></mt-cell>
    </div>
    <div class="expenditure">
      <mt-cell title="总支出" >{{Number(this.$route.params.amount)+Number(this.detail.token.fee)}}
          ({{this.detail.token.code}})</mt-cell>
      <div class="expenditure-detail">
        <p><span>转出数量</span><span class="fr">{{this.$route.params.amount}}{{this.detail.token.code}}</span></p>
        <p><span>手续费</span><span class="fr">{{this.detail.token.fee|number}}{{this.detail.token.code}}</span></p>
      </div>
    </div>
    <div class="transfer-button">
      <mt-button size="large" type="primary" @click="passwordShow">确认转出</mt-button>
    </div>
    <!-- 数字键盘 -->
    <div>
        <van-popup class="popupbox" position="bottom" v-model="popupVisible">
          <span class="paymentamount">{{Number(this.$route.params.amount)+Number(this.detail.token.fee)}}
            {{this.detail.token.code}}</span>
          <van-password-input :value="value" @focus="showKeyboard = true" />
          <!-- 数字键盘 -->
          <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" delete-button-text="Delete"
            @blur="showKeyboard = false" />
        </van-popup>
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
          this.turnOut.amount = this.$route.params.amount
          this.turnOut.address = this.detail.address
          this.turnOut.pay_pwd = this.value
          api.outAsset(this.turnOut).then(res => {
            if (res.code == 0) {
              toast(res)
              this.$router.push({
                name: 'OrderDetail',
                params: { order_id: res.order_id,path:'confirm'}
              })
              // window.history.go(-1)
            }
          }).catch(err => {
            if (err.code != 0) {
              toast(err)
            }
          })
          this.popupVisible = false
        }
      },
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/global';

  .out-confirm {
    .confirm-title {
      span {
        height: 80px;
        background-color: #F7E6D1;
        display: inline-block;
        color: #F3560C;
        width: 100%;
        line-height: 80px;
        font-size: 28px;
        text-indent: 0.5rem;
        margin-top: -10px;
      }
    }

    .expenditure-detail {
      background-color: #fff;
      overflow: hidden;

      p {
        height: 50px;
        margin: 20px 50px;
        color: #666;
      }
    }

    .transfer-button {
      position: fixed;
      bottom: 10px;
      width: 100%;
    }
  }
</style>