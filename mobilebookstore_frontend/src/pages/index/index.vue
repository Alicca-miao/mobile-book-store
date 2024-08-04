<script setup>
import {mySwiper} from '@/components/mySwiper.vue'
import {ref,onMounted} from 'vue'
// import {loading} from '@/components/Loading/Loading.vue'
import { computed} from 'vue';
import Recommend from './Common/Recommend.vue';
import BookList from './Common/BookList.vue';
import Loading from './Loading/Loading.vue';

// 定义响应式数据



const type = ref([
  { num: 1, word: '玄幻' },
  { num: 2, word: '修真' },
  { num: 3, word: '都市' },
  { num: 4, word: '历史' },
  { num: 5, word: '游戏' }
]);

const loading = ref(false);
let list = [
  {
    num:1,
    src: '/static/images/biaoti1.jpg'  // 使用相对路径
  },

  {
    num: 2,
    src: '/static/images/biaoti2.jpg' // 使用相对路径
  }
]

// 获取数据的示例
const getData = () => {
  uni.request({
    url: 'http://localhost:3000/booklist',
    method: 'GET',
    success: (res) => {
      console.log(res.data);
    },
    fail: (err) => {
      console.error(err);
    }
  });
};



// 调用函数
// fetchDataById(1, 8).then(data => {
//   console.log('Fetched data:', data);
// });

// 调用获取数据的函数
const data = ref([]);

