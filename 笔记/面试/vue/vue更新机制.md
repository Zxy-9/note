# 奇葩说框架之 Vue更新机制

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ee4d68d23734de690ff6303ce51b9c9~tplv-k3u1fbpfcp-watermark.awebp)

## 前言

“世间万物都由分子构成。用气将万物的分子打散，分解眼前事物，再将分子重组，在短暂的瞬间，可以凝成时空停顿，甚至逆转时空。” 这句熟悉的电影台词想

必大家能猜出是哪一招武林绝学吧？是的，万事万物无时无刻不在变化，譬如与我们息息相关的DOM树，用“气”将树打散，再将树重组，我们的页面就动起来了！那么这股“气“和属于我们前端开发人员的武林秘籍又是什么呢？现在，就让我们一起去探寻究竟！

## 那肯定是Diff

说到Diff，我们可能首先想到的就是Vue或者React中的一种更新算法，目的就是为了找出差异更新DOM树。而算法本质上是一类问题的最优解，Diff本身是差分、不同的意思，还有诸如字符串或者JSON的Diff，Linux系统中经典的文件Diff。这里我们要探讨的其实就是树的Diff,它的发展历程其实是经过了很长的一段时间。

### Hi,story

树的Diff其实可以看做是求解树的编辑距离。 何为编辑距离，用维基百科上的解释就是：

> 在计算器语言学与计算机科学中，编辑距离通过计算将一个字符转化为例一个字符串所需的最小操作数来量化两个字符串差异程度。

例如：求解 lebron -> learn 的编辑距离

1. lebron -> learon (将b替换成a)
2. learon -> learn (删除o)

编辑距离为2

那么树的编辑距离同理就是将一棵树转化为另一棵树所需要的最小操作数来量化两棵树的差异程度：

![树的编辑距离示例](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/919f79e52c4f4877ad9e1d19c7037e5f~tplv-k3u1fbpfcp-watermark.awebp)

树的编辑距离示例

如上所示，很容易发现，求解树的编辑距离要比求解字符串的的编辑距离复杂的多，如何用更低的时间复杂度来求得这个解就经历了一个漫长的过程，从1979年的O(m^3n^3)到了如今的O(n^3)整整用了四十年的时间，至于最终的时间复杂度O(n^3)是如何计算出来的，这里有一篇论文，有兴趣可以了解一下，这里就不过多赘述了：

