<template>
    <view class="bg-cover" @touchmove.prevent @click="hideListPanel">
    </view>
</template>

<script setup>
// import { useStore } from 'vuex'

// const store = useStore()

// const hideListPanel = () => {
//     store.state.list_panel = false
// }
</script>

<style lang="less" scoped>
.bg-cover {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 1;
    z-index: 10;
    background-color: rgba(61, 59, 59, 0.718);
    transition: all .5s;

    &.hide {
        position: static;
        opacity: 0;
    }
}
</style>
