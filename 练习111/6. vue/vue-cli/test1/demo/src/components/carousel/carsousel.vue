<template>
  <div class="carsousel-container">
  <ul v-for="(item,index) in banners" :key="index" class="carsoul-ul" >
   
      <li class="carsoul">{{item.text}}</li>
      
  </ul>
  <ul>
      <li class="arrows arrows-up" @click="carsoulUp"> <Icon class="icon" type="icon-shangjiantou" :size="30"/> </li>
     <li class="arrows arrows-down" @click="carsoulDown"> <Icon class="icon" type="icon-arrow-down" :size="30"/> </li>
  </ul>
  </div>
</template>

<script>
import Icon from '../Icon.vue'
export default {
    data() {
        return {
            banners:[
                {text:'carsoul1'},
                 {text:'carsoul2'},
                  {text:'carsoul3'}
            ]
        }
    },
  

    components:{
        Icon
    },

    created() {
    },
    methods: {
        getInfo(){
     let url = "https://www.fastmock.site/mock/f9b965b8e2838abe16cae8f764f121e4/blog/api/home"
     this.$axios.get(url).then((res)=>{
       console.log(res)
     })
  },
  carsoulUp(){
         
  },
  carsoulDown(){
      
  }

    },
}
</script>


<style>
.carsousel-container{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.arrows{
  position: absolute;
  left: 50%;   
 }
 .arrows-up{
     top: 15px;
    animation: bounce 1s infinite;

 }
 .arrows-down{
     top: auto;
    bottom: 15px;
     animation: bounce-down 1s infinite;

 }
 .carsoul-ul{
     width: 100%;
     height: 100%;
 }
 .carsoul{
    width: 100%;
    height: 100%;
    display: block;
 }
 .icon{
     color: gray;
 }
 @keyframes bounce
{
    0% {
        top: 25px;
    }
    50% {top: 15px;;}
    100%{top: 25px;}
}
 @keyframes bounce-down
{
    0% {
        bottom: 25px;
    }
    50% {bottom: 15px;;}
    100%{bottom: 25px;}
}



</style>