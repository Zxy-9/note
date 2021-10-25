<template>
<div class="BlogList-container">
    <ul>
        <li v-for="(item,index) in treeMenusData" :key="index">
            <div class="container">

             <div class="img">
                <img src="https://dummyimage.com/300x250/000/FFF&text=png" alt="" width="150" height="100">
            </div>
            <div class="content">  
                <h4>{{item.title}}</h4>
                <span>{{item.description}}</span>
            </div>
            </div>     
        </li>

        

    </ul>
  <div class="pager">

    <Pager></Pager>
  </div>

</div>
  
</template>

<script>
import Pager from '../../../components/Pager.vue'
export default {
   components:{
       Pager,
   },
   data() {
       return {
           treeMenusData:[]
       }
   },
   created() {
       this.getDataBlogMessage()
   },
   methods: {
        getDataBlogMessage(){ //获取博客文章
       let url = "https://www.fastmock.site/mock/f9b965b8e2838abe16cae8f764f121e4/blog/api/blog"
     this.$axios.get(url).then((res)=>{
       console.log(res)
       this.treeMenusData = res.data.data.rows
       console.log(this.treeMenusData)

     })
    }
   },

}
</script>

<style scoped>
.container{
    display: flex;
}
.img{
    flex: 1;
}
.content{
    flex: 3;
}
span{
    color: gray;
    word-break:break-all;
    font-size: 14px;
}

li{
    
    margin-left:350px ;
    
    width: 40vw;
    height: 15vh;
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
}
.pager{
    margin-left: 120px;
}


 
  
</style>