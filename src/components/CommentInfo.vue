<template>
    <div class="common-layout">
        <el-container>
            <el-header id="tagHeader">
                <el-tag class="ml-2" type="info" size="large">评论信息</el-tag>
            </el-header>
            <el-main>
                <el-button type="primary" style="margin-bottom:1vmin" @click="addFormVisible=true">
                    <el-icon><Plus /></el-icon>添加评论
                </el-button>

                <el-input
                    v-model="searchInfo"
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
                    :data="commentInfoList" 
                    :fit="true"
                    :border="true"
                    :highlight-current-row="true"
                    >
                        <el-table-column prop="user_name" label="用户名" width="120" />
                        <el-table-column prop="house_name" label="房源名" wddth="120" />
                        <el-table-column prop="comment" label="评论" wddth="120" />

                        <el-table-column lable="更改信息" width="200">
                            <el-button type="primary" @click="modifyFormVisible = true">修改</el-button>
                            <el-button type="danger" @click="deleteFormVisible = true">删除</el-button>
                        </el-table-column>
                    </el-table>
                </el-scrollbar>
            </el-main>
        </el-container>

        <el-dialog 
            v-model="addFormVisible" 
            title="添加评论"
        >
            <el-form :model="commentInfo">
                <span>id</span>
                <el-input v-model="commentInfo.id" autocomplete="off" />
                <span>用户id</span>
                <el-input v-model="commentInfo.user_id" autocomplete="off" />
                <span>房源id</span>
                <el-input v-model="commentInfo.house_id" autocomplete="off"/>
                <span>评论</span>
                <el-input v-model="commentInfo.comment" autocomplete="off" />
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
            title="修改评论"
        >
            <el-form :model="commentInfo">
                <span>评论</span>
                <el-input v-model="commentInfo.comment" autocomplete="off" />
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="modifyFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="modifyCommentInfo">确认</el-button>
                </span>
            </template>
        </el-dialog>
        
        <el-dialog
            v-model="deleteFormVisible"
            title="警告"
            width="30%"
        >
            <span>确认删除改评论吗？</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="deleteFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="deleteCommentInfo">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            title:'评论信息',
            commentInfoList:[
                {id:'1', user_id:'666', user_name:'地平线', house_id:'1', house_name:'西园六舍',comment:'还行'},
                {id:'2', user_id:'555', user_name:'动力小子', house_id:'1', house_name:'西园六舍', comment:'感觉一般'},
            ],
            commentInfo:{id:'', user_id:'', user_name:'', house_id:'', house_name:'',comment:''},

            //搜索框信息
            searchBox:{ searchInfo:'', optionValue:'', items:[
                {label:'用户名', value:'用户名'},
                {label:'房源名', value:'房源名'}
            ]},

            //表单可见性
            deleteFormVisible:false,
            modifyFormVisible:false,
            addFormVisible:false,
        }
    },

    methods:{
        //获取评论信息
        getCommentInfo(){
            axios.get('')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });
        },

        addCommentInfo(){

        },

        modifyCommentInfo(){

        },

        deleteCommentInfo(){

        }
    }
}
</script>