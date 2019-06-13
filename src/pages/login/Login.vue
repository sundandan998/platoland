<template>
  <div class="login">
    <router-link to="/">
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
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="login">
        <el-form :model="verification" ref="verification" :rules="rules" class="verification-input">
          <el-form-item prop="username" v-if="show">
            <el-input v-model="verification.username" placeholder="邮箱">
              <i slot="prefix">
                <img src="../../assets/images/email.png" alt="">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item prop="mobile" v-if="hide">
            <el-input v-model="verification.mobile" placeholder="手机号" type="number">
              <i slot="prefix">
                <img src="../../assets/images/email.png" alt="">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="verification.password" autocomplete="off" placeholder="密码">
              <i slot="prefix">
                <img src="../../assets/images/pass.png" alt="">
              </i>
            </el-input>
          </el-form-item>
        </el-form>
        <router-link to="password">
          <span class="fr forget-pwd">忘记密码</span>
        </router-link>
        <div class="login-btn">
          <mt-button type="default" @click="handleLogin" :disabled="disabled">登&nbsp;录</mt-button>
          <p @click="changeMobile" v-if="show">手机号登陆 ></p>
          <p v-if="hide" @click="changeEmail">邮箱登陆 ></p>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="register">
        <el-form :model="verification" ref="verification" :rules="rules" class="verification-input">
          <el-form-item prop="username" v-if="show">
            <!-- verification.pass -->
            <el-input v-model="verification.username" placeholder="邮箱">
              <i slot="prefix">
                <img src="../../assets/images/email.png" alt="">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item prop="mobile" v-if="hide">
            <el-input v-model="verification.mobile" placeholder="手机号" type="number">
              <i slot="prefix">
                <img src="../../assets/images/email.png" alt="">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" v-if="visible">
            <!-- verification.pass -->
            <el-input type="password" v-model="verification.password" placeholder="密码">
              <i slot="suffix" title="隐藏密码" @click="changePass('show')">
                <img src="../../assets/images/eye-close.png" />
              </i>
              <i slot="prefix">
                <img src="../../assets/images/pass.png" alt="">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" v-else>
            <el-input type="text" v-model="verification.password" placeholder="密码">
              <i slot="suffix" title="显示密码" @click="changePass('hide')">
                <img src="../../assets/images/eye-open.png" />
              </i>
              <i slot="prefix">
                <img src="../../assets/images/pass.png" alt="">
              </i>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="login-checkbox" v-for="item of items">
          <!--<input type="checkbox" v-model="item.state" v-on:click="regCheckbox(item)"/>-->
          <span>注册即表示同意
            <a href="">《用户使用协议》</a>
          </span>
        </div>
        <div class="login-btn">
          <!-- <router-link to="reset"> -->
          <mt-button type="default" :disabled="disabled" @click="handleRegister">注&nbsp;册</mt-button>
          <p @click="changeMobile" v-if="show">手机号注册 ></p>
          <p v-if="hide" @click="changeEmail">邮箱注册 ></p>
          <!-- </router-link> -->
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import pub from '@/assets/js/pub.js'
  // 接口请求
  import api from "@/api/user/User.js"
  export default {
    data() {
      return {
        disabled: true,
        visible: true,
        active: 'login',
        hide: false,
        show: true,
        items: [{
          state: false
        }],
        // 登录参数
        verification: {
          username: '',
          password: '',
          checkPass: '',
          mobile: ''
        },
        // 忘记密码参数
        forgetPwd: {
          username: '',
          new_pwd: '',
          new_pwd2: ''
        },
        rules: {
          // 校验邮箱
          username: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
          // 校验密码
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/, message: '密码为8-16位字母加数字组合' }],
          // 手机号校验
          mobile:[{  required: true, message: '请输入手机号码', trigger: 'blur'},{type:'number',pattern:11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/,message:'请输入正确的手机号码',trigger: ['blur', 'change']}]
        },
      }
    },
    methods: {
      //  登录
      handleLogin() {
        this.$Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        })
        this.$store
          .dispatch("loginByCode", this.verification)
          .then(res => {
            this.$router.push("/home")
            this.$Indicator.close()
          })
          .catch(err => {
            // console.log(err)
            this.$Indicator.close()
          })
      },
      // 注册
      handleRegister() {
        api.register(this.verification)
          .then(res => {
            this.$router.go(0)
          })
          .catch(err => {
            console.log(err)
          })
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
      //显示与隐藏密码
      changePass(value) {
        this.visible = !(value === 'show')
      }
    },
    watch: {
      // 登录页当邮箱和密码全部输入，按钮变色
      verification: {
        immediate: true,
        deep: true,
        handler(val) {
          // debugger
          if (val.username != '' && val.password != '')
            this.disabled = false
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/global'
</style>