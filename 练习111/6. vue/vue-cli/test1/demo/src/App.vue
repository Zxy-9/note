<template>
  <div id="app">

    <Layout>
      <template #layout-left>
        <div>
           <slider></slider>
        </div>
      </template>
      <template #layout-center>
        <div class="layout-center">
           <router-view>

           </router-view>
        </div>
      </template>
    </Layout>


   

    
   

  </div>
</template>

<script>

import slider from './components/slider/slider.vue'
import carsousel from './components/carousel/carsousel.vue'
import Layout from './components/Layout/Layout.vue'


export default {
  components:{
 carsousel,
  slider,
  Layout


   
   
  },
  created() {
   
  },
 
  methods: {
    
}
}
</script>

<style lang="less">
.layout-container{
    display: flex;
}
.layout-left{
    width: 250px;
    height: 100vh;
    background: black;
}
.layout-center{
    flex:1;
    height: 100vh;
    width: 100%;
    
}




</style>
