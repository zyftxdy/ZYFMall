<template>
    <div class="nav-bar">
        <div class="nav-left"><slot name="left"></slot></div>
        <div class="nav-center"><slot name="center">标题</slot></div>
        <div class="nav-right"><slot name="right"></slot></div>
    </div>
</template>

<script>
export default {
    name:'navBar'
}
</script>

<style scoped>
    .nav-bar{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        display: flex;
        height: 44px;
        line-height: 44px;
        text-align: center;
        box-shadow: 0 1px 1px rgba(100,100,100,.03);
        z-index: 9;
    }
    .nav-left,.nav-right{
        width: 60px;
    }
    .nav-center{
        flex: 1;    
    }
</style>