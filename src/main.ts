import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Layout from "@/components/Layout.vue";
import Nav from "@/components/Nav.vue";
import Icon from "@/components/Icon.vue";
import tagListModel from "@/models/tagListModel";

Vue.config.productionTip = false;

Vue.component("Layout", Layout);
Vue.component("Nav", Nav);
Vue.component("Icon", Icon);

window.tagList = tagListModel.fetch();
window.createTag = (name: string) => {
  const message = tagListModel.create(name);
  if (message === "duplicated") {
    window.alert("标签名重复！");
  } else {
    window.alert("添加成功");
  }
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
