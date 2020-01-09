<template>
  <div class="assets-detailed">
    <div class="assets-detailed-header header">
      <mt-header fixed :title="$t('m.assetdetails')">
        <!-- v-on:click="$router.go(-1)" -->
        <mt-button icon="back" slot="left" @click="back">{{$t('m.back')}}</mt-button>
        <mt-button icon="" slot="right">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <img slot="icon" src="../../../assets/images/gd.png">
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <router-link to="/scan">
                <el-dropdown-item>{{$t('m.scan')}}</el-dropdown-item>
              </router-link> -->
              <router-link :to="{name:'Out',params:{min_limit:this.assetsToken.min_limit}}">
                <el-dropdown-item>
                  <span>{{$t('m.changeout')}}</span>
                </el-dropdown-item>
              </router-link>
              <router-link :to="{name:'DetailedList'}">
                <el-dropdown-item>
                  <span>明细</span>
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
        <p class="fr balance ">{{this.assetsData.balance|number}}</p>
        <img :src="this.assetsToken.icon" alt="" class="fl" />
        <div class="assets-detailed-token">
          <span>{{this.assetsToken.code}}</span> <span>({{this.assetsToken.nickname}})</span>
          <p>{{this.assetsToken.subject}}</p>
        </div>
      </div>
    </div>
    <!-- 可用 -->
    <div class="assets-detailed-available">
      <router-link :to="{name:'AvailableTransfer',params:{code:this.assetsToken.code,id:this.assetsData.id}}">
        <mt-cell :title="$t('m.availablenum')" :value="this.assetsData.available_amount|number" is-link>
          <img slot="icon" src="../../../assets/images/u4662.png">
        </mt-cell>
      </router-link>
    </div>
    <!-- 冻结 -->
    <div class="assets-detailed-freeze">
      <router-link :to="{name:'FreezeDetail',params:{code:this.assetsToken.code,id:this.assetsData.id}}">
        <mt-cell :title="$t('m.frozen')" :value="this.assetsData.freeze_amount|number">
          <img slot="icon" src="../../../assets/images/u4666.png">
        </mt-cell>
      </router-link>
      <!-- 上拉加载 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
        :error.sync="error" error-text="请求失败，点击重新加载" class="transaction-type">
        <div class="freeze-content" v-for="(item,index) in freezeData">
          <router-link :to="/orderdetail/+item.order_id">
            <!-- 发行买入 -->
            <div class="buy" v-if="item.flow_type=='发行买入'||item.flow_type=='受让'">
              <router-link
                :to="{name:'FreezeTransfer',params:{order_id:item.order_id,code:freezeParams.code,type:item.flow_type,num:item.amount,date:item.unfreeze_date}}">
                <div class="issue-buy button">
                  <mt-button size="small" type="primary" class="fr transfer">转让</mt-button>
                </div>
              </router-link>
              <p class="flow_type">{{item.flow_type}}</p>
              <p><span class="buy-amount">{{item.amount|number}}</span><span
                  class="fr buy-amount">还剩{{item.unfreeze_date | days}}天解冻</span>
              </p>
              <p class="progress">
                <van-slider disabled :value="item.unfreeze_date | total_days(item.transaction_time)" />
              </p>
              <p class="buy-sold">已持有{{item.transaction_time | holding}}天</p>
            </div>
          </router-link>
          <!-- OTC发布出售 -->
          <div class="buy" v-if="item.flow_type=='OTC发布出售'">
            <div class="fr button">
              <mt-button v-if="item.is_undo==true" size="small" type="primary" @click="cancel(item.order_id,index)">
                撤销
              </mt-button>
            </div>
            <router-link :to="/orderdetail/+item.order_id">
              <div>
                <p class="flow_type">{{item.flow_type}}</p>
                <p><span class="amount">{{item.amount|number}}</span>
                  <span class="fr">
                    <span v-if="item.is_pay==true"><img style="position: relative;top: 2px;"
                        src="../../../assets/images/go.svg" alt="">{{item.status|status}}</span>
                  </span>
                </p>
                <p class="progress">
                  <!-- :value="item.amount" -->
                  <mt-progress v-if="item.is_undo==true" :bar-height="5"></mt-progress>
                </p>
                <p v-if="item.is_undo==true" class="sold">已售出{{item.trade_amount|number}}</p>
                <p v-if="item.is_pay==true">待支付订单在30分钟后自动取消</p>
              </div>
            </router-link>
          </div>
          <!-- OTC发布买入 -->
          <div class="buy" v-if="item.flow_type=='OTC发布买入'">
            <div class="fr button">
              <mt-button v-if="item.is_undo==true" size="small" type="primary" @click="cancel(item.order_id,index)">撤销
              </mt-button>
            </div>
            <router-link :to="/orderdetail/+item.order_id">
              <div>
                <p class="flow_type">{{item.flow_type}}</p>
                <p class="amount"><span>{{item.amount|number}}</span><span class="fr">
                    <span v-if="item.is_pay==true"><img style="position: relative;top: 2px;"
                        src="../../../assets/images/go.svg" alt="">{{item.status|status}}</span>
                  </span> </p>
                <p class="progress">
                  <mt-progress :value="item.amount" :bar-height="5" v-if="item.is_undo==true"></mt-progress>
                </p>
                <p v-if="item.is_undo==true" class="sold">已买入：{{item.trade_amount|number}}</p>
                <p v-if="item.is_pay==true">待支付订单在30分钟后自动取消</p>
              </div>
            </router-link>

          </div>
          <!-- 转出 -->
          <router-link :to="/orderdetail/+item.order_id">
            <div class="buy" v-if="item.flow_type=='转出'">
              <p class="flow_type">{{item.flow_type}}</p>
              <p><span class="turn-amount">{{item.amount|number}}</span><span class="fr"><img
                    style="position: relative;top: 2px;" src="../../../assets/images/go.svg" alt="">
                  <span class="turn-status">{{item.status == 5 ?'审核中':item.status == 0?'进行中':'发起申请'}}</span>
                </span>
              </p>
              <!-- <p>
                <el-steps :space="300" :active="item.status == 5 ?1:item.status == 0?2:0" finish-status="finish"
                  align-center>
                  <el-step title="发起申请"></el-step>
                  <el-step title="审核中"></el-step>
                  <el-step title="进行中"></el-step>
                  <el-step title="审核结果"></el-step>
                </el-steps>
              </p> -->
            </div>
          </router-link>
        </div>
      </van-list>
    </div>
    <div class="transfer-btn">
      <router-link to="/into">
        <mt-button size="large" type="primary">{{$t('m.changeinto')}} </mt-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  import api from "@/api/user/User.js"
  import { toast } from '@/assets/js/pub.js'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        data: {},
        assetsData: {},
        assetsToken: {},
        // 删除资产参数
        delasset: {
          code: '',
        },
        freezeData: [],
        // 上拉加载
        loading: false,
        finished: false,
        error: false,
        // 冻结参数
        freezeParams: {
          // pageNum: 1,
          page: 1,
          page_size: 10,
          code: '',
          ordering: '',
        }
      }
    },
    created() {
      this.assetDetail()
      // console.log(this.$route.params.code)
    },
    filters: {
      // 到期时间
      days(unfreeze_date) {
        let today = new Date()
        today.setHours(0, 0, 0, 0)
        let date = new Date(unfreeze_date + ' 00:00:00')
        let days_number = date - today
        return days_number / (24 * 3600 * 1000)
      },
      // 创建时间
      holding(transaction_time) {
        let today = new Date()
        today.setHours(0, 0, 0, 0)
        let date = new Date(transaction_time.split(' ')[0] + ' 00:00:00')
        let holding_days = today - date
        return holding_days / (24 * 3600 * 1000)
      },
      total_days(unfreeze_date, transaction_time) {
        let today = new Date()
        today.setHours(0, 0, 0, 0)
        let date = new Date(unfreeze_date + ' 00:00:00')
        let days_number = date - today
        let freeze_days = days_number / (24 * 3600 * 1000)
        let transaction_date = new Date(transaction_time.split(' ')[0] + ' 00:00:00')
        let holding_days = today - transaction_date
        holding_days = holding_days / (24 * 3600 * 1000)
        let percent = holding_days / (freeze_days + holding_days) * 100
        return percent
      },
      status(status) {
        return status == 0 ? '进行中' : status == 1 ? '已完成' : status == 2 ? '失败' : status == 3 ? '待支付' : status == 4 ? '已取消'
          : status == 5 ? '审核中' : status == 6 ? '审核未通过' : status == 7 ? '锁仓中' : '已撤销'
      }
    },
    methods: {
      back() {
        this.$router.push({
          name: 'Assets'
        })
      },
      // 资产详情
      assetDetail() {
        // debugger
        api.assetDetail(this.$route.params).then(res => {
          this.assetsData = res.data
          // console.log( )
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
      // 上拉加载
      onLoad() {
        setTimeout(() => {
          this.freezeParams.code = this.$route.params.code || this.detail.token.code
          api.freeze(this.freezeParams).then(res => {
            if (res.code == 0) {
              // 冻结详情
              this.freezeData.push.apply(this.freezeData, res.data)
              // this.$store.commit('detail', res.this.freezePara)
              this.loading = false
              if (res.has_next == true) {
                this.freezeParams.page++
              }
              if (res.has_next == false) {
                this.finished = true
                this.loading = false
              }
            }
          }).catch(err => {
            this.error = true
          })
        }, 100)
      },
      // 撤销
      cancel(order_id, index) {
        // debugger
        this.$messagebox({
          title: '温馨提示',
          message: `确定撤销这笔已发布的广告？`,
          confirmButtonText: '撤销发布',
          cancelButtonText: '我再想想',
          showCancelButton: true
        }).then(action => {
          if (action == 'confirm') {
            api.cancel({ order_id: order_id }).then(res => {
              if (res.code == 0) {
                toast(res)
                this.freezeData.splice(index, 1)
              }
            }).catch(err => {
              if (err.code !== 0) {
                // toast(err)
              }
            })
          }
        })
      },
      // 按交易类型排序
      handleType(index) {
        if (index = 'type') {
          this.freezeParams.code = this.$route.params.code
          if (this.freezeParams.ordering == '') {
            this.freezeParams.ordering = 'order_type,-transaction_time'
          } else {
            this.freezeParams.ordering = ''
          }
          api.freeze(this.freezeParams).then(res => {
            this.freezeData = res.data
          }).catch()
        } else {
        }
      },
      onChange(value) {
        return value = '已持有' + `${180 - value}` + '天'
      },
      // tab栏切换
      // indexTab(index, title) {
      //   if (index == 0) {
      //     this.details.transaction_type = 0
      //     this.list()
      //   } else {
      //     this.details.transaction_type = 1
      //     this.list()
      //   }
      // },
    },
    computed: {
      ...mapGetters([
        'detail'
      ])
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/global';

  .assets-detailed {
    .assets-detailed-exhibition {
      overflow: hidden;
      margin: 90px 24px 20px 24px;
      border-radius: 10px;
      height: 120px;
      background-color: #fff;

      img {
        margin: 0px 10px;
      }

      .balance {
        margin: 20px 20px 0 0;
      }

      .assets-detailed-token {
        margin-top: 30px;
      }
    }

    .assets-detailed-available {
      margin: 0 24px 20px 24px;

      .mint-cell {
        border-radius: 10px;
        background-image: none;
      }

    }

    .assets-detailed-freeze {
      margin: 0 24px 20px 24px;

      .progress {
        /* width: 93% !important;
        background-color: #26a2ff;
        margin: 30px auto; */
      }

      .van-list__error-text,
      .van-list__finished-text,
      .van-list__loading-text {
        color: #969799;
        font-size: 0.346667rem;
        margin-bottom: 40px !important;
        background-color: #f2f2f2;
      }

      .mint-cell {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-image: none;
      }

      .transaction-type {
        background-color: #fff;
      }

      .flow_type {
        padding: 20px 0 0 20px;
      }

      .amount {
        margin: 20px 0 0px 20px;
        display: inline-block;
      }

      .turn-amount {
        font-size: 30px;
        color: #333;
        margin: 10px 0 10px 20px;
      }

      .turn-status {
        position: relative;
        top: -12px;
        right: 20px;
        margin-left: 30px;
        font-size: 30px;
        color:#333;
      }

      .buy-amount {
        margin: 20px;
        display: inline-block;
      }

      .status {
        margin-right: 20px;
      }

      .sold {
        margin-left: 20px;
      }

      .buy-sold {
        margin: 20px;
      }

      .button {
        margin: 20px 20px 0 0;
      }

      .mint-button--small {
        height: 22px;
      }
      .buy {
        border-bottom: 20px solid #f2f2f2;
        img {
          position: relative;
          top: -4px;
        }
      }
    }

    .transfer-btn {
      position: fixed;
      width: 100%;
      bottom: 10px;
      z-index: 1;
    }
  }
</style>