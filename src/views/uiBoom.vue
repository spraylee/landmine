<template>
  <FullSreen
    class="ui-boom"
    :pose="value ? 'visible' : 'hidden'"
    :class="value ? 'visible' : 'hidden'"
  >
    <Sidebar class="sidebar" :class="type" :pose="value ? 'visible' : 'hidden'">
      <div class="title" v-if="type === 'boom'">You Losed!</div>
      <div class="title" v-if="type === 'win'">You Win!</div>
      <Item class="item" @click.native="$emit('restart')">TRY AGAIN</Item>
      <Item class="item" @click.native="isShowOption = !isShowOption"
        >CHANGE MODE</Item
      >
      <OptionList
        class="options"
        :pose="isShowOption ? 'showOption' : 'notShowOption'"
      >
        <Option
          class="option-item"
          v-for="(item, i) in setting.size.list"
          :key="item.label"
          @click.native="$emit('changeMode', i)"
          >{{ item.label }}</Option
        >
      </OptionList>
    </Sidebar>
  </FullSreen>
</template>

<script lang="ts">
import Vue from 'vue'
import posed from 'vue-pose'
import { setting } from '../core/landmine'
export default Vue.extend({
  props: {
    value: Boolean,
    type: String // win | boom
  },
  data() {
    return {
      isShowOption: true,
      setting
    }
  },
  watch: {
    value() {
      if (this.value) this.isShowOption = false
    }
  },
  components: {
    FullSreen: posed.div({
      visible: {
        backgroundColor: 'rgba(0,0,0,0.3)'
      },
      hidden: {
        backgroundColor: 'rgba(0,0,0,0)'
      }
    }),
    Sidebar: posed.div({
      visible: {
        y: 0,
        opacity: 1,
        beforeChildren: true,
        staggerChildren: 60
      },
      hidden: {
        y: '-300%',
        opacity: 0,
        afterChildren: true
      }
    }),
    Item: posed.div({
      showOption: { opacity: 1, y: 0 },
      notShowOption: { opacity: 0, y: 20 }
    }),
    OptionList: posed.div({
      showOption: { height: 'auto', staggerChildren: 60 },
      notShowOption: { height: 0, afterChildren: false, staggerChildren: 60 }
    }),
    Option: posed.div({
      showOption: { opacity: 1, scale: 1 },
      notShowOption: { opacity: 0, scale: 0 }
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
    font-size: 42px;
    color: #fff;
    margin: 15px 0 25px;
  }
}
.sidebar {
  background: #10d895;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 2px 2px 25px rgba(0, 0, 0, 0.6);
  &.boom {
    background: rgb(223, 97, 66);
  }
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
  color: #666;
  font-weight: bold;
}
.options {
  display: flex;
  .option-item {
    height: 35px;
    border-radius: 5px;
    background: #fff;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #666;
    font-weight: bold;
    flex: 1;
    font-size: 14px;
    + .option-item {
      margin-left: 10px;
    }
  }
}
</style>
