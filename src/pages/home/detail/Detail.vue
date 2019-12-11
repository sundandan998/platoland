<template>
  <div class="detail">
    <div class="detail-header">
      <mt-header fixed :title="$t('m.passdetails')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="detail-token">
      <img :src="detailData.icon" alt="" class="fl">
      <span>{{detailData.code}}<b>( {{detailData.nickname}})</b></span>
    </div>
    <div class="detai-text">
      <!-- 合约地址 -->
      <span @click="copy" class=" overflow-text tag-read" :data-clipboard-text="detailData.contract_address">
        <mt-cell :title="$t('m.address')" :value="detailData.contract_address"></mt-cell>
      </span>
      <!-- 通证主体 -->
      <mt-cell :title="$t('m.body')" :value="this.subject.name" :to="{name:'Subject', params:{id:this.subject.id}}"
        is-link></mt-cell>
      <!-- 发行方 -->
      <mt-cell :title="$t('m.issuer')" :value="this.subject.issuer" is-link></mt-cell>
    </div>
    <div class="detail-description">
      <mt-cell title="通证效用" value="效用说明" is-link></mt-cell>
    </div>
    <div class="detail-flb">
      <p class="detail-flb-title">分利宝<span class="fr">全部 ></span></p>
      <div class="detail-flb-token">
        <div class="detail-flb-token-top">
          <img :src="detailData.icon" alt="" class="fl">
          <span>
            {{detailData.code}} ({{detailData.nickname}})
            <p>{{subject.name}}</p>
          </span>
        </div>
        <div class="detail-flb-token-bot">
          <p><span>锁仓期限</span><span class="fr">%</span></p>
          <p><span>最高转入</span><span class="fr">分利率</span></p>
        </div>
      </div>
    </div>
    <div class="detail-issued">
      <router-link :to="{name:'Issuance'}">
        <p class="detail-flb-title">发行情况<span class="fr">全部 ></span></p>
      </router-link>
      <div class="detail-issued-token">
        <div class="detail-issued-token-top">
          <img :src="detailData.icon" alt="" class="fl icon">
          <span>
            {{detailData.code}} ({{detailData.nickname}})
            <p>{{subject.name}}</p>
          </span>
          <!-- <img src="../../../assets/images/publicity.png" alt="" class="fr publicity" v-if="item.status==0"> -->
          <img src="../../../assets/images/issued.png" alt="" class="fr publicity">
        </div>
        <div class="detail-issued-token-bot">
          <div class="detail-issued-token-bot-left fl">
            <span>第期</span> <span class="fr">天</span>
          </div>
          <div class="detail-issued-token-bot-right fr">
            <span>000</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  import api from '@/api/token/Token'
  import Clipboard from 'clipboard'
  export default {
    data() {
      return {
        detailData: '',
        subject: ''
      }
    },
    created() {
      this.getDetail()
    },
    methods: {
      //获取详情
      getDetail() {
        api.tokenDetail(this.$route.params).then(res => {
          this.detailData = res.data
          this.subject = res.data.subject
          // this.release = res.data.release
          // this.$store.commit('detail', res.data)
        })
          .catch(err => {
            console.log(err)
          })
      },
      //复制
      copy() {
        var clipboard = new Clipboard('.tag-read')
        clipboard.on('success', e => {
          this.$toast({
            message: '复制成功',
            duration: 1800
          })
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          console.log('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
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
  @import '../../../assets/scss/global';

  .detail {
    .detail-flb-title {
      font-size: 28px;

      span {
        font-size: 24px;
      }
    }

    .detail-header {
      margin-bottom: 100px;
    }

    .detail-token {
      background-color: #fff;
      margin: 0 24px;
      border-radius: 10px;
      height: 100px;

      img {
        margin: 20px;
      }

      span {
        display: inline-block;
        margin-top: 30px;

        b {
          color: #999;
          font-weight: 400;
          margin-left: 10px;
        }
      }
    }

    .detai-text {
      background-color: #fff;
      margin: 20px 24px;
    }

    .detail-description {
      background-color: #fff;
      margin: 20px 24px;
    }

    .mint-cell-text {
      margin-left: -13px;
    }

    .detail-flb {
      margin: 0 24px;

      .detail-flb-token {
        background-color: #fff;

        .detail-flb-token-top {
          height: 100px;
          margin-top: 10px;

          img {
            margin: 0 20px;
            padding: 20px 0;
          }

          span {
            margin-top: 20px;
            display: inline-block;
          }
        }

        .detail-flb-token-bot {
          p {
            margin: 0 20px 0px 90px;
            padding-bottom: 20px;
          }
        }
      }
    }

    .detail-issued {
      margin: 10px 24px;

      .detail-issued-token {
        background-color: #fff;
        height: 160px;

        .detail-issued-token-top {
          margin-top: 10px;
          height: 100px;

          .icon {
            margin: 0 20px;
            padding: 20px 0;
          }

          span {
            display: inline-block;
            margin-top: 20px;
          }

          .publicity {
            height: 100px;
          }
        }

        .detail-issued-token-bot {
          margin: 0 20px 0 30px;

          .detail-issued-token-bot-left {
            width: 60%;
          }
        }
      }
    }
  }
</style>