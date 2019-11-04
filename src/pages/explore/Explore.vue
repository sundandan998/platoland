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
              <van-tabs @click="index">
                <!-- :title="$t('m.whole')" -->
                <van-tab title="全部">
                  <div v-for="(items,index) in issuedata">
                    <router-link :to="/detail/+ items.code">
                      <!-- <router-link :to="{name:'Detail',params:{code:items.code,id:'explore'}}"> -->
                      <mt-cell :title="items.code +'('+items.nickname+')'" :label="items.subject">
                        <img class="assets-icon" slot="icon" :src="items.icon">
                        <mt-button size="small" type="primary" class="fr">{{$t('m.detail')}}</mt-button>
                      </mt-cell>
                    </router-link>
                  </div>
                </van-tab>
                <!-- :title="$t('m.incirculation')" -->
                <van-tab title="流通中">
                  <div v-for="(items,index) in issuedata">
                    <router-link :to="/detail/+ items.code">
                      <!-- <router-link :to="{name:'Detail',params:{code:items.code,id:'explore'}}"> -->
                      <mt-cell :title="items.code +'('+items.nickname+')'" :label="items.subject">
                        <img class="assets-icon" slot="icon" :src="items.icon">
                        <mt-button size="small" type="primary" class="fr">{{$t('m.detail')}}</mt-button>
                      </mt-cell>
                    </router-link>
                  </div>
                </van-tab>
                <!-- :title="$t('m.inissue')" -->
                <van-tab title="发行中">
                  <div v-for="(items,index) in issuedata">
                    <router-link :to="/detail/+ items.code">
                      <!-- <router-link :to="{name:'Detail',params:{code:items.code,id:'explore'}}"> -->
                      <mt-cell :title="items.code +'('+items.nickname+')'" :label="items.subject">
                        <img class="assets-icon" slot="icon" :src="items.icon">
                        <mt-button size="small" type="primary" class="fr">{{$t('m.detail')}}</mt-button>
                      </mt-cell>
                    </router-link>
                  </div>
                </van-tab>
                <!-- :title="$t('m.tobeissued')" -->
                <van-tab title="待发行">
                  <div v-for="(items,index) in issuedata">
                    <router-link :to="/detail/+ items.code">
                      <mt-cell :title="items.code +'('+items.nickname+')'" :label="items.subject">
                        <img class="assets-icon" slot="icon" :src="items.icon">
                        <mt-button size="small" type="primary" class="fr">{{$t('m.detail')}}</mt-button>
                      </mt-cell>
                    </router-link>
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
  import { mapActions, mapGetters } from 'vuex'
  // 列表接口
  import api from "@/api/token/Token.js"
  import system from "@/api/system/System.js"
  export default {
    name: 'page-tabbar',
    data() {
      return {
        selected: 'explore',
        message: 'explore',
        versionData: '',
        issuedata: [],
        listParams: {
          status: ''
        },
      }
    },
    components: {
      'app-tabber': Tabber
    },
    mounted() {
      this.index(0, 'All')
    },
    created() {
      this.version()
    },
    methods: {
      // 展示全部列表
      index(index, title) {
        if (index == 0) {
          api.tokenList().then(res => {
            this.issuedata = res.data
          }).catch(err => {
            console.log(err)
          })
        } else {
          if (index == 1) {
            this.listParams.status = 2
            this.list()
          } else {
            if (index == 2) {
              this.listParams.status = 1
              this.list()
            } else {
              if (index == 3) {
                this.listParams.status = 0
                this.list()
              }
            }
          }
        }
      },
      list() {
        api.tokenList(this.listParams).then(res => {
          this.issuedata = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      version() {
        let vcode = this.$version()
        system.version({ 'version_code': vcode }).then(res => {
          if (res.code == 0) {
            this.versionData = res
            if (this.versionData.is_update == false) return
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
  @import '../../assets/scss/global'
</style>