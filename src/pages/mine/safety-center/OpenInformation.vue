<template>
	<div class="open-information">
		<div class="open-information-header">
			<mt-header fixed :title="$t('m.opensmsverification')">
				<router-link to="/safety" slot="left">
					<mt-button icon="back">{{$t('m.back')}}</mt-button>
				</router-link>
			</mt-header>
		</div>
		<div class="open-information-from">
			<el-form class="demo-ruleForm">
				<el-form-item :label="$t('m.phonenumber')">
					<br>
					<mt-field v-model="openinformation.mobiles" placeholder="请输入手机号码" type="number" :attr="{ oninput: 'if(value.length>11)value=value.slice(0,11)' }"></mt-field>
				</el-form-item>
				<el-form-item :label="$t('m.smsverification')">
					<br>
					<span class="fr" @click="smsCode">{{$t('m.send')}}</span>
					<mt-field v-model="openinformation.code" placeholder="请输入验证码"></mt-field>
				</el-form-item>
			</el-form>
		</div>
		<div class="rest-pass-word-btn">
			<router-link to="/safety">
				<mt-button type="primary" size="large"  @click="information" :disabled="disabled">{{$t('m.sure')}}</mt-button>
			</router-link>
		</div>
		<div class="rest-pass-word-text">
			<p>{{$t('m.becareful')}}</p>
			<p>{{$t('m.securityverificationone')}}</p>
		</div>
	</div>
</template>

<script>
	// 接口请求
	import api from "@/api/system/System.js"
	// import { Toast } from 'mint-ui'
	import {toast} from '@/assets/js/pub.js'
  import { message } from '@/assets/lang/message.js'
	export default {
		data() {
			return {
				disabled: true,
				openinformation: {
					mobiles: '',
					code: '',
					action: 2
				},
				bindParam:{
					account:'',
					code:''
				}
			}
		},
		methods: {
			// 发送信息
			smsCode() {
				api.sms(this.openinformation).then(res => {
					console.log(res)
				}).catch(eerr => {
					console.log(err)
				})
			},
			// 点击确定
			information(){
				this.bindParam.account = this.openinformation.mobiles
				this.bindParam.code = this.openinformation.code
				api.bind(this.bindParam).then(res=>{
					if (res.code == 0) {
						$toast(res)
					}
				}).catch(err=>{
					toast(err)
				})
			}
		},
		watch: {
			openinformation: {
				immediate: true,
				deep: true,
				handler(val) {
					if (val.mobiles != '' && val.code != '') {
						this.disabled = false
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>