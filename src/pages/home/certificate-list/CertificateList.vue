<template>
  <div class="certificate-list" >
    <div class="certificate-list-header">
      <mt-header fixed title="资产列表">
          <mt-button slot="left" icon="back" v-on:click="$router.go(-1)"></mt-button>
      </mt-header>
    </div>
    <div class="certificate-list-card">
      <ul>
        <li v-for="(item, index) in assetsdata" :key="index"  >
        	 <!--@click.prevent.stop="removeData(item.name)"-->
        	 <!--@click="$router.push('/detail')-->
          <div @click="issue(item.id)">
            <img src="../../../assets/images/u345.png" alt class="fl">
            <span>{{item.name}}</span>
            <span>{{item.company}}</span>
          </div>
          <input type="checkbox" class="fr"/>
					<!--<mt-button size="small" @click="$router.push('/pass')"  type="primary" class="fr">详情</mt-button>-->
        </li>
      </ul>
      <!--<ul v-if="fromPath =='/add'">
        <li v-for="(item, index) in getData" :key="index">
          <div @click.prevent.stop="addressPush(item)">
            <img src="../../../assets/images/u345.png" alt class="fl">
            <span>{{item.name}}</span>
            <span>{{item.company}}</span>
          </div>
          <!--<mt-button size="small" @click="$router.push('/pass')" type="primary" class="fr">详情</mt-button>-->
        <!--</li>-->
      <!--</ul>-->
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'	
import store from './../../../store/modules/app.js'
let globalData = []
let fromPath = "";
export default {
  data() {
    return {
      popupVisible: true,
      getData: [],
      data:[],
      getData: globalData,
      fromPath: fromPath,
      assetsdata:[]
    }
  },
	created () {
		
//		this.listassets()
//	  	this.list()
		this.fromPath = fromPath.path
	//  console.log(this.fromPath);
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
	
	beforeRouteEnter(to, from, next) {
    fromPath = from
    next()
 },
  beforeRouteLeave(to, from, next) {
  	//console.group('beforeRouteLeave ===============》');
  	this.$store.commit('refpath', '')
  	next()
  },
 	methods: {
    addressPush(b) {
        this.$router.push({ name: "Add", params: b });
    },
    removeData(a) {
      let newGetData =globalData	
      let temporary = newGetData.map((item, index) => {
        if (item.name == a) {
          item.hidden = 0;
          this.$router.push({ name: "Assets", params: item })
        }
        return item
      })
       globalData = temporary
    },

    async issue(id){ 	
    	if (this.refpath==='/add'){
    		this.$router.push({
				path:'/add',
			})	
    	}else{   		
    	const url=this.$backStage('/query?id='+id)
		 	const res = await this.$http.get(url)
			const data = res	
			console.log(data)
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
//			 	console.log(this.issuedata)
//			 	console.log(this.issuedata[0].state)
		}
  }
 
}
</script>


<style lang="scss">
@import "../../../assets/scss/global"
</style>