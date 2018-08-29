<template>
  <div>
    <!-- 顶部子组件区域 -->
    <nav-bar title="新闻列表"></nav-bar>

    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <router-link :to="'/home/newsinfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p class='mui-ellipsis'>
              <span>发表时间: {{ item.add_time | dateFormat }}</span>
              <span>点击: {{ item.click }}次</span>
            </p>
          </div>
        </router-link>
      </li>
      
    </ul>
  </div>
</template>

<script>
// 1. 导入 顶部返回子组件
import navbar from '../subcomponents/navBar.vue'
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      newslist: [],  // 新闻列表
      newslist: [{  // 测试用数据
        id: 1,
        title: '啦啦啦',
        add_time: Date.now(),
        click: '10',
        img_url: 'src/images/twitter.png'
      },
      {
        id: 2,
        title: '有个超能力的梦',
        add_time: Date.now(),
        click: '10',
        img_url: 'src/images/Superman.png'
      },
      {
        id: 3,
        title: '吼吼吼',
        add_time: Date.now(),
        click: '10',
        img_url: 'src/images/twitter.png'
      }]
    }
  },
  created() {
    // this.getNewsList()
  },
  methods: {
    getNewsList() { // 获取新闻列表
      this.$http.get('api/getnewslist').then(result => {
        if (result.body.status === 0) {
          // 如果没有失败，应该把数据保存到 data 上
          this.newslist = result.body.message
        } else {
          Toast('获取新闻列表失败!')
        }
      })
    }
  },
  components: { // 用来注册子组件的节点
    'nav-bar': navbar
  }
};
</script>

<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #333;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
