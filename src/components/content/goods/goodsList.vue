<template>
    <div class="goods">
        <goods-list-item 
            v-for="(item,index) in goods"
            :goodsItem="item"
            :key="index"
            ></goods-list-item>
    </div>
</template>

<script>
import GridView from 'common/gridView/GridView'
import goodsListItem from './goodListItem'
export default {
    name:'goodsList',
    components:{
        goodsListItem,
        GridView
    },
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
    .goods{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>