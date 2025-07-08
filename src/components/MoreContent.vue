<template>
  <div class="more-cards more-content" @click="updateMsg">
    <transition name="fade" mode="out-in">
      <span :key="msg.str">
        {{ msg.str ? msg.str : "被rp偷走了嘿嘿嘿（掏麻袋）" }}
      </span>
    </transition>
  </div>
  <div class="more-content" >点击卡片可以看到更多文字喵~</div>
  <div class="more-content-1">来源：<a href="https://help.mc.zorua.top/" target="_blank">有兽焉粉丝服务器帮助文档</a></div>
</template>

<script setup>
import { get404Msg } from "@/api";
import debounce from "@/utils/debounce.js";

const msg = reactive({str: null,});

const getMsg = async () => {
  const result = await get404Msg();
  msg.str = result;
};

// 更新数据
const updateMsg = () => {
  debounce(() => {
    getMsg();
  }, 500);
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
  margin-top: 3%;
  width: 100%;
  height: 100%;
}
.more-content-1 {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;   /*设置主轴方向是水平方向*/
  margin-top: -3%;
  width: 100%;
  height: 100%;
}
.more-cards {
  border-radius: 6px;
  background-color: #ffffff26;
  backdrop-filter: blur(10px);
  transform: scale(1);
  padding: 20px;
  transition:
    backdrop-filter 0.3s,
    transform 0.3s;
  &:hover {
    transform: scale(1.01);
  }
  &:active {
    transform: scale(0.98);
  }
}

// 添加渐入渐出动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
