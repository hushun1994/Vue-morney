<template>
  <button class="button" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.button {
  background: #666;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
}
</style>