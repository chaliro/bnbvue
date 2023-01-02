
<template>
  <div>
    <div class="left">
      <!-- eslint-disable-next-line vue/require-v-for-key -->
      <ul v-for="(item, index) in pepolesWithChat" :key="item.toId">
        <li>
          <div
            class="people"
            :class="nowChatting == index ? 'cliked' : null"
            @click="
              send(item);
              nowChatting = index;
            "
          >
            {{ item.toId }}
          </div>
        </li>
      </ul>
    </div>
    <div class="main">
      <chatWindowVue></chatWindowVue>
    </div>
  </div>
</template>

<script>
import chatWindowVue from "./chatWindow.vue";
import config from "../assets/config";
var config_url = config.url;
export default {
  name: "chatMain",
  components: {
    chatWindowVue,
  },

  data() {
    return {
      fromId: "",
      timer: null,
      nowChatting: -1,
      pepolesWithChat: [],
    };
  },

  methods: {
    send(chat) {
      this.$bus.$emit("changeTalker", chat);
    },
    receiverFormSon(id, content) {
      //将从子组件中获得的信息存储下来
      for (let i in this.pepolesWithChat) {
        if (this.pepolesWithChat[i].toId == id) {
          this.pepolesWithChat[i].content = content;
          break;
        }
      }
    },
    //创建用户信息
    createPeople(toId) {
      return {
        toId: toId,
        content: [],
      };
    },
    //动态获取建立聊天的对象
    getChatter() {
      this.$axios({
        method: "get",
        dataType: "text",
        url: config_url + `/chat/${this.fromId}`,
      }).then((res) => {
        let people = res.data.data;
        //没有hashset只有暴力比较
        for (let i in people) {
          let isIn = false;
          for (let j in this.pepolesWithChat) {
            if (this.pepolesWithChat[j].toId == people[i]) {
              isIn = true;
              break;
            }
          }
          if (isIn) {
            continue;
          } else {
            this.pepolesWithChat.push(this.createPeople(people[i]));
          }
        }
      });
    },
  },
  mounted() {
    //挂载事件，当切换聊天对象时，将现有聊天框的内容存储下来,10s 轮询一次
    this.$bus.$on("backInfo", this.receiverFormSon);
    this.$bus.$on("chatWindow", (fromId) => {
      this.fromId = fromId.toString();
    });
    this.timer = setInterval(() => {
      this.getChatter();
    }, 10000);
  },
  beforeDestroy() {
    //销毁挂载
    this.$bus.$off("backInfo");
    this.$bus.$off("chatWindow");
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
}

/* 左边选择框 */
.left {
  float: left;
  height: 800px;
  width: 200px;
  background-color: rgb(245, 245, 245);
}
.main {
  height: 800px;
  width: 800px;
  float: left;
}
.people {
  height: 50px;
  width: 115px;
  border-radius: 10px 10px 10px 10px;
  line-height: 50px;
  background-color: rgb(230, 229, 229);
  border: 1px solid black;
}
.people:hover {
  background-color: rgb(217, 217, 217);
}
.cliked {
  background-color: rgb(199, 198, 197);
}
</style>