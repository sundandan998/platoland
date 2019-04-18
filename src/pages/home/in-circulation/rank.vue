<template>
  <div class="rank">
    <router-link to="/demo">
      <span class="add">添加</span>
    </router-link>
    <ul>
      <li class="list_every" v-for="(item, index) in addList" :key="index">
          <p>{{item.khhlhhh}}</p>
          <span>{{item.khhmc}}</span>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
        parnet:this.$route.params,
        addList:[]
    };
  },
  created(){
      this.getparameter()
  },
  watch:{
    '$route':'getparameter'
  },
  methods: {
      getparameter(){
          let path = this.$route.params
          let arr = this.addList
          if(JSON.stringify(path) != '{}'){
              arr.push(path)
              this.addList = arr
          }
      }
  }
};
</script>

<style lang="scss">
.rank {
  padding-top: 88px;
  padding-left: 10px;
  padding-right: 10px;
}
.add{
    float: right ;
    margin :10px 5px;
    color: #000;
    font-weight: bold;
}
.list_every{
    clear: both;
    width: 100%;
    background :#fff;
    margin-bottom :8px;
    height :50px;
    line-height :22px;
    border-radius :5px;
    box-sizing: border-box;
    padding: 3px 5px;
    color :#333;
}
.list_every span{
    font-size :12px;
}
</style>
