资料来源视频：[用vue想拿20k，面试题要这样答](https://link.juejin.cn?target=https%3A%2F%2Fwww.bilibili.com%2Fvideo%2FBV1B64y1h7t7) 文章是在看完视频之后总结的笔记 这个视频我觉得他将的好是在于直接去解析vue的源码，从源码分析问题，简而易懂且有说服力。

总结：一共9节9个小知识点

> 1、v-if和v-for的比较 2、vue组件data函数形式 3、key的作用 4、diff算法 5、组件化 6、vue设计理念 7、MVC MVP 和MVVM 8、vue优化 9、vue3特性

## 1、v-if和v-for的那个优先级更高，如果两个同时出现，应该怎么优化得到更好的性能

先上结论：**v-for优先于v-if被解析**

经过评论区大佬指导 更改结论为：

**2.x 当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。**

**3.x当 v-if 与 v-for 一起使用时，v-if 具有比 v-for 更高的优先级**。 ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d1857ae14554138bcabb325443a9f13~tplv-k3u1fbpfcp-watermark.awebp) 注：-l：是列表渲染的函数 return才是最终的结果， 查看vue源码：路径为src/compiler/codegen/index.js文件中发现 ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/361c70a120724778949185a16b6535dd~tplv-k3u1fbpfcp-watermark.awebp) 在源码中发现 先处理静态节点（staticRoot） 然后处理once 最后才会处理for 代码显示for优先于if 断点调试之后也是证实for优先于if 结论： **1、v-for优先于v-if被解析（把你怎么知道的告诉面试官，看过源码）** **2、如果同时出现，每次渲染都会先执行循环在判断条件，无论如何循环都不可避免，浪费了性能** **3、要避免出现这种情况，在外层嵌套template，在这一层进行v-if判断，然后在内部进行v-for循环**

## 2、vue组件data为什么必须是个函数，而vue根实例则没有此限制？

先上结论： **1、data必须是个函数是保证在多实例的时候，为了保护相互之间的状态不干扰，不污染。** **2、每次在创建根实例的时候，使用new的方式，全局的范围内只创建一个，不会创建多个，不会存在污染的问题，因此可以不使用函数**

> 函数每次执行都会返回全新的data对象实例

测试代码如下： ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/43f5ef29a2e64132ad77e76d6441ab62~tplv-k3u1fbpfcp-watermark.awebp)

数据初始化是在：src/core/instance/init.js文件中 ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe4fd57a20cb4a8c8761375db25f8dca~tplv-k3u1fbpfcp-watermark.awebp) 重点在于initData函数中 研究源码发现： ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc0212bf30e8494787ec9dfd2227a45c~tplv-k3u1fbpfcp-watermark.awebp) 116行 这里会对data做一个判断，如果data是function类型的则执行。并把结果作为data选项的值， 否则就使用用户设置的data 在上面的测试案列中 vue.component的comp属性其实只执行了一次也就是说第二个参数选项在被处理的时候，只会处理一次，data的选项指向的都是同一个地方，一个组件的不同实例使用的其实就是一个data，由此产生了数据污染， 如果是一个组件，组件中的data不能像测试中那样设置

每次在创建根实例的时候，使用new的方式，全局的范围内只创建一个，不会创建多个，不会存在污染的问题，因此可以不使用函数，

在多实例的时候，为了保护相互之间的状态不干扰，不污染。vue的根实例所以需要使用function函数

结论：

> **vue组件可能存在多个实例，如果使用对象心事定义data，则会导致他们共用一个data对象，那么状态变更将会影响所有的组件实例，这是不合理的；采用函数形式定义没在initData是会将其作为工厂函数返回全新data对象，有效规避多实例之间的状态污染问题，而在vue根实例创建过程中则不存在改限制，也是因为根实例只能有一个，不需要担心这种问题**

## 3、key工作原理，说说对它的理解

> 源码中找答案：src/core/vdom/patch.js-updateChildren()

正常回答是：可以唯一确定一个dom元素，从而执行diff算法更高效 案例分析：执行2秒后在c的前面插入f ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa58b06088ee430fad197fe58a343f65~tplv-k3u1fbpfcp-watermark.awebp)

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d332d06c3fde4e22b847cbc2a873e118~tplv-k3u1fbpfcp-watermark.awebp)

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef909be432e94d9aae6d5af28b5d2c6c~tplv-k3u1fbpfcp-watermark.awebp) 如果不使用key 更新了3次 一次插入操作 使用了key只做了一次插入操作

