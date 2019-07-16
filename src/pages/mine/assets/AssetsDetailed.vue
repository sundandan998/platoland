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
        <p>{{(parseInt(this.assetsData.balance)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}}</p>
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
      <van-tabs @click="indexTab">
        <van-tab :title="$t('m.changeinto')">
          <div class="assets-detailed-list" v-for="item in listData">
            <router-link :to="{name:'TransactionDetails',params:{id:item.id,order_type:item.order_type}}">
              <mt-cell :title="item.transaction_type == 1 ? '转出':'转入'" is-link :label="item.create_time">
                <span :style="{'color':item.transaction_type ==1?'red':'blue'}">{{item.transaction_type ==1?'-'+item.amount :'+'+item.amount}}</span>
              </mt-cell>
              <p>{{item.token.code}}</p>
            </router-link>
          </div>
          <router-link to="/into">
            <mt-button size="large" type="primary">{{$t('m.changeinto')}} </mt-button>
          </router-link>
        </van-tab>
        <van-tab :title="$t('m.changeout')">
          <div class="assets-detailed-list" v-for="item in listData">
            <router-link :to="{name:'TransactionDetails',params:{id:item.id,order_type:item.order_type}}">
              <mt-cell :title="item.transaction_type == 1 ? '转出':'转入'" is-link :label="item.create_time">
                <span :style="{'color':item.transaction_type ==1?'red':'blue'}">{{item.transaction_type ==1?'-'+item.amount :'+'+item.amount}}</span>
              </mt-cell>
              <p>{{item.token.code}}</p>
            </router-link>
          </div>
          <router-link to="/into">
            <mt-button size="large" type="primary">{{$t('m.changeinto')}} </mt-button>
          </router-link>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
  import api from "@/api/user/User.js"
  import { toast } from '@/assets/js/pub.js'
  export default {
    data() {
      return {
        data: {},
        assetsData: {},
        assetsToken: {},
        // 明细参数
        details: {
          code: '',
          transaction_type: 0
        },
        listData: {},
        // 删除资产参数
        delasset: {
          code: '',
        },
      }
    },
    created(){
      this.assetDetail()
    },
    methods: {
      // 资产详情
      assetDetail() {
        // debugger
        api.assetDetail(this.$route.params).then(res => {
          this.assetsData = res.data
          this.assetsToken = res.data.token
          this.$store.commit('detail',res.data)
          this.details.code = this.assetsToken.code
          this.list()
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
            this.delasset.code = this.$route.params.code
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
      // 明细接口
      list() {
        api.transactionList(this.details).then(res => {
          this.listData = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      // tab栏切换
      indexTab(index, title) {
        if (index == 0) {
          this.details.transaction_type = 0
          this.list()
        } else {
          this.details.transaction_type = 1
          this.list()
        }
      },
    },
    // computed: {
    //   ...mapGetters([
    //     'detail'
    //   ])
    // }
  }
</script>

<style lang="scss">
  @import '../../../assets/scss/global'
</style>