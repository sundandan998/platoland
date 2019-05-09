<template>
	<div class="version">
		<div class="version-header">
			<mt-header fixed title="版本更新">
			  <router-link to="/mine" slot="left" >
			    <mt-button icon="back">返回</mt-button>
			  </router-link>
			</mt-header>
		</div>
		<div class="version-logo">
			<img src="../../../assets/images/logo.png" alt="" />
			<p>{{this.$version()}}</p>
		</div>
		<div class="version-update">
			<mt-cell title="版本更新" value="当前为最新版本"></mt-cell>
		</div>

	</div>
</template>
<script>
import {mapGetters} from 'vuex'
export default{
	data(){
		return{

		}
	},
	created(){
	},
	mounted(){
	},
	methods:{
	},
	computed:{
	...mapGetters([
      'version'
    ])
  },
}
</script>

<style lang="scss">
	@import '../../../assets/scss/global'
</style>
