<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <div id="functionDiv">
          <el-button
            type="primary" style="margin-bottom: 1vmin" @click="getAddForm">
            <i class="el-icon-plus"></i>
            <span>添加用户</span>
          </el-button>

          <el-button type="primary" style="margin-bottom:1vmin" @click="printPage">
              <span>打印页面</span>
          </el-button>

          <el-button type="primary" style="margin-bottom:1vmin" @click="printExcel">
              <span>导出为excel</span>
          </el-button>
        </div>

        <el-input
          v-model="searchBox.searchInfo"
          placeholder="输入搜索信息"
          class="input-with-select"
        >
          <template #prepend>
            <el-select
              v-model="searchBox.optionValue"
              placeholder="选项"
              style="width: 115px"
            >
              <el-option
                v-for="item in searchBox.items"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
          <template #append>
            <el-button @click="searchInput"
              ><el-icon><Search /></el-icon
            ></el-button>
          </template>
        </el-input>

        <el-scrollbar>
          <el-table
            :data="userInfoList"
            :border="true"
            :fit="true"
            :stripe="true"
            style="width: 100%"
          >
            <el-table-column prop="userName" label="用户名" width="120" />
            <el-table-column prop="password" label="密码" width="120" />
            <el-table-column prop="phone" label="电话号码" wddth="120" />
            <el-table-column prop="email" label="邮箱" wddth="120" />
            <el-table-column prop="sex" label="性别" wddth="120" />

            <el-table-column lable="更改信息" width="200">
              <template #default="scope">
                <el-button type="primary" @click="getModifyForm(scope.row)"
                  >修改</el-button
                >
                <el-button type="danger" @click="getDeleteForm(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>

    <el-dialog :visible.sync="addFormVisible" title="添加用户" class="dialog">
      <el-form :model="userInfo">
        <span>用户名</span>
        <el-input v-model="userInfo.userName" autocomplete="off" />
        <span>密码</span>
        <el-input v-model="userInfo.password" autocomplete="off" />
        <span>电话号码</span>
        <el-input v-model="userInfo.phone" autocomplete="off" />
        <span>邮箱</span>
        <el-input v-model="userInfo.email" autocomplete="off" />
        <div class="block">
          <div>性别</div>
          <el-select
            v-model="userInfo.sex"
            class="m-2"
            placeholder="选择性别"
            size="default"
          >
            <el-option
              v-for="item in this.options.sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleAdd">确认</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      :visible.sync="modifyFormVisible"
      title="修改用户信息"
      class="dialog"
    >
      <el-form :model="userInfo">
        <span>用户名</span>
        <el-input v-model="userInfo.userName" autocomplete="off" />
        <span>密码</span>
        <el-input v-model="userInfo.password" autocomplete="off" />
        <span>电话号码</span>
        <el-input v-model="userInfo.phone" autocomplete="off" />
        <span>邮箱</span>
        <el-input v-model="userInfo.email" autocomplete="off" />
        <div class="block">
          <div>性别</div>
          <el-select
            v-model="userInfo.sex"
            class="m-2"
            placeholder="选择性别"
            size="default"
          >
            <el-option
              v-for="item in this.options.sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="modifyFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleModify">确认</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      :visible.sync="deleteFormVisible"
      title="警告"
      width="30%"
      class="dialog"
    >
      <span>确认删除改用户信息吗？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="deleteFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleDelete">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { Message } from 'element-ui'
import * as XLSX from 'xlsx' // Vue3 版本

export default {
  data() {
    return {
      title: "用户信息",
      userInfoList: [],

      userInfoModel: {
        id: "",
        userName: "",
        password: "",
        phone: "",
        email: "",
        sex: "",
      },
      userInfo: {
        id: "",
        userName: "",
        password: "",
        phone: "",
        email: "",
        sex: "",
      },

      //选项
      options: {
        sexOptions: [
          { value: "男", label: "男" },
          { value: "女", label: "女" },
        ],
      },

      //搜索框信息
      searchBox: {
        searchInfo: "",
        optionValue: "",
        items: [
          { label: "用户名", value: "用户名" },
          { label: "电话号码", value: "电话号码" },
        ],
      },

      //表单可见性
      deleteFormVisible: false,
      modifyFormVisible: false,
      addFormVisible: false,
    };
  },

  methods: {
    //获取用户信息
    getUserInfoList() {
      let _this = this;
      let url = "http://localhost:8080/user/getAllUser";
      axios
        .get(url)
        .then(function (response) {
          _this.userInfoList = response.data.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    },

    //打开添加表单
    getAddForm() {
      this.userInfo = JSON.parse(JSON.stringify(this.userInfoModel));
      this.addFormVisible = true;
      console.log("添加表单");
    },

    //添加
    handleAdd() {
      let _this = this;
      let url = "http://localhost:8080/user/addUser";
      axios({
        method: "POST",
        url: url,
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: {
          userName: this.userInfo.userName,
          password: this.userInfo.password,
          phone: this.userInfo.phone,
          email: this.userInfo.email,
          sex: this.userInfo.sex,
        },
      })
        .then(function (response) {
          Message({message: '添加成功!', type: 'success',})
          _this.getUserInfoList();
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          _this.addFormVisible = false;
        });
    },

    //打开修改表单
    getModifyForm(row) {
      this.userInfo = JSON.parse(JSON.stringify(this.userInfoModel));
      this.modifyFormVisible = true;
      this.userInfo = row;
      console.log("要修改的记录id:" + row.id);
    },
    //修改
    handleModify() {
      let _this = this;
      let url = "http://localhost:8080/user/modifyUser";
      axios({
        method: "POST",
        url: url,
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: this.userInfo,
      })
        .then(function (response) {
          Message({message: '修改成功!', type: 'success',})
          _this.getUserInfoList();
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          _this.modifyFormVisible = false;
        });
    },

    //打开删除表单
    getDeleteForm(row) {
      this.deleteFormVisible = true;
      this.userInfo = row;

    },
    //删除信息
    handleDelete() {
      let _this = this;
      let url = "http://localhost:8080/user";
      url = url + '/' + this.userInfo.id;
      axios({
        method: "POST",
        url: url,
        headers: { "content-type": "application/x-www-form-urlencoded" }
      })
        .then(function (response) {
          Message({message: '删除成功!', type: 'success',})
          _this.getUserInfoList();
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          _this.deleteFormVisible = false;
        });
    },

    //搜索
    searchInput() {
      let _this = this;
      let url = "";
      let data = {};
      if (this.searchBox.optionValue == "电话号码") {
        url = "http://localhost:8080/user/selectUserByPhone";
        data.phone = this.searchBox.searchInfo;
      } else {
        url = "http://localhost:8080/user/selectUserByName";
        data.userName = this.searchBox.searchInfo;
      }
      console.log(this.searchBox.searchInfo);
      axios({
        method: "POST",
        url: url,
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: data,
      })
        .then(function (response) {
          _this.userInfoList = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    },

    //打印功能
    printPage(){
        window.print();
    },

    //导出excel功能
    printExcel(){
        // 创建工作表
        const data = XLSX.utils.json_to_sheet(this.userInfoList)
        // 创建工作簿
        const wb = XLSX.utils.book_new()
        // 将工作表放入工作簿中
        XLSX.utils.book_append_sheet(wb, data, 'data')
        // 生成文件并下载
        XLSX.writeFile(wb, 'userInfo.xlsx')
    }
  },

  mounted() {
    //查找全部信息
    this.getUserInfoList();
  },
};
</script>

<style>
#functionDiv {
  text-align: left;
}

.dialog {
  text-align: left;
}
</style>