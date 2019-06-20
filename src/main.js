// 导入Vue
import Vue from 'vue';
// 导入 app.vue
import app from './app.vue'

// 导入MUI样式包
import './lib/mui/css/mui.css'
// 导入mui的扩展图标的样式文件
import './lib/mui/css/icons-extra.css'


// 导入路由 vue-router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 导入路由模块router.js
import router from './router.js'

// 导入Mint-UI 
import MintUI from 'mint-ui'
// 导入Mint-UI的样式
import 'mint-ui/lib/style.css'
// 把MintUI 挂载到Vue身上
Vue.use(MintUI);

// 导入axios 并挂载到Vue.prototype身上
// axios 不支持 Vue.use()这样
import axios from 'axios'
// 配置基础域名路径
axios.defaults.baseURL = "http://www.barteam.cn:8086"
// $ajax 这是起个名字
Vue.prototype.$axios = axios

// 导入moment时间过滤组件
import Moment from 'moment'

// 导入vue-preview插件
import VuePreview from 'vue-preview';

// 格式化日期的过滤器
Vue.filter('dateFormat', function (dateStr, pattern = 'YYYY-MM-DD HH:MM') {
    return Moment(dateStr).format(pattern)
})

// 把vue-preview注册到Vue身上
Vue.use(VuePreview)


// 导入Vuex仓储模块
import store from './store.js'


var vm = new Vue({
    el: "#app",
    render: function (c) {
        return c(app)
    },
    router: router,
    // 把仓储对象，挂载到vm实例对象身上
    store: store

})