<template>
  <div class="nav">
    <router-link to="/">
      <Icon name="money" />记账
    </router-link>|
    <router-link to="/labels">
      <Icon name="label" />标签
    </router-link>|
    <router-link to="/statistics">
      <Icon name="statistics" />统计
    </router-link>
  </div>
</template>

<script>
import Icon from "@/components/Icon.vue";

export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>
