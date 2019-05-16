<template>
	<div class="adress-book">
		<div class="adress-book-header">
			<mt-header fixed :title="$t('m.addressbook')">
			    <mt-button icon="back" slot="left"v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
			   <mt-button icon="" slot="right">
			   	<router-link to="add">
			   		<img src="../../../assets/images/u2664.png" alt="" />
			   	</router-link>
			   </mt-button>
			</mt-header>
		</div>
    <router-link to="out">
  		<div class="adress-book-list" v-for="(item,index) in book">
  			<mt-cell>
  				<div class="adress-book-content fl">
  					<p>{{item.name}}</p>
  					<p>{{item.address}}</p>
  				</div>
          <router-link to="edit">
  				<div @click="editcontent">
  					<mt-button size="small" type="primary" @click="address">{{$t('m.edit')}}</mt-button>
  				</div>
          </router-link>
  			</mt-cell>
  		</div>
    </router-link>
	</div>
</template>
<script>
import {mapActions} from 'vuex'
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
//			const res = await this.$http.get('/api/address')
			const url=this.$backStage('/address')
	 		const res = await this.$http.get(url)
			const data = res
			this.book = res.data.data
			// console.log(this.book)
			this.$store.commit('detail', res.data.data[0])
		},
//		点击编辑跳转
		editcontent(){
			this.$router.push({
				path:'/edit'
			})
		}
	}
}
</script>
<style lang="scss">
	@import '../../../assets/scss/global'
</style>
