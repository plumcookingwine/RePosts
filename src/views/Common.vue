<template>
  <div>
    <toolbar @back="back" :toolbar="toolbar"></toolbar>
    <div class="wrapper">
      <div class="set-name">
        <p class="t">匿名发帖</p>
        <input type="checkbox" @click="check()">
        <p>{{ischeck? "已匿名" : "已关闭匿名"}}</p>
      </div>
      <div class="content">
        <p>
          <input type="text" placeholder="请输入标题" v-model="title">
        </p>
        <p>
          <textarea rows="10" placeholder="请输入内容" v-model="content"></textarea>
        </p>
        <p>
          <button @click="send">发送</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Toolbar from "./../components/Toolbar";
export default {
  data() {
    return {
      toolbar: {
        showBack: true,
        showRight: true,
        title: "发帖"
      },
      ischeck: false,
      title: "",
      content: ""
    };
  },
  components: {
    toolbar: Toolbar
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    check() {
      this.ischeck = !this.ischeck;
    },
    send() {
      let name = this.ischeck ? "" : "yuanyuan";

      if (this.title == "") {
        alert("请输入标题");
        return;
      }

      if (this.content == "") {
        alert("请输入内容");
        return;
      }
      this.$axios
        .get("saveCommon", {
          params: {
            title: this.title,
            content: this.content,
            author: name,
            commonNum: 0,
            time: new Date()
          }
        })
        .then(
          result => {
            if (result.data.code == 1) {
              alert(result.data.msg);
              this.$router.push("/");
            }
          },
          err => {
            alert("err" + err);
          }
        );
    }
  }
};
</script>
<style scoped  lang="">
.wrapper {
  margin-top: 4.6rem;
  padding: 1rem;
}

.wrapper .set-name {
  display: flex;
}

.wrapper .set-name input {
  display: block;
  width: 2rem;
  height: 2rem;
}

.wrapper .set-name .t {
  flex: 1;
}

.wrapper .content input {
  display: block;
  width: 100%;
  padding: 1rem;
  font-size: 1.4rem;
  margin-top: 1rem;
}

.wrapper .content textarea {
  display: block;
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  margin-top: 1rem;
  height: 10rem;
}

button {
  padding: 1rem;
  font-size: 1.4rem;
  background: gray;
  margin-top: 1rem;
  color: white;
}
</style>
