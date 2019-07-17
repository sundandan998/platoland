<template>
  <div>
    <mt-button @click.native="handleClick">按钮</mt-button>
  </div>
</template>
<script>
  export default {
    data() { },
    methods: {
      handleClick: function () {
        this.$toast('Hello world!')
      }
    }
  }
</script>