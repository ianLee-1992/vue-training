<template>
  <div class="goodsdesc-container">
    <h3>{{ info.title }}</h3>
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      // info: {},  // 图文数据
      info: {
        title: '2018新款MacBook Pro 15.4英寸苹果笔记本电脑',
        content: '<img src="src/images/mp2018.jpg" alt=""><img src="src/images/mp2.jpg" alt="">'
      }
    }
  },
  created() {
    // this.getGoodsDesc()
  },
  methods: {
    getGoodsDesc() {
      this.$http
        .get('api/goods/getdesc/' + id)
        .then(result => {
          if (result.body.status === 0) {
            this.info = result.body.message[0]
          }
        })
    }
  }
}
</script>

<style lang="scss">
.goodsdesc-container {
  overflow: hidden;
  padding: 4px;
  h3 {
    font-size: 16px;
    color: #222;
    margin: 15px 0;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
</style>
