<template>
        <scroll class="content">
            <cart-list-item v-for="(item,index) in list" :key="index" :item-info="item"></cart-list-item>
        </scroll>
</template>

<script>

    import cartListItem from './cartListItem'

    import Scroll from 'components/common/Scroll/scroll'

    export default {
        name:'cartList',
        components:{
            cartListItem,
            Scroll
        },
        props:{
            list:{
                type:Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style scoped>

</style>