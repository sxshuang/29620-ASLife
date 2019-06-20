<template>
  <div class="commentContainer">
    <div class="cmtHeader">
      <h3>观点</h3>
    </div>
    <div class="cmtList">
      <ul>
        <li v-for="(item) in list" :key="item.id">
          <p>
            <span class="mui-icon mui-icon-contact"></span>
            <span class="user">匿名用户</span>
            <span class="add_time">{{item.add_time | dateFormat}}</span>
          </p>
          <p class="content">{{item.content}}</p>
        </li>
      </ul>
      <button
        @click="loadMoreComment"
        type="button"
        class="mui-btn mui-btn-danger mui-btn-block mui-btn-outlined"
      >加载更多评论</button>
    </div>
    <div class="postCmt">
      <p>
        <span>发表我的观点</span>
        <span @click="postComment">发送</span>
      </p>
      <textarea v-model="msg" rows="3" class="txtMsg" placeholder="请开始你的表演..."></textarea>
    </div>
  </div>
</template>
<script>
// import ''
import { Toast } from "mint-ui";

// 导入qs,post请求用的，发送data参数的时候，要把data转换成字符串
import qs from "qs";

export default {
  data() {
    return {
      pageindex: 1,
      pagesize: 5,
      list: [],
      msg: ""
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    // 发送请求获取评论数据
    getComments() {
      this.$axios({
        method: "get",
        url: "/comment",
        params: {
          srcid: this.id,
          pageindex: this.pageindex,
          pagesize: this.pagesize
        }
      }).then(res => {
        var data = res.data;
        if (data.Status == 0) {
          if (data.Data.length > 0) {
            this.list = this.list.concat(data.Data);
          } else {
            console.log(Toast);
            Toast({
              message: "没有更多评论了",
              duration: 2000
            });
          }
        } else {
          Toast({
            message: "请求评论失败！！！",
            duration: 2000
          });
        }
      });
    },
    //点击加载数据
    loadMoreComment() {
      this.pageindex++;
      this.getComments();
      console.log("111");
    },

    // 发送评论
    postComment() {
      if (this.msg.length > 0) {
        this.$axios({
          method: "post",
          url: "/comment",
          // 如果是get请求，使用params属性，
          // 如果是post请求传参，使用data属性;(但是要借用qs把data所传的东西转换为字符串)

          data: qs.stringify({
            srcId: this.id, //被评论的对象的组件id
            content: this.msg,
            add_time: new Date()
          })
        }).then(res => {
          var key = new Date().getMilliseconds();
          // 如果post请求正确响应了，我们就可以直接把新发表的评论组织成1个对象，然后添加到list数组中
          console.log(key)
          this.list.unshift({
            id: key,
            content: this.msg,
            srcId: this.id,
            add_time: new Date()
          });
          this.msg = "";
        });
      } else {
        Toast({
          message: "不能发表空评论",
          duration: 3000,
          position: "bottom"
        });
      }
    }
  },
  //从父组件传递过来服务端要传递的srcid 参数
  props: ["id"]
};
</script>
<style lang="less">
.commentContainer {
  .cmtHeader {
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    h3 {
      border-left: 5px solid #c10000;
      padding-left: 10px;
      font-size: 18px;
      font-family: "微软雅黑";
      font-weight: bold;
      color: #333;
    }
  }
  .cmtList {
    ul {
      list-style: none;
      padding: 0;
      li {
        padding: 0;
        margin: 0;
        border-bottom: 1px solid #ddd;
        p {
          padding: 5px 0;
          margin: 0;
          font-size: 14px;
          .user {
            color: darkgoldenrod;
            padding-right: 20px;
          }
        }
        p.content {
          padding-left: 28px;
          font-size: 16px;
        }
      }
    }
  }
  .postCmt {
    p {
      display: flex;
      justify-content: space-between;
      span {
        padding: 5px;
      }
    }
    .txtMsg {
      color: #444;
      font-size: 20px;
    }
  }
}
</style>

