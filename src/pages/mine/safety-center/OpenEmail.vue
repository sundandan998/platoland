<template>
  <div class="open-information">
    <div class="open-information-header header">
      <mt-header fixed :title="$t('m.emailVerification')">
        <router-link to="/safety" slot="left">
          <mt-button icon="back">{{$t('m.back')}}</mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="open-information-from">
      <el-form class="demo-ruleForm">
        <el-form-item :label="$t('m.email')">
          <br>
          <mt-field v-model="email.email" :placeholder="$t('m.emailNumber')" @blur.native.capture="emailCheck" ></mt-field>
        </el-form-item>
        <el-form-item :label="$t('m.emailVerification')">
          <br>
          <span @click="sendEmail" class="fr">{{$t('m.send')}}</span>
          <mt-field v-model="email.code" :placeholder="$t('m.verificationCode')"></mt-field>
        </el-form-item>
      </el-form>
    </div>
    <div class="rest-pass-word-text">
      <p>{{$t('m.note')}}</p>
      <p>{{$t('m.safetyNote')}}</p>
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
  import { toast } from '@/assets/js/pub.js'
  import { Toast } from 'mint-ui'
  export default {
    data() {
      return {
        disabled: true,
        email: {
          email: '',
          code: '',
          action: 2
        },
        bindParam: {
          account: '',
          code: ''
        }
      }
    },
    methods: {
      // 发送邮件
      sendEmail() {
        api.email(this.email).then(res => {
          if (res.code == 0) {
            toast(res)
          }
        }).catch(err => {
          if (err.cose != 0) {
            toast(err)
          }
        })
      },
      // 点击确定
      information() {
        this.bindParam.account = this.email.email
        this.bindParam.code = this.email.code
        api.bind(this.bindParam).then(res => {
          if (res.code == 0) {
            toast(res)
          }
        }).catch(err => {
          toast(err)
        })
      },
       // 邮箱校验
       emailCheck() {
        var email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
        if (!email.test(this.email.email)) {
          Toast({
            message: '정확한 이메일 주소를 입력하십시오',
            className: 'zZindex'
          })
        } 
      },
    },
    watch: {
      email: {
        immediate: true,
        deep: true,
        handler(val) {
          var email = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
          if (val.email != '' && val.code != ''&&email.test(val.email)) {
            this.disabled = false
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../assets/scss/global';
  .open-information{
    .mint-cell:last-child{
      background-image:none;
    }
  }

</style>