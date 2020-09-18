<template>
  <div>
    <label class="FormItem">
      <span class="name">{{this.fieldName}}</span>
      <input
        :type="type"
        :value="value"
        @input="onValueChanged($event.target.value)"
        :placeholder="placeholder"
      />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch, Prop } from "vue-property-decorator";

@Component
export default class FormItem extends Vue {
  @Prop({ default: "" }) value!: string;
  @Prop({ required: true }) fieldName!: string;
  @Prop({ required: true }) type!: string;
  @Prop() placeholder?: string;

  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
.FormItem {
  font-size: 14px;
  padding-left: 2px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 6px;
    white-space: nowrap;
  }
  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 4px;
  }
}
</style>
