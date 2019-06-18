<template>
  <div class="open-information">
    <div class="open-information-header">
      <mt-header fixed title="开启邮箱验证">
        <router-link to="/safety" slot="left">
          <mt-button icon="back">{{$t('m.back')}}</mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="open-information-from">
      <el-form class="demo-ruleForm">
        <el-form-item label="邮箱"><br>
            <mt-field  v-model="email.emails" placeholder="请输入邮箱"></mt-field>
        </el-form-item>
        <el-form-item label="邮箱验证"><br>
          <span @click="sendEmail" class="fr">{{$t('m.send')}}</span>
        	<mt-field  v-model="email.code" placeholder="请输入验证码"></mt-field>
        </el-form-item>
      </el-form>
    </div>
    <div class="rest-pass-word-text">
      <p>{{$t('m.becareful')}}</p>
      <p>{{$t('m.securityverificationone')}}</p>
    </div>
    <div class="rest-pass-word-btn">
      <router-link to="/safety">
        <mt-button type="primary" size="large" :disabled="disabled" @click="information">{{$t('m.sure')}}</mt-button>
      </router-link>
    </div>

  </div>
</template>

<script>
  	import api from "@/api/system/System.js"
	// import { Toast } from 'mint-ui'
	import {toast} from '@/assets/js/pub.js'
  import { message } from '@/assets/lang/message.js'
  export default{
    data(){
      return{
        disabled:true,
        email:{
          emails:'',
          code:'',
          action: 2
        },
        bindParam:{
          account:'',
          code:''
        }
      }
    },
    methods:{
      // 发送邮件
      sendEmail(){
        this.email= JSON.parse()
        api.email(this.email).then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })
      },
      // 点击确定
      information(){
				this.bindParam.account = this.email.emails
				this.bindParam.code = this.email.code
				api.bind(this.bindParam).then(res=>{
					if (res.code == 0) {
						$toast(res)
					}
				}).catch(err=>{
					toast(err)
				})
			}
    },
    watch:{
      email: {
				immediate: true,
				deep: true,
				handler(val) {
					if (val.emails != '' && val.code != '') {
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