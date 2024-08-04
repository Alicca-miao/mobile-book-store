<template>
  <view class="book-list">
    <view class="title">{{ title }}</view>
    <view>
      <view v-for="item in datalist" :key="item.id" @click="bookDetailId(item.id)" class="book-item">
        <view class="book-image">
          <image :src="item.images" mode="aspectFill"/>
        </view>

        <view class="book-detail">
          <view class="book-title">{{ item.name }}</view>
          <view class="book-intro">{{ item.intro }}</view>
          <view class="author">
            <image src="@/static/images/man.png" />
            <text>{{ item.author }}</text>
          </view>
          <view class="category-r">
            <text>{{ type(item.type) }}</text>
            <text>{{ item.serialize }}</text>
            <text>{{ item.wordcount }}万字</text>
          </view>
        </view>

      </view>
    </view>
  </view>
</template>

<script setup>
import { defineProps } from 'vue';

// 获取 `props` 和 `context`，使用 `setup` 函数
const props = defineProps(['datalist', 'title']);

// 定义方法
const bookDetailId = (id) => {
  // store.dispatch('chooseBook', id)
};

// 定义计算属性，用于处理 `type` 转换
const type = (value) => {
  switch (value) {
    case 1:
      return '玄幻';
    case 2:
      return '修真';
    case 3:
      return '都市';
    case 4:
      return '历史';
    case 5:
      return '网游';
    default:
      return '类型';
  }
};
</script>


<style lang="less" scoped>
.book-list {
  margin-top: 15px;
  padding: 15px;
  background-color: #fff;
  margin-bottom: 16px;
  /* 增加底部外边距 */
  align-items: flex-start;
  /* 确保内容在顶部对齐 */

  &:last-of-type {
    border-bottom: none;
  }

  .title {
    margin-left: 0;
    margin-bottom: 10px;
    border-left: 2px solid #ed424b;
    text-indent: 5px;
    font-size: 16px;
    line-height: 16px;
  }

  .book-item {
    display: flex;
    padding: 10px;
    margin-bottom: 14px;
    border-bottom: 1px solid #7d7777;
    align-items: flex-start;

    &:last-child {
      border-bottom: none;
    }
  }

  .book-image {
    width: 80px;
    /* 确保图片有一定宽度 */
    // border:1px solid red;
    background-image: url("http://qidian.qpic.cn/qdbimg/349573/1004608738/150");
    height:140px;

    // image {
    //   width: 100%;
    //   height: 100%;
    //   /* 使图片充满容器 */
    // }
  }

  .book-detail {
    flex: 1;
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* 使内容上下分布 */

    .book-title {
      font-size: 14px;
      margin-bottom: 5px;
    }

    .book-intro {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      line-clamp: 2;
      font-size: 13px;
      color: #969ba3;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 5px;
    }

    .author {
      // display: flex;
      align-items: left;
      // margin-top: auto;
      /* 确保在底部 */

      .author-image {
        width: 16px;
        height: 16px;
        margin-right: 5px;
      }

      text {
        font-size: 13px;
        color: #969ba3;
      }
    }

    .category-r {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      color: #969ba3;
      font-size: 10px;
      margin-top: 10px;

      text {
        border: 1px solid #ccc;
        border-radius: 2px;
        padding: 2px 4px;
      }

      text:nth-child(2) {
        color: #ed424b;
      }

      text:nth-child(3) {
        color: #4284ed;
      }
    }
  }
}
</style>

