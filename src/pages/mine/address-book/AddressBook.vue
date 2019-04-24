<template>
	<div class="adress-book">
		<div class="adress-book-header">
			<mt-header fixed title="地址簿">
			  <router-link to="/mine" slot="left">
			    <mt-button icon="back"></mt-button>
			  </router-link>
			   <mt-button icon="" slot="right">
			   	<router-link to="add">
			   		<img src="../../../assets/images/u2664.png" alt="" />
			   	</router-link>			   	
			   </mt-button>
			</mt-header>
		</div>
		<div class="adress-book-list" v-for="item in book">
			<mt-cell>				
				<div class="adress-book-content fl">
					<p>{{item.name}}</p>
					<p>{{item.address}}</p>
				</div>
				<!--<router-link to="/edit">-->
					<div @click="editcontent">
						<mt-button size="small" type="primary">编辑</mt-button>
					</div>
					
				<!--</router-link>-->
			</mt-cell>
		</div>
	</div>
</template>
<script>
export default{
	created () {
    	this.address()
  	},
	data(){
		return{
			book:[]
		}
	},
	methods:{
		async address (){
			const res = await this.$http.get('/api/address')
//			const url=this.$backStage('/adress')
//	 		const res = await this.$http.get(url)
			const data = res	
			this.book = res.data.data
		},
//		点击编辑跳转
		editcontent(){
			this.$router.push({
				path:'/edit',
				query:{
					name: this.book[0].name,
					address:this.book[0].address
				}
			})
		}
	}
}
</script>
<style lang="scss">
	@import '../../../assets/scss/global'
</style>