<template>
    <div class="infinite-list-wrapper" style="overflow: auto"  v-loading="loading">
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
              <div class="addButton"><el-input-number v-model="item.userCount" @change="numberChange()" :min="0" :max="item.countNow" ></el-input-number></div>
             
          </div>
          <el-divider></el-divider>
      </li>
      </ul>

      <el-button type="success" round @click="buy">确定购买</el-button>
    </div>
  </template>
  
  <script>
  import config from '@/assets/config';
  var url=config.url;
  export default {
    name: "cartWindow",
    data() {
      return {
        userId:-1,
        cart:[],
        loading:false,
      };
    },
    methods: {
        //购买商品数量改变
        numberChange(){
            localStorage.setItem('cart',JSON.stringify(this.cart));
        },
        //购买
        buy(){
            this.loading=true;
            //每两个一组，（商品编号，商品购买数量）；
            let postArr=[];
            for(let i in this.cart){
                postArr.push(this.cart[i].id);
                postArr.push(this.cart[i].userCount);
            }
            console.log('postArr :>> ', postArr);
            this.$axios({
                method:"post",
                url:`${url}/user/buy/${this.userId}`,
                data:postArr,
            }).then(res=>{
                this.loading=false;
                let successProductsId=res.data.data;
                let tempcart=[];
                for(let i in successProductsId){
                    if(this.cart[i].id!=successProductsId[i]){
                        tempcart.push(successProductsId[i]);
                    }
                }
                this.cart=tempcart;
                localStorage.setItem("cart",this.cart);
                this.$message({
                    showClose: true,
                    message: "购物车剩下的商品都是库存不够的哦！",
                    type: 'success',
                });
            }).catch(e=>{
                console.log('e :>> ', e);
                this.loading=false;
            })
        }
    },
    mounted(){
        //监听跳转
        this.$bus.$on("cartWindow",(cart,user)=>{
            this.cart=cart;
            this.userId=user.id;
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