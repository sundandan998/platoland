<template>
  <div class="pass-details-issue">
    <div class="pass-details-header">
      <mt-header fixed :title="$t('m.passdetails')">
          <mt-button icon="back" slot="left"v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="pass-details-information">
      <div class="pass-details-information-header">
        <span>{{$t('m.essentialinformation')}}</span>
      </div>
      <div class="pass-details-information-content">
        <mt-cell :title="$t('m.passdetails')" :value="this.detail.id"></mt-cell>
        <mt-cell :title="$t('m.nickname')" :value="this.detail.nickname"></mt-cell>
        <mt-cell :title="$t('m.address')" :value="this.detail.address"></mt-cell>
        <mt-cell :title="$t('m.body')" :value="this.detail.body"  to="/subject" is-link></mt-cell>
        <mt-cell :title="$t('m.issuer')" :value="this.detail.issuer"></mt-cell>
      </div>
    </div>
    <div class="pass-details-issue-data">
      <div class="pass-details-issue-data-header">
        <span>发行数据</span>
      </div>
      <div class="pass-details-issue-data-content">
        <mt-cell :title="$t('m.issuingstate')" :value="this.detail.state"></mt-cell>
        <mt-cell :title="$t('m.proportion')" :value="this.detail.proportion"></mt-cell>
        <mt-cell :title="$t('m.valuationassets')" :value="this.detail.assets"></mt-cell>
        <mt-cell :title="$t('m.mode')" :value="this.detail.mode"></mt-cell>
        <mt-cell :title="$t('m.issuetime')" :value="this.detail.issuetime"></mt-cell>
        <mt-cell :title="$t('m.endtime')" :value="this.detail.endtime"></mt-cell>
        <mt-cell :title="$t('m.minnum')" :value="this.detail.minnum"></mt-cell>
        <mt-cell :title="$t('m.issuenum')" :value="this.detail.amountnum"></mt-cell>
        <mt-cell :title="$t('m.purchasenum')" :value="this.detail.purchasenum"></mt-cell>
        <mt-cell :title="$t('m.soldnum')" :value="this.detail.soldnum"></mt-cell>
        <mt-cell :title="$t('m.initialprice')" :value="this.detail.initialprice"></mt-cell>
        <mt-cell :title="$t('m.issueprice')" :value="this.detail.issueprice"></mt-cell>
      </div>
    </div>
    <div class="pass-details-issue-btn" id="transaction">
      <router-link to="/deal">
        <mt-button type="primary" size="large">去交易</mt-button>
      </router-link>
    </div>
    <div class="pass-details-issue-btn" id="purchase">
      <router-link to="buy">
        <mt-button type="primary" size="large">{{$t('m.buy')}}</mt-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import Clipboard from 'clipboard'
import {mapGetters} from 'vuex'
export default {
  created(){
//    console.log(this.$store.state.app.detail)
//    console.log(this.$store.state.app.detail[0].id)
  },
  data() {
      return {
        detailslist:[],
        data:[],
        show:''
      }
  },
  mounted() {
    this.showbtn()
  },

  methods:{
//    复制
    copy() {
          var clipboard = new Clipboard('.tag-read')
          clipboard.on('success', e => {
            console.log('复制成功')
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
    showbtn(){
//      debugger
      if(this.detail.state== '待发行'){
        document.getElementById("transaction").style.display="none"
        document.getElementById("purchase").style.display="none"
      }else if(this.detail.state== '发行中'){
        document.getElementById("transaction").style.display="none"
        document.getElementById("purchase").style.display="block"
      }else if(this.detail.state== '流通中'){
        document.getElementById("purchase").style.display="none"
        document.getElementById("transaction").style.display="block"
      }
    }
  },
  computed:{
    ...mapGetters([
        'detail'
      ])
  }
}

</script>

<style lang="scss">
  @import '../../../assets/scss/global'
</style>
