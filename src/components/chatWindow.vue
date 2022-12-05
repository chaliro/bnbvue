
<template>
  <div>
    <div class="main" >
      <div class="ChatContent">
        <div class="infinite-list-wrapper" style="overflow:auto">
          <ul
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled">
            <!-- eslint-disable vue/require-v-for-key -->
            <li v-for="(item) in chatContent" :key="item.time" class="list-item">
              <div :class="item.from==from?'myContent':'hisContent'">
                <div class="contentTime">
                  {{item.time}}
                </div>
                <div class="innerContent">{{item.content}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="inputArea">
          <el-input
          style="height:180px"
          type="textarea"
          :rows="9"
          placeholder="请输入内容"
          clearable
          @keyup.enter.native="send()"
          v-model="textarea">
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
var moment = require('moment');
export default ({
  name:"chatWindow",
  data(){
    return {
      chatContent:[
        {
          from:"123",
          to:"321",
          time:"2022-12-5 10:30:10",
          content:"你好"
        },
        { 
          from:"321",
          to:"123",
          time:"2022-12-5 10:30:12",
          content:"再见"
        }
      ],
      from:"123",
      to:"321",
      loading: false,
      textarea:''
    }
  },
  computed: {
      noMore () {
        return this.count >= 20
      },
      disabled () {
        return this.loading || this.noMore
      }

    },
  methods: {
    //新建一个消息
    newMessage(){
      console.log('object :>> ');
      return {
        from:this.from,
        to:this.to,
        content:this.textarea,
        time:new moment().format("yyyy-MM-DD hh:mm:ss")
      }
    },

    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    },
    send(){
      this.$message({
          message: "发送成功",
          type: 'success'
      });
      this.chatContent.push(this.newMessage());
      this.textarea=''
    }
  }
})
</script>


<style scoped>

  .main{
    float: left;
    height: 800px;
    width: 800px;
    margin: auto;
  }
  .ChatContent{
    height: 600px;
    overflow-y:scroll;
    background-color: rgb(240,240,240);
  }
  /* 输入框 */
  .inputArea{
    height: 200px;
  }
  /* 聊天框list */
  .list{
    list-style: none;
  }
  .list-item{
    height: 80px;
  }
  /* 聊天内容 */  

  .myContent > .innerContent{
    font-size: 20px;
    display: inline-block;
    padding: 10px;
    border-radius: 10px 10px 10px 10px ;
    margin-left: 10px;
    background-color: rgb(137,217,97);
    float: left;
  }
  .hisContent > .innerContent{
    font-size: 20px;
    display: inline-block;
    padding: 10px;
    border-radius: 10px 10px 10px 10px;
    margin-right: 10px;
    background-color: rgb(255,255,255);
    float: right;
  }



</style>