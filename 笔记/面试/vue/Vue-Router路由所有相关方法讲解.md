- 本文已参与「[掘力星计划](https://juejin.cn/post/7012210233804079141/)」，赢取创作大礼包，挑战创作激励金。

#  router的基本使用

## main.js

- **挂载路由**

```js
import Vue from 'vue'
import App from './App'
// 默认导入router文件夹下的内容
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,//挂载路由，把路由注入为Vue对象方便使用
  render: h => h(App)
})
复制代码
```

### App.vue

- **路由跳转的两种方法**

router-link 其他属性： 

- to:用于指定跳转的路径
- tag:可以指定router-link标签之后渲染成什么html元素
- replace(没有返回记录):在history模式下指定router-link使用的是replaceState,而不是一个pushState()
- active-class:设置对应路由匹配成功时，会给当前选中元素设置一个active-class属性类名

```html
<template>
  <div id="app">
    <!-- 利用router-view进行显示路由渲染的组件，切换的是挂载的组件，其他内容不会发生改变-->
    <router-view></router-view>
    <!-- 默认router-link是被渲染成a标签的 -->
    <!-- to点击后面的路径就会渲染,tag跟要渲染成的html标签 replace不能返回上一页-->
    <!-- 当某一个路由处于活跃状态的话vue会自动添加class，也可以用active-class来改类名 -->
    <!-- <router-link to="/home" tag="button" replace active-class="active"
      >首页</router-link>
    <router-link to="/about" replace>关于</router-link> -->
    <button @click="homeClick">首页</button>
    <button @click="aboutClick">关于</button>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    homeClick() {
      //  通过代码也可以修改路径
      // vue定义每个元素里都有一个router属性
      // push = pushState点击完之后还可以返回上一步
      // this.$router.push('/home')
      this.$router.replace("/home");
    },
    aboutClick() {
      this.$router.replace("/about");
    },
  },
};
</script>
复制代码
```

### router文件夹下的index.js(抽离router)

**路由模式：**

```js
hash:历史模式，不会制造页面刷新
history:不会有历史，不会制造页面刷新
复制代码
```

注意：路由重复点击会报错，降级router插件到到3.5版本以下 

**此处可以配置活跃路由的类名，如果多个router-link都要类名，可以在路由中统一配置**

```js
// 引用文件
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import About from '../components/About'
// 1.通过Vue.use(插件)，安装插件
Vue.use(Router)

// export default（导出） 将Router对象传入到vue实例
export default new Router({
  // 2.创建Router对象
  // 配置路由和组件之间的映射关系
  // routes是固定写法
  routes: [
    {
      path:'',
      // 重定向
      redirect:'/home'
    },
    {
      // 定义路径
      path: '/home',
      name: 'HelloWorld',
      // component显示
      component: Home
    },
    {
      path:'/about',
      component:About //组件名
    },
  ],
  mode:'history',
  // 全局配置激活路由的class类名，处与活跃（动态）就会用上这个类名
  linkActiveClass:'active'
})
复制代码
```

# 动态传参+编程式导航

路由路径后加/:id就可以变成动态路由

### App.vue

```html
<template>
  <div id="app">
    <!-- <router-link to="/home" tag="button">首页</router-link>
    <router-link to="/user">用户</router-link> -->

    <!-- 增加了两个到user的导航，使用不同的to -->
    <!-- <router-link to="/user/1" tag="button">1</router-link>
    <router-link to="/user/2" tag="button">2</router-link> -->

    <!-- 动态路由 -->
    <!-- <router-link :to="'/user/'+user1" tag="button">1</router-link>
    <router-link :to="'/user/'+user2" tag="button">2</router-link> -->

    <!-- 编程式导航，点击触发事件函数 -->
    <button @click="toHome">首页</button>
    <button @click="toUser">用户</button>
    <router-view></router-view>
  </div>
</template>
<script>

export default {
  name: 'App',
  data() {
    return {
      user1:'一',
      user2:'二'
    }
  },
  components: {
  },
  methods: {
    toHome(){
      //去首页
      // 在函数中，通过组件实例对象下的$router,获取路由对象，然后push到要跳转的路由 
      // this.$router.push('/home')//祖父串的方式进行跳转
      // this.$router.push({path:'/home'})//以对象的方式跳转

      this.$router.replace('/home')//replace没历史记录
    },
    toUser(){
      //去用户
      this.$router.push('/user/'+this.user2)
    }
  },
}
</script>
复制代码
```

### user.vue组件

```html
<template>
  <div id="user">
    <h2>用户组件</h2>
    <h3>欢迎 <span>{{uname}}</span> 来到用户页面</h3>//输出一或二切换
    <!-- 直接在模板中获取数据 ，$route接收，$router发送-->
    <h4>输出名字：{{$route.params.id}}</h4>
  </div>
</template>
<script>
export default {
  computed:{
    uname(){
      // this是查看当前组件有哪些方法
      // console.log(this);
      // 输出名字
      return this.$route.params.id
    }
  }
}
</script>
复制代码
```

#  嵌套路由

页面中使用this.$route:获取活跃的组件；

this.$router:获取router整个路由

```js
//配置路由的相关信息
import Vue from 'vue'

import Router from 'vue-router'

// 1.通过vue.use安装插件
Vue.use(Router);

// 引用组件
import Home from '../components/Home.vue'
import User from '../components/User.vue'
import News from '../components/News.vue'
import Msg from '../components/Msg.vue'

// 配置路由和组件之间的引用关系
const routes =[
  {
    path:'/',
    // 重定向redirect
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home ,
    // 使用嵌套路由用children属性
    children:[
      {
        path:'/home',
        redirect:'/home/news'
      },
      {//子路由加斜杠会被当作根路径
        path:'news',
        component:News
      },
      {
        path:'msg',
        component:Msg
      },
    ]
  },
  {
    path:'/user/:id',
    component:User 
  },
]

// 创建vue-router对象
const router = new Router({
  routes,
  // 没历史
  mode:'history',
  linkActiveClass:'active'
})

// 3.把router导出给vue实例
export default router

// $route:指向活跃的组件
// $router:指向router整个路由
复制代码
```

#  路由传参,懒加载

### router的index.js

```js
/配置路由的相关信息
import Vue from 'vue'

import Router from 'vue-router'

// 1.通过vue.use安装插件
Vue.use(Router);

// 懒加载
const User = ()=> import('../views/User.vue')
const Info = ()=> import('../views/info.vue')
const routes =[
  // {
  //   path:'/home',
  //   name:'Home',//命名路由
  //   component:Home 
  // },
  {
    // 配置动态路由
    path:'/user/:id',
    name:'User',
    // 懒加载
    component:User
  },
  {
    path:'/info',
    name:'Info',
    component:Info
  },
]

const router = new Router({
  routes,
  // 没历史
  mode:'history',
  // linkActiveClass:'active'
})

// 3.把router导出给vue实例
export default router
复制代码
```

### Info组件

```html
<template>
  <div id="info">
    <h2>这是信息组件</h2>
    //$route接收参数
    <h3>姓名：{{$route.query.name}}</h3>
    <h3>年龄：{{$route.query.age}}</h3>
  </div>
</template>
复制代码
```

### User组件

```html
<template>
  <div id="user">
<h2>用户信息</h2>
<!-- 取值用$route -->
//页面中有两个params.id，点击谁就显示哪个id
<h3>用户编号{{$route.params.id}}</h3>
  </div>
</template>
复制代码
```

### App.vue

```html
<template>
  <div id="app">
    <router-link to="/user/2021">user</router-link>|
    <router-link to="/info">info</router-link>
        <!-- 编程式导航 -->
    <button @click="toUser">user</button>
    <hr />
    
    <!-- 用path -->
    <!-- <router-link :to="{path:'/user/'+userId}">user--path</router-link><br> -->

    <!-- 用name,params传参 -->
    <router-link :to="{name:'User',params:{id:userId}}">user--name</router-link>

    <div>
      <!-- 通过query传参,      /info?name=rh&age=22&sex=男 -->
      <router-link :to="{path:'/info',query:{name:'rh',age:22,sex:'男'}}">info-path</router-link>
      <!-- 编程式导航，/info?name=有意&age=22 -->
      <button @click="toInfo">info</button>

    </div>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      userId: '20211',
    };
  },
  methods: {
    // 路由传参：
      //  query和path配合
      // params和name配合
      // name:命名路由
    toUser() {
      // params传参
      this.$router.push({ name: "User", params: { id: "567" } });
    },
    toInfo(){
      // 没历史记录
      //$router传参
      this.$router.replace({name:'Info',
      query:{
        name:'有意',
        age:22,
      }})
    }
  },
};
</script>
复制代码
```

#  守卫钩子（全局+独享+组件内的守卫）

### 登录页

```html
<template>
  <div id="login">
    <h3>登录</h3>
    账号：<input type="text" name="" id="" v-model="userName" /> 
    密码：<input
      type="text"
      v-model="userPass"
    />
    <button @click="login">登录</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      userPass: "",
    };
  },

  methods: {
    login() {
      // 通过window对象给uname和upass赋值;
      var name = window.uname = "admin";
      var pass = window.upass = "123";
      if (this.userName == name && this.userPass == pass) {
        alert("登录成功");
        // 放行后跳转到首页
        this.$router.replace("/");
      }else{
        alert('账号不对')
      }
    },
  },
};
</script>
复制代码
```

### 路由

```js
//配置路由的相关信息
import Vue from 'vue'
import Router from 'vue-router'
// 1.通过vue.use安装插件
Vue.use(Router);
// 懒加载
const User = ()=> import('../views/User.vue')
const Info = ()=> import('../views/info.vue')
const Login = ()=> import('../views/Login.vue')
const routes =[
  {
    // 配置动态路由
    path:'/user/:id',
    name:'User',
    // 懒加载
    component:User，
    // 独享路由守卫
    beforeEnter(to, from, next){
      next()
    }
  },
  {
    path:'/info',
    name:'Info',
    component:Info
  },
  {
    path:'/Login',
    name:'Login',
    component:Login
  },
]

const router = new Router({
  routes,
  // 没历史
  mode:'history',
  // linkActiveClass:'active'
})

// 全局前置钩子：beforeEach
// 在进入前做一些事
// to:要去的路由
// from:来的路由
// next:放行，默认参数是false
//上面把账号密码放到window这里也可以访问到
router.beforeEach((to,from,next)=>{
  if(to.name !=='Login'){//验证是否登录
    if(window.uname && window.upass){
      next();
    }else{
      alert('请先登录')
      next('/Login')
    }
  }
  next();
})

// 全局的后置
// to:要去跳转的路由
// from:来的路由
router.afterEach((to,from)=>{
  console.log('欢迎'+window.uname);
})

export default router
复制代码
```

### About.vue

```html
<template>
  <div class="about">
    <h1>about</h1>
    <button @click="toA">A</button>
    <button @click="toB">B</button>
    <div  style="border:2px red solid">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "About",
  data() {
    return {
      msg: "这是组件的路由守卫",
    };
  },
  methods: {
    toA(){
      this.$router.push('/about/a')
    },
    toB(){
      this.$router.push('/about/b')
    },
  },
  // 组件内的路由守卫
  // beforeRouteEnter相当于生命周期的beforeCreate
  beforeRouteEnter(to, from, next) {
    // 不能获取组件实例
    // 当守卫执行前，组件实例还未创建
    next();
  },

  beforeRouteLeave(to, from, next) {
    // 导航离开组件的时候对应路由调用
    // 可以访问组件实例
    // console.log(this.msg);
    next();
  },
  beforeRouteUpdate(to, from, next) {
    // 当前路由改变，但是该组件被复用时才触发
    // 在子路由a/b之间跳转的时候才会触发
    next();
  },
};
</script>
复制代码
```

## 补充 ：

### 解决重复点击路由报错：

1.在路由页引入以下代码：

```js
//Router自己定义的路由名
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location){
  return originalPush.call(this,location).catch(err=>err);
}
复制代码
```

2.或者直接降低router版本到3.5以下 。

### route和route和route和router的区别：

- router为VueRouter实例，想要导航到不同URL，则使用router为VueRouter实例，想要导航到不同URL，则使用router为VueRouter实例，想要导航到不同URL，则使用router.push方法
- $route为当前router跳转对象里面可以获取name、path、query、params等

### 最后 

如果对您有帮助，希望能给个👍评论收藏三连！

博主为人老实，无偿解答问题哦❤


作者：前端老实人
链接：https://juejin.cn/post/7015904409032851470
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。