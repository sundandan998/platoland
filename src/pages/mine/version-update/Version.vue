<template>
	<div class="version">
		<div class="version-header">
			<mt-header fixed title="版本更新">
			  <router-link to="/mine" slot="left" >
			    <mt-button icon="back"></mt-button>
			  </router-link>
			</mt-header>
		</div>
		<div class="version-logo">
			<img src="../../../assets/images/logo.png" alt="" />
			<p>v1.0</p>
		</div>
		<button @click="versionbox">弹框</button>
		<div class="version-update">
			<mt-cell title="版本更新" value="当前为最新版本"></mt-cell>
		</div>
		
	</div>
</template>

<script>
export default{
	data(){
		return{
		}
	},
	created(){
	},
	methods:{
		versionbox(){
			this.$messagebox.confirm("<div><span>新版本特性:</span><p>1.xxxxxx</p></div>")
			.then(action => {
			})
		},
		upversion(){
			
		}
	}
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>