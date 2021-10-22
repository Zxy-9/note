<template>
  
      <div class="empty-cntainer">
          {{text}}
      </div>
</template>

<script>
export default {
    props:{
        text:{
            type:String,
            default:'无数据'
        }
    }

}
</script>

<style lang="less" scoped>
@import url('../../styles/minxin.less');
.empty-cntainer{
    .self-center()
}


</style>>
  


