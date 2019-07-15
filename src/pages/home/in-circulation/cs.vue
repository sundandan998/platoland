<template>
  <div class="info">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="info_crumb">
      <el-breadcrumb-item>会展行业引擎</el-breadcrumb-item>
      <el-breadcrumb-item>会展政策管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="conference">
      <div class="search">
        <el-input placeholder="政策名称" style="margin:0px 0px 20px 300px;width:520px;" v-model="name"
                  @keydown.native.enter="listpolicyList()"></el-input>
        <el-button class="btton" type="primary" slot="append" icon="el-icon-search" style='width:140px;color:#fff;'
                   @click="listpolicyList()">搜索
        </el-button>
        <!-- <el-button class="bttonRight" type="primary" slot="append" icon="el-icon-search" style='width:120px;color:#fff;' @click="listpolicyList()">高级查询</el-button> -->
        <el-button type="primary" class="advanceSearch" icon="el-icon-search" @click="advanSearch()">高级搜索</el-button>
        <el-button class="bttonbottom" type="success" plain @click="addus()" style="width:140px;">+ 会展政策信息</el-button>
      </div>
      <div class="checkbox">
        <div class="city">
          <el-radio-group v-model="radio3" text-color='#2f87b9' fill='#fff' @change="listpolicyList()">
            <div class="city_left">
              <el-radio-button label="城市 |" disabled class="shoyge"></el-radio-button>
            </div>
            <div class="city_right">
              <el-radio-button label="">全国</el-radio-button>
              <el-radio-button :label="item.cityName" v-for="item in PolicyPositionList"
                               :key="item.cityId"></el-radio-button>
            </div>
          </el-radio-group>
        </div>
        <div class="industry">
          <el-radio-group v-model="radio4" text-color='#2f87b9' fill='#fff' >
            <div class="industry_left">
              <el-radio-button label="政策类型 |" disabled class="shoyge"></el-radio-button>
            </div>
            <div class="industry_right">
              <el-radio-button label="">全部</el-radio-button>
                <!--<el-radio-button :label="item.policyTypeName" v-for="item in lxLis"
                                 :key="item.policyTypeId"  ></el-radio-button>-->
             <!-- @click.native.prevent="clickBar(item.policyTypeId)" @change="listpolicyList()"-->
              <el-radio-button @click.native="clickBar(10001)" label="供给型" ></el-radio-button>
              <el-radio-button @click.native="clickBar(10002)" label="环境型" ></el-radio-button>
              <el-radio-button @click.native="clickBar(10003)" label="需求型" ></el-radio-button>
            </div>
          </el-radio-group>
        </div>
        <div class="industry">
          <!-- <div class="year">-->
          <el-radio-group v-model="radio5" text-color='#2f87b9' fill='#fff' @change="listpolicyList()">
            <!-- <div class="year_left">-->
            <div class="industry_left">
              <el-radio-button label="政策类别 |" disabled class="shoyge"></el-radio-button>
            </div>
            <div class="industry_right">
              <!--
                          <div class="year_right">
              -->
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button :label="item.policyCateName" v-for="item in listpe" :key="item.id"></el-radio-button>
            </div>
          </el-radio-group>
        </div>

      </div>
      <div class="titme">
        <div class="titme-div">
          <p>会展AI为你找到 <span> {{total}}</span> 个会展政策</p>
          <el-select v-model="sortBy" placeholder="请选择时间" class="select" @change="listpolicyList()">
            <el-option label="请选择" value=""></el-option>
            <el-option label="按发文时间降序" value="0"></el-option>
            <el-option label="按发文时间升序" value="1"></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="tablelist">
      <div class="fold">
        <ul>
          <li class="lilili" v-for="item in Listpolicy" :key="item.id">
            <div class="bgimage">
              <p :title='item.wordSizes'>{{item.policyLevelName}}</p>
            </div>
            <div class="two">
              <h3 @click="delele(item.uuid)" style="font-size:20px;color:#000">{{item.policyName}}</h3>
              <ul class="uldaone">
                <li class="lione">
                  <p>发文单位 : </p>
                  <span>{{item.workUnit}}</span>
                </li>
                <li>
                  <p>政策类别 : </p>
                  <span>{{item.policyCateName}}</span>
                </li>
              </ul>
              <ul class="uldatwo">
                <li>
                  <p>发文时间 : </p>
                  <span v-if="item.dispatchTime != null || item.dispatchTime != undefined">{{item.dispatchTime | dateFmt('YYYY-MM-DD')}}</span>
                </li>
                <li>
                  <p>政策类型 : </p>
                  <span>{{item.policyTypeName}}</span>
                </li>

              </ul>
            </div>
            <div class="therr">
              <h3>{{item.cityName}}</h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[5, 10, 15, 20,25]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!--高级搜索浮层-->
    <el-dialog class="advance-search-model"
               title="会展政策信息"
               :visible.sync="showForm"
               width="800px"
               :modal="true"
               :center="true"
               :modal-append-to-body="false">

      <el-row :gutter="10">
        <el-col :span="4" class="advance-search-label">政策文件名称</el-col>
        <el-col :span="8">
          <el-input v-model="form.policyName" placeholder="请输入政策文件名称"></el-input>
        </el-col>
        <el-col :span="4" class="advance-search-label">发文单位</el-col>
        <el-col :span="8">
          <el-input v-model="form.workUnit" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="4" class="advance-search-label">政策原文</el-col>
        <el-col :span="8">
          <el-input v-model="form.details" placeholder="请输入政策原文"></el-input>
        </el-col>
        <el-col :span="4" class="advance-search-label">发文字号</el-col>
        <el-col :span="8">
          <el-input v-model="form.wordSizes" placeholder="请输入发文字号"></el-input>
        </el-col>
      </el-row>


      <el-row :gutter="10">
        <el-col :span="4" class="advance-search-label">发文开始时间</el-col>
        <el-col :span="9">
          <el-date-picker
            v-model="form.startTime"
            type="date"
            placeholder="开始日期">
          </el-date-picker>
        </el-col>
        <el-col :span="3" class="advance-search-label">发文结束时间</el-col>
        <el-col :span="7">
          <el-date-picker
            v-model="form.endTime"
            type="date"
            placeholder="结束日期">
          </el-date-picker>
        </el-col>
      </el-row>

      <!--<el-row :gutter="10">-->
      <!--<el-col :span="4" class="advance-search-label">结束时间</el-col>-->
      <!--<el-col :span="9">-->
      <!--<el-date-picker-->
      <!--v-model="form.endTime"-->
      <!--type="date"-->
      <!--placeholder="选择日期">-->
      <!--</el-date-picker>-->
      <!--</el-col>-->
      <!--</el-row>-->


      <!--<el-row :gutter="10">-->
      <!--<el-col :span="4" class="advance-search-label">发文时间</el-col>-->
      <!--<el-col :span="9">-->
      <!--<el-date-picker-->
      <!--v-model="form.dispatchTime"-->
      <!--type="daterange"-->
      <!--range-separator="至"-->
      <!--format="YYYY 年 MM 月 dd 日" value-format="YYYY-MM-DD"-->
      <!--start-placeholder="开始日期"-->
      <!--end-placeholder="结束日期">-->
      <!--</el-date-picker>-->
      <!--</el-col>-->
      <!--</el-row>-->

      <el-row :gutter="10">
        <el-col :span="4" class="advance-search-label">行政区划</el-col>
        <el-col :span="8">
          <el-select v-model="form.cityName" placeholder="请选择城市">
            <el-option v-for="item in PolicyPositionList" :key="item.id" :label='item.cityName'
                       :value="item.cityName"></el-option>

          </el-select>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="4" class="advance-search-label">政策类型</el-col>
        <el-col :span="8">
          <el-select v-model="form.policyTypeName" placeholder="请选择政策类型">
            <el-option :label="item.policyTypeName" v-for="item in lxLis" :key="item.policyTypeName"
                       :value="item.policyTypeName"></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="4" class="advance-search-label">政策类别</el-col>
        <el-col :span="8">
          <el-select v-model="form.policyCateName" placeholder="请选择政策类别">
            <el-option :label="item.policyCateName" v-for="item in listpe" :key="item.policyCateName"
                       :value="item.policyCateName"></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="4" class="advance-search-label">政策级别</el-col>
        <el-col :span="8">
          <el-select v-model="form.policyLevelName" placeholder="请选择政策法规">
            <el-option :label="item.policyLevelName" v-for="item in PolicyList" :key="item.policyLevelName"
                       :value="item.policyLevelName"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <div style="text-align: center">
        <el-button @click="resetHeightSet" style="width: 140px">重置搜索条件</el-button>
        <el-button @click="highSearch" style="width: 140px">查 询</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>


  export default {
    data() {
      return {
        value5: '',
        parentId: '',
        radio3: '',
        radio4: '',
        radio5: '',
        deleteFormVisible: false,
        dialogFormVisible: false,
        name: '', //搜索条件
        total: 0, // 数据总条数
        pageSize: 5, // 每页显示多少条
        page: 1, // 当前页码
        listpe: [], // 类别数组
        lxLis: [], // 类型数组
        Listpolicy: [], // 数据列表
        sortBy: '0', //排序
        formLabelWidth: '120px',
        PolicyPositionList: [], //城市列表
        PolicyList: [],// 政策级别
        showForm: false, // 显示高级搜索浮层
        form: {
          policyName: '', // 政策文件名称
          workUnit: '', //发文单位
          details: '', // 政策原文
          wordSizes: '', //发文字号
          dispatchTime: '', //发文时间
          startTime: '', // 开始时间
          endTime: '', // 结束时间
          cityName: '', //行政区划
          policyTypeName: '', //政策类型
          policyCateName: '', //政策类别
          policyLevelName: '' //政策级别
        },
        searchType: 'normal',
        djaList: []
      };
    },
    mounted() {
      this.listtype("10001") //政策类别
      this.listcategory() //政策类型

      this.PolicyPosition() //城市筛选
      this.PolicyLevelss() // 政策级别
    },
    activated(){
      this.listpolicyList() // 数据列表
    },
    methods: {
      PolicyPosition() {
        // 行政区划
        hotelcityCode().then(res => {
          console.log(res, 888)
          let index = res.data.findIndex(item => item.cityName === '重庆市')
          if (index > -1) {
            let item = res.data.splice(index, 1)[0]
            res.data.unshift(item)
          }
          this.PolicyPositionList = res.data
        })
      },
      handleSizeChange(val) {
        this.pageSize = val;

        if (this.searchType == 'normal') {
          this.listpolicyList() //
        } else {
          this.highSearch()
        }
      },
      handleCurrentChange(val) {

        this.page = val;

        if (this.searchType == 'normal') {
          this.listpolicyList()
        } else {
          this.highSearch()
        }
      },
      //政策类别
      listtype(val) {
        PolicyCates({
          params: {
            policyTypeId: val
          }
        }).then(res => {

          this.listpe = res.data;
        })
      },
      clickBar(val){
        if(val=="10001"){
          //alert(0)
          this.listtype("10001")
        }
        if(val=="10002"){
          //alert(1)
          this.listtype("10002")
        }
        if(val=="10003"){
          //alert(2)
          this.listtype("10003")
        }
      },
      // 政策类型
      listcategory() {
        PolicyTypes().then(res => {
          this.lxLis = res.data
        })
      },
      // 数据列表
      listpolicyList() {
        //点击下一页的类型
        this.searchType = 'normal';
        const params = {
          page: this.page,
          limit: this.pageSize,
          policyName: this.name,
          order: this.sortBy,
          policyCateName: this.radio5,
          policyTypeName: this.radio4,
          cityName: this.radio3
        }
        Policylist({
          params
        }).then(res => {
          //console.log(22222)
          //console.log(this.radio3)
          //console.log(res)
         // this.showForm = false;
          this.Listpolicy = res.data.items;

          if (res.errmsg === '成功') {
            this.total = res.data.total
          }
        })
      },
      PolicyLevelss() {
        // 政策级别
        PolicyLevelss().then(res => {
          console.log('政策级别')
          console.log(res.data)
          this.PolicyList = res.data
        })
      },
      delele(id) {
        this.$router.push({
          path: '/Info_check',
          query: {
            uuid: id
          }
        })
      },
      // 跳转到添加页
      addus() {
        this.$router.push({
          path: '/Info_add'
        })
      },
      advanSearch: function () {
        // 点击高级搜索按钮
        this.showForm = !this.showForm;
        this.page = 1;
        this.searchType = 'search';
      },
      resetHeightSet: function () {
        //重置搜索条件
        this.form = {
          policyName: '', // 政策文件名称
          workUnit: '', //发文单位
          details: '', // 政策原文
          wordSizes: '', //发文字号
          dispatchTime: '', //发文时间
          startTime: '', // 开始时间
          endTime: '', // 结束时间
          cityName: '', //行政区划
          policyTypeName: '', //政策类型
          policyCateName: '', //政策类别
          policyLevelName: '' //政策级别
        }
      },
      highSearch: function () {
        // 高级搜索确认按钮弹出层二次确认
        //发文时间 转换

        // this.form.startTime = this.form.dispatchTime ? this.form.dispatchTime[0] : '';
        // this.form.endTime = this.form.dispatchTime ? this.form.dispatchTime[1] : '';

        const params = {
          page: this.page,
          limit: this.pageSize,
          order: this.sortBy,
          policyName: this.form.policyName, // 政策文件名称
          workUnit: this.form.workUnit, //发文单位
          details: this.form.details, // 政策原文
          wordSizes: this.form.wordSizes, //发文字号
          cityName: this.form.cityName, //行政区划
          policyTypeName: this.form.policyTypeName, //政策类型
          policyCateName: this.form.policyCateName, //政策类别
          policyLevelName: this.form.policyLevelName //政策级别
        }


        let time, time1;
        if (this.form.startTime) {
          time = new Date(this.form.startTime);
          var y = time.getFullYear();
          var m = time.getMonth() + 1;
          var d = time.getDate();
          this.form.startTime = y + "-" + m + "-" + d;
          params.startTime = this.form.startTime
        }

        if (this.form.endTime) {
          time1 = new Date(this.form.endTime);
          var y1 = time1.getFullYear();
          var m1 = time1.getMonth() + 1;
          var d1 = time1.getDate();
          this.form.endTime = y1 + "-" + m1 + "-" + d1;
          params.endTime = this.form.endTime
        }

        if (time && time1 && (time.valueOf() > time1.valueOf())) {
          this.$message.error('开始时间不能大于结束时间！');
          return
        }

        Policylist({
          params
        }).then(res => {
          console.log(22222)
          console.log(res)
          /*this.Listpolicy = res.data.items
          // console.log(this.Listpolicy)
          if (res.errmsg === '成功') {
              this.total = res.data.total
          }*/
          this.showForm = false;

          this.Listpolicy = res.data.items
          // console.log(this.Listpolicy)
          if (res.errmsg === '成功') {
            this.total = res.data.total
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .info {
    width: 95%;
    margin: 0px auto;
  }
    .info_crumb {
      height: 30px;
      font-size: 12px;
      line-height: 30px;
      margin-bottom: 0px;
      background-color: #f5f5f5;
      padding-left: 20px;
      box-sizing: border-box;
      z-index: 999;
      width: 100%;
      color: #000;
    }
    .conference {
      width: 96%;
      margin: 0px auto;
    }
      .search {
        position: relative;
        width: 1160px;
        height: 60px;
        position: relative;
        line-height: 60px;
      }
        .btton {
          text-align: center;
          position: absolute;
          top: 10px;
          left: 680px;
        }
        .bttonbottom {
          position: absolute;
          right: 0px;
          top: 10px;
          /* // padding: 10px 0px; */
        }
        .bttonRight {
          position: absolute;
          right: 210px;
          top: 10.5px;
          font-size: 14px;
          border: 1px solid #023b5b;
          background-color: #06507a;
          box-sizing: border-box;
        }
      .checkbox {
        margin-bottom: 0px;
        width: 100%;
      }
        .city {
          width: 100%;
          position: relative;
        }
          .city_left {
            display: inline-block;
            position: relative;
          }
          .city_right {
            display: inline-block;
          }
        .industry {
          width: 100%;
          position: relative;
        }
          .industry_left {
            display: inline-block;
            position: relative;
            /* // top: -55px;
            // width: 13%; */
          }
          .industry_right {
            display: inline-block;
            /* // width: 86%; */
          }

        .year {
          width: 100%;
          position: relative;
        }
          .year_left {
            display: inline-block;
            position: relative;
            top: -55px;
            /* // width: 13%; */
          }
          .year_right {
            display: inline-block;
            width: 90%;
          }

      .titme {
        height: 60px;
      }
        .titme-div {
          margin-left: 20px;
          height: 60px;
          line-height: 60px;
        }
          p {
            display: inline-block;
          }
            /* // height: 60px; */
            span {
              color: #f32f46;
              font-size: 20px;
            }
          .select {
            float: right;
            right: 0px;
          }
    .tablelist {
      border-top: 1px solid #e6e6e6;
      margin-top: 10px;
      position: relative;
    }
      .fold {
        width: 1200px;
        margin: 0px auto;
        border: 1px solid #e6e6e6;
        padding: 20px;
        box-sizing: border-box;
        margin-top: 20px;
      }
      .fold ul .lilili {
            padding: 0px;
            border-bottom: 1px solid #c9c9c9;
            box-sizing: border-box;
            padding: 20px;
            width: 100%;
            height: 190px;
      }
            .bgimage {
              float: left;
              /* // display: inline-block; */
              width: 200px;
              height: 150px;
              /* background: url('../../assets/imgs.png') no-repeat; */
              text-align: center;
              position: relative;
            }
              p {
                font-size: 24px;
                letter-spacing: 7px;
                color: #fff;
                width: 150px;
                /* // height: 60px; */
                line-height: 40px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translateY(-50%) translateX(-50%);
                /* // height: 100px; */
              }
            .two {
              position: relative;
              margin-left: 30px;
              width: 700px;
              float: left;
            }
              h3 {
                letter-spacing: 1px;
                position: absolute;
                /* // margin-top: 10px; */
                /* // width: 640px; */
                cursor: pointer;
                left: 0px;
                display: inline-block;
                font-size: 22px;
                line-height: 26px;
                color: #000;
              }
              .uldaone {
                float: left;
                margin-top: 48px;
                width: 280px;
              }
                li {
                  margin-top: 20px;
                }
                  p {
                    display: inline-block;
                    color: #333;
                    font-size: 14px;
                  }
                  span {
                    color: #666;
                    font-size: 14px;
                  }
                  .spanpan {
                    color: #1f8ae2;
                    cursor: pointer;
                    font-size: 14px;
                  }
              .uldatwo {
                float: left;
                margin-top: 48px;
                width: 400px;
              }
                li {
                  margin-top: 20px;
                }
                  p {
                    display: inline-block;
                    color: #333;
                    font-size: 14px;
                  }
                  span {
                    color: #666;
                    font-size: 14px;
                  }
            .therr {
              float: left;
              width: 180px;
              height: 150px;
              text-align: center;
            }
              h3 {
                font-size: 14px;
                margin-top: 30px;
              }
              p {
                color: #1f8ae2;
                font-size: 14px;
                margin-top: 20px;
                margin-bottom: 20px;
              }
          li:last-child {
            border-bottom: 0px;
          }
    .page {
      text-align: center;
      margin-top: 20px;
  }
</style>
<style>

</style>

