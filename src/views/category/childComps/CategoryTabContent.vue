<template>
    <div class="items">
        <div class="item" v-for="(item, index) in subcategories.list" :key="index">
        <a href="#">
          <img class="item-img" :src="item.image" alt="">
          <div class="item-text">{{item.title}}</div>
        </a>
        </div>
    </div>  
</template>

<script>
export default {
    name:'CategoryTabContent',
    props:{
        subcategories:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style scoped>
  .items{
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
  }
  .item {
    text-align: center;
    font-size: 12px;
    width: 30%;
    margin-top: 10px;
  }

  .item-img {
    width: 80%;
  }

  .item-text {
    margin-top: 15px;
  }
</style>