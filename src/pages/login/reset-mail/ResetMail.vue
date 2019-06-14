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
        <span class="fr">重新发送验证码</span>
        <!-- 数字键盘 -->
        <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = false"
        />
      </div>
    </div>
    <div class="login-btn">
      <mt-button type="default" @click="verification" :disabled="disabled">确&nbsp;定</mt-button>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
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
      code: {
        account: '',
        account_type: 1,
        action: 2,
        code: ''
      }
    }
  },
  created() {
    var codeData = window.sessionStorage.getItem('verification')
    codeData = JSON.parse(codeData)
    this.code.account = codeData.username
  },
  methods: {
    // 校验验证码
    verification() {
      api.checkCode(this.code).then(res => {
        if (res.code == 0) {
          Toast({
            message: res.msg,
            position: 'top',
            className: 'zZindex'
          })
          this.$router.push({
            name: 'Login'
          })
        }
      }).catch(err => {
        console.log(err)
      })
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
        if (val.code !== '' && val.code.length==6) {
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