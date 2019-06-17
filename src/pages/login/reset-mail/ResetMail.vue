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
      <mt-button type="default" @click="verification" :disabled="disabled">确&nbsp;定</mt-button>
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import { message } from '@/assets/lang/message.js'
  // 接口请求
  import api from "@/api/system/System.js"
  export default {
    data() {
      return {
        value: '',
        show: true,
        showKeyboard: false,
        disabled: true,
        codeData: {},
        // 短信参数
        sms: {
          mobiles: [],
          action: ''
        },
        // 邮箱参数
        email: {
          action: '',
          emails: []
        },
        code: {
          account: '',
          account_type: '',
          action: '',
          code: ''
        }
      }
    },
    created() {
      // 获取存在session中的verification数据
      var codeData = window.sessionStorage.getItem('verification')
      codeData = JSON.parse(codeData)
      this.code.account = codeData.username
      // 获取存在session中的action数据
      var type = window.sessionStorage.getItem('action')
      type = JSON.parse(type)
      this.code.action = type.action
      this.code.account_type = type.account_type
      this.sms.action = type.action
      this.sms.mobiles = codeData.username
      this.email.action = type.action
      this.email.emails = codeData.username
      // console.log(this.email)
    },
    methods: {
      // 校验验证码
      verification() {
        api.checkCode(this.code).then(res => {
          if (res.code == 0) {
           // 消息提示
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
        // 发送信息
        if (this.account_type == '0') {
          api.sms(this.this.sms).then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        } else {
          // 发送邮箱
          api.email(this.email).then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
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