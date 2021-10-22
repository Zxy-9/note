<template>
<!--只有总页数大于1的时候显示-->
  <div class="pager-container" v-if="pageNumber>1">
      <a @click="hanleClick(1)" :class="{disabled:current === 1}">|&lt;&lt;</a>
      <a @click="hanleClick(current - 1)" :class="{disabled:current === 1}">&lt;&lt;</a>
      <a @click="hanleClick(item)" v-for="(item,index) in number" :key='index' :class="{active:item===current}">{{item}}</a>
      <a @click="hanleClick(current + 1 )" :class="{disabled:current === pageNumber }">&gt;&gt;</a>
      <a @click="hanleClick(pageNumber)"  :class="{disabled:current === pageNumber}">&gt;&gt;|</a>
  </div>
</template>

<script>
export default {
    props:{
      //当前页数
      current:{
        type:Number,
        default:1
      },
      //总的数据条
      total:{
        type:Number,
        default:100
      },
      //限制页码
      limit:{
        type:Number,
        default:10
      },

      visibleNumber:{
        type:Number,
        default:10
      }
    },
    computed:{
      pageNumber(){
       return Math.ceil(this.total/this.limit) 
      },
     
      visibleMin(){
        let min = this.current - Math.ceil(this.limit/2)
        if(min<1) min = 1;
        return min;
      },
      visibleMax(){
        let max = this.visibleMin + this.limit -1
        if(max >this.pageNumber){
          max = this.pageNumber
        }
        return max
      },
       number(){
        let nums = [];
        for(let i=this.visibleMin;i<=this.visibleMax;i++){
          nums.push(i)

        }
        return nums
      }
    },
    methods:{
      hanleClick(newpage){
        this.$emit('handleClick',newpage)
        if(newpage<1) newpage = 1;
        if(newpage>this.pageNumber) newpage = this.pageNumber;
        if(newpage==this.current) return;
      }
    }

}
</script>

<style lang="less" scoped>
@import "../styles/var.less";

.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  a {
    color: @primary;
    margin: 0 6px;
    cursor: pointer;
    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: @words;
      font-weight: bold;
      cursor: text;
    }
  }
}
</style>