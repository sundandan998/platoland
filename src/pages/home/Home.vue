<template>
  <div class="exchange">
    <div class="page-wrap">
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="home" class="home-index">
          <div class="home-header">
            <mt-header fixed :title="$t('m.homepage')"></mt-header>
          </div>
          <div class="home-investment">
            <router-link :to="/detail/+pld.code">
              <div class="pld-img"><img :src="pld.icon" alt="" /></div>
              <div class="home-investment-content">
                <div class="home-investment-top fl">
                </div>
                <div class="home-investment-top-left">
                  <P>{{pld.code}} ({{pld.nickname}})<span>
                      <img :src="pldRelease.d_icon"><span
                        class="issue-price">{{pldRelease.issue_price|number}}</span></span></P>
                  <P>{{pld.subject}}</P>
                </div>
                <div class="home-investment-top-right fr">
                  <mt-button size="small">{{$t('m.investment')}}</mt-button>
                </div>
              </div>
              <div class="home-investment-bot">
                <span>{{$t('m.issueamount')}}:{{parseInt(pldRelease.first_number)}}</span>
                <span>已售数量:{{parseInt(pldRelease.sold_number)}}</span>
                <span>已达成:{{(pldRelease.sold_number/pldRelease.first_number*100).toFixed(3)}}%</span>
              </div>
              <div class="home-investment-progress">
                <mt-progress :value="pldRelease.sold_number/pldRelease.first_number*100" :bar-height="5"></mt-progress>
              </div>
            </router-link>
          </div>
          <!--/总资产-->
          <!--公告-->
          <div class="home-land">
            <router-link to="news">
              <div class="notice text-beyond">
                <div class="notice-list text-beyond" ref="notice-list" :class="{anim:animate==true}"
                  v-for='item in notice'>
                  <img src="../../assets/images/horn.png" /><span> {{item.title}}</span>
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
            <div class="assets-subscription" v-for="items in tokens_list">
              <div @click="handleJump(items.code)">
                <div class="home-card-title">
                  <div class="fl">
                    <img :src="items.icon">
                  </div>
                  <div class=" home-card-title-subject fr">
                    <span>{{items.code}} ({{items.nickname}})</span>
                    <span class="home-subject">{{items.subject}}</span>
                  </div>
                </div>
                <div class="assets-subscription-title">
                  <p :style="{color:items.release.status == 0?'red':items.release.status == 1?'green':'blue'}">
                    {{items.release.status == 0?'待发行':items.release.status == 1?'发行中':'流通中'}}</p>
                </div>
                <div class="assets-subscription-information">
                  <ul>
                    <li class="childFlex"><span>{{$t('m.issuetime')}}</span><span>{{items.release.publish_time}}</span>
                    </li>
                    <li class="childFlex">
                      <span>{{$t('m.issueamount')}}</span><span>{{(parseInt(items.release.sold_number)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}}</span>
                    </li>
                    <li class="childFlex">
                      <span>{{$t('m.initialprice')}}</span><span>{{items.release.init_price|number}}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- </router-link> -->
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
  import { mapActions } from 'vuex'
  // import detail from './detail/Detail'
  import store from './../../store/modules/app.js'
  import { toast } from '@/assets/js/pub.js'
  // 接口
  import api from "@/api/system/System.js"
  export default {
    data() {
      return {
        selected: 'home',
        message: 'home',
        versionData: '',
        animate: false,
        pld: {},
        pldRelease: {},
        notice: {},
        tokens_list: [],
        listRelease: {}
      }
    },
    components: {
			'app-tabber': Tabber
		},
    created() {
      this.info()
      this.home()
      // this.version(),
      // this.version_code = this.$route.params
      this.version()
    },
    methods: {
      //公告通知
      scroll() {
        this.animate = true
        setTimeout(() => {
          this.notice_list.push(this.notice_list)
          this.notice_list.shift()
          this.animate = false
        }, 500)
      },
      // 用户信息
      info() {
        api.getUserInfo().then(res => {
          this.infoData = res.data
          window.sessionStorage.setItem('pay_pwd_active', this.infoData.pay_pwd_active)
        }).catch(err => {
          // console.log(err)
        })
      },
      home() {
        api.home().then(res => {
          //  pld接口
          this.pld = res.data.pld
          this.pldRelease = this.pld.release
          //  公告通知
          this.notice = res.data.notice_list
          // 卡片
          this.tokens_list = res.data.token_list
        }).catch(err => {
          console.log(err)
        })
      },
      ...mapActions('detail', [
        'app.detail'
      ]),
      handleJump(id) {
        this.$router.push('/detail/' + id)
      },
      //版本升级
      version() {
        let vcode = this.$version()
        api.version({ 'version_code': vcode }).then(res => {
          if (res.code == 0) {
            this.versionData = res
            if(this.versionData.is_update == false) return
            if (this.versionData.is_force_update == true) {
              this.$messagebox({
                title: '版本升级',
                message: this.versionData.version_info,
                closeOnClickModal: false,
                // cancelButtonText: '否',
                confirmButtonText: '去更新',
                // showCancelButton: true
              }).then(action => {
                // console.log(this.versionData.update_url)
                if (window.plus) {
                  plus.runtime.openURL(this.versionData.update_url)
                  plus.runtime.quit()
                  // console.log(this.versionData.update_url)
                }
              })
            } else {
              
                // isForce = true
                // this.versionData = res
                this.$messagebox({
                  title: '版本升级',
                  message: this.versionData.version_info,
                  cancelButtonText: '否',
                  confirmButtonText: '是',
                  showCancelButton: true
                }).then(action => {
                  if (action === 'confirm') {
                    if (window.plus) {
                      // console.log(this.versionData.update_url)
                      plus.runtime.openURL(this.versionData.update_url)
                      plus.runtime.quit()
                    }
                  }
                })
             
            }
          }
        })
      }
    }
  }

</script>
<style lang="scss">
  @import '../../assets/scss/global';

  .home-investment {
    .pld-img {
      position: relative;
      left: 15px;
      top: 25px;
      width: 10%;
    }
  }

  .home-investment-top-left {
    .issue-price {
      position: relative;
      top: -7px;
      left: -10px;
    }
  }

  .home-investment-bot {
    height: 30px;
    width: 100%;
    margin-left: 15px;
    display: flex;
  }

  .home-investment-content {
    margin-top: -20px;
    margin-left: 50px;
    height: 50px;
    width: 85%;
  }

  /* 卡片部分 */
  .childFlex {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
  }

  .home-investment-bot {
    height: 30px;
    width: 100%;
    margin-left: 15px;
  }

  .home-card-title {
    height: 40px;
  }

  .home-card-title-subject {
    text-align: right;
    margin-right: 5px;
  }

  .home-subject {
    display: block;
    width: 80%;
    word-break: normal;
    white-space: pre-wrap;
    overflow: hidden
  }
</style>