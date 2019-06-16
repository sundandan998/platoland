<template>
  <div class="rest-pass-word">
    <div class="rest-pass-word-header">
      <mt-header fixed title="重置登录密码">
        <router-link to="/safety" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="rest-pass-word-from">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="新登录密码" prop="pass" v-if="visible">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off">
            <i slot="suffix" title="隐藏密码" @click="changePass('show')">
              <img src="../../../assets/images/eye-close.png" />
            </i>
          </el-input>
        </el-form-item>
        <el-form-item label="新登录密码" prop="pass" v-else>
          <el-input type="text" v-model="ruleForm.pass">
            <i slot="suffix" title="显示密码" @click="changePass('hide')">
              <img src="../../../assets/images/eye-open.png" />
            </i>
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" v-if="visible1">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off">
            <i slot="suffix" title="隐藏密码" @click="changePass1('show')">
              <img src="../../../assets/images/eye-close.png" />
            </i>
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" v-else>
          <el-input type="text" v-model="ruleForm.checkPass" autocomplete="off">
            <i slot="suffix" title="隐藏密码" @click="changePass1('hide')">
              <img src="../../../assets/images/eye-open.png" />
            </i>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="rest-pass-word-btn">
      <mt-button type="primary" size="large" :disabled = "disabled" @click="successToast">确认</mt-button>
    </div>
    <div class="rest-pass-word-text">
      <p>注意：</p>
      <p>1.为保证您的资产安全，登录密码 修改后24h内禁止提币</p>
      <p>2.如您忘记登录密码，请退出登录，点击忘记密码按提示重新设置密码</p>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  // 接口请求
  import api from "@/api/user/User.js"
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        visible: true,
        visible1:true,
        disabled:true,
        ruleForm: {
          pass: '',
          checkPass: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur'},
            { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/, message: '密码为8-16位字母加数字组合' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!')
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      //显示与隐藏密码
      changePass(value) {
        this.visible = !(value === 'show')
      },
      changePass1(value) {
        this.visible1 = !(value === 'show')
      },
      //消息弹框
      successToast() {
      api.forgetPassword().then(res=>{
        if(res.code == 0){
          this.$toast({
          message: res.msg,
        })
        }
      }).catch(err=>{
        this.$toast({
          message:err.msg,
        })
      })
      }
    },
    watch:{
      ruleForm: {
        immediate: true,
        deep:true,
        handler(val) {
          // debugger
          if (val.pass != '' && val.checkPass != '')
            this.disabled = false
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../assets/scss/global'
</style>