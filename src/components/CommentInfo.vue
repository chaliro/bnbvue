<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <div id="functionDiv">
          <el-button
            type="primary" style="margin-bottom: 1vmin" @click="getAddForm">
            <i class="el-icon-plus"></i>
            <span>添加评论</span>
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
            :data="commentInfoList"
            :border="true"
            :fit="true"
            :stripe="true"
            style="width: 100%"
          >
            <el-table-column prop="userName" label="用户名" width="120" />
            <el-table-column prop="homestayName" label="房源名" wddth="120" />
            <el-table-column prop="comment" label="评论" wddth="120" />

            <el-table-column lable="更改信息" width="200">
              <template #default="scope">
                <el-button type="primary" @click="getModifyForm(scope.row)"
                  >修改</el-button
                >
                <el-button type="danger" @click="getDeleteForm(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>

    <el-dialog :visible.sync="addFormVisible" title="添加评论" class="dialog">
      <el-form :model="commentInfo">
        <span>用户名</span>
        <el-input v-model="commentInfo.userName" autocomplete="off" />
        <span>房源名</span>
        <el-input v-model="commentInfo.homestayName" autocomplete="off" />
        <span>评论</span>
        <el-input v-model="commentInfo.comment" autocomplete="off" />
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
      title="修改评论信息"
      class="dialog"
    >
      <el-form :model="commentInfo">
        <span>用户名</span>
        <el-input v-model="commentInfo.userName" autocomplete="off" />
        <span>房源名</span>
        <el-input v-model="commentInfo.homestayName" autocomplete="off" />
        <span>评论</span>
        <el-input v-model="commentInfo.comment" autocomplete="off" />
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
      <span>确认删除改评论吗？</span>
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

export default {
  data() {
    return {
      title: "评论信息",
      commentInfoList: [],
      commentInfoModel: { id: "", userName: "", homestayName: "", comment: "" },
      commentInfo: { id: "", userName: "", homestayName: "", comment: "" },

      //搜索框信息
      searchBox: {
        searchInfo: "",
        optionValue: "",
        items: [
          { label: "用户名", value: "用户名" },
          { label: "房源名", value: "房源名" },
        ],
      },

      //表单可见性
      deleteFormVisible: false,
      modifyFormVisible: false,
      addFormVisible: false,
    };
  },

  methods: {
    //获取评论信息
    getCommentInfoList() {
      let _this = this;
      let url = "http://localhost:8080/comment/getAllComment";
      axios
        .get(url)
        .then(function (response) {
          _this.commentInfoList = response.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    },

    //打开添加表单
    getAddForm() {
      this.commentInfo = JSON.parse(JSON.stringify(this.commentInfoModel));
      this.addFormVisible = true;
      console.log("添加表单");
    },
    //添加
    handleAdd() {
      let _this = this;
      let url = "http://localhost:8080/comment/addComment";
      axios({
        method: "POST",
        url: url,
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: {
          userName: this.commentInfo.userName,
          homestayName: this.commentInfo.homestayName,
          comment: this.commentInfo.comment,
        },
      })
        .then(function (response) {
          _this.getCommentInfoList();
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
      this.commentInfo = JSON.parse(JSON.stringify(this.commentInfoModel));
      this.modifyFormVisible = true;
      this.commentInfo = row;
      console.log("要修改的记录id:" + row.id);
    },
    //修改
    handleModify() {
      let _this = this;
      let url = "http://localhost:8080/comment/modifyComment";
      axios({
        method: "POST",
        url: url,
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: this.commentInfo,
      })
        .then(function (response) {
          _this.getCommentInfoList();
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          _this.modifyFormVisible = false;
        });
    },

    //打开删除表单
    getDeleteForm(id) {
      this.deleteFormVisible = true;
      this.commentInfo.id = id;
      console.log("要删除表单id为：" + id);
      
    },
    //删除信息
    handleDelete() {
      let _this = this;
      let url = "http://localhost:8080/comment/deleteComment";
      axios({
        method: "DELETE",
        url: url,
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: {
          id: this.commentInfo.id,
        },
      })
        .then(function (response) {
          _this.getCommentInfoList();
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
      if (this.searchBox.optionValue == "用户名") {
        url += "http://localhost:8080/comment/getCommentByUserName";
        data.userName = this.searchBox.searchInfo;
      } else {
        url += "http://localhost:8080/comment/getCommentByHomestayName";
        data.homestayName = this.searchBox.searchInfo;
      }
      console.log(this.searchBox.searchInfo);
      axios({
        method: "POST",
        url: url,
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: data,
      })
        .then(function (response) {
          _this.commentInfoList = response.data;
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
        const data = XLSX.utils.json_to_sheet(this.commentInfoList)
        // 创建工作簿
        const wb = XLSX.utils.book_new()
        // 将工作表放入工作簿中
        XLSX.utils.book_append_sheet(wb, data, 'data')
        // 生成文件并下载
        XLSX.writeFile(wb, 'comment.xlsx')
    }
  },

  mounted() {
    //查找全部信息
    this.getCommentInfoList();
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