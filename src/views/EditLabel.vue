<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click.native="goBack" />
      <span class="title">编辑标签</span>
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name" @update:value="updateTag" fieldName="标签名" placeholder="请输入标签名" />
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue";

@Component({
  components: { FormItem, Button },
})
export default class EditLabel extends Vue {
  tag?: Tag = undefined;

  created() {
    this.tag = window.findTag(this.$route.params.id);
    if (!this.tag) {
      this.$router.replace("/404");
    }
  }
  updateTag(name: string) {
    if (this.tag) {
      window.updateTag(this.tag.id, name);
    }
  }
  remove() {
    if (this.tag) {
      if (window.removeTag(this.tag.id)) {
        this.$router.back();
      } else {
        window.alert("删除失败");
      }
    }
  }
  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  position: relative;
  padding: 12px 16px;
  background: #fff;
  .leftIcon {
    position: absolute;
    top: 16px;
    left: 16px;
  }
}
.form-wrapper {
  background: #fff;
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
}
</style>