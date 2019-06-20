// 使用状态管理--Vuex
// 1. npm install Vuex -S
// 2.导入Vuex; import Vuex from 'vuex;
// 3.注册到Vue身上 Vue.use('Vuex)
// 4.创建仓储对象 const store = new Vuex.store({})
// 5.把仓储对象挂载到 vm实例 对象身上

import Vue from 'vue';

import Vuex from 'vuex';
Vue.use(Vuex);

// 在执行这个组件的时候,就先判断本地存储里边有没有数据，有的话，把字符串类型的数据转换为对象，如果没有，就给空数组，最后把数据赋给store的cart中；
let lsCart = JSON.parse(localStorage.getItem('cart') || "[]")

const store = new Vuex.Store({
    state: {//访问方式：this.$store.state
        cart: lsCart
    },
    mutations: {//mutations中的方法调用方法：this.$store.commit("需要调用的方法名")



        // 通过mutations里的这个方法，来处理state数据，
        // mutations里的函数方法，第一个参数必须是state，它就是store里的state成员，如果该方法
        // 需要有自己的参数，那么这个参数只能放到第二位，mutations中的定义方法，最多放2个参数
        addToCart(state, goods) {
            var flag = false;
            // 点击添加购物车的代码逻辑
            // 1.如果购物车中没有该商品，直接push进去
            // 2.如果购物车中已经有了该商品，只需要修改这个商品的数量就OK了
            state.cart.some((item) => {
                if (goods.id == item.id) {
                    // 这里的count是从input文本框中拿的值，是字符串型，所以转换一下
                    item.count += parseInt(goods.count);
                    flag = true;//如果这个成立，把标识改成true,表示找到相同项了
                    return true
                }
            })
            // 如果购物车里没有要添加的商品，则直接push进去
            if (!flag) {
                state.cart.push(goods)
            }
            // 每次仓储发生改变，都要把数据持久化到localStorage中
            // localStorage是以键值对 key:value形式来存储数据的，
            // 而且value值必须是string
            localStorage.setItem("cart", JSON.stringify(state.cart))
        },
        // 删除购物车商品
        removeGoods(state, goodsId) {
            //1. 遍历state.cart数组，如果有id==goodsId的对象，就把这个对象删除了
            state.cart = state.cart.filter(item => {
                return item.id != goodsId
            })
            // 2.把state.cart中的数据，持久化到localStorage中
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        // 实现在购物车中，修改购买商品的个数，要把总金额同步变化
        // 1.在store.js中，提供一个修改仓储数据的方法
        // 2.让numberbox点击修改购买个数的时候，调用此方法
        updateStore(state, goodsInfo) {
            state.cart.some((item) => {
                if (item.id == goodsInfo.id) {
                    item.count = goodsInfo.count
                }
            })
            // 修改完后，要更新到本地存储
            if (state.cart.length > 0) {
                localStorage.setItem('cart', JSON.stringify(state.cart))
            }
        }
    },
    // getters可以理解为computed计算属性（只要被计算的属性，一发生变化，就会触发实时更新）
    getters: {//这里的方法成员访问方式：this.$route.getters.getTotalCount
        // 实现购买数量发生变化，则立即触发购物车图标右上角数量变化（此函数功能在app.vue中的购物车组件调用）
        getTotalCount(state) {
            // 获取仓储中cart中所有商品数量的总和
            var total = 0;
            state.cart.forEach((item) => {
                total += item.count
            })
            return total
        },
        getTotalPrice(state) {
            let total = 0;
            state.cart.forEach((item) => {
                total += item.price * item.count
            })
            return total
        }
    }
})

export default store;