<template>
    <div id="details">
        <details-nav-bar class="details-bar" @itemClick="titleClick" :current-index="currentIndex"/>
        <scroll 
        class="content" 
        ref="scroll"
        :probeType="3"
        :pullUpLoad="true"
        @scroll="contentScroll"
        @pullingUp="loadMore"
        >
            <details-swiper ref="base" :images="topImages" />
            <details-base-info :goods="goods"/>
            <details-shop-info :shop="shop" />
            <details-goods-info :detailInfo="detailsInfo" @imageLoad="imageLoad"/>
            <details-param-info ref="param" :paramInfo="goodsParam" />
            <details-comment-info ref="comment" :commentInfo="commentInfo" />
            <DetailsReCommentInfo ref="recommend" :goods='recommendList'/>
        </scroll>
        <details-bottom-bar @addToCart="addToCart"/>
        <back-top class="back-top" @backTop="backTop" v-show="isShowBackTop">
            <img src="~assets/img/common/top.png" alt="">
        </back-top>
    </div>
</template>

<script>
    import DetailsNavBar from './childComps/DetailsNavBar'
    import DetailsSwiper from './childComps/DetailSwiper'
    import DetailsBaseInfo from './childComps/DetailsBaseInfo'
    import DetailsShopInfo from './childComps/DetailsShopInfo'
    import DetailsGoodsInfo from './childComps/DetailsGoodsInfo'
    import DetailsParamInfo from './childComps/DetailsParamInfo'
    import DetailsCommentInfo from './childComps/DetailsCommentInfo'
    import DetailsReCommentInfo from './childComps/DetailsReCommendInfo'
    import DetailsBottomBar from './childComps/DetailsBottomBar'

    import backTop from 'components/content/backTop/backTop'
    import Scroll from 'components/common/Scroll/scroll'

    import {getDetails,getRecommend,GoodsInfo,Shop,GoodsParam} from '../../network/details' 
    import {itemLitener} from '../../common/mixin'

    export default {
        name:'Details',
        components:{
          DetailsNavBar,
          DetailsSwiper,
          DetailsBaseInfo,
          DetailsShopInfo,
          DetailsGoodsInfo,
          DetailsParamInfo,
          DetailsCommentInfo,
          DetailsReCommentInfo,
          DetailsBottomBar,
          Scroll,
          backTop
        },
        mixins:[itemLitener],
        data(){
            return{
                id:null,
                topImages:[],
                goods:{},
                shop:{},
                detailsInfo:{},
                goodsParam:{},
                commentInfo:{},
                recommendList:[],
                isShowBackTop:false,
                themeTopYs:[],
                currentIndex:0
            }
        },
        created(){
            this.id = this.$route.query.id;
            this.getProductDeatils(this.id),
            this.getComment()
        },
        mounted(){
        },
        destroyed(){
            //2.取消全局事件的监听
            this.$bus.$off('itemImageLoad',this.itemListener)
        },
        updated(){
            this._getOffsetTops()
            //console.log(this.themeTopYs)
        },
        methods:{
            //得到距离顶部的值
            _getOffsetTops() {
                this.themeTopYs = []
                this.themeTopYs.push(0)
                this.themeTopYs.push(this.$refs.param.$el.offsetTop)
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                this.themeTopYs.push(Number.MAX_VALUE)
            },
            imageLoad(){  
                this.newRefresh();
                this._getOffsetTops()
            },
            contentScroll(position){
                //2.决定backTop是否显示
                this.isShowBackTop = (-position.y) > 1000;
                this._listenScrollTheme(-position.y)
            },
            _listenScrollTheme(position) {
                let length = this.themeTopYs.length;
                for (let i = 0; i < length; i++) {
                    let iPos = this.themeTopYs[i];
                    if (position >= iPos && position < this.themeTopYs[i+1]) {
                        if (this.currentIndex !== i) {
                            this.currentIndex = i;
                        }
                        break;
                    }
                }
            },
            //加载更多
            loadMore(){
                this.getComment();
            },
            //回到顶部
            backTop() {
                this.$refs.scroll.scrollTo(0, 0, 300)
            },
            //获取商品数据
            getProductDeatils(id){
                getDetails(id).then(res => {
                    //console.log(res);
                    //1.获取数据
                    const data = res.result;
                    //2.轮播图数据
                    this.topImages = data.itemInfo.topImages;
                    //3.商品数据
                    this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services);
                    //4.店铺数据
                    this.shop = new Shop(data.shopInfo);
                    //5.商品详情
                    this.detailsInfo = data.detailInfo;
                    //6.商品参数
                    this.goodsParam = new GoodsParam(data.itemParams.info,data.itemParams.rule);
                    //7.评论数据
                    if(data.rate.cRate !== 0){
                        this.commentInfo = data.rate.list[0];
                    }
                })
            },
            //获取推荐数据
            getComment(){
                getRecommend().then(res => {
                    //console.log(res)
                    const commentList = res.data.list
                    this.recommendList.push(...commentList)
                    //完成上拉加载更多
                    this.$refs.scroll.finishPullUp()
                })                
            },
            titleClick(index){
                this.$refs.scroll.scrollTo(0, -this.themeTopYs[index],500)
            },
            //添加至购物车
            addToCart(){
                const product = {}
                product.id = this.id
                product.img = this.topImages[0]
                product.title = this.goods.title
                product.desc = this.goods.desc
                product.price = this.goods.nowPrice

                this.$store.dispatch('addCart',product).then( res => {                   
                    this.$toast.show('已添加至购物车,请及时付款~',1500)
                })
            }

        }
    }
</script>

<style scoped>
    #details {
        height: 100vh;
        z-index: 1;
        position: relative;
        background-color:#fff;
    }
    .details-bar{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content {
        height: calc(100% - 44px);
        overflow: hidden;
        background-color: #fff;
    }
    .back-top {
      position: fixed;
      right: 10px;
      bottom: 60px;
    }
</style>