<template>
  <div class="description">
    <div class="description-header">
      <mt-header fixed title="效用说明">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="description-img">
      <img src="../../../assets/images/description.jpg" alt="">
    </div>
  </div>
</template>
<script>
</script>
<style lang="scss">
  @import '../../../assets/scss/global';

  .description {
    .description-img {
      img {
        width: 100%;
        margin: 80px auto 0 auto;
      }
    }
  }
</style>