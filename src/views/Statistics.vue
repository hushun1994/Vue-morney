<template>
  <Layout>
    <Tabs
      class-prefix="type"
      :data-source="recordTypeList"
      :value.sync="type"
    />
    <ol v-if="groupedList.length > 0">
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">
          <span>{{ beautify(group.title) }}</span>
          <span>¥{{ group.total }}</span>
        </h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{ tagString(item.tags) }}</span>
            <span class="record-notes">{{ item.notes }}</span>
            <span>¥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      <span>添加了记录再来逛哦</span>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Tabs from "@/components/Tabs.vue";
import { Component, Prop } from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";

@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags
      .map((item) => {
        return item.name;
      })
      .reduce((result, current, index) => {
        return result.concat(
          index !== tags.length - 1 ? [current, ","] : [current]
        );
      }, [] as any)
      .join("");
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const { recordList } = this;

    const newList = clone(recordList)
      .filter((r) => r.type === this.type)
      .sort((a, b) => {
        return dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf();
      });
    if (newList.length === 0) {
      return [];
    }
    type Result = [{ title: string; total?: number; items: RecordItem[] }];
    const result: Result = [
      {
        title: dayjs(newList[0].createAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createAt).format("YYYY-MM-DD"),
          items: [current],
        });
      }
    }
    result.forEach((group) => {
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    return result;
  }

  created() {
    this.$store.commit("fetchRecords");
  }

  type = "-";
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
::v-deep {
  .type-tabs-item {
    background: #fff;
    &.selected {
      background: #c4c4c4;
      &::after {
        display: none;
      }
    }
  }
  li.interval-tabs-item {
    height: 48px;
  }
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  @extend %item;
}
.record {
  @extend %item;
  background: #fff;
}
.record-notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
.noResult {
  padding: 24px;
  text-align: center;
  color: #999;
}
</style>
