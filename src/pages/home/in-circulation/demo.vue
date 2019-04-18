<template>
  <div class="demo">
    <ul>
      <li
        class="list_every"
        v-for="(item, index) in getData"
        :key="index"
        v-if="item.hidden!=0"
        @click.parent="removeData(item.khhlhhh)"
      >
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
      getData: [
        {
          khhlhhh: "102100000634",
          khhmc: "中国工商银行股份有限公司北京惠新支行"
        },
        {
          khhlhhh: "102100024914",
          khhmc: "中国工商银行股份有限公司北京福熙大道支行"
        },
        {
          khhlhhh: "102100077776",
          khhmc: "中国工商银行股份有限公司俄罗斯人民币业务清算行"
        },
        {
          khhlhhh: "102100028469",
          khhmc: "中国工商银行股份有限公司北京望京新城支行"
        },
        { khhlhhh: "104100005694", khhmc: "中国银行北京人大支行" },
        {
          khhlhhh: "104100004595",
          khhmc: "中国银行股份有限公司北京北极寺支行"
        },
        { khhlhhh: "104100004511", khhmc: "中国银行北京延庆支行" },
        {
          khhlhhh: "104100004503",
          khhmc: "中国银行股份有限公司北京安定路支行"
        },
        { khhlhhh: "104100004499", khhmc: "中国银行北京西城支行" },
        {
          khhlhhh: "105110053065",
          khhmc: "中国建设银行股份有限公司天津欣嘉园支行"
        },
        {
          khhlhhh: "105110052941",
          khhmc: "中国建设银行股份有限公司天津金色雅筑支行"
        },
        {
          khhlhhh: "105110052683",
          khhmc: "中国建设银行股份有限公司天津海天馨苑支行"
        },
        {
          khhlhhh: "105110052388",
          khhmc: "中国建设银行股份有限公司天津太阳城支行"
        },
        { khhlhhh: "105110052064", khhmc: "中国建设银行天津滨河小区支行" },
        {
          khhlhhh: "105110050704",
          khhmc: "中国建设银行股份有限公司天津领世郡支行"
        },
        {
          khhlhhh: "105110051192",
          khhmc: "中国建设银行股份有限公司天津日纬路支行"
        }
      ]
    };
  },
  created() {},
  methods: {
    removeData(a) {
      let newGetData = this.getData;
      let temporary = newGetData.map((item, index) => {
        if (item.khhlhhh == a) {
          item.hidden = 0;
          this.$router.push({name:'rank',params:item})
        }
        return item
      });
      this.getData = temporary;
    }
  }
};
</script>

<style lang="scss">
.list_every {
  clear: both;
  width: 100%;
  background: #fff;
  margin-bottom: 8px;
  height: 50px;
  line-height: 22px;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 3px 5px;
}

.list_every span {
  font-size: 12px;
}

.demo {
  height: 100%;
  background: #222;
  min-height: 300px;
  position: relative;
  z-index: 9;
  padding-top: 18px;
  padding-left: 10px;
  padding-right: 10px;
  color: #333;
}
</style>

