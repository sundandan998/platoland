<template>
	<div class="subject-details">
		<div class="subject-details-header">
			<mt-header fixed title="通证主体">
			    <mt-button icon="back" slot="left"v-on:click="$router.go(-1)">返回</mt-button>
			</mt-header>
		</div>
		<div class="subject-details-content">
			<mt-navbar v-model="selected">
			  <mt-tab-item id="information">主体信息</mt-tab-item>
			  <mt-tab-item id="introduce">主体介绍</mt-tab-item>
			</mt-navbar>
			<!-- tab-container -->
			<mt-tab-container v-model="selected">
			  <mt-tab-container-item id="information">
			    <div class="information-content">
			    	<mt-cell title="主体名称：">
			    		<span>{{this.detail.body}}</span>
			    	</mt-cell>
			    	<mt-cell title="通证昵称:">
			    		<span>{{this.detail.nickname}}</span>
			    	</mt-cell>
			  		<mt-cell title="通证标识:">
			  			<!--<img src="../../../assets/images/u1429.png" alt="" />&nbsp;-->
			  			<span>{{this.detail.id}}</span>

			  		</mt-cell>
			  		<mt-cell title="主体类型：" >
			  			<span>{{this.detail.bodytype}}</span>
			  		</mt-cell>
			  		<mt-cell title="注册住所：">
			  			<span>{{this.detail.residence}}</span>
			  		</mt-cell>
			  		<mt-cell title="经营地址：" >
			  			<span>{{this.detail.businessaddress}}</span>
			  		</mt-cell>
			  		<mt-cell title="法人代表:">
			  			<span>{{this.detail.person}}</span>
			  		</mt-cell>
			  		<mt-cell title="注册资本：" >
			  			<span>{{this.detail.capital}}</span>
			  		</mt-cell>
			  		<mt-cell title="成立日期：" >
			  			<span>{{this.detail.establishdate}}</span>
			  		</mt-cell>
			  		<mt-cell title="营业期限：" :value="detail.term">
			  		</mt-cell>
			  		<mt-cell title="经营范围：" :value="detail.range">
			  		</mt-cell>
			    </div>
			  </mt-tab-container-item>
			  <mt-tab-container-item id="introduce">
			    <div class="subject-introduce-title">
			    	<h2>河底捞集团</h2>
			    </div>
			    <div class="subject-introduce-img">
			    	<img src="../../../assets/images/u1753.jpg" alt="" />
			    </div>
			    <div class="subject-introduce-introduction">
			    	<div class="subject-introduce-introduction-title">
			    		<h3>主体简介</h3>
			    	</div>
			    	<div class="subject-introduce-introduction-content">
			    		<div class="subject-introduce-introduction-content-img fl">
			    			<img src="../../../assets/images/u2356.jpg" alt="" />
			    		</div>
						<div class="subject-introduce-introduction-content-text fr">
							<span>河底捞是一家大型跨省直营火锅店品牌，成立于1994年。海底捞主要以经营川味火锅为主，注重融汇各地火锅特色。</span>
						<p>2011年，“海底捞”商标荣获“中国驰名商标”。2012年，首家海外门店在新加坡克拉码头营业，正式开展全球化扩张道路。2018年9月26日，在港交所上市。</p>
						</div>
			    	</div>
			    </div>
			    <div class="subject-introduce-business">
			    	<div class="subject-introduce-business-title">
			    		<h3>主营业务</h3>
			    	</div>
			    	<div class="subject-introduce-business-content-text fl">
							<span>河底捞是一家大型跨省直营火锅店品牌，成立于1994年。海底捞主要以经营川味火锅为主，注重融汇各地火锅特色。</span>
						<p>2011年，“海底捞”商标荣获“中国驰名商标”。2012年，首家海外门店在新加坡克拉码头营业，正式开展全球化扩张道路。2018年9月26日，在港交所上市。</p>
						</div>
			    	<div class="subject-introduce-business-content">
			    		<div class="subject-introduce-business-content-img fr">
			    			<img src="../../../assets/images/u2356.jpg" alt="" />
			    		</div>
			    	</div>
			    </div>
			    <div class="subject-introduce-team">
			    	<div class="subject-introduce-team-title">
			    		<h3>团队管理</h3>
			    	</div>
			    	<div class="subject-introduce-team-content">
			    		<p>张勇：董事长、CEO、创始人</p>
			    	</div>
			    </div>
			  </mt-tab-container-item>
			</mt-tab-container>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
	data(){
		return{
			selected: 'information'
		}
	},
	methods:{
	},
	computed:{
		...mapGetters([
	      'detail'
	    ])
	}
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global';
</style>
