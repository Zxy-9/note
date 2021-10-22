# JavaScript Array splice() 方法

- [sort()](https://www.w3school.com.cn/jsref/jsref_sort.asp)
- [toString()](https://www.w3school.com.cn/jsref/jsref_tostring_array.asp)
- [JavaScript Array 参考手册](https://www.w3school.com.cn/jsref/jsref_obj_array.asp)

## 实例

将项目添加到数组：

```
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2, 0, "Lemon", "Kiwi");
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jsck_splice_1)

页面下方有更多 TIY 实例。

## 定义和用法

splice() 方法向/从数组添加/删除项目，并返回删除的项目。

**注释：**splice() 方法会改变原始数组。

## 浏览器支持

所有浏览器都完全支持 splice() 方法：

| Chrome |  IE  | Edge | Firefox | Safari | Opera |
| :----: | :--: | :--: | :-----: | :----: | :---: |
| Chrome |  IE  | Edge | Firefox | Safari | Opera |
|  Yes   | Yes  | Yes  |   Yes   |  Yes   |  Yes  |

## 语法

```
array.splice(index, howmany, item1, ....., itemX)
```

### 参数值

| 参数                | 描述                                                         |
| :------------------ | :----------------------------------------------------------- |
| *index*             | 必需。整数，指定在什么位置添加/删除项目，使用负值指定从数组末尾开始的位置。 |
| *howmany*           | 可选。要删除的项目数。如果设置为 0，则不会删除任何项目。     |
| *item1, ..., itemX* | 可选。要添加到数组中的新项目。                               |

## 技术细节

| 返回值：          | 新数组，包含删除的项目（如果有）。 |
| ----------------- | ---------------------------------- |
| JavaScript 版本： | ECMAScript 1                       |

## 更多实例

### 实例

在位置 2，添加新项目，并删除 1 个项目：

```
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2, 1, "Lemon", "Kiwi");
```

[亲自试一试](https://www.w3school.com.cn/tiy/t.asp?f=jsck_splice_2)

### 实例

在位置 2，删除 2 个项目：

```
var fruits = ["Banana", "Orange", "Apple", "Mango", "Kiwi"];
fruits.splice(2, 2);
```