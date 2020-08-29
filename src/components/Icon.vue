<template>
  <svg class="icon">
    <use :xlink:href="'#' + name" />
  </svg>
</template>

<script>
const importAll = (requireContext) => {
  requireContext.keys().forEach(requireContext);
};
try {
  importAll(require.context("../assets/icons", true, /\.svg$/));
} catch (err) {
  console.log(err);
}

export default {
  props: ["name"],
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
