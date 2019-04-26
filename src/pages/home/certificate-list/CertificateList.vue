<template>
  <div class="certificate-list" >
    <div class="certificate-list-header">
      <mt-header fixed title="资产列表">
        <router-link to="/purchaserelease" slot="left">
          <mt-button icon="back" v-on:click="back"></mt-button>
        </router-link>
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
      <ul v-if="fromPath =='/assets'">
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
    name: "PLD",
    company: "PLATOLAND集团"
},
{
    name: "河底捞",
    company: "河底捞集团"
},
{
    name: "捞豆",
    company: "捞豆集团"
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
    // console.log(to);
    // console.log(from);
    fromPath = from;
    // console.log(next);
    next();
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
    },
    back(){
        	this.$router.go(-1)//返回上一层
    }
  }
}
</script>


<style lang="scss">
@import "../../../assets/scss/global"
</style>