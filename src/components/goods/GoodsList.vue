<template>
  <div class="goods-list">

    <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">
      <img :src="item.img_url" alt="macbook pro 2018">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">¥{{ item.sell_price }}.00</span>
          <span class="old">¥{{ item.market_price }}.00</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </router-link> -->

    <!-- 在网页中，有两种跳转方式： -->
    <!-- 方式1：使用 a 标签的形式 标签跳转 -->
    <!-- 方式2：使用 window.location.href 的形式，叫做 编程式导航 -->
    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url" alt="macbook pro 2018">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">¥{{ item.sell_price }}.00</span>
          <span class="old">¥{{ item.market_price }}.00</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>

    <mt-button type="danger" size="large" @click="getGoodsListLocal">加载更多</mt-button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      pageindex: 1, // 分页的页数
      goodslist: [  // 存放商品列表的数组
        {
          id: 36,
          title: '苹果（Apple） 2018新款MacBook Pro 15.4英寸苹果笔记本电脑 2017款 灰色/256G MR932CH/A 2018款 Multi-Touch Bar',
          add_time: Date.now(),
          zhaiyao: "",
          click: 0,
          img_url: 'src/images/mac.jpg',
          sell_price: '17238',
          market_price: '17288',
          stock_quantity: 666
        },
        {
          id: 37,
          title: '苹果（Apple） 2018新款MacBook Pro 15.4英寸苹果笔记本电脑 2017款 灰色/256G MR932CH/A 2018款 Multi-Touch Bar',
          add_time: Date.now(),
          zhaiyao: "",
          click: 0,
          img_url: 'src/images/mac.jpg',
          sell_price: '17238',
          market_price: '17288',
          stock_quantity: 666
        },
        {
          id: 38,
          title: '苹果（Apple） 2018新款MacBook Pro 15.4英寸苹果笔记本电脑 2017款 灰色/256G MR932CH/A 2018款 Multi-Touch Bar',
          add_time: Date.now(),
          zhaiyao: "",
          click: 0,
          img_url: 'src/images/mac.jpg',
          sell_price: '17238',
          market_price: '17288',
          stock_quantity: 666
        },
        {
          id: 39,
          title: '苹果（Apple） 2018新款MacBook Pro 15.4英寸苹果笔记本电脑 2017款 灰色/256G MR932CH/A 2018款 Multi-Touch Bar',
          add_time: Date.now(),
          zhaiyao: "",
          click: 0,
          img_url: 'src/images/mac.jpg',
          sell_price: '17238',
          market_price: '17288',
          stock_quantity: 666
        }
      ]
    }
  },
  created() {
    // this.getGoodsList()
  },
  methods: {
    getGoodsList() {
      // 获取商品列表
      this.$http
        .get('api/getgoods?pageindex=' + this.pageindex)
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = this.goodslist.concat(result.body.message)
          }
        })
    },
    getMore() {
      this.pageindex++
      this.getGoodsList()
    },
    goDetail(id) {
      // 使用 JS 的形式进行路由导航
      // 注意：一定要区分 this.$route 和 this.$router 这两个对象
      // 其中：前者是路由参数对象，所有路由中的参数，params query都属于它
      // 其中：后者是一个路由导航对象，用它可以方便的使用 JS 代码，实现路由前进、后退、跳转至新的URL
      // 1. 最简单的
      // this.$router.push('/home/goodsinfo/' + id)
      // 2. 传递对象
      // this.$router.push({ path: '/home/goodsinfo/' + id })
      // 3. 传递命名的路由
      this.$router.push({ name: 'goodsinfo', params: { id }})
    },
    getGoodsListLocal() { // 只用于本地模拟数据的方法
      this.pageindex++
      if (this.pageindex > 3) return
      let goodslist2 = [
        {
          id: Date.now(),
          title: '苹果（Apple） 2018新款MacBook Pro 15.4英寸苹果笔记本电脑 2017款 灰色/256G MR932CH/A 2018款 Multi-Touch Bar',
          add_time: Date.now(),
          zhaiyao: "",
          click: 0,
          img_url: 'src/images/mac.jpg',
          sell_price: '17238',
          market_price: '17288',
          stock_quantity: 666
        },
        {
          id: Date.now()+1,
          title: '苹果（Apple） 2018新款MacBook Pro 15.4英寸苹果笔记本电脑 2017款 灰色/256G MR932CH/A 2018款 Multi-Touch Bar',
          add_time: Date.now(),
          zhaiyao: "",
          click: 0,
          img_url: 'src/images/mac.jpg',
          sell_price: '17238',
          market_price: '17288',
          stock_quantity: 666
        }
      ]
      this.goodslist = this.goodslist.concat(goodslist2)
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-list {
  // background-color: #f8f8f8;
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;

  .goods-item {
    width: 49%;
    border: 1px solid #eee;
    box-shadow: 0 0 8px rgba(0,0,0,0.1);
    margin: 3px 0;
    padding: 0 2px 0;
    min-height: 290px;
    // display: flex;
    // flex-direction: column;
    // justify-content: space-between;
    
    img {
      width: 100%;
    }
    .title {
      font-size: 13px;
      padding: 0 5px;
      margin-top: 8px;
      color: #232326;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 36px;
      line-height: 18px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .info {
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now{
          color: #f23030;
          font-size: 15px;
          font-weight: 700;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
      }
    }
  }
}
</style>
