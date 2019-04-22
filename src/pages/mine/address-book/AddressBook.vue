<template>
	<div class="adress-book">
		<div class="adress-book-header">
			<mt-header title="地址簿">
			  <router-link to="/" slot="left">
			    <mt-button icon="back"></mt-button>
			  </router-link>
			   <mt-button icon="" slot="right">
			   	<router-link to="add">
			   		<img src="../../../assets/images/u2664.png" alt="" />
			   	</router-link>			   	
			   </mt-button>
			</mt-header>
		</div>
		<div class="adress-book-list">
			<mt-cell title="将宝宝"label="13dfsd..422" >
				<span>
					<router-link to="/edit">
						<mt-button size="small" type="primary">编辑</mt-button>
					</router-link>
				</span>
			</mt-cell>
			<mt-cell title="xxx"label="13dfsd..422" >
				<router-link to="/edit">
					<span><mt-button size="small" type="primary">编辑</mt-button></span>
				</router-link>
			</mt-cell>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return{
			
		}
	},
	methods:{
		
	}
}
</script>
<style lang="scss">
	@import '../../../assets/scss/global'
</style>