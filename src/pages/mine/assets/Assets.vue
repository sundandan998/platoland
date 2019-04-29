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
     
    <div class="certificate-list-card" v-for="(item, index) in getData" @click="toAsset(item.id)">
      <ul>
        <li>
	        <img src="../../../assets/images/u345.png" alt class="fl">
	        <span>{{item.name}}</span>
	        <span>{{item.company}}</span>         
					<!--<mt-button size="small" @click="$router.push('/pass')"  type="primary" class="fr">详情</mt-button>-->
        </li>
      </ul>
    </div>
     
    <div class="certificate-list-card assets-list-add">
      <ul>
        <li v-for="(item, index) in addList" :key="index">
          <router-link to="/assetsdetailed">
            <img src="../../../assets/images/u345.png" alt class="fl">
            <span>{{item.name}}</span>
            <span>{{item.company}}</span>
            <div class="assets-list-right fr">
              <p>6.00</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex'	
let globalList = []
let globalData = [
{
    id: "USDT",
    name: "USDT"
},
{
	id: "PLD",
  name: "PLD（PLATOLAND）",
  company: "PLD（PLATOLAND）"
}
]
export default {
  data() {
   return {
      addList:globalList,
      getData: [],
      getData: globalData,
   }
  },
  created(){
     this.getparameter()
  },
  watch:{
   '$route':'getparameter'
  },
  methods: {
  	getparameter(){
     let path = this.$route.params
     let arr = globalList
     if(JSON.stringify(path) != '{}'){
         arr.push(path)
         globalList = arr
         this.addList =globalList
     }
   },
  	async toAsset(id){
  	const url=this.$backStage('/asset?id='+id)
		 	const res = await this.$http.get(url)
			const data = res		
			this.$router.push({
				name:'AssetsDetailed',
			})			
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
@import "../../../assets/scss/global";
</style>