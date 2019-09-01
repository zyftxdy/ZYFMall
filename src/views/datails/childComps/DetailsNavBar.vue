<template>
        <nav-bar>
            <div slot="left" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="" class="back">
            </div>
            <div slot="center" class="title">
                <div 
                    v-for="(item,index) in titles" 
                    :key="index" 
                    class="title-item"
                    :class="{active:index === currentIndex}"
                    @click="titleClick(index)"
                >
                    {{item}}
                </div>
            </div>
        </nav-bar>
</template>

<script>
    import navBar from 'components/common/navBar/navBar'
    export default {
        name:'DetailsNavBar',
        components:{
          navBar  
        },
        props:{
            currentIndex: {
                type: Number,
                default: 0
            }
        },
        data(){
            return{
                titles:['商品','参数','评论','推荐']
            }
        },
        methods:{
            titleClick(index){
                this.$emit('itemClick', index)
            },
            backClick(){
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
    .title{
        display: flex;
    }
    .title-item{
        flex:1;
    }
    .active{
        color:var(--color-high-text);
    }
    .back{
        margin-top: 11px;
    }
</style>