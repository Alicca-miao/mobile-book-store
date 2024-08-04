<template>
  <view id="reader">
    <top-nav />
    <view class="read-container" :style="{ fontSize: `${fontSize}px`, backgroundColor: backgroundColor }">
      <h4>{{ title }}</h4>
      <view class="chapterContent" v-if="!loading">
        <view v-for="(c, i) in content" :key="i">{{ c }}</view>
      </view>
      <view class="btn-bar" v-if="!loading">
        <view class="btn-tab">
          <view class="prev-btn" @click="prevChapter">上一章</view>
          <view class="next-btn" @click="nextChapter">下一章</view>
        </view>
      </view>
    </view>
    <view class="page-up" @click="pageUp"></view>
    <view class="click-mask" @click="clickBar"></view>
    <view class="page-down" @click="pageDown"></view>
    <view class="top-nav-pannel-bk font-container"></view>
    <font-nav v-if="fontPanelVisible" />
    <bottom-nav />
    <list-panel :class="{ show: listPanelVisible }" :bookId="bookId" />
    <loading v-if="loading" />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import TopNav from '@/components/TopNav/TopNav.vue';
import BottomNav from '@/components/BottomNav/BottomNav.vue';
import FontNav from '@/components/FontNav/FontNav.vue';
import Loading from '@/components/Loading/Loading.vue';
import ListPanel from '@/components/ListPanel/ListPanel.vue';

const title = ref('');
const content = ref([]);
const loading = ref(false);
const fontSize = ref(16);
const backgroundColor = ref('#fff'); // Default color
const fontPanelVisible = ref(false);
const listPanelVisible = ref(false); // Control visibility of list panel
const bookId = '1'; // Replace with actual ID
const chapter = 1; // Replace with actual chapter

const getData = async (id, chapter) => {
  uni.request({
    url: `http://localhost:3000/booklist?id=${id}`, // API 地址
    method: 'GET',
    success: (res) => {
      if (res.statusCode === 200) {
        bookDetail.value = res.data; // 更新 bookDetail 数据
      } else {
        console.error('Request failed with status code', res.statusCode);
      }
    },
    fail: (error) => {
      console.error('Failed to fetch book details', error);
    },
    complete: () => {
      // 设置 loading 状态为 false (如果需要的话)
      // loading.value = false;
    }
  });
};

onMounted(() => {
  getData(bookId, chapter);
});

const pageUp = () => {
  const target = document.documentElement.scrollTop - window.innerHeight - 80;
  startScroll(target, -20);
};

const pageDown = () => {
  const target = document.documentElement.scrollTop + window.innerHeight - 80;
  startScroll(target, 20);
};

const startScroll = (target, speed) => {
  let times = setInterval(() => {
    const scrollTop = document.documentElement.scrollTop;
    if (speed > 0) {
      if (scrollTop <= target) {
        document.documentElement.scrollTop += speed;
      }
      if (scrollTop > target || scrollTop + window.innerHeight >= document.documentElement.scrollHeight) {
        clearInterval(times);
      }
    } else {
      if (scrollTop >= target) {
        document.documentElement.scrollTop += speed;
      }
      if (scrollTop < target || scrollTop <= 0) {
        clearInterval(times);
      }
    }
  }, 1);
};

const clickBar = () => {
  fontPanelVisible.value = !fontPanelVisible.value;
};

const prevChapter = () => {
  // Implement logic for previous chapter
};

const nextChapter = () => {
  // Implement logic for next chapter
};
</script>

<style lang="less" scoped>
.read-container {
  font-size: 16px;
  color: #555;
  line-height: 31px;
  min-height: 600px;
  padding: 15px;

  h4 {
    position: fixed;
    top: 0;
    left: 15px;
    right: 15px;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    color: #736357;
    margin: 0 0 1em 0;
    letter-spacing: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  view {
    text-indent: 2em;
    margin: 0.5em 0;
    text-align: justify;
    letter-spacing: 0px;
    line-height: 1.5;
  }

  view:first-of-type {
    margin-top: 43px;
  }

  .btn-bar {
    z-index: 80;
    width: 80%;
    margin: 20px auto 0;
    max-width: 800px;

    .btn-tab {
      padding-left: 0;
      height: 34px;
      line-height: 34px;
      background-color: #000;
      border-radius: 8px;
      border: 1px solid #858382;
      font-size: 14px;
      opacity: 0.9;

      view {
        list-style-type: none;
        display: inline-block;
        width: 49%;
        text-align: center;
        color: #fff;

        &:nth-child(1) {
          border-right: 1px solid #858382;
        }
      }
    }
  }
}

.page-up {
  position: fixed;
  width: 100%;
  height: 35%;
  top: 0;
  color: rgba(0, 0, 0, 0.1);
  z-index: 5;
}

.click-mask {
  position: fixed;
  width: 100%;
  height: 30%;
  top: 35%;
  color: rgba(0, 0, 0, 0.1);
}

.page-down {
  position: fixed;
  width: 100%;
  height: 35%;
  bottom: 65px;
  color: rgba(0, 0, 0, 0.1);
  z-index: 5;
}

.top-nav-pannel-bk {
  position: fixed;
  bottom: 70px;
  height: 135px;
  background: #000;
  width: 100%;
  color: #fff;
  opacity: 0.9;
  z-index: 10003;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
