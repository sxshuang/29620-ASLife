<template>
  <div class="imageinfoContainer">
    <!-- 顶部 基础信息 -->
    <section class="top">
      <h3 class="title">{{this.imgInfo.title}}</h3>
      <p class="subinfo">
        <span class="author">发布者：{{this.imgInfo.author}}</span>
        <span class="add_time">{{this.imgInfo.add_time|dateFormat}}</span>
        <span class="click_count">阅读量：{{imgInfo.click_count}}</span>
      </p>
    </section>
    <!-- 简介 -->
    <section class="abstract">
      <p v-html="this.imgInfo.abstract"></p>
    </section>
    <!-- 缩略图 -->
    <section class="thumbs">
      <!-- 这里用的Vue专门的缩略图插件 vue-preview插件 -->
      <!-- 1.安装，2.在main.js导入，3.把VuePreview挂载到Vue,4.在组件的template模板中使用，其中 :slides 属性 his用于绑定具体的预览图片数据 -->
      <vue-preview :slides="thumbsList" class="imgPrev"></vue-preview>
    </section>
    <!-- 评论区 -->
    <section class="cmt">
      <comment :id="this.imgId"></comment>
    </section>
  </div>
</template>
<script>
// 引入评论组件
import comment from "../subComponents/comment.vue";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      imgId: this.$route.params.id,
      imgInfo: {},
      thumbsList: []
    };
  },
  created() {
    this.getImageInfo();
    this.getThumbsList();
  },
  methods: {
    //   获取该组图片的基本数据
    getImageInfo() {
      this.$axios({
        method: "get",
        url: "/images/imagesinfo",
        params: {
          imgid: this.imgId
        }
      }).then(res => {
        var data = res.data;
        if (data.Status == 0) {
          // 请求到的数据是个数组，里边有唯一的一个对象数据;(在data中定义的imgInfo是对象)
          this.imgInfo = data.Data[0];
        } else {
          Toast("服务区获取图片信息失败！！！");
        }
      });
    },

    // 获取该组图片的缩略图数据
    getThumbsList() {
      this.$axios({
        method: "get",
        url: "/thumbs/" + this.imgId
      }).then(res => {
        var data = res.data;
        console.log(data);
        if (data.Status == 0) {
          //
          data.Data.forEach(item => {
            (item.w = 600),
              (item.h = 400),
              (item.src = item.img_url),
              (item.msrc = item.img_url);
          });
          this.thumbsList = data.Data;
        } else {
          Toast("请求缩略图数据失败！！！");
        }
      });
    }
  },
  components: {
    comment
  }
};
</script>
<style lang="less">
.imageinfoContainer {
  padding: 10px;
  .top {
    border-bottom: 1px solid #bbb;
    .title {
      font-size: 20px;
      color: #333;
      font-family: "楷体";
      text-align: center;
    }
    .subinfo {
      padding-top: 10px 0;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      margin: 0;
    }
  }
  .abstract {
    font-size: 14px;
    padding: 10px;
    color: #444;
    // 首行缩进
    text-indent: 2em;
    line-height: 23px;
  }
  .thumbs {
    .imgPrev {
      // 这里是vue-preview 内部默认定义的样式
      .my-gallery {
        figure {
          display: inline-block;
          margin: 8px;
          img {
            width: 80px;
            height: 60px;
          }
        }
      }
    }
  }
}
</style>

