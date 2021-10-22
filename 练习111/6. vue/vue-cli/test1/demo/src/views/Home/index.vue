<template>
<div class="carsousel-container">
<div v-loading='isloading' class="loading" >
  
</div>
  <carsousel>
    
  </carsousel>
</div>
  
</template>

<script>
import carsousel from '../../components/carousel/carsousel.vue'
export default {
  data() {
    return {
      isloading:true
    }
  },
  components:{
    carsousel
  }
};
</script>

<style>
.carsousel-container{
  width: 100%;
  height: 100%;
}
.loading{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
</style>
