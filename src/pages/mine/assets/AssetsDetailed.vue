<template>
	<div class="assets-detailed">
		<div class="assets-detailed-header">
			<mt-header fixed title="资产详情">
			  <router-link to="/assets" slot="left">
			    <mt-button icon="back">返回</mt-button>
			  </router-link>
			   <mt-button icon="" slot="right">
			   	<el-dropdown trigger="click">
			      <span class="el-dropdown-link">
			   		<img slot="icon" src="../../../assets/images/gd.png">
			      </span>
			      <el-dropdown-menu slot="dropdown">
			      	 <router-link to="/scan">
			        <el-dropdown-item>扫一扫</el-dropdown-item>
			        </router-link>
			        <router-link to="/out">
			        	<el-dropdown-item>转出</el-dropdown-item>
			        </router-link>
			        <el-dropdown-item><span @click="remove">移除</span></el-dropdown-item>
			      </el-dropdown-menu>
			    </el-dropdown>
			   </mt-button>
			</mt-header>
		</div>
		<!--v-for="(item,index) in assetsdata"-->
		<!--@click="toAsset(item.id)"-->
		<div class="assets-detailed-exhibition" >
		<!--<div class="assets-detailed-exhibition-text">
			<img src="../../../assets/images/ld.png" alt="" class="fl"   />
			<span>{{this.detail.id}}</span>
			<span>{{this.detail.body}}</span>
		</div>-->
		<div class="assets-detailed-exhibition-img" >
      <img src="../../../assets/images/u345.png" class="fl"/>
			<!-- <img src="../../../assets/images/ld.png" alt=""   /> -->
			<ul>
				<li>{{this.detail.id}}</li>
        <li>{{this.detail.body}}</li>
				<!-- <li>北京河底捞餐饮有限公司</li> -->
			</ul>
		</div>
			<mt-cell title="可用量" value="50.000">

				 <img slot="icon" src="../../../assets/images/u4662.png">
			</mt-cell>
			<mt-cell title="冻结量" value="50.00">
				<img slot="icon" src="../../../assets/images/u4666.png">
			</mt-cell>
		</div>
		<div class="assets-detailed-whole">
			<div class="assets-detailed-whole-header">
				<span class="fl">明细</span>
				<router-link to="/detailedlist">
					<span class="fr">全部 ></span>
				</router-link>
			</div>
		</div>
		<div class="assets-detailed-tabbar">
			<van-tabs>
			  <van-tab title="转入">
				<mt-cell to="/transaction" is-link label="2018-03-06  12:03">
				   <span>-30000</span>
				</mt-cell>
				<mt-cell to="/transaction" is-link label="2018-03-06  12:03">
				   <span>-30000</span>
				</mt-cell>
				<router-link to="/into">
					<mt-button size="large" type="primary">转入</mt-button>
				</router-link>
			  </van-tab>
			  <van-tab title="转出">
			  	<mt-cell to="/transaction" is-link label="2018-03-06  12:03">
				   <span>-30000</span>
				</mt-cell>
				<mt-cell to="/transaction" is-link label="2018-03-06  12:03">
				   <span>-30000</span>
				</mt-cell>
				<router-link to="/out">
					<mt-button size="large" type="primary">转入</mt-button>
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
			this.$messagebox.confirm("确定移除资产?")
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
