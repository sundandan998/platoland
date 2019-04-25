<template>
	<div class="add-address">
		<div class="add-address-header">
			<mt-header fixed title="添加地址">
			  <router-link to="/book" slot="left">
			    <mt-button icon="back"></mt-button>
			  </router-link>
			</mt-header>
		</div>
		<div class="add-adress-list">
			<span>备注名称</span>
			<mt-field></mt-field>
			<span>描述</span>
			<mt-field ></mt-field>
			<router-link to="/list">
				<span> 	
				   	<img src="../../../assets/images/u2693.png" alt="" />
				   	添加地址
				</span>	
			</router-link>			
		</div>
		<div class="add-adress-btn">
			<router-link to="/book">
				<mt-button type="primary" size="large">添加</mt-button>
			</router-link>
		</div>
		<div class="edit-adress-text">
			<p>注意：资金转出到其他账户后无法退回，请务必核实：</p>
			<p>1.对方信息是否正确</p>
			<p>2.账号是否是其本人使用</p>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			username:''
		}
	},
	methods:{
		openaction(){
			this.sheetVisible =!this.sheetVisible
		}
	}
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>