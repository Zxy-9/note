[
keer6![lv-1](https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/636691cd590f92898cfcda37357472b8.svg)](https://juejin.cn/user/3526889032673982)

2年前

小白提出一个问题，现在的前端渲染和ssr渲染的本质区别是什么?如你所说，前端是由各种dom元素渲染后展示出来，那么ssr服务端渲染，最终还是要浏览器来展示？那么ssr做了什么呢？

##### 回复

[浪里行舟![lv-6](https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/74bd93adef7feff4fee26d08c0845b4f.svg)](https://juejin.cn/user/4283353031252967)

（作者）2年前

客户端渲染模式下，服务端会把渲染需要的静态文件发送给客户端，客户端加载过来之后，自己在浏览器里跑一遍 JS，根据 JS 的运行结果，生成相应的 DOM； 服务端渲染的模式下，当用户第一次请求页面时，由服务器把需要的组件或页面渲染成 HTML 字符串，然后把它返回给客户端。客户端拿到手的，是可以直接渲染然后呈现给用户的 HTML 内容，不需要为了生成 DOM 内容自己再去跑一遍 JS 代码。





[波比小金刚![lv-2](https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/f597b88d22ce5370bd94495780459040.svg)](https://juejin.cn/user/3667626519958510)

2年前

一个是你去宜家拉了一堆零件回来，自己在家组装好了，再布置一下。一个是宜家给你全部装好了（部分装好也行），你拉回来就完了