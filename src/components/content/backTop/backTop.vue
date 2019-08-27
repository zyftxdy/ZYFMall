<template>
    <div class="back-top" @click="topClick">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:'backTop',
    methods: {
		topClick: function () {
            this.$emit('backTop');
        }
    }
}
</script>

<style>
.back-top img {
    width: 43px;
    height: 43px;
  }
</style>