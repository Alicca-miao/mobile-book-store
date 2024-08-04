<template>
  <view class="list-panel" :class="{ show: showListPanel }" @touchmove.prevent>
    <view class="list">
      <view class="list-nav">
        <image class="back" @click="hideListPanel" src="/static/images/back.png"></image>
        <text>目录</text>
      </view>
      <view class="list-content" @touchmove.prevent>
        <view class="list-item" v-for="(item, index) in chapterList" :key="index" @click="jumpTo(index)">
          · {{ index + 1 }}. {{ item }}
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({
  bookId: {
    type: String,
    required: true
  }
})

const chapterList = ref([])
const showListPanel = ref(true) // 控制列表面板的显示状态

const getList = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/titles?id=${props.bookId}`)
    chapterList.value = res.data.titles.split('-')
  } catch (error) {
    console.error('Failed to fetch chapter list', error)
  }
}

const jumpTo = (index) => {
  if (index >= 50) {
    index = 50
  }
  // Perform scroll to top
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 300
  })
  // Optionally, handle the chapter change (e.g., emit an event)
  console.log('Jump to chapter:', index + 1)
  hideListPanel() // Hide the list panel after selection
}

const hideListPanel = () => {
  showListPanel.value = false
}

onMounted(() => {
  getList()
})
</script>

<style lang="less" scoped>
.list-panel {
  position: fixed;
  transition: all .3s;
  left: 0;
  top: 0;
  bottom: 0;
  right: 50px;
  z-index: 10;
  overflow: auto;
  transform: translateX(-100%);

  &.show {
    transform: translateX(0);
  }

  .list {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    opacity: 1;

    .list-nav {
      position: fixed;
      height: 50px;
      line-height: 50px;
      text-align: center;
      top: 0;
      left: 0;
      right: 50px;
      color: #ed424b;
      background-color: #fff;
      border-bottom: 1px solid #ed424b;

      .back {
        position: absolute;
        left: 10px;
        top: 10px;
        width: 30px;
        height: 30px;
      }

      text {
        margin: 0;
      }
    }

    .list-content {
      background-color: #fff;
      margin-top: 50px;

      .list-item {
        color: #333;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 15px;
      }
    }
  }
}
</style>