结论：

> 1、key的作用主要是为了高效的更新虚拟DOM，其原理是vue在patch过程中通过**key可以精准的判断两个节点是否是同一个，从而避免频繁更新不同元素，使得整个patch过程更加高效，减少了dom的操作量**，提高性能
>
> 2、如果不设置key可能在列表更新时引发一些隐藏的bug 比如说更新和不更新看不出来。
>
> 3、vue中在使用相同标签名元素的过渡切换是，也会用到key属性，其目的也是为了让vue可以区分他们，否则vue只会替换其内部属性而不会触发过渡效果。需要用key来作为唯一性的判断。

## 4、怎么理解vue中的diff算法

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b823e4e04a9e454398771abd75cd3696~tplv-k3u1fbpfcp-watermark.awebp) 总结： diff算法：并非vue中专用，凡是涉及到虚拟dom中都有diff算法 必要性：diff算法能精确的比较新旧虚拟DOM中的key的变化，从而提高更新效率 执行方式：深度优先，同级比较 高效性： 查看源码：

### **1、diff算法必要性：**

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8ad4cf0d1fc4bc299512acb791c8908~tplv-k3u1fbpfcp-watermark.awebp) 分析：任何一个vue组件实例，再去创建完成之后，去挂载的时候调用的，一个组件调用一次mounted，同时也会调用右侧watcher，在vue中 watcher的实例和vue的实例是一一对应的。

结论：**组件中存在多个data中key的使用，怎么确保key发生了变化，执行diff算法就可以比较新旧两次虚拟dom的比较，为了精确的知道**

### 2、diff算法的执行方式

核心源码：586行开始 ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/caf5fa04541d4da895d6f48f6f226d5e~tplv-k3u1fbpfcp-watermark.awebp) 分析：patchVnode是diff发生的地方，整体策略：**深度优先，同层比较**， 先开始比较根节点，看看是否有子节点，如果都有，更新子节点 在比较子节点，直到底层。 具体代码 ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f89d58f697a54872965a508af551a6a2~tplv-k3u1fbpfcp-watermark.awebp) ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e7d274289fde445796a311e37876eac5~tplv-k3u1fbpfcp-watermark.awebp) ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3373bf9b382b4a5ebbe28ca67727a45a~tplv-k3u1fbpfcp-watermark.awebp) 如果找到直接更新子节点，如果没有就看有其他的操作，

### 3、diff算法的高效性：

就是上面提到的updateChildern（）

总结： 1、diff算法是虚拟DOM技术的必然产物：通过新旧虚拟DOM做对比（既diff），将变化的地方更新在真实DOM上，另外，也需要diff高效的执行对比过程，从而降低时间复杂度为O（n） 2、vue2.0x中为了降低watcher粒度，每个组件只有一个watcher与之对应，只有引入diff才能精确的找到发生变化的地方 3、vue中diff执行的时刻是组件实例执行更新函数时，它会对比与上一次渲染结果oldVnode和新的渲染结果，此过程称为patch 4、diff过程整体遵循深度优先，同层次比较的策略，两个节点之间比较会根据他们是否拥有子节点或者文本节点做不同操作，比较两组子节点是算法重点，首先假设头部节点可能相同做4次对比尝试，如果没有找到相同节点才按照通用的方式去进行遍历查找，查找结束再按情况处理剩下的节点，借助key通常可以非常精确找到相同节点，因此整个patch过程非常高效。

## 5、vue组件化的理解

总体回答思路： **组件化定义，优点，使用场景和注意事项**等方面展开称述，同时要**强调vue组件化中一些特点**

### 1、源码分析：组件定义

把一些独立的功能单独提出来，有独立的函数，方便复用 vue中常见的定义第一种是全局定义 第二种是单文件组件的定义 ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17c8eeffced045bf88aee2005aa7dc5c~tplv-k3u1fbpfcp-watermark.awebp) 源码：src/global/assets.js/ ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/201fea322ffc46a1af04120312b2f777~tplv-k3u1fbpfcp-watermark.awebp) ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1407888633f6464a99a7ebe8692f2985~tplv-k3u1fbpfcp-watermark.awebp)

### 2、源码分析：组件化优点

