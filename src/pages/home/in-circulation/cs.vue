<template>
  <div class="issuance">
    <div class="release-header header">
      <mt-header fixed title="发行情况">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
        <mt-button slot="right" @click.native="token"> <img src="../../../assets/images/release.svg" alt=""> 发布
        </mt-button>
      </mt-header>
    </div>
    <div class="issuance-token">
      <img :src="detail.token.icon" alt="" class="fl">
      <span>
        <span>{{detail.token.code}} ( {{detail.token.nickname}} )</span>
        <p>{{detail.token.subject}}</p>
      </span>
    </div>
    <div class="issued-echarts">
      <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
    </div>
    <!-- 当前发行 -->
    <div class="current-release">
      <p class="current-release-title">当前发行</p>
      <div class="current-release-token" v-for="item in happeDetail">
        <div class="current-release-token-top">
          <img :src="item.token.icon" alt="" class="fl icon">
          <span><b>{{item.token.code}}</b>({{item.token.nickname}}) <p>{{item.token.subject}}</p></span>
          <img src="../../../assets/images/issued.png" alt="" class="fr publicity" v-if="item.status==1">
        </div>
        <div class="current-release-token-bot">
          <div class="current-release-token-bot-text fl">
            <span>第 {{item.periods}} 期</span>
            <span class="fr"> <img src="../../../assets/images/lock.svg" alt=""> {{item.freeze_days}} 天</span>
          </div>
          <span class="fr "> <img :src="item.d_icon" alt=""> {{item.issue_price|number}}</span>
        </div>
      </div>
    </div>
    <!-- 发布历史 -->
    <p class="current-release-title history">历史发行 <span>(已结束)</span></p>
    <div class="issued-release-history">
      <div class="release-history-title">
        <span>发行总量</span>
        <span>锁仓期限</span>
        <span>单价</span>
        <span>数量</span>
      </div>
      <div class="release-history-title" v-for="item in happeDetail" v-if="item.status==1">
        <span>{{item.periods}}期</span>
        <span>{{item.freeze_days}} 天</span>
        <span>{{item.issue_price|number}} {{item.denominated_assets}} </span>
        <span>{{item.purchase_number|number}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import api from "@/api/token/Token.js"
  import { mapActions, mapGetters } from 'vuex'
  // 引入基本模板
  let echarts = require('echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/bar')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    data() {
      return {
        happeDetail: '',
        balanceToken: '',
        happeParams: {
          page: 1,
          page_size: 10,
          code: '',
          status: '',
          ordering: 'publish_date'
        },
        num:[]
      }
    },
    created() { },
    mounted() {
      this.drawLine()
      this.happening()
    },
    methods: {
      // 发行情况
      happening() {
        this.happeParams.code = this.detail.token.code
        api.issuedList(this.happeParams).then(res => {
          if (res.code == 0) {
            this.happeDetail = res.data
            let price = []
            let num = []
            for (let i = 0; i < res.data.length; i++) {
              // temp.price.push(res.data[i].issue_price)
              num.push(res.data[i].periods)
              console.log(num)
            }
          }
          myChart.setOption(this.drawLine)

        }).catch(err => {

        })
      },
      token() {
        this.$router.push({
          name: 'Token',
          params: { token: this.detail.token, code: this.detail.token.code }
        })
      },
      drawLine() {
        // debugger
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          legend: {
            data: ['发行总量', '发行单价']
          },
          xAxis: [
            {
              type: 'category',
              data: [this.detail.periods],
              // data: ['1期', '2期', '3期', '4期', '5期'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '总量',
              // data: this.num,
              // min: 0,
              // max: 100,
              // interval: 10,
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: '单价',
              data: [this.detail.price],
              // min: 0,
              // max: 100,
              // interval: 10,
              axisLabel: {
                formatter: '{value}'
              } 
            }
          ],
          series: [
            {
              name: '发行总量',
              type: 'bar',
              data:[this.detail.price]
              // data: []

            },
            {
              name: '发行单价',
              type: 'line',
              yAxisIndex: 1,
              data: [this.detail.price]
              // data: []

            }
          ]
        })
      }
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

  .issuance {
    .issuance-token {
      border-radius: 10px;
      margin: 90px 24px 20px 24px;
      background-color: #fff;
      padding: 10px 0;

      img {
        margin: 0 20px;
      }
    }

    .issued-echarts {
      background-color: #fff;
      border-radius: 10px;
      width: 700px;
      height: 550px;
      margin: 0 24px;

      #myChart {
        margin: 0px auto;
      }
    }

    .current-release {
      margin: 20px 24px;

      .current-release-title {
        font-size: 30px;
        margin-bottom: 20px;
      }

      .current-release-token {
        background-color: #fff;
        border-radius: 10px;
        height: 160px;
        margin-bottom: 20px;

        .current-release-token-top {
          height: 110px;

          .icon {
            margin: 25px 20px 0 20px;
          }

          span {
            margin-top: 25px;
            display: inline-block;
          }

          .publicity {
            height: 100px;
            border-top-right-radius: 10px;
          }
        }

        .current-release-token-bot {
          margin: 0 20px 0px 30px;

          span {
            color: #036EB8;
          }

          .current-release-token-bot-text {
            width: 60%;
          }

          img {
            height: 30px;
          }
        }

      }
    }

    /* 发布历史 */
    .history {
      margin-left: 30px;
      font-size: 26px;
    }

    .issued-release-history {
      margin: 20px 24px;
      background-color: #fff;
      border-radius: 10px;

      .release-history-title {
        padding-left: 35px;
        border-bottom: 1px solid #EFEFF4;

        span {
          width: 24%;
          display: inline-block;
          font-size: 26px;
          margin: 20px 0;
        }
      }
    }
  }
</style>