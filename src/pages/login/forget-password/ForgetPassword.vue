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
			<el-form :model="verification" ref="verification" :rules="rules" class="verification-input">
			    <el-form-item prop="email">
			      <el-input v-model="verification.email"
			      	placeholder="邮箱"
			      	>
			        <i slot="prefix">
			          <img src="../../../assets/images/email.png" alt="">
			        </i>
			      </el-input>
			    </el-form-item>
			</el-form>
		</div>
		<div class="forget-password-btn">
			<router-link to="/reset">
				<mt-button type="primary">下一步</mt-button>
			</router-link>	
			<!--<router-link to="/login">
				<mt-button type="default">取消</mt-button>
			</router-link>			-->
		</div>
	</div>
</template>

<script>
import pub from '@/assets/js/pub.js'
export default{
	data(){
		return{
			value: '',
			showKeyboard: true,
			verification: {
				email: ''
			},
			rules: {
		        // 校验邮箱
		        email: [
		          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
		          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
		        ]
			}
		}
	},
	methods:{
//		//邮箱校验
//		sendEmail(){  
//			pub.sendEmail()
//		},
	   onInput(key) {
      		this.value = (this.value + key).slice(0, 6);
    	},
    	onDelete() {
      		this.value = this.value.slice(0, this.value.length - 1);
    	}
	}
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global';
</style>