<template>
  <div>
    
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item', item.id == 0 ? ' mui-active' : '']" v-for="item in cates" :key="item.id" @tap="getPhotoListByCateIdTest(item.id)">
            {{ item.title }}
          </a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h3 class="info-title">{{ item.title }}</h3>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>

  </div>
</template>

<script>
// 1. 导入 mui 的 js 文件
import mui from '../../lib/mui/js/mui.min.js'


export default {
  data() {
    return {
      cates: [  // 所有分类的列表数组
        {
          title: '全部',
          id: 0
        },
        {
          title: '家居生活',
          id: 14
        },
        {
          title: '摄影设计',
          id: 15
        },
        {
          title: '汽车资讯',
          id: 16
        },
        {
          title: '互联网科技',
          id: 17
        },
        {
          title: '体育新闻',
          id: 18
        },
        {
          title: '电影大片',
          id: 19
        },
        {
          title: '时尚娱乐',
          id: 20
        }
      ],
      list: [ // 图片列表的数组
        
      ]
    }
  },
  created() {
    // this.getAllCategory()
    // 默认进入页面，就主动请求 所有图片列表的数据
    // this.getPhotoListByCateId(0)
    this.getPhotoListByCateIdTest()
  },
  mounted() { 
    // 当组件中的 DOM 结构被渲染好并放到页面中后，会执行这个钩子函数
    // 如果要操作元素了，最好在 mounted 里面，因为，这时候的 DOM 元素 是最新的
    // 2. 初始化滑动控件
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    })
  },
  methods: {
    getAllCategory() {
      // 获取所有的图片分类
      this.$http.get('api/getimgcategory').then(result => {
        if (result.body.status === 0) {
          // 手动拼接出一个最完整的 分类列表
          result.body.message.unshift({ title: '全部', id: 0 })
          this.cates = result.body.message
        }
      })
    },
    getPhotoListByCateId(cateId) {
      // 根据分类 id 获取图片列表
      this.$http
        .get('api/getimages/' + cateId)
        .then(result => {
          if (result.body.status === 0) {
            this.list = result.body.message
          }
        })
    },
    getPhotoListByCateIdTest() {
      // 本地数据测试
      let list = [
        {
          id: 50,
          title: '那年、那些年',
          img_url: 'src/images/d4.jpg',
          zhaiyao: '空间再有限，生活也要有一定的仪式感，找到让人可以惬意的栖身之地。'
        },
        {
          id: 51,
          title: '那年我们...',
          img_url: 'src/images/d5.jpg',
          zhaiyao: '空间再有限，生活也要有一定的仪式感，找到让人可以惬意的栖身之地。'
        },
        {
          id: 52,
          title: '那年我们...',
          img_url: 'src/images/d6.jpg',
          zhaiyao: '空间再有限，生活也要有一定的仪式感，找到让人可以惬意的栖身之地。'
        },
        {
          id: 53,
          title: '那年我们...',
          img_url: 'src/images/d7.jpg',
          zhaiyao: '空间再有限，生活也要有一定的仪式感，找到让人可以惬意的栖身之地。'
        },
        {
          id: 54,
          title: '那年我们...',
          img_url: 'src/images/d8.jpg',
          zhaiyao: '空间再有限，生活也要有一定的仪式感，找到让人可以惬意的栖身之地。'
        },
        {
          id: 55,
          title: '那年我们...',
          img_url: 'src/images/d3.jpg',
          zhaiyao: '空间再有限，生活也要有一定的仪式感，找到让人可以惬意的栖身之地。'
        }
      ]
      this.list = list
      // console.log(this.list);
      
    }

  }
}
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px 10px 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy=loading] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
      color: #fff;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba($color: #000, $alpha: 0.4);
      max-height: 88px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 12px;
      }
    }
  }
}


</style>