> [link.zhihu.com/?target=htt…](https://link.juejin.cn/?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%3A%2F%2Fvldb.org%2Fpvldb%2Fvol5%2Fp334_mateuszpawlik_vldb2012.pdf)

### 站在巨人的肩膀上

话锋一转，正当前端三剑客打得如火如荼难解难分之时，Angular虽有绝技脏脏拳傍身，却被React虚拟DOM与Diff相结合的组合拳打的鼻青脸肿、颓态尽显。Vue在一旁使出了慕容家失传已久的移花接木大法，以彼之道还施彼身...

开个玩笑，Angular虽然有各种独到的优势，但因为它真的太重加之一些不可抗力的原因逐渐退出了前端“主流“框架的舞台，React则一直勤勤恳恳修炼心法，单就更新机制，从15版本升级到16版本，Diff的运用做了升级，到17版本直接采用fiber链表优化性能。Vue也在2.0版本加入虚拟DOM与Diff算法来让我们更高效的使用框架，Vue3.0又做了一系列迭代升级。在这里，React与Vue都加入了Diff来提升性能，而这里所用的Diff则与传统的Diff不同，是改良后的“接地气”版本，何为接地气？

我们会发现，在WebUI中，DOM节点跨层级移动操作特别的少，以至于可以忽略不计，我们只需要找出同层DOM元素的差异即可，这就大大简化了传统的Diff算法，使时间复杂度一下从O(n^3)降到了O(n)，而这个时间复杂度O(n)版本的diff就是被我们津津乐道的接地气版本。

![同层对比](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/696baf3f17524c35b13a7aa6d5a014e3~tplv-k3u1fbpfcp-watermark.awebp)

同层对比

## 虚拟DOM与Diff过程

书接上回，既然理清了来龙去脉，我们就来窥探一下Vue的整个Diff过程。但在开始之前，不得不先了解一下虚拟DOM。就好比习武之人有了上乘的内功心法（算法），还需要独到的外家功夫才能行走江湖（Virtual DOM），二者合二为一才能天下无敌。

### Virtual DOM

虚拟Dom由一个个Vnode节点组成，代码如下：

```
export default class VNode {
  tag: string | void
  data: VNodeData | void
  children: ?Array<VNode>
  text: string | void
  elm: Node | void
  ns: string | void
  context: Component | void // rendered in this component's scope
  key: string | number | void
  componentOptions: VNodeComponentOptions | void
  componentInstance: Component | void // component instance
  parent: VNode | void // component placeholder node

  constructor(
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag                                /*当前节点的标签名*/
    this.data = data        /*当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息*/
    this.children = children  /*当前节点的子节点，是一个数组*/
    this.text = text     /*当前节点的文本*/
    this.elm = elm       /*当前虚拟节点对应的真实dom节点*/
    this.ns = undefined            /*当前节点的名字空间*/
    this.context = context          /*当前组件节点对应的Vue实例*/
    this.fnContext = undefined       /*函数式组件对应的Vue实例*/
    this.fnOptions = undefined
    this.fnScopeId = undefined
    this.key = data && data.key           /*节点的key属性，被当作节点的标志，用以优化*/
    this.componentOptions = componentOptions   /*组件的option选项*/
    this.componentInstance = undefined       /*当前节点对应的组件的实例*/
    this.parent = undefined           /*当前节点的父节点*/
    this.raw = false         /*简而言之就是是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false*/
    this.isStatic = false         /*静态节点标志*/
    this.isRootInsert = true      /*是否作为跟节点插入*/
    this.isComment = false             /*是否为注释节点*/
    this.isCloned = false           /*是否为克隆节点*/
    this.isOnce = false                /*是否有v-once指令*/
    this.asyncFactory = asyncFactory  
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }
复制代码
```

总结就是用JS对象对真实DOM节点的一个抽象，并且挂载了一些Vue内部所需要的属性，一些重要的属性也在代码里作了注释，理解起来不难。那么引入虚拟DOM的好处是什么呢？

- 一来肯定是减少对真实DOM进行操作，找出虚拟DOM的差异再进行更新，服务于Diff。
- 二则是更为重要的一点，也就是更好的跨平台支持，以及对SSR的支持。

### Vue 的 Diff

言归正传，整个Diff过程就在path.js这个文件里，流程大体如下：

![path流程](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3d20a725cd344bdb496a2d10de4fe88~tplv-k3u1fbpfcp-watermark.awebp)

path流程

首先需要生成一个patch函数，在这个函数里，开始需要判断一些边界条件：比如新的Vnode节点不存在并且老的Vnode存在，只需要调用销毁Vnode节点的Hook就可以,再比如老的Vnode节点不存在，则直接调用新建函数生成节点即可。如果新老节点都存在并且通过sameVnode函数判断为true，则再进行diff操作，否则也直接去新建节点并替换。sameVnode主要是判断新老VNode是否是相同：

```
function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}
复制代码
```

首先判断key是否一致，其次同步组件需要判断是否同为注释节点或都不是注释节点、数据信息是否存在、Input类型是否一致，而异步组件需要判断工厂函数是否一致。

Diff就在不一致时发生，核心就在updateChildren这个函数，代码如下：

```
function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    let oldStartIdx = 0
    let newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx, idxInOld, vnodeToMove, refElm
    const canMove = !removeOnly
    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh)
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx]
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
        oldStartVnode = oldCh[++oldStartIdx]
        newStartVnode = newCh[++newStartIdx]
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]
      } else {
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
        } else {
          vnodeToMove = oldCh[idxInOld]
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
            oldCh[idxInOld] = undefined
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
          }
        }
        newStartVnode = newCh[++newStartIdx]
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx)
    }
  }
复制代码
```

这段代码其实认真阅读一遍也不难理解，主要是对新老Vnode子节点序列的一个更新操作：首先定义了四个首尾游标，然后将子序列进行遍历，每次遍历都做if esle的判断，分为六部分(下面的文字叙述有点像绕口令，建议直接看后面的图解)：

1. 旧子序列的首节点为空，旧序列首游标后移。旧子序列的尾节点为空，旧序列尾游标前移（游标都是往中间移动的）。
2. 新子旧序列的首节点是相同节点，新子旧序列首游标同时向后移动。
3. 新子旧序列的尾节点是相同节点，新子旧序列尾游标同时向前移动。
4. 新子序列尾节点与旧子序列首节点相同，将旧子序列首节点插入到尾节点之前。旧子序列首游标后移，新子序列尾游标前移。
5. 旧子序列尾节点与新子序列首节点相同，将旧子序列尾节点插入到首节点之前。新子序列首游标后移，旧子序列尾游标前移。
6. 以上条件均不满足，从所有旧子节点序列里遍历寻找是否有与当前新子序列首节点相同的节点，如果有则将该节点插到对应位置，否则创建一个新节点插入。新子序列首游标后移。

看懵了吧？ 我看我也懵... 下面就用一个例子来执行一下diff的更新，一图胜千言！

图解示例：

![初始化](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4867acfdb0545a281eb5db5f6634f5d~tplv-k3u1fbpfcp-watermark.awebp)

首首相同，游标后移。 ![首节点相同](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a476baf5e381471da994ab123197edce~tplv-k3u1fbpfcp-watermark.awebp)

首首不同，尾尾不同，旧首新尾不同，旧尾新首同！就把尾节点插入到首节点前。 ![旧尾节点和新首节点相同](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6606acaeb12a4655bed9569e0c51eb4a~tplv-k3u1fbpfcp-watermark.awebp)

游标移动，此时变成下面的样子，继续比较发现尾尾是相同的,尾游标前移。 ![尾节点相同](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91708c78d64d4eaaa52cdc18f3d6cefe~tplv-k3u1fbpfcp-watermark.awebp)

移动后，继续判断，发现旧尾节点和新首节点相同，移动节点插入，游标移动。 ![旧尾节点和新首节点相同](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d03da28ab6b45dc94af0a9430bb1602~tplv-k3u1fbpfcp-watermark.awebp)

首首相同，游标后移。 ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e342772d2bb441d7961350e61a2fa0eb~tplv-k3u1fbpfcp-watermark.awebp)

