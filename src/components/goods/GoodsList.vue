<template>
  <div class="goods-list">

    <div class="goods-item">
      <img src="../../images/mac.jpg" alt="macbook pro 2018">
      <h1 class="title">苹果（Apple） 2018新款MacBook Pro 15.4英寸苹果笔记本电脑 2017款 灰色/256G MR932CH/A 2018款 Multi-Touch Bar</h1>
      <div class="info">
        <p class="price">
          <span class="now">¥17238.00</span>
          <span class="old">¥17288.00</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩66件</span>
        </p>
      </div>
    </div>
    <div class="goods-item">
      <img src="../../images/mac.jpg" alt="macbook pro 2018">
      <h1 class="title">苹果（Apple） 2018新款MacBook Pro 15.4英寸苹果笔记本电脑 2017款 灰色/256G MR932CH/A 2018款 Multi-Touch Bar</h1>
      <div class="info">
        <p class="price">
          <span class="now">¥17238.00</span>
          <span class="old">¥17288.00</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩66件</span>
        </p>
      </div>
    </div>
    <div class="goods-item">
      <img src="../../images/mac.jpg" alt="macbook pro 2018">
      <h1 class="title">苹果（Apple） 2018新款MacBook Pro 15.4英寸苹果笔记本电脑 2017款 灰色/256G MR932CH/A 2018款 Multi-Touch Bar</h1>
      <div class="info">
        <p class="price">
          <span class="now">¥17238.00</span>
          <span class="old">¥17288.00</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩66件</span>
        </p>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  
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
