<template>
  <div class="exchange">
    <div class="page-wrap">
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="home" class="home-index">
          <div class="home-header">
            <mt-header fixed  :title="$t('m.homepage')"></mt-header>
          </div>
          <div class="home-investment" @click="issue('PLD')">
            <img src="../../assets/images/gf.png" alt="" />
            <div class="home-investment-content">
              <div class="home-investment-top fl">
                <img src="../../assets/images/icon-3.png" alt="" />
              </div>
              <div class="home-investment-top-left">
                <P>{{this.plddata.code}} {{this.plddata.name}}<span><img src="../../assets/images/t.png"/>{{this.pld.issue_price}}</span></P>
                <P>{{this.plddata.subject}}</P>
              </div>
              <div class="home-investment-top-right fr">
                <mt-button size="small" @click="issue('PLD')">{{$t('m.investment')}}</mt-button>
              </div>
              <!-- <p>{{this.plddata.Detail}}</p> -->
            </div>
            <div class="home-investment-bot">
              <span>{{$t('m.issueamount')}}:{{this.pld.first_number}}</span>
              <span>{{$t('m.issue')}}:{{this.pld.sold_number}}</span>
              <span>{{$t('m.completed')}}:{{this.plddata.proportion}}</span>
            </div>
            <div class="home-investment-progress">
              <mt-progress :value="20" :bar-height="5"></mt-progress>
            </div>
          </div>
          <!--/总资产-->
          <!--公告-->
          <div class="home-land">
           <router-link to="/news">
            <div class="notice text-beyond">
              <div class="notice-list text-beyond" ref="notice-list" :class="{anim:animate==true}" v-for='(item,index) in notice_list'>
                <img src="../../assets/images/horn.png"/><span> {{item.title}}</span>
              </div>
            </div>
          </router-link>
        </div>
        <!-- 全部 -->
        <div class="home-assets-subscription-title">
          <mt-cell :title="$t('m.opportunity')" to="/explore" is-link :value="$t('m.whole')"> </mt-cell>
        </div>
        <!-- 卡片部分 -->
        <div class="home-assets-subscription-content">
         <div class="assets-subscription" v-for="(items,index) in token_list" @click="issue(items.id)">
           <!-- <img src="../../assets/images/u345.png" /> -->
           <img v-bind:src="'static/img/'+items.icon+'.png'"/>
           <div class="assets-subscription-text fr">
             <span class="home-name">{{items.code}}{{items.name}}</span>
             <p>{{items.subject}}</p>
           </div>
           <div class="assets-subscription-title">
            <p :class="state[index]">{{items.state}}</p>
          </div>
          <div class="assets-subscription-information">
            <ul class="fl">
             <li>{{$t('m.issuetime')}}</li>
             <li>{{$t('m.issueamount')}}</li>
             <li>{{$t('m.initialprice')}}</li>
           </ul>
           <ul class="fr text-right">
             <li>{{items.issuetime}}</li>
             <li>{{items.amountnum}}</li>
             <li>{{items.initialprice}}</li>
           </ul>
         </div>
       </div>
     </div>
     <div class="home-assets-more">
       <span>{{$t('m.morefunctions')}}</span>
     </div>
   </mt-tab-container-item>
 </mt-tab-container>
</div>
<app-tabber :message=selected></app-tabber>
</div>
</template>
<script>
import Tabber from './../../assets/pub/Tabber.vue'
import {mapActions} from 'vuex'
import detail from './detail/Detail'
import store from './../../store/modules/app.js'
// 接口
import api from "@/api/system/System.js"
export default {
  data () {
    return {
      selected:'home',
      message: 'home',
      plddata:[],
      data:[],
      versionCode:{
        version_code:'2.0',
      },
			// homedata:[],
      issuedata:[],
      datalist:[],
      animate:false,
      state: [
      "state0",
      "state1",
      "state2",
      "state1"
      ],
      notice_list:[],
      token_list:[]
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
       setInterval(this.scroll,3000)
     },
     mounted () {
      this.version(),
		// this.listissue(),
    this.pld(),
    this.$store.dispatch('detail')
//	  console.group(this.$store.state.app.showFooter)
},
methods:{
		//	  公告通知
    scroll(){
     this.animate=true
     setTimeout(()=>{
       this.notice_list.push(this.notice_list)
       this.notice_list.shift()
       this.animate=false
     },500)
   },
//	  首页/发行中/待发行/沟通中渲染页面数据
issue(id){
 console.log(id)
 api.home().then(res=>{
  this.issuedata = res.data
  this.$router.push('/detail/'+id)
  this.$store.commit('detail', res.data)
        // console.log(this.plddata)
      }).catch(err=>{
        console.log(err)
      })
    },
    pld(){
      api.home().then(res=>{
        this.issuedata = res.data
        this.plddata = res.data.pld
        this.pld = res.data.pld.release
        this.notice_list = res.data.notice_list
        this.token_list = res.data.token_list
        // this.$router.push('/detail')
        // console.log(this.notice_list.title)
      }).catch(err=>{
        console.log(err)
      })
    },
// 	  async	listissue(){
// 		  const url=this.$backStage('/query?type=0')
// 			const res = await this.$http.get(url)
// 			this.issuedata = res.data
//       // console.log(this.issuedata[0].name)

//       this.plddata = res.data[3]
// //			 	console.log(this.issuedata[0].state)
// 		},
    // 点击跳转通证详情接口
    //
		// async issue(id){
		// 	// const url=this.$backStage('/query?id='+id)
  //     const url=this.$backStage('/query?id='+id)
		//  	const res = await this.$http.get(url)
		// 	const data = res
		// 	this.$router.push({
		// 		name:'Detail',
		// 	})
		// 	this.$store.commit('detail', res.data[0])
		// },
   ...mapActions('detail',[
     'app.detail'
     ]),
//	 版本升级
version(){
  api.version(this.versionCode)
  .then(res=>{
    const version =this.$version()
    this.$store.commit('version', res.data)
                  // data.version
                  if(parseFloat(version)> parseFloat(version)){
                   let isForce = false
                   if(data.force===0){
                    isForce = true
                  }
                  this.upgrade(isForce)
                }
              })
  .catch(err=>{
    console.log(err)
  })
},
upgrade(isShow){
  this.$messagebox.confirm('', {
   closeOnClickModal:false,
   showCancelButton:isShow,
    message:"<div><p> 1.Repair part of BUG</p><p>2.Optimization experience</p></div>",
    title: 'New Edition Reminder', 
    confirmButtonText: 'Upgrade', 
    cancelButtonText: 'Cancel' 
  }).then(action => {
   if (window.plus) {
     plus.runtime.openURL('http://www.platoland.com/downloads/pld-latest.apk')
     plus.runtime.quit();
   }},cancel => {})
},
    // 公告通知
    // notice(){
    //   api.notice().then(res=>{
    //     this.notice_list = res.data
    //     // console.log(this.notice_list[0].title)
    //   }).catch(err=>{
    //     console.log(err)
    //   })
    // }
  }
}
</script>
<style lang="scss">
@import '../../assets/scss/global'
</style>
