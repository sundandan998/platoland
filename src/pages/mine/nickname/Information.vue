<template>
  <div class="information">
    <div class="information-header header">
      <mt-header fixed title=个人信息>
        <router-link :to="{name:'Mine',params:{nickname:this.$route.params.nickname}}" slot="left">
          <mt-button icon="back">{{$t('m.back')}}</mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="information-body">
      <mt-cell title="昵称" to="/editnickname" is-link v-if="this.infoData.nickname==null"> 暂未设置昵称</mt-cell>
      <mt-cell title="昵称" to="/editnickname" is-link  v-if="this.infoData.nickname!=null">
        {{this.infoData.nickname}}</mt-cell>
    </div>
  </div>
</template>
<script>
	import api from "@/api/user/User.js"
  export default {
    data() {
      return {
        infoData:''
      }
    },
    created() {
      this.info()
    },
    methods:{
      info() {
				api.getUserInfo().then(res => {
					this.infoData = res.data
					window.sessionStorage.setItem('pay_pwd_active', this.infoData.pay_pwd_active)
					// window.localStorage.setItem('pay_pwd_active', this.infoData.pay_pwd_active)
					this.access_token = localStorage.getItem('token')
				}).catch(err => {
					console.log(err)
				})
			},
    }
  }
</script>
<style lang="scss">
  .information {
    .information-body {}
  }
</style>