<template>
  <div class="newslistContainer">
    <!-- 使用Mint-UI 提供的 infinte scroll 是实现上滑加载第二页数据 -->
    <!-- v-infinite-scroll ：用来设置AJAX属性请求数据的方法；      -->
    <!-- infinite-scroll-disabled ：设置拿到最后一个数据后，该组件是否还继续响应上滑请求的动作；
    该属性是一个boolean 类型的值：true表示已经加载完成所有数据-->
    <!-- infinite-scroll-distance ：此属性用来设置当组件距离底部多元的时候，就出发loadMore事件 -->

    <ul
      class="newslist"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="isLoading"
      infinite-scroll-distance="10"
      style="max-height:100vh; overflow:auto"
    >
      <!-- style="max-height:100vh; overflow:auto" 这个坑就是MUI 组件中的问题，如果不加，从详详情页返回的时候，newList也就是新闻列表不会显示 -->
      <li v-for="item in list" :key="item.id">
        <router-link :to="'/home/newsinfo/'+item.id">
          <p class="news_title">{{item.title}}</p>
          <p class="news_des">
            <span class="author">{{item.author}}</span>
            <span class="add_time">{{item.add_time | dateFormat}}</span>
            <span class="click_count">阅读：{{item.click_count}}</span>
          </p>
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
export default {
  name: "newslist",
  data() {
    return {
      list: [], //新闻列表
      isLoading: false, //上边有属性介绍，默认值如果就给true，那就证明没有数据了，不再发送ajax请求
      // 页数，和页内数据数
      pageindex: 1,
      pagesize: 10,
      is_loading_more: false, //控制是否显示加载动画图标
      finished: false //控制是否显示已经加载所有数据
    };
  },

  // created() {
  //   this.loadMore();
  // },
  methods: {
    loadMore() {
      this.isLoading = true;
      this.is_loading_more = true;
      this.finished = false;

      this.$axios({
        method: "get",
        url: "/news/newslist",
        // get 传参用params,post传参用data
        params: {
          pageindex: this.pageindex,
          pagesize: this.pagesize
        }
      }).then(response => {
        // console.log(response);

        var data = response.data;
        //  console.log(data)
        if (data.Status == 0) {
          // 添加时间
          data.Data.forEach(item => {
            item.add_time = new Date();
          });

          this.list = this.list.concat(data.Data); //拼接两个数组，把已有的 ＋ 加载的拼接在一起，不能直接赋值(直接赋值加载的会覆盖前边的)
          this.pageindex++;
          this.isLoading = false; //允许再响应上滑
          this.is_loading_more = false;
          if (data.Data.length < this.pagesize) {
            //判断说明此次请求的数据已经是最后一页
            this.isLoading = true;
            this.finished = true;
          }
        } else {
          //没有拿到数据
          this.finished = true;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.newslistContainer {
  .newslist {
    list-style: none;
    padding: 0 16px;
    li {
      border-bottom: 1px solid #ccc;
      padding: 10px 0;
      p {
        margin: 0;
      }
      p.news_title {
        font-size: 16px;
        color: #333;
      }
      p.news_des {
        font-size: 12px;
        color: #aaa;
        padding-top: 5px;
        display: flex;
        justify-content: space-between;
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
}
</style>

