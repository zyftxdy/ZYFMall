<template>
  <swiper v-if="banners.length">
        <swiper-item v-for="(item,index) in banners" :key="index">
          <a href="#">
            <img :src="item.image" alt=""/>
          </a>
        </swiper-item> 
    </swiper> 
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
    name:'HomeSwiper',
    components:{
        Swiper,
        SwiperItem
    },
    props:{
        banners:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return{
            isLoad:false
        }
    }
}
</script>

<style>

</style>