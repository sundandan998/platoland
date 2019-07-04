<template>
  <div>
    <h1>time</h1>
  </div>
</template>
<script>
  export default {
    created(){
      this.filter()
    },
    methods: {
      filter(end_time, start_time) {
        if (start_time == 0) {
          var today = new Date(); //当前时间
          start_time = Math.ceil(today.getTime() / 1000);
        }
        var day = Math.ceil((end_time - start_time) / 86400);
        if (day < 0) {
          day = 0;
        }
        return day
        console.log(day)
      }
    }

  }

</script>