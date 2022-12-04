<template>
  <div id="app">
    <!-- <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row> -->


    <el-container style="height: 660px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: #545c64">

        <!-- <el-col :span="5"> -->
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">个人中心</el-menu-item>
              <el-menu-item index="1-2">购物车</el-menu-item>
              <el-menu-item index="1-3">我的评价</el-menu-item>
              <el-menu-item index="1-4">我的旅游攻略</el-menu-item>
              <el-menu-item index="1-5">我的消息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>民宿管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="showHomestayInfo">房源信息</el-menu-item>
              <el-menu-item index="2-2">农产品信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>房东管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" @click="showOwnerInfo">个人中心</el-menu-item>
              <el-menu-item index="3-2" @click="showOwnerHomestay">我的房源</el-menu-item>
              <el-menu-item index="3-3">我的农产品</el-menu-item>
              <el-menu-item index="3-4">我的消息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>后台管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">用户信息</el-menu-item>
              <el-menu-item index="4-2" @click="showAllOwnerInfo">房东信息</el-menu-item>
              <el-menu-item index="4-3">房源信息</el-menu-item>
              <el-menu-item index="4-4">农产品信息</el-menu-item>
              <el-menu-item index="4-5">查看评价</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>待办事项</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5">待办事项管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
        <!-- </el-col> -->

      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <div style="width: 1000px" v-if="state.show_homestay_state">
          <el-input
    placeholder="请输入名字"
    suffix-icon="el-icon-date"  style="width:200px; float:left"
    v-model="input1">
  </el-input>
  <el-input
    placeholder="请输入内容"
    suffix-icon="el-icon-date"  style="width:200px; float:left"
    v-model="input1">
  </el-input>
  <el-input
    placeholder="请输入内容"
    suffix-icon="el-icon-date"  style="width:200px; float:left"
    v-model="input1">
  </el-input>
  <el-input
    placeholder="请输入内容"
    suffix-icon="el-icon-date"  style="width:200px; float:left"
    v-model="input1">
  </el-input>
  <el-button type="primary" style="float:left;margin-top: 11px;margin-left: 20px;background-color: white;border:solid 0px;color: rgb(179,192,209);">
    查询</el-button>
  </div>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>导出</el-dropdown-item>
              <el-dropdown-item>打印</el-dropdown-item>
              <el-dropdown-item>统计</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{ userName }}</span>
        </el-header>

        <el-main v-loading="loading">
          <!-- 显示民宿信息 -->
          <el-table v-if="state.show_homestay_state" :data="homestayInfo">

            <el-table-column prop="name" label="名字" width="120">
            </el-table-column>

            <el-table-column prop="time" label="入住时间" width="120">
            </el-table-column>
            <el-table-column prop="countNow" label="剩余" width="120">
            </el-table-column>
            <el-table-column prop="state" label="状态" width="120">
            </el-table-column>
            <el-table-column prop="description" label="详细描述" width="250">
            </el-table-column>
            <el-table-column prop="location" label="地址">
            </el-table-column>
            <el-table-column prop="state" label="订购" width="100" v-if="(order == false)">
              <el-button type="success" icon="el-icon-check" circle @click="orderHomestay"></el-button>
            </el-table-column>
            <el-table-column label="取消订购" width="100" v-if="(order == true)">
              <el-button type="danger" icon="el-icon-delete" circle @click="unOrderHomestay"></el-button>
            </el-table-column>

          </el-table>
          <!-- 显示房东个人中心 -->
          <el-form ref="ownerInfo" :model="ownerInfo" label-width="80px" v-if="state.show_ownerInfo_state">
            <h1>个人信息中心</h1>
      
            <el-form-item label="用户名">
              <el-input v-model="ownerInfo.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="ownerInfo.password" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="ownerInfo.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="电话号码">
              <el-input v-model="ownerInfo.phone" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="ownerInfo.email" disabled></el-input>
            </el-form-item>
            <el-button type="info" @click="modifyOwnerInfo(ownerInfo.id)">修改</el-button>

          </el-form>
          <!-- 显示房东房源 -->
          <el-table v-if="state.show_ownerHomestay_state" :data="ownerHomestay" >
           

<el-table-column prop="name" label="名字" width="120" >

</el-table-column>

<el-table-column prop="time" label="入住时间" width="120">
</el-table-column>
<el-table-column prop="countNow" label="剩余" width="120">
</el-table-column>
<el-table-column prop="state" label="状态" width="120">
</el-table-column>
<el-table-column prop="description" label="详细描述" width="250">
</el-table-column>
<el-table-column prop="location" label="地址">
</el-table-column>
<el-table-column prop="state"  width="100">
</el-table-column>
<el-table-column  width="100" >
  <template slot-scope="id">
    <el-button type="primary" @click="changeHomestay(id.row.id)">修改</el-button>
  </template>
  
