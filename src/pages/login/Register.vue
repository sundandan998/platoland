<template>
  <div class="register">
    <router-link to="login">
      <div class="login-cancel">
        <img src="../../assets/images/back.svg" alt="" />
        <span>{{$t('m.login')}}</span>
        <!-- <img src="../../assets/images/cancel.png" alt="" /> -->
      </div>
    </router-link>
    <div class="logo">
      <img src="../../assets/images/login-logo.png" alt="" />
    </div>
    <div class="register-tab login-form">
      <!-- @click="register" -->
      <van-tabs v-model="active">
        <van-tab :title="$t('m.telRegister')">
          <el-form :model="verification" ref="verification" label-width="20px" class="demo-dynamic">
            <!-- 手机号 -->
            <el-form-item prop="tel" :rules="[{message: '请输入手机号', trigger: 'blur' },
            { pattern: /^1[23456789]\d{9}$/, message: '请输入正确手机号' }]">
              <img src="../../assets/images/tel.svg" alt="" class="login-icon">
              <el-input v-model="verification.tel" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password" :rules="[ { message: '请输入6-16位字母加数字组合密码', trigger: 'blur' },
            { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/, message: '密码为6-16位字母加数字组合' }]">
              <img :src="seen?openeye:nopeneye" @click="changeType()" class=" fr password-img" />
              <img src="../../assets/images/password.svg" alt="" class="pass-icon">
              <el-input :type="pwdType" v-model="verification.password" autocomplete="off"
                :placeholder="$t('m.registerPass')">
              </el-input>
            </el-form-item>
            <!-- 邀请码 -->
            <el-form-item prop="invite_code">
              <img src="../../assets/images/code.svg" alt="" class="login-icon">
              <el-input v-model="verification.invite_code" autocomplete="off" :placeholder="$t('m.registerCode')"></el-input>
            </el-form-item>
          </el-form>
        </van-tab>
        <van-tab :title="$t('m.emilRegister')">
          <el-form :model="verification" ref="verification" label-width="20px" class="demo-dynamic">
            <!-- 邮箱 -->
            <el-form-item prop="email" :rules="[ { message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
              <img src="../../assets/images/email.png" alt="" class="login-icon">
              <el-input v-model="verification.email" :placeholder="$t('m.emailNumber')"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password" :rules="[ { message: '请输入6-16位字母加数字组合密码', trigger: 'blur' },
            { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/, message: '密码为6-16位字母加数字组合' }]">
              <img :src="seen?openeye:nopeneye" @click="changeType()" class=" fr password-img" />
              <img src="../../assets/images/password.svg" alt="" class="pass-icon">
              <el-input :type="pwdType" v-model="verification.password" autocomplete="off"
                :placeholder="$t('m.registerPass')">
              </el-input>
            </el-form-item>
            <!-- 邀请码 -->
            <el-form-item prop="invite_code">
              <img src="../../assets/images/code.svg" alt="" class="login-icon">
              <el-input v-model="verification.invite_code" autocomplete="off" :placeholder="$t('m.registerCode')"></el-input>
            </el-form-item>
          </el-form>
        </van-tab>
      </van-tabs>
    </div>
    <div class="login-checkbox">
      <span>
          {{$t('m.agree')}}
        <router-link to="agreement">
          <a href="">《{{$t('m.userAgreement')}}》</a>
        </router-link>
      </span>
    </div>
    <div class="login-btn" @click="register">
      <mt-button type="primary" :disabled="disabled" size="large">{{$t('m.register')}}</mt-button>
    </div>
    <div class="login-switch">
      <router-link to="/login">
        <p>{{$t('m.goLogin')}}</p>
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
      // let check = (rule, value, callback) => {
      //   if (!value) {
      //     return callback(new Error('不能为空'))
      //   }
      // }
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
        // 注册参数
        verification: {
          username: '',
          password: '',
          invite_code: '',
          email: '',
          tel: '',
        },
        rules: {
          // 手机号
          // tel: [
          //   { validator: check, message: '请输入手机号', trigger: 'blur' },
          //   { pattern: /^1[23456789]\d{9}$/, message: '请输入正确手机号' }
          // ],
          // // 邮箱
          // email: [
          //   { validator: check, message: '请输入邮箱地址', trigger: 'blur' },
          //   { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          // ],
          // password: [
          //   // validator: validatePass,
          //   { validator: check, message: '请输入6-16位字母加数字组合密码', trigger: 'blur' },
          //   { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/, message: '密码为6-16位字母加数字组合' }
          // ]
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
      register() {
        // 检测邀请码是否正确
        api.inviteCode(this.verification).then(res => {
          if (res.code == 0) {
            this.router()
            // 发送信息
            let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
            if (reg.test(this.verification.email)) {
              this.action.account_type = 1
              this.action.action = 2
              //发送邮箱
              this.email.email = this.verification.email
              api.email(this.email).then(res => {
                toast(res)
              }).catch(err => {
                toast(err)
              })
            } else {
              // 发送短信
              this.action.account_type = 0
              this.action.action = 1
              this.sms.mobile = this.verification.tel
              api.sms(this.sms).then(res => {
                toast(res)
              }).catch(err => {
                toast(err)
              })
            }
          }
        }).catch(err => {
          if (err.code == 4003) {
            toast(err)
          }
        })
      },
      router() {
        this.$router.push({
          name: 'Reset',
          params: { username: this.verification.tel || this.verification.email, password: this.verification.password, invite_code: this.verification.invite_code }
        })
      },
      // 隐藏与显示密码
      changeType() {
        this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
        this.seen = !this.seen
      },

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
          let password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
          if ((tel.test(this.verification.tel) && val.tel != '' && password.test(this.verification.password) && val.password != '' && val.invite_code != '') || (email.test(this.verification.email) && val.email != '' && password.test(this.verification.password) && val.password != '' && val.invite_code != '')) {
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

  .register {
    width: 100%;
		height: 100%;
		background-color: #fff;
		position: fixed;
    input.el-input__inner {
      position: relative;
      left: 10px;
    }

    .login-cancel {
      margin: 10px 0 30px 54px;

      img {
        height: 25px;
        position: relative;
        top: 40px;
      }

      span {
        position: relative;
        top: 40px;
        color: #333;
      }
    }

    .logo {
      img {
        width: 60%;
        margin: 100px auto 150px auto;
        display: block;
      }
    }

    .login-checkbox {
      margin: 50px 0 10px 64px;

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

      .password-img {
        position: relative;
        top: 60px;
        z-index: 11;
      }

      .login-icon {
        z-index: 11;
        position: absolute;
        top: 25px;
        left: -10px;
      }

      .pass-icon {
        z-index: 11;
        position: absolute;
        top: 50px;
        left: -10px;
      }

      .van-tabs__content {
        margin: 20px 0 40px 0;
      }
    }

    .login-form {
      margin: 0 54px;

      .van-tabs__wrap.van-hairline--top-bottom {
        height: 60px;
      }

      .el-form-item__error {
        margin-left: 40px;
      }

      .mint-cell-text {
        color: #999;
        margin-left: 10px;
      }

      .mint-cell-wrapper {
        border-bottom: 1px solid #f6f6f6;
        margin: 0 20px;
      }

      .van-tabs__wrap.van-hairline--top-bottom {
        height: unset;
      }

      [class*=van-hairline]::after {
        border: none;
      }
    }

    .login-switch {
      p {
        font-size: 24px;
        text-align: center;
        color: #036EB8;
        margin-top: 60px;
      }

    }

    .login-btn {
      margin: 0 60px;
    }
  }
</style>