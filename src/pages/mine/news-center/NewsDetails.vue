<template>
	<div class="news-details">
		<div class="news-details-header">
			<mt-header fixed title="公告详情">
			  <router-link to="/news" slot="left">
			    <mt-button icon="back"></mt-button>
			  </router-link>
			</mt-header>
		</div>
		<div class="news-details-list">
			<ul>
				<li>PLATOLAND生态获区块链协会创新应用大奖!
					<p>2019-6-5  13:15<span>会创新</span></p>
				</li>
				<li>
	3-28，首届亚洲区块链大赛在北京闭幕，大赛设置各种奖项，经过激烈角逐和专家评比，最终  PLATOLAND生态模式及应用获得高度认可。
				</li>
				<li>
					与会专家对PLATOLAND模式高度评价，认为在当前区块链应用
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{}
	}
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global';
</style>