const fetchDataByIds = async (ids) => {
  const promises = ids.map(id => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: 'http://localhost:3000/booklist',
        method: 'GET',
        data: { id },
        success: (response) => resolve(response.data),
        fail: (error) => reject(error),
      });
    });
  });

  try {
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

// 示例调用
const generateRandomIds = (count, min = 1, max = 50) => {
  const ids = new Set();
  while (ids.size < count) {
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    ids.add(randomId);
  }
  return Array.from(ids);
};


const randomIds = generateRandomIds(30);
let apple=ref([])
onMounted(async () => {
  const fetchedData = await fetchDataByIds(randomIds);
  data.value = fetchedData;
  apple.value = data.value.filter(item => item.images.startsWith('http://qidian'));


  console.log('Fetched data:', apple.value);
});


// 定义自定义过滤器
const hot = (value) => {
  if (!value) return [];
  return value.filter((item, index) => index < 20 && index % 2 === 1);
};


const top = (value) => {
  if (!value) return [];
  return value.filter((item, index) => index < 20 && index % 2 === 0);
};

const free = (value) => {
  if (!value) return [];
  return value.filter((item, index) => index < 20 && index % 3 === 2);
};

const newbook = (value) => {
  if (!value) return [];
  return value.filter((item, index) => index % 3 === 1).slice(0, 3);
};

const endbook = (value) => {
  if (!value) return [];
  return value.filter((item) => item.serialize === '完本');
};

const like = (value) => {
  if (!value) return [];
  return value.filter((item, index) => index % 4 === 2).slice(0, 3);
};
let haha = [
  {

    "id": "5",
    "name": "圣墟",
    "author": "辰东",
    "images": "http://qidian.qpic.cn/qdbimg/349573/1004608738/150",
    "ratings": "4.8",
    "wordcount": "114.84",
    "type": "玄幻",
    "intro": "在破败中崛起，在寂灭中复苏。沧海成尘，雷电枯竭，那一缕幽雾又一次临近大地，世间的枷锁被打开了，一个全新的世界就此揭开神秘的一角……",
    "serialize": "连载",
    "like": "145-82-29"
  },
  {

    "id": "6",
    "name": "圣墟",
    "author": "辰东",
    "images": "http://qidian.qpic.cn/qdbimg/349573/1004608738/150",
    "ratings": "4.8",
    "wordcount": "114.84",
    "type": "玄幻",
    "intro": "在破败中崛起，在寂灭中复苏。沧海成尘，雷电枯竭，那一缕幽雾又一次临近大地，世间的枷锁被打开了，一个全新的世界就此揭开神秘的一角……",
    "serialize": "连载",
    "like": "145-82-29"
  },
  {

    "id": "6",
    "name": "圣墟",
    "author": "辰东",
    "images": "http://qidian.qpic.cn/qdbimg/349573/1004608738/150",
    "ratings": "4.8",
    "wordcount": "114.84",
    "type": "玄幻",
    "intro": "在破败中崛起，在寂灭中复苏。沧海成尘，雷电枯竭，那一缕幽雾又一次临近大地，世间的枷锁被打开了，一个全新的世界就此揭开神秘的一角……",
    "serialize": "连载",
    "like": "145-82-29"
  },
  {

    "id": "7",
    "name": "圣墟",
    "author": "辰东",
    "images": "http://qidian.qpic.cn/qdbimg/349573/1004608738/150",
    "ratings": "4.8",
    "wordcount": "114.84",
    "type": "玄幻",
    "intro": "在破败中崛起，在寂灭中复苏。沧海成尘，雷电枯竭，那一缕幽雾又一次临近大地，世间的枷锁被打开了，一个全新的世界就此揭开神秘的一角……",
    "serialize": "连载",
    "like": "145-82-29"
  }
]


</script>

<template>
  <view class="container">
    <view class="nav-header">
      <view class="contai">
        <navigator url="/" class="brand">移动书城</navigator>
        <navigator url="/" class="avatar"></navigator>
      </view>

      <swiper class="swipe" autoplay interval="5000">
        <swiper-item v-for="item in list" :key="item.num">
          <image :src="item.src" mode="aspectFill"></image>
        </swiper-item>
      </swiper>
    </view>

    <view class="home-nav">
      <!-- <navigator class="guide-nav-div" v-for="(item, index) in type" :key="item.num"
        :url="'/pages/category/index?type=' + item.num">
        <i class="icon icon-sort"></i>
        <text class="guide-nav-h">{{ item.word }}</text>
      </navigator> -->

      <view class="guide-nav-div">
        <i class="icon icon-1"></i>
        <h4 class="guide-nav-h">{{ type[0].word }} </h4>
      </view>
      <view class="guide-nav-div">
        <i class="icon icon-2"></i>
        <h4 class="guide-nav-h">{{ type[1].word }}</h4>
      </view>
      <view class="guide-nav-div">
        <i class="icon icon-3"></i>
        <h4 class="guide-nav-h">{{ type[2].word }}</h4>
      </view>
      <view class="guide-nav-div">
        <i class="icon icon-4"></i>
        <h4 class="guide-nav-h">{{ type[3].word }}</h4>
      </view>
      <view class="guide-nav-div">
        <i class="icon icon-5"></i>
        <h4 class="guide-nav-h">{{ type[4].word }}</h4>
      </view>
    </view>


    <view v-if="true">
      <recommend :booklist="hot(apple).slice(0,4)" title="热门小说"></recommend>
      <recommend :booklist="top(apple).slice(0, 4) " title="排行榜"></recommend>
      <recommend :booklist="free(apple).slice(0, 4) " title="限时免费"></recommend>
      <book-list :datalist="newbook(apple)" title="新书抢鲜"></book-list>
      <book-list :datalist="endbook(apple).slice(0, 2) " title="畅销完本"></book-list>
      <book-list :datalist="like(apple).slice(0, 2)" title="猜你喜欢"></book-list>

    </view>

    <!-- <loading v-show="loading"></loading> -->

  </view>
</template>

<style lang="less">

.contai {
  display: flex;
  align-items: center;
  /* 垂直居中 */
  justify-content: center;
  /* 水平居中 */
  background-color: #f7e2e2;
  padding:5px;
  /* 背景颜色 */
}

.brand {
  font-size: 20px;
  margin-top:20px;
  color: black(210, 204, 204, 0.102);
  /* 文字颜色 */
}
.container {
  background-color: #f6f7f9;
}

.nav-header {
  header {
    display: flex;
    height: 45px;
    padding: 0 15px;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    text-indent: -8888px;

    .brand {
      width: 100px;
      background: url(http://qidian.gtimg.com/qdm/img/logo-qdm.0.50.svg) no-repeat left;
      background-size: 100%;
    }

    .avatar {
      width: 24px;
      height: 24px;
      background: url(@/static/images/avatar.png) no-repeat left;
      background-size: 100%;
    }
  }
}

.home-nav {
  display: flex;
  padding: 10px 0;
  margin: 10px 0;
  background-color: #fff;



    .guide-nav-div {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .icon {
        width: 24px;
        /* 单个图标的宽度 */
        height: 24px;
        /* 单个图标的高度 */
        background-image: url(/static/images/sprite.0.50.png);
        /* 精灵图路径 */
        background-repeat: no-repeat;
        /* 不重复背景图 */
      }
    }

    .icon-1 {
      background-position: -63px -28px;
      /* 精灵图中图标1的背景位置 */
    }

    .icon-2 {
      background-position: 0 0;
      /* 精灵图中图标2的背景位置 */
    }

    .icon-3 {
      background-position: 0 -30px;
      /* 精灵图中图标3的背景位置 */
    }

    .icon-4 {
      background-position: 0 -60px;
      /* 精灵图中图标4的背景位置 */
    }

    .icon-5 {
      background-position: -30px -30px;
      /* 精灵图中图标5的背景位置 */
    }
}

.swipe {
  height: 170px;

  image {
    width: 100%;
  }
}
</style>
