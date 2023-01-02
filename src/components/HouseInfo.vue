<template>
    <div class="common-layout">
        <el-container>
            <el-main>
                <div id="addDiv">
                    <el-button type="primary" style="margin-bottom:1vmin" @click="addFormVisible=true">
                        <el-icon><Plus /></el-icon>添加房源
                    </el-button>
                </div>
                

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
                    :data="houseInfoList" 
                    :fit="true"
                    :border="true"
                    :highlight-current-row="true"
                    >
                        <el-table-column prop="name" label="房名" width="120" />
                        <el-table-column prop="location" label="位置" wddth="120" />
                        <el-table-column prop="time" label="时间" wddth="120" />
                        <el-table-column prop="count_now" label="现有房间数" wddth="120" />
                        <el-table-column prop="count_total" label="房间总数" wddth="120" />
                        <el-table-column prop="state" label="营业状态" wddth="120" />
                        <el-table-column prop="description" label="描述" wddth="120" />

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
            title="添加房源信息"
        >
            <el-form :model="houseInfo">
                <span>名字</span>
                <el-input v-model="houseInfo.name" autocomplete="off" />
                <span>位置</span>
                <el-input v-model="houseInfo.location" autocomplete="off"/>
                <span>时间</span>
                <el-input v-model="houseInfo.time" autocomplete="off" />
                <span>现有房间数</span>
                <el-input v-model="houseInfo.count_now" autocomplete="off" />
                <span>房间总数</span>
                <el-input v-model="houseInfo.count_total" autocomplete="off" />
                <span>营业状态</span>
                <el-input v-model="houseInfo.state" autocomplete="off" />
                <span>描述</span>
                <el-input v-model="houseInfo.description" autocomplete="off" />
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="addHouseInfo">确认</el-button>
                </span>
            </template>
        </el-dialog>

        <el-dialog 
            v-model="modifyFormVisible" 
            title="修改房源信息"
        >
            <el-form :model="houseInfo">
                <span>名字</span>
                <el-input v-model="houseInfo.name" autocomplete="off" />
                <span>位置</span>
                <el-input v-model="houseInfo.location" autocomplete="off"/>
                <span>时间</span>
                <el-input v-model="houseInfo.time" autocomplete="off" />
                <span>现有房间数</span>
                <el-input v-model="houseInfo.count_now" autocomplete="off" />
                <span>房间总数</span>
                <el-input v-model="houseInfo.count_total" autocomplete="off" />
                <span>营业状态</span>
                <el-input v-model="houseInfo.state" autocomplete="off" />
                <span>描述</span>
                <el-input v-model="houseInfo.description" autocomplete="off" />
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="modifyFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="modifyHouseInfo">确认</el-button>
                </span>
            </template>
        </el-dialog>
        
        <el-dialog
            v-model="deleteFormVisible"
            title="警告"
            width="30%"
        >
            <span>确认删除房源信息吗？</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="deleteFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="deleteHouseInfo">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            title:'房源信息',
            houseInfoList:[
                {id:'1', name:'西园6舍', location:'成都', time:'2022', count_now:'1', count_total:'10', state:'营业', description:'去过都说好'},
                {id:'2', name:'test', location:'北京', time:'2002', count_now:'2', count_total:'5', state:'关闭', description:'6'},
                {id:'3', name:'111', location:'上海', time:'2000', count_now:'3', count_total:'8', state:'营业', description:'666'}
            ],
            houseInfo:{id:'', name:'', location:'', time:'', count_now:'', count_total:'', state:'', description:''},

            //搜索框信息
            searchBox:{ searchInfo:'', optionValue:'', items:[
                {label:'房名', value:'房名'},
                {label:'位置', value:'位置'}
            ]},
            
            //表单可见性
            deleteFormVisible:false,
            modifyFormVisible:false,
            addFormVisible:false,
        }
    },

    methods:{
        //获取房源信息
        getHouseInfo(searchInfo){
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

        addHouseInfo(){

        },

        modifyHouseInfo(){

        },

        deleteHouseInfo(){

        },


    },

    mounted(){
        //查找全部信息
    }
}
</script>

<style>
    #addDiv{
        text-align: left;
    }
</style>