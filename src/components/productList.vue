<template>
  <div class="infinite-list-wrapper" style="overflow: auto">
    <div style="width: 200px; float: left">
      <el-input
        v-model="searchContent"
        placeholder="请输入内容进行搜索"
      ></el-input>
    </div>
    <div style="width: 20px; float: left; height: 20px"></div>
    <el-button
      type="primary"
      round
      style="float: left"
      @click="search()"
      icon="el-icon-search"
      >搜索</el-button
    >

    <el-button
      type="success"
      round
      style="float: right"
      @click="saveAsPDF()"
      icon="el-icon-download"
      >导出pdf</el-button
    >

    <download-excel
      types="xls"
      :data="products"
      :fields="fields"
      :name="exportName"
      :worksheet="exportSheet"
      :header="exportHeader"
      :footer="exportFooter"
      :defaultValue="exportDefaultValue"
    >
      <el-button
        type="success"
        round
        icon="el-icon-download"
        style="float: right"
        >导出Excel</el-button
      >
    </download-excel>

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
    <el-button type="success" round style="float: right" @click="sort(1)"
      >数量升序</el-button
    >
    <div style="float: right; width: 20px; height: 10px"></div>
    <el-button type="success" round style="float: right" @click="sort(-1)"
      >数量降序</el-button
    >

    <div style="height: 20px"></div>
    <el-divider></el-divider>
    <ul
      id="lists"
      ref="lists"
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
    >
      <!-- eslint-disable-next-line vue/valid-v-for -->
      <li v-for="item in products" :key="item.id" class="list-item">
        <div class="item">
          <img class="itemImage" :src="item.img" />
          <div class="itemInfo">
            <div class="itemName">商品名称:{{ item.name }}</div>
            <div class="itemDescription">商品简介:{{ item.description }}</div>
          </div>
          <div class="itemCount">现存数量{{ item.countNow }}</div>
          <div class="addButton">
            <el-button type="primary" @click="addItem(item)" round
              >添加进入购物车</el-button
            >
          </div>
          <div class="chatButton">
            <el-button type="success" @click="chat(item)" round
              >联系卖家</el-button
            >
          </div>
        </div>
        <el-divider></el-divider>
      </li>
    </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>

<script>
import config from "@/assets/config";
var url = config.url;
export default {
  name: "productList",
  data() {
    return {
      fields: {
        编号: "id",
        商品名称: "name",
        图片: "img",
        描述: "description",
        现有数量: "countNow",
      },
      exportName: "商品列表",
      exportSheet: "商品列表",

      userId: -1,
      products: [],
      page: 0,
      loading: false,
      noMore: false,
      searchContent: "",
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
  computed: {
    disabled() {
      return this.loading || this.noMore;
    },
  },
  methods: {
    //排序 字典序 参数s==1 升序 s==-1 降序
    sort(s) {
      console.log("s :>> ", s);
      let temp = this.products;
      this.products = null;
      if (s == 1) {
        temp.sort((a, b) => {
          if (a.countNow == b.countNow) return 0;
          return a.countNow > b.countNow ? 1 : -1;
        });
        console.log("temp :>> ", temp);
      } else {
        temp.sort((a, b) => {
          if (a.countNow == b.countNow) return 0;
          return a.countNow < b.countNow ? 1 : -1;
        });
        console.log("temp :>> ", temp);
      }
      setTimeout(() => {
        this.products = temp;
      }, 100);
    },

    //与商家联系
    chat(item) {
      this.$bus.$emit("chatFromProductList", item);
    },
    //导出为pdf
    saveAsPDF() {
      this.$PDFSave(this.$refs.lists, "商品");
    },
    //打印
    print() {
      this.$refs.easyPrint.print();
    },

    //加载产品
    load() {
      this.loading = true;
      setTimeout(() => {
        this.$axios
          .get(`${url}/product/page/${this.page}`)
          .then((res) => {
            this.page++;
            if (res.data.flag) {
              for (let i in res.data.data) {
                this.products.push(res.data.data[i]);
              }
            } else {
              this.noMore = true;
            }
          })
          .catch((err) => {
            console.log("err :>> ", err);
          });
        this.loading = false;
      }, 2000);
    },
    //将产品添加到购物车
    addItem(item) {
      this.$bus.$emit("addProductToCart", item);
    },
    //搜索产品
    search() {
      if (this.searchContent == "") {
        this.page = 0;
        this.noMore = false;
        return;
      }

      this.$axios
        .get(`${url}/product/getByName/${this.searchContent}`)
        .then((res) => {
          if (res.data.flag) {
            this.products = [];
            this.page = 0;
            this.noMore = true;
            for (let i in res.data.data) {
              this.products.push(res.data.data[i]);
            }
          }
        });
    },
  },
  mounted() {
    this.$bus.$on("product", (user) => {
      this.userId = user.id;
    });
  },
  beforeDestroy() {
    this.$bus.$off("login");
  },
};
</script>

<style scoped>
li {
  list-style: none;
}
.item {
  margin: auto;
  border: 1px solid black;
  height: 100px;
  width: 1300px;
}
.itemImage {
  float: left;
  height: 100px;
  width: 100px;
}

.itemInfo {
  float: left;
  height: 100px;
  width: 800px;
}
.itemName {
  float: left;
  text-align: left;
  padding-left: 10px;
  height: 50px;
  width: 800px;
}
.itemDescription {
  float: left;
  text-align: left;
  padding-left: 10px;
  height: 50px;
  width: 800px;
}
.itemCount {
  height: 100px;
  float: left;
  width: 100px;
  text-align: left;
  line-height: 100px;
}
.addButton {
  float: left;
  height: 35px;
  width: 180px;
  margin-top: 30px;
}

.chatButton {
  float: left;
  height: 35px;
  width: 80px;
  margin-top: 30px;
}
</style>