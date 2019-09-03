<template>
    <div class="toast" v-show="isShowTips">
        <div>{{message}}</div>
    </div>
</template>

<script>
export default {
    name:'Toast',
    data(){
        return{
            message:'',
            isShowTips:false
        }
    },
    methods:{
        show(message,duration){           
            this.isShowTips = true;
            this.message = message;

            setTimeout(() => {
                this.isShowTips =false;
                this.message =''
            },duration)
        }
    }
}
</script>

<style scoped>
    .toast{
        position: fixed;
        width: 220px;
        text-align: center;
        top: 50%;
        z-index: 100;
        border-radius: 10px;
        background-color:rgba(0, 0, 0, 0.219);
        color: #fff;
        height: 30px;
        line-height: 30px;
        left: 50%;
        transform: translate(-50%,-50%);
        transition: display .8s ease-in-out  .8s
    }
</style>