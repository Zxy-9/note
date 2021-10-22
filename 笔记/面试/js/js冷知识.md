大家好，我是零一，今天给大家带来一些JavaScript的冷知识，可能你有所耳闻，但也有可能会让你大吃一惊。废话不多说，一起来看看吧！

## 一、解构小技巧

平常我们需要用到一个嵌套多层的对象中某些属性，会将其解构出来使用

```
let obj = {
  part1: {
    name: '零一',
    age: 23
  }
}

// 解构
const { part1: { name, age } } = obj
// 使用
console.log(name, age)  // 零一  23
```

这种情况下，你把 `name` 和 `age` 从 `part1` 里解构出来了以后，你就无法使用变量 `obj` 中的 `part1` 属性了，如：

```
// .... 省略

const { part1: { name, age } } = obj
console.log(part1)   // Uncaught ReferenceError: part1 is not defined
```

其实你可以多次解构，如：

```
// .... 省略

const { part1: { name, age }, part1 } = obj
console.log(part1)   // {name: "零一", age: 23}
```

## 二、数字分隔符

有时你会在文件中定义一个数字常量

```
const myMoney = 1000000000000
```

这么多个 `0` ，1、2 ... 6、7 ... 数晕了都，怎么办？

数字分隔符整起来！

```
const myMoney = 1_000_000_000_000

console.log(myMoney)  // 1000000000000
```

这样写是没问题的，而且数字分割开后也更直观！！

## 三、try...catch...finally 谁厉害？

普通函数调用中，`return` 一般会提前结束函数的执行

```
function demo () {
  return 1
  console.log('我是零一')
  return 2
}

console.log(demo())   // 1
```

而在  `try...catch...finally` 中，`return` 就不会提前结束执行

```
function demo () {
  try {
    return 1
  } catch (err) {
    console.log(err)
    return 2
  } finally {
    return 3
  }
}

console.log(demo())   // 返回什么？？
```

这个程序会返回什么呢？思考一下

Tow hours Later~

答案是：`3`

最后得出结论，还是 `finally` 比较厉害

那么我们可以搞一些骚操作

```
function demo () {
  try {
    return 1
  } catch (err) {
    console.log(err)
    return 2
  } finally {
    try {
      return 3
    } finally {
      return 4
    }
  }
}

console.log(demo())  // 返回 4
```

## 四、获取当前调用栈

```
function firstFunction() { secondFunction(); } 
function secondFunction() { thridFunction(); } 
function thridFunction() { console.log(new Error().stack); } 

firstFunction();

//=> Error 
//  at thridFunction (<anonymous>:2:17) 
//  at secondFunction (<anonymous>:5:5) 
//  at firstFunction (<anonymous>:8:5) 
//  at <anonymous>:10:1
```

`new Error().stack` 这样就能随时获取到当前代码执行的调用栈信息，也不失一种调试代码的办法

## 五、一行代码生成随机字符串

我最初学js时，想自己实现一个随机生成字符串的函数，是这么搞的

```
function hash () {
  let s = ''
  const strs = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 
    'h', 'i', 'j', 'k', 'l', 'm', 'n', 
    'o', 'p', 'q', 'r', 's', 't', 'u', 
    'v', 'w', 'x', 'y', 'z', '0', '1', 
    '2', '3', '4', '5', '6', '7', '8',
    '9',
  ]
  for(let i = 0; i < 10; i++) {
    s += strs[Math.floor(Math.random() * strs.length)]
  }
  return s
}

hash()  // 'www7v2if9r'
```

真麻烦啊！我光写26个字母和10个数字就写了半天（当然也可以用ASCII码来实现，会更方便点）

接下来介绍一个方法，只需 一行超短代码 即可实现 "随机生成字符串" 的功能

```
const str = Math.random().toString(36).substr(2, 10);
console.log(str);   // 'w5jetivt7e'
```

我们同样获得了一个10位数的随机字符串，这太酷了😎，跟我写的那个比起来，简直不要太爽

先是 `Math.random()` 生成 `[0, 1)` 的数，也就是 `0.123312`、`0.982931`之类的，然后调用 `number` 的 toString方法将其转换成36进制的，按照MDN的说法，36进制的转换应该是包含了字母 `a~z` 和 数字`0~9`的，因为这样生成的是 `0.89kjna21sa` 类似这样的，所以要截取一下小数部分，即从索引 `2` 开始截取10个字符就是我们想要的随机字符串了

很多开源库都使用此方式为DOM元素创建随机ID。

## 六、最快获取dom的方法

`HTML`中带有 `id` 属性的元素，都会被全局的 ID 同名变量所引用

```
<div id="zero2one"></div>
```

原本获取 `dom` 是这样的

```
const el = document.getElementById('zero2one')  
console.log(el)   // <div id="zero2one"></div>
```

现在可以这样

```
console.log(zero2one)   // <div id="zero2one"></div>
```

是不是很方便 ^-^