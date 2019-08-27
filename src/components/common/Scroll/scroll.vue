<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>       
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:"scroll",
    props:{
        probeType:{
            type:Number,
            default:1
        },
        pullUpLoad:{
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            scroll:null
        }
    },
    mounted(){
        setTimeout(this.__initScroll, 20)
    },
    methods:{
         __initScroll() {
            if (!this.$refs.wrapper) return
            this.scroll = new BScroll(this.$refs.wrapper,{
                probeType:this.probeType,
                pullUpLoad:this.pullUpLoad,
                click:true
            })

            this.scroll.on('scroll',(position) => {
                //console.log(position);
                this.$emit('scroll',position)
            })

            this.scroll.on('pullingUp',() => {
                console.log("上拉加载更多");
                this.$emit('pullingUp')
            })        
        },
        scrollTo(x, y, time) {
            this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
        },
        finishPullUp() {
            this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
        },
        refresh() {
            this.scroll && this.scroll.refresh && this.scroll.refresh()
        }   
    }
}
</script>

<style>

</style>