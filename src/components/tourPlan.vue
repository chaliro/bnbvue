<template>
    <el-table  :data="tableData">
        <el-table-column prop="content" label="名字" width="120">
        </el-table-column>

        <el-table-column prop="time" label="入住时间" width="120">
        </el-table-column>

        <el-table-column width="100">
          <template slot-scope="id">
            <el-button type="primary" @click="changeHomestay(id.row.id)"
              >修改</el-button
            >
          </template>
        </el-table-column>
        <el-table-column width="100">
          <template slot-scope="id">
            <el-button type="danger" @click="deleteHomestay(id.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    <!-- <el-container>
        <el-aside width="200px">
            <el-container>
                <el-main>
                    <el-table :data="tableData">
                           <el-table-column prop="content" @click="showContent">
                            <el-button type="danger" size="mini" @click="erase">删除</el-button> 
                            </el-table-column>
                            
                    </el-table>
                        
                </el-main>
                
            </el-container>

        </el-aside>
        <el-container>
            <el-main>
                <el-input type="textarea" :rows="20" placeholder="请输入攻略" v-model="content">
                </el-input>
            </el-main>
            <el-footer>
                <el-button type="success" @click="submit">提交</el-button>
                <el-button type="success" @click="upsort">时间升序排列</el-button>
                <el-button type="success" @click="downsort">时间降序排列</el-button>
                <el-button type="success">导出pdf</el-button>
                <el-button type="success">修改</el-button>
            </el-footer>
        </el-container>
    </el-container> -->
</template>

<script>
import configUrl from '../assets/config';
import axios from 'axios';
var url = configUrl.url;
export default {
    comments: {
        axios,
    },
    name: "tourPlan",
    data() {
        return {
            tableData: [],
            content: '',
        }
    },
    methods: {
        showContent(){
            console.log("sss")
        },
        submit() {
            // console.log(this.content);
            this.$axios({
                url: `${url}/strategy`, //模板字符串
                method: "post",
                data: {
                    content: this.content,
                }
            }).then(res => {
                this.$axios({
                url: `${url}/strategy/asc`,
                method: "get"
            }).then(res => {
                //处理结果
                console.log(res);
                this.tableData = res.data.data;
            }).catch(e => {
                //处理异常
                console.log(e);
            })
            }).catch(e => {
                //处理异常
                console.log(e);
            })

        },

        upsort() {
            this.$axios({
                url: `${url}/strategy/desc`,
                method: "get"
            }).then(res => {
                console.log(res);
                this.tableData = res.data.data;
            }).catch(e => {
                //处理异常
                console.log(e);
            })
        },

        downsort() {
            this.$axios({
                url: `${url}/strategy/asc`,
                method: "get"
            }).then(res => {
                //处理结果
                console.log(res);
                this.tableData = res.data.data;
            }).catch(e => {
                //处理异常
                console.log(e);
            })
        },

        erase(){

        }
    },
};
</script>

<style scoped>
.el-container {
    height: 100%;
}

.el-header,
.el-footer {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
</style>