# set 集合

> 一直以来，JS只能使用数组和对象来保存多个数据，缺乏像其他语言那样拥有丰富的集合类型。因此，ES6新增了两种集合类型（set 和 map），用于在不同的场景中发挥作用。

**set用于存放不重复的数据**

1. 如何创建set集合

```js
new Set(); //创建一个没有任何内容的set集合

new Set(iterable); //创建一个具有初始内容的set集合，内容来自于可迭代对象每一次迭代的结果

        let s1 = new Set() //输出set(0)
        let s2 = new Set([1,2,3,4,5]) //输出set(5){(1,2,3,4,5)}
        let s3 = new Set([1,1,2,3,4,5]) //输出set(5){(1,2,3,4,5)} ,自动去重

```

2. 如何对set集合进行后续操作

- add(数据): 添加一个数据到set集合末尾，如果数据已存在，则不进行任何操作
  - set使用<font color=red>Object.is</font>的方式判断两个数据是否相同，但是，针对+0和-0，set认为是相等
```js
   let s3 = new Set([1,1,2,3,4,5]) 
    s3.add([6,5,7]) //把整个数组添加到后面
    s3.add(5) //去重，输出1,2,3,4,5
```

- has(数据): 判断set中是否存在对应的数据
```js
   let s3 = new Set([1,1,2,3,4,5]) 
   s3.has(5) //true
```
- delete(数据)：删除匹配的数据，返回是否删除成功
```js
   let s3 = new Set([1,1,2,3,4,5]) 
   s3.delete(5) //true，在输出s3的时候就不会显示3
```

- clear()：清空整个set集合
```js
   let s3 = new Set([1,1,2,3,4,5]) 
   s3.clear() 
```
- size: 获取set集合中的元素数量，只读属性，无法重新赋值
```js
   let s3 = new Set([1,1,2,3,4,5]) 
   console.log(s3.size) //输出5
```

3. 如何与数组进行相互转换

```js
const s = new Set([x,x,x,x,x]);
// set本身也是一个可迭代对象，每次迭代的结果就是每一项的值
const arr = [...s];



```
数组去重的小案例
```js
   const arr= [1,6,3,4,5,6,7,7,4,5,6]
const s1 = new Set(arr)
const arr2 = [...s1]  //展开运算符可以展开可迭代对象
console.log(arr2) 
```

4. 如何遍历

1). 使用for-of循环
```js
     
        let s2 = new Set([1,2,3,4,5]) 
 
        for(const item of s2){
            console.log(item)
        }
```
2). 使用set中的实例方法forEach
```js
   let s2 = new Set([1,2,6,3,4,5]) 
 
     s2.forEach((res,index,s)=>{
         console.log(res)
         console.log(index) //这里不是下标，由于set集合中不存在下标，和上面的res输出一样
         console.log(s)
     })
```

注意：set集合中不存在下标，因此forEach中的回调的第二个参数和第一个参数是一致的，均表示set中的每一项
###set的应用
把两个数组并集
```js
  const arr1 = [1,22,4,5,6,77,8,44,1,2,22]
        const arr2 = [1,2,88,99,66,4,5,1,2]

        const newArr = new Set(arr1.concat(arr2))
        console.log(...newArr)

```
把两个数组交集

