<template>
  <div class="more-content">{{msg}}</div>
</template>

<script setup>
import { get404Msg } from "@/api";
const msg = await get404Msg();
</script>

<style lang="scss" scoped>
.more-content {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  height: 100%;
}
</style>
