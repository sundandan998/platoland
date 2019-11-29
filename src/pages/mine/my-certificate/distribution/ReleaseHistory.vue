<template>
  <div class="release-history">
    <div class="release-header">
      <mt-header fixed title="分利计划">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
        <mt-button slot="right" @click.native="release"> <img src="../../../../assets/images/release.svg" alt=""> 发布
        </mt-button>
      </mt-header>
    </div>
    <div  v-for="item in listData">
    <div class="home-pub-token">
      <img src="../../../../assets/images/life-icon.png" alt="" class="fl icon">
      <span><b>{{item.token.code}}</b>({{item.token.nickname}}) <p>{{item.token.subject}}</p></span>
    </div>
    <div class="release-detail-num" >
      <p>{{item.air}}%</p>
      <div class="release-detail-text">
        <div class="release-detail-text-left fl">
          <span class="fl">{{item.status}}</span><span class="fr">{{item.freeze_days}}天</span>
        </div>
        <div class="release-detail-text-right fr">
          <span>{{item.create_time}}</span>
        </div>
      </div>
      <div class="release-detail-num-progress progress ">
        <mt-progress :value="20" :bar-height="7"></mt-progress>
        <div slot="start" class="fl">已售{{item.sold_amount}}</div>
        <div slot="end" class="fr">总量{{item.total_amount}}</div>
      </div>
    </div>
    <div class="release-history-list">
      <p>发布历史 <span>(已结束)</span></p>
      <div class="release-history-title">
        <span>发布时间</span>
        <span>锁仓期限</span>
        <span>分利率</span>
        <span>数量</span>
      </div>
      <div class="release-history-title">
        <span>{{item.create_time}}</span>
        <span>{{item.freeze_days}} 天</span>
        <span>{{item.air}} %</span>
        <span>{{item.total_amount}}</span>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
    import api from "@/api/token/Token.js"
  export default {
    data() {
      return {
        listData:'', 
        listParams: {
          admin: 'false',
          page: 1,
          page_size:50 
        }
      }
    },
    created () {
      this.list()
    },
    methods: {
      // 发布
      release() {
        this.$router.push({
          name: 'Release'
        })
      },
      // 发布列表
      list(){
        api.flList(this.listParams).then(res => {
          if (res.code == 0) {
            this.listData = res.data
          }
        }).catch(err => {

        })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../../assets/scss/global';

  .release-history {
    .home-pub-token {
      margin: 90px 24px 0 24px;
      background-color: #fff;
      border-radius: 10px;
    }

    .release-detail-num {
      margin: 20px 24px;
      background-color: #fff;
      border-radius: 10px;
      height: 220px;

      .release-detail-text {
        height: 50px;
        margin: 10px 20px 0 55px;
        color: #036EB8;
        font-size: 26px;

        .release-detail-text-left {
          width: 55%;
        }
      }

      .release-detail-num-progress {
        margin-left: 55px;
      }

      p {
        padding: 10px 20px 0 55px;
        font-size: 32px;
      }
    }

    .release-history-list {
      background-color: #fff;
      margin: 0 24px;
      border-radius: 10px;

      p {
        font-size: 30px;
        margin-left: 55px;

        span {
          font-size: 24px;
        }
      }

      .release-history-title {
        padding-left: 55px;
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