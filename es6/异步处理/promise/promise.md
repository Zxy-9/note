# Promise的基本使用

```js
const pro = new Promise((resolve, reject)=>{
    // 未决阶段的处理
    // 通过调用resolve函数将Promise推向已决阶段的resolved状态
    // 通过调用reject函数将Promise推向已决阶段的rejected状态
    // resolve和reject均可以传递最多一个参数，表示推向状态的数据
})

pro.then(data=>{
    //这是thenable函数，如果当前的Promise已经是resolved状态，该函数会立即执行
    //如果当前是未决阶段，则会加入到作业队列，等待到达resolved状态后执行
    //data为状态数据
}, err=>{
    //这是catchable函数，如果当前的Promise已经是rejected状态，该函数会立即执行
    //如果当前是未决阶段，则会加入到作业队列，等待到达rejected状态后执行
    //err为状态数据
})
```
```javascript
const pro = new Promise((resolve,reject)=>{
    console.log(123);
    reject(789)
}).then((data) => {
    console.log(data)
}).catch((err)=>{
    console.log(err)
}) 
```
//输出789，因为是把运行失败的IE过推向catch
```javascript
const pro1 = new Promise((resolve,reject)=>{
    
    setTimeout(()=>{
        resolve('在3秒后执行的resolve')
    },3000)
}).then((data) => {
    console.log(data)
}).catch((err)=>{
    console.log(err)
})//输出在3秒后执行的resolve，在3秒钟之前都是pending状态
```


**细节**

1. 未决阶段的处理函数是同步的，会立即执行
2. thenable和catchable函数是异步的，就算是立即执行，也会加入到事件队列中等待执行，并且，加入的队列是微队列
3. pro.then可以只添加thenable函数，pro.catch可以单独添加catchable函数
4. 在未决阶段的处理函数中，如果发生未捕获的错误，会将状态推向rejected，并会被catchable捕获
5. 一旦状态推向了已决阶段，无法再对状态做任何更改
6. **Promise并没有消除回调，只是让回调变得可控**

# Promise的其他api

## 原型成员 (实例成员)

- then：注册一个后续处理函数，当Promise为resolved状态时运行该函数
- catch：注册一个后续处理函数，当Promise为rejected状态时运行该函数
- finally：[ES2018]注册一个后续处理函数（无参），当Promise为已决时运行该函数

## 构造函数成员 （静态成员）

- resolve(数据)：该方法返回一个resolved状态的Promise，传递的数据作为状态数据
  - 特殊情况：如果传递的数据是Promise，则直接返回传递的Promise对象
  
- reject(数据)：该方法返回一个rejected状态的Promise，传递的数据作为状态数据

- all(iterable)：这个方法返回一个新的promise对象，该promise对象在iterable参数对象里所有的promise对象都成功的时候才会触发成功，一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败。这个新的promise对象在触发成功状态以后，会把一个包含iterable里所有promise返回值的数组作为成功回调的返回值，顺序跟iterable的顺序保持一致；如果这个新的promise对象触发了失败状态，它会把iterable里第一个触发失败的promise对象的错误信息作为它的失败错误信息。Promise.all方法常被用于处理多个promise对象的状态集合。

- race(iterable)：当iterable参数里的任意一个子promise被成功或失败后，父promise马上也会用子promise的成功返回值或失败详情作为参数调用父promise绑定的相应句柄，并返回该promise对象