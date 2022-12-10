<template>
  <div id="app">
    <!-- 按钮样式 -->
    <!-- <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row> -->


    <el-container style="height: 660px; border: 1px solid #eee">

      <!-- 导航栏 -->
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
              <el-menu-item index="3-4" @click="showChatWindow">我的消息</el-menu-item>
              <el-menu-item index="3-3" @click="showOwnerProducts">我的农产品</el-menu-item>
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
              <span>驾驶舱</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5">驾驶舱界面</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
        <!-- </el-col> -->

      </el-aside>

      <el-container>
        <!-- 顶部信息 -->
        <el-header style="text-align: right; font-size: 12px">
          <!-- 民宿管理 房源界面 的 搜索框 -->
          <div style="width: 1000px" v-if="state.show_homestay_state">
          <el-input
    placeholder="请输入名字"
    suffix-icon="el-icon-date"  style="width:200px; float:left"
    v-model="getAllByNameVar">
  </el-input>
  
  <el-button @click="getAllByName" type="primary" style="float:left;margin-top: 11px;margin-left: 20px;background-color: white;border:solid 0px;color: rgb(179,192,209);">
    查询</el-button>
  </div>
  <!-- 房东管理 房源界面 搜索框 -->
  <div style="width: 1000px" v-if="state.show_ownerHomestay_state">
          <el-input
    placeholder="请输入名字"
    suffix-icon="el-icon-date"  style="width:200px; float:left"
    v-model="ownerHomestayCheckByNameVar">
  </el-input>
  
  <el-button @click="ownerHomestayCheckByName" type="primary" style="float:left;margin-top: 11px;margin-left: 20px;background-color: white;border:solid 0px;color: rgb(179,192,209);">
    查询</el-button>
    <el-button @click="ownerHomestayAESCBYname" type="primary" style="float:left;margin-top: 11px;margin-left: 20px;background-color: white;border:solid 0px;color: rgb(179,192,209);">按名字升序</el-button>
    <el-button @click="ownerHomestayDESCBYname"  type="primary" style="float:left;margin-top: 11px;margin-left: 20px;background-color: white;border:solid 0px;color: rgb(179,192,209);">按名字降序</el-button>
  </div>
  <!-- 后台管理 房东界面 搜索框 -->
  <div style="width: 1000px" v-if="state.show_allOwnerInfo_state">
          <el-input
    placeholder="请输入名字"
    suffix-icon="el-icon-date"  style="width:200px; float:left"
    v-model="checkOwnerByNameVar">
  </el-input>
  
  <el-button @click="checkOwnerByName" type="primary" style="float:left;margin-top: 11px;margin-left: 20px;background-color: white;border:solid 0px;color: rgb(179,192,209);">
    查询</el-button>
    <el-button @click="allOwnerInfoAESCBYname" type="primary" style="float:left;margin-top: 11px;margin-left: 20px;background-color: white;border:solid 0px;color: rgb(179,192,209);">按名字升序</el-button>
    <el-button @click="allOwnerInfoDESCBYname"  type="primary" style="float:left;margin-top: 11px;margin-left: 20px;background-color: white;border:solid 0px;color: rgb(179,192,209);">按名字降序</el-button>
  </div>
  <!-- 房东管理 产品界面 搜索框 -->
  <div style="width: 1000px" v-if="state.show_ownerProducts_state">
          <el-input
    placeholder="请输入名字"
    suffix-icon="el-icon-date"  style="width:200px; float:left"
    v-model="checkOwnerProductByNameVar">
  </el-input>
  
  <el-button @click="checkOwnerProductByName" type="primary" style="float:left;margin-top: 11px;margin-left: 20px;background-color: white;border:solid 0px;color: rgb(179,192,209);">
    查询</el-button>
    <el-button @click="ownerProductAESCBYname" type="primary" style="float:left;margin-top: 11px;margin-left: 20px;background-color: white;border:solid 0px;color: rgb(179,192,209);">按名字升序</el-button>
    <el-button @click="ownerProductDESCBYname"  type="primary" style="float:left;margin-top: 11px;margin-left: 20px;background-color: white;border:solid 0px;color: rgb(179,192,209);">按名字降序</el-button>
    
  </div>
  <!-- 界面右上角的小齿轮（导出打印统计） 和 用户名 -->
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  v-print="printObj">导出</el-dropdown-item>
              <el-dropdown-item>统计</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{ userName }}</span>
        </el-header>
