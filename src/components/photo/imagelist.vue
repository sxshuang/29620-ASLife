<template>
  <div class="imagelistContainer">
    <ul
      class="imagelist"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="isLoading"
      infinite-scroll-distance="10"
      style="max-height:100vh; overflow:auto"
    >
      <!-- style="max-height:100vh; overflow:auto" 这个坑就是MUI 组件中的问题，如果不加，从详详情页返回的时候，newList也就是新闻列表不会显示 -->
      <li v-for="item in list" :key="item.id">
        <router-link :to="'/home/imageinfo/'+item.id">
          <img v-lazy="item.img_url">
          <!-- 这里是做遮罩层效果的子绝父相，相对定位不会脱标 -->
          <div class="info">
            <h4 class="info_title">{{item.title}}</h4>
            <p class="info_abstract">{{item.abstract}}</p>
          </div>
        </router-link>
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
  name:'imagelist',
  data() {
    return {
      isLoading: false,
      is_loading_more: false,
      finished: false,
      pageindex: 1,
      pagesize: 4,
      list: []
    };
  },
  methods: {
    loadMore() {
      this.isLoading = true;
      this.$axios({
        method: "get",
        url: "/images/imageslist",
        params: {
          pageindex: this.pageindex,
          pagesize: this.pagesize
        }
      }).then(res => {
        var data = res.data;
        // console.log(data);
        if (data.Status == 0) {
          if (data.Data.length > 0) {
            this.list = this.list.concat(data.Data);
            this.pageindex++;
            // false代表允许上滑
            this.isLoading = false;
          } else {
            //数据到底了,请求玩了
            this.isLoading = true;
            // 显示已加载全部字样
            this.finished = true;
          }
        } else {
          Toast("请求数据失败！！！");
        }
      });
    }
  }
};
</script>
<style lang="less">
.imagelistContainer {
  .imagelist {
    list-style: none;
    padding: 10px;
    margin: 0;
  }
  li {
    margin-bottom: 10px;
    position: relative;
    img {
      width: 100%;
      height: 260px;
      box-shadow: 0 2px 4px #999;
    }
    image[lazy="loading"] {
      width: 50px;
      height: 100px;
      margin: auto;
    }
    div.info {
      position: absolute;
      bottom: 0;
      padding: 5px;
      color: #eee;
      background-color: rgba(0, 0, 0, 0.5);
      .info_title {
        font-size: 14px;
      }
      .info_abstract {
        color: #eee;
        font-size: 12px;
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

