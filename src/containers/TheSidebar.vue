<template>
  <CSidebar id="sidbar"
  :class='$i18n.locale'
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand>
 
 <h1 class="text-center responsive py-3" style="font-color: #fff; font-size: 30px">SILVER CLOUD  SYSTEM</h1>
      <!-- <img  class="responsive" src="@/assets/fanni_logo.png" > -->

    </CSidebarBrand>
    <CRenderFunction flat :content-to-render="$options.nav"/>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>

</template>

<script>
import nav from './_nav'

export default {
  name: 'TheSidebar',
  data () {
    return {
      companyName: 'sliver System'
    }
  },
  created () {
  },
  nav,
  computed: {
    show () {
      return this.$store.state.sidebarShow
    },
    minimize () {
      return this.$store.state.sidebarMinimize
    }
  }
}
</script>
<style scoped>
#sidbar{
  background-color: #2a3647;
 align-content: right;
}
.responsive{
  width:97% ;
  height: auto;
}
</style>
