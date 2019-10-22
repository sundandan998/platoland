<template>
  <div class="invite-people">
    <!-- 头部 -->
    <div class="invite-header">
      <mt-header fixed title="邀请新人">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <!-- 邀请码 -->
    <div class="invite-code">
      <span>您的邀请码</span>
      <p>tre</p>
    </div>
    <div class="invite-code-copy">
      <span>复制</span>
    </div>
  </div>
</template>
<script>
</script>
<style lang="scss">
  @import '../../../assets/scss/global';

  .invite-people {
    .invite-header {
      margin-bottom: 40px;
    }
    .invite-code {
      text-align: center;
    }
    .invite-code-copy {
      width: 20%;
      background-color: #009688;
      color:#fff;
      text-align: center;
      margin:0 auto;
      border-radius:7px;
    }

  }
</style>