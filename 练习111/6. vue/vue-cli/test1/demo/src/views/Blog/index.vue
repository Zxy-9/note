<template>
<div class="blog-container">

 <rightTreeMenus :list="treeMenusData"  @select="handleSelect" />
</div>
 
</template>

<script>
import rightTreeMenus from './components/hierarchyList.vue'
export default {
  data() {
    return {
    treeMenusData: [ // 数据格式
  {
    name: "菜单1",isSelected:true,
   
    children: [
      {
        name: "菜单3-1",isSelected:false,
      },
      {
        name: "菜单3-1",isSelected:false,
      },
      {
        name: "菜单3-1",isSelected:false,
      },
      {
        name: "菜单3-1",isSelected:false,
      },
    ]
  },{
    name: "菜单1",isSelected:false,
  },{
    name: "菜单1",isSelected:false,
  },{
    name: "菜单1",isSelected:false,
  }
]
         
  }
  },
  components:{
    rightTreeMenus,
  },
  created() {
    this.getDataBlogMessage()
  },
  methods: {
    handleSelect(item){
     console.log(item)
    },
     getDataBlog(){
     let url = "https://www.fastmock.site/mock/f9b965b8e2838abe16cae8f764f121e4/blog/api/blogtype"
     this.$axios.get(url).then((res)=>{
       console.log(res)
     })
  },
    getDataBlogMessage(){
       let url = "https://www.fastmock.site/mock/f9b965b8e2838abe16cae8f764f121e4/blog/api/blog"
     this.$axios.get(url).then((res)=>{
       console.log(res)
     })
    }
  
  },  
};
</script>

<style></style>
