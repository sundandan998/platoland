<template>
	<div class="pass-details-issue">
		<div class="pass-details-header">
			<mt-header fixed title="通证详情">
			    <mt-button icon="back" slot="left"v-on:click="$router.go(-1)">返回</mt-button>
			</mt-header>
		</div>
		<div class="pass-details-information">
			<div class="pass-details-information-header">
				<span>基本信息</span>
			</div>
			<div class="pass-details-information-content">
		        <mt-cell title="通政标识：" :value="this.detail.id"></mt-cell>
		        <mt-cell title="通证昵称：" :value="this.detail.name"></mt-cell>
		        <mt-cell title="合约地址：" :value="this.detail.address"></mt-cell>
		        <mt-cell title="通证主体：" :value="this.detail.body"  to="/subject" is-link></mt-cell>
		        <mt-cell title="发行方：" :value="this.detail.issuer"></mt-cell>
		        <mt-cell title="权益说明：" :value="this.detail.explain"></mt-cell>
            <!-- <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field> -->
			</div>
		</div>
		<div class="pass-details-issue-data">
			<div class="pass-details-issue-data-header">
				<span>发行数据</span>
			</div>
			<div class="pass-details-issue-data-content">
		        <mt-cell title="发行状态:" :value="this.detail.state"></mt-cell>
		        <mt-cell title="股权发行比例:" :value="this.detail.proportion"></mt-cell>
		        <mt-cell title="计价资产:" :value="this.detail.assets"></mt-cell>
		        <mt-cell title="发行方式:" :value="this.detail.mode"></mt-cell>
		        <mt-cell title="发行日期:" :value="this.detail.issuetime"></mt-cell>
		        <mt-cell title="截止日期:" :value="this.detail.endtime"></mt-cell>
		        <mt-cell title="最小发行量:" :value="this.detail.minnum"></mt-cell>
		        <mt-cell title="起购数量:" :value="this.detail.amountnum"></mt-cell>
		        <mt-cell title="已售数量:" :value="this.detail.purchasenum"></mt-cell>
		        <mt-cell title="初始单价:" :value="this.detail.purchasenum"></mt-cell>
		        <mt-cell title="发行单价:" :value="this.detail.initialprice"></mt-cell>
		        <mt-cell title="权益说明:" :value="this.detail.issueprice"></mt-cell>
			</div>
		</div>
		<div class="pass-details-issue-btn" id="transaction">
			<router-link to="/deal">
				<mt-button type="primary" size="large">去交易</mt-button>
			</router-link>
		</div>
		<div class="pass-details-issue-btn" id="purchase">
			<router-link to="buy">
				<mt-button type="primary" size="large">买入</mt-button>
			</router-link>
		</div>
	</div>
</template>

<script>
import {mapActions} from 'vuex'
import Clipboard from 'clipboard'
import {mapGetters} from 'vuex'
export default {
	created(){
//		console.log(this.$store.state.app.detail)
//		console.log(this.$store.state.app.detail[0].id)
	},
	data() {
	    return {
	    	detailslist:[],
	    	data:[],
	    	show:''
	    }
	},
	mounted() {
		this.showbtn()
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
    	},
		showbtn(){
//			debugger
			if(this.detail.state== '待发行'){
				document.getElementById("transaction").style.display="none"
				document.getElementById("purchase").style.display="none"
			}else if(this.detail.state== '发行中'){
				document.getElementById("transaction").style.display="none"
				document.getElementById("purchase").style.display="block"
			}else if(this.detail.state== '流通中'){
				document.getElementById("purchase").style.display="none"
				document.getElementById("transaction").style.display="block"
			}
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
