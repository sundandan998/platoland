<template>
  <div>
    <mt-field placeholder="请选择锁仓期限 >" readonly  @click.native="showPicker = true" v-model="releaseParams.freeze_days">
      <van-popup v-model="showPicker" position="bottom">
  <van-picker
    show-toolbar
    :columns="columns"
    @cancel="showPicker = false"
    @confirm="onConfirm"
  />
</van-popup>
    </mt-field>
  </div>
</template>
<script>
</script>