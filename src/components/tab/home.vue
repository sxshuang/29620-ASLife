<template>
  <div class="homeContainer">
    <!-- 这里是轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in swipeList" :key="item.id">
        <img :src="item.img_url" alt>
      </mt-swipe-item>
    </mt-swipe>
    <!-- 这里是九宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt>
          <div class="mui-media-body">安师新闻</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/imagelist">
          <img src="../../images/menu2.png" alt>
          <div class="mui-media-body">光影安师</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/goodslist">
          <img src="../../images/menu3.png" alt>
          <div class="mui-media-body">安师商城</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="../../images/menu4.png" alt>
          <div class="mui-media-body">记录安师</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="../../images/menu5.png" alt>
          <div class="mui-media-body">一卡通</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="../../images/menu6.png" alt>
          <div class="mui-media-body">校园社团</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="../../images/menu7.png" alt>
          <div class="mui-media-body">户外出行</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="../../images/menu8.png" alt>
          <div class="mui-media-body">休闲娱乐</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <a href="#">
          <img src="../../images/menu9.png" alt>
          <div class="mui-media-body">考研交流</div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      swipeList: []
    };
  },
  methods: {
    //   发送请求ajax，获取轮播图数据
    getSwipeData() {
      //使用axios发出 ajax发出请求
      //1. cnpm i axios -S
      //2.把 axios导入：import axios
      //3.把axios对象挂载到Vue.prototype原型身上，因为它不支持Vue.use()的语法去挂载
      // this.$axios.get(url).then(func)
      // this.$axios.post(url).then(func)
      this.$axios({
        method: "GET",
        url: "/sliderlist"
      }).then(res => {
        //   console.log(res)
        //   获取服务端数据结构，打印出来看看res
        var data = res.data;
        if (data.Status == 0) {
          //服务端正确响应并发挥数据
          this.swipeList = data.Data;
        } else {
          Toast("无法加载轮播图数据！！！");
        }
      });
    }
  },
  created() {
    this.getSwipeData();
  }
};
</script>
<style lang="less">
.homeContainer {
  .mint-swipe {
    height: 200px;
    // background-color: aqua;
    .mint-swipe-item {
      img {
        width: 100%;
      }
    }
  }
  .mui-table-view-cell img {
    width: 3.5rem;
  }
}
</style>

