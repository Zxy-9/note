<template>
  <img 
  class="avatarimg"
  :src = 'url' :style="{
      width:size+'px',
      height:size+'px',
  }">
</template>
<script>
  export default{
    props:{
        url:{
            type:String
        },
        size:{
            type:Number
        }
    }
  }
</script>
<style  scoped>
.avatarimg{
    border-radius: 50%;
    object-fit: cover;
    display: block;
}
    
</style>