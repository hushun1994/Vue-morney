<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
        @click="toggle(tag)"
      >
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class Tags extends Vue {
  @Prop() value!: string[];

  selectedTags: string[] = [];

  created() {
    this.$store.commit("fetchTags");
  }

  get tagList() {
    return this.$store.state.tagList;
  }

  @Watch("value")
  updateSelectedTags() {
    this.selectedTags = this.value;
  }

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit("update:value", this.selectedTags);
  }

  create() {
    const name = window.prompt("请输入标签名");
    if (!name) {
      if (name === "") {
        window.alert("标签名不能为空");
      } else {
        return false;
      }
    } else {
      this.$store.commit("createTag", name);
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  overflow: auto;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      $bg: #d9d9d9;
      background: #999;
      color: #fff;
      font-weight: 450;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      &.selected {
        background: #f60;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>