</el-table-column>
<el-table-column  width="100" >
  <template slot-scope="id">
    <el-button type="danger"  @click="deleteHomestay(id.row.id)">删除</el-button>
  </template>
  
</el-table-column>

          </el-table>
          <el-button type="primary" v-if="state.show_ownerHomestay_state" @click="addHomestay">添加</el-button>
          <!-- 房源添加界面 -->
          <el-dialog title="民宿信息" :visible.sync="ownerAddHomestay">
  <el-form :model="ownerHomestayObj">
    <el-form-item label="民宿名称" :label-width="10">
      <el-input v-model="ownerHomestayObj.name" autocomplete="off" :width="100"></el-input>
    </el-form-item>
    <el-form-item label="营业时间" :label-width="10">
      <el-input v-model="ownerHomestayObj.time" autocomplete="off" :width="100"></el-input>
    </el-form-item>
    <el-form-item label="总数" :label-width="10">
      <el-input v-model="ownerHomestayObj.countTotal" autocomplete="off" :width="100"></el-input>
    </el-form-item>
    <el-form-item label="状态" :label-width="10">
      <el-input v-model="ownerHomestayObj.state" autocomplete="off" :width="100"></el-input>
    </el-form-item>
    <el-form-item label="描述" :label-width="10">
      <el-input v-model="ownerHomestayObj.description" autocomplete="off" :width="100"></el-input>
    </el-form-item>
    <el-form-item label="地点" :label-width="10">
      <el-input v-model="ownerHomestayObj.location" autocomplete="off" :width="100"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="ownerAddHomestay = false">取 消</el-button>
    <el-button type="primary" @click="submitAddHomestay">确 定</el-button>
  </div>
          </el-dialog>
          <el-table v-if="state.show_allOwnerInfo_state" :data="allOwnerInfo">

<el-table-column prop="name" label="名字" width="120">
</el-table-column>
<el-table-column prop="username" label="用户名" width="120">
</el-table-column>
<el-table-column prop="phone" label="电话号码" width="120">
</el-table-column>
<el-table-column prop="email" label="邮箱" width="240">
</el-table-column>
<el-table-column  width="100" >
  <template slot-scope="id">
    <el-button type="primary" @click="changeOwnerInfo(id.row.id)">修改</el-button>
  </template>
</el-table-column>
<el-table-column  width="100" >
  <template slot-scope="id">
    <el-button type="danger"  @click="deleteOwnerInfo(id.row.id)">删除</el-button>
  </template>
</el-table-column>


</el-table>
<!-- 添加房东界面 -->
<el-button type="primary" v-if="state.show_allOwnerInfo_state" @click="addOwnerInfo">添加</el-button>
          <!-- 添加房源界面 -->
          <el-dialog title="房东信息" :visible.sync="addOwner">
  <el-form :model="ownerInfoObj">
    <el-form-item label="姓名" :label-width="10">
      <el-input v-model="ownerInfoObj.name" autocomplete="off" :width="100"></el-input>
    </el-form-item>
    <el-form-item label="电话" :label-width="10">
      <el-input v-model="ownerInfoObj.phone" autocomplete="off" :width="100"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" :label-width="10">
      <el-input v-model="ownerInfoObj.email" autocomplete="off" :width="100"></el-input>
    </el-form-item>
    <el-form-item label="用户名" :label-width="10">
      <el-input v-model="ownerInfoObj.username" autocomplete="off" :width="100"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="10">
      <el-input v-model="ownerInfoObj.password" autocomplete="off" :width="100"  type="password"></el-input>
    </el-form-item>
   
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addOwner = false">取 消</el-button>
    <el-button type="primary" @click="submitAddOwner">确 定</el-button>
  </div>
          </el-dialog>
        </el-main>
      </el-container>

    </el-container>


  </div>
</template>

<script>

