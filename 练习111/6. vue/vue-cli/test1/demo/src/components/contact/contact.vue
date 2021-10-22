<template>
  <div class="contact-container">
    <ul>
      <li>
        <a href="">
         <icon type="icon-github-fill" :size="40" ></icon> <span>810269346@qq.com</span>

        </a>
      </li>

      <li>
        <a href="">
         <icon type="icon-github-fill" :size="40" ></icon> <span>810269346@qq.com</span>

        </a>
      </li>
<li>
        <a href="">
         <icon type="icon-github-fill" :size="40" ></icon> <span>810269346@qq.com</span>

        </a>
      </li>

    </ul>
  
      
        
  </div>
</template>

<script>
import Icon from '../Icon/Icon.vue'
export default {
    components:{
       Icon
  },
  props:{
    describe:{
      type:String
    }
  }

}
</script>

<style lang="less" scoped>
@import url('../../styles/var.less');
.contact-container{
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
ul{
  margin: 0px;
  padding: 0px;
  
}
li{
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  margin: 10px;
  padding: 10px;

  
  
}
a{
  color:@gray;
}

</style>
