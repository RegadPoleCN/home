<template>
  <div class="more-content" v-if="msg.str">{{ msg.str }}</div>
  <div class="more-content" v-else>被rp偷走了嘿嘿嘿（掏麻袋）</div>
  <div class="more-content" >刷新可以看到更多文字喵~</div>
  <div class="more-content-1">来源：<a href="https://help.mc.zorua.top/" target="_blank">有兽焉粉丝服务器帮助文档</a></div>
</template>

<script setup>
import { get404Msg } from "@/api";

const msg = reactive({str: null,});

const getMsg = async () => {
  const result = await get404Msg();
  msg.str = result;
};

onMounted(() => {
  getMsg();
});
</script>

<style lang="scss" scoped>
.more-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;   /*设置主轴方向是水平方向*/
  margin-top: 20px;
  width: 100%;
  height: 100%;
}
.more-content-1 {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;   /*设置主轴方向是水平方向*/
  margin-top: -18px;
  width: 100%;
  height: 100%;
}
</style>
