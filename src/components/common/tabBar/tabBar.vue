<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"tabBar"
}
</script>

<style scoped>
  #tab-bar{
    display: flex;
    background-color: #fff;
    position:fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0px -1px 1px rgba(100,100,100, .03);
  }

  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
  }

  .tab-bar-item img{
      width: 24px;
      height: 24px;
  }
</style>