<template>
	<div class="open-information">
		<div class="open-information-header header">
			<mt-header fixed :title="$t('m.opensmsVerification')">
				<router-link to="/safety" slot="left">
					<mt-button icon="back">{{$t('m.back')}}</mt-button>
				</router-link>
			</mt-header>
		</div>
		<div class="open-information-from">
			<el-form class="demo-ruleForm">
				<el-form-item :label="$t('m.tel')">
					<br>
					<mt-field v-model="openinformation.mobile" :placeholder="$t('m.telNumber')" type="number" :attr="{ oninput: 'if(value.length>11)value=value.slice(0,11)' }"></mt-field>
				</el-form-item>
				<el-form-item :label="$t('m.smsVerification')">
					<br>
					<span class="fr" @click="smsCode">{{$t('m.send')}}</span>
					<mt-field v-model="openinformation.code" :placeholder="$t('m.verificationCode')"></mt-field>
				</el-form-item>
			</el-form>
		</div>
		<div class="rest-pass-word-btn">
			<router-link to="/safety">
				<mt-button type="primary" size="large"  @click="information" :disabled="disabled">{{$t('m.sure')}}</mt-button>
			</router-link>
		</div>
		<div class="rest-pass-word-text">
			<p>{{$t('m.note')}}</p>
      <p>{{$t('m.safetyNote')}}</p>
		</div>
	</div>
</template>

<script>
	// 接口请求
	import api from "@/api/system/System.js"
	import {toast} from '@/assets/js/pub.js'
	export default {
		data() {
			return {
				disabled: true,
				openinformation: {
					mobile: '',
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
					toast(res)
				}).catch(eerr => {
					toast(err)
				})
			},
			// 点击确定
			information(){
				this.bindParam.account = this.openinformation.mobile
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
					if (val.mobile != '' && val.code != '') {
						this.disabled = false
					}else{
						this.disabled = true
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>