<template>
  <div class="goodsinfo-container">

    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    
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
          <p>购买数量: <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
            <!-- 分析: 如何实现加入购物车时候, 拿到 选择的数量 -->
            <!-- 1. 按钮属于 goodsinfo 页面, 数字 属于 numberbox 组件 -->
            <!-- 2. 由于涉及到了父子组件的嵌套了, 所以无法直接在 goodsinfo 页面中获取到 选中的商品数量值 -->
            <!-- 3. 涉及到了 子组件向父组件传值(事件调用机制) -->
            <!-- 4. 事件调用本质: 父向子传递方法, 子调用这个方法, 同时把数据当作参数,传递给这个方法 -->
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
      ballFlag: false,  // 控制小球隐藏和显示的标识符
      selectedCount: 1, // 保存用户选中的商品数量(默认选中购买1个)
      goodsinfo: {  // 获取到的商品的信息
        id: 38,
        title: '苹果（Apple） 2018新款MacBook Pro 15.4英寸苹果笔记本电脑 2017款 灰色/256G MR932CH/A 2018款 Multi-Touch Bar',
        add_time: '2022-02-04T12:12:12.000Z',
        goods_no: 'MR942CH/A',
        stock_quantity: 66,
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
    addToShopCar() {
      // 添加到购物车
      this.ballFlag = !this.ballFlag
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)"
    },
    enter(el, done) {
      el.offsetWidth

      // 小球动画优化思路：
      // 1. 先分析导致 动画不准确的本质原因: 我们把小球最终位移到的位置,已经局限在了某一分辨率下的,滚动条未滚动的情况下;
      // 2. 只要分辨率和测试的时候不一样,或者滚动条有一定的滚动距离之后,问题就出现了;
      // 3. 因此,我们经过分析,得到结论: 不能把位移的横纵坐标写死,而是应该根据不同情况,动态计算这个坐标值
      // 4. 经过分析,思路: 先得到 徽标的横纵坐标, 再得到小球的横纵坐标, 然后 让 y 值求差, x 值也求差, 得到的结果, 就横纵坐标要位移的距离
      // 5. 如何 获取 徽标和小球的位置? domObject.getBoundingClientRect()

      // 获取小球 在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect()
      // 获取徽标 在页面中的位置
      const badgePosition = document.querySelector('#badge').getBoundingClientRect()

      const xDist = badgePosition.left - ballPosition.left
      const yDist = badgePosition.top - ballPosition.top

      el.style.transform = `translate(${xDist}px, ${yDist}px)`
      el.style.transition = "all .5s cubic-bezier(.4, -0.3, 1, .68)"
      done()
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag
    },
    getSelectedCount(count) {
      // 当子组件把 选中的数量传递给父组件的时候, 把选中的值保存到 data 上
      this.selectedCount = count
      console.log('父组件拿到的数量值为: ' + this.selectedCount);
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

  .ball {
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #f23030;
    z-index: 99;
    top: 28rem;
    left: 9rem;
  }
}
</style>
