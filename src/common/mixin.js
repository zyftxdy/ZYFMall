import {debounce} from './utils'

export const itemLitener = {
    data(){
        return {
            itemListener:null,
            newRefresh:null
        }
    },
    mounted(){
        this.newRefresh = debounce(this.$refs.scroll.refresh,200)
        //3.监听item中图片加载完成
        this.itemListener = () => {
            this.newRefresh()
        }
        this.$bus.$on('itemImageLoad',this.itemListener)
        //console.log("123")
    }
}