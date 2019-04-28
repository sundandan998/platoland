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
				<ul class="fl">					
					<li>通政标识：</li>
					<li>通证昵称：</li>
					<li>合约地址：</li>
					<li>通证主体：</li>				
					<li>发行方：</li>
					<li>发行方报告：</li>
				</ul>
				<ul class="fr information-content-right">					
					<li>
						<!--<img src="../../../assets/images/icon-3.png"/>-->
						<span class="details-information-identification">{{this.detail.id}}</span>
					</li>
					<li>{{this.detail.Issuer}}</li>
					<li>
						<span class="tag-read" @click="copy"
							data-clipboard-text="detailslist.address">
							{{this.detail.address}}
						</span>
					<li>
						<router-link to="/subject">
							<span>{{this.detail.assets}}</span>	
						</router-link>	
					</li>
					<li>{{this.detail.issuer}}</li>
					<li>{{this.detail.issuer}}</li>
					<li>
						<span>{{this.detail.assets}}</span>
						<!--<router-link to="/login">
							<span>《河底捞捞豆报告》.pdf</span>	
						</router-link>	-->
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
				<ul class="fr information-content-right">
					<li>{{this.detail.state}}</li>
					<li>{{this.detail.hold}}</li>
					<li>
						<img src="../../../assets/images/u318.png"/>
						<span class="details-information-identification">{{this.detail.assets}}</span>
					</li>
					<li>{{this.detail.date}}</li>
					<li>{{this.detail.date}}</li>
					<li>{{this.detail.num}}</li>
					<li>{{this.detail.purnum}}</li>
					<li>{{this.detail.smallnum}}</li>
					<li>{{this.detail.num}}</li>
					<li>{{this.detail.purnum}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
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
	    	data:[]
	    }
	},
	mounted() {
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
		...mapGetters([
	      'detail'
	    ])
	}
}

</script>

<style lang="scss">
	@import '../../../assets/scss/global';
</style>