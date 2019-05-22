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
			    	<mt-cell :title="$t('m.bodyname')">
			    		<span>{{this.detail.body}}</span>
			    	</mt-cell>
			    	<mt-cell :title="$t('m.nickname')">
			    		<span>{{this.detail.nickname}}</span>
			    	</mt-cell>
			  		<mt-cell :title="$t('m.identitycard')">
			  			<!--<img src="../../../assets/images/u1429.png" alt="" />&nbsp;-->
			  			<span>{{this.detail.id}}</span>

			  		</mt-cell>
			  		<mt-cell :title="$t('m.type')" >
			  			<span>{{this.detail.bodytype}}</span>
			  		</mt-cell>
			  		<mt-cell :title="$t('m.residence')">
			  			<span>{{this.detail.residence}}</span>
			  		</mt-cell>
			  		<mt-cell :title="$t('m.businessaddress')" >
			  			<span>{{this.detail.businessaddress}}</span>
			  		</mt-cell>
			  		<mt-cell :title="$t('m.people')">
			  			<span>{{this.detail.person}}</span>
			  		</mt-cell>
			  		<mt-cell :title="$t('m.capital')" >
			  			<span>{{this.detail.capital}}</span>
			  		</mt-cell>
			  		<mt-cell :title="$t('m.establishdate')" >
			  			<span>{{this.detail.establishdate}}</span>
			  		</mt-cell>
			  		<mt-cell :title="$t('m.term')" :value="detail.term">
			  		</mt-cell>
            <mt-cell :title="$t('m.range')" :value="detail.range">
            </mt-cell>
			    </div>
			  </mt-tab-container-item>
			  <mt-tab-container-item id="introduce">
			    <div class="subject-introduce-title">
			    	<h2>{{$t('m.subjecttitle')}}</h2>
			    </div>
			    <div class="subject-introduce-img">
			    	<img src="../../../assets/images/u1753.jpg" alt="" />
			    </div>
			    <div class="subject-introduce-introduction">
			    	<div class="subject-introduce-introduction-title">
			    		<h3>{{$t('m.mainbodyintroduction')}}</h3>
			    	</div>
			    	<div class="subject-introduce-introduction-content">
			    		<div class="subject-introduce-introduction-content-img fl">
			    			<img src="../../../assets/images/u2356.jpg" alt="" />
			    		</div>
						<div class="subject-introduce-introduction-content-text fr">
							<span>{{$t('m.mainbodytextone')}}</span>
						  <p>{{$t('m.mainbodytexttwo')}}</p>
						</div>
			    	</div>
			    </div>
			    <div class="subject-introduce-business">
			    	<div class="subject-introduce-business-title">
			    		<h3>{{$t('m.mainbusiness')}}</h3>
			    	</div>
			    	<div class="subject-introduce-business-content-text fl">
							<span>{{$t('m.mainbusinessone')}}</span>
						  <p>{{$t('m.mainbusinesstwo')}}</p>
						</div>
			    	<div class="subject-introduce-business-content">
			    		<div class="subject-introduce-business-content-img fr">
			    			<img src="../../../assets/images/u2356.jpg" alt="" />
			    		</div>
			    	</div>
			    </div>
			  <!--   <div class="subject-introduce-team">
			    	<div class="subject-introduce-team-title">
			    		<h3>{{$t('m.teammanagement')}}</h3>
			    	</div>
			    	<div class="subject-introduce-team-content">
			    		<p>{{$t('m.teamname')}}</p>
			    	</div>
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
			selected: 'information'
		}
	},
  created(){
    this.subject()
},
	methods:{
    subject(id){
      api.tokenSubject().then(res=>{
        this.$router.push('/subject')
        console.log(res)
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
