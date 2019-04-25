<template>
	<div class="edit-adress">
		<div class="edit-adress-header">
			<mt-header fixed title="地址详情">
			  <router-link to="/book" slot="left">
			    <mt-button icon="back"></mt-button>
			  </router-link>
			   <mt-button icon="" slot="right" @click="delBox">
			   	<img src="../../../assets/images/delete.png"  alt=""/>删除
			   </mt-button>
			</mt-header>
		</div>
		<div class="add-adress-list">
			<span>备注名称</span>			
			<mt-field>
				<span class="add-adress-name">{{this.$route.query.name}}</span>
			</mt-field>
			<span>描述</span>
			<mt-field ></mt-field>
			<span>USDT地址</span>
			<mt-field >
				<p class="to-change-into-exhibition-adress">
				{{this.$route.query.address}}
				</p>
			</mt-field>
		</div>
		<div class="edit-adress-btn ">
			<mt-button type="primary" size="large" @click="saveBox">保存</mt-button>
		</div>
		<div class="edit-adress-text">
			<!--<p>注意：所有地址和账户均保存本地，删除APP前请备份</p>-->
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{}
	},
	methods:{
	//点击删除弹出的消息框
	delBox(){
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
		}
	}
//
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>