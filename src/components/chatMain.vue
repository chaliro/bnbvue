<template>
  <div>
    <div class="left">
    </div>
    <div class="main">
        <chatWindowVue></chatWindowVue>
    </div>
    
  </div>
</template>

<script>
import chatWindowVue from './chatWindow.vue';
export default {
    name:'chatMain',
    components:{
        chatWindowVue
    }
}
</script>

<style>
  /* 左边选择框 */
  .left{
    float: left;
    height: 800px;
    width: 200px;
    background-color:rgb(233,231,231) ;
  }
  .main{
    height: 800px;
    width: 800px;
    float: left;
  }
</style>