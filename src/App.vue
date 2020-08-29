<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-size: $font-hei;
  font-size: 16px;
  line-height: 1.5;
}
</style>
