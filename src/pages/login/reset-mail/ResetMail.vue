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
      <!-- 注册时展示 -->
      <!-- <p></p> -->
      <p>已向{{this.$route.params.username}}发送验证信息</p>
      <span>请输入验证码。</span>
      <div class="verification-code">
        <van-password-input :value="registerParsms.code" @focus="showKeyboard = true" />
        <span v-show="showTimer" class="fr" @click="renewCode">重新发送验证码</span>
        <span v-show="!showTimer" class="count fr">{{count}} s</span>
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
        // 60s倒计时
        showTimer: true,
        count: '',
        timer: null,
        showRegister: false,
        showPwd: false,
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
        // 校验验证码参数
        checkCode: {
          account: '',
          account_type: '',
          action: 0,
          code: ''
        }
      }
    },
    created() {
    },
    methods: {
      register() {
        // 判断走重置登录密码页面还是走注册
        // 走重置登录密码
        this.checkCode.account_type = this.$route.params.account_type
        this.checkCode.code = this.registerParsms.code
        this.checkCode.account = this.$route.params.username
        if (this.$route.params.action == 0) {
          api.checkCode(this.checkCode).then(res => {
            if (res.code == 0) {
              this.$router.push({
                name: 'ResetPwd'
              })
            }
          }).catch(err => {
            toast(err)
          })
          // 走注册
        } else {
          this.registerParsms.username = this.$route.params.username
          this.registerParsms.password = this.$route.params.password
          if (this.$route.params.action != 0) {
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
          }
        }
      },
      // 重新发送验证码
      renewCode() {
        this.registerParsms.code = ''
        this.email.email = this.$route.params.username
        // 发送信息
        // if (this.account_type == '0') {
        //   api.sms(this.sms).then(res => {
        //     if (res.code == 0) {
        //       toast(res)
        //       const TIME_COUNT = 60;
        //       if (!this.timer) {
        //         this.count = TIME_COUNT;
        //         this.showTimer = false;
        //         this.timer = setInterval(() => {
        //           if (this.count > 0 && this.count <= TIME_COUNT) {
        //             this.count--;
        //           } else {
        //             this.showTimer = true;
        //             clearInterval(this.timer);
        //             this.timer = null;
        //           }
        //         }, 1000)
        //       }
        //     }
        //   }).catch(err => {
        //     if (err.code != 0) {
        //       toast(err)
        //     }
        //   })
        // } else {
        // 发送邮箱
        api.email(this.email).then(res => {
          if (res.code == 0) {
            toast(res)
            const TIME_COUNT = 60;
            if (!this.timer) {
              this.count = TIME_COUNT;
              this.showTimer = false;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  this.showTimer = true;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000)
            }
          }
        }).catch(err => {
          if (err.code != 0) {
            toast(err)
          }
        })
      },
      onInput(key) {
        this.registerParsms.code = (this.registerParsms.code + key).slice(0, 6)
      },
      onDelete() {
        this.registerParsms.code = this.registerParsms.code.slice(0, this.registerParsms.code.length - 1)
      },
      back() {
        window.history.back()
      }
    },
    watch: {
      registerParsms: {
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