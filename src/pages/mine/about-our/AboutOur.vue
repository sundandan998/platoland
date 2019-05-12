<template>
	<div class="about-our">
		<div class="about-our-header">
			<mt-header fixed title="关于我们">
			  <router-link to="/mine" slot="left">
			    <mt-button icon="back">返回</mt-button>
			  </router-link>
			</mt-header>
		</div>
		<div class="about-our-logo">
			<img src="../../../assets/images/logo.png" alt="" />
		</div>
		<div class="about-our-text">
      <div>
        <span><b></b> PLATOLAND使命</span>
        <p>打造资产单价发现、人人可投资的资产通证化数字平台</p>
        <p>让世上没有实现不了的价值</p>
      </div>
			<!-- <ul>
				<li> <b></b> PLATOLAND使命</li>
				<li>打造资产单价发现、人人可投资的资产通证化数字平台</li>
				<li>让世上没有实现不了的价值</li>
			</ul> -->
			<div>
				<span> <b></b> PLATOLAND业务</span>
				<p>为企业：将资产，通证化改造为可在市场流通的通证</p>
				<p>为个人：普通民众可自由投资已通证化改造的资产，享有对应收益。门槛低，人人可投资</p>
			</div>
			<div>
				<span> <b></b> PLD</span>
				<p>PLD是PLATOLAND集团官方基于PLATOLAND生态发行的通证</p>
			</div>
			<div>
				<span> <b></b> PLATOLAND运营方</span>
				<p>PLATOLAND客户端由PLATOLAND有限公司运营，核心团队来自国际知名区块链企业、金融机构、法律机构等</p>
			</div>
		</div>
		<div class="about-our-contact">
				<p> <b></b> 联系我们 </p>
        <mt-cell title="网站" to="http://www.platoland.com" is-link value="http://www.platoland.com"></mt-cell>
				<mt-cell title="推特" to="" ></mt-cell>
        <mt-cell title="reddit" to="" ></mt-cell>
        <mt-cell title="Facebook" to="" is-link></mt-cell>
        <mt-cell title="Telegram" to="" is-link></mt-cell>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>
