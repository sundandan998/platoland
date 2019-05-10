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
	        		<van-tabs @click="tokenList">
							  <van-tab :title="$t('m.whole')" >
                  <div  v-for="(items,index) in issuedata" @click="tokenDetail(items.id)">
                    <mt-cell :title="items.id" :label="items.body">
                      <img slot="icon" src="../../assets/images/u345.png" width="24" height="24">
                        <mt-button size="small" type="primary" class="fr" @click="tokenDetail(items.id)">{{$t('m.detail')}}</mt-button>
                    </mt-cell>
                  </div>
							  </van-tab>
							  <van-tab :title="$t('m.incirculation')">
                  <div  v-for="(items,index) in issuedata" @click="tokenDetail(items.id)">
                    <mt-cell :title="items.id" :label="items.body">
                      <img slot="icon" src="../../assets/images/u345.png" width="24" height="24">
                        <mt-button size="small" type="primary" class="fr" @click="tokenDetail(items.id)">{{$t('m.detail')}}</mt-button>
                    </mt-cell>
                  </div>

							  </van-tab>
							  <van-tab :title="$t('m.inissue')">
							   <div  v-for="(items,index) in issuedata" @click="tokenDetail(items.id)">
                    <mt-cell :title="items.id" :label="items.body">
                      <img slot="icon" src="../../assets/images/u345.png" width="24" height="24">
                        <mt-button size="small" type="primary" class="fr" @click="tokenDetail(items.id)">{{$t('m.detail')}}</mt-button>
                    </mt-cell>
                  </div>
							  </van-tab>
							  <van-tab :title="$t('m.tobeissued')">
						  	 <div  v-for="(items,index) in issuedata" @click="tokenDetail(items.id)">
                    <mt-cell :title="items.id" :label="items.body">
                      <img slot="icon" src="../../assets/images/u345.png" width="24" height="24">
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
    <mt-tabbar v-model="message" fixed>
      <mt-tab-item id="home">
      	<img slot="icon" src="../../assets/images/home-b.png" v-if="this.selected == 'home'">
      	<img slot="icon" src="../../assets/images/home.png" v-else>
      	{{$t('m.homepage')}}
      </mt-tab-item>
	      <mt-tab-item id="explore">
	      	<img slot="icon" src="../../assets/images/explore-b.png"v-if="this.selected == 'explore'">
	      	<img slot="icon" src="../../assets/images/explore.png"v-else>
	      	{{$t('m.explore')}}
	      </mt-tab-item>
      <mt-tab-item id="mine" >
      	<img slot="icon" src="../../assets/images/mine-b.png" v-if="this.selected == 'mine'">
    	<img slot="icon" src="../../assets/images/mine.png"v-else>
      	{{$t('m.mine')}}
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import {mapActions, mapGetters,mapState} from 'vuex'
export default {
  name: 'page-tabbar',
  data () {
    return {
      selected: 'explore',
			message:this.selected,
      issuedata:[]
    }
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
    this.tokenList(0,'全部')
	},
  methods:{
    // 展示全部列表
      async tokenList(index,title){
        let u = '/query?type=0'
        if(title != '全部'){
          u = u + "&state=" + title
        }
        const url=this.$backStage(u)
        const res = await this.$http.get(url)
        this.issuedata = res.data
      },
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
	},
	watch: {
	    message: function (val, oldVal) {
        // 这里就可以通过 val 的值变更来确定去向
        switch(val){
            case 'home':
                this.$router.push('/')
            break;
            case 'explore':
                this.$router.push('/explore')
            break;
            case 'mine':
                this.$router.push('/mine')
            break;
	        }
	    }
    }
 }
</script>
<style lang="scss">
	  @import '../../assets/scss/global'
</style>
