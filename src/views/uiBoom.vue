<template>
  <FullSreen class="ui-boom" :pose="value ? 'visible' : 'hidden'" :class="value ? 'visible' : 'hidden'">
    <Sidebar class="sidebar" :pose="value ? 'visible' : 'hidden'">
      <div class="title">You Losed!</div>
      <Item class="item" @click.native="$emit('restart')">RESTART</Item>
      <Item class="item">CHANGE MODE</Item>
    </Sidebar>
  </FullSreen>
</template>

<script lang="ts">
import Vue from 'vue'
import posed from 'vue-pose'
export default Vue.extend({
  props: {
    value: Boolean
  },
  data() {
    return {
      items: [0, 1, 2, 3, 4]
    }
  },
  components: {
    FullSreen: posed.div({
      visible: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        // pointerEvents: 'visible',
        flip: true
      },
      hidden: {
        backgroundColor: 'rgba(0,0,0,0)',
        // pointerEvents: 'none',
        flip: true
      }
    }),
    Sidebar: posed.div({
      visible: {
        y: 0,
        opacity: 1,
        beforeChildren: true,
        staggerChildren: 30
      },
      hidden: {
        y: '-300%',
        opacity: 0,

        afterChildren: true
      }
    }),
    Item: posed.div({
      visible: { opacity: 1, y: 0 },
      hidden: { opacity: 0, y: 20 }
    })
  }
})
</script>

<style lang="less">
.ui-boom {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &.hidden {
    pointer-events: none;
  }
  .title {
    font-size: 36px;
    color: #fff;
    margin: 20px;
  }
}
.sidebar {
  background: #54e365;
  padding: 20px;
}
.item {
  width: 300px;
  height: 50px;
  border-radius: 5px;
  background: #fff;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