import axios from 'axios';
import config from './assets/config'
var config_url = config.url;
export default {
  name: 'App',
  components: {},
  methods: {
    showHomestayInfo() {
      var _this = this
      _this.loading = true
      axios.get( config_url+'/homestay', {
      })
        .then(function (response) {// 请求成功
          _this.homestayInfo = response.data.data
          _this.state = {
            show_homestay_state: true
          }

          _this.loading = false
        })
        .catch(function (error) {// 请求失败
          console.log(error);
        });


    },
    orderHomestay() {
      this.order = true

    },
    unOrderHomestay() {
      this.order = false

    },
    showOwnerInfo() {
      var _this = this
      _this.loading = true
      axios.get(config_url+'/owner/1', {
      })
        .then(function (response) {// 请求成功
          console.log(response)
          _this.ownerInfo = response.data.data
          _this.state = {
        show_ownerInfo_state: true
      }
      _this.loading = false
        })
        .catch(function (error) {// 请求失败
          console.log(error);
        });
      


    },
    modifyOwnerInfo() {
     
      this.addOwner=true
      this.ownerInfoObj = this.ownerInfo

   
    },
    
    showOwnerHomestay(){
      var _this = this
      _this.loading = true
      axios.get(config_url+'/homestay', {
      })
        .then(function (response) {// 请求成功
          _this.ownerHomestay = response.data.data
          _this.state = {
            show_ownerHomestay_state: true
          }

          _this.loading = false
        })
        .catch(function (error) {// 请求失败
          console.log(error);
        });
    },
    addHomestay(){
      this.ownerAddHomestay = true
      this.ownerHomestayObj={
        id:"",
        name:"",
        location:"",
        time:"",
        countNow:"",
        countTotal:"",
        state:"",
        description:""
      }
    },
    submitAddHomestay(){
      var _this = this
      _this.ownerHomestayObj.id = _this.ownerId
      console.log(this.ownerHomestayObj)
      axios.post( config_url+'/owner/addhomestay', _this.ownerHomestayObj
      )
        .then(function (response) {// 请求成功
          console.log(response)
          

        })
        .catch(function (error) {// 请求失败
          console.log(error);
        })
        .finally(function(){
          _this.ownerAddHomestay = false
          _this.showOwnerHomestay()
        });
     
    },
    changeHomestay(e){
      var _this = this
      console.log(e)
      axios.get( config_url+'/homestay/'+e, {
      })
        .then(function (response) {// 请求成功
          console.log(response)
          _this.ownerHomestayObj = response.data.data
          _this.ownerAddHomestay = true
        })
        .catch(function (error) {// 请求失败
          console.log(error);
        });
    },
    deleteHomestay(e){
      var _this = this;
      axios.delete( config_url+'/homestay/'+e, {
      })
        .then(function (response) {// 请求成功
          console.log(response)
          
          console.log(_this.ownerHomestay)
        })
        .catch(function (error) {// 请求失败
          console.log(error);
        })
        .finally(function(){
          _this.showOwnerHomestay()
        });
    },
    showAllOwnerInfo(){
      var _this = this;
      _this.loading = true
      axios.get( config_url+'/owner', {
      })
        .then(function (response) {// 请求成功
          console.log(response)
         _this.allOwnerInfo = response.data.data
         _this.state={
          show_allOwnerInfo_state:true
         }
         _this.loading = false
        })
        .catch(function (error) {// 请求失败
          console.log(error);
        });
    },
    changeOwnerInfo(e){
      var _this = this
      console.log(e)
      axios.get( config_url+'/owner/'+e, {
      })
        .then(function (response) {// 请求成功
          console.log(response)
          _this.ownerInfoObj = response.data.data
          _this.addOwner = true
        })
        .catch(function (error) {// 请求失败
          console.log(error);
        });
      
    },
    deleteOwnerInfo(e){
      var _this = this
      axios.delete( config_url+'/owner/'+e, {
      })
        .then(function (response) {// 请求成功
          console.log(response)
          _this.showAllOwnerInfo()
          console.log(_this.showAllOwnerInfo)
        })
        .catch(function (error) {// 请求失败
          console.log(error);
        });
    },
    addOwnerInfo(){
      this.addOwner = true
      this.ownerInfoObj={
        id:"",
        name:"",
        phone:"",
        email:"",
        username:"",
        password:""
      }
    },
    submitAddOwner(){
      var _this = this
      
      axios.post( config_url+'/owner', 
        _this.ownerInfoObj
      )
        .then(function (response) {// 请求成功
          console.log(response)
        
        })
        .catch(function (error) {// 请求失败
          console.log(error);
        })
        .finally(function(){
          if(_this.state.show_allOwnerInfo_state ==true)
          _this.showAllOwnerInfo()
          if(_this.state.show_ownerInfo_state==true)
          _this.showOwnerInfo()
          _this.addOwner = false
        });
    }

  },
  data() {
    return {
      userName: "用户名",
      homestayInfo: [
      ],
      ownerHomestay:[
      ],
      ownerHomestayObj:{
        id:"",
        name:"",
        location:"",
        time:"",
        countNow:"",
        countTotal:"",
        state:"",
        description:""
      },
      ownerInfoObj:{
        id:"",
        name:"",
        phone:"",
        email:"",
        username:"",
        password:""
      },
      allOwnerInfo:[],
      
   
      state: {
        show_homestay_state: false,
        show_ownerInfo_state: false,
        show_ownerHomestay_state:false,
        show_allOwnerInfo_state:false
      },
      ownerId:1,
      homestayId:0,
      ownerAddHomestay:false,
      formLabelWidth: "120px",
      showDetailHomestayInfo: false,
      change_ownerInfo: false,
      addOwner:false,
      order: false,
      loading: true,
      ownerInfo: {
        id: "1",
        name: "chaliro",
        phone: "10086",
        email: "123@qq.com",
        username: "zzz",
        password: "123456"

      }
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
