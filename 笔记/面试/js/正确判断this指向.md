### 1.如何正确判断this的指向？(2019-05-20)

如果用一句话说明 this 的指向，那么即是: 谁调用它，this 就指向谁。

但是仅通过这句话，我们很多时候并不能准确判断 this 的指向。因此我们需要借助一些规则去帮助自己：

this 的指向可以按照以下顺序判断:

#### 全局环境中的 this

浏览器环境：无论是否在严格模式下，在全局执行环境中（在任何函数体外部）this 都指向全局对象 `window`;

node 环境：无论是否在严格模式下，在全局执行环境中（在任何函数体外部），this 都是空对象 `{}`;

#### 是否是 `new` 绑定

如果是 `new` 绑定，那么 this 指向这个新对象。如下:

```
function Super(age) {
    this.age = age;
    console.log(this);//Super { age: 'hello' }
}

let instance = new Super('26');
复制代码
```

#### 函数是否通过 call,apply 调用，或者使用了 bind 绑定，如果是，那么this绑定的就是指定的对象【归结为显式绑定】。

```
function info(){
    console.log(this.age);
}
var person = {
    age: 20,
    info
}
var age = 28;
var info = person.info;
info.call(person);   //20
info.apply(person);  //20
info.bind(person)(); //20
复制代码
```

这里同样需要注意一种**特殊**情况，如果 call,apply 或者 bind 传入的第一个参数值是 `undefined` 或者 `null`，严格模式下 this 的值为传入的值 null /undefined。非严格模式下，实际应用的默认绑定规则，this 指向全局对象(node环境为global，浏览器环境为window)

```
function info(){
    //node环境中:非严格模式 global，严格模式为null
    //浏览器环境中:非严格模式 window，严格模式为null
    console.log(this);
    console.log(this.age);
}
var person = {
    age: 20,
    info
}
var age = 28;
var info = person.info;
//严格模式抛出错误；
//非严格模式，node下输出undefined（因为全局的age不会挂在 global 上）
//非严格模式。浏览器环境下输出 28（因为全局的age会挂在 window 上）
info.call(null);
复制代码
```

#### 隐式绑定，函数的调用是在某个对象上触发的，即调用位置上存在上下文对象。典型的隐式调用为: `xxx.fn()`

```
function info(){
    console.log(this.age);
}
var person = {
    age: 20,
    info
}
var age = 28;
person.info(); //20;执行的是隐式绑定
复制代码
```

#### 默认绑定，在不能应用其它绑定规则时使用的默认规则，通常是独立函数调用。

非严格模式： node环境，执行全局对象 global，浏览器环境，执行全局对象 window。

严格模式：执行 undefined

```
function info(){
    console.log(this.age);
}
var age = 28;
//严格模式；抛错
//非严格模式，node下输出 undefined（因为全局的age不会挂在 global 上）
//非严格模式。浏览器环境下输出 28（因为全局的age不会挂在 window 上）
//严格模式抛出，因为 this 此时是 undefined
info(); 
复制代码
```

#### 箭头函数的情况：

箭头函数没有自己的this，继承外层上下文绑定的this。

```
let obj = {
    age: 20,
    info: function() {
        return () => {
            console.log(this.age); //this继承的是外层上下文绑定的this
        }
    }
}

let person = {age: 28};
let info = obj.info();
info(); //20

let info2 = obj.info.call(person);
info2(); //28
```


作者：刘小夕
链接：https://juejin.cn/post/6844903854174109710
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。