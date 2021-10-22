import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter); // Vue.use(插件)  在Vue中安装插件
import Home from '@/views/Home'
import About from "@/views/About";
import Blog from "@/views/Blog";
import Project from "@/views/Project";
import Message from "@/views/Message";

const router = new VueRouter({
  // 路由配置 
  routes: [ // 路由规则
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/blog', component: Blog },
    { path:'/blog/cate/:categoryId', component:Blog },
    { path: '/project', component: Project },
    { path: '/message', component: Message },
  ]
})
export default router;