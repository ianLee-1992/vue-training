<template>
  <div class="goodsinfo-container">
    
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价: <span><del>¥{{ goodsinfo.market_price }}.00</del></span>
            销售价: <span class="now_price">¥{{ goodsinfo.sell_price }}.00</span>
          </p>
          <p>购买数量: <numbox></numbox></p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号: {{ goodsinfo.goods_no }}</p>
          <p>库存情况: {{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间: {{ goodsinfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>

  </div>
</template>

<script>
// 导入轮播图组件
import swiper from '../subcomponents/swiper.vue'
// 导入数字选择框组件
import numbox from '../subcomponents/goodsinfo_numbox.vue'

export default {
  data() {
    return {
      id: this.$route.params.id,  // 将路由参数对象中的 id 挂载到 data上，方便调用
      lunbotu: [ // 轮播图的数据
        {
          src: 'src/images/mac.jpg'
        },
        {
          src: 'src/images/mac1.jpg'
        }
      ],
      goodsinfo: {  // 获取到的商品的信息
        id: 38,
        title: '苹果（Apple） 2018新款MacBook Pro 15.4英寸苹果笔记本电脑 2017款 灰色/256G MR932CH/A 2018款 Multi-Touch Bar',
        add_time: '2022-02-04T12:12:12.000Z',
        goods_no: 'MR942CH/A',
        stock_quantity: 666,
        market_price: 17288,
        sell_price: 17238
      }
    }
  },
  created() {
    // this.getLunbotu()
    // this.getGoodsInfo()
    this.getLunbotuLocal()
  },
  methods: {
    getLunbotu() {
      this.$http
        .get('api/getthumimages/' + this.id)
        .then(result => {
          if (result.body.status === 0) {
            // 先循环轮播图数组的每一项，为 item 添加 img 属性，因为轮播图组件中，只认识 item.img
            result.body.message.forEach(item => {
              item.img =  item.src
            })
            this.lunbotu = result.body.message
          }
        })
    },
    getGoodsInfo() {
      // 获取商品的信息
      this.$http
        .get('api/goods/getinfo/' + this.id)
        .then(result => {
          if (result.body.status === 0) {
            this.goodsinfo = result.body.message[0]
          }
        })
    },
    goDesc(id) {
      // 点击使用编程式导航跳转至 图文介绍页面
      this.$router.push({ name: 'goodsdesc', params: { id } })
    },
    goComment(id) {
      // 点击跳转至 商品评论页面
      this.$router.push({ name: 'goodscomment', params: { id } })
    },
    getLunbotuLocal() {
      this.lunbotu.forEach(item => {
        item.img = item.src
      })
    }
  },
  components: {
    swiper,
    numbox
  }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #f8f8f8;
  overflow: hidden;

  .now_price {
    color: #f23030;
    font-size: 16px;
    font-weight: 700;
  }
  
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
}
</style>
