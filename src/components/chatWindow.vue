
<template>
  <div>
    <div class="main">
      <div class="ChatContent" id="lists"
      ref="lists">
        <div class="infinite-list-wrapper" style="overflow: auto">
          <ul class="list" infinite-scroll-disabled="disabled" >
            <!-- eslint-disable vue/require-v-for-key -->
            <li v-for="item in chatContent" :key="item.time" class="list-item">
              <div :class="item.fromId == fromId ? 'myContent' : 'hisContent'">
                <div class="contentTime">
                  {{ item.time }}
                </div>
                <div class="innerContent">{{ item.content }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="inputArea">
        <el-input
          style="height: 180px"
          type="textarea"
          :rows="9"
          placeholder="请输入内容"
          clearable
          :disabled="toId == ''"
          @keyup.enter.native="send()"
          v-model="textarea"
        >
        </el-input>
      </div>
    </div>
    <div class="option">
      <div class="button">
        <el-button
          type="success"
          round
          style="float: right"
          @click="saveAsPDF()"
          icon="el-icon-download"
          >导出pdf</el-button
        >
      </div>
      
      <div class="button">
        <download-excel
          types="xls"
          :data="chatContent"
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
      </div>

      <div class="button">
        <el-button
          type="success"
          round
          style="float: right"
          v-print="printObj"
          icon="el-icon-download"
          >打印</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
var moment = require("moment");
import config from "../assets/config";
var config_url = config.url;
export default {
  name: "chatWindow",
  data() {
    return {
      fields: {
        发送者: "fromId",
        接收者: "toId",
        时间: "time",
        内容: "content",
      },
      exportName: "对话列表",
      exportSheet: "对话列表",

      timer: null, //定时器
      chatContent: [],
      fromId: "",
      toId: "",
      loading: false,
      textarea: "",

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
    noMore() {
      return this.count >= 20;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },

  mounted() {
    //5s轮询一次内容
    this.timer = setInterval(() => {
      this.load();
    }, 3000);
    //挂在切换事件，使得聊天框可以复用而只改变内容
    this.$bus.$on("changeTalker", this.changeTalker);
    //切换到这个页面的时候，传递用户id
    this.$bus.$on("chatWindow", (fromId) => {
      this.fromId = fromId.toString();
    });
  },
  beforeDestroy() {
    //解除事件
    this.$bus.$off("changeTalker");
    this.$bus.$off("chatWindow");
    //销毁定时器
    this.clearInterval(this.timer);
  },

  methods: {
    //导出pdf
    saveAsPDF() {
      this.$PDFSave(this.$refs.lists, "对话");
    },

    //新建一个消息
    newMessage() {
      return {
        fromId: this.fromId,
        toId: this.toId,
        content: this.textarea,
        time: new moment().format("yyyy-MM-DD HH:mm:ss"),
      };
    },

    //在chatMain中改变人物之后，改变ChatContent，toId复用聊天框
    changeTalker(changeTalker) {
      //将这次得到的信息反传递给父组件，以免多次请求
      this.$bus.$emit("backInfo", this.toId, this.chatContent);

      this.toId = changeTalker.toId;
      this.chatContent = changeTalker.content;
    },

    load() {
      //暂时还没有聊天，不执行操作
      if (this.toId == "") return;
      //只读取最后一条消息时间之后的消息
      if (this.chatContent.length != 0) {
        let time = this.chatContent[this.chatContent.length - 1].time;
        this.$axios({
          method: "get",
          dataType: "text",
          url: config_url + `/chat/${this.fromId}/${this.toId}/${time}`,
        }).then((res) => {
          let temp = res.data.data;
          temp.sort((a, b) => {
            if (a.time < b.time) return -1;
            else if (a.time > b.time) return 1;
            else return 0;
          });
          this.chatContent = this.chatContent.concat(temp);
        });
      }
      //如果什么消息也没有：
      else {
        this.$axios({
          method: "get",
          dataType: "text",
          url: config_url + `/chat/${this.fromId}/${this.toId}`,
        }).then((res) => {
          let temp = res.data.data;
          temp.sort((a, b) => {
            if (a.time < b.time) return -1;
            else if (a.time > b.time) return 1;
            else return 0;
          });
          this.chatContent = this.chatContent.concat(temp);
        });
      }
    },
    //发送对话
    send() {
      let msg = this.newMessage();
      if (msg.content.length > 255) {
        this.$message({
          message: "发送失败，请发送小于255个字的内容",
          type: "warning",
        });
      } else {
        this.textarea = "";
        this.$axios({
          method: "post",
          url: config_url + "/chat",
          data: msg,
        })
          .then(() => {
            this.$message({
              message: "发送成功",
              type: "success",
            });
            this.chatContent.push(msg);
          })
          .catch(() => {
            this.$message({
              message: "发送失败，请检查网络是否畅通",
              type: "warning",
            });
          });
      }
    },
  },
};
</script>


<style scoped>
.main {
  float: left;
  height: 800px;
  width: 800px;
  margin: auto;
}
.ChatContent {
  height: 600px;
  overflow-y: scroll;
  background-color: rgb(240, 240, 240);
}
/* 输入框 */
.inputArea {
  height: 200px;
}
/* 聊天框list */
.list {
  list-style: none;
}
.list-item {
  height: 80px;
}
/* 聊天内容 */

.hisContent > .innerContent {
  font-size: 20px;
  display: inline-block;
  padding: 10px;
  border-radius: 10px 10px 10px 10px;
  margin-left: 10px;
  background-color: white;
  float: left;
}
.myContent > .innerContent {
  font-size: 20px;
  display: inline-block;
  padding: 10px;
  border-radius: 10px 10px 10px 10px;
  margin-right: 10px;
  background-color: rgb(137, 217, 97);
  float: right;
}
.option {
  float: right;
  height: 800px;
  width: 200px;
}
.button{
  float: right;
  height: 100px;
  width: 200px;
}
</style>