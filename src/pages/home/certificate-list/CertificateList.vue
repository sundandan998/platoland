<template>
  <div class="certificate-list" >
    <div class="certificate-list-header">
      <mt-header fixed title="资产列表">
          <mt-button slot="left" icon="back" v-on:click="$router.go(-1)"></mt-button>
      </mt-header>
    </div>
    <!--<div class="certificate-list-card">
      <ul>
        <li
          v-for="(item, index) in getData"
          :key="index"
          v-if="item.hidden!=0"  
          
        >
        <div @click="listData">
        	<img src="../../../assets/images/u345.png" alt class="fl">
        	<p>
	          <span>{{item.name}}</span>
	          <span>{{item.company}}</span> 
          </p>
        </div>      
          <router-link to="/tzxq">
        		<mt-button size="small" type="primary" class="fr">详情</mt-button>
      		</router-link>
        </li>
      </ul>
    </div>-->
    <div class="certificate-list-card">
      <ul v-if="fromPath =='/assets'|| fromPath=='/pass'">
        <li v-for="(item, index) in getData" :key="index" v-if="item.hidden!=0">
          <div @click.prevent.stop="removeData(item.name)">
            <img src="../../../assets/images/u345.png" alt class="fl">
            <span>{{item.name}}</span>
            <span>{{item.company}}</span>
          </div>
					<mt-button size="small" @click="$router.push('/pass')"  type="primary" class="fr">详情</mt-button>
        </li>
      </ul>
      <ul v-if="fromPath =='/add'">
        <li v-for="(item, index) in getData" :key="index">
          <div @click.prevent.stop="addressPush(item)">
            <img src="../../../assets/images/u345.png" alt class="fl">
            <span>{{item.name}}</span>
            <span>{{item.company}}</span>
          </div>
          <mt-button size="small" @click="$router.push('/pass')" type="primary" class="fr">详情</mt-button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
	let globalData = [
{
    name: "PLD (PLD)",
    company: "PLATOLAND集团"
},
{
    name: "LD (河底捞)",
    company: "河底捞集团"
},
{
    name: "ZCK(租车卡)",
    company: "丰达汽车"
},
]
let fromPath = "";
export default {
  data() {
    return {
      popupVisible: true,
      getData: [],
      getData: globalData,
      fromPath: fromPath
    }
  },
	created () {
//	  	this.list()
		this.fromPath = fromPath.path
	//  console.log(this.fromPath);
	  },
	beforeRouteEnter(to, from, next) {
    fromPath = from
    next()
  },
 	methods: {
// 		async list (){
////			const res = await this.$http.get('/api/list')
//			const url=this.$backStage('/list')
//	 		const res = await this.$http.get(url)
//			const data = res	
//			this.getData = res.data.data
////			console.log(this.getData[0].company)
//		},
//		listData(){
//			this.$router.push({
//				path:'/add',
//				query:{		
//					company:this.getData[0].company
//				}
//			})
//		},
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
    }
  }
}
</script>


<style lang="scss">
@import "../../../assets/scss/global"
</style>