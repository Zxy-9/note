<template>
<div class="blog-container">
  <div class="layout-center">
    <BlogList></BlogList>

  </div>
  <div class="layout-right">
    <div class="layout-right-div"></div>
  </div>
</div>
 
</template>

<script>

import BlogList from './components/BlogList.vue'
import Pager from '../../components/Pager.vue'
import rightTreeMenus from './components/hierarchyList.vue'
export default {
  data() {
    return {
    treeMenusData: [],

         
  }
  },
  components:{
    rightTreeMenus,
    Pager,
   
    BlogList
  },
  created() {
     
  },
  methods: {
    handleSelect(item){
     console.log(item)
    },
     getDataBlog(){ //获取博客分类
     let url = "https://www.fastmock.site/mock/f9b965b8e2838abe16cae8f764f121e4/blog/api/blogtype"
     this.$axios.get(url).then((res)=>{
       console.log(res)
       
       console.log(this.treeMenusData)
     })
  },
   
  
  },  
};
</script>

<style scoped>
.blog-container{
  display: flex;
  width: 100%;
  height: 100%;

}
.layout-right{
 flex: 0 0 350px;
 height: 100vh;
 background-color: aquamarine;

}
.layout-center{
  flex-grow:1 ;
}

</style>
