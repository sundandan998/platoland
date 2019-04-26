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
		<mt-popup
		  v-model="popupVisible"
		  position="bottom">
		  	<div class="">
			<!-- 密码输入框 -->
			<van-password-input
			  :value="value"
			  @focus="showKeyboard = true"
			/>
			<!-- 数字键盘 -->
			<van-number-keyboard
			  :show="showKeyboard"
			  @input="onInput"
			  @delete="onDelete"
			  @blur="showKeyboard = false"
			/>
		</div>
		</mt-popup>
	</div>
</template>

<script>
export default{
	data(){
		return{
			value: '',
//			hide:'',
			showKeyboard: true,
      		popupVisible: true
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
	},
  watch:{
	value(){
		if(this.value.length==6){
			this.$router.push({
				path:'/login'
			})
		}
	}
  }
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>