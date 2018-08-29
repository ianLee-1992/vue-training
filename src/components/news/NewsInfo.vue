<template>
  <div>
    <!-- 顶部子组件区域 -->
    <nav-bar title="新闻详情"></nav-bar>
    <div class="newsinfo-container">
      <!-- 大标题 -->
      <h3 class="title">{{ newsinfo.title }}</h3>
      <!-- 子标题 -->
      <p class="subtitle">
        <span>发表时间: {{ newsinfo.add_time | dateFormat }}</span>
        <span>点击: {{ newsinfo.click }}次</span>
      </p>

      <hr>
      <!-- 内容区域 -->
      <div class="content" v-html="newsinfo.content"></div>

      <!-- 评论区域 -->
      <comment-box :id="this.id"></comment-box>
    </div>
  </div>
  
</template>

<script>
// 1. 导入 评论子组件
import comment from '../subcomponents/comment.vue'
import navbar from '../subcomponents/navBar.vue'

export default {
  data() {
    return {
      id: this.$route.params.id, // 将 url 地址中传递过来的 Id 值，挂载到 data 上，方便以后调用
      newsinfo: {
        id: 1,
        title: 'iPhone9基本敲定，售价让果粉不淡定了',
        click: 2,
        add_time: new Date(),
        content: '<p>每年的九月是苹果发布新产品一贯的做法，而根据此前基本确定的消息，还有不到一个月的时间苹果就将召开发布会了，目前官方也已经进入了紧张的准备阶段。按照苹果官方给予的回复说明，苹果对于产品品控精益求精，每一款手机里里外外都会精细打磨测试！</p><div class="pgc-img"><p style="width: 100%; min-height: 195.188px;"><img src="https://p3.pstatp.com/large/pgc-image/15350687155858cec30fe01" alt="iPhone9基本敲定，售价让果粉不淡定了"></p></div><p>iPhoneX刚发布时，其刘海屏和昂贵的价格就遭到广大网友的吐槽。iPhoneX不止价格高，维修费用也高。 这次发布会将会发布三款新iPhone，而且最受人关注的无非是那一部廉价版iPhone，而那部廉价版iPhone， 在发布会之前就吸引了大部分人的眼光。</p>'
      }  // 新闻对象
    }
  },
  created() {
    // this.getNewsInfo()
  },
  methods: {
    getNewsInfo() { // 获取新闻详情
      this.$http.get('api/getnew/' + this.id).then(result => {
        if (result.body.status === 0) {
          this.newsinfo = result.body.message[0]
        } else {
          Toast('获取新闻失败!')
        }
      })
    }
  },
  components: { // 用来注册子组件的节点
    'comment-box': comment,
    'nav-bar': navbar
  }
}
</script>

<style lang="scss">
.newsinfo-container {
  padding: 0 14px;
  .title {
    font-size: 22px;
    line-height: 1.36;
    margin: 15px 0;
    color: #222;
  }
  .subtitle {
    font-size: 12px;
    color: #999;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
    }
    p {
      font-size: 18px;
      line-height: 1.76;
      word-wrap: break-word;
      color: #222;
      text-align: justify;
    }
  }
}
</style>
