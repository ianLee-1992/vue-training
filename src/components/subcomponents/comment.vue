<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="说说你的看法(最多吐槽60字)" maxlength="60" v-model="msg"></textarea>

    <mt-button type="primary" size="large" @click="postCommentTest">评论</mt-button>

    <div class="mui-card cmt-list" style="margin-bottom: 35px;">
      <ul class="mui-table-view cmt-item">
        <li class="mui-table-view-cell mui-media" v-for="item in comments" :key="item.key">
          <img class="mui-media-object mui-pull-right" src="src/images/Superman.png">
          <div class="mui-media-body cmt-title">
            用户:{{ item.username }}
            <p class='mui-ellipsis cmt-body'>{{ item.content === '' ? '它好像什么也没说' : item.content }}</p>
            发表时间: {{ item.add_time | dateFormat }}
          </div>
        </li>
      </ul>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui"

export default {
  data() {
    return {
      pageIndex: 1, // 默认展示第一页数据
      // comments: [], // 所以的评论数据
      comments: [
        // 此时测试静态数据 key属性只是为了 v-for的key值唯一
        {
          username: "匿名用户",
          add_time: new Date(),
          content: "势不可使尽，山水有相逢.",
          key: 1,
        },
        {
          username: "匿名用户",
          add_time: new Date(),
          content: "小猪佩琪闻在身，楼上都是社会人.",
          key: 2,
        },
        {
          username: "匿名用户",
          add_time: new Date(),
          content: "",
          key: 3,
        }
      ],
      msg: ''  // 评论输入的内容
    }
  },
  created() {
    // getComments()
  },
  methods: {
    getComments() { // 获取评论
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            // this.comments = result.body.message
            // 每当获取新评论数据的时候，不要把老数据清空覆盖，应该以老数据，拼接上新数据
            this.comments = this.comments.concat(result.body.message)
          } else {
            Toast("获取评论失败!")
          }
        })
    },
    getMore() { // 加载更多
      this.pageIndex++
      // this.getComments()
    },
    postComment() { // 发表评论到服务端方法
      // 校验是否为空内容
      if (this.msg.trim().length === 0) {
        return Toast('至少留下点什么吧...')
      }

      // 发表评论
      // 参数1：请求的 url 地址
      // 参数2：提交给服务器的数据对象 { conent: this.msg }
      // 参数3：定义提交时候，表单中数据的格式 { emulateJSON: true }
      this.$http
        .post('api/postcomment/' + this.$route.params.id, {
          content: this.msg.trim()
        })
        .then(result => {
          if (result.body.status === 0) {
            // 1. 拼接出一个评论对象
            let cmt = {
              user_name: '匿名用户',
              add_time: Date.now(),
              content: this.msg.trim()
            }
            this.comments.unshift(cmt)
            this.msg = ''
          }
        })
    },
    postCommentTest() { // 本地发表评论测试
      // 校验是否为空内容
      if (this.msg.trim().length === 0) {
        return Toast('至少留下点什么吧...')
      }
      let cmt = {
        username: '匿名用户',
        add_time: Date.now(),
        content: this.msg.trim(),
      }
      this.comments.unshift(cmt)
      console.log(this.comments);
      this.msg = ''
    }
  },
  props: ["id"]
}
</script>

<style lang="scss" scoped>
.cmt-container {
  margin-top: 1rem;
  h3 {
    text-align: center;
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
  }
  .cmt-list {
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 1.5rem;
      }
    }
  }
}
</style>
