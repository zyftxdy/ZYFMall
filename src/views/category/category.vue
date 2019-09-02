<template>
   <div id="category">
      <nav-bar class="category-bar"><div slot="center">商品分类</div></nav-bar>
      <div class="contents">
         <category-menu :menu="categories" @selectItem="selectItem"/>
         <tab-control 
            :title="['综合', '新品', '销量']" 
            ref="tabControl1"
            class="tab-control1"
            @itemClick="tabClick"
            v-show="isTabFixed"
         />
         <scroll 
            id="tab-content"
            ref="scroll"
            @scroll="contentScroll"
            :probeType="3"
            :pullUpLoad="true"
            >
            <div>
               <category-tab-content :subcategories="showSubcategory"/>
               <tab-control 
                  :title="['综合', '新品', '销量']" 
                  ref="tabControl2"
                  class="tab-control2"
                  @itemClick="tabClick"
               />
               <goods-list :goods="showCategoryDetail"/>
            </div>
         </scroll>
         <back-top class="back-top" @backTop="backTop" v-show="isShowBackTop">
            <img src="~assets/img/common/top.png" alt="">
         </back-top>
      </div>
   </div>
</template>

<script>

import CategoryMenu from './childComps/CategoryMenu'
import CategoryTabContent from './childComps/CategoryTabContent'

import goodsList from 'components/content/goods/goodsList'
import tabControl from 'components/content/tabControl/tabControl'
import navBar from 'components/common/navBar/navBar'
import Scroll from 'components/common/Scroll/scroll'
import backTop from 'components/content/backTop/backTop'

import {getCategory,getSubcategory,getCategoryDetail} from '../../network/category'
import {itemLitener} from '../../common/mixin'
export default {
   name:"category",
   components:{
      CategoryMenu,
      CategoryTabContent,
      goodsList,
      tabControl,
      navBar,
      Scroll,
      backTop
   },
   mixins:[itemLitener],
   data(){
      return {
         categories:[],
         categoryData: {},
         currentIndex: -1,
         currentType:'pop',
         tabOffsetTop:0,
         isTabFixed:false,
         isShowBackTop:false
      }
   },
   computed: {
		showSubcategory() {
		   if (this.currentIndex === -1) return {}
         return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
		   if (this.currentIndex === -1) return []
		   return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },  
   created(){
     this.getCategoryMenu()
   },
   mounted(){},
   updated(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      this.$refs.scroll.refresh()
   },
   methods:{
      tabClick(index) {
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
         //1.决定更多商品导航栏是否吸顶
         this.isTabFixed = position.y < -this.tabOffsetTop
         //2.决定返回顶部是否显示
         this.isShowBackTop = (-position.y) >1000
      },
      //返回顶部
      backTop() {
        this.$refs.scroll.scrollTo(0, 0, 300)
      },
      //请求导航栏数据
      getCategoryMenu(){
         getCategory().then(res => {
            this.categories = res.data.category.list
            // 2.初始化每个类别的子数据
            for (let i = 0; i < this.categories.length; i++) {
               this.categoryData[i] = {
               subcategories: {},
               categoryDetail: {
                  'pop': [],
                  'new': [],
                  'sell': []
               }
               }
            }
            //请求正在流行数据
            this._getSubcategories(0)
         })
      },
      //请求分类数据
      _getSubcategories(index){
         this.currentIndex = index;
         const mailKey = this.categories[index].maitKey;
         getSubcategory(mailKey).then( res => {
            this.categoryData[index].subcategories = res.data
            this.categoryData = {...this.categoryData}
            this._getCategoryDetail('pop')
            this._getCategoryDetail('new')
            this._getCategoryDetail('sell')
         })
      },
      //请求分类详情数据
      _getCategoryDetail(type) {
		   // 1.获取请求的miniWallkey
         const miniWallkey = this.categories[this.currentIndex].miniWallkey;
         // 2.发送请求,传入miniWallkey和type
		   getCategoryDetail(miniWallkey, type).then(res => {
            // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
            this.categoryData = {...this.categoryData}
        })
      },
      //子组件导航栏点击事件传回
      selectItem(index) {
        this._getSubcategories(index)
      }
   }
}
</script>

<style scoped>
   .category-bar{
        background-color: var(--color-tint);
        font-weight: 700;
        color: #fff;
   }
   .contents{
      position: absolute;
      top: 44px;
      bottom: 49px;
      left: 0;
      right: 0;
      overflow: hidden;
      display: flex;  
   }
   #tab-content {
      height: 100%;
      flex: 1;
      position: absolute;
      left: 100px;
      right: 0;
   }
   .tab-control1{
      z-index: 9;
      flex: 1;
   }
   .tab-control2{
      margin-top: 10px;
   }
   .back-top {
      position: fixed;
      right: 10px;
      bottom: 60px;
    }
</style>