<template>
  <div class="certificate-list" >
    <div class="certificate-list-header">
      <mt-header fixed title="资产列表">
          <mt-button slot="left" icon="back" v-on:click="$router.go(-1)"></mt-button>
      </mt-header>
    </div>
    <div class="certificate-list-card">
      <ul>
        <li v-for="(item, index) in assetsdata" >
        	 <!--@click.prevent.stop="removeData(item.name)"-->
        	 <!--@click="$router.push('/detail')-->
          <div @click="issue(item.id)">
            <img src="../../../assets/images/u345.png" alt class="fl">
            <span>{{item.name}}</span>
            <span>{{item.company}}</span>
          </div>
          <mt-switch v-model="value"  class="fr asset-list-switch" @change="assetswitch"></mt-switch>
          <!--<input type="checkbox"class="fr"/>-->
					<!--<mt-button size="small" @click="$router.push('/pass')"  type="primary" class="fr">详情</mt-button>-->
        </li>
      </ul>
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
			if(this.value == true){
				this.$toast({
				  message: '添加资产成功'
				})
			}
		}
  }
 
}
</script>


<style lang="scss">
@import "../../../assets/scss/global"
</style>