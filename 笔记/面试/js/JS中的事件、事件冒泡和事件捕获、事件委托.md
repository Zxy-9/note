**https://www.cnblogs.com/diver-blogs/p/5649270.html**

**https://www.cnblogs.com/Chen-XiaoJun/p/6210987.html**

## [JavaScript事件模型及事件代理](https://www.cnblogs.com/diver-blogs/p/5649270.html)

# 事件模型

　　JavaScript事件使得网页具备互动和交互性，我们应该对其深入了解以便开发工作，在各式各样的浏览器中，JavaScript事件模型主要分为3种：原始事件模型、DOM2事件模型、IE事件模型。

## 　　1.原始事件模型（DOM0级）

　　　　这是一种被**所有浏览器都支持的事件模型**，对于原始事件而言，**没有事件流**，事件一旦发生将马上进行处理，有两种方式可以实现原始事件：

　　　　　　（1）在html代码中直接指定属性值：<button id="demo" type="button" onclick="doSomeTing()" />　　

　　　　　　（2）在js代码中为　document.getElementsById("demo").onclick = doSomeTing()

　　　　优点：所有浏览器都兼容

　　　　缺点：1）逻辑与显示没有分离；2）相同事件的监听函数只能绑定一个，后绑定的会覆盖掉前面的，如：a.onclick = func1; a.onclick = func2;将只会执行func2中的内容。3）无法通过事件的冒泡、委托等机制（后面会讲到）完成更多事情。

　　　　因为这些缺点，虽然原始事件类型兼容所有浏览器，但仍不推荐使用。

## 　　2.DOM2事件模型

　　　　此模型是W3C制定的标准模型，现代浏览器（IE6~8除外）都已经遵循这个规范。W3C制定的事件模型中，一次事件的发生包含三个过程：

　　　　(1).事件捕获阶段，(2).事件目标阶段，(3).事件冒泡阶段。如下图所示

