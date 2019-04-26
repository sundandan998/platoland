<template>
	<div class="pass-details-issue">
		<div class="pass-details-header">
			<mt-header fixed title="通证详情">
			    <mt-button icon="back"slot="left"v-on:click="$router.go(-1)">返回</mt-button>
			</mt-header>
		</div>
			<div class="pass-details-information">
			<div class="pass-details-information-header">
				<span>基本信息</span>
			</div>
			<div class="pass-details-information-content">
				<ul class="fl">					
					<li>通政标识：</li>
					<li>通证昵称：</li>
					<li>合约地址：</li>
					<li>通证主体：</li>				
					<li>发行方：</li>
					<li>发行方报告：</li>
				</ul>
				<ul class="fr">					
					<li>
						<img src="../../../assets/images/icon-3.png"/>
						<span class="details-information-identification"> LD(LaoDou)</span>
					</li>
					<li>捞豆</li>
					<li>
						<span class="tag-read" @click="copy"
							data-clipboard-text="sdsf">
							sdsf
						</span>
					<li>
						<router-link to="/subject">
							<span>北京河底捞餐饮股份有限公司</span>	
						</router-link>	
					</li>
					<li>PLATOLAND集团</li>
					<li>
						<router-link to="/login">
							<span>《河底捞捞豆报告》.pdf</span>	
						</router-link>	
					</li>
				</ul>
			</div>
		</div>
		<div class="pass-details-issue-data">
			<div class="pass-details-issue-data-header">
				<span>发行数据</span>
			</div>
			<div class="pass-details-issue-data-content">
				<ul class="fl">
					<li>发行状态:</li>
					<li>股权发行比例:</li>
					<li>计价资产</li>
					<li>发行方式</li>
					<li>发行日期:</li>
					<li>截止日期:</li>
					<li>最小发行量:</li>
					<li>发行数量:</li>
					<li>起购数量:</li>					
					<li>初始单价:</li>
					<li>发行单价:</li>
				</ul>
				<ul class="fr">
					<li>发行中</li>
					<li>5%</li>
					<li>
						<img src="../../../assets/images/u318.png"/>
						<span class="details-information-identification"> USDT</span>
					</li>
					<li>首次发行</li>
					<li>2019-3-28</li>
					<li>{{this.$route.query.remarks}}</li>
					<li>50</li>
					<li>2.00000</li>
					<li>5.00</li>
					<li>6000</li>
					<li>6.00</li>
				</ul>
			</div>
		</div>
		<div class="pass-details-issue-btn">
			<router-link to="buy">
				<mt-button type="primary" size="large">买入</mt-button>
			</router-link>
		</div>
	</div>
</template>

<script>
//	复制
import Clipboard from 'clipboard'
import {mapActions, mapGetters,mapState} from 'vuex'
export default {
	created () {
//		this.issueing()
	},
	data() {
	    return {
	    	datalist:[]
	    }
	},
	mounted: function () {
		this.remarks
		console.group(this.$store.state.app.remarks)

	},
	methods:{
//		复制
		copy() {
	        var clipboard = new Clipboard('.tag-read')
	        clipboard.on('success', e => {
	          console.log('复制成功')
	          // 释放内存
	          clipboard.destroy()
	        })
	        clipboard.on('error', e => {
	          // 不支持复制
	          console.log('该浏览器不支持自动复制')
	          // 释放内存
	          clipboard.destroy()
	        })
     }

	},
	computed:{
		...mapState({
			remarks: state => state.app.remarks
		})
	}
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>