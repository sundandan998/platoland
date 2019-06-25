<template>
	<div class="assets-detailed">
		<div class="assets-detailed-header">
			<mt-header fixed :title="$t('m.passdetails')">
				<mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
			</mt-header>
		</div>
		<div class="assets-detailed-list" @click="listDetail">
			<!-- <router-link to="/transaction"> -->
			<mt-cell :title="$t('m.changeout')" to="/transaction" is-link label="2018-03-06  12:03">
				<span>-30000</span>
			</mt-cell>
			<p>USDT</p>
			<!-- </router-link> -->
		</div>
	</div>
</template>

<script>
	// 接口
	import api from "@/api/user/User.js"
	import { toast } from '@/assets/js/pub.js'
	export default {
		data() {
			return {
				listData: {
				},
				detailData: {
					order_id: '',
					order_type: 1
				}
			}
		},
		created() {
			this.list()
		},
		methods: {
			// 明细接口
			list() {
				api.transactionList().then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			},
			// 明细详情接口
			listDetail() {
				api.listDetail(this.detailData).then(res => {
					if (res.code == 0) {
						toast(res)
					}
				}).catch(err => {
					if (err.code != 0) {
						toast(err)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>