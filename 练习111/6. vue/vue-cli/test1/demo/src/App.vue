<template>
  <div id="app" class="container">

  

        <div class="layout-right">
           <slider></slider>
        </div>
    
     
        <div class="layout-center">
           <router-view>
           </router-view>
        </div>
    
  


   

    
   

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

<style lang="less" scoped>

.container{
  display: flex;
}
.layout-right{
  flex: 0 0 250px;
  height: 100vh;
  position: fixed;
  background-color: black;
}
.layout-center{
  flex: 1;
}



</style>
