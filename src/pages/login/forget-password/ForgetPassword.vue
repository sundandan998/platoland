<template>
  <div class="forget-password">
    <div class="login-cancel">
      <img src="../../../assets/images/cancel.png" alt="" />
    </div>
    <div class="logo">
      <img src="../../../assets/images/logo.png" alt="" />
    </div>
    <div class="forget-password-title">
      <h1>重置登录密码</h1>
    </div>
    <div class="login-content">
      <el-form :model="verification" ref="verification" v-model="verification.email" :rules="rules" class="verification-input">
        <el-form-item prop="email">
          <el-input v-model="verification.username" placeholder="邮箱">
            <i slot="prefix">
              <img src="../../../assets/images/email.png" alt="">
            </i>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="forget-password-btn">
      <!-- <router-link :to="{name:'Reset',params:{}}"> -->
        <mt-button type="primary" @click="resetPwd" class="nextbtn":disabled="disabled">下一步</mt-button>
      <!-- </router-link> -->
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import pub from '@/assets/js/pub.js'
// 接口请求
import api from "@/api/system/System.js"
export default {
  data() {
    return {
      value: '',
      disabled: true,
      showKeyboard: true,
      username:{},
      verification: {
        username: ''
      },
      rules: {
        // 校验邮箱
        username: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]
      }
    }
  },
  methods: {
    // 检测用户名是否唯一接口
    resetPwd() {
      api.is_use({username:this.verification.username}).then(res=>{
        if(res.is_use === true){
          this.$router.push({
           name:'ResetPwd'
         })
        }else{
         Toast({
            message: '邮箱未注册',
            position: 'top',
            className: 'zZindex'
          })
          this.$router.push({
            name:'Login'
          })
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  watch:{
    verification:{
      immediate: true,
        deep: true,
        handler(val) {
          // debugger
          if(val.email != '')
          this.disabled = false
        }
    }
  }

}
</script>

<style lang="scss">
  @import '../../../assets/scss/global'
</style>