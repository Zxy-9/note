#request对象

除了使用基本的fetch方法，还可以通过创建一个Request对象来完成请求，实际上，fetch的内部会帮你创建一个request对象

```js
new Request(url地址,配置)
```