源码：lifecycle.js-mountComponent() 组件化优点：维护性 测试性，复用性，从组件 Watcher，渲染函数中去分析 在执行组件的时候，每一个组件会对应一个watcher，组件边变化的时候只会调用组件里面的渲染函数，可以把经常发生数据变化的单独放一个组件中，后期只需要执行这一个函数，起到局部刷新的作用。

### 3、组件化的实现

构造函数：src/core/global-api/extend.js 实例化及挂载：src/core/vdom、patch.js-createElm() ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa61432944fa40bab16c99ae65765350~tplv-k3u1fbpfcp-watermark.awebp)总结 1、组件是**独立和可复用的代码组织单元**。组件系统是vue核心特性之一，它使得开发者使用小型，独立和通常可复用的组件构建大型应用 2、组件化开发能大幅度提高应用开发效率，测试性，复用性等 3、组件使用按分类有：页面组件，业务组件，通用组件 4.vue的组件是基于配置的，我们通常编写的组件是组件配置而非组件，框架后续会生成与其构造函数，他们基于vueComponent。扩展与vue 5、vue中常见组件化技术有：属性prop 自定义事件。插槽等，他们主要用于组件通信，扩展等 6、合理的划分组件，有助于提升应用性能 7.组件内应该是高内聚，低耦合的 8、遵循单向数据流的原则

## 6、vue设计原则的理解

vue的官网上写了定义和特点： vue是一个渐进式的javscript框架 易用，高效，灵活

根据这个两个点去回答 渐进式javascript框架：

> 跟其他大型框架不同的是，vue被设计为可以自底向上逐层应用。vue的核心库只关注视图层，不仅易于上手，还便于与第三方库活既有的项目整合，另一方面，当现代的工具链以及各种支持类库结合使用的时候。vue也完全能够为复杂的单页面提供驱动 核心库就是一些声明是的渲染，组件系统 只关注视图层 可以作为一个库在其他项目中去用，也能作为一个大型的框架去搭建项目，这就是渐进式 学习过程也是渐进式的，只学习模板语法，基础功能也能开发，后期才学习工程化，

易用性：

> vue提供数据响应式，声明式模板语法和基于配置的组件系统等核心特性，这些使我们只需要关注应用的核心业务即可，只要会写js。html和css就能轻松编写vue应用

灵活性：

> 渐进式框架最大的优点就是灵活性，如果应用足够小，我们可能仅仅需要vue的核心特性就能去完成功能了，随着应用规模的不断扩大，我们才可能追歼引入路由，状态管理，vue-cli等库和工具，不管是应用体积还是学习难度都是一个逐渐增加的平和曲线

高效性：

> 超快的虚拟DOM和diff算法使我们的应用有最佳的性能表现， 追求更高效的过程还在继续，vue3中引入proxy对数据响应式的改进以及编译器中对于静态内容的改进都会让vue更加高效

## 7、MVC MVP 和MVVM的理解

答题思路：

> 涉及的知识点比较多，很难说清楚，说透，因为mvc MVp这些模式我们前端程序员自己都没用过，当时恰恰反应了这些年全从无到有，从有到优的变化过程，沿着这个思路来回答

### **web1.0时代**

在web1.0时代 并没有前端的概念。开发用过web应用多数采用ASP.NET、java PHP 项目通常有多个aspx/jsp/hph的单文件去组成，每个文件都有html css js或者java代码 ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/404264c1c6f04a3fbe67e5f20ba545fb~tplv-k3u1fbpfcp-watermark.awebp)

为了让开发更加便捷，代码易于维护，前后端职责清晰，出现吗MVC 开发模式和框架。前端展示模板的形式出现的典型的框架就是Spring Structs Hibernate （SSH） ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb8b39301d8f486fab77761e16e348f2~tplv-k3u1fbpfcp-watermark.awebp) 目标就是把数据，视图，业务逻辑控制分层，便于维护和读写，前端只完成后端中的view层 但是还是吧所有代码逻辑放在服务端， 存在问题：1、前端页面开发效率不高，2、前后端职责不清晰

### **web2.0时代**

