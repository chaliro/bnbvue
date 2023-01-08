<template>
    <el-dialog
        :visible.sync="addFormVisible"
        title="房东账号注册"
        class="dialog"
        @close = "closeOwnerEnroll"
    >
        <el-form :model="ownerInfo">
            <span>姓名</span>
            <el-input v-model="ownerInfo.name" autocomplete="off" />
            <span>电话号码</span>
            <el-input v-model="ownerInfo.phone" autocomplete="off"/>
            <span>用户名</span>
            <el-input v-model="ownerInfo.username" autocomplete="off"/>
            <span>账号密码</span>
            <el-input v-model="ownerInfo.password" autocomplete="off"/>
            <span>邮箱</span>
            <el-input v-model="ownerInfo.email" autocomplete="off"/>
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
            ownerInfoModel:{name:'', phone:'', email:'', username:'', password:''},
            ownerInfo: {name:'', phone:'', email:'', username:'', password:''},
        }
    },

    props:['addFormVisible'],

    methods:{
        getAddForm(){
            this.ownerInfo = JSON.parse(JSON.stringify(this.ownerInfoModel))
            this.addFormVisible = true;
        },

        handleAdd(){
            let _this = this;
            let url = 'http://localhost:8080/owner/addOwner';
            axios({
                method: 'POST',
                url: url,
                headers: {'content-type': 'application/x-www-form-urlencoded'},
                data: this.ownerInfo
            })
            .then(function (response) {
                Message({
                    message: '注册成功',
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
        closeOwnerEnroll(){
            this.$emit("closeOwnerEnroll");
        }
    }
}
</script>

<style>
    .dialog{
        text-align: left;
    }
</style>