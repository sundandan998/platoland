<template>
	<div class="adress-book">
		<div class="adress-book-header header">
			<mt-header fixed :title="$t('m.addressbook')">
				<!-- <router-link to="mine"> -->
				<!-- v-on:click="$router.go(-1)" -->
				<!-- @click="back" -->
				<mt-button icon="back" slot="left" @click="back" to="mine">返回</mt-button>
				<!-- </router-link> -->
				<mt-button icon="" slot="right" @click.native="jump">
					<!-- <router-link to="list"> -->
					<img src="../../../assets/images/u2664.png" alt="" />
					<!-- </router-link> -->
				</mt-button>
			</mt-header>
		</div>
		<p class="no-data" v-if="this.book.length==0">暂无数据</p>
		<div class="adress-book-list" v-for="(item,index) in book">
			<!-- <p class="no-data" v-if="item.length<0">暂无数据</p> -->
			<!-- <router-link :to="{name:'Edit', params:{ id:item.id,name:item.name,address:item.address,remark:item.remark}}"> -->
			<!-- <router-link :to="{name:'Out', params:{ id:item.id,address:item.address}}"> -->
			<mt-cell @click.native="routerLink(item)">
				<div class="adress-book-content fl">
					<p class="name">{{item.name}}</p>
					<p>{{item.remark}}</p>
					<p>{{item.address}}</p>
				</div>
				<!-- <router-link :to="{name:'Edit', params:{ id:item.id,name:item.name,address:item.address,remark:item.remark,
							icon:item.token.icon,subject:item.token.subject,code:item.token.code}}"> -->
				<div class="edit-button">
					<mt-button size="small" type="primary" @click.native="address(item)">编 辑</mt-button>
				</div>
				<!-- </router-link> -->
			</mt-cell>
			<!-- </router-link> -->
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
				book: [],
				bookParams: {
					token_code: ''
				}
			}
		},
		created() {
			this.address()
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				window.sessionStorage.setItem('refpath', from.path)
			})
		},
		methods: {
			// 地址列表
			address(item) {
				// debugger
				this.bookParams.token_code = this.$route.params.token_code
				api.addressList(this.bookParams).then(res => {
					// if(res.code == 0){
					this.book = res.data
					// console.log(this.book)
					// this.$store.commit('detail', res.data)
					this.$router.push({
						name: 'Edit',
						params: {
							id: item.id, address: item.address, name: item.name, remark: item.remark,
							icon: item.token.icon, subject: item.token.subject, code: item.token.code
						}
					})
				}).catch(err => {
					console.log(err)
				})
			},
			routerLink(item) {
				// debugger
				let refpath = window.sessionStorage.getItem('refpath')
				// refpath == '/add'
				if (refpath == '/out' || refpath == '/edit' || refpath == '/add') {
					this.$router.push({
						name: 'Out',
						params: {
							id: item.id, address: item.address,
							code: item.token.code, subject: item.token.subject,
							nickname: item.token.nickname, name: item.name
						}
					})
					// this.$store.commit('detail')
				}
				// window.sessionStorage.setItem('refpath','')
			},
			back() {
				if (this.$route.params.id == 'out') {
					this.$router.push({
						name: 'Out',
					})
				} else {
					this.$router.push({
						name: 'Mine'
					})
				}
			},
			jump() {
				let refpath = window.sessionStorage.getItem('refpath')
				if (refpath == '/out') {
					this.$router.push({
						name: 'Add',
						params: { name: this.$route.params.name, icon: this.$route.params.icon, code: this.$route.params.token_code, nickname: this.$route.params.nickname, subject: this.$route.params.subject }
					})
				} else {
					this.$router.push({
						name: 'List'
					})
				}
			}
		},
	}
</script>
<style lang="scss">
	@import '../../../assets/scss/global';

	.adress-book {
		.no-data {
			margin: 200px auto;
			text-align: center;
		}

		.adress-book-list {
			margin: 0 24px 10px 24px;

			.mint-cell {
				border-radius: 10px;
			}

			.mint-cell-wrapper {
				display: block;
				background-image: none !important;
			}

			.adress-book-content {
				p {
					margin: 20px 0;
					font-size: 14px;
				}
				.name{
					font-size: 16px;
					font-weight: 700;
				}
			}

			.edit-button {
				position: absolute;
				right: 20px;
				button {
					font-size: 16px;
					height: 40px;
				}
			}
		}
	}
</style>