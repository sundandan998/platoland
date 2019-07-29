<template>
  <div class="drawer">
    <div>11111</div>

    <div class="setbox" :class="{show: isshow}">
      <div class="header">
        <p class="fl">标题</p>
        <button class="off">{{date}}</button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        date: new Date()
      };
    },
    mounted() {
      let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
      this.timer = setInterval(() => {
        _this.date = new Date(); // 修改数据date
      }, 1000)
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
      }
    }
  };
</script>