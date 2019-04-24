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
			<p>已向xiaolingzi@163.com发送验证信息</p>
			<span>请输入验证码。</span>		
		</div>
		<div class="reset-mail-keyboard">
			<van-number-keyboard 
			
			  :show="showKeyboard"
			  @input="onInput"
			  @delete="onDelete"
			  close-button-text="重新发送邮件"
			  @blur="showKeyboard = false"
			/>
			<van-password-input 
				 @click="complete"
			  :value="value"
			  :mask="false"
			  @focus="showKeyboard = true"
			/>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			value: '',
			showKeyboard: true
		}
	},
	methods:{
	   onInput(key) {
      		this.value = (this.value + key).slice(0, 6)     	
    	},
    	onDelete() {
      		this.value = this.value.slice(0, this.value.length - 1)     		
    	},
    	complete(key){
    		if(key.value==6){
    			console.log('sddd')
    			}			
			},
//  		this.$router.push({
//    			path: '/login'
//    		})
     	back(){
      		window.history.back()
      	}
	}
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>