<template>
  <Layout>
    <div class="tags">
      <router-link
        class="tag"
        v-for="tag in tags"
        :key="tag.id"
        :to="`/labels/edit/${tag.id}`"
      >
        <span>{{ tag.name }}</span>
        <Icon name="right"></Icon>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button @click="createTag">新增标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Button from "@/components/Button.vue";

@Component({
  components: { Button },
})
export default class Labels extends Vue {
  created() {
    this.$store.commit("fetchTags");
  }

  get tags() {
    return this.$store.state.tagList;
  }

  createTag() {
    const name = window.prompt("请输入标签名");
    if (!name) {
      if (name === "") {
        window.alert("标签名不能为空");
      } else {
        return false;
      }
    } else {
      this.$store.commit("createTag", name);
      const error = this.$store.state.createTagError;
      if (error) {
        window.alert(error);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    svg {
      color: #666;
      margin-right: 16px;
    }
  }
}
.createTag-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 32px;
}
</style>