首游标都大于等于尾游标的数值，退出循环。 ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83328b67c82940c3907ecca5f099a7ec~tplv-k3u1fbpfcp-watermark.awebp)

最后，旧首游标是大于旧尾游标的，将新子序列首尾游标之间的节点（也就是O）生成并插入。 ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42b60a4b23df438caa010a9f62309538~tplv-k3u1fbpfcp-watermark.awebp)

自此，一遍Diff就过完了，其中还有一些分支没走到，但都是这种节点增删插入的把戏。

## 升级！

随着Vue3.0版本的发布，我们在使用或者对其源码进行阅读时会惊讶的发现，它又又又双叒叕变强了，尤大本人在直播中也提到新的Vue会比老的Vue有1.3到2倍的提升，它的更新机制会更加的快速敏捷。下面就抛砖引玉，给大家稍微介绍下在更新机制方面主要升级的两个点：

### 节点移动优化

要从一道算法题说起：

> 在一个给定的数组中，找到一组递增的数值，并且长度尽可能的大。

有点比较难理解，那来看具体例子：

const arr = [10,9,2,5,3,7,101,18]

[2, 3, 7, 18]这一列数组就是arr的最长递增子序列，其实[2, 3, 7, 101]也是。 所以最长递增子序列符合三个要求：

1. 子序列内的数值是递增的
2. 子序列内数值的下标在原数组中是递增的
3. 这个子序列是能够找到的最长的

