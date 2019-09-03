<template>
   <div id="cart">
      <nav-bar  class="cart-bar"><div slot="center">购物车({{cartCount}})</div></nav-bar>
      <cart-list :list="cartList" class="cart-list"></cart-list>
      <bottom-bar></bottom-bar>
  </div>
</template>

<script>
   import cartList from './childComps/cartList'
   import BottomBar from './childComps/BottomBar'

   import navBar from 'components/common/navBar/navBar'

   import { mapGetters } from 'vuex'

   export default {
      name:"cart",
      components:{
         navBar,
         BottomBar,
         cartList
      },
      computed: {
         //辅助函数
		  ...mapGetters(['cartList','cartCount'])
    }  
   }
</script>

<style scoped>
   #cart{
      height: 100vh;
   }
   .cart-bar{
      background-color: var(--color-tint);
      font-weight: 700;
      color: #fff;
   }
   .cart-list{
      position: absolute;
      top: 44px;
      bottom: 49px;
      left: 0;
      right: 0;
      overflow: hidden;
   }
</style>