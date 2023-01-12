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
    <logInVue v-if="login_state == false"></logInVue>

    <el-container v-if="login_state == true" style="height: 660px; border: 1px solid #eee">
      <!-- 导航栏 -->
      <el-aside width="200px" style="background-color: #545c64">
        <!-- <el-col :span="5"> -->
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="1" v-if="controll_module.show_users==true">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="showUserInfo">个人中心</el-menu-item>
              <el-menu-item index="1-2" @click="showCart">购物车</el-menu-item>
              <el-menu-item index="1-3" @click="showComment">我的评价</el-menu-item>
              <el-menu-item index="1-4" @click="showTourPlan">我的旅游攻略</el-menu-item>
              <el-menu-item index="1-5" @click="showChatWindow">我的消息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2" v-if="controll_module.show_users == true">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>民宿管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="showHomestayInfo">房源信息</el-menu-item>
              <el-menu-item index="2-2" @click="showProducts">农产品信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3" v-if="controll_module.show_owner == true">
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
          <el-submenu index="4" v-if="controll_module.show_controller == true">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>后台管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1"@click="showBackUserInfo">用户信息</el-menu-item>
              <el-menu-item index="4-2" @click="showAllOwnerInfo">房东信息</el-menu-item>
              <el-menu-item index="4-3" @click="showBackHomeStayInfo">房源信息</el-menu-item>
              <el-menu-item index="4-4" @click="showAllProduct">农产品信息</el-menu-item>
              <el-menu-item index="4-5" @click="showBackCommentInfo">查看评价</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>驾驶舱</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="5" @click="showCockpit">驾驶舱界面</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
        <!-- </el-col> -->
      </el-aside>

      <el-container>
        <!-- 顶部信息 -->
        <el-header style="text-align: right; font-size: 12px">
          <div class="button" v-if="state.show_ownerInfo_state" @click="ownerInfoToArry">
        <download-excel
          class="export-excel-wrapper"
      :data="ownerInfoArry"
      :fields="ownerInfoFields"
      type="xls"
      worksheet="My Worksheet"
      name="房东个人信息">
          <el-button
            type="info"
            round
            icon="el-icon-download"
            style="float: left;margin-top: 0.5%;"
            >导出Excel</el-button>
        </download-excel>
        <el-button  v-print="printObj"
            type="info"
            round
            icon="el-icon-download"
            style="float: left;margin-top: 0.5%;"
            >打印</el-button>
      </div>
      <div class="button" v-if="state.show_ownerHomestay_state">
        <download-excel
          class="export-excel-wrapper"
      :data="ownerHomestay"
      :fields="ownerHomestayFieds"
      type="xls"
      worksheet="My Worksheet"
      name="我的房源">
          <el-button
            type="info"
            round
            icon="el-icon-download"
            style="float: left;margin-top: 0.5%;"
            >导出Excel</el-button>
        </download-excel>
        <el-button  v-print="printObj"
            type="info"
            round
            icon="el-icon-download"
            style="float: left;margin-top: 0.5%;"
            >打印</el-button>
      </div>
      <div class="button" v-if="state.show_ownerProducts_state">
        <download-excel
          class="export-excel-wrapper"
      :data="ownerProducts"
      :fields="ProductsFields"
      type="xls"
      worksheet="My Worksheet"
      name="我的农产品">
          <el-button
            type="info"
            round
            icon="el-icon-download"
            style="float: left;margin-top: 0.5%;"
            >导出Excel</el-button>
        </download-excel>
        <el-button  v-print="printObj"
            type="info"
            round
            icon="el-icon-download"
            style="float: left;margin-top: 0.5%;"
            >打印</el-button>
      </div>
      <div class="button" v-if="state.show_allproducts_state">
        <download-excel
          class="export-excel-wrapper"
      :data="allProducts"
      :fields="ProductsFields"
      type="xls"
      worksheet="My Worksheet"
      name="农产品信息">
          <el-button
            type="info"
            round
            icon="el-icon-download"
            style="float: left;margin-top: 0.5%;"
            >导出Excel</el-button>
        </download-excel>
        <el-button  v-print="printObj"
            type="info"
            round
            icon="el-icon-download"
            style="float: left;margin-top: 0.5%;"
            >打印</el-button>
      </div>
      <div class="button" v-if="state.show_allOwnerInfo_state">
        <download-excel
          class="export-excel-wrapper"
      :data="allOwnerInfo"
      :fields="ownerInfoFields"
      type="xls"
      worksheet="My Worksheet"
      name="房东信息">
          <el-button
            type="info"
            round
            icon="el-icon-download"
            style="float: left;margin-top: 0.5%;"
            >导出Excel</el-button>
        </download-excel>
        <el-button  v-print="printObj"
            type="info"
            round
            icon="el-icon-download"
            style="float: left;margin-top: 0.5%;"
            >打印</el-button>
      </div>
          <!-- 民宿管理 房源界面 的 搜索框 -->
          <div style="width: 1000px" v-if="state.show_homestay_state">
            <el-input placeholder="请输入名字" suffix-icon="el-icon-date" style="width: 200px; float: left"
              v-model="getAllByNameVar">
            </el-input>

            <el-button @click="getAllByName" type="primary" style="
                float: left;
                margin-top: 11px;
                margin-left: 20px;
                background-color: white;
                border: solid 0px;
                color: rgb(179, 192, 209);
              ">
              查询</el-button>
          </div>
          <!-- 房东管理 房源界面 搜索框 -->
          <div style="width: 1000px" v-if="state.show_ownerHomestay_state">
            <el-input placeholder="请输入名字" suffix-icon="el-icon-date" style="width: 200px; float: left"
              v-model="ownerHomestayCheckByNameVar">
            </el-input>

            <el-button @click="ownerHomestayCheckByName" type="primary" style="
                float: left;
                margin-top: 11px;
                margin-left: 20px;
                background-color: white;
                border: solid 0px;
                color: rgb(179, 192, 209);
              ">
              查询</el-button>
            <el-button @click="ownerHomestayAESCBYname" type="primary" style="
                float: left;
                margin-top: 11px;
                margin-left: 20px;
                background-color: white;
                border: solid 0px;
                color: rgb(179, 192, 209);
              ">按名字升序</el-button>
            <el-button @click="ownerHomestayDESCBYname" type="primary" style="
                float: left;
                margin-top: 11px;
                margin-left: 20px;
                background-color: white;
                border: solid 0px;
                color: rgb(179, 192, 209);
              ">按名字降序</el-button>
          </div>
          <!-- 后台管理 房东界面 搜索框 -->
          <div style="width: 1000px" v-if="state.show_allOwnerInfo_state">
            <el-input placeholder="请输入名字" suffix-icon="el-icon-date" style="width: 200px; float: left"
              v-model="checkOwnerByNameVar">
            </el-input>

            <el-button @click="checkOwnerByName" type="primary" style="
                float: left;
                margin-top: 11px;
                margin-left: 20px;
                background-color: white;
                border: solid 0px;
                color: rgb(179, 192, 209);
              ">
              查询</el-button>
            <el-button @click="allOwnerInfoAESCBYname" type="primary" style="
                float: left;
                margin-top: 11px;
                margin-left: 20px;
                background-color: white;
                border: solid 0px;
                color: rgb(179, 192, 209);
              ">按名字升序</el-button>
            <el-button @click="allOwnerInfoDESCBYname" type="primary" style="
                float: left;
                margin-top: 11px;
                margin-left: 20px;
                background-color: white;
                border: solid 0px;
                color: rgb(179, 192, 209);
              ">按名字降序</el-button>
          </div>
           <!-- 后台管理 产品界面 搜索框 -->
          <div style="width: 1000px" v-if="state.show_allproducts_state">
            <el-input
              placeholder="请输入名字"
              suffix-icon="el-icon-date"
              style="width: 200px; float: left"
              v-model="checkOwnerProductByNameVar"
            >
            </el-input>

            <el-button
              @click="checkAllProductByName"
              type="primary"
              style="
                float: left;
                margin-top: 11px;
                margin-left: 20px;
                background-color: white;
                border: solid 0px;
                color: rgb(179, 192, 209);
              "
            >
              查询</el-button
            >
            <el-button
              @click="allProductAESCBYname"
              type="primary"
              style="
                float: left;
                margin-top: 11px;
                margin-left: 20px;
                background-color: white;
                border: solid 0px;
                color: rgb(179, 192, 209);
              "
              >按名字升序</el-button
            >
            <el-button
              @click="allProductDESCBYname"
              type="primary"
              style="
                float: left;
                margin-top: 11px;
                margin-left: 20px;
                background-color: white;
                border: solid 0px;
                color: rgb(179, 192, 209);
              "
              >按名字降序</el-button
            >
          </div>
          <div style="width: 1000px" v-if="state.show_allproducts_state">
            <el-input
              placeholder="请输入名字"
              suffix-icon="el-icon-date"
              style="width: 200px; float: left"
              v-model="checkOwnerProductByNameVar"
            >
            </el-input>

            <el-button
              @click="checkAllProductByName"
              type="primary"
              style="
                float: left;
                margin-top: 11px;
                margin-left: 20px;
                background-color: white;
                border: solid 0px;
                color: rgb(179, 192, 209);
              "
            >
              查询</el-button
            >
            <el-button
              @click="allProductAESCBYname"
              type="primary"
              style="
                float: left;
                margin-top: 11px;
                margin-left: 20px;
                background-color: white;
                border: solid 0px;
                color: rgb(179, 192, 209);
              "
              >按名字升序</el-button
            >
            <el-button
              @click="allProductDESCBYname"
              type="primary"
              style="
                float: left;
                margin-top: 11px;
                margin-left: 20px;
                background-color: white;
                border: solid 0px;
                color: rgb(179, 192, 209);
              "
              >按名字降序</el-button
            >
          </div>
          <!-- 房东管理 产品界面 搜索框 -->
          <div style="width: 1000px" v-if="state.show_ownerProducts_state">
            <el-input
              placeholder="请输入名字"
              suffix-icon="el-icon-date"
              style="width: 200px; float: left"
              v-model="checkOwnerProductByNameVar"
            >
            </el-input>

            <el-button @click="checkOwnerProductByName" type="primary" style="
                float: left;
                margin-top: 11px;
                margin-left: 20px;
                background-color: white;
                border: solid 0px;
                color: rgb(179, 192, 209);
              ">
              查询</el-button>
            <el-button @click="ownerProductAESCBYname" type="primary" style="
                float: left;
                margin-top: 11px;
                margin-left: 20px;
                background-color: white;
                border: solid 0px;
                color: rgb(179, 192, 209);
              ">按名字升序</el-button>
            <el-button @click="ownerProductDESCBYname" type="primary" style="
                float: left;
                margin-top: 11px;
                margin-left: 20px;
                background-color: white;
                border: solid 0px;
                color: rgb(179, 192, 209);
              ">按名字降序</el-button>
          </div>
          <!-- 用户页面 攻略界面 搜索框 -->
          <div style="width: 1000px" v-if="state.show_tour_plan_state">
            <el-input placeholder="请输入内容" suffix-icon="el-icon-date" style="width: 200px; float: left"
              v-model="checkPlanByContentVar">

            </el-input>

            <el-button @click="checkPlan" type="primary" style="
                float: left;
                margin-top: 11px;
                margin-left: 20px;
                background-color: white;
                border: solid 0px;
                color: rgb(179, 192, 209);
              ">
              查询</el-button>
            <el-button @click="PlanAESCByTime" type="primary" style="
                float: left;
                margin-top: 11px;
                margin-left: 20px;
                background-color: white;
                border: solid 0px;
                color: rgb(179, 192, 209);
              ">按时间升序</el-button>
            <el-button @click="PlanDESCByTime" type="primary" style="
                float: left;
                margin-top: 11px;
                margin-left: 20px;
                background-color: white;
                border: solid 0px;
                color: rgb(179, 192, 209);
              ">按时间降序</el-button>
          </div>

          <!-- 用户页面 评论界面 搜索框 -->
          <div style="width: 1000px" v-if="state.show_comment_state">
            <el-input placeholder="请输入内容" suffix-icon="el-icon-date" style="width: 200px; float: left"
              v-model="checkCommentByContentVar">

            </el-input>

            <el-button @click="checkCommentByUserName" type="primary" style="
                float: left;
                margin-top: 11px;
                margin-left: 20px;
                background-color: white;
                border: solid 0px;
                color: rgb(179, 192, 209);
              ">
              按用户名查询</el-button>

            <el-button @click="checkCommentByHomestayName" type="primary" style="
                float: left;
                margin-top: 11px;
                margin-left: 20px;
                background-color: white;
                border: solid 0px;
                color: rgb(179, 192, 209);
              ">
              按房源名查询</el-button>
          </div>
          <!-- 界面右上角的小齿轮（导出打印统计） 和 用户名 -->
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item  v-print="printObj">打印</el-dropdown-item>
              <el-dropdown-item @click="printExcel">导出</el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{ userName }}</span>
          <!--注销账号按钮-->
          <el-button @click="state.show_logoutAccount_state=true">注销账号</el-button>
          <LogoutOwner v-if="state.show_logoutAccount_state" :id="this.ownerId" :deleteFormVisible = "state.show_logoutAccount_state" @closeLogoutOwner = "state.show_logoutAccount_state = false, login_state=false"/>
        </el-header>
        <!-- 主页面 -->
        <el-main v-loading="loading" id="printMe">
          <!-- <CommentPage v-if="state.show_comment_state"></CommentPage> -->
          <!-- <tourPlanVue v-if="state.show_tour_plan_state"></tourPlanVue> -->
          <chatMainVue v-if="state.show_chat_window_state"></chatMainVue>
          <productListVue v-if="state.show_products_state"></productListVue>
          <cartWindow v-if="state.show_cart_state"></cartWindow>
          <!--后台管理-用户信息-->
          <user-info v-if="this.state.show_backUserInfo_state"></user-info>
          <!--后台管理-房源信息-->
          <house-info v-if="this.state.show_backHomeStayInfo_state"></house-info>
          <!--后台管理-评论信息-->
          <comment-info v-if="this.state.show_backCommentInfo_state"></comment-info>
          <!-- 显示驾驶舱 -->
          <cockpitWindowVue v-if="this.state.show_cockpit_state"></cockpitWindowVue>

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
            <el-table-column prop="location" label="地址"> </el-table-column>
            <el-table-column prop="state" label="订购" width="200">
              <template slot="header">
                <el-button type="primary" round @click="bookHomeStay">确定预定</el-button>
              </template>

              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete" circle v-if="scope.row.order"
                  @click="unOrderHomestay(scope.row)"></el-button>
                <el-button :disabled="scope.row.success" type="success" icon="el-icon-check" circle v-else
                  @click="orderHomestay(scope.row)"></el-button>
              </template>
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

          <!-- 显示用户个人中心 -->
          <el-form ref="userInfo" :model="userInfo" label-width="80px" v-if="state.show_userInfo_state">
            <h1>个人信息中心</h1>

            <el-form-item label="用户名">
              <el-input v-model="userInfo.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="userInfo.password" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="userInfo.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="电话号码">
              <el-input v-model="userInfo.phone" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="userInfo.email" disabled></el-input>
            </el-form-item>
            <el-button type="info" @click="modifyUserInfo(userInfo.id)">修改</el-button>
          </el-form>
          <!-- 显示房东房源 -->
          <el-table v-if="state.show_ownerHomestay_state" :data="ownerHomestay">
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
            <el-table-column prop="location" label="地址"> </el-table-column>

            <el-table-column width="100">
              <template slot-scope="id">
                <el-button type="primary" @click="changeHomestay(id.row.id)">修改</el-button>
              </template>
            </el-table-column>
            <el-table-column width="100">
              <template slot-scope="id">
                <el-button type="danger" @click="deleteHomestay(id.row.id)">删除</el-button>
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
                <el-input
                  v-model="ownerHomestayObj.time"
                  autocomplete="off"
                  :width="100"
                ></el-input>
              </el-form-item>
              <el-form-item label="总数" :label-width="10">
                <el-input v-model="ownerHomestayObj.countTotal" autocomplete="off" :width="100"></el-input>
              </el-form-item>
              <el-form-item label="状态" :label-width="10">
                <el-select v-model="ownerHomestayObj.state" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
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
            <el-table-column width="100">
              <template slot-scope="id">
                <el-button type="primary" @click="changeOwnerInfo(id.row.id)">修改</el-button>
              </template>
            </el-table-column>
            <el-table-column width="100">
              <template slot-scope="id">
                <el-button type="danger" @click="deleteOwnerInfo(id.row.id)">删除</el-button>
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
                <el-input v-model="ownerInfoObj.password" autocomplete="off" :width="100" type="password"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addOwner = false">取 消</el-button>
              <el-button type="primary" @click="submitAddOwner">确 定</el-button>
            </div>
          </el-dialog>

          <!-- 房东管理 显示房东农产品 -->
          <el-table v-if="state.show_ownerProducts_state" :data="ownerProducts">
            <el-table-column prop="name" label="名字" width="120">
            </el-table-column>

            <el-table-column prop="countNow" label="剩余" width="120">
            </el-table-column>
            <el-table-column prop="description" label="描述" width="500">
            </el-table-column>
            <el-table-column width="100">
              <template slot-scope="id">
                <el-button type="primary" @click="changeProducts(id.row.id)"
                  >修改</el-button
                >
              </template>
            </el-table-column>
            <el-table-column width="100">
              <template slot-scope="id">
                <el-button type="danger" @click="deleteProducts(id.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
           <!-- 后台管理 显示农产品 -->
           <el-table v-if="state.show_allproducts_state" :data="allProducts">
            <el-table-column prop="name" label="名字" width="120">
            </el-table-column>

            <el-table-column prop="countNow" label="剩余" width="120">
            </el-table-column>
            <el-table-column prop="description" label="描述" width="500">
            </el-table-column>
            <el-table-column width="100">
              <template slot-scope="id">
                <el-button type="primary" @click="changeProducts(id.row.id)">修改</el-button>
              </template>
            </el-table-column>
            <el-table-column width="100">
              <template slot-scope="id">
                <el-button type="danger" @click="deleteProducts(id.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 产品添加界面 -->

          <el-dialog title="产品信息" :visible.sync="addProducts">
            <el-select v-model="homeId" placeholder="请选择应的房源" v-if="productsObj.id == null || productsObj.id == ''">
              <el-option v-for="item in ownerHomestay" :key="item.name" :label="item.name" :value="item.id">
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
          <!-- 显示旅游攻略 -->
          <el-table v-if="state.show_tour_plan_state" :data="tableData">
            <el-table-column prop="content" label="名字" width="400">
            </el-table-column>

            <el-table-column prop="time" label="时间" width="180">
            </el-table-column>

            <el-table-column width="100">
              <template slot-scope="id">
                <el-button type="primary" @click="changePlan(id.row.id)">修改</el-button>
              </template>
            </el-table-column>
            <el-table-column width="100">
              <template slot-scope="id">
                <el-button type="danger" @click="deletePlan(id.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 攻略添加界面 -->

          <el-dialog title="攻略信息" :visible.sync="addNewPlan_state">
            <el-form :model="planObj">
              <el-form-item label="内容" :label-width="10">
                <el-input v-model="planObj.content" autocomplete="off" :width="100"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addNewPlan_state = false">取 消</el-button>
              <el-button type="primary" @click="submitAddPlan">确 定</el-button>
            </div>
          </el-dialog>

          <!-- 显示评论界面 -->
          <el-table v-if="state.show_comment_state" :data="comments">
            <el-table-column prop="comment" label="评论" width="400">
            </el-table-column>

            <el-table-column prop="userName" label="用户名" width="180">
            </el-table-column>

            <el-table-column prop="homestayName" label="房源名称" width="180">
            </el-table-column>

            <el-table-column width="100">
              <template slot-scope="id">
                <el-button type="primary" @click="changeComment(id.row.id)">修改</el-button>
              </template>
            </el-table-column>
            <el-table-column width="100">
              <template slot-scope="id">
                <el-button type="danger" @click="deleteComment(id.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>


          <!-- 评论添加界面 -->
          <el-dialog title="评论" :visible.sync="addNewComment_state">
            <el-form :model="commentObj">
              <el-form-item label="用户昵称" :label-width="10">
                <el-input v-model="commentObj.userName" autocomplete="off" :width="100"></el-input>
              </el-form-item>

              <el-form-item label="民宿名称" :label-width="10">
                <el-input v-model="commentObj.homestayName" autocomplete="off" :width="100"></el-input>
              </el-form-item>

              <el-form-item label="评论" :label-width="10">
                <el-input v-model="commentObj.comment" autocomplete="off" :width="100"></el-input>
              </el-form-item>

              <el-form-item label="民宿ID" :label-width="10">
                <el-input v-model="commentObj.homestayId" autocomplete="off" :width="100"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addNewComment_state = false">取 消</el-button>
              <el-button type="primary" @click="submitAddComment">确 定</el-button>
            </div>
          </el-dialog>
          
          
          <template>
  <!--  -->
    <div id="sector" v-if="state.show_manager_state"  ref="chart">
          </div>

