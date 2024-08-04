<template>
  <div class="top-nav-pannel font-container" id="font-container" v-show="fontPanel">
    <div class="child-mod">
      <span>字号</span>
      <button id="large-font" class="spe-button" @click="increaseFontSize">
        大
      </button>
      <button id="small-font" class="spe-button" @click="decreaseFontSize" style="margin-left:10px;">
        小
      </button>
    </div>
    <div class="child-mod" id="bk-container">
      <span>背景</span>
      <div class="bk-container" :class="{ 'bk-container-current': index === nowColor }" v-for="(n, index) in 6"
        :key="index">
        <div class="color_btn" @click="changeColor(index)"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fontPanel = ref(true) // 控制面板的显示状态
const nowColor = ref(0) // 当前选择的背景色
const fontSize = ref(14) // 默认字体大小

const changeColor = (index) => {
  nowColor.value = index
  localStorage.setItem('bg_color', index + 1) // 保存背景颜色到本地存储
}

const increaseFontSize = () => {
  fontSize.value += 2 // 增加字体大小
  localStorage.setItem('font_size', fontSize.value) // 保存字体大小到本地存储
}

const decreaseFontSize = () => {
  fontSize.value = Math.max(fontSize.value - 2, 10) // 减少字体大小，最小值为10
  localStorage.setItem('font_size', fontSize.value) // 保存字体大小到本地存储
}

// 初始化时从本地存储加载保存的值
const initializeSettings = () => {
  const savedColor = localStorage.getItem('bg_color')
  if (savedColor) {
    nowColor.value = parseInt(savedColor, 10) - 1
  }

  const savedFontSize = localStorage.getItem('font_size')
  if (savedFontSize) {
    fontSize.value = parseInt(savedFontSize, 10)
  }
}

initializeSettings()
</script>

<style lang="less" scoped>
.top-nav-pannel {
  position: fixed;
  bottom: 70px;
  height: 135px;
  background: none;
  width: 100%;
  color: #fff;
  font-size: 14px;
  z-index: 10004;

  button {
    background: none;
    border: 1px #8c8c8c solid;
    padding: 5px 40px;
    color: #fff;
    display: inline-block;
    border-radius: 16px;

    &:focus {
      outline: none;
    }
  }

  .child-mod {
    padding: 5px 20px;
    margin-top: 15px;

    &>span:first-child {
      margin-right: 20px;
    }
  }

  .bk-container {
    position: relative;
    height: 30px;
    width: 30px;
    background: #fff;
    border-radius: 15px;
    display: inline-block;
    vertical-align: -14px;
    margin-left: 10px;

    .color_btn {
      height: 30px;
      width: 30px;
      border-radius: 15px;
    }
  }

  .bk-container-current {
    height: 31px;
    width: 32px;
    border-radius: 16px;
    border: 1px #ff7800 solid;
  }

  .bac(@color) {
    background-color: @color;
  }

  .bk-container:nth-child(2) .color_btn {
    .bac(#e9dfc7);
  }

  .bk-container:nth-child(3) .color_btn {
    .bac(#e7eee5);
  }

  .bk-container:nth-child(4) .color_btn {
    .bac(#a4a4a4);
  }

  .bk-container:nth-child(5) .color_btn {
    .bac(#cdefcd);
  }

  .bk-container:nth-child(6) .color_btn {
    .bac(#283548);
  }

  .bk-container:nth-child(7) .color_btn {
    .bac(#0f1410);
  }
}
</style>
