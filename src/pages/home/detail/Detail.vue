<template>
  <div class="pass-details-issue">
    <div class="pass-details-header">
      <mt-header fixed :title="$t('m.passdetails')">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="pass-details-information">
      <div class="pass-details-information-header">
        <span>{{$t('m.essentialinformation')}}</span>
      </div>
      <div class="pass-details-information-content">
        <!-- 通证标识 -->
        <mt-cell :title="$t('m.identitycard')">
          <img :src="detail.icon" alt="">
          {{detail.code +'('+detail.name+')'}}
        </mt-cell>
        <!-- 通证昵称 -->
        <mt-cell :title="$t('m.nickname')" :value="detail.nickname"></mt-cell>
        <!-- 合约地址 -->
        <span @click="copy" class=" overflow-text tag-read" :data-clipboard-text="this.detail.contract_address">
          <mt-cell :title="$t('m.address')" :value="this.detail.contract_address"></mt-cell>
        </span>
        <!-- 通证主体 -->
        <mt-cell :title="$t('m.body')" :value="this.subject.name" :to="{name:'Subject', params:{id:this.subject.id}}"
          is-link></mt-cell>
        <!-- 发行方 -->
        <mt-cell :title="$t('m.issuer')" :value="this.subject.issuer"></mt-cell>
      </div>
    </div>
    <div class="pass-details-issue-data">
      <div class="pass-details-issue-data-header">
        <span>{{$t('m.issuedata')}}</span>
      </div>
      <div class="pass-details-issue-data-content">
        <!-- 发行状态 -->
        <mt-cell :title="$t('m.issuingstate')" :value="release.status==0?'待发行':release.status==1?'发行中':'流通中'"></mt-cell>
        <!-- 锁定期限 -->
        <mt-cell v-if="release.freeze_days != 0" title="锁定期限" :value="release.freeze_days+'天'"></mt-cell>
        <!-- 计价资产 -->
        <mt-cell :title="$t('m.valuationassets')" :value="release.denominated_assets"></mt-cell>
        <!-- 初始单价 -->
        <mt-cell :title="$t('m.initialprice')" :value="release.init_price|number"></mt-cell>
        <!-- 发行单价 -->
        <mt-cell :title="$t('m.issueprice')" :value="release.issue_price|number"></mt-cell>
        <!-- 发行总量 -->
        <mt-cell :title="$t('m.issuenum')" :value="release.first_number|number"></mt-cell>
        <!-- 起购数量 -->
        <mt-cell :title="$t('m.purchasenum')" :value="release.purchase_number|number"></mt-cell>
        <!-- 发行方式 -->
        <mt-cell :title="$t('m.mode')" :value="release.issuance_method"></mt-cell>
        <!-- 发行时间 -->
        <mt-cell :title="$t('m.issuetime')" :value="release.publish_time"></mt-cell>
        <!-- 截止时间 -->
        <mt-cell :title="$t('m.endtime')" :value="release.end_time"></mt-cell>
        <!-- 最小发行量 -->
        <mt-cell :title="$t('m.minnum')" :value="release.minimum_number|number"></mt-cell>
        <!-- 股权发行比例 -->
        <mt-cell :title="$t('m.proportion')" :value="release.equity_issuance_ratio+'%'"></mt-cell>
      </div>
    </div>
    <div class="pass-details-issue-btn" id="transaction">
      <!-- <router-link :to="/deal/+detailData.code"> -->
      <router-link :to="{name:'Deal',params:{code:this.detailData.code}}">
        <mt-button type="primary" size="large">{{$t('m.dealwith')}}</mt-button>
      </router-link>
    </div>
    <div class="pass-details-issue-btn" id="purchase">
      <!-- <router-link to="/buy"> -->
      <router-link :to="{name:'Buy',params:{id:'explore'}}">
        <mt-button type="primary" size="large">{{$t('m.buy')}}</mt-button>
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import Clipboard from 'clipboard'
  import { mapGetters } from 'vuex'
  import api from '@/api/token/Token'
  export default {
    data() {
      return {
        data: [],
        show: '',
        detailData: {},
        detailId: {},
        subject: {},
        release: {},
        status: '',
        // id:{}
      }
    },
    created() {
      // console.log(this.$route.params.id)
      this.detailId = this.$route.params
      this.getDetail()
    },
    beforeUpdate() {
      this.status = this.detail.release.status
      if (this.status == '0') {
        document.getElementById("transaction").style.display = "none"
        document.getElementById("purchase").style.display = "none"
      } else if (this.status == '1') {
        document.getElementById("transaction").style.display = "none"
        document.getElementById("purchase").style.display = "block"
      } else if (this.status == '2') {
        document.getElementById("purchase").style.display = "none"
        document.getElementById("transaction").style.display = "block"
      }
    },
    methods: {
      //获取详情
      getDetail() {
        api.tokenDetail(this.$route.params).then(res => {
          this.detailData = res.data
          this.subject = res.data.subject
          this.release = res.data.release
          this.$store.commit('detail', res.data)
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

  .pass-details-information-content {
    .overflow-text {
      .mint-cell-value {
        width: 40%;
        text-align: right;
        display: inline-block;
      }
    }
  }
</style>