<template>
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        :router="true"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
    >
        <el-menu-item index="/userInfo">用户信息</el-menu-item>
        <el-menu-item index="/houseInfo">房源信息</el-menu-item>
        <el-menu-item index="/commentInfo">用户评价</el-menu-item>
        <v-for ></v-for>
    </el-menu>
</template>

<script>
export default {
    data(){
        return{
        }
    },

    methods:{
        handleSelect(key, keyPath){
        }
    },
}
</script>