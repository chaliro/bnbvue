<template>
  <div class="infinite-list-wrapper" style="overflow: auto">
    <ul
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
    >
       <!-- eslint-disable-next-line vue/valid-v-for -->
      <li v-for="item in products" :key="index" class="list-item">
        <div class="item">
            <img class="itemImage" :src="item.img">
            <div class="itemInfo">
                <div class="itemName">商品名称:{{ item.name }}</div>
                <div class="itemDescription">商品简介:{{item.description}}</div>
            </div>
            <div class="itemCount">现存数量{{ item.countNow }}</div>
            <div class="addButton"><el-button type="primary" @click="addItem(item)" round >添加进入购物车</el-button></div>
           
        </div>
        <el-divider></el-divider>
    </li>
    </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>

<script>
import config from '@/assets/config';
var url=config.url;
export default {
  name: "productList",
  data() {
    return {
        userId:-1,
        products:[],
      page:0,
      loading: false,
      noMore: false,
    };
  },
  computed: {
    disabled() {
      return this.loading || this.noMore;
    },
  },
  methods: {
    //加载产品
    load() {
      this.loading = true;
      setTimeout(() => {
        this.$axios.get(`${url}/product/page/${this.page}`).then((res) => {
            this.page++;
            if(res.data.flag){
                for(let i in res.data.data){
                    this.products.push(res.data.data[i]);
                }
            }
            else{
                this.noMore=true;
            }  
        }).catch((err) => {
            console.log('err :>> ', err);
        });
        this.loading = false;
      }, 2000);
    },
    //将产品添加到购物车
    addItem(item){
        console.log('he  :>> ');
        this.$bus.$emit("addProductToCart",item);
    }
  },
  mounted(){
    this.$bus.$on("product",(user)=>{
      this.userId=user.id;
    })
    
  },
  beforeDestroy(){
    this.$bus.$off("login");
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