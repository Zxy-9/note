## call,apply,bind的基本介绍

#### 语法：

```
fun.call(thisArg, param1, param2, ...)
fun.apply(thisArg, [param1,param2,...])
fun.bind(thisArg, param1, param2, ...)
复制代码
```

#### 返回值：

call/apply：`fun`执行的结果 bind：返回`fun`的拷贝，并拥有指定的`this`值和初始参数

#### 参数

`thisArg`(可选):

1. **`fun`的`this`指向`thisArg`对象**
2. 非严格模式下：thisArg指定为null，undefined，fun中的this指向window对象.
3. 严格模式下：`fun`的`this`为`undefined`
4. 值为原始值(数字，字符串，布尔值)的this会指向该原始值的自动包装对象，如 String、Number、Boolean

`param1,param2`(可选): 传给`fun`的参数。

1. 如果param不传或为 null/undefined，则表示不需要传入任何参数.
2. apply第二个参数为数组，数组内的值为传给`fun`的参数。

### 调用`call`/`apply`/`bind`的必须是个函数

call、apply和bind是挂在Function对象上的三个方法,只有函数才有这些方法。

只要是函数就可以，比如: `Object.prototype.toString`就是个函数，我们经常看到这样的用法：`Object.prototype.toString.call(data)`

### 作用：

改变函数执行时的this指向，目前所有关于它们的运用，都是基于这一点来进行的。

### 如何不弄混call和apply

> 弄混这两个API的不在少数，不要小看这个问题，记住下面的这个方法就好了。

`apply`是以`a`开头，它传给`fun`的参数是`Array`，也是以`a`开头的。

### 区别：

#### call与apply的唯一区别

传给`fun`的参数写法不同：

- `apply`是第2个参数，这个参数是一个数组：传给`fun`参数都写在数组中。
- `call`从第2~n的参数都是传给`fun`的。

#### call/apply与bind的区别

**执行**：

- call/apply改变了函数的this上下文后马上**执行该函数**
- bind则是返回改变了上下文后的函数,**不执行该函数**

**返回值**:

- call/apply 返回`fun`的执行结果
- bind返回fun的拷贝，并指定了fun的this指向，保存了fun的参数。

返回值这段在下方bind应用中有详细的示例解析。

## call/apply/bind的核心理念：借用方法

