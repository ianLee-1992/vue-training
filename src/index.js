// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 导入格式化时间插件
import moment from 'moment'
// 定义全局的过滤器(时间格式化)
Vue.filter('dateFormat', (dataStr, pattern="YYYY-MM-DD HH:mm:ss") => {
  return moment(dataStr).format(pattern)
})

// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)
// 设置请求的根路径
// Vue.http.options.root = 'http://'

// 导入  MUI 的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需导入 Mint-UI 中的组件
import { Header, Swipe, SwipeItem, Button } from 'mint-ui';
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)

// 导入自己的 router.js 路由模块
import router from './router'

// 导入 App 根组件
import app from './App.vue'

const vm = new Vue({
  el: '#app',
  render: h => h(app),
  router  // 挂载路由对象到 VM 实例上
})