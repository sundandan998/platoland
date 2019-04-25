<template>
  <div class="add-address">
    <div class="add-address-header">
      <mt-header fixed title="添加地址">
        <router-link to="/book" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="add-adress-list formData">
      <span>备注名称:</span>
      <mt-field></mt-field>
      <span>描述:</span>
      <mt-field></mt-field>
      <router-link to="/list">
        <span v-if="!isData">
          <img src="../../../assets/images/u2693.png" alt>
          添加地址
        </span>
        <span v-else>
          <img src="../../../assets/images/u2693.png" alt>
          替换地址
        </span>
      </router-link>
      <div class="certificate-list-card assets-list-add">
        <ul v-if="isData">
          <li>
            <router-link to="/assetsdetailed">
              <img src="../../../assets/images/u345.png" alt class="fl">
              <span>{{addList.name}}</span>
              <span>{{addList.company}}</span>
              <div class="assets-list-right fr"></div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="add-adress-btn">
      <router-link to="/book">
        <mt-button type="primary" size="large">添加</mt-button>
      </router-link>
    </div>
    <div class="edit-adress-text">
      <p>注意：资金转出到其他账户后无法退回，请务必核实：</p>
      <p>1.对方信息是否正确</p>
      <p>2.账号是否是其本人使用</p>
    </div>
  </div>
</template>

<script>
let globalList = {};
export default {
  data() {
    return {
      username: "",
      addList: globalList,
      isData: false
    };
  },
  created() {
    this.getparameter();
  },
  watch: {
    $route: "getparameter"
  },
  methods: {
    openaction() {
      this.sheetVisible = !this.sheetVisible;
    },
    getparameter() {
      let path = this.$route.params;
      if (JSON.stringify(path) != "{}") {
        path = this.$route.params;
        globalList = path;
        this.isData = true;
        this.addList = globalList;
      } else {
        this.isData = false;
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../../assets/scss/global";
.formData {
  margin-top: 50px !important;
}
.add-address .certificate-list-card {
  padding-bottom: 10px;
}
.add-address .certificate-list-card li {
  height: 70px;
  width: 90%;
  background-color: #fff;
  margin: 10px auto;
  border-radius: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom: 1px solid #ccc;
}
</style>