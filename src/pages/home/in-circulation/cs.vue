<template>
  <div class="">
    <section class="Ctab">
      <p :class="{tActive:tActive}" @click="toRecommend()">推荐</p>
      <p :class="{lActive:lActive}" @click="toClassic()">经典</p>
    </section>
    <!-- 下拉加载更多产品列表 -->
    <load-more
      :bottom-method="loadBottom"
      :bottom-all-loaded="allLoaded"
      :bottomPullText='bottomText'
      :auto-fill="false"
      @bottom-status-change="handleBottomChange"
      >
      <ul class="">
        <li v-for="(item,key) in backMsg" class="">
          <movie-type :item="item"></movie-type>
        </li>
      </ul>
      <div v-if="loading" slot="bottom" class="loading">
        <!--<img src="./../../assets/main/uploading.gif">-->
      </div>
    </load-more>
  </div>
</template>
<script type="text/babel">
//import api from './../../fetch/api';
  import { mapGetters } from 'vuex';
//import LoadMore from './../common/loadmore.vue';
//import MovieType from './movieType.vue';
  export default {
    props:{
      TYPE: Number,
      backMsg: Array,
      dataType: String,
      loading: Boolean,
      allLoaded: Boolean,
      pageNo: Number,
    },
    data() {
      return {
        tActive: true,
        lActive: false,
        status: '',
        bottomText: '上拉加载更多...',
      };
    },
    computed: {
      ...mapGetters([
        'getContextPathSrc',
        'sessionId',
        'token'
      ]),
    },
    components: {
//    LoadMore,
//    MovieType
    },
    methods: {
      // 点击推荐按钮
      toRecommend: function() {
        this.tActive = true;
        this.lActive = false;
        this.$emit('toRecommend', {dataType: this.dataType, TYPE: this.TYPE});
      },
      // 点击经典按钮
      toClassic: function() {
        this.tActive = false;
        this.lActive = true;
        this.$emit('toClassic', {dataType: this.dataType, TYPE: this.TYPE});
      },
      // 加载更多的方法
      loadBottom: function() {
        alert(1)
        this.$emit('loadBottom', {dataType: this.dataType, TYPE: this.TYPE});
      },
      handleBottomChange(status) {
        this.bottomStatus = status;
      },
    },
  };
</script>