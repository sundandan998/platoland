<template>
  <div class="exchange">
    <div class="page-wrap">
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="home" class="home-index">
          <div class="home-header">
            <mt-header fixed  :title="$t('m.homepage')"></mt-header>
          </div>
          <div class="home-investment">
            <router-link :to="/detail/+pld.code">
              <img src="../../assets/images/gf.png" alt="" />
              <div class="home-investment-content">
                <div class="home-investment-top fl">
                  <img :src="pld.icon">
                  <!-- <img src="../../assets/images/icon-3.png" alt="" /> -->
                </div>
                <div class="home-investment-top-left">
                  <P>{{pld.code}} ({{pld.name}})<span>
                   <img :src="pldrelease.d_icon">{{pldrelease.issue_price}}</span></P>
                   <P>{{pld.subject}}</P>
                 </div>
                 <div class="home-investment-top-right fr">
                  <mt-button size="small">{{$t('m.investment')}}</mt-button>
                </div>
              </div>
              <div class="home-investment-bot">
                <span>{{$t('m.issueamount')}}:{{pldrelease.first_number}}</span>
                <span>{{$t('m.issue')}}:{{pldrelease.sold_number}}</span>
                <span>{{$t('m.completed')}}:{{pldrelease.id}}</span>
              </div>
              <div class="home-investment-progress">
                <mt-progress :value="20" :bar-height="5"></mt-progress>
              </div>
            </router-link>
          </div>
          <!--/总资产-->
          <!--公告-->
          <div class="home-land">
           <router-link to="news">
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
         <!-- @click="issue(items.code) -->
         <div class="assets-subscription" v-for="(items,index) in token_list">
          <router-link :to="/detail/+items.code">
           <img :src="items.icon">
           <div class="assets-subscription-text fr">
             <span class="home-name">{{items.code}} ({{items.name}})</span>
             <p>{{items.subject}}</p>
           </div>
           <div class="assets-subscription-title">
            <p :class="state[index]">{{items.release.status}}</p>
          </div>
          <div class="assets-subscription-information">
            <ul class="fl">
             <li>{{$t('m.issuetime')}}</li>
             <li>{{$t('m.issueamount')}}</li>
             <li>{{$t('m.initialprice')}}</li>
           </ul>
           <ul class="fr text-right">
             <li>{{items.release.publish_time}}</li>
             <li>{{items.release.sold_number}}</li>
             <li>{{items.release.init_price}}</li>
           </ul>
         </div>
       </router-link>
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
      versionCode:{
        version_code:'2.0',
      },
      animate:false,
      state: [
      "state0",
      "state1",
      "state2",
      "state1"
      ],
      pld:{},
      pldrelease:{},
      notice_list:{},
      token_list:{}
    }
  },
  creadte() {
    this.version(),
    this.version_code = this.$route.params
    this.$store.dispatch('detail')
    this.home()
    // JSON.stringify(status).replace(/0/g, '待发行')
  },
  mounted(){
    this.home()
  },
  components: {
    'app-tabber': Tabber
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
   // 首页展示数据
   home(){
    api.home().then(res=>{
      this.pld = res.data.pld
      this.pldrelease = res.data.pld.release
      this.notice_list = res.data.notice_list
      this.token_list = res.data.token_list
      this.token_list[0].release.status= '待发行'
      this.token_list[1].release.status= '发行中'
      this.token_list[2].release.status= '流通中'
    }).catch(err=>{
      console.log(err)
    })
  },
  ...mapActions('detail',[
   'app.detail'
   ]),
  //版本升级
  version(){
    api.version(this.$route.params)
    .then(res=>{
      const version =this.$version()
      this.$store.commit('version', res.data)
      if(parseFloat(version)> parseFloat(version)){
       let isForce = false
       if(data.force===0){
        isForce = true
      }
      this.upgrade(isForce)
    }
  }).catch(err=>{
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
}
}
}
</script>
<style lang="scss">
@import '../../assets/scss/global'
</style>
