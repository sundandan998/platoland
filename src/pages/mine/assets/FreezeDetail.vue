<template>
  <div class="freeze">
    <div class="freeze-header header">
      <mt-header fixed :title="$t('m.freezeDetail')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="freeze-information">
      <div class="freeze-down-menu">
        <span class="el-dropdown-link" index="type" @click="handleType(index)">
          {{$t('m.transactionStatus')}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <!-- <span class="el-dropdown-link fr" index="time">
          冻结时间<i class="el-icon-arrow-down el-icon--right"></i>
        </span> -->
      </div>
      <!-- <p class="null-data" v-if="this.freezeData.length === 0">暂无数据</p> -->
      <!-- 上拉加载 -->
      <van-list v-model="loading" :finished="finished" :finished-text="$t('m.noMore')" @load="onLoad" :offset="100"
        :error.sync="error" error-text="请求失败，点击重新加载">
        <div class="freeze-content" v-for="(item,index) in freezeData">
          <router-link :to="/orderdetail/+item.order_id">
            <!-- 发行买入 -->
            <div class="buy" v-if="item.flow_type=='发行买入'||item.flow_type=='受让'">
              <router-link
                :to="{name:'FreezeTransfer',params:{order_id:item.order_id,code:freezeParams.code,type:item.flow_type,num:item.amount,date:item.unfreeze_date}}">
                <div class="issue-buy">
                  <mt-button size="small" type="primary" class="fr transfer">转让</mt-button>
                </div>
              </router-link>
              <p>{{item.flow_type}}</p>
              <p><span>{{item.amount|number}}</span><span class="fr">还剩{{item.unfreeze_date | days}}天解冻</span>
              </p>
              <p>
                <van-slider disabled :value="item.unfreeze_date | total_days(item.transaction_time)" />
              </p>
              <p>已持有{{item.transaction_time | holding}}天</p>
            </div>
          </router-link>
          <!-- OTC发布出售 -->
          <div class="buy" v-if="item.flow_type=='OTC发布出售'">
            <router-link :to="/orderdetail/+item.order_id">
              <div>
                <p>{{item.flow_type}}</p>
                <p><span>{{item.amount|number}}</span>
                  <span class="fr">
                    <span v-if="item.is_pay==true"><img style="position: relative;top: 2px;"
                        src="../../../assets/images/go.svg" alt="">{{item.status|status}}</span>
                  </span>
                </p>
                <p>
                  <mt-progress v-if="item.is_undo==true" :value="item.amount" :bar-height="5"></mt-progress>
                </p>
                <p v-if="item.is_undo==true">已售出{{item.trade_amount}}</p>
                <p v-if="item.is_pay==true">待支付订单在30分钟后自动取消</p>
              </div>
            </router-link>
            <div class="fr">
              <mt-button v-if="item.is_undo==true" size="small" class="revoke" type="primary"
                @click="cancel(item.order_id,index)">撤销
              </mt-button>
            </div>
          </div>
          <!-- OTC发布买入 -->
          <div class="buy" v-if="item.flow_type=='OTC发布买入'">
            <router-link :to="/orderdetail/+item.order_id">
              <div>
                <p>{{item.flow_type}}</p>
                <p><span>{{item.amount|number}}</span><span class="fr">
                    <span v-if="item.is_pay==true"><img style="position: relative;top: 2px;"
                        src="../../../assets/images/go.svg" alt="">{{item.status|status}}</span>
                  </span> </p>
                <p>
                  <mt-progress :value="item.amount" :bar-height="5" v-if="item.is_undo==true"></mt-progress>
                </p>
                <p v-if="item.is_undo==true">已买入：{{item.trade_amount|number}}</p>
                <p v-if="item.is_pay==true">待支付订单在30分钟后自动取消</p>
              </div>
            </router-link>
            <div class="fr">
              <mt-button v-if="item.is_undo==true" size="small" type="primary" @click="cancel(item.order_id,index)">撤销
              </mt-button>
            </div>
          </div>
          <!-- 转出 -->
          <router-link :to="/orderdetail/+item.order_id">
            <div class="buy" v-if="item.flow_type=='转出'">
              <p>{{item.flow_type}}</p>
              <p><span>{{item.amount|number}}</span><span class="fr"><img style="position: relative;top: 2px;"
                    src="../../../assets/images/go.svg" alt="">
                  <span>{{item.status == 5 ?'审核中':item.status == 0?'进行中':'发起申请'}}</span>
                </span>
              </p>
              <p>
                <el-steps :space="300" :active="item.status == 5 ?1:item.status == 0?2:0" finish-status="finish"
                  align-center>
                  <el-step title="发起申请"></el-step>
                  <el-step title="审核中"></el-step>
                  <el-step title="进行中"></el-step>
                  <el-step title="审核结果"></el-step>
                </el-steps>
              </p>
            </div>
          </router-link>
          <!-- 分利宝 -->
          <div class="buy" v-if="item.flow_type=='分利宝'">
            <p class="flow_type">{{item.flow_type}}</p>
            <p><span class="buy-amount">{{item.amount|number}}</span><span class="fr buy-amount"></span>
              <mt-button size="small" type="danger" class="fr collect">点击领取+{{item.interest}}
              </mt-button>
            </p>
            <mt-progress class="progress" :value="10" :bar-height="7"></mt-progress>
            <p class="expiry-date ">到期日:{{item.unfreeze_date}}</p>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
  import api from "@/api/user/User.js"
  import { toast } from '@/assets/js/pub.js'
  export default {
    data() {
      return {
        value: '',
        data: '',
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
      // 上拉加载
      onLoad() {
        setTimeout(() => {
          this.freezeParams.code = this.$route.params.code
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
    },
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/global';
  .freeze {
    .null-data {
      text-align: center;
      margin: 50px auto;
      font-size: 20px;
      color: #999;
    }
  }

  .collect {
    width: 25%;
    height: 60px !important;
    margin-top: -20px;
    font-size: 20px;
  }

  .freeze-down-menu {
    padding: 10px 15px;
  }

  .freeze-information {
    height: auto;
    background-color: #fff;

    p {
      margin: 15px 15px;
    }

    .freeze-content {

      border-bottom: 10px solid #f6f6f6;
      border-top: 1px solid #f6f6f6;

      .buy {
        .revoke {
          position: relative;
          top: -170px;
        }

        button {
          height: 40px;
          right: 15px;
        }
      }

      .issue-buy button {
        top: 0px;
      }

      .to-pay {
        border-top: 10px solid #f6f6f6;
      }
    }
  }

  .van-slider,
  .van-slider__bar {
    background-color: #1989FA !important;
  }

  .van-slider--disabled {
    opacity: unset !important;
  }

  .van-slider__bar {
    border-radius: inherit;
    background-color: #ccc !important;
  }
</style>