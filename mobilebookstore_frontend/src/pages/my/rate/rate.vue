<template>
  <div class="rate-score">
    <span class="star-item" :class="item" v-for="(item, index) in itemClasses" :key="index"></span>{{ score }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  score: {
    type: Number,
    required: true
  }
})

// Computed property for star item classes
const itemClasses = computed(() => {
  let result = []
  let score = Math.floor(props.score * 2) / 2
  let hasDecimal = score % 1 !== 0
  let integer = Math.floor(score)
  for (let i = 0; i < integer; i++) {
    result.push('on')
  }
  if (hasDecimal) {
    result.push('half')
  }
  while (result.length < 5) {
    result.push('off')
  }
  return result
})
</script>

<style lang="less" scoped>
.rate-score {
  display: flex;
  align-items: center;

  .star-item {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-size: 100% 100%;

    &.on {
      background: url("./star_on.png");
    }

    &.half {
      background: url("./star_half.png");
    }

    &.off {
      background: url("./star_off.png");
    }

    &:last-of-type {
      margin-right: 10px;
    }
  }
}
</style>
