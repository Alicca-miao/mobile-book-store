<template>
  <view class="similar" @click="toBookDetail(Number(props.like))">
    <view class="similar-img">
      <image :src="bookDetail.images" mode="aspectFill" @error="loadImage" />
    </view>
    <text>{{ bookDetail.name }}</text>
  </view>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue' // Assume you have a request utility for HTTP

const props = defineProps({
  like: {
    type: String, // 或者根据需要使用 Number 类型
    required: true
  }
})

const bookDetail = ref({})

// Fetch book details
const getBookDetail = (id) => {
  // 设置 loading 状态为 true (如果需要的话)
  // loading.value = true;

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


// Handle click event
const toBookDetail = (id) => {
  uni.navigateTo({
    url: `/pages/bookdetail/bookdetail?id=${id}` // Replace with your actual page path
  })
}

// Handle image load error
const loadImage = (event) => {
  event.target.src = '/static/images/noimage.png' // Replace with the path to your default image
}

// Initial data fetch
onMounted(() => {
  getBookDetail(Number(props.like))
})
</script>

<style lang="less" scoped>
.similar {
  width: 110px;
  height: 165px;

  .similar-img {
    height: 140px;
  }

  image {
    width: 100%;
    height: 100%;

    &[src=""] {
      opacity: 0;
    }
  }
}
</style>
