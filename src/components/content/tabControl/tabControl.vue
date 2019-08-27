<template>
    <div class="tab-control">
        <div 
            class="tab-control-item"
            v-for="(item,index) in title"
            :key="index"
            :class="{active: currentIndex === index}"
            @click="itemClick(index)"         
        ><span>{{item}}</span></div>
    </div>
</template>

<script>
export default {
    name:'tabControl',
    props:{
        title:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
        currentIndex: 0
        }
    },
    methods: {
      itemClick: function (index) {
        // 1.改变currentIndex
        this.currentIndex = index;

        // 2.发出事件
        this.$emit('itemClick', index)
      }
    }
}
</script>

<style scoped>
    .tab-control{
        display: flex;
        text-align: center;
        font-size: 15px;
        height: 40px;
        line-height: 40px;
        background-color: #ffffff;
    }
    .tab-control-item{
        flex:1;     
    }
    .tab-control-item span {
    padding: 5px;
    }

    .active {
        color: var(--color-high-text);
    }

    .active span {
        border-bottom: 2px solid var(--color-high-text);
    }
</style>