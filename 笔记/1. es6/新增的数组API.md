# 新增的数组API

## 静态方法

- Array.of(...args): 使用指定的数组项创建一个新数组
```js
 const arr =   Array.of(1,2,3,4,4)
      console.log(arr)
      //如果利用数组的构造函数
      const arr1 = new Array(1)//此时表示的是新建数组的长度为1
      
```

- Array.from(arg): 通过给定的类数组 或 可迭代对象 创建一个新的数组。

## 实例方法

- find(callback): 用于查找满足条件的第一个元素
```js
  const arr1 = [
        {
          name:1,
          age:18
        },
        {
          name:2,
          age:18
        },
        {
          name:3,
          age:18
        },
        {
          name:4,
          age:18
        },
        {
          name:5,
          age:18
        }
      ]
      const newAge = arr1.find(item=>{
        if(item.name = 2){
          return true
        }else{
          return false
        }
      })
      console.log(newAge) //{name:2,age:18}
```

- findIndex(callback)：用于查找满足条件的第一个元素的下标
- fill(data)：用指定的数据填充满数组所有的内容
```js
//创建一个长度为100，且每一项都是abc的数组
const newArr = new Array(100)
newArr.fill("abc")
```

- copyWithin(target, start?, end?): 在数组内部完成复制
- includes(data)：判断数组中是否包含某个值，使用Object.is匹配