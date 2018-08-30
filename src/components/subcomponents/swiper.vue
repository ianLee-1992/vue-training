<template>
  <div>

    <mt-swipe :auto="4000">
      <!-- 将来，谁使用此 轮播图组件，谁为我们传递 lunbotuList -->
      <!-- 此时，lunbotuList 应该是 父组件向子组件传值来设置 -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <img :src="item.img" alt="" :class="{'full': isfull}">
      </mt-swipe-item>
    </mt-swipe>

  </div>
</template>

<script>
export default {
  props: ['lunbotuList', 'isfull'],
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    text-align: center;
    // &:nth-child(1) {
    //   background-color: skyblue;
    // }
    // &:nth-child(2) {
    //   background-color: cadetblue;
    // }
    // &:nth-child(3) {
    //   background-color: palevioletred;
    // }

    img {
      // width: 100%;
      height: 100%;
    }
  }
}

.full {
  width: 100%;
}
</style>
