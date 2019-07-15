<template>
	<div class="adress-book">
		<div class="adress-book-header">
			<mt-header fixed :title="$t('m.addressbook')">
				<mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
				<mt-button icon="" slot="right">
					<router-link to="list">
						<img src="../../../assets/images/u2664.png" alt="" />
					</router-link>
				</mt-button>
			</mt-header>
		</div>
		<div class="adress-book-list" v-for="(item,index) in book">
			<router-link :to="{name:'Edit', params:{ id:item.id,name:item.name,address:item.address,remark:item.remark}}">
				<mt-cell>
					<div class="adress-book-content fl">
						<p>{{item.name}}</p>
						<p>{{item.remark}}</p>
						<p>{{item.address}}</p>
					</div>
					<mt-button size="small" type="primary" @click="address">{{$t('m.edit')}}</mt-button>
				</mt-cell>
			</router-link>
		</div>
	</div>
</template>
<script>
	import { mapActions } from 'vuex'
	//接口
	import api from "@/api/user/User.js"
	export default {
		data() {
			return {
				book: []
			}
		},
		created() {
			this.address()
		},
		methods: {
			// 地址列表
			address() {
				api.addressList().then(res => {
					this.book = res.data
					// this.$store.commit('detail', res.data)
					// console.log(this.book)
				}).catch(err => {
					console.log(err)
				})
			},
		}
	}
</script>
<style lang="scss">
	@import '../../../assets/scss/global'
</style>