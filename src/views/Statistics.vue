<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type" />
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
// import Types from "@/components/Money/Types.vue";
import Tabs from "@/components/Tabs.vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  type = "-";
  intervalList = [
    { text: "按天", value: "day" },
    { text: "按周", value: "week" },
    { text: "按月", value: "month" },
  ];
  interval = "day";
  typeList = [
    { text: "支出", value: "-" },
    { text: "收入", value: "+" },
  ];
}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background: #fff;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
</style>