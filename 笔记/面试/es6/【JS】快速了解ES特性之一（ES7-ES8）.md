## ES是啥？

  **ES**的全称是**ECMAScript**，由 [ECMA国际](https://link.juejin.cn?target=https%3A%2F%2Fwww.ecma-international.org%2F) （前身为欧洲计算机制造商协会）在标准 [ECMA-262](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftc39%2Fecma262) 中定义的脚本语言规范，从2015年起，每年一个版本，到 **ES2022** 已经是第十三个版本了。我们常用的 **JavaScript** 就是 [ECMA-262](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftc39%2Fecma262) 标准的实现和拓展。 现在我直接贴一个官网的地址 [ECMAScript](https://link.juejin.cn?target=https%3A%2F%2Ftc39.es%2Fecma262%2F%23sec-intro) 吧，详细的内容大家可以直接查看官网的介绍。我就不过多介绍这个东西了。水字数没必要。。。🤥

  尽管 **ES2022** 的还没有正式发布，但是提案已经完成，板上钉钉。下面我就按照大概的情况列一下各个ES版本提案的全称、发布年份、缩写信息等，这样大家就不会迷惑ES的命名了。

| 全称            | 发布年份 | 缩写 / 简称   |
| --------------- | -------- | ------------- |
| ECMAScript 2015 | 2015     | ES2015 / ES6  |
| ECMAScript 2016 | 2016     | ES2016 / ES7  |
| ECMAScript 2017 | 2017     | ES2017 / ES8  |
| ECMAScript 2018 | 2018     | ES2018 / ES9  |
| ECMAScript 2019 | 2019     | ES2019 / ES10 |
| ECMAScript 2020 | 2020     | ES2020 / ES11 |
| ECMAScript 2021 | 2021     | ES2021 / ES12 |
| ECMAScript 2022 | 2022     | ES2022 / ES13 |

有的同学可能会有这样的疑问，为啥 **ES2015** 对应的是 **ES6** ，而不是 **ES5** 呢? 这里说明一下，这两个数字不是同一个东西，**2015** 代表的是发布的日期，而 **6** 表示的是ECMAScript语言规范的第几个版本。这样不懂的同学可能就明白了，再回头一看上面的表格，这样印象就更加深刻了。

## ES2016 - ES2022的特性

  骚话不多说，下面我们直接开始吧。我会将 **ES2016 - ES2022** 的内容分成一段段举例演示，内容主要以 Github已完成 [提案](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Ftc39%2Fproposals%2Fblob%2FHEAD%2Ffinished-proposals.md) 上的顺序讲解。（PS: 没有 **ES2015 / ES6** ，直接 **ES2016 / ES7** 起步）

### ES2016 / ES7

#### Array.prototype.includes 数组是否包含某个元素

  这个特性很多小伙伴肯定都用过，这个主要的作用是查找一个元素是否在数组中。在这个方法没出来之前，偷懒同学可能是通过数组的 indexOf 方法来做校验的

```js
[1, 2, 3].indexOf(1) >= 0

// 结果: true
复制代码
```

正常情况下，`indexOf` 方法并没有啥毛病，但是这个方法存在一个漏洞，当需要查看的元素是 `NaN` 时，这个 `indexOf` 方法将不能够准确的判断出元素是否被包含在数组中

```js
[1, 2, NaN].indexOf(NaN) >= 0

// 结果: false
复制代码
```

另外一个问题是，`indexOf` 这个方法主要想表明的是一个元素在数组中的 **索引位置** 而不是确定一个元素是否包含在数组中，所以勤快的同学一般会通过手写一个循环方法来处理这个问题，但是引用这个方法又比较麻烦，直接套在原型上？不敢不敢。。。

```js
function contains(array, val) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === val) {
            return true;
        }
    }
    return false;
}
复制代码
```

现在我们有了 `includes` 方法，上述的问题都将解决，并且更加好使，我们来测试一下以下代码，大家可以脑补一下下面的结果

```js
console.log([1, 2, 3].includes(2) === true);
console.log([1, 2, 3].includes(4) === false);
console.log([1, 2, NaN].includes(NaN) === true);

console.log([1, 2, -0].includes(+0) === true);
console.log([1, 2, +0].includes(-0) === true);

console.log(["a", "b", "c"].includes("a") === true);
console.log(["a", "b", "c"].includes("a", 1) === false);
复制代码
```

我们现在公布答案，上面的七个结果均为 `true` 。毋庸置疑。。。

#### Exponentiation operator 幂运算

这个没有啥好讲的，直接看下面的代码片段就明白了

```js
let squared = 2 ** 2;
// same as: 2 * 2

let cubed = 2 ** 3;
// same as: 2 * 2 * 2

let a = 2;
a **= 2;
// same as: a = a * a;

let b = 3;
b **= 3;
// same as: b = b * b * b;
复制代码
```

### ES2017 / ES8

#### Object.values / Object.entries 对象值、对象对

这个也没啥好说的，`Object.values` 方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同（区别在于 for-in 循环枚举原型链中的属性），看代码

```js
let point = {x: 12, y: 6};
Object.values(point);

// 结果: [12, 6]
复制代码
```

`Object.entries` 方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）。

听起来有点绕，咱们直接看代码

```js
let point = {x: 12, y: 6};
Object.entries(point);

// 结果: [["x", 12], ["y", 6]]
复制代码
```

字符串也同样ok

```js
Object.entries("hello world");

// 结果: [["0","h"],["1","e"],["2","l"],["3","l"],["4","o"],["5"," "],["6","w"],["7","o"],["8","r"],["9","l"],["10","d"]]
复制代码
```

来试试顺序

```js
let object = {
    3: "z",
    1: "x",
    2: "y",
    z: 3,
    x: 1,
    y: 2
};

for (var key in object) {
    console.log(key);
}
// 1
// 2
// 3
// z
// x
// y

Object.entries(object);

// 结果: [["1","x"],["2","y"],["3","z"],["z",1],["x",2],["y",3]]
复制代码
```

我们可以看到，输出结果和上面我们的方法描述一致（其排列与使用 `for...in` 循环遍历该对象时返回的顺序一致）。同时，这儿还有个隐藏的 **buff**，`for...in` 会对数字的类型的 `key` 升序放在前面，不相信的同学自己也可以尝试一下哦。

#### String.prototype.padStart / String.prototype.padEnd 填充字符串

这两个方法还是比较常见的，我可以指定一个字符最大的宽度，当字符串超过最大长度则截断替换字符，保留左边（`padStart`）或者右边（`padEnd`）的内容当字符串宽度没有达到的时候，将会在开始（`padStart` ）或者结尾（`padEnd` ）填充指定的字符，填充字符未指定默认是一个 **空格（U+0020）** ，它主要用来格式化字符串，当然你也可以把它玩儿出花来。我们先来看一下定义

```ts
interface String {
    /**
     * 用给定字符串（可能重复）填充当前字符串，以使生成的字符串达到给定长度。填充从当前字符串的开始（左）开始应用。
     *
     * @param maxLength 填充当前字符串后所得字符串的长度。如果此参数小于当前字符串的长度，则当前字符串将按原样返回。
     *
     * @param fillString 用于填充当前字符串的字符串。如果此字符串太长，将截断它，并应用最左边的部分。参数的默认值为' '（U+0020）。
     */
    padStart(maxLength: number, fillString?: string): string;

    /**
     * 用给定字符串（可能重复）填充当前字符串，以使生成的字符串达到给定长度。从当前字符串的末尾（右侧）应用填充。
     *
     * @param maxLength 填充当前字符串后所得字符串的长度。如果此参数小于当前字符串的长度，则当前字符串将按原样返回。
     *
     * @param fillString 用于填充当前字符串的字符串。如果此字符串太长，将截断它，并应用最左边的部分。参数的默认值为' '（U+0020）。
     */
    padEnd(maxLength: number, fillString?: string): string;
}
复制代码
```

有的同学可能对上面的超出长度的截断的含义比较模糊，下面我们直接上手，看下输出就明白了

```js
'foo'.padStart(5)
// 结果: '  foo'
'foo'.padStart(5, '-')
// 结果: '--foo'
'foo'.padStart(5, 'xyz')
// 结果: 'xyfoo' (超出长度，'z' 字符被截断去掉了，保留了左边部分的内容)
'bar'.padEnd(5)
// 结果: 'bar  '
'bar'.padEnd(5, '-')
// 结果: 'bar--'
'bar'.padEnd(5, 'xyz')
// 结果: 'barxy' (超出长度，'z' 字符被截断去掉了，保留了左边部分的内容)

// 原字符串长度超出最大字符串长度情况下
'foo'.padStart(2, 'xyz')
// 结果: 'foo'
'foo'.padStart(2, 'xyz')
// 结果: 'foo'
复制代码
```

#### Object.getOwnPropertyDescriptors 获取自身属性描述符

  这个方法我们可以根据方法含义来理解，那就是获取自身属性的描述符。它常常配合 `Object.create()` 这个方法，来实现拷贝对象属性/对象属性特性以及原型。在理解这个方法之前，我们得知道啥是属性描述符。我们先定义一个对象打印一手，直接获取了对象的属性的描述符

```js
let point = {
    x: 12,
    y: 16,
    move({x, y}) {
        this.x = x;
        this.y = y;
    }
}
Object.getOwnPropertyDescriptors(point);
// {
//     x: {
//         configurable: true,
//         enumerable: true,
//         value: 12,
//         writable: true,
//         [[Prototype]]: Object
//     }, 
//     y: {
//         configurable: true,
//         enumerable: true,
//         value: 16,
//         writable: true, 
//         [[Prototype]]: Object
//     },
//     move: {
//         configurable: true,
//         enumerable: true,
//         value: f move({x,y}),
//         writable: true, 
//         [[Prototype]]: Object
//     },
//     [[Prototype]]: Object
// }

let c = {}
Object.getOwnPropertyDescriptors(c);
// {}
复制代码
```

我们从上面的结果中，可以发现：如果对象为空，那么获取到的描述就是个空对象，如果有属性或者方法，会对每个属性进行描述，包含

- configurable: 当且仅当该属性的 `configurable` 键值为 `true` 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。**默认为 `false`**
- enumerable: 当且仅当该属性的 `enumerable` 键值为 `true` 时，该属性才会出现在对象的枚举属性中。**默认为 `false`**。
- value: 该属性对应的值。可以是任何有效的 JavaScript 值（ **数值** ， **对象** ， **函数** 等）。**默认为 `undefined`**。
- writable: 当且仅当该属性的 `writable` 键值为 `true` 时，属性的值，也就是上面的 `value`，才能被**赋值运算符**改变。**默认为 `false`**。

详情我们可以在 [Object.defineProperty()](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FObject%2FdefineProperty) 这儿看到，这里的属性描述符实际上是给 [Object.defineProperty()](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FObject%2FdefineProperty) 的第三个参数用的。从上面的例子中，我们可以看出，我们直接定义一个对象 `point` ，并且直接设置属性方法，对象属性默认 `configurable` ， `enumerable` ， `writable` 设置为 `true` 。

我们现在给上面的例子再修改一下，加深理解。 我们先遍历打印一下 `point` 的 `key`

```js
for (var key in point) {
    console.log(key);
}
// x
// y
// move
复制代码
```

接着使用 [Object.defineProperty()](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FObject%2FdefineProperty) 方法修改一下 `point` 的 `move` 方法的描述符

```js
Object.defineProperty(point, 'move', {
    enumerable: false
});
for (var key in point) {
    console.log(key);
}
// x
// y
复制代码
```

我们可以看到 `move` 这个方法在 `for..in` 中已经没有打印名称了。我们用 [Object.getOwnPropertyDescriptor()](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FObject%2FgetOwnPropertyDescriptor) 这个 **老方法** 再看看 `move` 的属性描述符

```js
Object.getOwnPropertyDescriptor(point, 'move');
//{
//    configurable: true,
//    enumerable: false,
//    value: f move({x,y}),
//    writable: true, 
//    [[Prototype]]: Object
//}
复制代码
```

符合我们的预期。大家看明白了属性描述符，那对这个新增的方法就能理解的明明白白了

#### Async functions 异步方法

这个感觉没有啥好写的，懂得都懂。`async` 和 `await` 相当于一个语法糖，被 `async` 标记的方法将会返回一个 `Promise` 对象。我们可以在一个 `async` 标记的方法中使用 `await` 一个 `Promise` 对象，当 `Promise` 结束之后才执行下一语句，这让我们可以在 `async` 标记的方法中用同步的方法来书写异步的 `Promise` 。 我们简单举一个例子

```js
async function a() {
    return "a";
}
function b() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("b");
        }, 3000);
    });
}
async function c() {
    return "c";
}
async function d() {
    let a = await a();
    console.log(a);
    let b = await b();
    console.log(b);
    let c = await c();
    console.log(c);
}
console.log(d())

// 结果：
// Promise { <pending> } `async` 标记的方法返回了一个 `Promise` 对象
// a
// b  等待三秒之后继续输出后续内容
// c

复制代码
```

异步的方法同步的方式写，看起来很美好，但实际使用中还是有一点点问题。 我之前写过一篇 [JS中优雅的使用async await](https://juejin.cn/post/7014749066005331975) ，有兴趣的小伙伴可以去瞅瞅。

#### Shared memory and atomics 共享内存和原子

这个是给浏览器的规范，我们可以通过 `SharedArrayBuffer` 和 `Atomics` 增强 js 的并行能力，想要了解的同学可以翻看 [SharedArrayBuffer](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FSharedArrayBuffer) 和 [Atomics](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FAtomics) ，因为出现的场景很少，我就不细讲了。加油啊各位。


作者：尽管如此世界依然美丽
链接：https://juejin.cn/post/7021183043679289352
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。