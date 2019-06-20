<template>
  <div class="cartContainer">
    <h2>购物车</h2>
    <ul class="mui-table-view">
      <router-link
        class="mui-table-view-cell mui-media"
        v-for="item in cart"
        :key="item.id"
        tag="li"
        :to="'/home/goodsinfo/'+item.id"
      >
        <img class="mui-media-object mui-pull-left" :src="item.img_url">
        <div class="mui-media-body">
          <p class="goods-info">
            <span class="title">{{item.title}}</span>
            <span class="price">￥{{item.price}}</span>
          </p>
          <p class="goods-control">
            <numberbox
              :initCount="item.count"
              :min="1"
              :max="item.stock"
              :goodsId="item.id"
              :isChangeStore="true"
            ></numberbox>
            <span class="remove" @click.stop="remove(item.id)">×</span>
          </p>
        </div>
      </router-link>
      <li class="mui-table-view-cell mui-media total-price">
        总金额：
        <span class="price">￥{{this.$store.getters.getTotalPrice}}</span>
      </li>
    </ul>
    <button type="button" class="mui-btn mui-btn-danger mui-btn-block">结算</button>
  </div>
</template>
<script>
import numberbox from "../subComponents/numberbox.vue";
export default {
  // 购物车数据结构
  // [{id:xx,img_rul:xxx,title:xxx,count:xxx,price:xxx},stock:库存,{},{}...]
  // 使用状态管理---Vuex
  data() {
    return {
      cart: []
    };
  },
  methods: {
    //从本地存储获取到数据，然后赋值给cart，渲染到购物车中
    getCart() {
      this.cart = JSON.parse(localStorage.getItem("cart") || "[]");
    },
    // 删除购物车中的数据
    remove(goodsId) {
      //   console.log(goodsId);
      // 调用store.js中，为我们提供的removeGoods方法，来删除仓储中购物侧的数据
      this.$store.commit("removeGoods", goodsId);
      //上边只是删除本地存储中的数据，页面没有重新渲染，所以要调用这个数据
      this.getCart();
    }
  },
  created() {
    this.getCart();
  },
  components: {
    numberbox: numberbox
  }
};
</script>
<style lang="less">
.cartContainer {
  h2 {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: #444;
    padding: 8px;
    background-color: #fff;
  }
  .mui-table-view {
    margin: 0;
    .mui-table-view-cell {
      //li标签
      width: 100%;
      .mui-media-object {
        //图片
        max-width: 80px;
        height: 80px;
      }
      .mui-media-body {
        .goods-info {
          font-size: 16px;
          color: #444;
          line-height: 20px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          .price {
            font-weight: bold;
            color: #222;
          }
        }
        .goods-control {
          display: flex;
          justify-content: space-between;
          .remove {
            font-size: 36px;
            padding: 10px;
          }
        }
      }
    }
    li.total-price {
      font-size: 16px;
      color: #333;
      font-weight: bold;
      text-align: center;
      background-color: #fff;
      padding: 10px;
      .price {
        color: red;
      }
    }
  }

  .mui-btn-danger {
    position: fixed;
    bottom: 40px;
  }
}
</style>

