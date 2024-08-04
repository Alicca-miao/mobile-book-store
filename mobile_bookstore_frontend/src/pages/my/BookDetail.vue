<template>
  <view class="book-detail">
    <loading v-if="loading" />
    <view class="detail-content" v-if="bookDetail">
      <view class="detail-linear">
        <view class="detail-top">
          <u-button @click="back" class="back-btn">
            <u-icon name="left" />
            <text class="detail-title">{{ bookDetail.name }}</text>
          </u-button>
          <u-button @click="goHome" class="home-btn">
            <u-icon name="home" />
          </u-button>
        </view>
        <view class="detail-con" v-if="!loading">
          <view class="detail-img">
            <image :src="bookDetail.images" mode="aspectFill" @error="loadImage" />
          </view>
          <view class="detail-main">
            <text class="name">{{ bookDetail.name }}</text>
            <text class="author">作者：{{ bookDetail.author }}</text>
            <text class="type">分类：{{ bookDetail.type }}</text>
            <text class="word-count">{{ bookDetail.wordcount }}万字</text>
            <rate :score="bookDetail.ratings" />
          </view>
        </view>
        <view class="read-btn" v-if="!loading">
          <view>
            <u-button @click="openBook">开始阅读</u-button>
          </view>
          <view>
            <u-button @click="openBook">加入书架</u-button>
          </view>
        </view>
      </view>
      <view v-if="!loading">
        <view class="detail-intro">
          <text :class="{ show5: !showmore }" @click="showmore = !showmore">{{ bookDetail.intro }}</text>
        </view>
        <view class="detail-tag">
          <text class="tag">类别标签</text>
          <view class="tag-btn">
            <text>{{ bookDetail.type }}</text>
            <text>东方玄幻</text>
          </view>
        </view>
        <view class="detail-like">
          <text class="like-title">喜欢本书的人也喜欢</text>
          <view class="like-list">
            <view v-for="(item, index) in likes" :key="index">
              <similar :like="item" />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Similar from './Similar.vue';
import Rate from './Rate.vue';
import Loading from './Loading.vue';

const props = defineProps({
  bookId: {
    type: String,
    required: true,
  },
});

const loading = ref(false);
const bookDetail = ref({});
const likes = ref([]);
const showmore = ref(false);

const getBookDetail = async (bookId) => {
  loading.value = true;
  try {
    const res = await new Promise((resolve, reject) => {
      uni.request({
        url: `http://localhost:3000/booklist?id=${bookId}`,
        method: 'GET',
        success: (response) => resolve(response.data),
        fail: (error) => reject(error),
      });
    });
    bookDetail.value = res;
    likes.value = res.like.split('-');
  } catch (error) {
    console.error('Failed to fetch book details', error);
  } finally {
    loading.value = false;
    showmore.value = false;
  }
};


const fetchDataByIds = async (ids) => {
  const promises = ids.map(id =>
    new Promise((resolve, reject) => {
      uni.request({
        url: 'http://localhost:3000/booklist',
        method: 'GET',
        data: { id }, // 在 uni.request 中，参数用 data 来传递
        success: (response) => resolve(response.data),
        fail: (error) => reject(error),
      });
    })
  );

  try {
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


const generateRandomIds = (count, min = 1, max = 180) => {
  const ids = new Set();
  while (ids.size < count) {
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    ids.add(randomId);
  }
  return Array.from(ids);
};

const randomIds = generateRandomIds(100);
const data = ref([]);
const apple = ref([]);

onMounted(async () => {
  const fetchedData = await fetchDataByIds(randomIds);
  data.value = fetchedData;
  apple.value = data.value.filter(item => item.images.startsWith('http://qidian'));
  let applefilter = apple.value.filter(item => item.type.startsWith('玄')).slice(0, 3);
  likes.value = applefilter.map(item => item.id);
  bookDetail.value = apple.value[0];
});

const openBook = () => {
  // Handle opening book logic here
};

const back = () => {
  uni.navigateBack(); // `uni` provides `navigateBack` to go back
};

const goHome = () => {
  uni.switchTab({ url: '/' }); // Navigate to home page
};

const loadImage = (event) => {
  event.target.src = '/path/to/default-image.png'; // Default image path
};
</script>

<style lang="less" scoped>
.ell {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.book-detail {
  padding: 0 20px;
}

.loading {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.detail-linear {
  background: linear-gradient(to top, #fff, rgba(255, 255, 255, 0) 8rem) no-repeat center bottom;
}

.detail-top {
  position: fixed;
  display: flex;
  left: 0;
  top: 0;
  right: 0;
  height: 50px;
  background-color: #eee;

  .back-btn {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .detail-title {
    margin: 0 40px;
    font-size: 18px;
    line-height: 50px;
    color: #ed424b;
  }

  .home-btn {
    padding: 15px 15px 0 0;

    .iconfont {
      font-size: 22px;
      color: #ed424b;
    }
  }
}

.detail-con {
  display: flex;
  margin-top: 50px;
  padding: 15px 0 18px;

  .detail-img {
    width: 100px;
    margin-right: 25px;

    image {
      width: 100%;
    }
  }

  .detail-main {
    flex: 1;

    text.name {
      font-size: 18px;
      line-height: 2;
      .ell;
    }

    text {
      font-size: 12px;
      line-height: 2;
      .ell;
    }
  }
}

.read-btn {
  display: flex;

  >view {
    flex: 1;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;

    &:first-child {
      margin-right: 15px;
    }

    button {
      display: block;
      margin: 0 auto;
      width: 100%;
      height: 33px;
      line-height: 33px;
      font-size: 15px;
      vertical-align: middle;
      border: none;
      border-radius: 3px;
    }

    &:first-of-type {
      button {
        background-color: #ed424b;
        color: #fff;
      }
    }

    &:nth-child(2) {
      button {
        color: #333;
        background-color: #fff;
        border: 1px solid #ddd;
      }
    }
  }
}

.detail-intro {
  padding: 20px 0;
  font-size: 16px;
  text-indent: 2em;
  line-height: 1.6;
  border-bottom: 1px solid #ddd;

  text.show5 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: 5;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }
}

.detail-tag {
  padding: 10px 3px 35px 3px;
  border-bottom: 1px solid #ddd;

  text {
    font-size: 16px;
    margin-bottom: 10px;
  }

  view.tag-btn {
    text {
      list-style-type: none;
      float: left;
      padding: 1px 10px 2px;
      margin-right: 10px;
      color: #333;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  }
}

.detail-like {
  padding: 20px 0;

  text {
    font-size: 16px;
    margin-bottom: 20px;
  }

  view.like-list {
    display: flex;

    view {
      flex: 1;
      list-style-type: none;
    }
  }
}
</style>
