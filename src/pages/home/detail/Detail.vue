<template>
  <div class="detail">
    <div class="detail-header">
      <mt-header fixed :title="$t('m.tokenDetails')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="detail-token">
      <img :src="detailData.icon" alt="" class="fl">
      <span>{{detailData.code}}<b>( {{detailData.nickname}})</b></span>
    </div>
    <div class="detai-text">
      <!-- 合约地址 -->
      <span @click="copy" class="overflow-text tag-read" :data-clipboard-text="detailData.contract_address">
        <img src="../../../assets/images/copy.svg" alt="" class="fr">
        <mt-cell :title="$t('m.address')" :value="detailData.contract_address"></mt-cell>
      </span>
      <!-- 通证主体 -->
      <mt-cell :title="$t('m.tokenSubject')" :value="this.subject.name" :to="{name:'Subject', params:{id:this.subject.id}}"
        is-link></mt-cell>
      <!-- 发行方 -->
      <mt-cell :title="$t('m.issuer')" :value="this.subject.issuer"
        :to="{name:'Subject', params:{id:this.subject.id,issuer:'issuer'}}" is-link></mt-cell>
    </div>
    <div class="detail-description">
      <mt-cell :title="$t('m.tokenDescription')" is-link :to="{name:'Description'}"></mt-cell>
    </div>
    <!-- 分利宝 -->
    <div class="home-divided-treasure" v-if="this.listData.length>0">
      <div class="detail-flb">
        <router-link :to="{name:'ReleaseHistory'}">
          <p class="detail-flb-title">{{$t('m.fenlibao')}}<span class="fr">{{$t('m.all')}} ></span></p>
        </router-link>
        <div class="detail-flb-token" v-for="(item,index) in listData" v-if="index<1">
          <div class="detail-flb-token-top">
            <img :src="item.token.icon" alt="" class="fl">
            <span>
              {{item.token.code}} ({{item.token.nickname}})
              <p>{{item.token.subject}}</p>
            </span>
          </div>
          <div class="detail-flb-token-bot">
            <p><span> {{$t('m.theTerm')}} {{item.freeze_days}}{{$t('m.day')}}</span><span class="fr rate">
                {{item.air|number}}%</span></p>
            <p><span>{{$t('m.highestTransfer')}} {{item.high_amount|number}}</span><span class="fr">{{$t('m.interestRate')}}</span></p>
          </div>
        </div>
      </div>
    </div>
    <!-- 发行情况 -->
    <div class="detail-issued" v-if="this.listData.length>0">
      <router-link :to="{name:'Issuance',params:{token:release.token,icon:detailData.icon}}">
        <p class="detail-flb-title">{{$t('m.issuance')}}<span class="fr">{{$t('m.all')}} ></span></p>
      </router-link>
      <div class="detail-issued-token">
        <div class="detail-issued-token-top">
          <img :src="detailData.icon" alt="" class="fl icon">
          <span>
            {{detailData.code}} ({{detailData.nickname}})
            <!-- <p>{{subject.name}}</p> -->
          </span>
          <span class="fr publicity" v-if="release.status==0"><img src="../../../assets/images/gs.svg" alt="">公示中</span>
            <span class="fr issue" v-if="release.status==1"><img src="../../../assets/images/clock.svg" alt="">{{$t('m.processing')}}</span>
        </div>
        <div class="detail-issued-token-bot">
          <div class="detail-issued-token-bot-left fl">
            <span>{{$t('m.first')}}{{release.periods}}{{$t('m.qi')}}</span> <span class="fr"><img src="../../../assets/images/lock.svg" alt="">
              {{release.freeze_days}} {{$t('m.day')}}</span>
          </div>
          <div class="detail-issued-token-bot-right fr">
            <img :src="release.d_icon" alt=""> <span>{{release.issue_price|number}}</span>
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
        subject: '',
        release: '',
        listData: '',
      }
    },
    created() {
      this.getDetail()
      this.list()
    },
    methods: {
      //获取详情
      getDetail() {
        api.tokenDetail({ code: this.$route.params.code || this.detail.token.code }).then(res => {
          this.detailData = res.data
          this.subject = res.data.subject
          this.release = res.data.release
          // this.$store.commit('detail', res.data)
        })
          .catch(err => {
            console.log(err)
          })
      },
      // 分利宝
      list() {
        api.flList({ admin: true, code: this.$route.params.code || this.detail.token.code }).then(res => {
          if (res.code == 0) {
            this.listData = res.data
          }
        }).catch(err => {

        })
      },
      //复制
      copy() {
        var clipboard = new Clipboard('.tag-read')
        clipboard.on('success', e => {
          this.$toast({
            // message: '复制成功',
            message: '복사성공',
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
      color: #333;

      span {
        font-size: 24px;
      }
    }

    .mint-cell-value {
      span {
        font-size: 12px;
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

      img {
        height: 30px;
        position: relative;
        top: 30px;
        right: 30px;
        z-index: 1;
      }

      .overflow-text {
        span {
          margin-right: 40px;
        }
      }
    }

    .detail-description {
      background-color: #fff;
      margin: 20px 24px;
    }

    .mint-cell-text {
      margin-left: -13px;
      font-size: 14px;
    }

    .detail-flb {
      margin: 0 24px;

      .detail-flb-token {
        background-color: #fff;

        .detail-flb-token-top {
          height: 110px;
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
          margin: 0 20px 0 30px;

          p {
            padding-bottom: 20px;
          }

          .rate {
            font-size: 40px;
            color: #EA1515;
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
          height: 110px;

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
          border-top-right-radius: 10px;
          font-size: 26px;
          color: #06B56A;
          margin-right: 40px;
          img {
            margin-right: 7px;
            width: 26px;
          }
        }
        .issue {
            font-size: 26px;
            color: #37A7E1;
            margin-right: 40px;

            img {
              margin-right: 7px;
              width: 26px;
            }
          }
        }

        .detail-issued-token-bot {
          margin: 0 20px 0 30px;

          .detail-issued-token-bot-left {
            width: 60%;
          }

          img {
            height: 30px;
          }

          span {
            color: #036EB8;
          }
        }
      }
    }
  }
</style>