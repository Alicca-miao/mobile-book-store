<template>
  <view class="recommend">

    <text class="title">{{ title }}</text>

    <view class="list">

      <scroll-view scroll-x class="list-ul">
        <view class="list-li" v-for="(item, index) in booklist" :key="item.id">
          <!-- <router-link :to="{ path: '/bookdetail/' + item.id }" @click="bookDetailId(item.id)"> -->
          <image :src="item.images" @error="handleImageError($event, item.id)" />

          <text class="book-name">{{ item.name }}</text>
          <text class="book-author">{{ item.author }}</text>
          <!-- </router-link> -->
        </view>
      </scroll-view>
    </view>

  </view>
</template>

<script setup>
import { defineProps,ref,computed} from 'vue'
// import { useStore } from 'vuex'

// 获取 props 和 store
const props = defineProps(['booklist', 'title'])

// const store = useStore()

// 定义方法
// const bookDetailId = (id) => {
//   // 执行你需要的操作，比如导航到书籍详情页
//   uni.navigateTo({
//     url: `/pages/bookdetail/bookdetail?id=${id}`
//   })
// }
const defaultImage = '/static/images/noimage.jpg'
// 返回图片源地址
// 处理图片加载错误
// 处理图片加载错误
const imageUrl = ref('');
const handleImageError = (event, id) => {
  // 查找当前出错的图片并设置默认图片
  const imageElement = event.currentTarget; // 使用 currentTarget 代替 target
  if (imageElement) {
    imageElement.src = defaultImage;
  } else {
    console.log('Image load error, event.currentTarget is undefined');
  }
};

</script>

<style lang="less" scoped>
.recommend {
  padding: 15px 0;
  margin-bottom: 15px;
  background-color: #fff;

  .title {
    margin-left: 15px;
    margin-bottom: 10px;
    border-left: 2px solid #ed424b;
    text-indent: 5px;
    font-size: 16px;
    line-height: 16px;
  }

    .list {
      .list-ul {
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        text-indent: 7px;
      }

      .list-li {
        display: inline-block;
        margin-right: 8px;
        width: 100px;
      }

      .list-li image {
        width: 100%;
        height: 125px;
      }

      .list-li text {
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

       .book-name {
        margin-top:3px;
       }

      .book-author {
           justify-content: center;
            font-size: 13px;
            color: #969ba3;

      }
    }
}
</style>
