<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
            <mt-switch 
              v-model="$store.getters.getGoodsSelected[item.id]"  
              @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path">
            <div class="info">
              <h3>{{ item.title }}</h3>
              <p>
                <span class="price">¥{{ item.sell_price }}.00</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <!-- 问题: 如何从购物车中获取商品的数量 -->
                <!-- 1. 可以先创建一个空对象, 然后循环购物车中所有商品的数据, 把当前循环这条商品的id,作为对象的属性名, count值作为对象的属性值, 这样,当把所有的商品循环一遍, 就会得到一个对象: { 36: 6, 38: 2, 40: 1} -->
                <a href="javascript:;" @click.prevent="remove(item.id, i)">删除</a>
              </p>
            </div>
					</div>
				</div>
			</div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计(不含运费)</p>
            <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }} </span>件，总价 <span class="red">¥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>

    <p>{{ $store.getters.getGoodsSelected }}</p>
    
  </div>
</template>

<script>
import numbox from '../subcomponents/shopecar_numbox.vue'

export default {
  data() {
    return {
      goodslist: []  // 购物车中所有商品的数据
    }
  },
  created() {
    // this.getGoodsList()
    this.getGoodsListLocal()
  },
  methods: {
    getGoodsList() {
      // 1. 获取到 store 中所以的商品的 id, 然后拼接出一个用逗号分隔的字符串
      let idArr = []
      this.$store.state.car.forEach(item => {
        idArr.push(item.id)
      })
      // 如果购物车中没有商品, 则直接返回, 不需要请求数据接口, 否则会报错
      if (idArr.length <= 0) return
      // 获取购物车商品列表
      this.$http
        .get('api/goods/getshopcarlist/' + idArr.join(','))
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = result.body.message
          }
        })
    },
    getGoodsListLocal() {
      let goodslistlocal = [
        {
          cou: 1,
          id: 36,
          title: '苹果（Apple） 2018新款MacBook Pro 15.4英寸',
          sell_price: 17238,
          thumb_path: 'src/images/mac.jpg'
        },
        {
          cou: 1,
          id: 37,
          title: '苹果（Apple） 2018新款MacBook Pro 15.4英寸',
          sell_price: 17238,
          thumb_path: 'src/images/mac.jpg'
        },
        {
          cou: 1,
          id: 38,
          title: '苹果（Apple） 2018新款MacBook Pro 15.4英寸',
          sell_price: 17238,
          thumb_path: 'src/images/mac.jpg'
        }
      ]
      this.goodslist = goodslistlocal
    },
    remove(id, index) {
      // 点击删除, 把商品从 store 中根据传递的 id 删除, 同时, 把当前组件中的 goodslist 中, 对应要删除的那个商品, 使用 index 来删除
      this.goodslist.splice(index, 1)
      this.$store.commit('removeFormCar', id)
    },
    selectedChanged(id, val) {
      // 每当点击开关，把最新的开关状态，同步到 store 中
      // console.log(id + "---" + val);
      this.$store.commit('updateGoodsSelected', { id, selected: val })
    }
  },
  components: {
    numbox
  }
}
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #f8f8f8;
  overflow: hidden;

  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 50px;
      height: 50px;
    }
    h3 {
      font-size: 13px;
      // margin: .67em 0;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: #f23030;
        font-weight: 700;
      }
    }
  }

  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: #f23030;
      font-weight: 700;
      font-size: 16px;
    }
  }
}
</style>
