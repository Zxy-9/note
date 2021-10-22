<template>
  <ul>
    <li v-for="(item,index) in list " :key="index" @click="handleClickLi(item)">
      <p :class="{active:item.isSelected}">{{item.name}}</p>
      <rightTreeMenus :list="item.children" @select="handleClickLi"></rightTreeMenus>
    </li>
  </ul>
</template>
<script>
export default {
  name: "rightTreeMenus",
  props: {
    list: Array
  },
  methods: {
      handleClickLi(item){
          this.$emit('select',item)
      },
      handleSelect(item){
          console.log(item)
      }
  },
};
</script>
<style>
    ul {
    padding-left: 20px !important;
    }
    .active{
        color: tomato;
    }
    li{
        cursor: pointer;
    }

</style>