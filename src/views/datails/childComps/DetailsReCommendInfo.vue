<template>
    <div class="recommend-info">
        <div class="info-header">热门推荐</div>
        <goods-list :goods="goods" class="commend-more"></goods-list>
    </div>  
</template>

<script>
import goodsList from 'components/content/goods/goodsList'
export default {
    name:'DetailsReCommentInfo',
    components:{
        goodsList
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
  .recommend-info {
    padding: 5px;
  }

  .info-header {
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
    text-align: center;
  }
</style>