<template>
  <div class="exchange">
    <div class="page-wrap">     
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="home" class="home-index">
    		<div class="home-logo">
    			<img src="../assets/images/logo.png"/>
    		</div>
    		<router-link to="/pass">
					<div class="home-investment">
	    			<img src="../assets/images/gf.png" alt="" />
	    			<div class="home-investment-content">
		    			<div class="home-investment-top fl">
		    					<img src="../assets/images/icon-3.png" alt="" />
		    			</div>
							<div class="home-investment-top-left">
								<ul>
	    						<li>PLD (捞豆)</li>
	    						<li><img src="../assets/images/t.png"/> 0.02</li>
	    					</ul>
							</div>	
							<div class="home-investment-top-right fr">
								<router-link to="/buy">
									<mt-button size="small">立刻投资</mt-button>
								</router-link>
							</div>
							<p>PLATOLAND集团</p>
						</div>
	    			<div class="home-investment-bot">
	    				<ul>
	    					<li class="fl">发行总量:{{this.$store.state.app.showFooter}}</li>
	    					<li class="fl">已发行:20000</li>
	    					<li class="fr">已达成30%</li>
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
		                	<img src="../assets/images/horn.png"/>{{item.name}}
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
	        				<router-link to="/list">
	        					<span>全部</span>
	        				</router-link>
	        				<img src="../assets/images/more.png" alt="" /></li>
	        	</ul> 
	    		</div>    
	    		<div class="home-assets-subscription-content">
	    			<router-link to="/issue">
	    				<div class="assets-subscription">
	    						<img src="../assets/images/u345.png"/>
	    						<div class="assets-subscription-text fr">
	    								<span>WHZ(网红站)</span>
										<p>丽人美妆工作室</p>
	    						</div>
								<div class="assets-subscription-title">
									<p>待发行</p>
								</div>
								<div class="assets-subscription-information">
									<ul class="fl">
										<li>发行时间</li>
										<li>发行总量</li>
										<li>初始价格</li>
									</ul>
									<ul class="fr" v-for="(items,index) in datalist" v-if="index==0">
										<li>{{items.remarks}}</li>
										<li>{{items.issue}}</li>
										<li>{{items.hold}}</li>
									</ul>
								</div>
	    				</div>
	    			</router-link>
	    			<router-link to="/details">
	    				<div class="assets-subscription">
	    					  <img src="../assets/images/u365.png"/>
	    						<div class="assets-subscription-text fr">
	    								<span>WHZ(网红站)</span>
										<p>丽人美妆工作室</p>
	    						</div>
								<div class="assets-subscription-title">
									<p>发行中</p>
								</div>
								<div class="assets-subscription-information">
									<ul class="fl">
										<li>发行时间</li>
										<li>发行总量</li>
										<li>初始价格</li>
									</ul>
									<ul class="fr" v-for="(items,index) in datalist"v-if="index==1">
										<li>{{items.remarks}}</li>
										<li>{{items.issue}}</li>
										<li>{{items.hold}}</li>
									</ul>
								</div>
	    				</div>
	    			</router-link>
	    			<router-link to="/pass">
	    				<div class="assets-subscription">  						
	    					<img src="../assets/images/ld.png"/>
	    						<div class="assets-subscription-text fr">
	    								<span>WHZ(网红站)</span>
										<p>丽人美妆工作室</p>
	    						</div>
								<div class="assets-subscription-title">
									<p>流通中</p>
								</div>
								<div class="assets-subscription-information" >									
									<ul class="fl">
										<li>发行时间</li>
										<li>发行总量</li>
										<li>初始价格</li>
									</ul>
									<ul class="fr" v-for="(items,index) in datalist" v-if="index==2">
										<li >{{items.remarks}}</li>
										<li>{{items.issue}}</li>
										<li>{{items.hold}}</li>
									</ul>
								</div>
	    				</div>
	    			</router-link>    			
	    		</div>
	    		<div class="home-assets-more">
	    			<span>更多功能,即将上线</span>
	    		</div>
         	<!--/资产认购-->
        </mt-tab-container-item>
        <mt-tab-container-item id="explore">
        	<div class="explore">
	        	<div class="explore-header">
							<mt-header title="探索"></mt-header>
	        	</div>
	        	<div class="explore-navbar">
	        		<van-tabs>
							  <van-tab title="全部">
							  	<ul  class="certificate-list-card">
										<li>
											<img src="../assets/images/u345.png" alt="" class="fl" />
											<span>PLD (PLD)</span>
											<span>PLATOLAND集团</span>
											<mt-button size="small" type="primary" class="fr">详情</mt-button>
										</li>
										<li>
											<img src="../assets/images/u345.png" alt="" class="fl" />
											<span>PLD (PLD)</span>
											<span>PLATOLAND集团</span>
											<mt-button size="small" type="primary" class="fr">详情</mt-button>
										</li>
									</ul>
							  </van-tab>
							  <van-tab title="流通中">
							  	<ul  class="certificate-list-card">
								  	<router-link to="/pass">
											<li>
												<img src="../assets/images/u345.png" alt="" class="fl" />
												<span>PLD (PLD)</span>
												<span>PLATOLAND集团</span>
												<mt-button size="small" type="primary" class="fr">详情</mt-button>
											</li>
										</router-link>
									</ul>
							  </van-tab>
							  <van-tab title="发行中">
							  	<ul  class="certificate-list-card">
								  	<router-link to="/details">
											<li>
												<img src="../assets/images/u345.png" alt="" class="fl" />
												<span>PLD (PLD)</span>
												<span>PLATOLAND集团</span>
												<mt-button size="small" type="primary" class="fr">详情</mt-button>
											</li>
										</router-link>
									</ul>
							  </van-tab>
							  <van-tab title="待发行">
							  	 	<ul  class="certificate-list-card">
									  	<router-link to="/issue">
												<li	>
													<img src="../assets/images/u345.png" alt="" class="fl" />
													<span>PLD (PLD)</span>
													<span>PLATOLAND集团</span>
													<mt-button size="small" type="primary" class="fr">详情</mt-button>
												</li>
											</router-link>
										</ul>
							  </van-tab>
						</van-tabs>
	        	</div>
	        </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="mine"  class="home-index">
        	<div class="mine-head">
        		<div class="mine-head-portrait">
							<img src="../assets/images/u2496.png" alt="" />
        			<p>dmk@qq.com</p>
        		</div>   
        	</div>
        	<div class="mine-cell">
        		<mt-cell title="资产" to="assets" is-link class="mine-cell-list">
        			 <img slot="icon" src="../assets/images/assets.png">
        		</mt-cell>
        		<mt-cell title="安全" to="safety"is-link class="mine-cell-list">
        			<img slot="icon" src="../assets/images/safety.png" alt="" />
        		</mt-cell>
        		<mt-cell title="地址簿" to="book"is-link class="mine-cell-list">
        				<img slot="icon" src="../assets/images/book.png">
        		</mt-cell>
        		<mt-cell title="关于我们" to="about"is-link class="mine-cell-list">
        			<img slot="icon" src="../assets/images/our.png" alt="" />
        		</mt-cell>
        	</div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="home" @click ="home">
      	<img slot="icon" src="../assets/images/home-b.png" v-if="this.selected == 'home'"> 
      	<img slot="icon" src="../assets/images/home.png" v-else> 
      	首页
      </mt-tab-item>
      <mt-tab-item id="explore" @click ="merchant">
      	<img slot="icon" src="../assets/images/explore-b.png"v-if="this.selected == 'merchant'">
      	<img slot="icon" src="../assets/images/explore.png"v-else>
      	探索
      </mt-tab-item>
      <mt-tab-item id="mine" @click ="mine">
      	<img slot="icon" src="../assets/images/mine-b.png" v-if="this.selected == 'mine'">     	
    	<img slot="icon" src="../assets/images/mine.png"v-else>   
      	我的
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
      selected: 'home',
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
	  this.selected	 = this.$router.name
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
	mounted: function () {
	this.showdata()
//	  console.group(this.$store.state.app.showFooter)
	},
  methods:{	
		home () {
	  		if(this.$router.name !== home){
	  			this.$router.push({
	  				name:'home'
	  			})
	  		}
	  	},
		merchant(){
			if(this.$router.name !== merchant){
				this.$router.push({
					name: 'merchant'
				})
			}
		},
		mine(){
			if(this.$router.name !== mine){
				this.$router.push({
					name: 'mine'
				})
			}
		},
	async showdata(){
			const res = await this.$http.get('/api/formData')
			this.datalist = res.data.data
			window.localStorage.setItem('data',JSON.stringify(this.datalist))
//			console.log(this.datalist[1].remarks)
		},
		//	  公告通知
    scroll(){
       this.animate=true
       setTimeout(()=>{ 
               this.items.push(this.items[0])
               this.items.shift()
               this.animate=false
       },500)
    }
  }
//	computed:{
//			...mapGetters([
//		      'app.isShow'
//		    ])
//		}
}
</script>
<style lang="scss">
	  @import '../assets/scss/global';
</style>
