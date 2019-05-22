<template>
	<div class="subject-details">
		<div class="subject-details-header">
			<mt-header fixed :title="$t('m.body')">
			    <mt-button icon="back" slot="left"v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
			</mt-header>
		</div>
		<div class="subject-details-content">
			<mt-navbar v-model="selected">
			  <mt-tab-item id="information">{{$t('m.bodyinformation')}}</mt-tab-item>
			  <mt-tab-item id="introduce">{{$t('m.bodyintroduce')}}</mt-tab-item>
			</mt-navbar>
			<!-- tab-container -->
			<mt-tab-container v-model="selected">
			  <mt-tab-container-item id="information">
			    <div class="information-content">
            <!-- 主体名称： -->
			    	<mt-cell :title="$t('m.bodyname')">
			    		<span>{{subjectData.name}}</span>
			    	</mt-cell>
            <!-- 通证标识 -->
			    	<mt-cell :title="$t('m.identitycard')">
			    		<span><img :src="'http://'+subjectImg.icon"> {{subjectImg.code}} {{subjectImg.name}}</span>
			    	</mt-cell>
            <!-- 通证昵称 -->
			  		<mt-cell :title="$t('m.nickname')">
			  			<span>{{subjectImg.nickname}}</span>
			  		</mt-cell>
            <!-- 注册住所 -->
			  		<mt-cell :title="$t('m.residence')" >
			  			<span>{{subjectData.registered_address}}</span>
			  		</mt-cell>
            <!-- 经营地址 -->
			  		<mt-cell :title="$t('m.businessaddress')">
			  			<span>{{subjectData.business_address}}</span>
			  		</mt-cell>
            <!-- 法 人 -->
			  		<mt-cell :title="$t('m.people')" >
			  			<span>{{subjectData.legal_person}}</span>
			  		</mt-cell>
            <!-- 注册资本 -->
			  		<mt-cell :title="$t('m.capital')">
			  			<span>{{subjectData.registered_capital}}</span>
			  		</mt-cell>
            <!-- 成立日期 -->
			  		<mt-cell :title="$t('m.establishdate')" >
			  			<span>{{subjectData.build_time}}</span>
			  		</mt-cell>
            <!-- 营业期限 -->
			  		<mt-cell :title="$t('m.term')" >
			  			<span>{{subjectData.start_time}}至{{subjectData.end_time}}</span>
			  		</mt-cell>
            <!-- 经营范围 -->
            <mt-cell :title="$t('m.range')" >
              <span>{{subjectData.business_scope}}</span>
            </mt-cell>
			    </div>
			  </mt-tab-container-item>
			  <mt-tab-container-item id="introduce">
        <!--   <div v-for="(item,index) in introduction">
            <img :src="'http://'+item.introduction.jpg">
          </div> -->
			  </mt-tab-container-item>
			</mt-tab-container>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import api from '@/api/token/Token'
export default {
	data(){
		return{
			selected: 'information',
      subjectId:{},
      subjectData:{},
      subjectImg:{},
      // introduction:[]
		}
	},
  created(){
    this.subjectId = this.$route.params
    this.subject()
},
	methods:{
    subject(id){
      api.tokenSubject(this.$route.params).then(res=>{
        this.subjectData = res.subject
        this.subjectImg = res.subject.token
        // console.log(this.introduction)
      }).catch(err=>{
        console.log(err)
      })
    }
	},
	computed:{
		...mapGetters([
	      'detail'
	    ])
	}
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>
