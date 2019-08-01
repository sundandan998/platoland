<template>
  <div class="freeze">
    <div class="freeze-header">
      <mt-header fixed title="冻结详情">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="freeze-information">
      <div class="freeze-down-menu">
        <span class="el-dropdown-link" index="type" @click="handleType(index)">
          交易类型<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <!-- <span class="el-dropdown-link fr" index="time">
          冻结时间<i class="el-icon-arrow-down el-icon--right"></i>
        </span> -->
      </div>
      <!-- <p class="null-data" v-if="this.freezeData.length === 0">暂无数据</p> -->
      <!-- 上拉加载 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :offset="100"
        :error.sync="error" error-text="请求失败，点击重新加载">
        <div class="freeze-content" v-for="item in freezeData">
          <router-link :to="/orderdetail/+item.order_id">
            <!-- 发行买入 -->
            <div class="buy" v-if="item.flow_type=='发行买入'">
              <p>{{item.flow_type}}</p>
              <p><span>{{item.amount|number}}</span><span class="fr">还剩{{item.unfreeze_date | days}}天解冻</span>
              </p>
              <p>
                  <el-progress :stroke-width="10"  :format="format" :percentage="item.unfreeze_date | days " background-color="#1989FA"></el-progress>
                <!-- <mt-progress :value="item.unfreeze_date | days  " :bar-height="5"></mt-progress> -->
              </p>
              <!-- <p>还剩{{item.unfreeze_date | days}}天解冻</p> -->
              <!-- <p>还剩{{item.unfreeze_date | days}}天解冻</p> -->
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
              <mt-button v-if="item.is_undo==true" size="small" type="primary" @click.native="cancel(item.order_id)">撤销
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
              <mt-button v-if="item.is_undo==true" size="small" type="primary" @click.native="cancel(item.order_id)">撤销
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
          ordering: ''
        }
      }
    },
    created() {
      // this.onLoad()
      // console.log(this.freezeData)/
    },
    filters: {
      days(unfreeze_date) {
        let today = new Date()
        today.setHours(0, 0, 0, 0)
        let date = new Date(unfreeze_date + ' 00:00:00')

        let days_number = date - today
        return days_number / (24 * 3600 * 1000)
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
      cancel(order_id) {
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
                history.go(0)
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
      format(percentage) {
        // return percentage === 100 ? '满' : `${percentage}%`;
        return percentage ='已持有'+`${180-percentage}`+'天'
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/global';

  .freeze-header {
    margin-bottom: 20px;
  }

  .freeze {

    .null-data {
      text-align: center;
      margin: 50px auto;
      font-size: 20px;
      color: #999;
    }
  }

  .freeze-down-menu {
    padding: 10px 15px;
  }

  .freeze-information {

    height: auto;
    background-color: #fff;

    p {
      margin: 5px 15px;
    }

    .freeze-content {

      border-bottom: 10px solid #f6f6f6;
      border-top: 1px solid #f6f6f6;

      .buy button {
        height: 25px;
        position: relative;
        top: -90px;
        right: 15px;
      }

      .to-pay {
        border-top: 10px solid #f6f6f6;
      }
    }
  }

  .el-step__title {
    font-size: 0.78rem;
    line-height: 38px;
  }
  .el-progress-bar__outer {
    background-color: #1989FA;
}
.el-progress-bar__inner {
    background-color: #ccc;
}
.el-progress__text {
    font-size: 10px !important;
    color: #ccc;
}
</style>