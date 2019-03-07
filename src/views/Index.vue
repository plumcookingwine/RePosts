<template>
  <div>
    <!-- :toolbar 是给标题栏传递数据（数据是双引号里面的toolbar, 就是我们下面定义的toolbar属性）， 标题栏中用props属性接受 -->
    <toolbar :toolbar="toolbar"></toolbar>
    <div class="content">
      <!-- 帖子列表组件，每一条帖子就是一个组件 -->
      <!-- v-for是循环添加组件 ， @delete是接收组件点击删除按钮的事件（当点击删除按钮时候，调用下面的deleteData方法），-->
      <!-- :data是向组件内传递数据， data="item", item 就是我们v-for中定义的每个对象的变量 -->
      <msg-item @delete="deleteData" v-for="(item, index) in msgList" :key="index" :data="item"></msg-item>
    </div>
    <!-- 右下角的发布按钮 -->
    <img class="edit" src="../assets/edit.png" @click="edit()" alt>
  </div>
</template>

<script>
// 顶部标题栏组件
import Toolbar from "./../components/Toolbar";
import MsgItem from "./../components/MsgItem";

export default {
  data() {
    return {
      // 顶部标题栏组展示内容
      toolbar: {
        title: "篱笆闲聊",
        showBack: false,
        showRight: false
      },
      // 帖子列表数据
      msgList: []
    };
  },
  components: {
    // 定义了两个组件
    toolbar: Toolbar,
    "msg-item": MsgItem
  },
  methods: {
    /** 点击发布按钮的时候调用此函数 */
    edit() {
      this.$router.push("/common");
    },

    /** 点击子组件的删除按钮的时候，调用此函数，obj是点击子组件的删除按钮传递回来的数据（是一个对象，只有一个id属性） */
    deleteData(obj) {
      alert("delete" + obj.id);
      // 请求接口， 通过id删除数据
      this.$axios
        .get("deleteById", {
          params: {
            id: obj.id // 传递的参数
          }
        })
        .then(result => {
          // 请求接口返回的数据
          if (result.data.code == 1) {
            alert(result.data.msg);
            // code = 1 代表删除成功，接口删除成功之后，我们展示的内容也要把这个帖子删除
            this.msgList = this.msgList.filter(item => {
              return item.id != obj.id;
            });
          }
        });
    }
  },
  created() {
    // 请求接口，获取消息列表
    this.$axios.get("commonList").then(
      result => {
        // 返回的列表数据
        this.msgList = result.data;
      },
      err => {
        alert(err);
      }
    );
  }
};
</script>
<style scoped  lang="">
.content {
  margin-top: 4.6rem;
}

.edit {
  position: fixed;
  display: block;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
}
</style>
