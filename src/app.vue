<template>
  <div class="appContainer">
    <!-- 这里是header -->
    <header id="header" class="mui-bar mui-bar-nav">
      <a
        v-if="showBack"
        @click="goback"
        class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"
      ></a>
      <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
      <h1 class="mui-title">安师生活--爱安师爱生活</h1>
    </header>
    <!-- 这里是 内容区 -->
    <div class="mui-content">
      <transition>
        <!-- include 表示 (数据缓存)keep-alive组件 对那个组件起作用；(后边的名字是在每个组件中添加的一个name字段，起的名字) -->
        <keep-alive include="newslist,imagelist">
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
    <!-- 这里是 footer -->
    <div class="footer">
      <nav class="mui-bar mui-bar-tab">
        <router-link to="/home" class="mui-tab-item">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link to="/classes" class="mui-tab-item">
          <span class="mui-icon mui-icon-extra mui-icon-extra-class"></span>
          <span class="mui-tab-label">分类</span>
        </router-link>
        <router-link to="/find" class="mui-tab-item">
          <span class="mui-icon mui-icon-extra mui-icon-extra-find"></span>
          <span class="mui-tab-label">发现</span>
        </router-link>
        <router-link to="/cart" class="mui-tab-item">
          <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
            <!-- 这里用store仓储中getters的成员调用内部定义函数方法 -->
            <span class="mui-badge">{{this.$store.getters.getTotalCount}}</span>
          </span>
          <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link to="user" class="mui-tab-item">
          <span class="mui-icon mui-icon-extra mui-icon-extra-peoples"></span>
          <span class="mui-tab-label">我的</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showBack: false //是否显示回退箭头
    };
  },
  methods: {
    goback() {
      // $router 是管理路由和传参
      // $route 是管理url
      this.$router.go(-1);
    }
  },
  created() {
    // console.log(this.$route)
    if (this.$route.path == "/home") {
      this.showBack = false;
    } else {
      this.showBack = true;
    }
  },
  watch: {
    // 监听路由，如果是home，则不显示回退箭头，否则显示
    // $route.path
    "$route.path": function(newValue, oldValue) {
      if (newValue == "/home") {
        this.showBack = false;
      } else {
        this.showBack = true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.appContainer {
  overflow: hidden;
  padding-bottom: 50px;
  .mui-bar-nav {
    background-color: red;
    .mui-title {
      color: #ccc;
      font-size: 20px;
      font-weight: bold;
      font-family: "微软雅黑";
    }
  }
  .footer {
    .mui-active {
      color: red !important;
    }
  }
  .v-enter {
    opacity: 0;
    transform: translateX(100%);
    // position: absolute;
  }

  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }
  .v-enter-active,
  .v-leave-active {
    transition: all 1s ease;
  }
  #header {
    .mui-icon-left-nav {
      color: #ccc;
    }
  }
}
</style>