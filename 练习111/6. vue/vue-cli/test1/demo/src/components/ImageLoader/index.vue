<template>
<div class="image-container">
     <!--图片-->
     <img @load="hanleLoad"
      class="img-src origin" :src="src" alt="" 
      
       v-show='origin' >
    <!--占位图片-->
  <span v-show="isLoad">加载中....</span>
    
</div>
  
</template>

<script>
export default {
    data(){
        return {
            isLoad:true,
            origin:false
       
            
        }
    },
    props:{
        
        src:{
            type:String,
            require:true
        }
    },
    computed:{
       
    },
    methods: {
        hanleLoad(){
            console.log('loaded')
            this.origin = true
            this.isLoad=false
        }
    
       
    },
   
  


}
</script>

<style lang="less" scoped>
.image-container{
    width: 100%;
    height: 100%;
    position: relative;
}
.img-src{
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
 


</style>

