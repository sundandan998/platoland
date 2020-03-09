<template>
  <div class="forget-password">
    <router-link to="login">
      <div class="login-cancel">
        <img src="../../../assets/images/back.svg" alt="" />
        <span>{{$t('m.back')}}</span>
      </div>
    </router-link>
    <!-- <div class="logo">
      <img src="../../../assets/images/login-logo.png" alt="" />
    </div> -->
    <div class="forget-password-title">
      <h1>{{$t('m.resetLoginPass')}}</h1>
    </div>
    <p class="account-number">{{$t('m.enterAccountNumber')}}</p>
    <div class="login-content">
      <!-- <img src="../../../assets/images/email.png" alt="" class="login-icon"> -->
      <!-- v-model="" -->
      <mt-field  v-model="verification.username" :placeholder="$t('m.enterName')" @blur.native.capture="check"
        :state="status"></mt-field>
      <!-- <img src="../../../assets/images/email.png" alt="" class="login-icon"> -->
      <!-- <mt-field label="手机号" v-model="verification.username" placeholder="请输入手机号"  type="tel" @blur.native.capture="telCheck" :state="telStatus"></mt-field> -->
      <!-- <el-form :model="verification" ref="verification" v-model="verification.emails" :rules="rules"
        class="verification-input">
        <el-form-item prop="emails">
          <el-input v-model="verification.username" placeholder="邮箱">
            <i slot="prefix">
              <img src="../../../assets/images/email.png" alt="">
            </i>
          </el-input>
        </el-form-item>
      </el-form>
      <el-form :model="verification" ref="verification" v-model="verification.emails" :rules="rules"
        class="verification-input">
        <el-form-item prop="emails">
          <el-input v-model="verification.username" placeholder="手机号">
            <i slot="prefix">
              <img src="../../../assets/images/email.png" alt="">
            </i>
          </el-input>
        </el-form-item>
      </el-form> -->
    </div>
    <div class="forget-password-btn">
      <!-- <router-link :to="{name:'Reset',params:{}}"> -->
      <mt-button type="primary" @click="resetPwd" class="nextbtn" :disabled="disabled" size="large">{{$t('m.next')}}</mt-button>
      <!-- </router-link> -->
    </div>
  </div>
</template>
<script>
  import { toast } from '@/assets/js/pub.js'
  // 接口请求
  import api from "@/api/system/System.js"
  export default {
    data() {
      return {
        value: '',
        disabled: true,
        showKeyboard: true,
        showPwd: '',
        status: '',
        username: {},
        verification: {
          username: '',
        },
        // 信息参数
        sms: {
          mobile: '',
          action: 0
        },
        // 邮箱参数
        email: {
          email: '',
          action: 0
        },
        // rules: {
        //   // 校验邮箱
        //   username: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' }, { type: 'emails', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]
        // },
        // rules1: {
        //   // 手机号校验
        //   username: [{ required: true, message: '请输入手机号码', trigger: 'blur' }, { pattern: 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/, message: '请输入正确的手机号码' }]
        // }
      }
    },
    beforeRouteEnter(to, from, next) {
      window.document.body.style.backgroundColor = "#fff"
      next()
    },
    beforeRouteLeave(to, from, next) {
      window.document.body.style.backgroundColor = ""
      next()
    },
    created() {
    },
    methods: {
      // 检测用户名是否唯一接口
      resetPwd() {
        api.is_use({ username: this.verification.username }).then(res => {
          window.sessionStorage.setItem('forgetUsername', JSON.stringify(this.verification.username))
          if (res.is_use === true) {
            // 发送信息或邮件
            var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
            if (reg.test(this.verification.username)) {
              this.email.email = this.verification.username
              api.email(this.email).then(res => {
                if (res.code == 0) {
                  toast(res)
                  this.$router.push({
                    name: 'Reset',
                    params: { action: 0, account_type: 1, username: this.verification.username }
                  })
                }
              }).catch(err => {
                if (err.code != 0) {
                  toast(err)
                }
              })
            } else {
              this.sms.mobile = this.verification.username
              api.sms(this.sms).then(res => {
                if (res.code == 0) {
                  toast(res)
                  this.$router.push({
                    name: 'Reset',
                    params: { action: 0, account_type: 0, username: this.verification.username }
                  })
                }
              }).catch(err => {
                if (err.code != 0) {
                  toast(err)
                }
              })
            }
          } else {
            toast(res)
            this.$router.push({
              name: 'Login'
            })
          }
        }).catch(err => {
          if (err.code != 0) {
            toast(err)
          }
        })
      },
      // 邮箱校验或手机号校验
      check() {
        var email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
        var tel = /^1[23456789]\d{9}$/
        if (!email.test(this.verification.username) && !tel.test(this.verification.username)) {
          this.status = 'error'
        } else {
          this.status = 'success'
        }
      },
    },
    watch: {
      verification: {
        immediate: true,
        deep: true,
        handler(val) {
          // debugger
          var tel = /^1[23456789]\d{9}$/
          var email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
          if (val.username != '' && email.test(val.username) || tel.test(val.username)) {
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
  .forget-password {
    width: 100%;
		height: 100%;
		background-color: #fff;
		position: fixed;
    .login-cancel {
      img{
        margin-left:50px;
        width: 25px;
        position: relative;
        top:40px;
      }
      span {
        color: #333;
        position: relative;
        top:40px;
      }
    }
    .logo{
      img {
      width: 60%;
      margin: 50px auto;
      display: block;
    }
    
    
    }
    .forget-password-title{
      margin: 100px auto;
      text-align:center;
    }
    .mint-cell-wrapper{
      font-size: 14px;
    }
    .account-number{
      margin-left: 68px;
      font-size: 32px;
    }
    .login-content {
      margin:0 54px 50px 54px;
      img {
        position: relative;
        top: 39px;
        z-index: 1;
        left: 15px;
      }
      /* .mint-field-core{
        margin-left: 50px;
      } */
    }
    .forget-password-btn{
      width:85%;
      margin:0 auto;
    }
  }
</style>