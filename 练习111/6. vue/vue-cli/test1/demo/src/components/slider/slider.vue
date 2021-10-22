<template>
<div class="slider-congainer">
  <Avatar
  class="Avatar"
  :size="100" 
  url='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3.zhimg.com%2F50%2Fv2-2c739e302fd6ed9b6c6d13b4c3e58b7b_hd.jpg&refer=http%3A%2F%2Fpic3.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637036012&t=15b8aa21ada1284aaab35045b430ba96'></Avatar>

  <mmenu class="mmenu"></mmenu>
    <contact></contact>
</div>
  
</template>

<script>

import Avatar from '../Avatar/Avatar.vue'
import contact from '../contact/contact.vue'

import mmenu from '../menu/menu.vue'
export default {
    components:{
        Avatar,
        contact,
        mmenu
    }

}
</script>

<style lang="less" scoped>
.slider-congainer{
    position: relative;
}
.Avatar{
    left: 10px;
    padding: 50px;
}
.mmenu{
}

</style>