自从Gmail的出现 ajax技术开始出现。前后端职责就更加清晰了，因为前端可以通过ajax与后端进行整体的数据交互，因此，整体的架构图也变化成了： ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8bddc2eaccb14a3ea64b1effabc1b195~tplv-k3u1fbpfcp-watermark.awebp) 前端只需要开发页面内容。数据由后台提供，而且项目能实现ajax可以使得页面实现部分刷新，减少了服务端负载和流量的消耗，很多渲染从服务端变成了客户端，前端也发展了一些库 jquery

存在问题： 缺乏可行的开发模式承载更复杂的业务需求，页面内容都糅杂在一起，一旦应用规模增加，就会导致难以维护，因此，前端的MVC也随之到来

**前后端分离的架构演变：MVC MVP MVVM** MVC 前端的MVC与后端类似，具备View，Controller和Model Model：负责应用数据的保存。与后端数据进行同步 Contoller：负责业务逻辑，根据用户行为对Model数据进行修改 View：负责视图展示。将model中的数据可视化出来 模型： ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ecd6531c12384911b9d339b7cdf937fe~tplv-k3u1fbpfcp-watermark.awebp) 理论上是可行的，可是实际上并不方便，然后慢慢演变 （下面这个还是mvc） ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/841d39ffe8d240469c08cce85f4b9118~tplv-k3u1fbpfcp-watermark.awebp) 这样的模式也可能带来一些问题： 1、数据流混乱 ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29a4695301f947ccb223c0236ef0283f~tplv-k3u1fbpfcp-watermark.awebp) 如图 view比较庞大，controller比较单纯，由于很多开发者会在view中写一些逻辑的代码 逐渐导致view中的内容会越来越大，而controller变的越来越单薄 前端的变化中 似乎少了mvp这种模式。是因为Angular早早的把MVVM模式代入前端 跳过了MVP

MVP MVP与mvc很接近 P指的是Persenter 理解为一个中间人，他负责view和model之间的数据流，防止view好emodel之间直接交流， ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f892babfb47408db40ebb0efe400059~tplv-k3u1fbpfcp-watermark.awebp) P负责和M还有V进行双向交互，view变成了被动视图，而且本身编的很小，分离了v和m，但是应用变的很大，导致P的体积增大，难以维护。

MVVM ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6159ef64ef1a4bbba26eec9741176ac0~tplv-k3u1fbpfcp-watermark.awebp) mvvm核心是中间的vm层： ViewModel通过实现一套数据相应式机制自动响应Model中数据变化。同时ViewModel会实现一套更新侧率自动将数据变化转化为视图更新 通过时间监听响应View中用户交互修改Model中数据。 这样在ViewModel中就减少了大量DOM操作代码 MVVM在保持view和Model松耦合的同时，还减少了维护他们的关系的代码，使用用户专注于业务逻辑，兼顾开发率和可维护性

总结： 1、这三者都是框架模式，他们的设计目标都是为了解决Model和View的耦合问题 2、MVC模式出现较早主要应用在后端，如Spring MVC ASP.NET MVC等，有点是分层清晰，缺点是数据流混乱，灵活性带来的维护问题 3.MVP模式在MVC的进化形式，	Presenter作为中间层负责MV通讯，解决了两者的耦合问题，但p层过去臃肿会导致维护问题 4、MVVM模式在前端领域有广泛应用，他不仅解决了MV耦合问题，还同时解决了维护两者射影关系的大量繁杂代码和DOM操作，也就是说不用去挨个改变DOM操作了，在提高开发效率，可读性同时还保持了优越的性能表现

## 8、你了解哪些vue的性能优化方法

主要讨论vue层面的优化

### 1、路由懒加载：

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d62cf5ff94ac436b89c7dd0943055c12~tplv-k3u1fbpfcp-watermark.awebp)

### 2、keep-alive缓存页面

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d088e95303f4a799a3484b511c76959~tplv-k3u1fbpfcp-watermark.awebp)

### 3、使用v-show复用DOM

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8784795424a647a5a3609b71344b7a5b~tplv-k3u1fbpfcp-watermark.awebp)

### 4、v-for遍历避免同时使用v-if

计算属性提前把数组进行过滤 ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23daa3f19ced4301971d0c2cbf465b39~tplv-k3u1fbpfcp-watermark.awebp)

### 5、长列表性能优化

如果列表纯粹是显示数据 不会有改变 数据就不需要响应式 ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5f2b1bb39ed4f319a9155f022689ee1~tplv-k3u1fbpfcp-watermark.awebp) 使用freeze方法进行冻结，或者更改属性为false

