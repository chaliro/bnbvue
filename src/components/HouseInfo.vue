<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <div id="addDiv">
          <el-button
            type="primary"
            style="margin-bottom: 1vmin"
            @click="getAddForm"
          >
            <i class="el-icon-plus"></i>
            <span>添加房源</span>
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
            :data="houseInfoList"
            :border="true"
            :fit="true"
            :stripe="true"
            style="width: 100%"
          >
            <el-table-column prop="name" label="房名" width="120" />
            <el-table-column prop="location" label="位置" wddth="120" />
            <el-table-column prop="time" label="时间" wddth="120" />
            <el-table-column prop="countNow" label="现有房间数" wddth="120" />
            <el-table-column prop="countTotal" label="房间总数" wddth="120" />
            <el-table-column prop="state" label="营业状态" wddth="120" />
            <el-table-column prop="description" label="描述" wddth="120" />

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

    <el-dialog
      :visible.sync="addFormVisible"
      title="添加房源信息"
      class="dialog"
    >
      <el-form :model="houseInfo">
        <span>名字</span>
        <el-input v-model="houseInfo.name" autocomplete="off" />
        <span>位置</span>
        <el-input v-model="houseInfo.location" autocomplete="off" />
        <div class="block">
          <div>时间</div>
          <el-date-picker
            v-model="houseInfo.time"
            type="date"
            placeholder="选择日期"
            size="default"
            format="YYYY-MM-DD"
          />
        </div>
        <span>现有房间数</span>
        <el-input v-model="houseInfo.countNow" autocomplete="off" />
        <span>房间总数</span>
        <el-input v-model="houseInfo.countTotal" autocomplete="off" />
        <div class="block">
          <div>营业状况</div>
          <el-select
            v-model="houseInfo.state"
            class="m-2"
            placeholder="选择营业状况"
            size="default"
          >
            <el-option
              v-for="item in this.options.stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <span>描述</span>
        <el-input v-model="houseInfo.description" autocomplete="off" />
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
      title="修改房源信息"
      class="dialog"
    >
      <el-form :model="houseInfo">
        <span>名字</span>
        <el-input v-model="houseInfo.name" autocomplete="off" />
        <span>位置</span>
        <el-input v-model="houseInfo.location" autocomplete="off" />
        <div class="block">
          <div>时间</div>
          <el-date-picker
            v-model="houseInfo.time"
            type="date"
            placeholder="选择日期"
            size="default"
            format="YYYY-MM-DD"
          />
        </div>
        <span>现有房间数</span>
        <el-input v-model="houseInfo.countNow" autocomplete="off" />
        <span>房间总数</span>
        <el-input v-model="houseInfo.countTotal" autocomplete="off" />
        <div class="block">
          <div>营业状况</div>
          <el-select
            v-model="houseInfo.state"
            class="m-2"
            placeholder="选择营业状况"
            size="default"
          >
            <el-option
              v-for="item in this.options.stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <span>描述</span>
        <el-input v-model="houseInfo.description" autocomplete="off" />
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
      <span>确认删除房源信息吗？</span>
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
      title: "房源信息",
      houseInfoList: [],
      houseInfoModel: {
        id: "",
        name: "",
        location: "",
        time: "",
        countNow: "",
        countTotal: "",
        state: "",
        description: "",
      },
      houseInfo: {
        id: "",
        name: "",
        location: "",
        time: "",
        countNow: "",
        countTotal: "",
        state: "",
        description: "",
      },

      //选项
      options: {
        stateOptions: [
          { value: "营业", label: "营业" },
          { value: "休息", label: "休息" },
        ],
      },

      //搜索框信息
      searchBox: {
        searchInfo: "",
        optionValue: "",
        items: [
          { label: "房名", value: "房名" },
          { label: "位置", value: "位置" },
        ],
      },

      //表单可见性
      deleteFormVisible: false,
      modifyFormVisible: false,
      addFormVisible: false,
    };
  },

  methods: {
    //获取房源信息
    getHouseInfoList() {
      let _this = this;
      let url = "http://localhost:8080/homestay";
      axios
        .get(url)
        .then(function (response) {
          _this.houseInfoList = response.data.data;
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    },

    //打开添加表单
    getAddForm() {
      this.houseInfo = JSON.parse(JSON.stringify(this.houseInfoModel));
      this.addFormVisible = true;
      console.log("添加表单");
    },
    //添加
    handleAdd() {
      let _this = this;
      let url = "http://localhost:8080/homestay";
      axios({
        method: "POST",
        url: url,
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: {
          name: this.houseInfo.name,
          location: this.houseInfo.location,
          time: this.houseInfo.time,
          countNow: this.houseInfo.countNow,
          countTotal: this.houseInfo.countTotal,
          state: this.houseInfo.state,
          description: this.houseInfo.description,
        },
      })
        .then(function (response) {
          _this.getHouseInfoList();
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
      this.houseInfo = JSON.parse(JSON.stringify(this.houseInfoModel));
      this.modifyFormVisible = true;
      this.houseInfo = row;
      console.log("要修改的记录id:" + row.id);
    },
    //修改
    handleModify() {
      let _this = this;
      let url = "http://localhost:8080/homestay/modifyhomestay";
      axios({
        method: "POST",
        url: url,
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: this.houseInfo,
      })
        .then(function (response) {
          _this.getHouseInfoList();
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
      this.houseInfo.id = id;
      console.log("要删除表单id为：" + id);
    },
    //删除信息
    handleDelete() {
      let _this = this;
      let url = "http://localhost:8080/homestay";
      url += "/" + this.houseInfo.id;
      axios({
        method: "DELETE",
        url: url,
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
        .then(function (response) {
          _this.getHouseInfoList();
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
      if (this.searchBox.optionValue == "房名") {
        url = "http://localhost:8080/homestay/selectHomestayByName";
        data.name = this.searchBox.searchInfo;
      } else {
        url = "http://localhost:8080/homestay/selectHomestayByLocation";
        data.location = this.searchBox.searchInfo;
      }
      console.log(this.searchBox.optionValue + ":" + this.searchBox.searchInfo);
      axios({
        method: "POST",
        url: url,
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: data,
      })
        .then(function (response) {
          _this.houseInfoList = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    },
  },

  mounted() {
    //查找全部信息
    this.getHouseInfoList();
  },
};
</script>

<style>
#addDiv {
  text-align: left;
}

.dialog {
  text-align: left;
}
</style>