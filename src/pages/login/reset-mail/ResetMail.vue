<template>
  <div class="reset-mail">
    <div class="login-cancel" @click="back">
      <img src="../../../assets/images/cancel.png" alt="" />
    </div>
    <div class="logo">
      <img src="../../../assets/images/logo.png" alt="" />
    </div>
    <div class="reset-mail-information">
      <img src="../../../assets/images/r-email.png" alt="" />
      <p>已向{{this.code.account}}发送验证信息</p>
      <span>请输入验证码。</span>
      <div class="verification-code">
        <van-password-input :value="code.code" @focus="showKeyboard = true" />
        <span class="fr" @click="renewCode">重新发送验证码</span>
        <!-- 数字键盘 -->
        <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = false" />
      </div>
    </div>
    <div class="login-btn">
      <mt-button type="default" @click="register" :disabled="disabled">确&nbsp;定</mt-button>
    </div>
  </div>
</template>
<script>
  import { toast } from '@/assets/js/pub.js'
  // 接口请求
  // import api from "@/api/system/System.js"
  import api from "@/api/user/User.js"
  export default {
    data() {
      return {
        value: '',
        show: true,
        showKeyboard: false,
        disabled: true,
        // 短信参数
        sms: {
          mobile: '',
          action: ''
        },
        // 邮箱参数
        email: {
          action: '',
          email: ''
        },
        // 注册参数
        registerParsms: {
          username: '',
          password: '',
          code: ''
        },
        code: {
          code: ''
        }
      }
    },
    created() {
    },
    methods: {
      // 注册
      register() {
        var registerData = window.sessionStorage.getItem('verification')
        registerData = JSON.parse(registerData)
        this.registerParsms.username = registerData.username
        this.registerParsms.password = registerData.password
        this.registerParsms.code = this.code.code
        api.register(this.registerParsms).then(res => {
          if (res.code == 0) {
            toast(res)
            this.$router.push({
              name: 'Login'
            })
          }
        }).catch(err => {
          toast(err)
        })
      },
      // 重新发送验证码
      renewCode() {
        var registerData = window.sessionStorage.getItem('verification')
        var actionData = window.sessionStorage.getItem('action')
        registerData = JSON.parse(registerData)
        actionData = JSON.parse(actionData)
        this.account_type = actionData.account_type
        this.sms.action = actionData.action
        this.sms.mobile = registerData.username
        this.email.action = actionData.action
        this.email.email = registerData.username
        // 发送信息
        if (this.account_type == '0') {
          api.sms(this.sms).then(res => {
            if (res.code = 0) {
              toast(res)
            }
          }).catch(err => {
            if (err.code != 0) {
              toast(err)
            }
          })
        } else {
          // 发送邮箱
          api.email(this.email).then(res => {
            if (res.code= 0) {
              toast(res)
            }
          }).catch(err => {
            if (err.code != 0) {
              toast(err)
            }
          })
        }
      },
      onInput(key) {
        this.code.code = (this.code.code + key).slice(0, 6)
      },
      onDelete() {
        this.code.code = this.code.code.slice(0, this.code.code.length - 1)
      },
      back() {
        window.history.back()
      }
    },
    watch: {
      code: {
        immediate: true,
        deep: true,
        handler(val) {
          if (val.code !== '' && val.code.length == 6) {
            this.disabled = false
            this.showKeyboard = false
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../assets/scss/global'
</style>