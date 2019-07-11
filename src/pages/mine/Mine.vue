<template>
	<div class="exchange">
		<div class="page-wrap">
			<mt-tab-container class="page-tabbar-container" v-model="selected">
				<mt-tab-container-item id="mine" class="home-index">
					<div class="mine-head">
						<div class="mine-head-portrait">
							<img src="../../assets/images/u2496.png" alt="" />
							<p>{{infoData.mobile}}</p>
							<P>{{infoData.email}}</P>
						</div>
					</div>
					<div class="mine-cell mine">
						<mt-cell :title="$t('m.assets')" to="/assets" is-link class="mine-cell-list">
							<img slot="icon" src="../../assets/images/zc.png">
						</mt-cell>
						<div class="mine-safety">
							<mt-cell :title="$t('m.addressbook')" to="/book" is-link class="mine-cell-list">
								<img slot="icon" src="../../assets/images/dzb.png">
							</mt-cell>
							<mt-cell :title="$t('m.security')" to="/safety" is-link class="mine-cell-list">
								<img slot="icon" src="../../assets/images/aq.png" alt="" />
							</mt-cell>
						</div>
						<div class="mine-our">
							<mt-cell :title="$t('m.version')" to="/version" is-link class="mine-cell-list">
								<img slot="icon" src="../../assets/images/bb.png" alt="" />
							</mt-cell>
							<mt-cell :title="$t('m.our')" to="/about" is-link class="mine-cell-list">
								<img slot="icon" src="../../assets/images/gy.png" alt="" />
							</mt-cell>
						</div>
					</div>
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
		<app-tabber :message=selected></app-tabber>
	</div>
</template>
<script>
	import Tabber from './../../assets/pub/Tabber.vue'
	import api from "@/api/user/User.js"
	export default {
		data() {
			return {
				selected: 'mine',
				message: 'mine',
				infoData:{}
			}
		},
		components: {
			'app-tabber': Tabber
		},
		created() {
			this.info()
		},
		methods: {
			// 用户信息
				info() {
				api.getUserInfo().then(res => {
					this.infoData = res.data
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}

</script>
<style lang="scss">
	@import '../../assets/scss/global'
</style>