<template>
  <div class="swipeContainer">
    <mt-swipe :auto="speed">
      <mt-swipe-item v-for="item in swipeList" :key="item.id">
        <img :src="item.img_url" alt>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>
<script>
export default {
  // 父组件向子组件传参(谁用这个轮播组组件，谁传过来参数)
  props: ["swipeList", "speed"]
};
</script>
<style lang="less">
.swipeContainer {
  .mint-swipe {
    height: 200px;
    // background-color: aqua;
    .mint-swipe-item {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>


