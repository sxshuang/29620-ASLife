<template>
  <div class="mui-numbox">
    <button
      @click.stop="subsract"
      :disabled="subDis"
      class="mui-btn mui-btn-numbox-minus"
      type="button"
    >-</button>
    <input class="mui-input-numbox" type="number" :value="currentCount">
    <button
      @click.stop="plus"
      class="mui-btn mui-btn-numbox-plus"
      type="button"
      :disabled="plusDis"
    >+</button>
  </div>
</template>

<script>
export default {
  created() {
    this.currentCount = this.initCount;
    console.log(this.min + "---父传子参数的值");
  },
  // 购买数量：初始值，下限，上限，此数字框对应的商品id,用来判断是否在购物车页面修改加减个数的时候影响仓储：true或false
  props: ["initCount", "min", "max", "goodsId", "isChangeStore"],

  data() {
    return {
      currentCount: 1,
      plusDis: false,
      subDis: true
    };
  },
  methods: {
    //   设置加减按钮是否被禁用的状态
    setDisable() {
      if (this.currentCount >= this.max) {
        this.plusDis = true;
        this.subDis = false;
      } else {
        if (this.currentCount <= this.min) {
          this.plusDis = false;
          this.subDis = true;
        } else {
          this.plusDis = false;
          this.subDis = false;
        }
      }
    },
    //   加
    plus() {
      if (this.currentCount < this.max) {
        this.currentCount++;
      }
      //   设置 2个button 的disable
      this.setDisable();
    },
    //   减
    subsract() {
      if (this.currentCount > this.min) {
        this.currentCount--;
      }
      this.setDisable();
    }
    // 这里使用onChange监听数量的变化是不妥的（w3c规定：1、获得焦点，2、数据变化，3、失去焦点；缺一不可，而这里的 购买数量 是通过加减号来改变的，所以不能用onChange）
    //
  },
  watch: {
    currentCount: function(newValue, oldValue) {
      // 1.数据发生变化，立刻调用父组件传过来的方法getCount，把 currentCount 传递给父组件
      this.$emit("getCount", newValue);
      // 当数据更新的时候，调用仓储中提供的updateStore方法，跟新仓储中的数据
      // 以此来更新购物车中的总价格
      // 在这里，要传递过去1个对象，这个对象形如：{id:goodsId,count:xxx}
      let goodsInfo = { id: this.goodsId, count: this.currentCount };
      this.$store.commit("updateStore", goodsInfo);
    }
  }
};
</script>
<style lang="less">
</style>