但是我们一般会找到数值较小的那一组数列，因为他们可以增长的空间会更多。

想必读完题目，大家就会发现：”这不就是求解最长递增子序列嘛？力扣都刷吐了的题了，小菜一碟。“如果是这样的话，那这个节点移动优化也就不难理解了。是的，Vue3.0就运用了求解这个问题的基础算法来实现diff过程中的更新优化，目的就是找到顺序排列的不需要变动的节点，使更新操作变得更少,如下图的LBN三个节点。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc9a64d2cf8542af84dc080ab4888e6e~tplv-k3u1fbpfcp-watermark.awebp)

### patchFlags

首先解释下什么是patchFlags, patchFlag 是 complier 时的 transform 阶段解析 AST Element 打上的优化标识。并且，顾名思义 patchFlag，patch 一词表示着它会为 runtime 时的 patchVNode 提供依据，从而实现靶向更新 VNode 的效果。因此，这样一来一往，也就是耳熟能详的 Vue3 巧妙结合 runtime 与 compiler 实现靶向更新和静态提升。代码里，patchFlag 被定义为一个数字枚举类型，每一个枚举值对应的标识意义会是这样：

```
export const enum PatchFlags {
  
  TEXT = 1,// 动态的文本节点
  CLASS = 1 << 1,  // 2 动态的 class
  STYLE = 1 << 2,  // 4 动态的 style
  PROPS = 1 << 3,  // 8 动态属性，不包括类名和样式
  FULL_PROPS = 1 << 4,  // 16 动态 key，当 key 变化时需要完整的 diff 算法做比较
  HYDRATE_EVENTS = 1 << 5,  // 32 表示带有事件监听器的节点
  STABLE_FRAGMENT = 1 << 6,   // 64 一个不会改变子节点顺序的 Fragment
  KEYED_FRAGMENT = 1 << 7, // 128 带有 key 属性的 Fragment
  UNKEYED_FRAGMENT = 1 << 8, // 256 子节点没有 key 的 Fragment
  NEED_PATCH = 1 << 9,   // 512
  DYNAMIC_SLOTS = 1 << 10,  // 动态 solt
  HOISTED = -1,  // 特殊标志是负整数表示永远不会用作 diff
  BAIL = -2 // 一个特殊的标志，指代差异算法
}
复制代码
```

这样定义有一个好处，就是一个节点可能是多个类型，那么只需要将多个类型的值做一次按位或就可以了。

例如：一个节点既是文本节点，又带有事件监听器

那么这个节点最终的属性值则为：

```
      文本节点       0000 0001
      
                      按位或
                      
      事件监听       0001 0000
      
      最终的值       0001 0001
复制代码
```

十进制表示为33，有了这个值我们就可以在更新节点时进行相应的处理了。 在判断该节点是否是这个类型时，只需要将该节点的值33和这个类型的值做一次与运算之后看看是否跟这个值相同即可。

例如：

1. 证明33这个节点是否是文本节点？(33 & 1) === 1 为true,则是文本节点
2. 证明33这个节点是否为事件监听？(33 & 32) === 32 为true,则为事件监听节点
3. 证明33这个节点不是动态的style节点？(33 & 4) === 4 为false,则不是动态style节点

至此，Vue的更新机制就大体上了解了一遍，还有很多细枝末节没有涉及，自己对一些地方的理解可能有错误，欢迎大家留言评论。 欲知后事如何，且听下回分解~

## 参考

[1] react的diff 从O(n^3)到 O(n) ，请问 O(n^3) 和O(n) 是怎么算出来？`https://www.zhihu.com/question/66851503/answer/246766239`

[2] Vue3 Compiler 优化细节，如何手写高性能渲染函数。`https://zhuanlan.zhihu.com/p/150732926`