<template>
  <div class="item">
    <div>
      <!-- 渲染数据 -->
      <!-- data 是父组件传递过来的数据，这里用props属性接受 -->
      <p>标题: {{data.title}}</p>
      <p class="content">内容：{{data.content}}</p>
      <div class="opera">
        <img src="./../assets/common.png" alt>
        <p>{{data.commonNum}}</p>
        <img src="./../assets/time.png" alt>
        <p>{{data.time}}</p>
      </div>
    </div>
    <div>
      <p class="noname">{{(data.author == null || data.author == "")? "匿名回复": data.author}}</p>
      <!-- 点击删除按钮， 调用deleteData函数 -->
      <button @click="deleteData()">删除</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 父组件传递过来的数据，
    data: {
      // 类型是Object
      type: Object,
      // 如果父组件没有传递， 默认是这个对象
      default: {
        author: "匿名用户"
      }
    }
  },
  methods: {
    // 点击删除按钮调用此函数
    deleteData() {
      // 把事件传递给父组件， 父组建中用 @delete="" 接受， 第二个参数是点击后向父组件传递的数据
      // 例如 Index.vue 中的第9行
      // <msg-item @delete="deleteData" v-for="(item, index) in msgList" :key="index" :data="item"></msg-item>
      // @delete="deleteData"  deleteData就是触发这个事件后调用的函数，Index.vue中的methods属性里面可看到
      this.$emit("delete", { id: this.data.id });
    }
  }
};
</script>
<style scoped  lang="">
.item {
  display: flex;
  padding: 1rem;
  background: white;
  margin-bottom: 0.6rem;
  font-size: 1.4rem;
  color: #666;
}

.item .noname {
  font-size: 1.2rem;
  flex: 1;
  text-align: right;
}

.opera {
  display: flex;
  margin-top: 1rem;
}

.opera p {
  margin-right: 3rem;
  margin-left: 1rem;
}

button {
  font-size: 1.8rem;
  margin-top: 1rem;
  padding: 1rem;
}
</style>
