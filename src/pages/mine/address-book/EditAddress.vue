<template>
	<div class="edit-adress">
		<div class="edit-adress-header">
			<mt-header fixed :title="$t('m.addressdetail')">
			  <router-link to="/book" slot="left">
			    <mt-button icon="back" @click="saveBox">{{$t('m.back')}}</mt-button>
			  </router-link>
			   <mt-button icon="" slot="right" @click="delBox">
			   	<img src="../../../assets/images/delete.png"  alt=""/><span>{{$t('m.delete')}}</span>
			   </mt-button>
			</mt-header>
		</div>
		<div class="add-adress-list">
			<span>{{$t('m.remarks')}}</span>
			<mt-field>
				<span class="add-adress-name">{{this.detail.name}}</span>
			</mt-field>
			<span>{{$t('m.describe')}}</span>
			<mt-field ></mt-field>
			<span>{{$t('m.usdtaddress')}}</span>
			<mt-field >
				<p class="to-change-into-exhibition-adress">
				{{this.detail.address}}
				</p>
			</mt-field>
		</div>
		<div class="edit-adress-btn ">
			<mt-button type="primary" size="large">{{$t('m.preservation')}}</mt-button>
		</div>
		<div class="edit-adress-text">
			<!--<p>注意：所有地址和账户均保存本地，删除APP前请备份</p>-->
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default{
	data(){
		return{
			book:[]
		}
	},
	created(){
		console.log(this.detail)
	},
	methods:{
	//点击删除弹出的消息框
	delBox(){
//		console.log(this.detail)
		this.$messagebox.confirm("确定删除该地址?")
		.then(action => {
			this.$router.push({
				path:'/book'
			})

		})
	},
	//点击返回弹出的消息框
	saveBox(){
		this.$messagebox.confirm("是否保存更改信息?")
		.then(action => {
			this.$router.push({
				path:'/book'

			})
		})
	},
//	remove(index){
//		console.log(this.detail)
//		this.detail.splice(index,1)
//	}
 },
	computed:{
		...mapGetters([
	      'detail'
		])
	}
//
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>
