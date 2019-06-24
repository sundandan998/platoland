<template>
  <div class="assets-detailed">
    <div class="assets-detailed-header">
      <mt-header fixed :title="$t('m.assetdetails')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
        <mt-button icon="" slot="right">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <img slot="icon" src="../../../assets/images/gd.png">
            </span>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/scan">
                <el-dropdown-item>{{$t('m.scan')}}</el-dropdown-item>
              </router-link>
              <router-link :to="{name:'Out'}">
                <el-dropdown-item>
                  <span>{{$t('m.changeout')}}</span>
                </el-dropdown-item>
              </router-link>
              <el-dropdown-item>
                <span @click="remove">{{$t('m.remove')}}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </mt-button>
      </mt-header>
    </div>
    <div class="assets-detailed-exhibition">
      <div class="assets-detailed-exhibition-img">
        <p>{{this.assetsData.balance}}</p>
        <img :src="this.assetsToken.icon" alt="" class="fl" />
        <ul>
          <li>{{this.assetsToken.code}} ({{this.assetsToken.nickname}})</li>
          <li>{{this.assetsToken.subject}}</li>
        </ul>
      </div>
      <mt-cell :title="$t('m.availablenum')" :value="this.assetsData.available_amount">
        <img slot="icon" src="../../../assets/images/u4662.png">
      </mt-cell>
      <mt-cell :title="$t('m.frozen')" :value="this.assetsData.freeze_amount">
        <img slot="icon" src="../../../assets/images/u4666.png">
      </mt-cell>
    </div>
    <div class="assets-detailed-whole">
      <div class="assets-detailed-whole-header">
        <span class="fl">{{$t('m.assetsdetail')}}</span>
        <router-link to="/detailedlist">
          <span class="fr">{{$t('m.whole')}} ></span>
        </router-link>
      </div>
    </div>
    <div class="assets-detailed-tabbar">
      <van-tabs>
        <van-tab :title="$t('m.changeinto')">
          <mt-cell to="/transaction" is-link label="2018-03-06  12:03">
            <span>-30000</span>
          </mt-cell>
          <mt-cell to="/transaction" is-link label="2018-03-06  12:03">
            <span>-30000</span>
          </mt-cell>
          <router-link to="/into">
            <mt-button size="large" type="primary">{{$t('m.changeinto')}} </mt-button>
          </router-link>
        </van-tab>
        <van-tab :title="$t('m.changeout')">
          <mt-cell to="/transaction" is-link label="2018-03-06  12:03">
            <span>-30000</span>
          </mt-cell>
          <mt-cell to="/transaction" is-link label="2018-03-06  12:03">
            <span>-30000</span>
          </mt-cell>
          <router-link to="/into">
            <mt-button size="large" type="primary">{{$t('m.changeinto')}} </mt-button>
          </router-link>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import api from "@/api/user/User.js"
  import { toast } from '@/assets/js/pub.js'
  export default {
    data() {
      return {
        data: {},
        // assetDetailId:{},
        assetsData: {},
        assetsToken: {},
        // 删除资产参数
        delasset: {
          code: ''
        },
        // 转出资产参数
        outParam: {
          token: 'LD',
          address: 'de12sdfe',
          amount: 1000
        }
      }
    },
    created() {
      // this.assetDetailId = this.$route.params
      this.assetDetail()
    },
    methods: {
      // 资产详情
      assetDetail() {
        api.assetDetail(this.$route.params).then(res => {
          this.assetsData = res.data
          this.assetsToken = res.data.token
          this.$store.commit('detail', res.data)
        }).catch(err => {
          console.log(err)
        })
      },
      //点击移除弹出的消息框
      remove() {
        this.$messagebox({
          title: '提示',
          message: '你确定要移除资产吗？',
          cancelButtonText: '取消',
          confirmButtonText: '确认',
          showCancelButton: true
        }).then(action => {
          if (action === 'confirm') {
            // 删除资产接口
            this.delasset.code = this.detail.id
            api.delAsset(this.delasset).then(res => {
              if (res.code == 0) {
                toast(res)
              }
            }).catch(err => {
              if (err.code != 0) {
                toast(err)
              }
            })
          }
        })
      },
    },
    computed: {
      ...mapGetters([
        'detail'
      ])
    }
  }
</script>

<style lang="scss">
  @import '../../../assets/scss/global'
</style>