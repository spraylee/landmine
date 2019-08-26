<template>
  <div class="ui-table">
    <div
      class="cell-list"
      :style="{
        gridTemplateRows: `repeat(${setting.size.current.width}, 1fr)`,
        gridTemplateColumns: `repeat(${setting.size.current.height}, 1fr)`
      }"
    >
      <template v-for="line in landmine.table">
        <div
          class="cell"
          v-for="item in line"
          :class="{ open: item.isOpen, boom: item.isBoom }"
          :key="`${item.x}-${item.y}`"
          @click="dig(item)"
        >
          {{ getLabel(item) }}
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { landmine, setting, Cell } from '../core/landmine'
type Landmine = typeof landmine
export default Vue.extend({
  props: {
    landmine: Object
  },
  data() {
    return {
      setting
      // landmine: this.data as Landmine
    }
  },
  methods: {
    getLabel(item: Cell) {
      if (item.isBoom) return 'X'
      if (!item.isOpen) {
        return ''
      } else {
        return item.number || ''
      }
    },
    dig(item: Cell) {
      if (
        !item.isOpen &&
        !this.landmine.isDig &&
        !this.landmine.isBoom &&
        !this.landmine.isWin
      )
        item.dig()
    }
  }
})
</script>

<style lang="less" scoped>
.ui-table {
  display: flex;
  align-items: center;
  justify-content: center;
  .cell-list {
    display: grid;
    grid-auto-flow: column;
    width: 80vmin;
    height: 80vmin;
    gap: 1px;
    background-color: #999;
    padding: 1px;
    .cell {
      // background-color: #ddd;
      background-color: #ececec;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 3px solid #d8d8d8;
      &.open {
        background-color: #fff;
        border: none;
      }
      &.boom {
        background-color: rgb(240, 188, 188);
        border: none;
      }
    }
  }
}
@media (max-width: 600px) {
  .ui-table {
    .cell-list {
      width: 95vmin;
      height: 95vmin;
    }
  }
}
</style>
