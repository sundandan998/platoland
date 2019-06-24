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
                <van-tab title="全部">
                  <div v-for="(items,index) in issuedata">
                    <router-link :to="/detail/+ items.code">
                      <mt-cell :title="items.code +items.nickname" :label="items.subject">
                        <img class="assets-icon" slot="icon" :src="items.icon">
                        <mt-button size="small" type="primary" class="fr">{{$t('m.detail')}}</mt-button>
                      </mt-cell>
                    </router-link>
                  </div>
                </van-tab>
                <!-- :title="$t('m.incirculation')" -->
                <van-tab title="流通中">
                  <div v-for="(items,index) in issuedata" @click="circulation">
                    <mt-cell :title="items.code +(items.nickname)" :label="items.subject">
                      <img class="assets-icon" slot="icon" :src="items.icon">
                      <mt-button size="small" type="primary" class="fr" @click="tokenDetail(items.id)">{{$t('m.detail')}}</mt-button>
                    </mt-cell>
                  </div>
                </van-tab>
                <!-- :title="$t('m.inissue')" -->
                <van-tab title="发行中">
                  <div v-for="(items,index) in issuedata" @click="tokenDetail(items.id)">
                    <mt-cell :title="items.code +(items.nickname)" :label="items.subject">
                      <img class="assets-icon" slot="icon" :src="items.icon">
                      <mt-button size="small" type="primary" class="fr" @click="tokenDetail(items.id)">{{$t('m.detail')}}</mt-button>
                    </mt-cell>
                  </div>
                </van-tab>
                <!-- :title="$t('m.tobeissued')" -->
                <van-tab title="待发行">
                  <div v-for="(items,index) in issuedata" @click="tokenDetail(items.id)">
                    <mt-cell :title="items.code +(items.nickname)" :label="items.subject">
                      <img class="assets-icon" slot="icon" :src="items.icon">
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
  import { mapActions, mapGetters, mapState } from 'vuex'
  // 列表接口
  import api from "@/api/token/Token.js"
  export default {
    name: 'page-tabbar',
    data() {
      return {
        selected: 'explore',
        message: 'explore',
        issuedata: []
      }
    },
    components: {
      'app-tabber': Tabber
    },
    created() {
      setInterval(this.scroll, 3000)
    },
    mounted() {
      this.list(0, 'All')
    },
    methods: {
      // 展示全部列表
      list() {
        api.tokenList().then(res => {
          this.issuedata = res.data
          // console.log(this.issuedata)
        }).catch(err => {
          console.log(err)
        })
      },
      // 展示流通中
      
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
      //   async tokenDetail(id){
      //   const url=this.$backStage('/query?id='+id)
      //   const res = await this.$http.get(url)
      //   const data = res
      //   this.$router.push({
      //     name:'Detail',
      //   })
      //   this.$store.commit('detail', res.data[0])
      // }
    }
  }
</script>
<style lang="scss">
  @import '../../assets/scss/global'
</style>