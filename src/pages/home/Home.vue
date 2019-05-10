<template>
  <div class="exchange">
    <div class="page-wrap">
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="home" class="home-index">
<<<<<<< HEAD
        <div class="home-header">
          <mt-header fixed title="首 页">
              <mt-button slot="left"></mt-button>
          </mt-header>
        </div>
        <div class="home-investment" @click="issue('PLD')">
        <img src="../../assets/images/gf.png" alt="" />
        <div class="home-investment-content">
          <div class="home-investment-top fl">
            <img src="../../assets/images/icon-3.png" alt="" />
          </div>
          <div class="home-investment-top-left">
            <P>{{this.plddata.name}} <span><img src="../../assets/images/t.png"/> {{this.plddata.issueprice}}</span></P>
            <P>{{this.plddata.nickname}}</P>
          </div>
          <div class="home-investment-top-right fr">
              <mt-button size="small" @click="issue('PLD')">立刻投资</mt-button>
          </div>
          <!-- <p>{{this.plddata.Detail}}</p> -->
        </div>
        <div class="home-investment-bot">
          <span>发行总量:{{this.plddata.amountnum}}</span>
          <span>已发行:{{this.plddata.soldnum}}</span>
          <span>已达成:{{this.plddata.proportion}}</span>
        </div>
        <div class="home-investment-progress">
            <mt-progress :value="20" :bar-height="5"></mt-progress>
        </div>
        </div>
          <!--/总资产-->
          <!--land指数-->
          <div class="home-land">
            <router-link to="/news">
              <div class="notice">
=======
    		<div class="home-header">
		      <mt-header fixed title="首 页">
		          <mt-button slot="left"></mt-button>
		      </mt-header>
		    </div>
				<div class="home-investment" @click="issue('PLD')">
				<img src="../../assets/images/gf.png" alt="" />
				<div class="home-investment-content">
    			<div class="home-investment-top fl">
    				<img src="../../assets/images/icon-3.png" alt="" />
    			</div>
					<div class="home-investment-top-left">
						<ul>
						<li>{{this.plddata.name}}</li>
						<li><img src="../../assets/images/t.png"/> {{this.plddata.issueprice}}</li>
					</ul>
					</div>
					<div class="home-investment-top-right fr">
							<mt-button size="small" @click="issue('PLD')">立刻投资</mt-button>
					</div>
					<p>{{this.plddata.Detail}}</p>
				</div>
				<div class="home-investment-bot">
          <span>发行总量:{{this.plddata.amountnum}}</span>
          <span>已发行:{{this.plddata.soldnum}}</span>
			<!-- 		<ul>
						<li class="fl"></li>
						<li class="fl"></li>
					</ul> -->
				</div>
				<div class="home-investment-progress">
						<mt-progress :value="20" :bar-height="5"></mt-progress>
				</div>
	    	</div>
      		<!--/总资产-->
         	<!--land指数-->
         	<div class="home-land">
         		<router-link to="/news">
		         	<div class="notice">
>>>>>>> 621e17511108618c9d45f957e7381e24ac319adf
                <div class="notice-list" ref="notice-list" :class="{anim:animate==true}" v-for='item in items'>
                  <img src="../../assets/images/horn.png"/>{{item.name}}
                </div>
              </div>
            </router-link>
          </div>
          <!--/land指数-->
          <!--资产认购-->
        <div class="home-assets-subscription-title">
          <mt-cell title="投资机会" to="/explore" is-link value="全部"> </mt-cell>
        </div>
        <div class="home-assets-subscription-content">
          <div class="assets-subscription" v-for="(items,index) in issuedata" @click="issue(items.id)">
          <img src="../../assets/images/u345.png"/>
          <div class="assets-subscription-text fr">
              <span class="home-name">{{items.id}}</span>
          </div>
          <div class="assets-subscription-title">
            <p>{{items.state}}</p>
          </div>
          <div class="assets-subscription-information">
            <ul class="fl">
              <li>发行时间</li>
              <li>发行总量</li>
              <li>初始价格</li>
            </ul>
            <ul class="fr">
              <li>{{items.issuetime}}</li>
              <li>{{items.amountnum}}</li>
              <li>{{items.initialprice}}</li>
            </ul>
          </div>
        </div>
        </div>
        <div class="home-assets-more">
          <span>更多功能,即将上线</span>
        </div>
          <!--/资产认购-->
        </mt-tab-container-item>

      </mt-tab-container>
    </div>
    <mt-tabbar v-model="message" fixed>
      <mt-tab-item id="home">
        <img slot="icon" src="../../assets/images/home-b.png" v-if="this.selected == 'home'">
        <img slot="icon" src="../../assets/images/home.png" v-else>
        首页
      </mt-tab-item>
        <mt-tab-item id="explore">
          <img slot="icon" src="../../assets/images/explore-b.png" v-if="this.selected == 'explore'">
          <img slot="icon" src="../../assets/images/explore.png"v-else>
          探索
        </mt-tab-item>
      <mt-tab-item id="mine" >
        <img slot="icon" src="../../assets/images/mine-b.png" v-if="this.selected == 'mine'">
      <img slot="icon" src="../../assets/images/mine.png"v-else>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
