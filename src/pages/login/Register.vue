<template>
  <div class="register">
    <router-link to="login">
      <div class="login-cancel">
        <img src="../../assets/images/back.svg" alt="" />
        <span>登录</span>
        <!-- <img src="../../assets/images/cancel.png" alt="" /> -->
      </div>
    </router-link>
    <div class="logo">
      <img src="../../assets/images/login-logo.png" alt="" />
    </div>
    <div class="register-tab login-form">
      <van-tabs v-model="active" @click="clear">
        <van-tab title="手机号注册">
          <mt-field  placeholder="请输入手机号" v-model="verification.username" type="tel"
            @blur.native.capture="telCheck" :state="telStatus">
          </mt-field>
          <img src="../../assets/images/tel.svg" alt="" class="login-icon">
        </van-tab>
        <van-tab title="邮箱注册">
          <mt-field placeholder="请输入邮箱" v-model="verification.username" type="email"
            @blur.native.capture="emailCheck" :state="emailStatus">
          </mt-field>
          <img src="../../assets/images/email.png" alt="" class="login-icon">
        </van-tab>
      </van-tabs>
    </div>
    <div class="login-form">
      <!-- @blur.native.capture="pwdCheck" -->
      <mt-field  placeholder="请输入6-16位数字加字母组合密码" v-model="verification.password" :type="pwdType">
        <img :src="seen?openeye:nopeneye" @click="changeType()" />
      </mt-field>
      <img src="../../assets/images/password.svg" alt="" class="login-icon">
    </div>
    <div class="login-checkbox">
      <span>注册即表示同意
        <router-link to="agreement">
          <a href="">《用户使用协议》</a>
        </router-link>
      </span>
    </div>
    <div class="login-btn">
      <!-- <router-link :to="{name:'Reset',params:{username:verification.username,password:verification.password}}"> -->
      <mt-button type="default" @click="sendCode" :disabled="disabled" size="large">注&nbsp;册</mt-button>
      <!-- </router-link> -->
    </div>
    <div class="login-switch">
      <router-link to="/login">
        <p>已有账号？去登录</p>
      </router-link>
    </div>
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
        emailStatus: '',
        telStatus: '',
        active: 0,
        // active: 'login',
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
          console.log(err)
        })
        // window.sessionStorage.setItem('action', this.verification.username)
      },
      // 发送验证码
      sendCode() {
        var password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
        if (!password.test(this.verification.password)) {
          Toast({
            message: '请输入6-16位数字加字母组合密码',
            className: 'zZindex'
          })
        } else {
          this.router()
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
        }

      },
      // 邮箱校验
      emailCheck() {
        var email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
        if (!email.test(this.verification.username)) {
          // this.emailStatus = 'error'
          Toast({
            message: '请填写正确的邮箱地址',
            className: 'zZindex'
          })
        } else {
          // this.emailStatus = 'success'
        }
      },
      // 手机号校验
      telCheck() {
        var tel = /^1[23456789]\d{9}$/
        if (!tel.test(this.verification.username)) {
          // this.telStatus = 'error'
          Toast({
            message: '请填写正确手机号',
            className: 'zZindex'
          })
        } else {
          // this.telStatus = 'success'

        }
      },
      router(){
        this.$router.push({
          name:'Reset',
          params:{username:this.verification.username,password:this.verification.password}
        })
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
      },
      clear(index) {
        this.verification.username = ''
        this.verification.password = ''
      }
    },

    watch: {
      // 登录页当邮箱和密码全部输入，按钮变色
      verification: {
        immediate: true,
        deep: true,
        handler(val) {
          // debugger
          var tel = /^1[23456789]\d{9}$/
          var email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
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
  .register{
    .login-cancel {
    margin:10px 0 30px 54px;
    img {
      height: 25px;
    }
    span {
      position: relative;
      top:-5px;
      color: #333;
    }
  }
    .logo{
      img {
      width: 60%;
      margin: 50px auto 150px auto;
      display: block;
    }
    }
  .login-checkbox {
    margin:50px 0 10px 64px;
    a {
      color: #036EB8;
    }
  }

 
  .register-tab {
    margin-top: 50px;
    .van-tab {
      flex: none;
      margin-left: 15px;
    }

    .van-tabs__content {
      margin-top: 60px;
    }
  }

  .login-form {
    margin:0 54px;
    .van-ellipsis{
      font-size: 26px;
    }
    .van-tabs__wrap.van-hairline--top-bottom{
      height: 60px;
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
      top: -50px;
      position: relative;
    }
  .van-tabs__wrap.van-hairline--top-bottom {
      height: unset;
  }
  [class*=van-hairline]::after{
    border:none;
  }
  .van-tabs__nav--line {
    padding-bottom: 0.4rem;
}  
  }

  .login-switch {
    p {
      font-size: 24px;
      text-align: center;
      color: #036EB8;
      margin-top: 10px;
    }

  }
}
</style>