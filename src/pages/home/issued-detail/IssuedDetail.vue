<template>
  <div class="issued-detail">
    <div class="release-header header">
      <mt-header fixed title="发行详情">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="issued-token">
      <router-link :to="{name:'Detail', params: {code:this.detailToken.code}}">
        <img :src="detailToken.icon" alt="" class="fl issued-icon">
        <span>
          <span>{{detailToken.code}} ( {{detailToken.nickname}} )</span>
          <p>{{detailToken.subject}}</p>
        </span>
        <img src="../../../assets/images/right.png" alt="" class="fr issued-right">
      </router-link>
    </div>
    <div class="issued-price">
      <div class="issued-price-top">
        <div class="issued-price-num fl">
          <span>{{issuedDetail.periods}}</span>
          <span class="fr">{{issuedDetail.issue_price|number}}</span>
        </div>
        <span class="fr issued-period issued-price-num-day">{{issuedDetail.freeze_days}}</span>
        <div class="issued-price-text fl">
          <span>发行期数 (期)</span>
          <span class="fr">单价 ({{issuedDetail.denominated_assets}})</span>
        </div>
        <span class="fr issued-period">期限(天)</span>
      </div>
      <div class="issued-progress progress">
        <mt-progress :value="20" :bar-height="7"></mt-progress>
        <div slot="start" class="fl">已售 {{issuedDetail.sold_number|number}} 份</div>
        <div slot="end" class="fr">总量 {{issuedDetail.first_number|number}} 份</div>
      </div>
      <mt-cell title="每份数量" :value="issuedDetail.step_number|number"></mt-cell>
      <mt-cell title="每份总价" value="说明文字"></mt-cell>
    </div>
    <div class="issued-servings">
      <mt-cell title="起购份数" :value="issuedDetail.minimum_number|number"></mt-cell>
      <mt-cell title="最高起购份数" :value="issuedDetail.max_purchase_number|number"></mt-cell>
    </div>
    <div class="issued-servings">
      <mt-cell title="股权锁定" :value="issuedDetail.equity_issuance_ratio+'%'"></mt-cell>
      <mt-cell title="开始时间" :value="issuedDetail.publish_time"></mt-cell>
      <router-link :to="{name:'Issuance'}">
        <mt-cell title="发行情况" value="查看" is-link class="issued-view"></mt-cell>
      </router-link>
    </div>
    <div class="transfer-button">
      <router-link to="/buy">
        <mt-button size="large" type="primary">立即买入</mt-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  import api from "@/api/token/Token.js"
  export default {
    data() {
      return {
        issuedDetail: '',
        detailToken: ''

      }
    },
    created() {
      this.issued()
    },
    methods: {
      // 详情接口
      issued() {
        api.issuedDetail({ id: this.$route.params.id }).then(res => {
          if (res.code == 0) {
            this.issuedDetail = res.data
            this.detailToken = res.data.token
            this.$store.commit('detail', res.data)
          }
        }).catch()
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/global';

  .issued-detail {
    .mint-cell-text {
      margin-left: -13px;
    }

    .issued-token {
      margin: 90px 24px 10px 24px;
      border-radius: 10px;
      height: 150px;
      background-color: #fff;

      .issued-icon {
        margin: 40px 20px 0 20px;
      }

      span {
        margin-top: 20px;
        display: inline-block;
      }

      .issued-right {
        position: relative;
        top: 60px;
        right: 20px;
      }
    }

    .issued-price {
      border-radius: 10px;
      margin: 0 24px;
      background-color: #fff;

      .issued-price-top {
        height: 120px;
      }

      .issued-period {
        margin-right: 20px;
      }

      .issued-price-text {
        width: 60%;
        margin: 0 20px;
      }

      .issued-price-num {
        width: 50%;
        margin: 20px 20px 10px 60px;
        font-size: 40px;
      }

      .issued-price-num-day {
        font-size: 40px;
        margin: 20px 50px 10px 20px;
      }

      .issued-progress {
        height: 130px;
      }

    }

    .issued-servings {
      /* height: 150px; */
      margin: 20px 24px;

      .issued-view {
        color: #036EB8;

        .mint-cell-value {
          color: #036EB8;
        }

        .mint-cell-allow-right::after {
          border-right: solid 0.053333rem #036EB8;
          border-top: solid 0.053333rem #036EB8;
        }
      }

    }
  }
</style>