<!-- 主页面 -->
        <el-main v-loading="loading" id="printMe">
          <chatMainVue v-if="state.show_chat_window_state"></chatMainVue>

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
         
          <!--  房东房源添加界面 -->
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
          <!-- 显示后台管理 房东信息 -->
          <el-table v-if="state.show_allOwnerInfo_state" :data="allOwnerInfo">

<el-table-column prop="name" label="名字" width="120">
</el-table-column>
<el-table-column prop="username" label="用户名" width="120">
</el-table-column>
<el-table-column prop="phone" label="电话号码" width="120">
</el-table-column>
<el-table-column prop="email" label="邮箱" width="360">
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
<!-- 后台管理 添加房东界面 -->

          <!-- 添加房东界面 -->
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
         
          <!-- 房东管理 显示房东农产品 -->
          <el-table v-if="state.show_ownerProducts_state" :data="ownerProducts" >
           <el-table-column prop="name" label="名字" width="120" >
           </el-table-column>
           
           <el-table-column prop="countNow" label="剩余" width="120">
           </el-table-column>
           <el-table-column prop="description" label="描述" width="500">
           </el-table-column>
           <el-table-column  width="100" >
             <template slot-scope="id">
               <el-button type="primary" @click="changeProducts(id.row.id)">修改</el-button>
             </template>
             
           </el-table-column>
           <el-table-column  width="100" >
             <template slot-scope="id">
               <el-button type="danger"  @click="deleteProducts(id.row.id)">删除</el-button>
             </template>
             
           </el-table-column>
           
                     </el-table>
            <!-- 产品添加界面 -->
         
            <el-dialog title="产品信息" :visible.sync="addProducts">
              <el-select v-model="homeId"  placeholder="请选择应的房源" v-if="(productsObj.id==null || productsObj.id=='')">
    <el-option
      v-for="item in ownerHomestay"
      :key="item.name"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>

  <el-form :model="productsObj">
    <el-form-item label="名字" :label-width="10">
      <el-input v-model="productsObj.name" autocomplete="off" :width="100"></el-input>
    </el-form-item>
    <el-form-item label="总数" :label-width="10">
      <el-input v-model="productsObj.countTotal" autocomplete="off" :width="100"></el-input>
    </el-form-item>
    <el-form-item label="描述" :label-width="10">
      <el-input v-model="productsObj.description" autocomplete="off" :width="100"></el-input>
    </el-form-item>
    <el-form-item label="图片路径" :label-width="10">
      <el-input v-model="productsObj.img" autocomplete="off" :width="100"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addProducts = false">取 消</el-button>
    <el-button type="primary" @click="submitAddProducts">确 定</el-button>
  </div>
          </el-dialog>
        </el-main>
        <el-button type="primary" v-if="state.show_ownerHomestay_state" @click="addHomestay">添加</el-button>
        <el-button type="primary" v-if="state.show_allOwnerInfo_state" @click="addOwnerInfo">添加</el-button>
        <el-button type="primary" v-if="state.show_ownerProducts_state" @click="addNewProducts">添加</el-button>
      </el-container>

    </el-container>


  </div>
</template>

<script>

