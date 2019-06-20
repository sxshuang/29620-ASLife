<template>
  <div class="goodlistContainer">
    <ul
      class="mui-table-view"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="isLoading"
      infinite-scroll-distance="10"
      style="max-height:100vh;overflow:auto"
    >
      <li
        class="mui-table-view-cell mui-media"
        v-for="item in list"
        :key="item.id"
        @click="goToGoodsinfo(item.id)"
      >
        <!-- <router-link :to="'/home/goodsinfo'+item.id"> -->
        <img class="mui-media-object mui-pull-left" :src="item.img_url">
        <div class="mui-media-body">
          <h3 class="title">{{item.title}}</h3>
          <p class="price">
            <span class="sellPrice">￥{{item.sell_price}}</span>
            <span class="marketPrice">原价:{{item.market_price}}</span>
          </p>
          <p class="stock">库存:{{item.stock}}</p>
          <button type="button" class="mui-btn mui-btn-danger">立即购买</button>
        </div>
        <!-- </router-link> -->
      </li>
      <!-- 加载动画部分 -->
      <li class="more_loading">
        <mt-spinner class="loading_icon" type="fading-circle" v-show="is_loading_more"></mt-spinner>
        <span v-show="finished">已经加载全部！！！</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      list: [], //商品列表
      pageindex: 1,
      pagesize: 5,
      isLoading: false,
      is_loading_more: false,
      finished: false
    };
  },
  methods: {
    loadMore() {
      this.isLoading = true;
      this.is_loading_more = true;
      this.finished = false;
      this.$axios({
        method: "get",
        url: "/goods/goodslist/",
        params: {
          pageindex: this.pageindex,
          pagesize: this.pagesize
        }
      }).then(res => {
        var data = res.data;
        if (data.Status == 0) {
          if (data.Data.length > 0) {
            // 如果它>0,证明拿到有数据
            this.list = this.list.concat(data.Data);
            this.pageindex++;
            this.isLoading = false;
          } else {
            // 否则，就是已经没有数据了，已经到最后了
            this.isLoading = true;
            this.finished = true;
            this.is_loading_more = false;
          }
        } else {
          Toast("请求失败！！！");
        }
      });
    },
    // router.push 编程导航
    // 1.在li标签注册一个点击事件
    // 2.在路由米快中router.js ，给路由匹配规则添加name属性
    // 3.在点击事件中，使用 this.$router.push({name:"xxx",params:{key:xxx}})
    goToGoodsinfo(goodsId) {
      // console.log(this.$router)
      // 官方文档中用法是 router.push ； 但是这个router非router，在Vue中，从他的Vue实例身上通过$router这个对象属性
      this.$router.push({
        // 这个name，是在路由模块中，定义的name属性
        name: "goodsinfo",
        params: {
          // 这里的key，就是在路由模块中，传参数的名字
          id: goodsId
        }
      });
    }
  }
};
</script>
<style lang="less">
.goodlistContainer {
  .mui-table-view-cell {
    .mui-media-object {
      max-width: 120px;
      height: 100px;
    }
    .mui-media-body {
      .title {
        font-size: 16px;
        font-weight: bold;
        font-family: "楷体";
        color: #333;
        padding-bottom: 18px;
      }
      .price {
        font-size: 12px;
        color: #888;
        margin: 0;
        .sellPrice {
          font-size: 18px;
          color: red;
          font-family: "微软雅黑";
          font-weight: bold;
          margin-right: 10px;
        }
        .marketPrice {
          text-decoration: line-through;
        }
      }
      .mui-btn-danger {
        position: absolute;
        bottom: 30px;
        right: 15px;
      }
    }
  }
  .more_loading {
    font-size: 12px;
    color: #aaa;
    text-align: center;
    border: none;
    .loading_icon {
      position: relative;
      left: 45%;
    }
  }
}
</style>
