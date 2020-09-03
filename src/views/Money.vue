<template>
  <Layout class-prefix="layout">
    <NumberPad @submit="saveRecord" :value.sync="record.amount" />
    <Tabs :data-source="recordTypeList" :value.sync="record.type" />
    <div class="notes">
      <FormItem fieldName="备注" placeholder="请在这里输入" @update:value="onUpdateNotes" />
    </div>
    <Tags />
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
    type: "+",
    amount: 0,
  };

  created() {
    this.$store.commit("fetchRecords");
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    this.$store.commit("createRecord", this.record);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>
