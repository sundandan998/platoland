<template>
  <div class="assest">
    <div class="assest-header">
      <mt-header title="资产">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <mt-button icon slot="right">
          <router-link to="/detailedlist">
            <img src="../../../assets/images/u2666.png" alt>明细
          </router-link>
        </mt-button>
      </mt-header>
    </div>
    <div class="assets-list">
      <router-link to="/list">
        <img src="../../../assets/images/u3511.png" alt>
      </router-link>
    </div>
    <div class="certificate-list-card">
      <ul>
        <li v-for="(item, index) in addList" :key="index">
          <router-link to="/pass">
            <img src="../../../assets/images/u345.png" alt class="fl">
            <span>{{item.name}}</span>
            <span>{{item.company}}</span>
            <div class="assets-list-right fr">
              <p>6.00</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
let globalList = []
export default {
  data() {
   return {
       addList:globalList,
   }
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
     let arr = globalList
     if(JSON.stringify(path) != '{}'){
         arr.push(path)
         globalList = arr
         this.addList =globalList
     }
   }
  }
};
</script>

<style lang="scss">
@import "../../../assets/scss/global";
</style>