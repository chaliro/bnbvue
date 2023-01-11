<template>
    <el-dialog
        :visible.sync="deleteFormVisible"
        title="警告"
        class="dialog"
        @close = "closePage"
    >
        <span>确认注销账号吗？</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="deleteFormVisible = false">取消</el-button>
                <el-button type="primary" @click="handleDelete">确认</el-button>
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
        }
    },

    //父组件传递id到子组件<logout-account :id=""></logout-account>
    props:['id', 'deleteFormVisible'],

    methods:{
        getDeleteForm(){
            this.deleteFormVisible = true;
        },

        handleDelete(){
            let _this = this;
            let url = 'http://localhost:8080/owner/' + this.id;
            axios({
                method: 'DELETE',
                url: url,
                headers: {'content-type': 'application/x-www-form-urlencoded'},
            })
            .then(function (response) {
                Message({
                    message: '注销成功',
                    type: 'success'
                });
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function (){
                _this.deleteFormVisible = false;
            });
        },

        //关闭页面
        closePage(){
            this.$emit("closeLogoutOwner");
        }
    }
}
</script>

<style>
    .dialog{
        text-align: left;
    }
</style>