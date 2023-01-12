<template>
    <el-dialog
        :visible.sync="addFormVisible"
        title="用户账号注册"
        class="dialog"
        @close = "closePage"
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
                <el-button @click="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click="handleAdd">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import axios from 'axios';
import { Message } from 'element-ui'


export default {
    data(){
        return{
            userInfoModel: {
                userName: "",
                password: "",
                phone: "",
                email: "",
                sex: "",
            },
            userInfo: {
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
        }
    },

    props:['addFormVisible'],

    methods:{
        getAddForm(){
            this.userInfo = JSON.parse(JSON.stringify(this.userInfoModel))
            this.addFormVisible = true;
        },

        handleAdd(){
            let _this = this;
            let url = 'http://localhost:8080/user/addUser';
            axios({
                method: 'POST',
                url: url,
                headers: {'content-type': 'application/x-www-form-urlencoded'},
                data: this.userInfo
            })
            .then(function (response) {
                Message({
                    message: '注册成功，账号为：' + response.data,
                    type: 'success'
                });
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                _this.addFormVisible = false;
            });
        },

        //关闭页面
        closePage(){
            this.$emit("closeUserEnroll");
        }
    }
}
</script>

<style>
    .dialog{
        text-align: left;
    }
</style>