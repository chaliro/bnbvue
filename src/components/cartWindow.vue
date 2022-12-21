<template>
    <div class="infinite-list-wrapper" style="overflow: auto">
      <ul
        class="list"
      >
         <!-- eslint-disable-next-line vue/valid-v-for -->
        <li v-for="item in cart" :key="index" class="list-item">
          <div class="item">
              <img class="itemImage" :src="item.img">
              <div class="itemInfo">
                  <div class="itemName">商品名称:{{ item.name }}</div>
                  <div class="itemDescription">商品简介:{{item.description}}</div>
              </div>
              <div class="itemCount">购买数量</div>
              <div class="addButton"><el-input-number v-model="item.userCount"  :min="0" :max="999" label=""></el-input-number></div>
             
          </div>
          <el-divider></el-divider>
      </li>
      </ul>
    </div>
  </template>
  
  <script>
  import config from '@/assets/config';
  // eslint-disable-next-line no-unused-vars
  var url=config.url;
  export default {
    name: "cartWindow",
    data() {
      return {
        userId:-1,
        cart:[],
      };
    },
    methods: {
            
    },
    mounted(){
        //监听跳转
        this.$bus.$on("cartWindow",(cart)=>{
            this.cart=cart;
        })
        //存到session
        
    }
  };
  </script>
  
  <style scoped>
  li{
      list-style: none;
  }
  .item{
      margin: auto;
      border: 1px solid black;
      height: 100px;
      width: 1200px;
  }
  .itemImage{
      float: left;
      height:100px;
      width: 100px;
  }
  
  .itemInfo{
      float: left;
      height: 100px;
      width: 800px;
  }
  .itemName{
      float: left;
      text-align: left;
      padding-left: 10px;
      height: 50px;
      width: 800px;
  }
  .itemDescription{
      float: left;
      text-align: left;
      padding-left: 10px;
      height: 50px;
      width: 800px;
  }
  .itemCount{
      height: 100px;
      float: left;
      width: 100px;
      text-align: left;
      line-height: 100px;
  }
  .addButton{
      float: left;
      height: 35px;
      width: 180px;
      margin-top:30px;
  }
  
  </style>