![img](https://images2015.cnblogs.com/blog/982936/201607/982936-20160706150206796-2145702578.png)

 

　　事件捕获：当某个元素触发某个事件（如onclick），顶层对象document就会发出一个事件流，随着DOM树的节点向目标元素节点流去，直到到达事件真正发生的目标元素。在这个过程中，事件相应的监听函数是不会被触发的。

　　事件目标：当到达目标元素之后，执行目标元素该事件相应的处理函数。如果没有绑定监听函数，那就不执行。

　　事件冒泡：从目标元素开始，往顶层元素传播。途中如果有节点绑定了相应的事件处理函数，这些函数都会被一次触发。

 IE 5.5: div -> body -> document 

 IE 6.0: div -> body -> html -> document 

 Mozilla 1.0: div -> body -> html -> document -> window 

　　所有的事件类型都会经历事件捕获但是只有部分事件会经历事件冒泡阶段,例如submit事件就不会被冒泡。 

　　**事件的传播是可以阻止的：
**　　• 在W3c中，使用stopPropagation（）方法
　　• 在IE下设置eve.cancelBubble = true；
　　在捕获的过程中stopPropagation（）；后，后面的冒泡过程就不会发生了。

　　**标准的事件监听器该如何绑定：**

　　　　addEventListener("eventType","handler","true|false");其中eventType指事件类型，**注意不要加‘on’前缀，与IE下不同**。第二个参数是处理函数，第三个即用来指定是否在捕获阶段进行处理，一般设为false来与IE保持一致(默认设置)，除非你有特殊的逻辑需求。监听器的解除也类似：removeEventListner("eventType","handler","true!false");

## 　　3.IE事件模型

　　**IE不把该对象传入事件处理函数,由于在任意时刻只会存在一个事件,所以IE把它作为全局对象window的一个属性**，为求证其真伪，使用IE8执行代码alert(window.event)，结果弹出是null，说明该属性已经定义，**只是值为null（与undefined不同）**。难道这个全局对象的属性是在监听函数里才加的？于是执行下面代码：

　　　　window.onload = function (){alert(window.event);}

　　　　setTimeout(function(){alert(window.event);},2000);

　　　　结果第一次弹出【object event】，两秒后弹出依然是null。由此可见IE是将event对象在处理函数中设为window的属性，一旦函数执行结束，便被置为null了。IE的事件模型只有两步，先执行元素的监听函数，然后事件沿着父节点一直冒泡到document。冒泡已经讲解过了，这里不重复。IE模型下的事件监听方式也挺独特，绑定监听函数的方法是：attachEvent( "eventType","handler")，其中evetType为事件的类型，如onclick，**注意要加’on’**。解除事件监听器的方法是 detachEvent("eventType","handler" )

　　　　IE的事件模型已经可以解决原始模型的三个缺点，但其自己的缺点就是兼容性，只有IE系列浏览器才可以这样写。

　　　以上就是3种事件模型，在我们写代码的时候，为了兼容ie，通常使用以下写法：

　　　　var demo = document.getElementById('demo');

　　　　if(demo.attachEvent){

　　　　 demo.attachEvent('onclick',func);

　　　　}else{

　　　　 demo.addEventListener('click',func,false);

　　　　}

# event详解

　　上面已经讲解了3种事件模型，事件，大部分情况下指的是用户的鼠标动作和键盘动作，如点击、移动鼠标、按下某个键，为什么说大部分呢，因为事件不单单只有这两部分，还有其他的例如document的load和unloaded。那么事件在浏览器中，到底包含哪些信息呢？

　　**事件被封装成一个event对象，包含了该事件发生时的所有相关信息（event的属性）以及可以对事件进行的操作（event的方法）。**

　　我为下图中的button绑定了一个点击事件，然后将event输出到控制台：

**![img](https://images2015.cnblogs.com/blog/982936/201607/982936-20160706163734186-565312927.png)**

 

　　可以看到是一个MouseEvent对象，包含了一系列属性，如鼠标点击的位置等。那么敲击键盘时产生的event对象和它一样吗？看看就知道： 

![img](https://images2015.cnblogs.com/blog/982936/201607/982936-20160706164223280-1546791997.png)

　　可以看到是一个KeyboardEvent对象，属性跟上面的也不太一样，如没有clientX/Y(敲键盘怎么能获取到鼠标的位置呢)。不管是MouseEvent还是KeyboardEvent或是其他类型，都是继承自一个叫Event的类。

### 　　event对象常用属性、方法：

#### 　　1. 事件定位相关属性

　　如果你细细看了MouseEvent对象里的属性，一定发现了有很多带X/Y的属性，它们都和事件的位置相关。具体包括：x/y、clientX/clientY、pageX/pageY、screenX/screenY、layerX/layerY、offsetX/offsetY 六对。为什么有这么多X-Y啊？不要着急，作为一个web开发者，你应该了解各浏览器之间是有差异的，这些属性都有各自的意思：

　　　　x/y与clientX/clientY值一样，表示距浏览器可视区域（工具栏除外区域）左/上的距离；

　　　　pageX/pageY，距页面左/上的距离，它与clientX/clientY的区别是不随滚动条的位置变化；

　　　　screenX/screenY，距计算机显示器左/上的距离，拖动你的浏览器窗口位置可以看到变化；

　　　　layerX/layerY与offsetX/offsetY值一样，表示距有定位属性的父元素左/上的距离。

　

　下面列出了各属性的浏览器支持情况。（+支持，-不支持）　　　　

| offsetX/offsetY | W3C- | IE+  | Firefox- | Opera+ | Safari+ | chrome+ |
| --------------- | ---- | ---- | -------- | ------ | ------- | ------- |
| x/y             | W3C- | IE+  | Firefox- | Opera+ | Safari+ | chrome+ |
| layerX/layerY   | W3C- | IE-  | Firefox+ | Opera- | Safari+ | chrome+ |
| pageX/pageY     | W3C- | IE+- | Firefox+ | Opera+ | Safari+ | chrome+ |
| clientX/clientY | W3C+ | IE+  | Firefox+ | Opera+ | Safari+ | chrome+ |
| screenX/screenY | W3C+ | IE+  | Firefox+ | Opera+ | Safari+ | chrome+ |

   　　注意：该表摘自其他文章，我未做全部验证，但是最新版本的现代浏览器，这些属性貌似是都支持了，**为了更好的兼容性，通常选择W3C支持的属性。**

#### 　　2．其他常用属性

　　　　target：发生事件的节点；

　　　　currentTarget：当前正在处理的事件的节点，在事件捕获或冒泡阶段；

　　　  timeStamp：事件发生的时间，时间戳。

　　　　bubbles：事件是否冒泡。

　　　　cancelable：事件是否可以用preventDefault()方法来取消默认的动作；

　　　　keyCode：按下的键的值；

#### 　　3. event对象的方法

　　　　event. preventDefault()//阻止元素默认的行为，如链接的跳转、表单的提交；

　　　　event. stopPropagation()//阻止事件冒泡

　　　　event.initEvent()//初始化新事件对象的属性，自定义事件会用，不常用

　　　　event. stopImmediatePropagation()//可以阻止掉同一事件的其他优先级较低的侦听器的处理（这货表示没用过，优先级就不说明了，谷歌或者问度娘吧。）

#### 　  4. 阻止事件的默认行为，例如click <a>后的跳转~ 

　　• 在W3c中，使用preventDefault（）方法； 
　　• 在IE下设置window.event.returnValue = false; 

　　**event.target与event.currentTarget他们有什么不同？**

　　**target在事件流的目标阶段；currentTarget在事件流的捕获，目标及冒泡阶段。只有当事件流处在目标阶段的时候，两个的指向才是一样的， 而当处于捕获和冒泡阶段的时候，target指向被单击的对象而currentTarget指向当前事件活动的对象（一般为父级）。**

　　

### **事件触发器**

　　前面提到的事件都是依靠用户或者浏览器自带事件去触发的，比如click是用户点击事件目标触发，load是指定元素已载入的时候浏览器的行为事件，等等，如果只有在这些条件下才能触发事件，那么我们的自定义事件如何触发呢？

　　事件触发器就是用来触发某个元素下的某个事件，当然也可以用来触发自定义事件IE下fireEvent方法，现代浏览器（chrome,firefox等）有dispatchEvent方法。

　　

 

　　这里先介绍下自定义事件（事件模拟）：

### 自定义事件

　　想要实现一个自定义事件，需要经过下面几步：

　　1.**createEvent（eventType）**

　　　　事件被封装成一个event对象，这在上面已经说过了，我们想要自定义一个事件，js中有这么一个方法**createEvent（eventType），**见名知义，显然是用于“创造”一个事件的，没错，要想自定义事件，首先，我们得“创造”一个事件。

　　　  参数：eventType 共5种类型：
  　 　Events ：包括所有的事件. 
      HTMLEvents：包括 'abort', 'blur', 'change', 'error', 'focus', 'load', 'reset', 'resize', 'scroll', 'select', 
                  'submit', 'unload'. 事件
      UIEevents ：包括 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'keydown', 'keypress', 'keyup'.
                 间接包含 MouseEvents. 
      MouseEvents：包括 'click', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup'. 
      MutationEvents:包括 'DOMAttrModified', 'DOMNodeInserted', 'DOMNodeRemoved', 
                   'DOMCharacterDataModified', 'DOMNodeInsertedIntoDocument', 
                   'DOMNodeRemovedFromDocument', 'DOMSubtreeModified'. 　　　

　　**2. 在createEvent后必须初始化，为大家介绍5种对应的初始化方法**
 　　　　HTMLEvents 和 通用 Events：
       　　　initEvent( 'type', bubbles, cancelable )
  　　 UIEvents：
           initUIEvent( 'type', bubbles, cancelable, windowObject, detail )
  　　 MouseEvents： 
           initMouseEvent( 'type', bubbles, cancelable, windowObject, detail, screenX, screenY, 
           clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget )
  　　　MutationEvents ：
           initMutationEvent( 'type', bubbles, cancelable, relatedNode, prevValue, newValue, 
           attrName, attrChange ) 

　　　　这里重点介绍MouseEvents（鼠标事件模拟）：

　　　　鼠标事件可以通过创建一个鼠标事件对象来模拟（mouse event object），并且授予他一些相关信息，创建一个鼠标事件通过传给createEvent（）方法一个字符串“MouseEvents”，来创建鼠标事件对象，之后通过iniMouseEvent()方法来初始化返回的事件对象，iniMouseEvent()方法接受15参数，参数如下：
　　　　　type string类型 ：要触发的事件类型，例如‘click’。
　　　　　bubbles Boolean类型：表示事件是否应该冒泡，针对鼠标事件模拟，该值应该被设置为true。
　　　　　cancelable bool类型：表示该事件是否能够被取消，针对鼠标事件模拟，该值应该被设置为true。
　　     view 抽象视图：事件授予的视图，这个值几乎全是document.defaultView.
　　　　  detail int类型：附加的事件信息这个初始化时一般应该默认为0。
　　　　  screenX int类型 ： 事件距离屏幕左边的X坐标
　　　　  screenY int类型 ： 事件距离屏幕上边的y坐标
　　　　  clientX int类型 ： 事件距离可视区域左边的X坐标
　　　　  clientY int类型 ： 事件距离可视区域上边的y坐标
　　　　  ctrlKey Boolean类型 ： 代表ctrol键是否被按下，默认为false。
　　　　  altKey Boolean类型 ： 代表alt键是否被按下，默认为false。
　　　　  shiftKey Boolean类型 ： 代表shif键是否被按下，默认为false。
　　　　  metaKey Boolean类型： 代表meta key 是否被按下，默认是false。
　　　　  button int类型： 表示被按下的鼠标键，默认是零. 
　　  　relatedTarget (object) ： 事件的关联对象.只有在模拟mouseover 和 mouseout时用到。

　　　　如果你想要了解更多事件模拟参数详解，请查看这篇文章，http://www.cnblogs.com/MrBackKom/archive/2012/06/26/2564501.html。或者查看《javascript高级程序设计》的模拟事件章节

　　**3. 在初始化完成后就可以随时触发需要的事件了，为大家介绍targetObj.dispatchEvent(event)使targetObj对象的event事件触发。（IE上请用fireEvent方法）**
  **4. 例子**
  　　//例子1 立即触发鼠标被按下事件

```
var` `fireOnThis = document.getElementById(``'demo'``);``var` `evObj = document.createEvent(``'MouseEvents'``);``evObj.initMouseEvent( ``'click'``, ``true``, ``true``, window, 1, 12, 345, 7, 220, ``false``, ``false``, ``true``, ``false``, 0, ``null` `);``fireOnThis.dispatchEvent(evObj)；
```

 　 //例子2 考虑兼容性的一个鼠标移动事件

```
var` `fireOnThis = document.getElementById(``'someID'``);``if``( document.createEvent ) {``   ``var` `evObj = document.createEvent(``'MouseEvents'``);``   ``evObj.initEvent( ``'mousemove'``, ``true``, ``false` `);``   ``fireOnThis.dispatchEvent(evObj);`` ``}``else` `if``( document.createEventObject )`` ``{``   ``fireOnThis.fireEvent(``'onmousemove'``);`` ``}
```

　　

#  事件代理

　　传统的事件处理中，我们为每一个需要触发事件的元素添加事件处理器，但是这种方法将可能会导致内存泄露或者性能下降（特别是通过ajax获取数据后重复绑定事件，总之，越频繁风险越大）。**事件代理**在js中是一个非常有用但对初学者稍难理解的功能，我们将事件处理器绑定到一个父级元素上，避免了频繁的绑定多个子级元素,依靠**事件冒泡**机制与**事件捕获**机制，子级元素的事件将委托给父级元素。事件冒泡与捕获在上面事件模型中已经讲解过。

　　有了事件捕获和冒泡的认识后，下面举例说明事件代理：

　　假设我们有一个列表，列表中的每一个li和li中的span都需要绑定某个事件处理函数。如下代码：

 

```
<ul id=``"parent-ul"``>``　　 <li><span>Item 1</span></li>``　　 <li><span>Item 2</span></li>`` ``　　 <li><span>Item 3</span></li>`` ``　　 <li><span>Item 4</span></li>`` ``　　 <li><span>Item 5</span></li>`` ``　　 <li><span>Item 6</span></li>``</ul>
```

　　

```
~(``function``() {``  ``var` `ParentNode = document.querySelector(``"#parent-ul"``);``  ``var` `targetNodes = ParentNode.querySelectorAll(``"li"``);``  ``var` `spanNodes = ParentNode.querySelectorAll(``"span"``);``   ` `  ``//绑定事件处理函数``  ``for``(``var` `i=0, l = targetNodes.length; i < l; i++){``    ``addListenersToLi(targetNodes[i]);``  ``}``  ``for``(``var` `i=0, l = spanNodes.length; i < l; i++){``    ``addListenersToSpan(spanNodes[i]);``  ``}` `  ``//事件处理函数``  ``function` `addListenersToLi(targetNode){``    ``targetNode.onclick = ``function` `targetClick(e){``      ``if``(e.target && e.target.nodeName.toUpperCase() == ``"LI"``) {``        ``console.log(``"当你看见我的时候，LI点击事件已经生效！"``);``      ``}``    ``};``  ``}``  ``function` `addListenersToSpan(targetNode){``    ``targetNode.onclick = ``function` `targetClick(e){``      ``if``(e.target && e.target.nodeName.toUpperCase() == ``"SPAN"``) {``        ``console.log(``"当你看见我的时候，SPAN点击已经生效！"``);``      ``}``    ``};``  ``}``})();
```

　　

　　

　　这里为li和span元素都添加了onclick事件处理函数，但是如果这些li和span有可能被删除或者新增，那么总是需要为新增的li、span元素重新绑定事件，这种写法使得我们很苦恼，除了开头提到的问题外，增加了代码量而且代码看上去不太整洁了，那么使用事件代理会怎么样呢？如下代码：

 

```
~(``function``() {``  ``// 获取li的父节点，并为其添加一个click事件``  ``document.getElementById(``"parent-ul"``).addEventListener(``"click"``,``function``(e) {``    ``// 检查事件源e.targe是否为span``    ``if``(e.target && e.target.nodeName.toUpperCase() == ``"SPAN"``) {``      ``// 真正的处理过程在这里``      ``console.log(``"当你看见我的时候，SPAN事件代理已经生效！"``);``    ``}<br>　　　　　``//检查事件源e.target是否为li``    ``if``(e.target && e.target.nodeName.toUpperCase() == ``"LI"``) {``      ``// 真正的处理过程在这里``      ``console.log(``"当你看见我的时候，LI事件代理已经生效！"``);``    ``}``  ``});``})();
```

　　我们改变了思路，为li、span的父级元素即id为parent-ul的ul元素添加了一click事件，当点击事件发生时，我们可以通过e.target捕获事件目标，并通过e.target.nodeName.toUpperCase== "LI"来判断事件目标是否为li（span同理），如是那么执行相应的事件处理程序。使用这样的方式有利于解决前面提到的一些问题：

　　1.最直接的就是，代码更整洁了，而且可读性更强。
　　2.对于动态化的页面（如本例，li、span会新增和删除），不用频繁的绑定事件，减少了内存泄露的概率。

　**注意**：不是所有的事件都能冒泡的。blur、focus、load和unload不能像其它事件一样冒泡。事实上blur和focus可以用事件捕获而非事件冒泡的方法获得（在IE之外的其它浏览器中）。 
　　　　在管理鼠标事件的时候有些需要注意的地方。如果你的代码处理mousemove事件的话你遇上性能瓶颈的风险可就大了，因为mousemove事件触发非常频繁。而mouseout则因为其怪异的表现而变得很难用事件代理来管理。 

　**jq事件代理**：jq为提供了delegate()函数处理事件代理，这里不多介绍，个人在工作中使用on()函数解决一些事件代理问题（使用更方便），解决上诉例子的代码如下

```
~(``function``() {``  ``　　 $(``"#parent-ul"``).on(``"click"``,``"li,span"``,``function``(e) {      ``    ``if``($(``this``)[0].nodeName==``"SPAN"``) {``       ``// 真正的处理过程在这里``       ``console.log(``"当你看见我的时候，SPAN事件代理已经生效！"``);``       ``//这里要阻止冒泡，不然点击span时会触发li的事件``       ``e.stopPropagation();``      ``}``      ` `  ``　　   ``if``($(``this``)[0].nodeName==``"LI"``) {``        ``// 真正的处理过程在这里``        ``console.log(``"当你看见我的时候，LI事件代理已经生效！"``);``      ``}``  ``　　 });``　　})();  
```

　　如果你使用jq，推荐使用on()方法。

```

```

 

**概述：**

那什么叫事件委托呢？它还有一个名字叫事件代理，JavaScript高级程序设计上讲：事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。那这是什么意思呢？网上的各位大牛们讲事件委托基本上都用了同一个例子，就是取快递来解释这个现象，我仔细揣摩了一下，这个例子还真是恰当，我就不去想别的例子来解释了，借花献佛，我摘过来，大家认真领会一下事件委托到底是一个什么原理：

有三个同事预计会在周一收到快递。为签收快递，有两种办法：一是三个人在公司门口等快递；二是委托给前台MM代为签收。现实当中，我们大都采用委托的方案（公司也不会容忍那么多员工站在门口就为了等快递）。前台MM收到快递后，她会判断收件人是谁，然后按照收件人的要求签收，甚至代为付款。这种方案还有一个优势，那就是即使公司里来了新员工（不管多少），前台MM也会在收到寄给新员工的快递后核实并代为签收。

**这里其实还有2层意思的：**

第一，现在委托前台的同事是可以代为签收的，即程序中的现有的dom节点是有事件的；

第二，新员工也是可以被前台MM代为签收的，即程序中新添加的dom节点也是有事件的。

**为什么要用事件委托：**

一般来说，dom需要有事件处理程序，我们都会直接给它设事件处理程序就好了，那如果是很多的dom需要添加事件处理呢？比如我们有100个li，每个li都有相同的click点击事件，可能我们会用for循环的方法，来遍历所有的li，然后给它们添加事件，那这么做会存在什么影响呢？

在JavaScript中，添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能，因为需要不断的与dom节点进行交互，访问dom的次数越多，引起浏览器重绘与重排的次数也就越多，就会延长整个页面的交互就绪时间，这就是为什么性能优化的主要思想之一就是减少DOM操作的原因；如果要用事件委托，就会将所有的操作放到js程序里面，与dom的操作就只需要交互一次，这样就能大大的减少与dom的交互次数，提高性能；

每个函数都是一个对象，是对象就会占用内存，对象越多，内存占用率就越大，自然性能就越差了（内存不够用，是硬伤，哈哈），比如上面的100个li，就要占用100个内存空间，如果是1000个，10000个呢，那只能说呵呵了，如果用事件委托，那么我们就可以只对它的父级（如果只有一个父级）这一个对象进行操作，这样我们就需要一个内存空间就够了，是不是省了很多，自然性能就会更好。

**事件委托的原理：**

事件委托是利用事件的冒泡原理来实现的，何为事件冒泡呢？就是事件从最深的节点开始，然后逐步向上传播事件，举个例子：页面上有这么一个节点树，div>ul>li>a;比如给最里面的a加一个click点击事件，那么这个事件就会一层一层的往外执行，执行顺序a>li>ul>div，有这样一个机制，那么我们给最外面的div加点击事件，那么里面的ul，li，a做点击事件的时候，都会冒泡到最外层的div上，所以都会触发，这就是事件委托，委托它们父级代为执行事件。

**事件委托怎么实现：**

终于到了本文的核心部分了，哈哈，在介绍事件委托的方法之前，我们先来看一段一般方法的例子：

子节点实现相同的功能：

```
<``ul` `id``=``"ul1"``>`` ``<``li``>111</``li``>`` ``<``li``>222</``li``>`` ``<``li``>333</``li``>`` ``<``li``>444</``li``>``</``ul``>
```

实现功能是点击li，弹出123：

```
window.onload = ``function``(){`` ``var` `oUl = document.getElementById(``"ul1"``);`` ``var` `aLi = oUl.getElementsByTagName(``'li'``);`` ``for``(``var` `i=0;i<aLi.length;i++){``  ``aLi[i].onclick = ``function``(){``   ``alert(123);``  ``}`` ``}``}
```

上面的代码的意思很简单，相信很多人都是这么实现的，我们看看有多少次的dom操作，首先要找到ul，然后遍历li，然后点击li的时候，又要找一次目标的li的位置，才能执行最后的操作，每次点击都要找一次li；

那么我们用事件委托的方式做又会怎么样呢？

```
window.onload = ``function``(){`` ``var` `oUl = document.getElementById(``"ul1"``);`` ``oUl.onclick = ``function``(){``  ``alert(123);`` ``}``}
```

这里用父级ul做事件处理，当li被点击时，由于冒泡原理，事件就会冒泡到ul上，因为ul上有点击事件，所以事件就会触发，当然，这里当点击ul的时候，也是会触发的，那么问题就来了，如果我想让事件代理的效果跟直接给节点的事件效果一样怎么办，比如说只有点击li才会触发，不怕，我们有绝招：

Event对象提供了一个属性叫target，可以返回事件的目标节点，我们成为事件源，也就是说，target就可以表示为当前的事件操作的dom，但是不是真正操作dom，当然，这个是有兼容性的，标准浏览器用ev.target，IE浏览器用event.srcElement，此时只是获取了当前节点的位置，并不知道是什么节点名称，这里我们用nodeName来获取具体是什么标签名，这个返回的是一个大写的，我们需要转成小写再做比较（习惯问题）：

```
window.onload = ``function``(){``     ``　　``var` `oUl = document.getElementById(``"ul1"``);``     ``　　oUl.onclick = ``function``(ev){``      ``　　　　``var` `ev = ev || window.event;``        ``　　　　``var` `target = ev.target || ev.srcElement;``      ``　　　　``if``(target.nodeName.toLowerCase() == ``'li'``){``      ``　 　　　　　　  alert(123);``    ``　　　　　　　 alert(target.innerHTML);``        ``　　　　}``     ``　　}``    ``}
```

这样改下就只有点击li会触发事件了，且每次只执行一次dom操作，如果li数量很多的话，将大大减少dom的操作，优化的性能可想而知！

上面的例子是说li操作的是同样的效果，要是每个li被点击的效果都不一样，那么用事件委托还有用吗？

```
<``div` `id``=``"box"``>``  ``<``input` `type``=``"button"` `id``=``"add"` `value``=``"添加"` `/>``  ``<``input` `type``=``"button"` `id``=``"remove"` `value``=``"删除"` `/>``  ``<``input` `type``=``"button"` `id``=``"move"` `value``=``"移动"` `/>``  ``<``input` `type``=``"button"` `id``=``"select"` `value``=``"选择"` `/>`` ``</``div``>
window.onload = ``function``(){``   ``var` `Add = document.getElementById(``"add"``);``   ``var` `Remove = document.getElementById(``"remove"``);``   ``var` `Move = document.getElementById(``"move"``);``   ``var` `Select = document.getElementById(``"select"``);``   ` `   ``Add.onclick = ``function``(){``    ``alert(``'添加'``);``   ``};``   ``Remove.onclick = ``function``(){``    ``alert(``'删除'``);``   ``};``   ``Move.onclick = ``function``(){``    ``alert(``'移动'``);``   ``};``   ``Select.onclick = ``function``(){``    ``alert(``'选择'``);``   ``}``   ` `  ``}
```

上面实现的效果我就不多说了，很简单，4个按钮，点击每一个做不同的操作，那么至少需要4次dom操作，如果用事件委托，能进行优化吗？

```
window.onload = ``function``(){``   ``var` `oBox = document.getElementById(``"box"``);``   ``oBox.onclick = ``function` `(ev) {``    ``var` `ev = ev || window.event;``    ``var` `target = ev.target || ev.srcElement;``    ``if``(target.nodeName.toLocaleLowerCase() == ``'input'``){``     ``switch``(target.id){``      ``case` `'add'` `:``       ``alert(``'添加'``);``       ``break``;``      ``case` `'remove'` `:``       ``alert(``'删除'``);``       ``break``;``      ``case` `'move'` `:``       ``alert(``'移动'``);``       ``break``;``      ``case` `'select'` `:``       ``alert(``'选择'``);``       ``break``;``     ``}``    ``}``   ``}``   ` `  ``}
```

用事件委托就可以只用一次dom操作就能完成所有的效果，比上面的性能肯定是要好一些的

现在讲的都是document加载完成的现有dom节点下的操作，那么如果是新增的节点，新增的节点会有事件吗？也就是说，一个新员工来了，他能收到快递吗？

看一下正常的添加节点的方法：

```
<``input` `type``=``"button"` `name``=``""` `id``=``"btn"` `value``=``"添加"` `/>`` ``<``ul` `id``=``"ul1"``>``  ``<``li``>111</``li``>``  ``<``li``>222</``li``>``  ``<``li``>333</``li``>``  ``<``li``>444</``li``>`` ``</``ul``>
```

现在是移入li，li变红，移出li，li变白，这么一个效果，然后点击按钮，可以向ul中添加一个li子节点

```
window.onload = ``function``(){``   ``var` `oBtn = document.getElementById(``"btn"``);``   ``var` `oUl = document.getElementById(``"ul1"``);``   ``var` `aLi = oUl.getElementsByTagName(``'li'``);``   ``var` `num = 4;``   ` `   ``//鼠标移入变红，移出变白``   ``for``(``var` `i=0; i<aLi.length;i++){``    ``aLi[i].onmouseover = ``function``(){``     ``this``.style.background = ``'red'``;``    ``};``    ``aLi[i].onmouseout = ``function``(){``     ``this``.style.background = ``'#fff'``;``    ``}``   ``}``   ``//添加新节点``   ``oBtn.onclick = ``function``(){``    ``num++;``    ``var` `oLi = document.createElement(``'li'``);``    ``oLi.innerHTML = 111*num;``    ``oUl.appendChild(oLi);``   ``};``  ``}
```

这是一般的做法，但是你会发现，新增的li是没有事件的，说明添加子节点的时候，事件没有一起添加进去，这不是我们想要的结果，那怎么做呢？一般的解决方案会是这样，将for循环用一个函数包起来，命名为mHover，如下：

```
window.onload = ``function``(){``   ``var` `oBtn = document.getElementById(``"btn"``);``   ``var` `oUl = document.getElementById(``"ul1"``);``   ``var` `aLi = oUl.getElementsByTagName(``'li'``);``   ``var` `num = 4;``   ` `   ``function` `mHover () {``    ``//鼠标移入变红，移出变白``    ``for``(``var` `i=0; i<aLi.length;i++){``     ``aLi[i].onmouseover = ``function``(){``      ``this``.style.background = ``'red'``;``     ``};``     ``aLi[i].onmouseout = ``function``(){``      ``this``.style.background = ``'#fff'``;``     ``}``    ``}``   ``}``   ``mHover ();``   ``//添加新节点``   ``oBtn.onclick = ``function``(){``    ``num++;``    ``var` `oLi = document.createElement(``'li'``);``    ``oLi.innerHTML = 111*num;``    ``oUl.appendChild(oLi);``    ``mHover ();``   ``};``  ``}
```

虽然功能实现了，看着还挺好，但实际上无疑是又增加了一个dom操作，在优化性能方面是不可取的，那么有事件委托的方式，能做到优化吗？

```
window.onload = ``function``(){``   ``var` `oBtn = document.getElementById(``"btn"``);``   ``var` `oUl = document.getElementById(``"ul1"``);``   ``var` `aLi = oUl.getElementsByTagName(``'li'``);``   ``var` `num = 4;``   ` `   ``//事件委托，添加的子元素也有事件``   ``oUl.onmouseover = ``function``(ev){``    ``var` `ev = ev || window.event;``    ``var` `target = ev.target || ev.srcElement;``    ``if``(target.nodeName.toLowerCase() == ``'li'``){``     ``target.style.background = ``"red"``;``    ``}``    ` `   ``};``   ``oUl.onmouseout = ``function``(ev){``    ``var` `ev = ev || window.event;``    ``var` `target = ev.target || ev.srcElement;``    ``if``(target.nodeName.toLowerCase() == ``'li'``){``     ``target.style.background = ``"#fff"``;``    ``}``    ` `   ``};``   ` `   ``//添加新节点``   ``oBtn.onclick = ``function``(){``    ``num++;``    ``var` `oLi = document.createElement(``'li'``);``    ``oLi.innerHTML = 111*num;``    ``oUl.appendChild(oLi);``   ``};``  ``}
```

看，上面是用事件委托的方式，新添加的子元素是带有事件效果的，我们可以发现，当用事件委托的时候，根本就不需要去遍历元素的子节点，只需要给父级元素添加事件就好了，其他的都是在js里面的执行，这样可以大大的减少dom操作，这才是事件委托的精髓所在。

--------------------------------------------------华丽的分割线-------------- -----------------------------------------------------------------------------------------------------

在这里先感谢一下@苍茫大地NV 的提问，提的问题非常好！👏👏👏

他的问题是：

现在给一个场景 ul > li > div > p，div占满li，p占满div，还是给ul绑定时间，需要判断点击的是不是li（假设li里面的结构是不固定的），那么e.target就可能是p，也有可能是div，这种情况你会怎么处理呢？

那我们现在就再现一下他给的场景

```
<``ul` `id``=``"test"``>``  ``<``li``>``   ``<``p``>11111111111</``p``>``  ``</``li``>``  ``<``li``>``   ``<``div``>``   ``</``div``>``  ``</``li``>``  ``<``li``>``   ``<``span``>3333333333</``span``>``  ``</``li``>``  ``<``li``>4444444</``li``>`` ``</``ul``>
```

如上列表，有4个li，里面的内容各不相同，点击li，event对象肯定是当前点击的对象，怎么指定到li上，下面我直接给解决方案：

```
var` `oUl = document.getElementById(``'test'``);`` ``oUl.addEventListener(``'click'``,``function``(ev){``  ``var` `target = ev.target;``  ``while``(target !== oUl ){``   ``if``(target.tagName.toLowerCase() == ``'li'``){``    ``console.log(``'li click~'``);``    ``break``;``   ``}``   ``target = target.parentNode;``  ``}`` ``})
```

核心代码是while循环部分，实际上就是一个递归调用，你也可以写成一个函数，用递归的方法来调用，同时用到冒泡的原理，从里往外冒泡，知道currentTarget为止，当当前的target是li的时候，就可以执行对应的事件了，然后终止循环，恩，没毛病！

这里看不到效果，大家可以复制过去运行一下！



总结：

那什么样的事件可以用事件委托，什么样的事件不可以用呢？

适合用事件委托的事件：click，mousedown，mouseup，keydown，keyup，keypress。

值得注意的是，mouseover和mouseout虽然也有事件冒泡，但是处理它们的时候需要特别的注意，因为需要经常计算它们的位置，处理起来不太容易。

不适合的就有很多了，举个例子，mousemove，每次都要计算它的位置，非常不好把控，在不如说focus，blur之类的，本身就没用冒泡的特性，自然就不能用事件委托了。