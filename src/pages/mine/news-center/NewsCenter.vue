<template>
	<div class="news-center">
		<!--顶部标题-->
		<div class="news-center-header">
			<mt-header fixed  :title="$t('m.announcementcenter')">
			  <router-link to="/" slot="left">
			    <mt-button icon="back">{{$t('m.back')}}</mt-button>
			  </router-link>
			</mt-header>
		</div>
		<div class="news-center-list">
			<mt-cell :title="$t('m.noticenews')" label="2019-3-15" to="newsdetails"
  is-link>
			  <img slot="icon" src="../../../assets/images/u357.png">
			</mt-cell>
			<mt-cell :title="$t('m.noticenews')" label="2019-3-15" to="newsdetails"is-link>
			  <img slot="icon" src="../../../assets/images/u357.png">
			</mt-cell>
		</div>
	</div>
</template>

<script>
import api from "@/api/system/System.js"
export default {
	data(){
		return {
			selected: 'notice'
		}
	},
  mounted(){
    // this.notice()
  },
  methods:{
    // notice(){
    //   api.noticeDetail().then(res=>{
    //     console.log('123')
    //   }).catch(err=>{
    //     console.log(err)
    //   })
    // }
  }

}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>
