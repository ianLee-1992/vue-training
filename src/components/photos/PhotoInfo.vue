<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间: {{ photoinfo.add_time | dateFormat }}</span>
      <span>点击: {{ photoinfo.click }}次</span>
    </p>

    <hr>

    <!-- 缩略图区域 -->
    <vue-preview :slides="slide1" @close="handleClose" class="thumbs"></vue-preview>

    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 放置一个现成的评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'

export default {
  data() {
    return {
      id: this.$route.params.id,  // 从路由中获取到的 图片id
      // photoinfo: {}, // 图片详情
      photoinfo: {  // 本地数据测试
        id: 36,
        title: '那年、那些年',
        click: 3,
        add_time: Date.now(),
        content: '空间再有限，生活也要有一定的仪式感，找到让人可以惬意的栖身之地。'
      },
      slide1: [
        {
          src: 'src/images/d5.jpg',
          msrc: 'src/images/d1.jpg',
          alt: 'picture1',
          title: 'Image Caption 1',
          w: 600,
          h: 400
        },
        {
          src: 'src/images/d6.jpg',
          msrc: 'src/images/d1.jpg',
          alt: 'picture2',
          title: 'Image Caption 2',
          w: 600,
          h: 400
        },
        {
          src: 'src/images/d7.jpg',
          msrc: 'src/images/d1.jpg',
          alt: 'picture2',
          title: 'Image Caption 3',
          w: 600,
          h: 400
        },
        {
          src: 'src/images/d4.jpg',
          msrc: 'src/images/d2.jpg',
          alt: 'picture2',
          title: 'Image Caption 3',
          w: 600,
          h: 400
        },
        {
          src: 'src/images/d3.jpg',
          msrc: 'src/images/d2.jpg',
          alt: 'picture2',
          title: 'Image Caption 3',
          w: 600,
          h: 400
        },
        {
          src: 'src/images/d8.jpg',
          msrc: 'src/images/d2.jpg',
          alt: 'picture2',
          title: 'Image Caption 3',
          w: 600,
          h: 400
        }
      ]
    }
  },
  created() {
    // this.getPhotoInfo()
    // this.getThumbs()
  },
  methods: {
    getPhotoInfo() {
      // 获取图片的详情
      this.$http
        .get('api/getimageInfo/' + this.id)
        .then(result => {
          if (result.body.status === 0) {
            this.photoinfo = result.body.message[0]
          }
        })
    },
    getThumbs() {
      // 获取缩略图
      this.$http
        .get('api/getthumimages/' + this.id)
        .then(result => {
          if (result.body.status === 0) {
            // 循环每个图片数据,补全图片的宽高
            result.body.message.forEach(item => {
              item.w = 600
              item.h = 400
            });
            // 把完整的数据保存到 slidelist 中
            this.slide1 = result.body.message
          }
        })
    },
    handleClose () {  // 缩略图关闭函数
      console.log('close event')
    }
  },
  components: { // 注册 评论子组件
    'cmt-box': comment
  }
}
</script>

<style lang="scss" >
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #222;
    font-size: 22px;
    // text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }

  .content {
    font-size: 16px;
    line-height: 1.76;
    word-wrap: break-word;
    color: #222;
    text-align: justify;
  }
  .thumbs {
    figure {
      display: inline-block;
      margin: 10px;
      img {
        box-shadow: 0 0 8px #999;
      }
    }
  }
}
</style>