</template>
        </el-main>
        <el-button type="primary" v-if="state.show_ownerHomestay_state" @click="addHomestay">添加</el-button>
        <el-button type="primary" v-if="state.show_allOwnerInfo_state" @click="addOwnerInfo">添加</el-button>
        <el-button type="primary" v-if="state.show_ownerProducts_state" @click="addNewProducts">添加</el-button>
        <el-button type="primary" v-if="state.show_tour_plan_state" @click="addNewPlan">添加</el-button>
        <el-button type="primary" v-if="state.show_comment_state" @click="addNewComment">添加</el-button>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import config from "./assets/config";HouseInfo
import chatMainVue from "./components/chatMain.vue";
import logInVue from "./components/logIn.vue";
import productListVue from "./components/productList.vue";
import cartWindow from "./components/cartWindow.vue";
import HouseInfo from "./components/HouseInfo.vue";
import UserInfo from "./components/UserInfo.vue";
import CommentInfo from "./components/CommentInfo.vue";
import cockpitWindowVue from "./components/cockpitWindow.vue";
import LogoutOwner from "./components/LogoutOwner.vue";

var config_url = config.url;
const echarts = require('echarts');
export default {
  name: "App",
  components: {
    // CommentPage,
    // tourPlanVue,
    chatMainVue,
    logInVue,
    productListVue,
    cartWindow,
    HouseInfo,
    UserInfo,
    CommentInfo,
    cockpitWindowVue,
    LogoutOwner
},
  methods: {
    ownerInfoToArry(){
      this.ownerInfoArry= [
        this.ownerInfo
      ]
    },
    allProductAESCBYname(){
      var _this = this;
      if (
        _this.checkOwnerProductByNameVar == null ||
        _this.checkOwnerProductByNameVar == ""
      ) {
        axios
          .get(config_url + "/product/aesc", {})
          .then(function (response) {
            // 请求成功
            console.log(response);
            _this.allProducts = response.data.data;
          })
          .catch(function (error) {
            // 请求失败
            console.log(error);
          });
      } else {
        axios
          .get(
            config_url +
              "/product/aescbyname/" +
              _this.checkOwnerProductByNameVar,
            {}
          )
          .then(function (response) {
            // 请求成功
            console.log(response);
            _this.allProducts = response.data.data;
          })
          .catch(function (error) {
            // 请求失败
            console.log(error);
          });
      }
    },
    allProductDESCBYname(){
      var _this = this;
      if (
        _this.checkOwnerProductByNameVar == null ||
        _this.checkOwnerProductByNameVar == ""
      ) {
        axios
          .get(config_url + "/product/desc", {})
          .then(function (response) {
            // 请求成功
            console.log(response);
            _this.allProducts = response.data.data;
          })
          .catch(function (error) {
            // 请求失败
            console.log(error);
          });
      } else {
        axios
          .get(
            config_url +
              "/product/descbyname/" +
              _this.checkOwnerProductByNameVar,
            {}
          )
          .then(function (response) {
            // 请求成功
            console.log(response);
            _this.allProducts = response.data.data;
          })
          .catch(function (error) {
            // 请求失败
            console.log(error);
          });
      }
    },
    checkAllProductByName(){
      var _this = this;
      axios
        .get(
          config_url + "/product/getByName/" + _this.checkOwnerProductByNameVar,
          {}
        )
        .then(function (response) {
          // 请求成功
          console.log(response);
          _this.allProducts = response.data.data;
          _this.$message({
            message: "查询成功",
            type: "success",
          });
        })
        .catch(function (error) {
          // 请求失败
          console.log(error);
          _this.$message({
            message: "查询失败",
            type: "error",
          });
        });
    },
    showAllProduct(){
      var _this = this;
      _this.loading = true;
      axios
        .get(config_url + "/product" , {})
        .then(function (response) {
          // 请求成功
          console.log(response);
          _this.allProducts = response.data.data;
          _this.state = {
            show_allproducts_state:true
          };
          _this.loading = false;
        })
        .catch(function (error) {
          // 请求失败
          console.log(error);
        });
    },
    PlanAESCByTime() {
      var _this = this
      _this.$axios({
        url: `${config_url}/strategy/desc`,
        method: "get"
      }).then(res => {
        _this.tableData = res.data.data
        //处理结果
      }).catch(e => {
        console.log(e)
        //处理异常
      })
    },
    PlanDESCByTime() {
      var _this = this
      _this.$axios({
        url: `${config_url}/strategy/asc`,
        method: "get"
      }).then(res => {
        _this.tableData = res.data.data
        //处理结果
      }).catch(e => {
        console.log(e)
        //处理异常
      })
    },
    checkPlan() {
      var _this = this
      this.$axios({
        method: "get",
        url: `${config_url}/strategy/getByContent` + '/' + _this.checkPlanByContentVar,
      }).then(res => {
        console.log(res)
        _this.tableData = res.data.data
        _this.$message({
          message: "查询成功",
          type: "success",
        });
      }).catch(e => {
        console.log(e)
        _this.$message({
          message: "查询失败",
          type: "error",
        });
        //处理异常
      })
    },

    checkCommentByUserName() {
      var _this = this;
      this.$axios({
        method: "get",
        url: `${config_url}/comment/getCommentByUserName/` + '/' + _this.checkCommentByContentVar,
      }).then(res => {
        //处理数据
        console.log(res)
        _this.comments = res.data.data
        _this.$message({
          message: "查询成功",
          type: "success",
        });
      }).catch(e => {
        //处理异常
        console.log(e)
        _this.$message({
          message: "查询失败",
          type: "error",
        });
      })
    },

    checkCommentByHomestayName() {
      var _this = this;
      this.$axios({
        method: "get",
        url: `${config_url}/comment/getCommentByHomestayName/` + '/' + _this.checkCommentByContentVar,
      }).then(res => {
        //处理数据
        console.log(res)
        _this.comments = res.data.data
        _this.$message({
          message: "查询成功",
          type: "success",
        });
      }).catch(e => {
        //处理异常
        console.log(e)
        _this.$message({
          message: "查询失败",
          type: "error",
        });
      })
    },
    changePlan(event) {
      var _this = this
      this.addNewPlan_state = true
      this.$axios({
        method: "get",
        url: `${config_url}/strategy/getOne` + '/' + event,
      }).then(res => {
        console.log(res)
        _this.planObj = res.data.data
        //处理结果
      }).catch(e => {
        console.log(e)
        //处理异常
      })
    },

    changeComment(event) {
      var _this = this
      this.addNewComment_state = true
      this.$axios({
        method: "get",
        url: `${config_url}/comment/getOne` + '/' + event,
      }).then(res => {
        console.log(res)
        _this.commentObj = res.data.data
        //处理结果
      }).catch(e => {
        console.log(e)
        //处理异常
      })
    },
    submitAddPlan() {
      console.log("sssss" + this.planObj.content)
      var _this = this;
      if (_this.planObj.id == null || _this.planObj.id == "") {
        _this.$axios({
          url: `${config_url}/strategy`,//模板字符串
          method: "post",
          data: {
            content: _this.planObj.content
          }
        }).then(res => {
          if (!res.data.data) {
            _this.$message({
              message: "添加成功",
              type: "success",
            });
          }
          else {
            _this.$message({
              message: "添加失败",
              type: "error",
            });
          }
          _this.addNewPlan_state = false
          _this.planObj.content = ''
          _this.showTourPlan()
          //处理结果
        }).catch(e => {
          console.log(e)
          //处理异常
        })
      }
      else {
        _this.$axios({
          url: `${config_url}/strategy/update`,
          method: "post",
          data: _this.planObj
        }).then(res => {
          console.log(res)
          if (!res.data.flag) {
            _this.$message({
              message: "修改成功",
              type: "success",
            });
          }
          else {
            _this.$message({
              message: "修改失败",
              type: "error",
            });
          }
          _this.addNewPlan_state = false
          _this.planObj = {
            id: "",
            userId: "",
            content: "",
            time: ""
          }
          _this.showTourPlan()
          //处理结果
        }).catch(e => {
          console.log(e)
          //处理异常
        })
      }
      // axios
      //   .post(config_url + "/user", _this.userInfoObj)
      //   .then(function (response) {
      //     // 请求成功
      //     console.log(response);
      //     _this.$message({
      //       message: "成功",
      //       type: "success",
      //     });
      //   })
      //   .catch(function (error) {
      //     // 请求失败
      //     console.log(error);
      //     _this.$message({
      //       message: "失败",
      //       type: "error",
      //     });
      //   })
      //   .finally(function () {
      //     // if(_this.state.show_allOwnerInfo_state ==true){
      //     //   _this.showAllOwnerInfo()
      //     // }

      //     if (_this.state.show_userrInfo_state == true) {
      //       _this.showUserInfo();
      //     }

      //     _this.addUser = false;
      // });
    },
    addNewPlan() {
      this.addNewPlan_state = true,
        this.planObj = {
          id: "",
          userId: "",
          content: "",
          time: ""
        }
    },

    addNewComment() {
      this.addNewComment_state = true,
        this.commentObj = {
          id: "",
          userId: "",
          userName: "",
          homestayId: "",
          homestayName: "",
          comment: "",
        }
    },

    submitAddComment() {
      console.log("这是评论添加" + this.commentObj + "hahaha")
      var _this = this;
      if (_this.commentObj.id == null || _this.commentObj.id == "") {
        _this.$axios({
          url: `${config_url}/comment/addComment`,//模板字符串
          method: "post",
          data: _this.commentObj
          //  {
          //   userName: _this.commentObj.userName,
          //   homestayNmae: _this.commentObj.homestayName,
          //   comment: _this.commentObj.comment,
          //   homestayId: _this.commentObj.homestayId
          // }
        }).then(res => {
          if (res.data.data) {
            _this.$message({
              message: "添加成功",
              type: "success",
            });
          }
          else {
            _this.$message({
              message: "添加失败",
              type: "error",
            });
          }
          _this.addNewComment_state = false
          _this.commentObj.content = ''
          _this.showComment()
          //处理结果
        }).catch(e => {
          console.log(e)
          //处理异常
        })
      }
    },
    deletePlan(event) {
      console.log(event);
      var _this = this
      this.$axios({
        url: `${config_url}/strategy/` + event, //id通过请求路径传
        method: "delete",
      }).then(res => {
        if (!res.data.data) {
          _this.$message({
            message: "删除成功",
            type: "success",
          });
        }
        else {
          _this.$message({
            message: "删除失败",
            type: "error",
          });
        }
        _this.showTourPlan()
        //处理结果
      }).catch(e => {
        console.log(e)
        //处理异常
      })
    },

    deleteComment(event) {
      console.log(event);
      var _this = this
      this.$axios({
        method: "delete",
        url: `${config_url}/comment/deleteComment/` + event,
      }).then(res => {
        console.log(res);
        //处理数据
        if (res.data.flag) {
          _this.$message({
            message: "删除成功",
            type: "success",
          });
        }
        else {
          _this.$message({
            message: "删除失败",
            type: "error",Cockpit
          });
        }
        _this.showComment();
        //处理结果
      }).catch(e => {
        //处理异常
        console.log(e);
      })
    },
    //显示驾驶舱
    showCockpit(){
      location.href=config_url
       
    },
    //显示用户个人中心
    showUserInfo() {
      console.log("show user info called");
      var _this = this;
      _this.loading = true;
      axios
        .get(config_url + "/user/" + _this.userId, {})
        .then(function (response) {
          // 请求成功
          console.log(response);
          _this.userInfo = response.data.data;
          _this.state = {
            show_userInfo_state: true,
          };
          _this.loading = false;
        })
        .catch(function (error) {
          // 请求失败
          console.log(error);
        });
    },
    //导出excel
    printExcel(){
        // 创建工作表
        const data = XLSX.utils.json_to_sheet(this.ownerInfo)
        // 创建工作簿
        const wb = XLSX.utils.book_new()
        // 将工作表放入工作簿中
        XLSX.utils.book_append_sheet(wb, data, 'data')
        // 生成文件并下载
        XLSX.writeFile(wb, 'comment.xlsx')
    },
    //修改用户个人中心
    modifyUserInfo() {
      this.addUser = true;
      this.userInfoObj = this.userInfo;
      console.log(this.userInfoObj);
    },
    //提交添加或者修改用户信息
    submitAddUser() {
      var _this = this;

      axios
        .post(config_url + "/user", _this.userInfoObj)
        .then(function (response) {
          // 请求成功
          console.log(response);
          _this.$message({
            message: "成功",
            type: "success",
          });
        })
        .catch(function (error) {
          // 请求失败
          console.log(error);
          _this.$message({
            message: "失败",
            type: "error",
          });
        })
        .finally(function () {
          // if(_this.state.show_allOwnerInfo_state ==true){
          //   _this.showAllOwnerInfo()
          // }

          if (_this.state.show_userrInfo_state == true) {
            _this.showUserInfo();
          }

          _this.addUser = false;
        });
    },
    //显示民宿管理 房源信息界面
    showHomestayInfo() {
      var _this = this;
      _this.loading = true;
      axios
        .get(config_url + "/homestay", {})
        .then(function (response) {
          // 请求成功

          for (let i in response.data.data) {
            response.data.data[i].order = false;
            response.data.data[i].success = false;
          }
          _this.state = {
            show_homestay_state: true,
          };
          _this.homestayInfo = response.data.data;
          _this.loading = false;
        })
        .catch(function (error) {
          // 请求失败
          console.log(error);
        });
    },
    //显示聊天窗
    showChatWindow() {
      //先等容器创建，再传递参数
      setTimeout(() => {
        this.$bus.$emit("chatWindow", this.ownerId);
      }, 500);
      this.state = {
        show_chat_window_state: true,
      };
    },

    //显示购物车
    showCart() {
      //先等容器创建，再传递参数
      setTimeout(() => {
        this.$bus.$emit("cartWindow", this.cart, this.tempInfo);
      }, 500);
      this.state = {
        show_cart_state: true,
      };
    },

    //显示旅游攻略
    showTourPlan() {
      // setTimeout(() => {
      //   this.$bus.$emit("tourPlan");
      // }, 500);
      // this.state = {
      //   show_tour_plan_state: true,
      // };
      var _this = this;
      _this.loading = true;
      // axios
      //   .get(config_url + "/strategy", {})
      //   .then(function (response) {
      //     // 请求成功

      //     for(let i in response.data.data){
      //       response.data.data[i].order=false;
      //       response.data.data[i].success=false;
      //     }
      //     _this.state = {
      //       show_homestay_state: true,
      //     };
      //     _this.homestayInfo = response.data.data;
      //     _this.loading = false;
      //   })
      //   .catch(function (error) {
      //     // 请求失败
      //     console.log(error);
      //   });

      this.$axios({
        url: `${config_url}/strategy/desc`,
        method: "get"
      }).then(res => {
        _this.tableData = res.data.data;
        console.log(res);
        _this.state = {
          show_tour_plan_state: true,
        };
        _this.loading = false;
      }).catch(e => {
        //处理异常
        console.log(e);
      })
    },
    showComment() {
      // setTimeout(() => {
      //   this.$bus.$emit("CommentPage");
      // }, 500);
      var _this = this;
      _this.loading = true;
      this.$axios({
        method: "get",
        url: `${config_url}/comment/getAllComment`,
      }).then(res => {
        _this.comments = res.data.data;
        // console.log(res);
        _this.state = {
          show_comment_state: true,
        };
        _this.loading = false;
      }).catch(e => {
        //处理异常
        console.log(e);
      })
    },
    //显示农产品
    showProducts() {
      this.state = {
        show_products_state: true,
      };
      setTimeout(() => {
        this.$bus.$emit("product", this.userInfo);
      }, 500);
    },

    orderHomestay(row) {
      row.order = true;

    },
    //控制民宿管理 房源信息界面 的取消订购
    unOrderHomestay(row) {
      row.order = false;

    },

    //预定房间
    bookHomeStay() {
      this.loading = true;
      let homeId = [];
      for (let i in this.homestayInfo) {
        if (this.homestayInfo[i].order) {
          homeId.push(this.homestayInfo[i].id);
        }
      }
      this.$axios({
        url: `${config_url}/homestay/book`,
        method: "post",
        data: homeId
      }).then(res => {
        let success = res.data.data;
        for (let i in success) {
          for (let j in this.homestayInfo) {
            if (success[i] == this.homestayInfo[j].id) {
              this.homestayInfo[j].success = true;
              this.homestayInfo[j].order = false;
            }
          }
        }
        this.$message({
          type: 'success',
          message: `${success}号商品订购成功！剩下可删除的就是订购失败的哦！`
        })
        this.loading = false;
      }).catch(e => {
        this.loading = false;
        this.$message({
          type: 'error',
          message: e
        })
      })
    },

    //显示房东 个人中心
    showOwnerInfo() {
      console.log("xxxxx");
      var _this = this;
      _this.loading = true;
      axios
        .get(config_url + "/owner/" + _this.ownerId, {})
        .then(function (response) {
          // 请求成功
          console.log(response);
          _this.ownerInfo = response.data.data;
          _this.state = {
            show_ownerInfo_state: true,
          };
          _this.loading = false;
        })
        .catch(function (error) {
          // 请求失败
          console.log(error);
        });
    },
    //控制房东 个人中心 的修改弹出框
    modifyOwnerInfo() {
      this.addOwner = true;
      this.ownerInfoObj = this.ownerInfo;
    },
    //显示房东管理 房源信息界面
    showOwnerHomestay() {
      var _this = this;
      _this.loading = true;
      axios
        .get(config_url + "/homestay/getByOwnerId/" + _this.ownerId, {})
        .then(function (response) {
          // 请求成功
          _this.ownerHomestay = response.data.data;
          _this.state = {
            show_ownerHomestay_state: true,
          };

          _this.loading = false;
        })
        .catch(function (error) {
          // 请求失败
          console.log(error);
        });
    },
    //控制房东管理 房源信息 添加界面
    addHomestay() {
      this.ownerAddHomestay = true;
      this.ownerHomestayObj = {
        id: "",
        name: "",
        location: "",
        time: "",
        countNow: "",
        countTotal: "",
        state: "",
        description: "",
      };
    },
    //控制房东管理 房源信息 添加或者修改的确定按钮提交信息
    submitAddHomestay() {
      var _this = this;
      if(_this.ownerHomestayObj.name == "" ||_this.ownerHomestayObj.name == null || _this.ownerHomestayObj.location==null || _this.ownerHomestayObj.location=="" || _this.ownerHomestayObj.time == null|| _this.ownerHomestayObj.time == ""
      || _this.ownerHomestayObj.countTotal==0 ||_this.ownerHomestayObj.state == null ||_this.ownerHomestayObj.state == ""|| _this.ownerHomestayObj.description==null|| _this.ownerHomestayObj.description=="")
      {
        _this.$message({
              message: "输入不能为空",
              type: "error",
            });
      }
      else{
      if (
        _this.ownerHomestayObj.id == null ||
        _this.ownerHomestayObj.id == ""
      ) {
        _this.ownerHomestayObj.id = _this.ownerId;
        console.log(this.ownerHomestayObj);
        axios
          .post(config_url + "/owner/addhomestay", _this.ownerHomestayObj)
          .then(function (response) {
            // 请求成功
            console.log(response);
            _this.$message({
              message: "添加成功",
              type: "success",
            });
          })
          .catch(function (error) {
            // 请求失败
            console.log(error);
            _this.$message({
              message: "添加失败",
              type: "error",
            });
          })
          .finally(function () {
            _this.ownerAddHomestay = false;
            _this.showOwnerHomestay();
          });
      } else {
        axios
          .post(config_url + "/owner/updatehomestay", _this.ownerHomestayObj)
          .then(function (response) {
            // 请求成功
            console.log(response);
            _this.$message({
              message: "修改成功",
              type: "success",
            });
          })
          .catch(function (error) {
            // 请求失败
            console.log(error);
            _this.$message({
              message: "修改失败",
              type: "error",
            });
          })
          .finally(function () {
            _this.ownerAddHomestay = false;
            _this.showOwnerHomestay();
          });
      }}
    },
    //控制房东管理 房源信息 修改界面
    changeHomestay(e) {
      var _this = this;
      console.log(e);
      axios
        .get(config_url + "/homestay/" + e, {})
        .then(function (response) {
          // 请求成功
          console.log(response);
          _this.ownerHomestayObj = response.data.data;
          _this.ownerAddHomestay = true;
        })
        .catch(function (error) {
          // 请求失败
          console.log(error);
        });
    },
    //控制房东管理 房源信息 删除功能
    deleteHomestay(e) {
      var _this = this;
      axios
        .delete(config_url + "/homestay/" + e, {})
        .then(function (response) {
          // 请求成功
          console.log(response);
          _this.$message({
            message: "删除成功",
            type: "success",
          });
          console.log(_this.ownerHomestay);
        })
        .catch(function (error) {
          // 请求失败
          console.log(error);
          _this.$message({
            message: "删除失败",
            type: "error",
          });
        })
        .finally(function () {
          _this.showOwnerHomestay();
          _this.ownerHomestayCheckByNameVar = null;
        });
    },
    //显示后台管理 房东信息
    showAllOwnerInfo() {
      var _this = this;
      _this.loading = true;
      axios
        .get(config_url + "/owner", {})
        .then(function (response) {
          // 请求成功
          console.log(response);
          _this.allOwnerInfo = response.data.data;
          _this.state = {
            show_allOwnerInfo_state: true,
          };
          _this.loading = false;
        })
        .catch(function (error) {
          // 请求失败
          console.log(error);
        });
    },
    //显示后台管理 房东信息 修改界面
    changeOwnerInfo(e) {
      var _this = this;
      console.log(e);
      axios
        .get(config_url + "/owner/" + e, {})
        .then(function (response) {
          // 请求成功
          console.log(response);
          _this.ownerInfoObj = response.data.data;
          _this.$message({
            message: "修改成功",
            type: "success",
          });
          _this.addOwner = true;
        })
        .catch(function (error) {
          // 请求失败
          console.log(error);
          _this.$message({
            message: "修改失败",
            type: "error",
          });
        });
    },
    //显示后台管理 房东信息 删除功能
    deleteOwnerInfo(e) {
      var _this = this;
      axios
        .delete(config_url + "/owner/" + e, {})
        .then(function (response) {
          // 请求成功
          console.log(response);
          _this.$message({
            message: "删除成功",
            type: "success",
          });
          console.log(_this.showAllOwnerInfo);
        })
        .catch(function (error) {
          // 请求失败
          console.log(error);
          _this.$message({
            message: "删除失败",
            type: "error",
          });
        })
        .finally(function () {
          _this.checkOwnerByNameVar = null;
          _this.showAllOwnerInfo();
        });
    },
    //显示后台管理 房东信息 添加界面
    addOwnerInfo() {
      this.addOwner = true;
      this.ownerInfoObj = {
        id: "",
        name: "",
        phone: "",
        email: "",
        username: "",
        password: "",
      };
    },
    //显示后台管理 房东信息 添加或者修改的确定按钮提交信息
    submitAddOwner() {
      var _this = this;

      axios
        .post(config_url + "/owner", _this.ownerInfoObj)
        .then(function (response) {
          // 请求成功
          console.log(response);
          _this.$message({
            message: "成功",
            type: "success",
          });
        })
        .catch(function (error) {
          // 请求失败
          console.log(error);
          _this.$message({
            message: "失败",
            type: "error",
          });
        })
        .finally(function () {
          if (_this.state.show_allOwnerInfo_state == true) {
            _this.showAllOwnerInfo();
          }

          if (_this.state.show_ownerInfo_state == true) {
            _this.showOwnerInfo();
          }

          _this.addOwner = false;
        });
    },
    //房东管理 房源信息 查询按钮
    ownerHomestayCheckByName() {
      console.log(this.ownerHomestayCheckByNameVar);
      var _this = this;
      axios
        .get(
          config_url +
          "/homestay/getByOwnerId/" +
          _this.ownerId +
          "/" +
          _this.ownerHomestayCheckByNameVar,
          {}
        )
        .then(function (response) {
          // 请求成功
          console.log(response);
          _this.ownerHomestay = response.data.data;
          _this.$message({
            message: "查询成功",
            type: "success",
          });
        })
        .catch(function (error) {
          // 请求失败
          console.log(error);
          _this.$message({
            message: "查询失败",
            type: "error",
          });
        });
    },
    //民宿管理 房源信息 查询按钮
    getAllByName() {
      var _this = this;
      axios
        .get(config_url + "/homestay/getAllByName/" + _this.getAllByNameVar, {})
        .then(function (response) {
          // 请求成功
          console.log(response);
          _this.homestayInfo = response.data.data;
          _this.$message({
            message: "查询成功",
            type: "success",
          });
        })
        .catch(function (error) {
          // 请求失败
          console.log(error);
          _this.$message({
            message: "查询失败",
            type: "error",
          });
        });
    },
    //显示 房东管理 房源信息 产品界面
    showOwnerProducts() {
      var _this = this;
      _this.loading = true;
      axios
        .get(config_url + "/product/getAll/"+_this.ownerId, {})
        .then(function (response) {
          // 请求成功
          console.log(response);
          _this.ownerProducts = response.data.data;
          _this.state = {
            show_ownerProducts_state: true,
          };
          _this.loading = false;
        })
        .catch(function (error) {
          // 请求失败
          console.log(error);
        });
    },
    //显示 房东管理 房源信息 添加产品界面
    addNewProducts() {
      this.addProducts = true;
      this.productsObj = {
        id: "",
        name: "",
        description: "",
        countNow: "",
        countTotal: "",
        img: "",
      };
      var _this = this;
      axios
        .get(config_url + "/homestay/getByOwnerId/" + _this.ownerId, {})
        .then(function (response) {
          // 请求成功
          _this.ownerHomestay = response.data.data;
        })
        .catch(function (error) {
          // 请求失败
          console.log(error);
        });
    },
    //显示 房东管理 房源信息 添加或者修改的确定按钮提交信息
    submitAddProducts() {
      console.log(this.homeId);
      var _this = this;

      if(_this.productsObj.countTotal ==0 || _this.productsObj.description==null|| _this.productsObj.description==""||
      _this.productsObj.name==null||_this.productsObj.img==null||_this.productsObj.img==""||_this.productsObj.name=="")
      {
        _this.$message({
              message: "输入不能为空",
              type: "error",
            });
      }
      else{
      if (this.productsObj.id == null || this.productsObj.id == "") {
        _this.productsObj.id = _this.homeId;
        axios
          .post(config_url + "/product/addProducts", _this.productsObj)
          .then(function (response) {
            // 请求成功
            console.log(response);
            _this.$message({
              message: "添加成功",
              type: "success",
            });
          })
          .catch(function (error) {
            // 请求失败
            console.log(error);
            _this.$message({
              message: "添加失败",
              type: "error",
            });
          })
          .finally(function () {
            _this.showOwnerProducts();
            _this.addProducts = false;
          });
      } else {
        axios
          .post(config_url + "/product/updateProducts", _this.productsObj)
          .then(function (response) {
            // 请求成功
            console.log(response);
            _this.$message({
              message: "修改成功",
              type: "success",
            });
          })
          .catch(function (error) {
            // 请求失败
            console.log(error);
            _this.$message({
              message: "修改失败",
              type: "error",
            });
          })
          .finally(function () {
            _this.addProducts = false;
            if(_this.state.show_ownerProducts_state){
            _this.showOwnerProducts();}
            if(_this.state.show_allproducts_state){
              _this.showAllProduct()
            }
          });
      }
    }
    },
    //后台管理 房东页面 搜索框
    checkOwnerByName() {
      var _this = this;
      axios
        .get(config_url + "/owner/getByName/" + _this.checkOwnerByNameVar, {})
        .then(function (response) {
          // 请求成功
          console.log(response);
          _this.allOwnerInfo = response.data.data;
          _this.$message({
            message: "查询成功",
            type: "success",
          });
        })
        .catch(function (error) {
          // 请求失败
          console.log(error);
          _this.$message({
            message: "查询失败",
            type: "error",
          });
        });
    },
    //房东管理 房源信息 修改产品界面
    changeProducts(e) {
      var _this = this;

      console.log(e);
      axios
        .get(config_url + "/product/" + e, {})
        .then(function (response) {
          // 请求成功
          console.log(response);
          _this.productsObj = response.data.data;
          _this.addProducts = true;
        })
        .catch(function (error) {
          // 请求失败
          console.log(error);
        });
    },
    //房东管理 产品信息 删除产品
    deleteProducts(e) {
      var _this = this;

      console.log(e);
      axios
        .delete(config_url + "/product/" + e, {})
        .then(function (response) {
          // 请求成功
          console.log(response);
          _this.$message({
            message: "删除成功",
            type: "success",
          });
        })
        .catch(function (error) {
          // 请求失败
          console.log(error);
          _this.$message({
            message: "删除失败",
            type: "error",
          });
        })
        .finally(function () {
          if(_this.state.show_ownerProducts_state== true){
          _this.showOwnerProducts();
          }
          if(_this.state.show_allproducts_state){
            _this.showAllProduct()
          }
          _this.checkOwnerProductByNameVar = null;
        });
    },
    //房东管理 产品信息 搜索
    checkOwnerProductByName() {
      var _this = this;
      axios
        .get(
          config_url + "/product/getByName/" + _this.checkOwnerProductByNameVar+"/"+_this.ownerId,
          {}
        )
        .then(function (response) {
          // 请求成功
          console.log(response);
          _this.ownerProducts = response.data.data;
          _this.$message({
            message: "查询成功",
            type: "success",
          });
        })
        .catch(function (error) {
          // 请求失败
          console.log(error);
          _this.$message({
            message: "查询失败",
            type: "error",
          });
        });
    },
    //后台管理 房东信息 按名字升序
    allOwnerInfoAESCBYname() {
      var _this = this;
      if (
        _this.checkOwnerByNameVar == null ||
        _this.checkOwnerByNameVar == ""
      ) {
        axios
          .get(config_url + "/owner/aesc", {})
          .then(function (response) {
            // 请求成功
            console.log(response);
            _this.allOwnerInfo = response.data.data;
          })
          .catch(function (error) {
            // 请求失败
            console.log(error);
          });
      } else {
        axios
          .get(
            config_url + "/owner/aescbyname/" + _this.checkOwnerByNameVar,
            {}
          )
          .then(function (response) {
            // 请求成功
            console.log(response);
            _this.allOwnerInfo = response.data.data;
          })
          .catch(function (error) {
            // 请求失败
            console.log(error);
          });
      }
    },
    //后台管理 房东信息 按名字降序
    allOwnerInfoDESCBYname() {
      var _this = this;
      if (
        _this.checkOwnerByNameVar == null ||
        _this.checkOwnerByNameVar == ""
      ) {
        axios
          .get(config_url + "/owner/desc", {})
          .then(function (response) {
            // 请求成功
            console.log(response);
            _this.allOwnerInfo = response.data.data;
          })
          .catch(function (error) {
            // 请求失败
            console.log(error);
          });
      } else {
        axios
          .get(
            config_url + "/owner/descbyname/" + _this.checkOwnerByNameVar,
            {}
          )
          .then(function (response) {
            // 请求成功
            console.log(response);
            _this.allOwnerInfo = response.data.data;
          })
          .catch(function (error) {
            // 请求失败
            console.log(error);
          });
      }
    },
    //房东管理 房源信息 按名字升序
    ownerHomestayAESCBYname() {
      var _this = this;
      if (
        _this.ownerHomestayCheckByNameVar == null ||
        _this.ownerHomestayCheckByNameVar == ""
      ) {
        axios
          .get(config_url + "/homestay/aesc/" + _this.ownerId, {})
          .then(function (response) {
            // 请求成功
            console.log("============================");
            console.log(response.data.data);
            _this.ownerHomestay = response.data.data;
          })
          .catch(function (error) {
            // 请求失败
            console.log(error);
          });
      } else {
        axios
          .get(
            config_url +
            "/homestay/aescbyname/" +
            _this.ownerHomestayCheckByNameVar +
            "/" +
            _this.ownerId,
            {}
          )
          .then(function (response) {
            // 请求成功
            console.log(response.data.data);
            _this.ownerHomestay = response.data.data;
          })
          .catch(function (error) {
            // 请求失败
            console.log(error);
          });
      }
    },
    //房东管理 房源信息 按名字降序
    ownerHomestayDESCBYname() {
      var _this = this;
      if (
        _this.ownerHomestayCheckByNameVar == null ||
        _this.ownerHomestayCheckByNameVar == ""
      ) {
        axios
          .get(config_url + "/homestay/desc/" + _this.ownerId, {})
          .then(function (response) {
            // 请求成功
            console.log(response);
            _this.ownerHomestay = response.data.data;
          })
          .catch(function (error) {
            // 请求失败
            console.log(error);
          });
      } else {
        axios
          .get(
            config_url +
            "/homestay/descbyname/" +
            _this.ownerHomestayCheckByNameVar +
            "/" +
            _this.ownerId,
            {}
          )
          .then(function (response) {
            // 请求成功
            console.log(response);
            _this.ownerHomestay = response.data.data;
          })
          .catch(function (error) {
            // 请求失败
            console.log(error);
          });
      }
    },
    //房东管理 产品信息 按名字升序
    ownerProductAESCBYname() {
      var _this = this;
      if (
        _this.checkOwnerProductByNameVar == null ||
        _this.checkOwnerProductByNameVar == ""
      ) {
        axios
          .get(config_url + "/product/aesc"+"/"+_this.ownerId, {})
          .then(function (response) {
            // 请求成功
            console.log(response);
            _this.ownerProducts = response.data.data;
          })
          .catch(function (error) {
            // 请求失败
            console.log(error);
          });
      } else {
        axios
          .get(
            config_url +
              "/product/aescbyname/" +
              _this.checkOwnerProductByNameVar+"/"+_this.ownerId,
            {}
          )
          .then(function (response) {
            // 请求成功
            console.log(response);
            _this.ownerProducts = response.data.data;
          })
          .catch(function (error) {
            // 请求失败
            console.log(error);
          });
      }
    },
    //房东管理 产品信息 按名字降序
    ownerProductDESCBYname() {
      var _this = this;
      if (
        _this.checkOwnerProductByNameVar == null ||
        _this.checkOwnerProductByNameVar == ""
      ) {
        axios
          .get(config_url + "/product/desc"+"/"+_this.ownerId, {})
          .then(function (response) {
            // 请求成功
            console.log(response);
            _this.ownerProducts = response.data.data;
          })
          .catch(function (error) {
            // 请求失败
            console.log(error);
          });
      } else {
        axios
          .get(
            config_url +
              "/product/descbyname/" +
              _this.checkOwnerProductByNameVar +"/"+_this.ownerId,
            {}
          )
          .then(function (response) {
            // 请求成功
            console.log(response);
            _this.ownerProducts = response.data.data;
          })
          .catch(function (error) {
            // 请求失败
            console.log(error);
          });
      }
    },
    //后台管理 房源信息
    showBackHomeStayInfo() {
      this.loading = true;
      this.state = {
        show_backHomeStayInfo_state: true,
      };
      this.loading = false;
    },
    show_Manager(){
      this.state={
        show_manager_state:true
      }
      this.loading=false
      
    
    },
    //后台管理 用户信息
    showBackUserInfo() {
      this.loading = true;
      this.state = {
        show_backUserInfo_state: true,
      };
      this.loading = false;
    },
    //后台管理 评论信息
    showBackCommentInfo() {
      this.loading = true;
      this.state = {
        show_backCommentInfo_state: true,
      };
      this.loading = false;
    },
  },
  data() {
    return {
      options: [{
          value: '营业中',
          label: '营业中'
        }, {
          value: '暂未营业',
          label: '暂未营业'
        }],

        // value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
  
      //undefined 数据,但是没有这个声明会进不去页面
      controll_module: {
        show_users: true,
        show_owner: false,
        show_controller: false,
      },

      //临时保存数据，不要删除
      tempInfo: null,
      //控制攻略添加页面
      addNewPlan_state: false,
      //控制评论添加页面
      addNewComment_state: false,
      //登录状态
      login_state: false,

      //存放登录用户的用户名房东房源对象
      userName: "用户名",
      //房源信息数组
      homestayInfo: [],
      //房东房源数组
      ownerHomestay: [],

      //房东产品数组
      ownerProducts: [],
      //房东房源对象
      ownerHomestayObj: {
        id: "",
        name: "",
        location: "",
        time: "",
        countNow: "",
        countTotal: "",
        state: "",
        description: "",
      },
      ownerHomeStayFieds:{
        名字:"name",
        位置:"location",
        营业时间:"time",
        剩余总数:"countNow",
        总数:"countTotal",
        状态:"state",
        描述:"description"
      },
      //后台管理 添加修改 需要使用的房东信息对象
      ownerInfoObj: {
        id: "",
        name: "",
        phone: "",
        email: "",
        username: "",
        password: "",
      },
      //房东 产品对象
      productsObj: {
        id: "",
        name: "",
        description: "",
        countNow: "",
        countTotal: "",
        img: "",
      },
      ProductsFields: {
       姓名 : "name",
        描述: "description",
        剩余: "countNow",
        总数: "countTotal",
        图片路径: "img",
      },
      //计划添加对象
      planObj: {
        id: "",
        userId: "",
        content: "",
        time: ""
      },

      commentObj: {
        id: "",
        userId: "",
        userName: "",
        homestayId: "",
        homestayName: "",
        comment: "",
      },
      //评论存储数组
      comments: [],
      //旅游攻略存储
      tableData: [],
      //后台管理 所有房东信息
      allOwnerInfo: [],
      //用来存放 房东房源搜索框的信息
      ownerHomestayCheckByNameVar: null,
      //用来存放 民宿管理房源信息搜素框的信息
      getAllByNameVar: null,
      //用于存放 后台管理房东信息搜索框的信息
      checkOwnerByNameVar: null,
      //用于存放 房东管理产品信息搜索框的信息
      checkOwnerProductByNameVar: null,
      //控制页面跳转
      state: {
        //显示驾驶舱
        show_cockpit_state: false,
        //显示民宿管理 房源信息
        show_homestay_state: false,
        //显示房东管理 个人中心
        show_ownerInfo_state: false,
        //显示房东管理 房源信息
        show_ownerHomestay_state: false,
        //显示后台管理 房东信息
        show_allOwnerInfo_state: false,
        //显示后台管理 房源信息
        show_backHomeStayInfo_state: false,
        //显示后台管理 用户信息
        show_backUserInfo_state: false,
        //显示后台管理 评论信息
        show_backCommentInfo_state: false,
        //显示房东管理 产品信息
        show_ownerProducts_state: false,
        //显示聊天框
        show_chat_window_state: false,
        show_manager_state:false,
        show_allproducts_state:false,
        //显示旅游攻略
        show_tour_plan_state: false,
        //显示评论攻略
        show_comment_state: false,
        //显示用户个人中心
        show_userInfo_state:false,

        //用户注销
        show_logoutUser_state:false,
        //展示房东注销界面
        show_logoutAccount_state:false,
      },
      //所有产品
      allProducts:[],
      ownerInfoArry:[],
      //用户Id
      userId: null,
      //房东Id
      ownerId:null,
      //民宿iD 用于添加产品时指定民宿
      homeId: null,
      //控制房东添加或者修改房源的弹出框
      ownerAddHomestay: false,
      //用来控制后台添加或者修改用户的弹出框
      addUser: false,
      //用来控制后台添加或者修改房东的弹出框
      addOwner: false,
      //用来控制民宿管理 房源信息 的订购
      order: false,
      //用来表示 页面加载时的动画
      loading: false,
      //用来控制房东添加或者修改产品的弹出框
      addProducts: false,
      //表示添加产品时对应的房源名字
      homeName: "",
      //导出 打印
      printObj: {
        id: "printMe",
      },
      ownerInfo: {
        id: "",
        name: "",
        phone: "",
        email: "",
        username: "",
        password: "",
      },
      ownerInfoFields:{
        账号:"id",
        姓名:"name",
        电话:"phone",
        邮箱:"email",
        用户名:"username",
        密码:"password"
      },
      controll_module:{
        show_users:false,
        show_owner:false,
        show_controller:false
      },
      checkPlanByContentVar: "",
      checkCommentByContentVar: "",
    };
  },
  mounted() {

    //从浏览器获取购物车
    let item=localStorage.getItem("cart");
    if(typeof item!= undefined){
      this.cart = JSON.parse(item);
    }else{
      this.cart=[];
    }

    //绑定事件，从购物车与商家联系
    this.$bus.$on("chatFromProductList", (item) => {
      this.showChatWindow();
      this.$axios
        .get(`${config_url}/owner/product/find/${item.id}`)
        .then((res) => {
          if (res.data.flag == false) {
            this.$message.error("服务器连接失败");
          } else {
            var id = res.data.data;
            setTimeout(() => {
              this.$bus.$emit("addChater", id);
            }, 500);
          }
        });
    });

    //绑定事件，登录组件触发时生效
    this.$bus.$on("login", (user, usertype) => {
      console.log("object :>> ");

      this.login_state = true;
      console.log("this.login_state :>> ", this.login_state);
      //用户登录相关信息从loginIn组件传递
      this.tempInfo = user;
      //如果是owner登录
      if(usertype=="owner"){
        console.log("owner登录")
        this.ownerId=user.id;
        this.ownerInfoObj=user;
        this.controll_module = {show_owner:true};
        this.userName = this.ownerInfoObj.username

      }
      if(usertype=="user"){
        this.userId=user.id;
        this.userInfoObj=user;
        this.controll_module = {show_users:true};
        this.userName = this.userInfoObj.username

      }
      if(usertype=="controller"){
        this.controllerId=user.id;
        
        this.controll_module = {show_controller:true};

      }
      this.initCharts();
     
    });
    //添加购物车
    this.$bus.$on("addProductToCart", (item) => {
      for (let i in this.cart) {
        if (this.cart[i].id == item.id) {
          return;
        }
      }
      item.userCount = 1;
      this.cart.push(item);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    });
    //删除商品
    this.$bus.$on("deleteItemFromCart", (id) => {
      console.log("id :>> ", id);
      for (let i in this.cart) {
        if (this.cart[i].id == id) {
          this.cart.splice(i, 1);
          localStorage.setItem("cart", JSON.stringify(this.cart));
          return;
        }
      }
    });
  },
  //解绑bus
  beforeDestroy() {
    this.$bus.$off("login");
    this.$bus.$off("addProductToCart");
    this.$bus.$off("chatFromProductList");
    //存储购物车
    localStorage.setItem("cart", JSON.stringify(this.cart));
  },
};
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
#sector{
    width: 100%;
    height: 300px;
    margin: 0 auto;
    background-color: aqua;
  }
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