import axios from 'axios';
import config from './assets/config'
import chatMainVue from './components/chatMain.vue';
var config_url = config.url;
export default {
  name: 'App',
  components: {chatMainVue},
  methods: {
    //显示民宿管理 房源信息界面
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
    //显示聊天窗
    showChatWindow(){
      this.state = {
        show_chat_window_state: true
      }
    },

    orderHomestay() {
      this.order = true
    },
//控制民宿管理 房源信息界面 的取消订购
    unOrderHomestay() {
      this.order = false
    },
    //显示房东 个人中心
    showOwnerInfo() {
      var _this = this
      _this.loading = true
      axios.get(config_url+'/owner/'+_this.ownerId, {
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
    //控制房东 个人中心 的修改弹出框
    modifyOwnerInfo() {
     
      this.addOwner=true
      this.ownerInfoObj = this.ownerInfo

   
    },
    //显示房东管理 房源信息界面
    showOwnerHomestay(){
      var _this = this
      _this.loading = true
      axios.get(config_url+'/homestay/getByOwnerId/'+ _this.ownerId, {
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
    //控制房东管理 房源信息 添加界面
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
    //控制房东管理 房源信息 添加或者修改的确定按钮提交信息
    submitAddHomestay(){
      var _this = this
      if(_this.ownerHomestayObj.id == null || _this.ownerHomestayObj.id=="")
      {
        _this.ownerHomestayObj.id = _this.ownerId
      console.log(this.ownerHomestayObj)
      axios.post( config_url+'/owner/addhomestay', _this.ownerHomestayObj
      )
        .then(function (response) {// 请求成功
          console.log(response)
          _this.$message({
            message:"添加成功",
            type:"success"
          })

        })
        .catch(function (error) {// 请求失败
          console.log(error);
          _this.$message({
            message:"添加失败",
            type:"error"
          })
        })
        .finally(function(){
          _this.ownerAddHomestay = false
          _this.showOwnerHomestay()
        });
      }
      else{
        axios.post( config_url+'/owner/updatehomestay', _this.ownerHomestayObj
      )
        .then(function (response) {// 请求成功
          console.log(response)
          _this.$message({
            message:"修改成功",
            type:"success"
          })
        })
        .catch(function (error) {// 请求失败
          console.log(error);
          _this.$message({
            message:"修改失败",
            type:"error"
          })
        })
        .finally(function(){
          _this.ownerAddHomestay = false
          _this.showOwnerHomestay()
        });
      } 
    },
    //控制房东管理 房源信息 修改界面
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
    //控制房东管理 房源信息 删除功能
    deleteHomestay(e){
      var _this = this;
      axios.delete( config_url+'/homestay/'+e, {
      })
        .then(function (response) {// 请求成功
          console.log(response)
          _this.$message({
            message:"删除成功",
            type:"success"
          })
          console.log(_this.ownerHomestay)
        })
        .catch(function (error) {// 请求失败
          console.log(error);
          _this.$message({
            message:"删除失败",
            type:"error"
          })
        })
        .finally(function(){
          _this.showOwnerHomestay()
          _this.ownerHomestayCheckByNameVar = null
        });
    },
    //显示后台管理 房东信息
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
     //显示后台管理 房东信息 修改界面
    changeOwnerInfo(e){
      var _this = this
      console.log(e)
      axios.get( config_url+'/owner/'+e, {
      })
        .then(function (response) {// 请求成功
          console.log(response)
          _this.ownerInfoObj = response.data.data
          _this.$message({
            message:"修改成功",
            type:"success"
          })
          _this.addOwner = true
        })
        .catch(function (error) {// 请求失败
          console.log(error);
          _this.$message({
            message:"修改失败",
            type:"error"
          })
        });
      
    },
    //显示后台管理 房东信息 删除功能
    deleteOwnerInfo(e){
      var _this = this
      axios.delete( config_url+'/owner/'+e, {
      })
        .then(function (response) {// 请求成功
          console.log(response)
          _this.$message({
            message:"删除成功",
            type:"success"
          })
          console.log(_this.showAllOwnerInfo)
        })
        .catch(function (error) {// 请求失败
          console.log(error);
          _this.$message({
            message:"删除失败",
            type:"error"
          })
        })
        .finally(function(){
          _this.checkOwnerByNameVar = null
          _this.showAllOwnerInfo()
        });
    },
    //显示后台管理 房东信息 添加界面
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
    //显示后台管理 房东信息 添加或者修改的确定按钮提交信息
    submitAddOwner(){
      var _this = this
      
      axios.post( config_url+'/owner', 
        _this.ownerInfoObj
      )
        .then(function (response) {// 请求成功
          console.log(response)
          _this.$message({
            message:"成功",
            type:"success"
          })
        })
        .catch(function (error) {// 请求失败
          console.log(error);
          _this.$message({
            message:"失败",
            type:"error"
          })
        })
        .finally(function(){
          if(_this.state.show_allOwnerInfo_state ==true){
            _this.showAllOwnerInfo()
          }
         
          if(_this.state.show_ownerInfo_state==true){
            _this.showOwnerInfo()
          }
          
          _this.addOwner = false
        });
    },
    //房东管理 房源信息 查询按钮
    ownerHomestayCheckByName(){
      console.log(this.ownerHomestayCheckByNameVar)
      var _this = this
      axios.get( config_url+'/homestay/getByOwnerId/'+_this.ownerId+"/"+_this.ownerHomestayCheckByNameVar, {
      })
        .then(function (response) {// 请求成功
          console.log(response)
          _this.ownerHomestay=response.data.data
          _this.$message({
            message:"查询成功",
            type:"success"
          })
     
        })
        .catch(function (error) {// 请求失败
          console.log(error);
          _this.$message({
            message:"查询失败",
            type:"error"
          })
        });
    },
    //民宿管理 房源信息 查询按钮
    getAllByName(){
      var _this = this
      axios.get( config_url+'/homestay/getAllByName/'+_this.getAllByNameVar, {
      })
        .then(function (response) {// 请求成功
          console.log(response)
          _this.homestayInfo=response.data.data
          _this.$message({
            message:"查询成功",
            type:"success"
          })
     
        })
        .catch(function (error) {// 请求失败
          console.log(error);
          _this.$message({
            message:"查询失败",
            type:"error"
          })
        });
    },
    //显示 房东管理 房源信息 产品界面
    showOwnerProducts(){
      var _this = this
      _this.loading = true
      axios.get( config_url+'/product', {
      })
        .then(function (response) {// 请求成功
          console.log(response)
          _this.ownerProducts=response.data.data
          _this.state={
            show_ownerProducts_state:true
          }
          _this.loading = false
        })
        .catch(function (error) {// 请求失败
          console.log(error);
        });
    },
    //显示 房东管理 房源信息 添加产品界面
    addNewProducts(){
      this.addProducts = true
      this.productsObj={
        id:"",
        name:"",
        description:"",
        countNow:"",
        countTotal:"",
        img:""
      }
      var _this = this
      axios.get(config_url+'/homestay/getByOwnerId/'+ _this.ownerId, {
      })
        .then(function (response) {// 请求成功
          _this.ownerHomestay = response.data.data

        })
        .catch(function (error) {// 请求失败
          console.log(error);
        });
    },
    //显示 房东管理 房源信息 添加或者修改的确定按钮提交信息
    submitAddProducts(){
      console.log(this.homeId)
      var _this = this
      if(this.productsObj.id == null || this.productsObj.id ==''){
      
      _this.productsObj.id = _this.homeId
      axios.post( config_url+'/product/addProducts', _this.productsObj)
        .then(function (response) {// 请求成功
          console.log(response)
          _this.$message({
            message:"添加成功",
            type:"success"
          })
        })
        .catch(function (error) {// 请求失败
          console.log(error);
          _this.$message({
            message:"添加失败",
            type:"error"
          })
        })
        .finally(function(){
          _this.showOwnerProducts()
          _this.addProducts = false
        });
      }
      else{
        axios.post( config_url+'/product/updateProducts', _this.productsObj)
        .then(function (response) {// 请求成功
          console.log(response)
          _this.$message({
            message:"修改成功",
            type:"success"
          })
         
        })
        .catch(function (error) {// 请求失败
          console.log(error);
          _this.$message({
            message:"修改失败",
            type:"error"
          })
        })
        .finally(function(){
          _this.addProducts = false
          _this.showOwnerProducts()
        });
      }
    },
    //后台管理 房东页面 搜索框
    checkOwnerByName(){
      var _this = this
      axios.get( config_url+'/owner/getByName/'+_this.checkOwnerByNameVar, {
      })
        .then(function (response) {// 请求成功
          console.log(response)
          _this.allOwnerInfo=response.data.data
          _this.$message({
            message:"查询成功",
            type:"success"
          })
     
        })
        .catch(function (error) {// 请求失败
          console.log(error);
          _this.$message({
            message:"查询失败",
            type:"error"
          })
        });
    },
    //房东管理 房源信息 修改产品界面
    changeProducts(e){
      var _this = this

      console.log(e)
      axios.get( config_url+'/product/'+e, {
      })
        .then(function (response) {// 请求成功
          console.log(response)
          _this.productsObj = response.data.data
          _this.addProducts = true
        })
        .catch(function (error) {// 请求失败
          console.log(error);
        });
    },
    //房东管理 产品信息 删除产品
    deleteProducts(e){
      var _this = this

console.log(e)
axios.delete( config_url+'/product/'+e, {
})
  .then(function (response) {// 请求成功
    console.log(response)
    _this.$message({
            message:"删除成功",
            type:"success"
          })
  })
  .catch(function (error) {// 请求失败
    console.log(error);
    _this.$message({
            message:"删除失败",
            type:"error"
          })
  })
  .finally(function(){
    _this.showOwnerProducts()
    _this.checkOwnerProductByNameVar = null
  });
    },
    //房东管理 产品信息 搜索
    checkOwnerProductByName(){
      var _this = this
      axios.get( config_url+'/product/getByName/'+_this.checkOwnerProductByNameVar, {
      })
        .then(function (response) {// 请求成功
          console.log(response)
          _this.ownerProducts=response.data.data
          _this.$message({
            message:"查询成功",
            type:"success"
          })
     
        })
        .catch(function (error) {// 请求失败
          console.log(error);
          _this.$message({
            message:"查询失败",
            type:"error"
          })
        });
    },
    //后台管理 房东信息 按名字升序
    allOwnerInfoAESCBYname(){
      
      var _this = this;
      if(_this.checkOwnerByNameVar == null ||_this.checkOwnerByNameVar =='' )
      {
        axios.get( config_url+'/owner/aesc', {
      })
        .then(function (response) {// 请求成功
          console.log(response)
         _this.allOwnerInfo = response.data.data
        })
        .catch(function (error) {// 请求失败
          console.log(error);
        });
      }
      else{
        axios.get( config_url+'/owner/aescbyname/'+_this.checkOwnerByNameVar, {
      })
        .then(function (response) {// 请求成功
          console.log(response)
         _this.allOwnerInfo = response.data.data
        })
        .catch(function (error) {// 请求失败
          console.log(error);
        });
      }
      
    },
    //后台管理 房东信息 按名字降序
    allOwnerInfoDESCBYname(){
      
      var _this = this;
      if(_this.checkOwnerByNameVar == null ||_this.checkOwnerByNameVar =='' )
      {
        axios.get( config_url+'/owner/desc', {
      })
        .then(function (response) {// 请求成功
          console.log(response)
         _this.allOwnerInfo = response.data.data
        })
        .catch(function (error) {// 请求失败
          console.log(error);
        });
      }
      else{
        axios.get( config_url+'/owner/descbyname/'+_this.checkOwnerByNameVar, {
      })
        .then(function (response) {// 请求成功
          console.log(response)
         _this.allOwnerInfo = response.data.data
        })
        .catch(function (error) {// 请求失败
          console.log(error);
        });
      }
      
    },
     //房东管理 房源信息 按名字升序
    ownerHomestayAESCBYname(){
      var _this = this;
      if(_this.ownerHomestayCheckByNameVar== null ||_this.ownerHomestayCheckByNameVar =='' )
      {
        axios.get( config_url+'/homestay/aesc/'+_this.ownerId, {
      })
        .then(function (response) {// 请求成功
          console.log("============================")
          console.log(response.data.data)
         _this.ownerHomestay = response.data.data
        })
        .catch(function (error) {// 请求失败
          console.log(error);
        });
      }
      else{
        axios.get( config_url+'/homestay/aescbyname/'+_this.ownerHomestayCheckByNameVar+"/"+_this.ownerId, {
      })
        .then(function (response) {// 请求成功
          console.log(response.data.data)
         _this.ownerHomestay = response.data.data
        })
        .catch(function (error) {// 请求失败
          console.log(error);
        });
      }
    },
    //房东管理 房源信息 按名字降序
    ownerHomestayDESCBYname(){
      var _this = this;
      if(_this.ownerHomestayCheckByNameVar== null ||_this.ownerHomestayCheckByNameVar =='' )
      {
        axios.get( config_url+'/homestay/desc/'+_this.ownerId, {
      })
        .then(function (response) {// 请求成功
          console.log(response)
         _this.ownerHomestay = response.data.data
        })
        .catch(function (error) {// 请求失败
          console.log(error);
        });
      }
      else{
        axios.get( config_url+'/homestay/descbyname/'+_this.ownerHomestayCheckByNameVar+'/'+_this.ownerId, {
      })
        .then(function (response) {// 请求成功
          console.log(response)
         _this.ownerHomestay = response.data.data
        })
        .catch(function (error) {// 请求失败
          console.log(error);
        });
      }
    },
     //房东管理 产品信息 按名字升序
    ownerProductAESCBYname(){
      var _this = this;
      if(_this.checkOwnerProductByNameVar == null ||_this.checkOwnerProductByNameVar =='' )
      {
        axios.get( config_url+'/product/aesc', {
      })
        .then(function (response) {// 请求成功
          console.log(response)
         _this.ownerProducts = response.data.data
        })
        .catch(function (error) {// 请求失败
          console.log(error);
        });
      }
      else{
        axios.get( config_url+'/product/aescbyname/'+_this.checkOwnerProductByNameVar, {
      })
        .then(function (response) {// 请求成功
          console.log(response)
         _this.ownerProducts = response.data.data
        })
        .catch(function (error) {// 请求失败
          console.log(error);
        });
      }
    },
    //房东管理 产品信息 按名字降序
    ownerProductDESCBYname(){
      var _this = this;
      if(_this.checkOwnerProductByNameVar == null ||_this.checkOwnerProductByNameVar =='' )
      {
        axios.get( config_url+'/product/desc', {
      })
        .then(function (response) {// 请求成功
          console.log(response)
         _this.ownerProducts = response.data.data
        })
        .catch(function (error) {// 请求失败
          console.log(error);
        });
      }
      else{
        axios.get( config_url+'/product/descbyname/'+_this.checkOwnerProductByNameVar, {
      })
        .then(function (response) {// 请求成功
          console.log(response)
         _this.ownerProducts = response.data.data
        })
        .catch(function (error) {// 请求失败
          console.log(error);
        });
      }
    }
  },
  data() {
    return {
      //存放登录用户的用户名房东房源对象
      userName: "用户名",
      //房源信息数组
      homestayInfo: [
      ],
      //房东房源数组
      ownerHomestay:[
      ],
      //房东产品数组
      ownerProducts:[],
      //房东房源对象
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
      //后台管理 添加修改 需要使用的房东信息对象
      ownerInfoObj:{
        id:"",
        name:"",
        phone:"",
        email:"",
        username:"",
        password:""
      },
      //房东 产品对象
      productsObj:{
        id:"",
        name:"",
        description:"",
        countNow:"",
        countTotal:"",
        img:""
      },
      //后台管理 所有房东信息
      allOwnerInfo:[],
      //用来存放 房东房源搜索框的信息
      ownerHomestayCheckByNameVar:null,
      //用来存放 民宿管理房源信息搜素框的信息
      getAllByNameVar:null,
      //用于存放 后台管理房东信息搜索框的信息
      checkOwnerByNameVar:null,
     //用于存放 房东管理产品信息搜索框的信息 
      checkOwnerProductByNameVar:null,
   //控制页面跳转
      state: {
        //显示民宿管理 房源信息
        show_homestay_state: false,
        //显示房东管理 个人中心
        show_ownerInfo_state: false,
         //显示房东管理 房源信息
        show_ownerHomestay_state:false,
         //显示后台管理 房东信息
        show_allOwnerInfo_state:false,
         //显示房东管理 产品信息
        show_ownerProducts_state:false,
        //显示聊天框
        show_chat_window_state:false,
      },
      //房东Id
      ownerId:26,
      //民宿iD 用于添加产品时指定民宿
      homeId:null,
      //控制房东添加或者修改房源的弹出框
      ownerAddHomestay:false,
    //用来控制后台添加或者修改房东的弹出框
      addOwner:false,
      //用来控制民宿管理 房源信息 的订购
      order: false,
      //用来表示 页面加载时的动画
      loading: true,
      //用来控制房东添加或者修改产品的弹出框
      addProducts:false,
      //表示添加产品时对应的房源名字
      homeName:"",
      //导出 打印
      printObj: {
        id: 'printMe',
      },
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
