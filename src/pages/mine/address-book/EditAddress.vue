<template>
	<div class="edit-adress">
		<div class="edit-adress-header header">
			<mt-header fixed :title="$t('m.addressDetail')">
				<!-- @click="saveBox" -->
				<!-- v-on:click="$router.go(-1)" -->
				<mt-button icon="back" slot="left"@click="back">{{$t('m.back')}}</mt-button>
				<mt-button icon="" slot="right" @click="del">
					<img src="../../../assets/images/delete.png" alt="" />
					<span>{{$t('m.delete')}}</span>
				</mt-button>
			</mt-header>
		</div>
		<div class="edit-title">
			<img :src="editparams.icon" alt="" class="fl" />
			<div class="edit-title-text">
				<span>{{editparams.code}} ({{editparams.name}})</span>
				<p>{{editparams.subject}}</p>
			</div>
		</div>
		<div class="add-adress-list">
			<span>{{$t('m.name')}}</span>
			<mt-field v-model="editparams.name"></mt-field>
			<span>{{$t('m.remark')}}</span>
			<mt-field v-model="editparams.remark"> </mt-field>
			<span>{{$t('m.address')}}</span>
			<mt-field v-model="editparams.address"></mt-field>
			<router-link to="/scan">
				<img src="../../../assets/images/scan.svg" alt="">
			</router-link>
		</div>
		<div class="edit-adress-text">
			<!--<p>注意：所有地址和账户均保存本地，删除APP前请备份</p>-->
		</div>
		<div class="edit-adress-btn">
			<mt-button type="primary" size="large" @click="edit" :disabled="disabled">{{$t('m.save')}}</mt-button>
		</div>
	</div>
</template>

<script>
	import { toast } from '@/assets/js/pub.js'
	//接口
	import api from "@/api/user/User.js"
	export default {
		data() {
			return {
				disabled: false,
				editId: {},
				editData: {},
				// 修改地址参数
				editparams: {
					name: '',
					address: '',
					remark: ''
				}
			}
		},
		created() {
			this.editparams = this.$route.params
			// console.log(this.$route.params.id)
		},
		methods: {
			back(){
				this.$router.push({
					name:'Book'
				})
			},
			// 编辑修改地址
			edit() {
				this.editparams.id = this.$route.params.id
				api.editAdress(this.editparams).then(res => {
					toast(res)
					this.$router.push({
						name: 'Book',
						params: { id: 'edit',token_code:res.data.token.code }
					})
				}).catch(err => {
					// console.log(err)
				})
			},
			// 删除地址
			del() {
				// 删除地址弹框
				this.$messagebox({
					title: '提示',
					message: '确定要删除改地址吗?',
					cancelButtonText: '取消',
					confirmButtonText: '确定',
					showCancelButton: true
				}).then(action => {
					if (action === 'confirm') {
						api.delAdress(this.$route.params).then(res => {
							toast(res)
							this.$router.push({
								name: 'Book'
							})
						}).catch(err => {
							toast(err)
						})
					}
				})
			},
			//点击返回弹出的消息框
			// saveBox() {
			// 	this.$messagebox({
			// 		title: 'Tips',
			// 		message: 'Are you sure to save the information?',
			// 		cancelButtonText: 'No',
			// 		confirmButtonText: 'Yes',
			// 		showCancelButton: true
			// 	})
			// 		.then(action => {
			// 			this.$router.push({
			// 				path: '/book'
			// 			})
			// 		})
			// }
		},
		watch: {
			editparams: {
				immediate: true,
				deep: true,
				handler(val) {
					if (val.name == '' || val.address == '') {
						this.disabled = true
					} else {
						this.disabled = false
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '../../../assets/scss/global';

	.edit-adress {
		.mint-cell-wrapper {
			display: block;
		}
		.edit-title {
			margin: 20px 24px 0 24px;
			background-color: #fff;
			height: 110px;
			border-radius: 10px;
			img{
				margin:23px 20px 0 10px;
			}
			.edit-title-text{
				display: inline-block;
				margin-top: 20px;
			}
		}

		.add-adress-list {
			margin-top: 1px;
			padding-bottom: 20px;

			img {
				margin-top: -75px;
				position: relative;
				float: right;
				margin-right: 40px;
			}
			span {
				padding-left: 15px;
				color: #999;
				margin:10px 0 10px 24px;
				display: inline-block;
				font-size:28px;
			}
		 .mint-cell{
			 margin:0 10px;
			 border-radius: 10px;
		 }
		 .mint-field .mint-cell-value{
			 height: 48px;
		 }

		}

		.edit-adress-btn {
			position: fixed;
			bottom: 10px;
			width: 100%;
		}
	}
</style>