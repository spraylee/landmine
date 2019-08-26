<template>
  <div class="page">
    <ui-boom
      :value="core.landmine.isBoom || core.landmine.isWin"
      :type="core.landmine.isWin ? 'win' : 'boom'"
      @restart="core.landmine.restart()"
      @changeMode="i => core.setting.size.change(i)"
    ></ui-boom>
    <ui-table :landmine="core.landmine"></ui-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UiTable from './uiTable.vue'
import uiBoom from './uiBoom.vue'
import { setting, landmine, Cell } from '../core/landmine'
export default Vue.extend({
  components: { UiTable, uiBoom },
  data() {
    return {
      ui: {
        isShowMenu: false
      },
      core: {
        setting,
        landmine
      }
    }
  },
  mounted() {
    // this.core.landmine
  },
  methods: {
    change() {}
  }
})
</script>

<style lang="less" scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
