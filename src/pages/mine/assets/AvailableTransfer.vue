<template>
  <div class="transfer">
    <div class="transfer-header">
      <mt-header fixed title="转让">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <mt-cell title="商城账户">
      <mt-switch v-model="transferParams.out"></mt-switch>
    </mt-cell>
    <p v-if="transferParams.out==true" class="transfer-prompt">
      <img src="../../../assets/images/alert.svg" alt="">
      请确认收款人账号已在商城注册
    </p>
    <div class="transfer-content">
      <div class="transfer-progress-name">
        <span>收款人</span>
        <mt-field v-model="transferParams.email" placeholder="请输入收款人账号" @blur.native.capture="check">
        </mt-field>
      </div>
      <div class="transfer-progress-amount">
        <span>数量</span>
        <mt-field placeholder="请输入数量" type="number" v-model="transferParams.amount"></mt-field>
        <span class="transfer-fee">手续费：0</span>
      </div>
    </div>
    <div class="transfer-button">
      <mt-button size="large" type="primary" @click="transfer" v-show="showBtn">转让</mt-button>
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import { toast } from '@/assets/js/pub.js'
  import api from "@/api/system/System.js"
  import {mapActions,mapGetters } from 'vuex'
  export default {
    data() {
      return {
        transferParams: {
          code: this.$route.params.code,
          email: '',
          amount: '',
          action: 'available',
          type: this.$route.params.type,
          num: this.$route.params.num,
          date: this.$route.params.date,
          out: false
        },
        // 解决底部按钮被弹起问题
        clientHeight: document.documentElement.clientHeight,
        showBtn: true,  // 控制按钮盒子显示隐藏
        verifyParams: {
          username: '',
          code: ''
        },
      }
    },
    created() {
      document.title = '转让'
    },
    // 解决底部按钮被弹起问题
    mounted() {
      window.onresize = () => {
        if (this.clientHeight > document.documentElement.clientHeight) {
          this.showBtn = false
        } else {
          this.showBtn = true
        }
      }
    },
    methods: {
      // 判断输入的邮箱和用户名不能为空
      transfer() {
        if (this.transferParams.email == '' || this.transferParams.amount == '') {
          Toast({
            message: '接收人和转出数量不能为空',
            className: 'zZindex'
          })
        } else {
          // 外部转让
          if (this.transferParams.out == true) {
            this.verifyParams.username = this.transferParams.email
            this.verifyParams.code = this.detail.token.code||this.transferParams.code
            api.verify(this.verifyParams).then(res => {
              if (res.code == 0) {
                this.$router.push({
                  name: 'ConfirmTransfer',
                  params: { detail:this.detail,transferParams: this.transferParams }
                })
              }else{
                toast(res)
              }
            }).catch(err => {
              if (err.code == 4004) {0
                toast(err)
              }
            })
          } else {
            // 内部转让
            api.is_use({ username: this.transferParams.email}).then(res => {
              if (res.is_use == true) {
                this.$router.push({
                  name: 'ConfirmTransfer',
                  params: {detail:this.detail, transferParams: this.transferParams }
                })
              } else {
                toast(res)
              }
            }).catch(err => {})
          }
        }
      },
      // 邮箱/手机号校验
      check() {
        var email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
        var tel = /^1[23456789]\d{9}$/
        if (!email.test(this.transferParams.email) && !tel.test(this.transferParams.email)) {
          // this.status = 'error'
          Toast({
            message: '请填写正确的手机号或邮箱地址',
            className: 'zZindex'
          })
        } else {
          // this.status = 'success'
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
    .transfer-header {
      margin-bottom: 90px;
    }

    .transfer-prompt {
      background-color: #FFFBE6;
      width: 90%;
      color: #5A5951;
      border-radius: 5px;
      height: 30px;
      line-height: 30px;
      border: 1px solid #FFE58F;
      margin-left: 20px;
      margin-bottom: 10px;

      img {
        width: 20px;
        margin-left: 10px;
        position: relative;
        top: 5px;
      }
    }

    .transfer-button {
      button {
        position: fixed;
        bottom: 10px;
      }
    }

    .transfer-content {
      span {
        margin-left: 15px;
      }
    }

    .transfer-fee {
      color: #486FF0;
    }
  }
</style>