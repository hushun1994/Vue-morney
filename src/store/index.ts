import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import createId from "@/lib/createId";
import router from "@/router";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    createTagError: null,
    updateTagError: null,
    currentTag: undefined,
    selectedTags: [],
  } as RootState,
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem("recordList") || "[]"
      ) as RecordItem[];
    },
    createRecord(state, record) {
      const record2: RecordItem = clone(record);
      record2.createAt = record2.createAt || new Date().toISOString();
      state.recordList.push(record2);
      store.commit("saveRecords");
    },
    saveRecords(state) {
      window.localStorage.setItem(
        "recordList",
        JSON.stringify(state.recordList)
      );
    },
    fetchTags(state) {
      state.tagList = JSON.parse(
        window.localStorage.getItem("tagList") || "[]"
      );
      if (state.tagList.length === 0) {
        store.commit("createTag", "衣");
        store.commit("createTag", "食");
        store.commit("createTag", "住");
        store.commit("createTag", "行");
      }
    },
    createTag(state, name: string) {
      state.createTagError = null;
      const names = state.tagList.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        state.createTagError = new Error("标签重复了");
        return;
      }
      const id = createId().toString();
      state.tagList.push({ id: id, name: name });
      store.commit("saveTags");
    },
    saveTags(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter((t) => t.id === id)[0];
    },
    updateTag(state, payload: { id: string; name: string }) {
      state.updateTagError = null;
      const { id, name } = payload;
      const idList = state.tagList.map((item) => item.id);
      const tag = state.tagList.filter((item) => item.id === id)[0];
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList
          .filter((item) => item.id !== id)
          .map((item) => item.name);
        if (names.indexOf(name) >= 0) {
          state.updateTagError = new Error("标签名重复了");
        } else if (name.length === 0) {
          state.updateTagError = new Error("标签名不能为空");
        } else {
          tag.name = name;
          store.commit("saveTags");
        }
      }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit("saveTags");
        router.back();
      } else {
        window.alert("删除失败");
      }
    },
    setSelectedTag(state, tags: string[]) {
      state.selectedTags = tags;
      console.log(tags);
    },
  },
});

export default store;
