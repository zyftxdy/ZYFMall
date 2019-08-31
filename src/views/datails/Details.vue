<template>
    <div id="details">
        <details-nav-bar class="details-bar"/>
        <scroll class="content" ref="scroll">
            <details-swiper :images="topImages" />
            <details-base-info :goods="goods" />
            <details-shop-info :shop="shop" />
            <details-goods-info :detailInfo="detailsInfo" @imageLoad="imageLoad"/>
            <details-param-info :paramInfo="goodsParam" />
        </scroll>
    </div>
</template>

<script>
    import DetailsNavBar from './childComps/DetailsNavBar'
    import DetailsSwiper from './childComps/DetailSwiper'
    import DetailsBaseInfo from './childComps/DetailsBaseInfo'
    import DetailsShopInfo from './childComps/DetailsShopInfo'
    import DetailsGoodsInfo from './childComps/DetailsGoodsInfo'
    import DetailsParamInfo from './childComps/DetailsParamInfo'

    import Scroll from 'components/common/Scroll/scroll'

    import {getDetails,GoodsInfo,Shop,GoodsParam} from '../../network/details'
    export default {
        name:'Details',
        components:{
          DetailsNavBar,
          DetailsSwiper,
          DetailsBaseInfo,
          DetailsShopInfo,
          DetailsGoodsInfo,
          DetailsParamInfo,
          Scroll
        },
        data(){
            return{
                id:null,
                topImages:[],
                goods:{},
                shop:{},
                detailsInfo:{},
                goodsParam:{}
            }
        },
        created(){
            this.id = this.$route.query.id;

            getDetails(this.id).then(res => {
                console.log(res);
                const data = res.result;
                this.topImages = data.itemInfo.topImages;
                this.goods = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services);
                this.shop = new Shop(data.shopInfo);
                this.detailsInfo = data.detailInfo;
                this.goodsParam = new GoodsParam(data.itemParams.info,data.itemParams.rule);
            })
        },
        methods:{
            imageLoad(){
                this.$refs.scroll.refresh()
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
        position: absolute;
        top: 44px;
        bottom: 60px;
    }
</style>