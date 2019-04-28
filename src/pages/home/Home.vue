<template>
  <div class="exchange">
    <div class="page-wrap">     
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="home" class="home-index">
    		<div class="home-header">
		      <mt-header fixed title="首 页">
		          <mt-button slot="left"></mt-button>
		      </mt-header>
		    </div>
    		<router-link to="/pass">
				<div class="home-investment">
				<img src="../../assets/images/gf.png" alt="" />
				<div class="home-investment-content">
    			<div class="home-investment-top fl">
    				<img src="../../assets/images/icon-3.png" alt="" />
    			</div>
					<div class="home-investment-top-left">
						<ul>
						<li>{{this.plddata.name}}</li>
						<li><img src="../../assets/images/t.png"/> 0.02</li>
					</ul>
					</div>	
					<div class="home-investment-top-right fr">
						<router-link to="/buy">
							<mt-button size="small">立刻投资</mt-button>
						</router-link>
					</div>
					<p>{{this.plddata.Detail}}</p>
				</div>
				<div class="home-investment-bot">
					<ul>
						<li class="fl">发行总量:{{this.plddata.purnum}}</li>
						<li class="fl">已发行:{{this.plddata.num}}</li>
						<li class="fr">{{this.$store.state.app.detail}}</li>
					</ul>
				</div>
				<div class="home-investment-progress">
						<mt-progress :value="20" :bar-height="5"></mt-progress>
				</div>	    		
	    		</div>
	    	</router-link>
      		<!--/总资产-->
         	<!--land指数-->
         	<div class="home-land">
         		<router-link to="/news">
		         	<div class="notice">
		            <ul class="notice-list" ref="notice-list" :class="{anim:animate==true}">
		                <li v-for='item in items'>
		                	<img src="../../assets/images/horn.png"/>{{item.name}}
		                </li>
		            </ul>
		        	</div>
         		</router-link>
         	</div>
         	<!--/land指数-->
        	<!--资产认购-->
    		<div class="home-assets-subscription-title">
    			<ul>
	    			<li class="fl"><span>投资机会</span></li>
	    			<li class="fr">
	    				<router-link to="/explore">
	    					<p>全部 ></p>
	    				</router-link>
<!--	    				<img src="../../assets/images/more.png" alt="" />-->
	    			</li>
        	</ul> 
    		</div>    
    		<div class="home-assets-subscription-content">
					<div class="assets-subscription" v-for="(items,index) in issuedata" @click="issue(items.id)">
					<img src="../../assets/images/u345.png"/>
					<div class="assets-subscription-text fr">
							<span>{{items.id}}</span>
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
							<li>{{items.date}}</li>
							<li>{{items.issue}}</li>
							<li>{{items.hold}}</li>
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
	      	<img slot="icon" src="../../assets/images/explore-b.png"v-if="this.selected == 'merchant'">
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
		this.pld(),
		this.version(),
		this.listissue(),
		this.$store.dispatch('detail')
//	  console.group(this.$store.state.app.showFooter)
	},
  methods:{	
		//	  公告通知
    scroll(){
       this.animate=true
       setTimeout(()=>{ 
               this.items.push(this.items[0])
               this.items.shift()
               this.animate=false
       },500)
    },
	  async	pld(){
	   		const url=this.$backStage('/pldDetailsData')
	   		const res = await this.$http.get(url)
			 	const data = res.data
			 	this.plddata = res.data
	//		 	console.log(data)
	//		 	console.log(this.plddata)
	  },
	  async	listissue(){
				const url=this.$backStage('/query')
			 	const res = await this.$http.get(url)
			 	const data = res.data
			 	this.issuedata = res.data
//			 	console.log(this.issuedata)
//			 	console.log(this.issuedata[0].state)
		},
		async issue(id){
			const url=this.$backStage('/query?id='+id)
		 	const res = await this.$http.get(url)
			const data = res		
			this.$router.push({
				name:'Detail',
			})
			this.$store.commit('detail', res.data[0])
//			window.localStorage.setItem('data',JSON.stringify(this.datalist))
		},
		 ...mapActions('detail',[
	          'app.detail' 
	      ]),
//	   版本升级   
	  async version(){
	  	const url=this.$backStage('/version')
		 	const res = await this.$http.get(url)
		 	const data = res.data
//		 	console.log(data.version)
//			console.log(this.$version)
		 	const version =this.$version()
		 	if(parseFloat(data.version)< parseFloat(version)){
		 		this.versionbox()
		 		if(parseFloat(data.force)===1){
		 				this.forceversion()
		 		}
		 	}
	  },
//	  版本弹框
	  versionbox(){
			this.$messagebox.confirm("<div><span>新版本特性:</span><p>1.xxxxxx</p></div>")
			.then(action => {
			})
		},
		forceversion(){
			this.$messagebox.confirm("<div><span>新版本特性:</span>强制升级</div>")
			.then(action => {
			})
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