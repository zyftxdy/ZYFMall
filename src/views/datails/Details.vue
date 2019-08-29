<template>
    <div id="details">
        <details-nav-bar/>
        <details-swiper :images="topImages"></details-swiper>
    </div>
</template>

<script>
    import DetailsNavBar from './childComps/DetailsNavBar'
    import DetailsSwiper from './childComps/DetailSwiper'
    import {getDetails} from '../../network/details'
    export default {
        name:'Details',
        components:{
          DetailsNavBar,
          DetailsSwiper 
        },
        data(){
            return{
                id:null,
                topImages:[]
            }
        },
        created(){
            this.id = this.$route.query.id;

            getDetails(this.id).then(res => {
                //console.log(res);
                this.topImages = res.result.itemInfo.topImages
            })
        }
    }
</script>

<style>

</style>