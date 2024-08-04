<script setup lang="ts">
import {onMounted, ref,defineProps,computed} from 'vue'
import { useBookStore } from '@/stores/bookStore';
import Recommend from '../index/Common/Recommend.vue';
import Loading from '../index/Loading/Loading.vue';

const title = computed(() => {
  const type = uni.getCurrentPage().options.type;
  switch (type) {
    case '1': return '玄幻';
    case '2': return '修真';
    case '3': return '都市';
    case '4': return '历史';
    case '5': return '网游';
    default: return '分类';
  }
});
//开始作妖，获取五个tag的数据

const props = defineProps({
  bookCategoryType: {
    type: String,
    default: ''
  }
});

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
const generateRandomIds = (count, min = 1, max = 100) => {
  const ids = new Set();
  while (ids.size < count) {
    const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
    ids.add(randomId);
  }
  return Array.from(ids);
};


const randomIds = generateRandomIds(50);
let apple = ref([])
let xuan = ref([])
let xiu = ref([])
let dou = ref([])
let li = ref([])
let you = ref([])
let data = ref([])
let alll = ref([])
const bookStore = useBookStore()
onMounted(async () => {
  const fetchedData = await fetchDataByIds(randomIds);
  data.value = fetchedData;

  apple.value = data.value.filter(item => item.images.startsWith('http://qidian'));

  xuan.value = apple.value.filter(item => item.type.startsWith('玄'));
  xiu.value = apple.value.filter(item => item.type.startsWith('修'));

  dou.value = apple.value.filter(item => item.type.startsWith('都'));
  li.value = apple.value.filter(item => item.type.startsWith('历'));
  you.value = bookStore.books.filter(item => item.type.startsWith('游'));
  // console.log(xuan.value, xiu.value)


});

</script>
<template>
  <view class="viewport">
    <!-- 搜索框 -->
    <view class="search">
      <view class="input">
        <text class="icon-search">美食供应商</text>
      </view>
    </view>
    <!-- 分类 -->
    <view class="categories">
      <!-- 左侧：一级分类 -->

      <scroll-view class="primary" scroll-y>
        <view v-for="(item, index) in title" :key="item.num" class="item" :class="{ active: index === 0 }">
          <text class="name"> {{ item.word }}</text>
        </view>
      </scroll-view>

      <!-- 右侧：二级分类 -->
      <scroll-view class="secondary" scroll-y>
        <!-- 焦点图 -->

        <!-- <XtxSwiper class="banner" :list="[]" /> -->

        <!-- 内容区域 -->
        <view class="panel" v-for="item in rank" :key="item.rank">
          <view class="title">
            <text class="name">{{ item.rankk }}</text>
            <navigator class="more" hover-class="none">全部</navigator>
          </view>

          <view class="section">
            <navigator v-for="goods in alll.value[item].value " :key="goods" class="goods" hover-class="none"
              :url="`/pages/goods/goods?id=`">
                <view class="category">
                  <view class="category-header">
                    <navigator url="/">
                      <image class="back-icon" src="../assets/images/back.png" />
                      <text class="title">{{ title }}</text>
                    </navigator>
                  </view>
                  <view class="category-list" v-if="!loading">
                    <scroll-view scroll-y class="book-list">
                      <view class="book-item" v-for="item in apple" :key="item.id">
                        <view class="book-image">
                          <image :src="item.images" mode="aspectFill" />
                        </view>
                        <view class="book-detail">
                          <text class="book-name">{{ item.name }}</text>
                          <text class="book-intro">{{ item.intro }}</text>
                          <view class="author">
                            <image class="author-icon" src="../assets/images/man.png" />
                            <text class="author-name">{{ item.author }}</text>
                          </view>
                          <view class="category-r">
                            <text class="category-type">{{ title }}</text>
                            <text class="category-serialize">{{ item.serialize }}</text>
                            <text class="category-wordcount">{{ item.wordcount }}万字</text>
                          </view>
                        </view>
                      </view>
                    </scroll-view>
                  </view>
                  <loading v-if="loading" />
                </view>
              <recommend :booklist=alll.value[item].value></recommend>

            </navigator>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<style lang="scss">
.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.search {
  padding: 0 30rpx 20rpx;
  background-color: #fff;

  .input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64rpx;
    padding-left: 26rpx;
    color: #8b8b8b;
    font-size: 28rpx;
    border-radius: 32rpx;
    background-color: #f3f4f4;
  }
}

.icon-search {
  &::before {
    margin-right: 10rpx;
  }
}

/* 分类 */
.categories {
  flex: 1;
  min-height: 400rpx;
  display: flex;
}

/* 一级分类 */
.primary {
  overflow: hidden;
  width: 180rpx;
  flex: none;
  background-color: #f6f6f6;

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 96rpx;
    font-size: 26rpx;
    color: #595c63;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 42rpx;
      bottom: 0;
      width: 96rpx;
      border-top: 1rpx solid #e3e4e7;
    }
  }

  .active {
    background-color: #fff;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 8rpx;
      height: 100%;
      background-color: #27ba9b;
    }
  }
}

.primary .item:last-child::after,
.primary .active::after {
  display: none;
}

/* 二级分类 */
.secondary {
  background-color: #fff;

  .carousel {
    height: 200rpx;
    margin: 0 30rpx 20rpx;
    border-radius: 4rpx;
    overflow: hidden;
  }

  .panel {
    margin: 0 30rpx 0rpx;
  }

  .title {
    height: 60rpx;
    line-height: 60rpx;
    color: #333;
    font-size: 28rpx;
    border-bottom: 1rpx solid #f7f7f8;

    .more {
      float: right;
      padding-left: 20rpx;
      font-size: 24rpx;
      color: #999;
    }
  }

  .more {
    &::after {
      font-family: 'erabbit' !important;
      content: '\e6c2';
    }
  }

  .section {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 20rpx 0;

    .goods {
      width: 150rpx;
      margin: 0rpx 30rpx 20rpx 0;

      &:nth-child(3n) {
        margin-right: 0;
      }

      image {
        width: 150rpx;
        height: 150rpx;
      }

      .name {
        padding: 5rpx;
        font-size: 22rpx;
        color: #333;
      }

      .price {
        padding: 5rpx;
        font-size: 18rpx;
        color: #cf4444;
      }

      .number {
        font-size: 24rpx;
        margin-left: 2rpx;
      }
    }
  }
}
</style>
