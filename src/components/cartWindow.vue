<template>
  <div class="infinite-list-wrapper" style="overflow: auto" v-loading="loading">
    <div style="width: 200px; float: left"></div>
    <div style="width: 20px; float: left; height: 20px"></div>


    <download-excel
      types="xls"
      :data="cart"
      :fields="fields"
      :name="exportName"
      :worksheet="exportSheet"
      :header="exportHeader"
      :footer="exportFooter"
      :defaultValue="exportDefaultValue"
    >
      <el-button type="success"
      round
      icon="el-icon-download"
      style="float: right">导出Excel</el-button>
    </download-excel>
    <div style="float: right; width: 20px; height: 10px"></div>
    <el-button
      type="success"
      round
      style="float: right"
      @click="saveAsPDF()"
      icon="el-icon-download"
      >导出pdf</el-button
    >
    <div style="float: right; width: 20px; height: 10px"></div>
    <el-button
      type="success"
      round
      style="float: right"
      v-print="printObj"
      icon="el-icon-download"
      >打印</el-button
    >
    <div style="float: right; width: 20px; height: 10px"></div>
    <el-button
      type="success"
      round
      style="float: right"
      @click="sort(1)"
      >数量降序</el-button
    >
    <div style="float: right; width: 20px; height: 10px"></div>
    <el-button
      type="success"
      round
      style="float: right"
      @click="sort(-1)"
      >数量升序</el-button
    >
    <div style="height: 30px"></div>
    <el-divider></el-divider>
    <ul class="list" id="lists" ref="lists">
      <div class="empty" v-if="this.cart.length == 0">您的购物车是空的哦!</div>

      <!-- eslint-disable-next-line vue/valid-v-for -->
      <li v-for="item in cart" :key="item.id" class="list-item">
        <div class="item">
          <img class="itemImage" :src="item.img" />
          <div class="itemInfo">
            <div class="itemName">商品名称:{{ item.name }}</div>
            <div class="itemDescription">商品简介:{{ item.description }}</div>
          </div>
          <div class="deleteButton">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteItem(item.id)"
            ></el-button>
          </div>
          <div class="addButton">
            <el-input-number
              v-model="item.userCount"
              @change="numberChange()"
              :min="1"
              :max="item.countNow"
            ></el-input-number>
          </div>
          <div class="itemCount">购买数量</div>
        </div>
        <el-divider></el-divider>
      </li>
    </ul>

    <el-button type="success" round @click="buy" v-if="this.cart.length != 0"
      >确定购买</el-button
    >
  </div>
</template>
  
  <script>
import config from "@/assets/config";
var url = config.url;
export default {
  name: "cartWindow",
  data() {
    return {
      fields: {
        编号: "id",
        商品名称: "name",
        图片: "img",
        描述: "description",
        购买数量: "userCount",
      },
      exportName: "购物车商品列表",
      exportSheet: "购物车商品列表",

      userId: -1,
      cart: [],
      loading: false,
      printObj: {
        id: "lists",
        popTitle: "good print",
        extraCss:
          "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css",
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
        beforeOpenCallback(vue) {
          vue.printLoading = true;
          console.log("打开之前");
        },
        openCallback(vue) {
          vue.printLoading = false;
          console.log("执行了打印");
        },
        closeCallback() {
          console.log("关闭了打印工具");
        },
      },
    };
  },
  methods: {
    //数量排序 s==1 升序 s==-1 降序
    sort(s){
      let temp=this.cart;
      this.cart==null;
      if(s==1){
        temp.sort((a,b)=>{
          if(a.userCount==b.userCount)
          return 0;
          else return a.userCount>b.userCount?1:-1;
        }
        )}
      else{
        temp.sort((a,b)=>{
          if(a.userCount==b.userCount)
          return 0;
          else return a.userCount>b.userCount?-1:1;
        }
        )
      }
      setTimeout(() => {
        this.cart=temp;
      }, 100);
    },

    //购买商品数量改变
    numberChange() {
      //短时间多次存储影响性能
      //localStorage.setItem('cart',JSON.stringify(this.cart));
    },
    //导出为pdf
    saveAsPDF() {
      this.$PDFSave(this.$refs.lists, "购物车商品");
    },
    //打印
    print() {
      this.$refs.easyPrint.print();
    },

    //删除
    deleteItem(id) {
      for (let i in this.cart) {
        if (this.cart[i].id == id) {
          this.cart.splice(i, 1);
          this.$bus.$emit("deleteItemFromCart", id);
          return;
        }
      }
    },
    //购买
    buy() {
      if (this.cart.length == 0) {
        this.$message({
          showClose: true,
          message: "您购物车是空的哦！",
          type: "warning",
        });
        return;
      }
      this.loading = true;
      //每两个一组，（商品编号，商品购买数量）；
      let postArr = [];
      for (let i in this.cart) {
        postArr.push(this.cart[i].id);
        postArr.push(this.cart[i].userCount);
      }
      console.log("postArr :>> ", postArr);
      this.$axios({
        method: "post",
        url: `${url}/user/buy/${this.userId}`,
        data: postArr,
      })
        .then((res) => {
          this.loading = false;
          let successProductsId = res.data.data;
          let tempcart = [];
          for (let i in successProductsId) {
            if (this.cart[i].id != successProductsId[i]) {
              tempcart.push(successProductsId[i]);
            }
          }
          this.cart = tempcart;
          localStorage.setItem("cart", JSON.stringify(this.cart));
          this.$message({
            showClose: true,
            message: "购物车剩下的商品都是库存不够的哦！",
            type: "success",
          });
        })
        .catch((e) => {
          console.log("e :>> ", e);
          this.loading = false;
        });
    },
  },
  mounted() {
    //监听跳转
    this.$bus.$on("cartWindow", (cart, user) => {
      this.cart = cart;
      this.userId = user.id;
    });
    //存到session
  },
};
</script>
  
  <style scoped>
li {
  list-style: none;
}

.empty {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.item {
  margin: auto;
  border: 1px solid black;
  height: 100px;
  width: 1200px;
}
.itemImage {
  float: left;
  height: 100px;
  width: 100px;
}

.itemInfo {
  float: left;
  height: 100px;
  width: 600px;
}
.itemName {
  float: left;
  text-align: left;
  padding-left: 10px;
  height: 50px;
  width: 600px;
}
.itemDescription {
  float: left;
  text-align: left;
  padding-left: 10px;
  height: 50px;
  width: 600px;
}
.itemCount {
  height: 100px;
  float: right;
  width: 100px;
  text-align: left;
  line-height: 100px;
}
.addButton {
  float: right;
  height: 35px;
  width: 180px;
  margin-top: 30px;
}
.deleteButton {
  float: right;
  height: 35px;
  width: 60px;
  margin-top: 30px;
}
</style>
