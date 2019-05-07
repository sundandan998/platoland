<template>
  <div class="assest">
    <div class="assest-header">
      <mt-header fixed title="资产">
        <router-link to="/mine" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <mt-button icon slot="right">
          <router-link to="/detailedlist">
            <img src="../../../assets/images/u2666.png" alt>明细
          </router-link>
        </mt-button>
      </mt-header>
    </div>
    <div class="assets-list">
      <router-link to="/list">
        <img src="../../../assets/images/u3511.png" alt><span>添加资产</span>
      </router-link>
    </div>
    <router-link to="/assetsdetailed">
     	<div class="certificate-list-card" v-for="(item,index) in assetsdata" @click="toAsset(item.id)">
      <ul>
        <li>
	        <img src="../../../assets/images/u345.png" alt class="fl">
	        <span>{{item.id}}</span>
	        <span>{{item.name}}</span>   
	        <p class="fr">{{item.purchasenum}}</p>
					<!--<mt-button size="small" @click="$router.push('/pass')"  type="primary" class="fr">详情</mt-button>-->
        </li>
      </ul>
    </div>
    </router-link>     
    <!--<div class="certificate-list-card assets-list-add" >
      <ul>
        <li>
          <router-link to="/assetsdetailed">
            <img src="../../../assets/images/u345.png" alt class="fl">
            <span>{{$route.params.name}}</span>

            <div class="assets-list-right fr">
              <p>6.00</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>-->
  </div>
</template>
<script>
import {mapActions} from 'vuex'	
export default {
  data() {
   return {
   		assetsdata:[]
   }
  },
  created(){
     this.toAsset()
//   console.log(item)
  },
  mounted(){
  	this.toAsset()
//	this.$store.dispatch('detail')
  },
  watch:{
  },
  methods: {
  	async toAsset(id){
  		const url=this.$backStage('/asset?id'+id)
		 	const res = await this.$http.get(url)
			const data = res.data
//			console.log(data)
			this.assetsdata = data
//			console.log(this.assetsdata)
//			})			
			this.$store.commit('detail', res.data[0])  	  	
  	}
  }   
}
</script>

<style lang="scss">
	.assest-header{
		background-color: #fff;
		color:#000;
	}
@import "../../../assets/scss/global"
</style>