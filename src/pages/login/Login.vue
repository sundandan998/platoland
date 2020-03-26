<template>
  <div class="login">
    <router-link to="home">
      <div class="login-cancel">
        <!-- <img src="../../assets/images/cancel.png" alt="" /> -->
      </div>
    </router-link>
    <div class="logo">
      <img src="../../assets/images/login-logo.png" alt="" />
    </div>
    <div class="login-title">
      <span>{{$t('m.login')}}</span>
    </div>
    <div class="login-form">
      <mt-field :placeholder="$t('m.enterName')" v-model="verification.username" type="email"
        @blur.native.capture="check" :state="status">
      </mt-field>
      <img src="../../assets/images/login-mine.svg" alt="" class="login-icon">
      <!-- @blur.native.capture="pwdCheck" :state="pwdlStatus" -->
      <mt-field :placeholder="$t('m.enterPass')" v-model="verification.password" :type="pwdType">
        <img :src="seen?openeye:nopeneye" @click="changeType()" />
      </mt-field>
      <img src="../../assets/images/password.svg" alt="" class="login-icon">
      
      <div class="login-radio">
        <span>下次自动登录</span>
        <mt-switch v-model="verification.model" class="fr" size="12px"></mt-switch>
      </div>
    </div>
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="login">
        <!-- <router-link to="password">
          <p class=" fr forget-pwd">忘记密码</p>
        </router-link> -->
        <div class="login-btn">
          <mt-button type="primary" @click="handleLogin" :disabled="disabled" size="large">{{$t('m.login')}}</mt-button>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <div class="login-switch fl">
      <router-link to="/register">
        <p>{{$t('m.goRegister')}}</p>
      </router-link>
    </div>
    <router-link to="password">
        <p class=" fr forget-pwd">{{$t('m.forgetPass')}} ?</p>
      </router-link>
  </div>
</template>

<script>
  import { toast } from '@/assets/js/pub.js'
  import { Toast } from 'mint-ui'
  // 接口请求
  import api from "@/api/user/User.js"
  export default {
    data() {
      return {
        disabled: true,
        status: '',
        active: 'login',
        username: {},
        hide: false,
        show: true,
        action: {
          account_type: null,
          action: null
        },
        items: [{
          state: false
        }],
        // 显示与隐藏密码
        seen: '',
        pwdType: "password",
        openeye: require('../../assets/images/eye-open.svg'), //图片地址
        nopeneye: require('../../assets/images/eye-close.svg'), //图片地址
        // 登录参数
        verification: {
          username: '',
          password: '',
          model: false,
        },
        // 忘记密码参数
        forgetPwd: {
          username: '',
          new_pwd: '',
          new_pwd2: ''
        },
        // 短信参数
        sms: {
          mobile: [],
          action: 1
        },
        // 邮箱参数
        email: {
          action: 1,
          email: []
        },
      }
    },
    created() {
      // console.log(localStorage.getItem('token'))
    },
    beforeRouteEnter(to, from, next) {
      window.document.body.style.backgroundColor = "#fff"
      next()
    },
    beforeRouteLeave(to, from, next) {
      window.document.body.style.backgroundColor = ""
      next()
    },
    methods: {
      //  登录
      handleLogin() {
          // this.verification.token = localStorage.getItem('token')
          api.is_use({ username: this.verification.username }).then(res => {
            if (res.is_use === true) {
              this.$store.dispatch("loginByCode", this.verification).then(res => {
                if (res.code == 0) {
                  // 消息提示
                  // toast(res)
                  this.$router.push("/home")
                  this.$Indicator.close()
                }
              }).catch(err => {
                if (err.code !== 0) {
                  toast(err)
                }
                this.$Indicator.close()
              })
            } else {
              toast(res)
              this.$router.push({
                name: 'Login'
              })
            }
          }).catch(err => {
            // toast(err)
            // console.log(err)
          })
        // } 
        // window.sessionStorage.setItem('action', this.verification.username)
      },
      // 发送验证码
      sendCode() {
        // 发送信息
        var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
        if (reg.test(this.verification.username)) {
          this.action.account_type = 1
          this.action.action = 2
          //发送邮箱
          this.email.email = this.verification.username
          api.email(this.email).then(res => {
            toast(res)
          }).catch(err => {
            toast(err)
          })
        } else {
          // 发送短信
          this.action.account_type = 0
          this.action.action = 1
          this.sms.mobile = this.verification.username
          api.sms(this.sms).then(res => {
          }).catch(err => {
            toast(err)
          })
        }
      },
      // 邮箱/手机号校验
      check() {
        var email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
        var tel = /^1[23456789]\d{9}$/
        if (!email.test(this.verification.username) && !tel.test(this.verification.username)) {
          // this.status = 'error'
          Toast({
            message: '请填写正确的手机号或邮箱地址',
            className: 'zZindex'
          })
        } else {
          // this.status = 'success'
        }
      },
      // 密码校验
      // pwdCheck() {
      //   var password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
      //   if (!password.test(this.verification.password)) {
      //     // this.pwdlStatus = 'error'
      //     Toast({
      //       message: '请输入8-16位数字加字母组合密码',
      //       className: 'zZindex'
      //     })
      //   } else {
      //     // this.pwdlStatus = 'success'
      //   }
      // },
      // 隐藏与显示密码
      changeType() {
        this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
        this.seen = !this.seen
      }
    },
    watch: {
      // 登录页当邮箱和密码全部输入，按钮变色
      verification: {
        immediate: true,
        deep: true,
        handler(val) {
          // debugger
          let tel = /^1[23456789]\d{9}$/
          let email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
          // var pass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
          if (val.username != '' && val.password != '' && (email.test(val.username) || tel.test(val.username))) {
            // 高亮
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
  @import '../../assets/scss/global';
  .login {
    width: 100%;
		height: 100%;
		background-color: #fff;
		position: fixed;
    .logo {
      .mint-cell-wrapper {
        background-image: none;
      }

      img {
        width: 60%;
        margin: 100px auto 100px auto;
        display: block;
      }
    }

    .login-title {
      margin: 0 0 100px 54px;

      span {
        font-size: 60px;
      }
    }

    .login-form {
      margin: 150px 54px 100px 54px;

      .mint-field .mint-cell-title {
        width: 40px;
      }

      .mint-cell-text {
        color: #999;
        margin-left: 10px;
      }

      .mint-cell-wrapper {
        border-bottom: 1px solid #f6f6f6;
        margin: 0 20px;
      }

      .login-icon {
        top: -70px;
        position: relative;
      }

      /* .mint-field-core {
        margin-left: 20px;
        font-size: 26px;
        color: #333;
      } */

    }

    .forget-pwd {
      font-size: 26px;
      color: #333;
      margin:40px 60px 0 0;
    }

    .login-btn {
      margin: 0 60px;
    }

    .login-switch {
      p {
        color: #036EB8;
        font-size: 26px;
        margin: 40px 0 0 60px;
      }

    }

    .login-radio {
      margin: 30px 0;
      height: 20px;
    }
  }
</style>