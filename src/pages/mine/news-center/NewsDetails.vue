<template>
	<div class="news-details">
		<div class="news-details-header">
			<mt-header fixed title="公告详情">
			  <router-link to="/news" slot="left">
			    <mt-button icon="back">{{$t('m.back')}}</mt-button>
			  </router-link>
			</mt-header>
		</div>
    <div class="news-details-list">
      <div class="news-details-list-title text-beyond" >
        <span>
          <!-- {{$t('m.notictitle')}} -->
          {{this.detailData.title}}
          <p>{{this.detailData.create_time}} &nbsp;&nbsp;<span>{{this.detailData.author}}</span></p>
        </span>
      </div>
      <div class="news-details-list-content">
        <span>{{this.detailData.content}}</span>
      </div>
    </div>
	</div>
</template>

<script>
import api from "@/api/system/System.js"
export default{
	data(){
		return{
      detailData:{}
    }
	},
  mounted(){
    this.noticeDetail()
  },
  methods:{
    noticeDetail(){
      api.noticeDetail(this.$route.params).then(res=>{
        this.detailData = res.data
        // console.log(this.detailData.title)
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>
