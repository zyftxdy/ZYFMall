<template>
  <div id="home">
      <nav-bar class="nav-bar"><div slot="center">购物啦</div></nav-bar>
      <scroll 
        class="content" 
        ref="scroll"
        @scroll="contentScroll"
        :probeType="3"
        :pullUpLoad="true"
        @pullingUp="loadMore"
      >
        <home-swiper :banners="banners"/>
        <recommend-view :recommends="recommends"/>
        <feature-view/>
        <tab-control class="tab-control" :title="['流行', '新款', '精选']" @itemClick="tabClick"/>
        <goods-list :goods="showGoodsList"></goods-list>
      </scroll>
      <back-top class="back-top" @backTop="backTop" v-show="isShowBackTop">
        <img src="~assets/img/common/top.png" alt="">
      </back-top>    
  </div>
</template>

<script>
//子组件
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
//公共组件
import navBar from 'components/common/navBar/navBar'
import tabControl from 'components/content/tabControl/tabControl'
import goodsList from 'components/content/goods/goodsList'
import Scroll from 'components/common/Scroll/scroll'
import backTop from 'components/content/backTop/backTop'

import {getHomeMultidata,getHomeGoods} from 'network/home'

export default {
    name:"Home",
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      navBar,
      tabControl,
      goodsList,
      Scroll,
      backTop
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        currentType: 'pop',
        isShowBackTop:false
      }
    },
    created(){
      console.log('Home 创建'),
      //1.请求多个数据
      this.getMultidata(),
      //2.请求商品数据
      this.getGoods('pop')
      this.getGoods('new')
      this.getGoods('sell')  
    },
    mounted(){
      const refresh = this.debounce(this.$refs.scroll.refresh,200)
      //3.监听item中图片加载完成
      this.$bus.$on('itemImageLoad',() => {
        refresh()
      })
    },
    computed:{
      showGoodsList() {
		    return this.goods[this.currentType].list
      }      
    },
    methods:{
      //防抖
      debounce(func,delay){
        let timer = null 
        return function(...args){
          if(timer) clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this,args)
          },delay)
        }
      },
      /**
       * 事件监听
       */
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      contentScroll(position){
        this.isShowBackTop = (-position.y) >1000
      },
      loadMore(){
        this.getGoods(this.currentType)
      },
      backTop() {
        this.$refs.scroll.scrollTo(0, 0, 300)
      },
      //网络请求
      getMultidata(){
        getHomeMultidata().then(res =>{
        //console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
      },
      getGoods(type){
        const pages = this.goods[type].page + 1;
        getHomeGoods(type,pages).then(res =>{
          console.log(res);
          const goodList = res.data.list;
          this.goods[type].list.push(...goodList);
          this.goods[type].page += 1;
          this.$refs.scroll.finishPullUp()
        })
      }
    }
}
</script>

<style scoped>
    #home{
      padding-top: 44px;
      padding-bottom: 49px;
    }
    .nav-bar {
        background-color: var(--color-tint);
        font-weight: 700;
        color: #fff;
    }
    .tab-control{
      position: sticky;
      top: 44px;
      z-index: 9;
    }
    .content{
      position: absolute;
      top: 44px;
      bottom: 49px;
      left: 0;
      right: 0;
      overflow: hidden;
    }
    .back-top {
      position: fixed;
      right: 10px;
      bottom: 60px;
    }
</style>