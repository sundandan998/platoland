<template>
	<div class="assets-detailed">
		<div class="assets-detailed-header">
			<mt-header fixed :title="$t('m.assetdetails')">
			   <mt-button icon="back" slot="left"v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
			   <mt-button icon="" slot="right">
			   	<el-dropdown trigger="click">
			      <span class="el-dropdown-link">
			   		<img slot="icon" src="../../../assets/images/gd.png">
			      </span>
			      <el-dropdown-menu slot="dropdown">
			      	 <router-link to="/scan">
			        <el-dropdown-item>{{$t('m.scan')}}</el-dropdown-item>
			        </router-link>
			        <router-link to="out">
			        	<el-dropdown-item>{{$t('m.changeout')}}</el-dropdown-item>
			        </router-link>
			        <el-dropdown-item><span @click="remove">{{$t('m.remove')}}</span></el-dropdown-item>
			      </el-dropdown-menu>
			    </el-dropdown>
			   </mt-button>
			</mt-header>
		</div>
		<div class="assets-detailed-exhibition" >
		<div class="assets-detailed-exhibition-img" >
			<img src="../../../assets/images/ld.png" alt="" class="fl" />
			<ul>
				<!-- <li>{{this.detail.id}}({{this.detail.nickname}})</li>
        <li><P>{{this.detail.body}}</P></li> -->
        <li>LD({{$t('m.intoname')}})</li>
        <li>{{$t('m.intobody')}}</li>
			</ul>
		</div>
			<mt-cell :title="$t('m.availablenum')" value="50.000">

				 <img slot="icon" src="../../../assets/images/u4662.png">
			</mt-cell>
			<mt-cell :title="$t('m.frozen')" value="50.00">
				<img slot="icon" src="../../../assets/images/u4666.png">
			</mt-cell>
		</div>
		<div class="assets-detailed-whole">
			<div class="assets-detailed-whole-header">
				<span class="fl">{{$t('m.assetsdetail')}}</span>
				<router-link to="/detailedlist">
					<span class="fr">{{$t('m.whole')}} ></span>
				</router-link>
			</div>
		</div>
		<div class="assets-detailed-tabbar">
			<van-tabs>
			  <van-tab :title="$t('m.changeinto')">
				<mt-cell to="/transaction" is-link label="2018-03-06  12:03">
				   <span>-30000</span>
				</mt-cell>
				<mt-cell to="/transaction" is-link label="2018-03-06  12:03">
				   <span>-30000</span>
				</mt-cell>
				<router-link to="/into">
					<mt-button size="large" type="primary">{{$t('m.changeinto')}} </mt-button>
				</router-link>
			  </van-tab>
			  <van-tab  :title="$t('m.changeout')">
			  	<mt-cell to="/transaction" is-link label="2018-03-06  12:03">
				   <span>-30000</span>
				</mt-cell>
				<mt-cell to="/transaction" is-link label="2018-03-06  12:03">
				   <span>-30000</span>
				</mt-cell>
				<router-link to="/out">
					<mt-button size="large" type="primary">{{$t('m.changeinto')}} </mt-button>
				</router-link>
			  </van-tab>
			</van-tabs>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default{
	data(){
		return{
			data:{}
		}
	},
	created(){
		this.asset
		this.detail
//		console.log(this.detail)
 	},
	methods:{
		//	点击移除弹出的消息框
		remove(){
    this.$messagebox({
      title: 'Tips',
      message:'Are you sure to removal of assets?',
      cancelButtonText:'No',
      confirmButtonText:'Yes',
      showCancelButton: true
    })
			.then(action => {
				this.$router.push({
				path:'/assets'
				})
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
