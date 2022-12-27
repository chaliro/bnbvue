<template>
    <div class="common-layout">
        <el-container>
            <el-header class="tag-header">
                <el-tag class="ml-2" type="info" size="large">用户信息</el-tag>
            </el-header>
            <el-main>
                <el-button type="primary" style="margin-bottom:1vmin" @click="getAddForm">
                    <el-icon><Plus /></el-icon>添加用户
                </el-button>

                <el-input
                    v-model="searchBox.searchInfo"
                    placeholder="输入搜索信息"
                    class="input-with-select"
                    >
                    <template #prepend>
                        <el-select v-model="searchBox.optionValue" placeholder="选项" style="width: 115px">
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
                        <el-button @click="searchInput"><el-icon><Search /></el-icon></el-button>
                    </template>
                </el-input>

                <el-scrollbar>
                    <el-table 
                    :data="userInfoList" 
                    :fit="true"
                    :border="true"
                    :highlight-current-row="true"
                    >
                        <el-table-column prop="userName" label="用户名" width="120" />
                        <el-table-column prop="phone" label="电话号码" wddth="120" />
                        <el-table-column prop="email" label="邮箱" wddth="120" />
                        <el-table-column prop="sex" label="性别" wddth="120" />

                        <el-table-column lable="更改信息" width="200">
                            <el-button type="primary" @click="modifyFormVisible = true">修改</el-button>
                            <el-button type="danger" @click="deleteFormVisible = true">删除</el-button>
                        </el-table-column>
                    </el-table>
                </el-scrollbar>
            </el-main>
        </el-container>
    </div>

    <el-dialog 
        v-model="addFormVisible" 
        title="添加用户"
    >
        <el-form :model="userInfo">
            <span>用户名</span>
            <el-input v-model="userInfo.userName" autocomplete="off" />
            <span>电话号码</span>
            <el-input v-model="userInfo.phone" autocomplete="off"/>
            <span>邮箱</span>
            <el-input v-model="userInfo.email" autocomplete="off" />
            <span>性别</span>
            <el-input v-model="userInfo.sex" autocomplete="off" />
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click="addUserInfo">确认</el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog 
        v-model="modifyFormVisible" 
        title="修改用户信息"
    >
        <el-form :model="userInfo">
            <span>用户名</span>
            <el-input v-model="userInfo.userName" autocomplete="off" />
            <span>电话号码</span>
            <el-input v-model="userInfo.phone" autocomplete="off"/>
            <span>邮箱</span>
            <el-input v-model="userInfo.email" autocomplete="off" />
            <span>性别</span>
            <el-input v-model="userInfo.sex" autocomplete="off" />
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="modifyFormVisible = false">取消</el-button>
                <el-button type="primary" @click="modifyUserInfo">确认</el-button>
            </span>
        </template>
    </el-dialog>
    
    <el-dialog
        v-model="deleteFormVisible"
        title="警告"
        width="30%"
    >
        <span>确认删除改用户信息吗？</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="deleteFormVisible = false">取消</el-button>
                <el-button type="primary" @click="deleteUserInfo">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            title:'用户信息',
            userInfoList:[
                {id:'1', userName:'wjq', phone:'111', email:'111', sex:'男'},
                {id:'2', userName:'3mz', phone:'111', email:'111', sex:'女'},
                {id:'3', userName:'张三', phone:'10086', email:'0110', sex:'男'}
            ],

            userInfoModel:{id:'', userName:'', phone:'', email:'', sex:''},
            userInfo:{id:'', userName:'', phone:'', email:'', sex:''},

            //搜索框信息
            searchBox:{ searchInfo:'', optionValue:'', items:[
                {label:'用户名', value:'用户名'},
                {label:'手机号码', value:'手机号码'}
            ]},

            //表单可见性
            deleteFormVisible:false,
            modifyFormVisible:false,
            addFormVisible:false,
        }
    },

    methods:{
        //获取用户信息
        getUserInfo(){
            let _this = this;
            axios.post('',{
            })
            .then(function (response) {
                _this.userInfoList = response.data;
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });
        },

        //获取添加表单
        getAddForm(){
            this.userInfo = JSON.parse(JSON.stringify(this.userInfoModel))
            this.addFormVisible = true;
        },

        //添加用户信息
        addUserInfo(){
            this.addFormVisible = false;

            axios.post('',{
                
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });
        },

        //修改用户信息
        modifyUserInfo(){
            this.modifyFormVisible = false;

            axios.post('',{
                
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });
        },

        //删除用户信息
        deleteUserInfo(){
            this.deleteFormVisible = false;
            
            axios.post('',{
                action:''
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });
        },

    }
}
</script>

<style>
    .tag-header{
        text-align: right;
    }
</style>