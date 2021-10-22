# Javascript中的异步

 推荐 原创

[cnn237111](https://blog.51cto.com/cnn237111)2014-09-22 16:22:36博主文章分类：[Web](https://blog.51cto.com/cnn237111/category2)©著作权

*文章标签*[异步](https://blog.51cto.com/topic/yibu1.html)[Javavascript](https://blog.51cto.com/topic/javavascript.html)*文章分类*[编程语言](https://blog.51cto.com/nav/program)[Java](https://blog.51cto.com/nav/java)*阅读数*1.2万

> 版权声明： 本文由 一只博客 发表于 [ bloghome博客](https://www.bloghome.com.cn/)
>
> 文章链接： [ https://www.bloghome.com.cn/user/cnn237111](https://www.bloghome.com.cn/user/cnn237111)

在C#，Java中，异步方法，通常是伴随多线程，并发等术语一起出现的，比如C#中的async方法，是运行在一个线程池线程上，并且在异步方法运行完成后，有一个回调函数通知主线程。

那么由于Javascript是单线程的，它的异步又是怎么解释的？

首先对异步方法给一个定义，什么样的方法算是异步方法。我认为异步方法最主要有2点，一个是不阻塞当前代码的执行，另一个是有回调方法。即异步方法运行完可以通知主线程。

事实上，当说起Javascript的异步时，不要忽略了，Javascript中其实有2种异步，一种是基于浏览器的的异步IO，比如ajax的本质。另一种是基于计时方法setTimeout和setInterval的异步。

对于异步IO，比如ajax，写代码的时候都是顺序执行的，但是在真正处理请求的时候，有一个单独的浏览器线程来处理，并且在处理完成后会触发回调。这种情况下，参与异步过程的其实有2个线程主体，一个是javascript的主线程，另一个是浏览器线程。

熟悉Javascript的人都知道，Javascript内部有一个事件队列，所有的处理方法都在这个队列中，Javascript主线程就是轮询这个队列处理，这个好处是使得CPU永远是忙碌状态。这个机制和Windows中的消息泵是一样的，都是靠消息（事件）驱动。对于这个消息队列的描述，可以参考[ http://www.iamued.com/qianduan/1645.html](http://www.iamued.com/qianduan/1645.html)这个文章。

在Javascript中，通过setTimeout函数也可以实现“不阻塞”和“有回调”。比如，下面的代码：

```js
function f1(callback){
setTimeout(function () {
// f1的任务代码
callback();
}, 1000);
}
f1(f2);1.2.3.4.5.6.7.
```

通过这种写法，javascript在调用f1方法的时候，将真正的逻辑放到1秒后，并且在运行完正真的逻辑后，执行了f2方法。仔细的分析一下，其实这种所谓的不阻塞其实只是将阻塞延迟了。单线程环境下，并没法真正的异步。事实上，setTimeout方法对于时间的精度非常差，并不能真的保证是在1秒后执行，如果事件队列中有一个长时间的方法在运行，那么就阻塞了真正的f1方法内容的运行，直到长时间的方法允许完毕。等到轮到f1的真正逻辑开始运行的时候，其他的代码同样的要等到它运行完毕才能运行。

比如下面的代码：

```js
setTimeout(function(){alert('do');},0);
var i=0;
while(i<100000){
console.log(i);
i++;
}1.2.3.4.5.6.
```

并不会马上运行alert，而是会等到while运行完毕才alert。根据《Javascript异步编程》这本书中提到，setTimeout和setInterval的延时最小间隔是4ms，Quora上也有总结过[ http://www.quora.com/How-accurate-are-JavaScript-timers](http://www.quora.com/How-accurate-are-JavaScript-timers)。

在Javascript中实现异步的另一个方法是Web Worker，web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。Web Workers依赖于浏览器，目前支持的lSafari, Chrome, Opera, Internet Explorer (version 10) 和Mozilla Firefox.一旦使用Web Workers就等于使用了多线程技术。Web Workers的更多细节，可以参考网上的文档[ http://www.w3school.com.cn/html5/html_5_webworkers.asp](http://www.w3school.com.cn/html5/html_5_webworkers.asp)。

[ http://www.cnblogs.com/feng_013/archive/2011/09/20/2175007.html](http://www.cnblogs.com/feng_013/archive/2011/09/20/2175007.html)