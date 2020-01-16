<template>
	<div class="login">
		<router-link to="/">
			<!-- <div class="login-cancel">
				<img src="../../assets/images/cancel.png" alt="" />
			</div> -->
		</router-link>
		<div class="logo">
			<img src="../../assets/images/logo.png" alt="" />
		</div>
		<mt-navbar v-model="active" class="login-tab">
		 	<router-link to="/login">
				<mt-tab-item id="login">登录</mt-tab-item>
			</router-link>
			<router-link to="/register">
		  		<mt-tab-item id="register">注册</mt-tab-item>
		  	</router-link>
		</mt-navbar>
		<mt-tab-container v-model="active">
		  <mt-tab-container-item id="login">
			  <el-form :model="verification" ref="verification" :rules="rules" class="verification-input">
			    <el-form-item prop="email">
			      <el-input v-model="verification.email"
			      	placeholder="邮箱"
			      	>
			        <i slot="prefix">
			          <img src="../../assets/images/email.png" alt="">
			        </i>
			      </el-input>
			    </el-form-item>
			    <el-form-item prop="pass">
			      <el-input type="password" v-model="verification.pass" autocomplete="off"
			      	placeholder="密码"
			      	>
			        <i slot="prefix">
			          <img src="../../assets/images/pass.png" alt="">
			        </i>
			      </el-input>
			    </el-form-item>
  			</el-form>
			<div class="login-checkbox" v-for="item of items">
				<input type="checkbox" v-model="item.state" v-on:click="loginCheckbox(item)"/>
				<span>记住账号</span>
				<router-link to="/password" class="fr">
					<span>忘记密码?</span>
				</router-link>
			</div>
			<div class="login-btn">
				<mt-button id = "loginbtn" type="default" v-on:click="handleLogin">登录</mt-button>
			</div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="register">
			  <el-form :model="verification" ref="verification" :rules="rules" class="verification-input">
			    <el-form-item prop="email">
			      <el-input v-model="verification.email"
			      	placeholder="邮箱"
			      	>
			        <i slot="prefix">
			          <img src="../../assets/images/email.png" alt="">
			        </i>
			      </el-input>
			    </el-form-item>
			    <el-form-item prop="pass" v-if="visible">
			        <el-input type="password" v-model="verification.pass" placeholder="密码">
			            <i slot="suffix" title="隐藏密码" @click="changePass('show')">
			            	<img src="../../assets/images/eye-close.png"/>
			            </i>
			            <i slot="prefix">
				          <img src="../../assets/images/pass.png" alt="">
				        </i>
          			</el-input>
			    </el-form-item>
			    <el-form-item prop="pass" v-else >
			      	<el-input type="text" v-model="verification.pass" placeholder="密码">
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
				<input type="checkbox" v-model="item.state" v-on:click="regCheckbox(item)"/>
				<span>我已阅读并同意《用户使用协议》</span>
			</div>
			<div class="login-btn">
				<router-link to="reset">
					<mt-button id = "regbtn" type="default">注册</mt-button>
				</router-link>
			</div>
		  </mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
import pub from '@/assets/js/pub.js'
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
				email: '',
	    		pass: '',
	    		checkPass: ''
			},
			rules: {
		        // 校验邮箱
		        email: [
		          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
		          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
		        ],
		        // 校验密码
		        pass: [
		          { validator: validatePass, trigger: 'blur' },
		          { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/, message: '密码为8-16位字母加数字组合' }
		        ]
	    	},
		}
	},
	methods:{
		async handleLogin(){
//			const res = await this.$http.get('/api/user')
		 	const url=this.$backStage('/user')
		 	const res = await this.$http.get(url)
			const data = res
//				 console.log(data)
			if(data.status===200){
				window.localStorage.setItem('data',JSON.stringify(data))
				this.$router.push({
					name: '/'
				})
				 this.$toast({
				 	  message: '登录成功',
					  duration: 3000
				 })
//					页面实时刷新
				this.$router.go(0)
//					loading加载
				this.$Indicator.open({
					text: '加载中...',
					spinnerType: 'fading-circle'
				})
			}
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
        	this.visible = !(value === 'show');
     }
	}
}
</script>

<style lang="scss">
	body{
		/*background-color: #fff !important;*/
	}
	@import '../../assets/scss/global';
</style>
