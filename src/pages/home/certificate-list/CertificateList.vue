<template>
  <div class="certificate-list">
    <div class="certificate-list-header">
      <mt-header fixed :title="$t('m.assetslist')">
        <mt-button slot="left" icon="back" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="certificate-list-card" v-for="(item, index) in assetsdata">
        <!-- @click="issue(item.id)" -->
      <mt-cell :title="item.code+'('+ item.nickname+')'" :label="item.subject">
        <img class="assets-icon" slot="icon" :src="item.icon">
        <router-link :to="{name:'Add',params:{name:item.name,subject:item.subject,icon:item.icon,code:item.code}}">
        <!-- v-model="item.isactive=='0'" -->
        <mt-switch class="asset-list-switch" @change="assetswitch" :value="value"></mt-switch>
        </router-link>
      </mt-cell>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import store from './../../../store/modules/app.js'
  // 列表接口
  import api from "@/api/token/Token.js"
  export default {
    data() {
      return {
        popupVisible: true,
        value: false,
        data: [],
        assetsdata: []
      }
    },
    created() {
      this.listassets()
    },
    // mounted() {
    //   this.$store.dispatch('detail'),
    //     this.listassets()
    //   //	  console.group(this.$store.state.app.showFooter)
    // },
    computed: {
      ...mapGetters([
        'refpath'
      ])
    },
    beforeRouteLeave(to, from, next) {
      //console.group('beforeRouteLeave ===============》');
      this.$store.commit('refpath', '')
      next()
    },
    methods: {
      async issue(id) {
        if (this.refpath === '/add') {
          this.$router.push({
            path: '/add',
          })
        } else {
          const url = this.$backStage('/query?id=' + id)
          const res = await this.$http.get(url)
          const data = res.data
          this.$router.push({
            name: 'Detail',
          })
          // this.$store.commit('detail', res.data[0])
        }
      },
      //列表信息
      listassets() {
        api.tokenList(this.$route.params).then(res => {
          this.assetsdata = res.data
          // this.$store.commit('detail', res.data)
        }).catch(err => {
          console.log(err)
        })
      },
      assetswitch() {
        // this.$toast({
        //   message: 'Done Successfully'
        // })
      }
    }

  }
</script>


<style lang="scss">
  @import "../../../assets/scss/global"
</style>