如果是大数据列表，可以采用虚拟滚动，只渲染少部分区域内容 ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/13c2558ae0a24a98bbf8cbdc1b2ad40e~tplv-k3u1fbpfcp-watermark.awebp) 参考第三方组件

### 6、事件销毁

vue组件销毁时，会自动解绑他的全部指令及事件监听器，但仅限于组件本身的事件 ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56455b1e8c0346e282f65f297f8d0d78~tplv-k3u1fbpfcp-watermark.awebp)

### 7、图片懒加载

对于图片过多的页面 为了加速页面的加载速度，所以很多时候我们需要将页面内未出现在可视区域内的图片不做加载，等到滚动到可视区域之后再去加载 ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bec2fd9c22e9499f9611ec7d41791a3e~tplv-k3u1fbpfcp-watermark.awebp)

### 8、第三方插件按需导入

像element-ui这样的第三方组件库可以按需映入避免体积太大 ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5edf7dff4e21485d9f65b6d960337d20~tplv-k3u1fbpfcp-watermark.awebp) 使用bable的插件

### 9、无状态组件标记为函数式组件

展示型组件 ，这样的话就没有实例 标记functional ![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5025a7f6539f40cd87c4f1cf6b7a7576~tplv-k3u1fbpfcp-watermark.awebp)

### 10.子组件分割

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f28bac0509b40e4958e0f6408a7d016~tplv-k3u1fbpfcp-watermark.awebp) 子组件中有一些比较耗时的就单独分割成为一个组件，自己做自己的渲染，不会影响其他的组件

### 11、变量本地化

![在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/388bb0cdf4fc422799c88f4b6d8a5937~tplv-k3u1fbpfcp-watermark.awebp) reault实际上是computed出来的属性 同时也是base的属性 base属性比较耗时，

### 12 、SSR

服务端渲染。

## 9 vue3.0的新特性

更快：

> **虚拟DOM重写** 优化slots的生成 静态树提升 静态属性提升 **基于Proxy的响应式系统**

更小：

> 通过摇树优化核心库体积 静态节点标记出来 减少重写

更容易维护：

> TypeScript+模块化

更加友好：

> 跨平台：编译器核心和运行核心与平台无关，使得vue更容易与任何平台（web Android IOS）一起使用

更容易使用：

> 改进的TypeScript支持，编辑器能提供强有力的类型检查和错误及警告 更好的调试支持 独立的响应式模块 CompositionAPI

重点提出几个方向来写： **虚拟DOM重写** 期待更多的编译时提示来减少运行时的开销，使得有效代码来创建虚拟节点 组件快速路劲+单个调用+子节点类型检测 跳过不必要的条件分支 JS引擎更容易优化

**优化slots生成** vue3中可以单独重新渲染父级和子级 确保实例正确的跟踪依赖关系 避免不必要的父子组件重新渲染

**静态树提升 （staticTree Hoisting）** 使用静态树提升，意味着vue3的编译器将能够检测到什么是静态的 然后将其提升，从而降低了渲染成本、 跳过修补整棵树，从而降低渲染成本 即使多次出现也能正常工作

**静态属性提升** 使用静态属性的提升，vue3打补丁的时候将跳过这些属性不会改变的节点 孩子还需要继续改变

**基于Proxy的数据响应式** vue2.0使用的是Object.definfPropertyde getter 和setter  vue3将使用ES6中的Proxy作为观察机制： 组件实例初始化速度提100% 使用Proxy节省以前一半的内存太小，就爱快速度，但存在低浏览器版本不兼容，为了继续支持IE11 vue3将发布一个就观察者机制 和新的Proxy版本构建

**高可维护性** vue3将带来更可维护性的源代码，不仅使用Typescript 而且还许多包被解耦 更加模块化

> 今天是国庆最后一天啦，沉寂了很久最近也要开始认真学习了，得有三个多月没好好写博客做笔记了，最近也开始新的规划准备写新的系列了。主要还是vue一些底层原理和算法吧。秋招已经落下帷幕，目前已经稳定了，继续学习 准备春招，能看到这里的同学一定很棒，学习的道路很难，但是难得时候说明你在走上坡路，加油，一定会活成你想要的样子的！！！


作者：十九万里
链接：https://juejin.cn/post/7017693252820303903
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。