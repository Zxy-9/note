<template>
  <nav class="menu-container">
    <router-link
      v-for="item in items"
      :to="item.link"
      :key="item.link"
      :exact='item.exact'
      :class="{
        selected: isSelected(item),
      }"
    >
      <div class="icon">
        <Icon :type="item.icon" />
      </div>
      <span>{{ item.title }}</span>
    </router-link>
  </nav>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      items: [
        {
          link: "/",
          title: "首页",
          icon: "icon-zhuye",
          exact:true,
        },
        {
          link: "/blog",
          title: "文章",
          icon: "icon-bokeyuan",
          exact: false, // 只要当前路径以link开头，当前菜单就是选中的
        },
        {
          link: "/about",
          title: "关于我",
          icon: "icon-xinxi",
          exact:true,
        },
        {
          link: "/project",
          title: "项目&效果",
          icon: "icon-blog",
          exact:true,
        },
        {
          link: "/message",
          title: "留言板",
          icon: "icon-liuyan",
          exact:true,
        },
      ],
    };
  },
  methods: {
    isSelected(item) {
      var link = item.link.toLowerCase(); // 菜单的链接地址
      var curPathname = location.pathname.toLowerCase(); // 当前浏览器的访问路径
      if (item.startWith) {
        return curPathname.startsWith(link);
      } else {
        return curPathname === link;
      }
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.menu-container {
  transition: 500ms;
  color: @gray;
  margin: 24px 0;
  a {
    
    padding: 0 50px;
    display: block;
    display: flex;
    align-items: center;
    height: 45px;
    .icon {
      width: 24px;
    }
    &:hover {
      color: #fff;
    }
  }
  span{
    font-size: 16px;
  }
  
    .router-link-active{
       background: darken(@words, 3%);
    }
}
</style>
