<template>
  <div class="freeze">
    <div class="freeze-header">
      <mt-header fixed title="冻结详情">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="freeze-down-menu">
  
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/scss/global';
</style>