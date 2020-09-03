<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click.native="goBack" />
      <span class="title">编辑标签</span>
      <Icon class="confirmIcon" name="confirm" />
    </div>
    <div class="form-wrapper">
      <FormItem :value="tag.name" @update:value="updateTag()" fieldName="标签名" placeholder="请输入标签名" />
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
  created() {
    const id = this.$route.params.id;
    this.$store.commit("fetchTags");
    this.$store.commit("setCurrentTag", id);
    if (!this.tag) {
      this.$router.replace("/404");
    }
  }
  get tag() {
    return this.$store.state.currentTag;
  }
  // set tag(name) {
  //   this.$store.state.currentTag = name;
  // }
  updateTag(name: string) {
    if (this.tag) {
      console.log(this.tag.name, 1);
      const id = this.tag.id;
      this.$store.commit("updateTag", { id, name });
    }
  }
  remove() {
    if (this.tag) {
      this.$store.commit("removeTag", this.tag.id);
      this.$router.push("/labels");
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
  padding: 8px 16px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .confirmIcon {
    font-size: 30px;
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