import detail from './detail/Detail'
import store from './../../store/modules/app.js'
export default {
  name: 'page-tabbar',
  data () {
    return {
      selected: 'home',
      message:this.selected,
      plddata:[],
      data:[],
      issuedata:[],
      datalist:[],
      animate:false,
      items:[
          {name:"PLATOLAND生态获区块链协会创新应用大奖！1"},
          {name:"PLATOLAND生态获区块链协会创新应用大奖！2"},
          {name:"PLATOLAND生态获区块链协会创新应用大奖！3"}
      ]
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
  mounted () {
    this.version(),
    this.listissue(),
    this.$store.dispatch('detail')
//    console.group(this.$store.state.app.showFooter)
  },
  methods:{
    //    公告通知
    scroll(){
       this.animate=true
       setTimeout(()=>{
               this.items.push(this.items[0])
               this.items.shift()
               this.animate=false
       },500)
    },
<<<<<<< HEAD
//    首页/发行中/待发行/沟通中渲染页面数据
    async listissue(){
        const url=this.$backStage('/query?type=0')
        const res = await this.$http.get(url)
        this.issuedata = res.data
        this.plddata = res.data[3]
    },
//    点击跳转通证详情接口
    async issue(id){
      const url=this.$backStage('/query?id='+id)
      const res = await this.$http.get(url)
      const data = res
      this.$router.push({
        name:'Detail',
      })
      this.$store.commit('detail', res.data[0])
    },
//     ...mapActions('detail',[
//            'app.detail'
//        ]),
//     版本升级
    async version(){
      const url=this.$backStage('/versionnum')
      const res = await this.$http.get(url)
      const data = res.data
      const version =this.$version()
      this.$store.commit('version', res.data)
      if(parseFloat(data.version)> parseFloat(version)){
        let isForce = false
        if(data.force===0){
          isForce = true
        }
        this.upgrade(isForce)
      }
    },

    upgrade(isShow){
       this.$messagebox.confirm('', {
         closeOnClickModal:false,
         showCancelButton:isShow,
         message:"<div><p> 1.修复部分BUG</p><p>2.优化体验</p></div>",
         title: '新版本提醒', 
         confirmButtonText: '升级', 
         cancelButtonText: '取消' 
         }).then(action => {
=======
//	  首页/发行中/待发行/沟通中渲染页面数据
	  async	listissue(){
				const url=this.$backStage('/query?type=0')
			 	const res = await this.$http.get(url)
			 	this.issuedata = res.data
      this.plddata = res.data[3]
//			 	console.log(this.issuedata)
//			 	console.log(this.issuedata[0].state)
		},
//		点击跳转通证详情接口
		async issue(id){
			const url=this.$backStage('/query?id='+id)
		 	const res = await this.$http.get(url)
			const data = res
			this.$router.push({
				name:'Detail',
			})
			this.$store.commit('detail', res.data[0])
		},
//		 ...mapActions('detail',[
//	          'app.detail'
//	      ]),
//	   版本升级
	  async version(){
	  	const url=this.$backStage('/versionnum')
		 	const res = await this.$http.get(url)
		 	const data = res.data
		 	const version =this.$version()
		 	this.$store.commit('version', res.data)
		 	if(parseFloat(data.version)> parseFloat(version)){
		 		let isForce = false
		 		if(data.force===0){
          isForce = true
		 		}
		 		this.upgrade(isForce)
		 	}
	  },

		upgrade(isShow){
			 this.$messagebox.confirm('', {
         closeOnClickModal:false,
         showCancelButton:isShow,
				 message:"<div><p> 1.修复部分BUG</p><p>2.优化体验</p></div>",
				 title: '新版本提醒', 
				 confirmButtonText: '升级', 
				 cancelButtonText: '取消' 
				 }).then(action => {
>>>>>>> 621e17511108618c9d45f957e7381e24ac319adf
         if (window.plus) {
         plus.runtime.openURL('http://www.platoland.com/downloads/pld-latest.apk');
         plus.runtime.quit();
         }},cancel => {})
<<<<<<< HEAD
    }
  },
  watch: {
      message: function (val, oldVal) {
=======
		}
	},
	watch: {
	    message: function (val, oldVal) {
>>>>>>> 621e17511108618c9d45f957e7381e24ac319adf
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
