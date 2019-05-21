<template>
  <div class="exchange">
    <div class="page-wrap">
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="explore">
        	<div class="explore">
	        	<div class="explore-header">
							<mt-header fixed :title="$t('m.explore')"></mt-header>
	        	</div>
	        	<div class="explore-navbar">
	        		<van-tabs @click="list">
                <!-- :title="$t('m.whole')" -->
							  <van-tab  title="All">
                  <div  v-for="(items,index) in issuedata" @click="tokenDetail(items.id)">
                    <mt-cell :title="items.id +items.nickname" :label="items.name">
                      <img class="assets-icon"slot="icon" v-bind:src="'static/img/'+items.icon+'.png'"/>
                        <mt-button size="small" type="primary" class="fr" @click="tokenDetail(items.id)">{{$t('m.detail')}}</mt-button>
                    </mt-cell>
                  </div>
							  </van-tab>
                <!-- :title="$t('m.incirculation')" -->
							  <van-tab  title="In Circulation">
                  <div  v-for="(items,index) in issuedata" @click="tokenDetail(items.id)">
                    <mt-cell :title="items.id +(items.nickname)" :label="items.body">
                      <img class="assets-icon" slot="icon" v-bind:src="'static/img/'+items.icon+'.png'"/>
                        <mt-button size="small" type="primary" class="fr" @click="tokenDetail(items.id)">{{$t('m.detail')}}</mt-button>
                    </mt-cell>
                  </div>
							  </van-tab>
                <!-- :title="$t('m.inissue')" -->
							  <van-tab title="Issuing">
							   <div  v-for="(items,index) in issuedata" @click="tokenDetail(items.id)">
                    <mt-cell :title="items.id +(items.nickname)" :label="items.body">
                      <img class="assets-icon" slot="icon" v-bind:src="'static/img/'+items.icon+'.png'"/>
                        <mt-button size="small" type="primary" class="fr" @click="tokenDetail(items.id)">{{$t('m.detail')}}</mt-button>
                    </mt-cell>
                  </div>
							  </van-tab>
                <!-- :title="$t('m.tobeissued')" -->
							  <van-tab title="Pending">
						  	 <div  v-for="(items,index) in issuedata" @click="tokenDetail(items.id)">
                    <mt-cell :title="items.id +(items.nickname)" :label="items.body">
                       <img class="assets-icon"slot="icon" v-bind:src="'static/img/'+items.icon+'.png'"/>
                        <mt-button size="small" type="primary" class="fr" @click="tokenDetail(items.id)">{{$t('m.detail')}}</mt-button>
                    </mt-cell>
                  </div>
						  </van-tab>
						</van-tabs>
	        	</div>
	        </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <app-tabber :message=selected></app-tabber>
  </div>
</template>
<script>
import Tabber from './../../assets/pub/Tabber.vue'
import {mapActions, mapGetters,mapState} from 'vuex'
// 列表接口
import api from "@/api/token/Token.js"
export default {
  name: 'page-tabbar',
  data () {
    return {
      selected: 'explore',
      message: 'explore',
      issuedata:[]
    }
  },
  components: {
    'app-tabber': Tabber
  },
	creadte() {
		 	_this.$indicator.open({
	      text: '充值中....',
	      spinnerType: 'fading-circle'
			  })
			 //关闭加载
			_this.$indicator.close()
	},
  created(){
    setInterval(this.scroll,3000)
	},
	mounted(){
    this.list(0,'All')
	},
  methods:{
    // 展示全部列表
    list(){
      api.tokenList().then(res=>{
        this.issuedata = res.data
        // console.log(this.issuedata)
      }).catch(err=>{
        console.log(err)
      })
    },
      // async tokenList(index,title){
      //   let u = '/query?type=0'
      //   if(title != 'All'){
      //     u = u + "&state=" + title
      //   }
      //   const url=this.$backStage(u)
      //   const res = await this.$http.get(url)
      //   this.issuedata = res.data
      // },
      // 展示某一个详情
      async tokenDetail(id){
      const url=this.$backStage('/query?id='+id)
      const res = await this.$http.get(url)
      const data = res
      this.$router.push({
        name:'Detail',
      })
      this.$store.commit('detail', res.data[0])
    }
	}
 }
</script>
<style lang="scss">
	  @import '../../assets/scss/global'
</style>
