<template>
	<div class="news-center">
		<!--顶部标题-->
		<div class="news-center-header">
			<mt-header fixed  title="公告中心" >
			  <router-link to="/" slot="left">
			    <mt-button icon="back">{{$t('m.back')}}</mt-button>
			  </router-link>
			</mt-header>
		</div>
		<div class="news-center-list" v-for="(item,index) in noticeData">
			<mt-cell :title="item.title" :label="item.create_time" :to="/newsdetails/+item.id" is-link>
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
			selected: 'notice',
      noticeData:{}
		}
	},
  mounted(){
    this.notice()
    this.page_size = this.$route.params
  },
  methods:{
    notice(){
      api.notice(this.$route.params).then(res=>{
        this.noticeData  = res.data
        // console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global';
	.news-center{
		width: 100%;
		height: 100%;
		background-color: #fff;
		position: fixed;
		.news-center-header{
			margin-bottom: 81px;
		}
		.news-center-list{
			span{
				font-size:22px;
			}
		}
	}
</style>
