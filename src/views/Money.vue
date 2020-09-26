<template>
  <Layout class-prefix="layout">
    <NumberPad @submit="saveRecord" :value.sync="record.amount" />
    <Tabs :data-source="recordTypeList" :value.sync="record.type" />
    <div class="notes">
      <div class="wrapper">
        <FormItem
          fieldName="备注"
          type="text"
          placeholder="请在这里输入"
          :value.sync="record.notes"
        />
      </div>
      <div class="wrapper">
        <FormItem fieldName="日期" type="date" :value.sync="record.createAt" />
      </div>
    </div>
    <Tags :value.sync="record.tags" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import Tabs from "@/components/Tabs.vue";
import { Component } from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";

@Component({
  components: { NumberPad, Tabs, FormItem, Tags },
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  recordTypeList = recordTypeList;

  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
    createAt: dayjs().format("YYYY-MM-DD"),
  };
  created() {
    this.$store.commit("fetchRecords");
  }
  saveRecord() {
    if (this.record.tags.length === 0) {
      return window.alert("请选择标签");
    }
    if (this.record.amount === 0) {
      return window.alert("请输入金额");
    }
    this.$store.commit("createRecord", this.record);
    this.record = {
      tags: [],
      notes: "",
      type: "-",
      amount: 0,
      createAt: dayjs().format("YYYY-MM-DD"),
    };
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  display: flex;
  padding: 4px 0;
  max-width: 100%;
  > .wrapper {
    width: 50%;
  }
}
</style>
