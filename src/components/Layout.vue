<template>
  <div>
    <div class="layout-wrapper">
      <div class="content" :class="classPrefix && `${classPrefix}-content`">
        <slot />
      </div>
      <Nav></Nav>
    </div>
  </div>
</template>

<script>
export default {
  props: ["classPrefix"],
};
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  height: 100vh;
}
.content {
  flex-grow: 1;
  overflow: auto;
}
</style>
