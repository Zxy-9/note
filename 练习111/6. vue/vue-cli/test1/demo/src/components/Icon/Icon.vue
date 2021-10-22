<template>
  <i class="iconfont" :class="type" :style="{fontSize:size+'px'}"> </i>
</template>

<script>
export default {
    props:{
        type:{
            type:String,
            required:true
        },
        size:{
            type:Number
        }
        
    }

}
</script>

<style scoped>
    @import '//at.alicdn.com/t/font_2868736_y8fgchlguv.css';

</style>