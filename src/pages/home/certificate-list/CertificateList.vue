<template>
  <div class="certificate-list" >
    <div class="certificate-list-header">
      <mt-header fixed :title="$t('m.assetslist')">
          <mt-button slot="left" icon="back" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="certificate-list-card" v-for ="(item, index) in assetsdata">
      <mt-cell :title="item.id+ (item.nickname)" :value="item.name" :label="item.body" @click="issue(item.id)">
          <img class="assets-icon" slot="icon" v-bind:src="'static/img/'+item.icon+'.png'"/>
          <mt-switch v-model="item.isactive=='0'" class="asset-list-switch" @change="assetswitch"></mt-switch>
      </mt-cell>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import store from './../../../store/modules/app.js'
export default {
  data() {
    return {
      popupVisible: true,
      value:false,
      data:[],
      assetsdata:[]

    }
  },
	created () {
	  },
	mounted () {
		this.$store.dispatch('detail'),
		this.listassets()
//	  console.group(this.$store.state.app.showFooter)
		},
		computed:{
		...mapGetters([
	      'refpath'
	    ])
	},
  beforeRouteLeave(to, from, next) {
  	//console.group('beforeRouteLeave ===============》');
  	this.$store.commit('refpath', '')
  	next()
  },
 	methods: {
    async issue(id){
    	if (this.refpath==='/add'){
    		this.$router.push({
				path:'/add',
			})
    	}else{
	    	const url=this.$backStage('/query?id='+id)
			 	const res = await this.$http.get(url)
				const data = res.data
//				console.log(data[0].id)
				this.$router.push({
					name:'Detail',
			})
			this.$store.commit('detail', res.data[0])
    	}
		},
		async	listassets(){
			const url=this.$backStage('/query')
		 	const res = await this.$http.get(url)
		 	const data = res.data
		 	this.assetsdata = res.data
//		 	console.log(this.assetsdata[0].id)
		 	this.$store.commit('detail', res.data[0])
		},
		assetswitch(){
				this.$toast({
				  message: 'Done Successfully'
				})
		}
  }

}
</script>


<style lang="scss">
@import "../../../assets/scss/global"
</style>
