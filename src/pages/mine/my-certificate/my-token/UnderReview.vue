<template>
  <div class="under-review">
    <div class="token-header header">
      <mt-header fixed :title="$t('m.myToken')">
          <!-- v-on:click="$router.go(-1) -->
        <mt-button icon="back" slot="left" @click="back">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="under-review-body">
      <img src="../../../../assets/images/review.svg" alt="">
      <p>审核中</p>
      <p class="time">平台将在1-2个工作日内完成认证审核</p>
      <span class="tel tag-read"  @click="copy"  data-clipboard-text="kefu@paltoland.com">有疑问？联系我们:kefu@paltoland.com
        <img src="../../../../assets/images/copy.svg" alt="" class="fr">
      </span>
    </div>
    <div class="under-review-time">
      <mt-cell title="申请时间">{{this.$route.params.time}}</mt-cell>
      <mt-cell title="认证通证" class="under-review-token">
        <img :src="this.$route.params.token.icon" alt="">
        <span class="under-review-text">
          <p>{{this.$route.params.token.code}} ({{this.$route.params.token.nickname}})</p>
          <p>{{this.$route.params.token.subject}}</p>
        </span>
      </mt-cell>
    </div>
  </div>
</template>
<script>
  import Clipboard from 'clipboard'
  export default {
    data() {
      return {

      }
    },
    created() {
    },
    methods: {
      back(){
        this.$router.push({
          name:'Mine'
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
    }
  }
</script>
<style lang="scss">
  @import '../../../../assets/scss/global';

  .under-review {
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: fixed;

    .mint-header.is-fixed {
      border-bottom: 1px solid #f2f2f2;
    }

    .under-review-body {
      margin-top: 160px;

      img {
        height: 100px;
        margin: 40px auto;
        display: block;
      }

      p {
        text-align: center;
        margin: 40px 0;
      }

      .time {
        color: #999;
        font-size: 28px;
      }

      .tel {
        color: #036EB8;
        font-size: 28px;
        display: block;
        text-align: center;

        img {
          width: 0.4rem;
          position: relative;
          top: -66px;
          right: 84px;
          z-index: 1;
        }
      }
    }

    .under-review-time {
      margin-top: 40px;
      .under-review-token {
        img {
          width: 40px;
          margin-right: 10px;
        }

        .under-review-text {
          font-size: 24px;
        }
      }
    }
  }
</style>