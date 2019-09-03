<template>
   <div id="profile">
      <nav-bar  class="profile-bar"><div slot="center">个人中心</div></nav-bar>
  </div>
</template>

<script>
import navBar from 'components/common/navBar/navBar'

export default {
    name:"profile",
    components:{
        navBar
    }
}
</script>

<style scoped>
   .profile-bar{
        background-color: var(--color-tint);
        font-weight: 700;
        color: #fff;
   }
</style>