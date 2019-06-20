// 导入vue-router包
import VueRouter from "vue-router"

// 导入tab 栏的五个子组件
import home from './components/tab/home.vue'
import classes from './components/tab/classes.vue'
import find from './components/tab/find.vue'
import cart from './components/tab/cart.vue'
import user from './components/tab/user.vue'

// 导入新闻列表组件和新闻详情信息组件
import newslist from './components/news/newslist.vue'
import newsinfo from './components/news/newsinfo.vue'

// 导入光影安师中图片的列表组件和图片详情组件
import imagelist from './components/photo/imagelist.vue'
import imageinfo from './components/photo/imageinfo.vue'

// 导入安师商城列表组件和商品详情
import goodslist from './components/shop/goodslist.vue'
import goodsinfo from './components/shop/goodsinfo.vue'


var router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: home
    },
    {
        path: '/classes',
        component: classes
    },
    {
        path: '/find',
        component: find
    },
    {
        path: '/cart',
        component: cart
    },
    {
        path: '/user',
        component: user
    },
    // 这里是安师新闻路由
    {
        path: '/home/newslist',
        component: newslist
    },
    {
        path: '/home/newsinfo/:id',
        component: newsinfo
    },
    // 这里是光影安师路由
    {
        path: '/home/imagelist',
        component: imagelist
    },
    {
        path: '/home/imageinfo/:id',
        component: imageinfo
    },
    // 这里是安师商城路由
    {
        path: '/home/goodslist',
        component: goodslist
    },
    {
        path: '/home/goodsinfo/:id',
        component: goodsinfo,
        name:"goodsinfo"
    }
    ],
    // 自定义类名
    linkActiveClass: 'mui-active'
})

// 把router 暴露出去
export default router; //当分离出来 router.js模块后，一定要把router路由规则暴露出去