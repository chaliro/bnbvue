<template>
    <el-dialog 
        :visible.sync="modifyFormVisible" 
        title="修改密码"
        class="dialog"
        @close = "closePage"
        >
        <el-form :model="ownerInfo">
            <span>姓名</span>
            <el-input v-model="ownerInfo.name" autocomplete="off" />
            <span>电话号码</span>
            <el-input v-model="ownerInfo.phone" autocomplete="off"/>
            <span>新密码</span>
            <el-input v-model="ownerInfo.password" autocomplete="off"/>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="modifyFormVisible=false">取消</el-button>
                <el-button type="primary" @click="handleModify">确认</el-button>
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
            ownerInfoModel:{name:'', phone:'', password:''},
            ownerInfo: {name:'', phone:'', password:''},
        }
    },

    props:['modifyFormVisible'],

    methods:{
        getModifyForm(){
            this.ownerInfo = JSON.parse(JSON.stringify(this.ownerInfoModel))
            this.modifyFormVisible = true;
        },

        handleModify(){
            let _this = this;
            let url = 'http://localhost:8080/owner/modifyPasswordByNameAndPhone';
            axios({
                method: 'POST',
                url: url,
                headers: {'content-type': 'application/x-www-form-urlencoded'},
                data: this.ownerInfo
            })
            .then(function (response) {
                Message({
                    message: '修改密码成功!',
                    type: 'success',
                })
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function (){
                _this.modifyFormVisible = false;
            });
        },

        //关闭页面
        closePage(){
            this.$emit("closeFindPassword");
        }
    }
}
</script>