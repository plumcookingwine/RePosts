<template>
  <div class="toolbar">
    <!-- 标题栏的返回按钮 -->
    <!-- @click 点击的时候调用onClickBack()函数， tookbar是我们传递过来的对象， 如果showBack属性为false，那么就不显示这个按钮 -->
    <img @click="onClickBack()" class="back" src="../assets/back.png" alt v-if="toolbar.showBack">
    <!-- 标题栏标题 -->
    <p class="title">{{ toolbar.title }}</p>
    <p class="right" v-if="toolbar.showRight">···</p>
  </div>
</template>

<script>
export default {
  props: {
    toolbar: {
      type: Object,
      default: {
        /** 父组件传递过来的数据，如果没有传，默认就是这几个属性  */

        // 是否显示返回按钮
        showBack: true,
        // 标题
        title: "",
        // 是否显示右边的按钮
        showRight: false
      }
    }
  },

  methods: {
    onClickBack: function() {
      // 点击返回按钮的时候， 父组件用 @back="" 接受这个事件
      this.$emit("back");
    }
  }
};
</script>
<style scoped  lang="">
.toolbar {
  text-align: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 4.6rem;
  color: white;
  display: flex;
  background: blue;
}

.toolbar .back {
  display: block;
  padding: 1rem;
}

.toolbar .title {
  flex: 1;
  text-align: center;
  line-height: 4.6rem;
  font-size: 1.8rem;
}

.toolbar .right {
  font-weight: 600;
  line-height: 4.6rem;
  font-size: 2rem;
  padding: 0 1.2rem;
}
</style>
