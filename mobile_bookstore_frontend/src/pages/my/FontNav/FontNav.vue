<template>
  <view class="top-nav-panel" v-show="fontPanel">
    <view class="child-mod">
      <text>字号</text>
      <button id="large-font" class="spe-button" @click="increaseFontSize">大</button>
      <button id="small-font" class="spe-button" @click="decreaseFontSize" style="margin-left: 10px;">小</button>
    </view>
    <view class="child-mod" id="bk-container">
      <text>背景</text>
      <view class="bk-container" :class="{ 'bk-container-current': index === nowColor }" v-for="(n, index) in 6"
        :key="index">
        <view class="color_btn" @click="changeColor(index)" :style="{ backgroundColor: colorList[index] }"></view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const fontPanel = ref(true); // 控制面板的显示状态
const nowColor = ref(0); // 当前选择的背景色
const fontSize = ref(14); // 默认字体大小

const colorList = [
  '#e9dfc7', '#e7eee5', '#a4a4a4', '#cdefcd', '#283548', '#0f1410'
];

const changeColor = (index) => {
  nowColor.value = index;
  uni.setStorageSync('bg_color', index + 1); // 保存背景颜色到本地存储
};

const increaseFontSize = () => {
  fontSize.value += 2; // 增加字体大小
  uni.setStorageSync('font_size', fontSize.value); // 保存字体大小到本地存储
};

const decreaseFontSize = () => {
  fontSize.value = Math.max(fontSize.value - 2, 10); // 减少字体大小，最小值为10
  uni.setStorageSync('font_size', fontSize.value); // 保存字体大小到本地存储
};

// 初始化时从本地存储加载保存的值
const initializeSettings = () => {
  const savedColor = uni.getStorageSync('bg_color');
  if (savedColor) {
    nowColor.value = parseInt(savedColor, 10) - 1;
  }

  const savedFontSize = uni.getStorageSync('font_size');
  if (savedFontSize) {
    fontSize.value = parseInt(savedFontSize, 10);
  }
};

onMounted(() => {
  initializeSettings();
});
</script>

<style lang="less" scoped>
.top-nav-panel {
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

    text:first-child {
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
}
</style>
