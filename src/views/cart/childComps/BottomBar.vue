<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" @checkBtnClick="checkBtnClick" v-model="isSelectAll"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: <span class="high-price">¥{{totalPrice}}</span></span>
    <span class="buy-product">结算({{totalCount}})</span>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'

	export default {
		name: "BottomBar",
    components: {
		  CheckButton
    },
    computed: {
		  totalPrice() {
        const cartList = this.$store.getters.cartList;
        return cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0).toFixed(2)
      },
      isSelectAll: function () {
        return this.$store.getters.cartList.find(item => item.checked === false) === undefined;
      },
      totalCount() {
        const cartList = this.$store.getters.cartList;
        return cartList.filter(item => item.checked).length
      }
    },
    methods: {
      checkBtnClick: function () {
        // 1.判断是否有未选中的按钮
        let isSelectAll = this.$store.getters.cartList.find(item => !item.checked);

        // 2.有未选中的内容, 则全部选中
        if (isSelectAll) {
          this.$store.state.cartList.forEach(item => {
            item.checked = true;
          });
        } else {
          this.$store.state.cartList.forEach(item => {
            item.checked = false;
          });
        }
      }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 50px;
    background-color: #fff;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .05);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 30px;
    font-size: 15px;
    color: #666;
  }
  .high-price{
    color: rgb(255, 51, 0);
  }
  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 90px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    float: right;
    border-radius: 30px;
    right: 15px;
    top:5px;
    position: relative;
    overflow: hidden;
  }
</style>