看到一个非常棒的[例子](https://juejin.cn/post/6844903768132157447)：

生活中：

平时没时间做饭的我，周末想给孩子炖个腌笃鲜尝尝。但是没有适合的锅，而我又不想出去买。所以就问邻居借了一个锅来用，这样既达到了目的，又节省了开支，一举两得。

程序中：

A对象有个方法，B对象因为某种原因也需要用到同样的方法，那么这时候我们是单独为 B 对象扩展一个方法呢，还是借用一下 A 对象的方法呢？

当然是借用 A 对象的方法啦，既达到了目的，又节省了内存。

**这就是call/apply/bind的核心理念：借用方法**。

**借助已实现的方法，改变方法中数据的this指向，减少重复代码，节省内存。**

## call和apply的应用场景：

> 这些应用场景，多加体会就可以发现它们的理念都是：借用方法

1. 判断数据类型：

`Object.prototype.toString`用来判断类型再合适不过，借用它我们几乎可以判断所有类型的数据：

```
function isType(data, type) {
    const typeObj = {
        '[object String]': 'string',
        '[object Number]': 'number',
        '[object Boolean]': 'boolean',
        '[object Null]': 'null',
        '[object Undefined]': 'undefined',
        '[object Object]': 'object',
        '[object Array]': 'array',
        '[object Function]': 'function',
        '[object Date]': 'date', // Object.prototype.toString.call(new Date())
        '[object RegExp]': 'regExp',
        '[object Map]': 'map',
        '[object Set]': 'set',
        '[object HTMLDivElement]': 'dom', // document.querySelector('#app')
        '[object WeakMap]': 'weakMap',
        '[object Window]': 'window',  // Object.prototype.toString.call(window)
        '[object Error]': 'error', // new Error('1')
        '[object Arguments]': 'arguments',
    }
    let name = Object.prototype.toString.call(data) // 借用Object.prototype.toString()获取数据类型
    let typeName = typeObj[name] || '未知类型' // 匹配数据类型
    return typeName === type // 判断该数据类型是否为传入的类型
}
console.log(
    isType({}, 'object'), // true
    isType([], 'array'), // true
    isType(new Date(), 'object'), // false
    isType(new Date(), 'date'), // true
)
复制代码
```

1. 类数组借用数组的方法：

类数组因为不是真正的数组所有没有数组类型上自带的种种方法，所以我们需要去借用数组的方法。

比如借用数组的push方法：

```
var arrayLike = {
  0: 'OB',
  1: 'Koro1',
  length: 2
}
Array.prototype.push.call(arrayLike, '添加元素1', '添加元素2');
console.log(arrayLike) // {"0":"OB","1":"Koro1","2":"添加元素1","3":"添加元素2","length":4}
复制代码
```

1. apply获取数组最大值最小值：

apply直接传递数组做要调用方法的参数，也省一步展开数组，比如使用`Math.max`、`Math.min`来获取数组的最大值/最小值:

```
const arr = [15, 6, 12, 13, 16];
const max = Math.max.apply(Math, arr); // 16
const min = Math.min.apply(Math, arr); // 6
复制代码
```

1. 继承

ES5的继承也都是通过借用父类的构造方法来实现父类方法/属性的继承：

```
// 父类
function supFather(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green']; // 复杂类型
}
supFather.prototype.sayName = function (age) {
    console.log(this.name, 'age');
};
// 子类
function sub(name, age) {
    // 借用父类的方法：修改它的this指向,赋值父类的构造函数里面方法、属性到子类上
    supFather.call(this, name);
    this.age = age;
}
// 重写子类的prototype，修正constructor指向
function inheritPrototype(sonFn, fatherFn) {
    sonFn.prototype = Object.create(fatherFn.prototype); // 继承父类的属性以及方法
    sonFn.prototype.constructor = sonFn; // 修正constructor指向到继承的那个函数上
}
inheritPrototype(sub, supFather);
sub.prototype.sayAge = function () {
    console.log(this.age, 'foo');
};
// 实例化子类，可以在实例上找到属性、方法
const instance1 = new sub("OBKoro1", 24);
const instance2 = new sub("小明", 18);
instance1.colors.push('black')
console.log(instance1) // {"name":"OBKoro1","colors":["red","blue","green","black"],"age":24}
console.log(instance2) // {"name":"小明","colors":["red","blue","green"],"age":18} 
复制代码
```

类似的应用场景还有很多，就不赘述了，关键在于它们借用方法的理念，不理解的话多看几遍。

## call、apply，该用哪个？、

call,apply的效果完全一样，它们的区别也在于

- **参数数量/顺序确定就用call，参数数量/顺序不确定的话就用apply**。
- 考虑可读性：参数数量不多就用call，参数数量比较多的话，把参数整合成数组，使用apply。
- 参数集合已经是一个数组的情况，用apply，比如上文的获取数组最大值/最小值。

参数数量/顺序不确定的话就用apply，比如以下示例：

```
const obj = {
    age: 24,
    name: 'OBKoro1',
}
const obj2 = {
    age: 777
}
callObj(obj, handle)
callObj(obj2, handle)
// 根据某些条件来决定要传递参数的数量、以及顺序
function callObj(thisAge, fn) {
    let params = []
    if (thisAge.name) {
        params.push(thisAge.name)
    }
    if (thisAge.age) {
        params.push(thisAge.age)
    }
    fn.apply(thisAge, params) // 数量和顺序不确定 不能使用call
}
function handle(...params) {
    console.log('params', params) // do some thing
}
复制代码
```

## bind的应用场景：

#### 1. 保存函数参数：

首先来看下一道经典的面试题：

```
for (var i = 1; i <= 5; i++) {
   setTimeout(function test() {
        console.log(i) // 依次输出：6 6 6 6 6
    }, i * 1000);
}
复制代码
```

造成这个现象的原因是等到`setTimeout`异步执行时,`i`已经变成6了。

关于js事件循环机制不理解的同学，可以看我这篇博客：[Js 的事件循环(Event Loop)机制以及实例讲解](https://juejin.cn/post/6844903621872582669)

那么如何使他输出: 1,2,3,4,5呢？

方法有很多：

- 闭包, 保存变量

```
for (var i = 1; i <= 5; i++) {
    (function (i) {
        setTimeout(function () {
            console.log('闭包:', i); // 依次输出：1 2 3 4 5
        }, i * 1000);
    }(i));
}
复制代码
```

在这里创建了一个闭包，每次循环都会把`i`的最新值传进去，然后被闭包保存起来。

- **bind**

```
for (var i = 1; i <= 5; i++) {
    // 缓存参数
    setTimeout(function (i) {
        console.log('bind', i) // 依次输出：1 2 3 4 5
    }.bind(null, i), i * 1000);
}
复制代码
```

**实际上这里也用了闭包，我们知道bind会返回一个函数，这个函数也是闭包**。

它保存了函数的this指向、初始参数，每次`i`的变更都会被bind的闭包存起来，所以输出1-5。

具体细节，下面有个手写bind方法，研究一下，就能搞懂了。

- `let`

用`let`声明`i`也可以输出1-5: 因为`let`是块级作用域,所以每次都会创建一个新的变量,所以`setTimeout`每次读的值都是不同的,[详解](https://link.juejin.cn?target=https%3A%2F%2Fsegmentfault.com%2Fq%2F1010000007541743)。

#### 2. 回调函数this丢失问题：

这是一个常见的问题，下面是我在开发VSCode插件处理`webview`通信时，遇到的真实问题，一开始以为VSCode的API哪里出问题，调试了一番才发现是`this`指向丢失的问题。

```
class Page {
    constructor(callBack) {
        this.className = 'Page'
        this.MessageCallBack = callBack // 
        this.MessageCallBack('发给注册页面的信息') // 执行PageA的回调函数
    }
}
class PageA {
    constructor() {
        this.className = 'PageA'
        this.pageClass = new Page(this.handleMessage) // 注册页面 传递回调函数 问题在这里
    }
    // 与页面通信回调
    handleMessage(msg) {
        console.log('处理通信', this.className, msg) //  'Page' this指向错误
    }
}
new PageA()
复制代码
```

#### 回调函数`this`为何会丢失？

显然声明的时候不会出现问题，执行回调函数的时候也不可能出现问题。

问题出在传递回调函数的时候：

```
this.pageClass = new Page(this.handleMessage)
复制代码
```

因为传递过去的`this.handleMessage`是一个函数内存地址，没有上下文对象，也就是说该函数没有绑定它的`this`指向。

那它的`this`指向于它所应用的[绑定规则](https://juejin.cn/post/6844903630592540686#comment)：

```
class Page {
    constructor(callBack) {
        this.className = 'Page'
        // callBack() // 直接执行的话 由于class 内部是严格模式，所以this 实际指向的是 undefined
        this.MessageCallBack = callBack // 回调函数的this 隐式绑定到class page
        this.MessageCallBack('发给注册页面的信息')
    }
}
复制代码
```

既然知道问题了，那我们只要绑定回调函数的`this`指向为`PageA`就解决问题了。

**回调函数this丢失的解决方案**：

1. `bind`绑定回调函数的`this`指向：

这是典型bind的应用场景, 绑定this指向，用做回调函数。

```
this.pageClass = new Page(this.handleMessage.bind(this)) // 绑定回调函数的this指向
复制代码
```

PS： 这也是为什么`react`的`render`函数在绑定回调函数的时候，也要使用bind绑定一下`this`的指向，也是因为同样的问题以及原理。

1. 箭头函数绑定this指向

箭头函数的this指向定义的时候外层第一个普通函数的this，在这里指的是class类：`PageA`

这块内容，可以看下我之前写的博客：[详解箭头函数和普通函数的区别以及箭头函数的注意事项、不适用场景](https://juejin.cn/post/6844903801799835655#heading-3)

```
this.pageClass = new Page(() => this.handleMessage()) // 箭头函数绑定this指向
```

作者：OBKoro1
链接：https://juejin.cn/post/6844903906279964686
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

