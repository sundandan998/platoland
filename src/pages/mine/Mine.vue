<template>
	<div class="exchange">
		<div class="page-wrap">
			<mt-tab-container class="page-tabbar-container" v-model="selected">
				<mt-tab-container-item id="mine" class="home-index">
					<div class="mine-head">
						<img src="../../assets/images/avatar.png" alt="" />
						<p>{{infoData.email||infoData.mobile}}</p>
						<!-- <P>{{infoData.email}}</P> -->
					</div>
					<div class="mine-cell mine">
						<!-- <mt-cell title="邀请新人" to="/invite" is-link class="mine-cell-list">
							<img slot="icon" src="../../assets/images/people.svg">
						</mt-cell> -->
						<div class="mine-border-radius">
							<mt-cell :title="$t('m.assets')" to="/assets" is-link class="mine-cell-list">
								<img slot="icon" src="../../assets/images/zc.svg">
							</mt-cell>
							<mt-cell title="订单" to="/order" is-link class="mine-cell-list">
								<img slot="icon" src="../../assets/images/dd.svg">
							</mt-cell>
						</div>
						<div class="mine-safety mine-border-radius">
							<mt-cell :title="$t('m.addressbook')" to="/book" is-link class="mine-cell-list">
								<img slot="icon" src="../../assets/images/dzb.svg">
							</mt-cell>
							<mt-cell :title="$t('m.security')" to="/safety" is-link class="mine-cell-list">
								<img slot="icon" src="../../assets/images/aq.svg" alt="" />
							</mt-cell>
						</div>
						<div class="mine-our mine-border-radius">
							<mt-cell :title="$t('m.version')" to="/version" is-link class="mine-cell-list">
								<img slot="icon" src="../../assets/images/bb.svg" alt="" />
							</mt-cell>
							<mt-cell :title="$t('m.our')" to="/about" is-link class="mine-cell-list">
								<img slot="icon" src="../../assets/images/gy.svg" alt="" />
							</mt-cell>
						</div>
						<div class="mine-safety mine-token" v-if="this.infoData.token_admin==true">
							<router-link :to="{name:'Certificate',params:{code:this.infoData.token_code}}">
								<mt-cell title="我的通证" is-link class="mine-cell-list">
									<img slot="icon" src="../../assets/images/tz.svg" alt="" />
								</mt-cell>
							</router-link>
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
				infoData: {},
				access_token: ''
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
					window.sessionStorage.setItem('pay_pwd_active', this.infoData.pay_pwd_active)
					// window.localStorage.setItem('pay_pwd_active', this.infoData.pay_pwd_active)
				}).catch(err => {
					console.log(err)
				})
			},
		},
	}

</script>
<style lang="scss">
	@import '../../assets/scss/global';

	.exchange {
		.mine-head {
			img {
				display: block;
				margin: 30px auto;
			}

			p {
				text-align: center;
				margin-bottom: 50px;
				font-size: 26px;
			}
		}

		.mine-cell {
			margin: 0 24px;
			.mint-cell-title {
				color: #000;
			}

			.mine-border-radius {
				a.mint-cell.mine-cell-list {
					border-top-left-radius: 10px;
					border-top-right-radius: 10px;
				}

				a.mint-cell.mine-cell-list:last-child {
					border-bottom-left-radius: 10px;
					border-bottom-right-radius: 10px;
					border-top-left-radius: unset;
					border-top-right-radius: unset;

				}
			}

			.mine-safety {
				margin: 20px 0 20px 0px;
			}

			.mine-token {
				a.mint-cell.mine-cell-list {
					border-radius: 10px;
				}
			}
		}
	}
</style>