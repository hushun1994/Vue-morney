<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Tabs from "@/components/Tabs.vue";
import { Component, Prop } from "vue-property-decorator";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";

@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  type = "-";
  interval = "按天";
  intervalList = intervalList;
  recordTypeList = recordTypeList;
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