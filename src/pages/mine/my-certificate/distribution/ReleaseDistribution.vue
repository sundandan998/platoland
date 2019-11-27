<template>
  <div class="release">
    <div class="release-header header">
      <mt-header fixed title="发布分利计划">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="release-token">
      <div class="home-pub-token">
        <img src="../../../../assets/images/life-icon.png" alt="" class="fl icon">
        <span><b>LIFE+</b>(来福家) <p>斯帕尔克细胞</p></span>
      </div>
    </div>
    <div class="release-item">
      <p>分利总额</p>
      <mt-field placeholder="请输入整数"></mt-field>
      <p>锁仓期限</p>
      <mt-field placeholder="请选择锁仓期限 >" @click.native="actionSheet">
        <mt-actionsheet :actions="data" v-model="sheetVisible">{{}}</mt-actionsheet>
      </mt-field>
      <p>年化利率</p>
      <mt-field placeholder="0~100 %"></mt-field>
      <p>转入限额</p>
      <mt-field placeholder="请输入用户名"></mt-field>
      <div class="release-interest">
        <span>支付利息</span>
        <span>可用数量</span>
      </div>
    </div>
    <div class="release-button">
      <van-button type="warning" size="large">确定发布</van-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data: [{
          name: '7天',
        }, {
          name: '15天',
        }, {
          name: '30天',
        }, {
          name: '60天',
        }, {
          name: '90天',
        }, {
          name: '180天',
        }, {
          name: '360天',
        }],
        sheetVisible: false,
      }
    },
    methods: {
      actionSheet() {
        this.sheetVisible = true
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../../assets/scss/global';
  .release {
    .release-token {
      border-radius: 10px;
      background-color: #fff;
      margin: 90px 24px 10px 24px;
    }

    .release-item {
      margin: 0 24px;
      background-color: #fff;
      border-radius: 10px;

      p {
        margin: 0 50px;
        font-size: 26px;
      }

      .mint-field-core {
        text-align: right;
      }

      .release-interest {
        text-align: right;
        padding-bottom: 10px;

        span {
          display: block;
          color: #036EB8;
          margin-right: 30px;
        }
      }
    }
  }
</style>