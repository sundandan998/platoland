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
			  <el-form :model="verification" ref="verification" :rules="rules" class="verification-input"
			  	>
			    <el-form-item prop="username">
			      <el-input v-model="verification.username"
			      	placeholder="邮箱"
			      	>
			        <i slot="prefix">
			          <img src="../../assets/images/email.png" alt="">
			        </i>
			      </el-input>
			    </el-form-item>
			    <el-form-item prop="password">
			      <el-input type="password" v-model="verification.password" autocomplete="off"
			      	placeholder="密码"
			      	>
			        <i slot="prefix">
			          <img src="../../assets/images/pass.png" alt="">
			        </i>
			      </el-input>
			    </el-form-item>
  			</el-form>
			<div class="login-btn">
				<mt-button id = "loginbtn" type="default" @click="handleLogin">登&nbsp;录</mt-button>
			</div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="register">
			  <el-form :model="verification" ref="verification" :rules="rules" class="verification-input">
			    <el-form-item prop="username">
            <!-- verification.pass -->
			      <el-input v-model="verification.username"
			      	placeholder="邮箱"
			      	>
			        <i slot="prefix">
			          <img src="../../assets/images/email.png" alt="">
			        </i>
			      </el-input>
			    </el-form-item>
			    <el-form-item prop="password" v-if="visible">
            <!-- verification.pass -->
			        <el-input type="password" v-model="verification.password" placeholder="密码">
			            <i slot="suffix" title="隐藏密码" @click="changePass('show')">
			            	<img src="../../assets/images/eye-close.png"/>
			            </i>
			            <i slot="prefix">
				          <img src="../../assets/images/pass.png" alt="">
				        </i>
          			</el-input>
			    </el-form-item>
			    <el-form-item prop="password" v-else >
			      	<el-input type="text" v-model="verification.password" placeholder="密码">
			            <i slot="suffix" title="显示密码" @click="changePass('hide')">
			            	<img src="../../assets/images/eye-open.png"/>
			            </i>
			            <i slot="prefix">
				          <img src="../../assets/images/pass.png" alt="">
				        </i>
          			</el-input>
			    </el-form-item>
  			</el-form>
  			<div class="login-checkbox" v-for="item of items">
				<!--<input type="checkbox" v-model="item.state" v-on:click="regCheckbox(item)"/>-->
				<span>注册即表示同意<a href="">《用户使用协议》</a></span>
			</div>
			<div class="login-btn">
				<!-- <router-link to="reset"> -->
					<mt-button id = "regbtn" type="default" @click="handleRegister">注&nbsp;册</mt-button>
				<!-- </router-link> -->
			</div>
		  </mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
import pub from '@/assets/js/pub.js'
// 登录请求
import login from "@/api/login.js"
// 注册请求
import register from "@/api/Register.js"
export default{
	data (){
		var validatePass = (rule, value, callback) => {
	      if (value === '') {
	        callback(new Error('请输入密码'))
	      } else {
	        if (this.verification.checkPass !== '') {
	          this.$refs.verification.validateField('checkPass')
	        }
	        callback()
	      }
		}
		return	{
			visible: true,
			active: 'login',
      items: [{
        state: false
      }],
			verification: {
				username: '',
    		password: '',
    		checkPass: ''
			},
			rules: {
		        // 校验邮箱
		        username: [
		          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
		          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
		        ],
		        // 校验密码
		        password: [
		          { validator: validatePass, trigger: 'blur' },
		          { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/, message: '密码为8-16位字母加数字组合' }
		        ]
	    	},
		}
	},
	methods:{
  //  登录
    handleLogin(){
      this.$store
        .dispatch("loginByCode",this.verification)
        .then(() =>{
            this.$router.push("/home")
            this.$Indicator.open({
              text: '加载中...',
              spinnerType: 'fading-circle'
          })
        })
        .catch(() => {
          console.log(err)
        })
    },
    // 注册
      handleRegister(){
        register.register(this.verification)
        .then(()=>{
          // this.$router.go(0)
        })
        .catch(()=>{
          console.log(err)
        })
      },
//		登录页/点击记住账号 button 改变颜色
	  	loginCheckbox: function (item) {
//		  	item.state = !item.state;
		  	if(item.state==true){
		  		document.getElementById("loginbtn").style.background="#F6F8FA";
		  		document.getElementById("loginbtn").style.color="#666";
		  	}else{
		  		document.getElementById("loginbtn").style.background="#26A2FF";
		  		document.getElementById("loginbtn").style.color="#fff";
		  	}
    	},
//  	注册页/点击我已阅读并同意button按钮 改变颜色
    	regCheckbox: function (item) {
//		  	item.state = !item.state;
		  	if(item.state==true){
		  		document.getElementById("regbtn").style.background="#F6F8FA";
		  		document.getElementById("regbtn").style.color="#666";
		  	}else{
		  		document.getElementById("regbtn").style.background="#26A2FF";
		  		document.getElementById("regbtn").style.color="#fff";
		  	}
    	},
//  	显示与隐藏密码
    	changePass(value) {
        	this.visible = !(value === 'show')
     }
	}
}
</script>

<style lang="scss">
	@import '../../assets/scss/global'
</style>
