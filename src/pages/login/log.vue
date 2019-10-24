<template>
    <div class="login">
      <router-link to="home">
        <div class="login-cancel">
          <img src="../../assets/images/cancel.png" alt="" />
        </div>
      </router-link>
      <div class="logo">
        <img src="../../assets/images/logo.png" alt="" />
      </div>
      <mt-navbar v-model="active" class="login-tab">
        <mt-tab-item id="login">登录</mt-tab-item>
        <mt-tab-item id="register">注册</mt-tab-item>
      </mt-navbar>
      <div class="login-form">
        <mt-field label="邮箱" placeholder="请输入邮箱" v-model="verification.username" type="email"
          @blur.native.capture="emailCheck" :state="emailStatus" v-if="show">
        </mt-field>
        <img src="../../assets/images/email.png" alt="" class="login-icon" v-if="show">
        <mt-field v-if="hide" label="手机" placeholder="请输入手机号" v-model="verification.username" type="tel"
          @blur.native.capture="telCheck" :state="telStatus">
        </mt-field>
        <img src="../../assets/images/tel.svg" alt="" class="login-icon" v-if="hide">
        <mt-field label="密码" placeholder="请输入8-16位数字加字母组合密码" v-model="verification.password" :type="pwdType"
          @blur.native.capture="pwdCheck" :state="pwdlStatus">
          <img :src="seen?openeye:nopeneye" @click="changeType()" />
        </mt-field>
        <img src="../../assets/images/pass.png" alt="" class="login-icon">
      </div>
      <mt-tab-container v-model="active">
        <mt-tab-container-item id="login">
          <router-link to="password">
            <span class="fr forget-pwd">忘记密码</span>
          </router-link>
  
          <div class="login-btn">
            <mt-button type="default" @click="handleLogin" :disabled="disabled">登&nbsp;录</mt-button>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="register">
          <div class="login-checkbox" v-for="item of items">
            <span>注册即表示同意
              <router-link to="agreement">
                <a href="">《用户使用协议》</a>
              </router-link>
            </span>
          </div>
          <div class="login-btn">
            <router-link :to="{name:'Reset',params:{username:verification.username,password:verification.password}}">
              <mt-button type="default" @click="sendCode" :disabled="disabled">注&nbsp;册</mt-button>
            </router-link>
          </div>
  
        </mt-tab-container-item>
      </mt-tab-container>
      <div class="login-switch">
        <p @click="changeMobile" v-if="show">手机号注册 ></p>
        <p v-if="hide" @click="changeEmail">邮箱注册 ></p>
      </div>
    </div>
  </template>
  
  <script>
    import { toast } from '@/assets/js/pub.js'
    // 接口请求
    import api from "@/api/user/User.js"
    export default {
      data() {
        return {
          disabled: true,
          emailStatus: '',
          telStatus:'',
          pwdlStatus: '',
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
          openeye: require('../../assets/images/eye-open.png'), //图片地址
          nopeneye: require('../../assets/images/eye-close.png'), //图片地址
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
        // 邮箱校验
        emailCheck() {
          var email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
          if (!email.test(this.verification.username)) {
            this.emailStatus = 'error'
          } else {
            this.emailStatus = 'success'
          }
        },
        // 手机号校验
        telCheck() {
          var tel = /^1[23456789]\d{9}$/
          if (!tel.test(this.verification.username)) {
            this.telStatus = 'error'
          } else {
            this.telStatus = 'success'
          }
        },
        // 密码校验
        pwdCheck() {
          var password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
          if (!password.test(this.verification.password)) {
            this.pwdlStatus = 'error'
          } else {
            this.pwdlStatus = 'success'
          }
        },
        // 隐藏与显示密码
        changeType() {
          this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
          this.seen = !this.seen
        },
        // 切换手机号登录
        changeMobile() {
          this.hide = true
          this.show = false
        },
        // 切换邮箱登陆
        changeEmail() {
          this.hide = false
          this.show = true
        },
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
            var pass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
            if (val.username != '' && email.test(val.username)||tel.test(val.username) && val.password != '' && pass.test(val.password)) {
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
  
    body {
      height: 100%;
      background-color: #fff;
    }
  
    .login-form {
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
        top: -32px;
        left: 28px;
        position: relative;
      }
    }
  
    .login-switch {
      text-align: center;
      color:#456DF1;
    }
  </style>