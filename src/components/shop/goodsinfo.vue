<template>
  <div class="goodsinfoContainer">
    <!-- 轮播图区域 -->
    <!-- 1.导入轮播图组件 import -->
    <!-- 2.挂载到父组件的components身上 -->
    <!-- 3.以标签的形式插入模板结构内 -->
    <swipe :speed="3000" :swipeList="swipeList"></swipe>

    <!-- 商品信息区域 -->
    <div class="goodsInfo">
      <p class="price">
        <span class="sellPrice">
          <span>￥</span>
          {{goodsInfo.sell_price}}
        </span>
        <span class="marcketPrice">
          <label class="lb">商场价:</label>
          {{goodsInfo.market_price}}
        </span>
      </p>
      <p class="title">{{goodsInfo.title}}</p>
      <p class="abstract">{{goodsInfo.abstract}}</p>
      <p class="add_time">
        <label class="lb">发布时间:</label>
        {{goodsInfo.add_time|dateFormat}}
      </p>
      <p class="stock">
        <span>
          <label class="lb">库存:</label>
          {{goodsInfo.stock}}
        </span>
        <span>
          <label class="lb">关注度:</label>
          {{goodsInfo.click_count}}
        </span>
      </p>
      <p class="count">
        <label class="lb">购买数量:</label>
        <!-- 导入封装的numberbox组件，然后挂载到父组件身上 -->
        <numberbox
          :min="1"
          :max="goodsInfo.stock"
          :initCount="1"
          @getCount="getGoodsCount"
          :goodsId="this.goodsId"
          :isChangeStore="false"
        ></numberbox>
      </p>
      <p>
        <button @click="addToCart" type="button" class="mui-btn mui-btn-warning">加入购物车</button>
        <button type="button" class="mui-btn mui-btn-danger">立即购买</button>
      </p>
    </div>

    <!-- 卖家信息区域 -->
    <div class="sellerInfo">
      <h3>卖家信息</h3>
      <p class="seller">
        <label class="lb">卖家:</label>
        {{goodsInfo.seller}}
      </p>
      <p class="seller_phone">
        <label class="lb">电话:</label>
        {{goodsInfo.seller_phone}}
      </p>
    </div>

    <!-- 商品详情图片区域 -->
    <div class="imgInfo">
      <ul>
        <li v-for="item in swipeList" :key="item.id">
          <img :src="item.img_url">
        </li>
      </ul>
    </div>

    <!-- 评论区域 -->
    <comment :id="goodsId"></comment>
  </div>
</template>
<script>
// 导入公共的轮播图组件
import swipe from "../subComponents/swipe.vue";
// 导入numberbox组件
import numberbox from "../subComponents/numberbox.vue";
//
import comment from "../subComponents/comment.vue";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      swipeList: [], //商品详情轮播图数据（用作父传子传参用）
      goodsId: this.$route.params.id, //拿到点击商品的主键id(也就是在路由参数中的传参id)
      goodsInfo: {}, //获取商品详情信息
      goodsCount: 1 //默认的购物车里的数量
    };
  },
  created() {
    this.getSwipeData();

    this.getGoodsInfo();
  },
  methods: {
    //   获取商品详情轮播图数据
    getSwipeData() {
      this.$axios({
        method: "get",
        url: "/thumbs/" + this.goodsId
      }).then(res => {
        var data = res.data;
        if (data.Status == 0) {
          this.swipeList = data.Data;
        } else {
          Toast("获取当前数据失败！！！");
        }
      });
    },
    //获取商品详情数据
    getGoodsInfo() {
      this.$axios({
        method: "get",
        url: "/goods/goodsinfo",
        params: {
          goodsid: this.goodsId
        }
      }).then(res => {
        var data = res.data;
        if (data.Status == 0) {
          this.goodsInfo = data.Data[0]; //Data是个数组，里边第一项才是要的数据
        } else {
          Toast("请求数据失败！！！");
        }
      });
    },

    // 加入购物车
    addToCart() {
      // 子组件向父组件传值
      // 1.父组件通过事件机制，给子组件传递一个带参数的方法
      //   2.在子组件内部，找合适的时机，调用该方法，通过参数传递，把想传给父组件的数据传递过来
      // [{id:xx,img_rul:xxx,title:xxx,count:xxx,price:xxx},{},{}...]
      // 在购物车组件中需要渲染这些，数据，所以把数据保存到store仓储中，因为

      var goods = {
        id: this.goodsId,
        img_url: this.goodsInfo.img_url,
        title: this.goodsInfo.title,
        price: this.goodsInfo.sell_price,
        count: this.goodsCount,
        stock: this.goodsInfo.stock
      };
      // this.$store.state.cart.push(goods); Vuex中，不提倡(不能)直接操作state
      // 应该调用仓储对象mutations里提供的方法commit，来间接处理state的数据
      this.$store.commit("addToCart", goods); //commit中，第一个参数是调用的方法名，第二个是这个方法需要的参数
      console.log(this.$store.state.cart);
    },
    // 要传递给子组件的方法，用来让子组件向父组件传值
    getGoodsCount(count) {
      //只要数值变化，子组件就触发传过来的函数，从而触发这个(此)函数，并把子组件的参数传过来
      this.goodsCount = count;
      // console.log(count); //实时打印数量值的变化
    }
  },
  components: {
    swipe: swipe,
    numberbox: numberbox,
    comment: comment
  }
};
</script>

<style lang="less">
.goodsinfoContainer {
  padding: 10px;
  .goodsInfo {
    padding: 5px;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 10px;
    p {
      font-size: 14px;
      line-height: 16px;
      color: #333;
      margin: 20px 15px;
      font-family: "微软雅黑";
      label.lb {
        color: #999;
        margin-right: 20px;
      }
    }
    .price {
      .sellPrice {
        color: #ce0000;
        font-size: 28px;
        font-weight: bold;
        span {
          font-size: 12px;
        }
      }
      .marcketPrice {
        text-decoration: line-through;
        .lb {
          margin: 0;
        }
      }
    }
    .title {
      font-size: 16px;
      font-weight: bold;
    }
    .abstract {
      font-size: 15px;
      line-height: 20px;
    }
    .stock {
      span {
        margin-right: 20px;
      }
    }
  }
  .sellerInfo {
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 10px;
    margin-bottom: 5px;
    h3 {
      font-size: 14px;
      color: #555;
      margin-bottom: 20px;
    }
    p {
      color: #333;
      label.lb {
        color: #999;
        margin-right: 20px;
      }
    }
  }
  .imgInfo {
    background-color: #fff;
    border-radius: 10px;
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        width: 100%;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>

