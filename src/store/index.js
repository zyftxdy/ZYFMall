import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        cartList:[]
    },
    mutations:{
        addCounter(state,payload){
            payload.count += 1
        },
        addToCart(state,payload){
            state.cartList.push(payload)
        }
    },
    actions:{
        addCart(context,payLoad){
            return new Promise((resolve,reject) => {
                //console.log(payLoad)
                const oldInfo = context.state.cartList.find(item => item.id === payLoad.id)
                if (oldInfo) {
                    context.commit('addCounter',oldInfo)
                    resolve('当前的商品+1')
                } else {
                    payLoad.count = 1
                    payLoad.checked = true
                    context.commit('addToCart',payLoad)
                    resolve('添加了新的商品')
                }
            })
        }
    },
    getters:{
        cartList(state) {
            return state.cartList
        },
        cartCount(state, getters) {
            return getters.cartList.length
        }
    }
})

export default store