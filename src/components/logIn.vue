<template>
  <div>
    <el-form
      ref="loginForm"
      label-width="80px"
      class="login-box"
      v-loading="loading"
    >
      <h3 class="login-title">欢迎登录旅游民宿系统</h3>
      <el-form-item label="账号" prop="username">
        <el-input
          type="text"
          placeholder="请输入账号"
          v-model="login.username"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="login.password"
        />
      </el-form-item>
      <el-divider></el-divider>
      <el-radio-group v-model="loginType">
        <el-radio label="user">普通用户</el-radio>
        <el-radio label="owner">房东</el-radio>
        <el-radio label="conrtoller">管理人员</el-radio>
      </el-radio-group>
      <el-divider></el-divider>
      <el-form-item>
        <el-button type="primary" v-on:click="loginAction()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import config from "@/assets/config";
var url = config.url;
export default {
  name: "logIn",
  data: () => {
    return {
      //登陆人员类型选择
      loginType: "user",
      login: {
        state: false,
        username: "",
        password: "",
      },
      show: {
        mainPage: true,
        addNpPage: false,
        riskPeoplePage: false,
        areacontrol: false,
      },
      loading: false,
    };
  },
  methods: {
    loginAction: function () {
      if (this.login.password.length == 0 || this.login.username.length == 0) {
        this.$message.error("请输入账号和密码");
        return;
      }
      this.loading = true;
      this.$axios(`${url}/${this.loginType}/login`, {
        method: "post",
        data: {
          id: this.login.username,
          password: this.login.password,
        },
      })
        .then((res) => {
          this.loading = false;
          if (res.data.flag) {
            this.login.state = true;
            this.$bus.$emit("login", res.data.data, this.loginType);
          } else {
            this.login.state = false;
            this.$message.error("账号或密码错误");
          }
        })
        .catch(() => {
          this.loading = false;
          this.login.state = false;
          this.$message.error("无法连接到服务器");
        });
    },
    changeMenue: function (index) {
      var ind = 0;
      for (var i in this.show) {
        if (ind == index) {
          let x = i;
          setTimeout(() => {
            this.show[x] = true;
          }, 200);
        } else {
          this.show[i] = false;
        }
        ind++;
      }
    },
  },
};
</script>

<style>
.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
}
.login-box:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>