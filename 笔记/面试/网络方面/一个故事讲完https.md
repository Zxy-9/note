# 一个故事讲完https



 序言



今天来聊一聊https 安全传输的原理。



在开始之前，我们来虚构两个人物， 一个是位于中国的张大胖（怎么又是你？！）， 还有一个是位于米国的Bill (怎么还是你？！)。



这俩哥们隔着千山万水，通过网络联系上了， 两个人臭味相投，聊得火热。



此时正值米国大选， 张大胖亲切地“致电”Bill, 对米国总统大选的情况表示强烈地关注。 Bill则回电说谢谢关心米国人的事情我们米国人自己做主，不用你们歪果仁瞎操心......



张大胖继续“致电”说其实我们支持特朗普， 因为希拉里太情绪化，太难打交道了， 我们挺希望看到特朗普上台这样米国就会变成 The Divided State of America ......



Bill 回电： 拉倒你吧你， 我们米国的政体有着强大的纠错性， 虽然有时候发展得慢， 有时候会走上岔路， 但很快就会回到正途，几百年来稳定得很，不像你们像坐了过山车一样.....



两个人越聊越投机，天南地北，海阔天空，还夹杂着不少隐私的话题。



2



 总是有一种被偷看的感觉



有一天， Bill 突然意识到： 坏了， 我们的通信是明文的， 这简直就是网络上裸奔啊， 任何一个不怀好意的家伙都可以监听我们通信，打开我们发送的数据包，窥探我们的隐私啊。



张大胖说： “你不早点说，我刚才是不是把我的微信号给你发过去了？ 我是不是告诉你我上周去哪儿旅游了?  估计已经被人截取了吧！”



Bill  提议： “要不我们做个数据的加密？ 每次传输之前， 你把消息用一个加密算法加密， 然后发到我这里以后我再解密， 这样别人就无法偷窥了，像这样： ”



![图片](http://mmbiz.qpic.cn/mmbiz_png/KyXfCrME6UJFk4ma5Y5g5wIeggZaCZ3xEtI3NKKgVfhvEbTHU2XMhepPaIdvRKsLmGzUb1Sk1BrCyhbGGS4XFQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)





张大胖冰雪聪明，一看就明白了， 这**加密和解密算法是公开的，那个密钥是保密的**， 只有两人才知道， 这样生成的加密消息（密文） 别人就无法得知了。 他说： “Bill 老兄，你生成一个密钥， 然后把密钥发给我， 咱们这就开启加密消息， 让那些偷窥狂人们哭去吧！”



（码农翻身注：这叫**对称加密算法，** 因为加密和解密用的是同一个密钥）



一炷香功夫过去了， Bill 还是没有回音， 张大胖忍不住地催促： “快发啊？！！！”



Bill 终于回复了： “ 我感觉有一双眼睛正在虎视眈眈地盯着我们的通话， 如果我把密钥发给你， 也被他截取了， 那加密岂不白费工夫？”



张大胖沉默了， 是啊， 网络是不安全的， 这密钥怎么安全地发过来啊 ？　



“奥，对了，我下周要去米国旅游，到时候我们见一面，把密码确定下来，写到纸上，谁也偷不走， 这不就结了？”　



“哈哈， 这倒是终极解决之道 ”  Bill 笑了， “不过，我不仅仅和你聊天， 我还要和易卜拉欣，阿卜杜拉， 弗拉基米尔，克里斯托夫，玛格丽特， 桥本龙太郎， 李贤俊， 许木木，郭芙蓉，吕秀才等人通信， 我总不能打着飞的，满世界的和人交换密码吧？ ”



张大胖心里暗自佩服Bill同学的好友竟然遍布全球，看来他对加密通信的要求更加强烈啊！



可是这个加密解密算法需要的密钥双方必须得知道啊， 但是密钥又无法通过网络发送， 这该死的偷窥者！

3



 RSA : 非对称加密



Bill 和 张大胖的通信无法加密，说话谨慎了不少， 直到有一天， 他们听说了一个叫做RSA的**非对称加密算法**，一下子来了灵感。



这个RSA算法非常有意思，它不是像之前的算法， 双方必须协商一个保密的密钥， 而是有一对儿钥匙， 一个是保密的，称为**私钥**，另外一个是公开的，称为**公钥**。



更有意思的是，**用私钥加密的数据，只有对应的公钥才能解密，用公钥加密的数据， 只有对应的私钥才能解密**。



![图片](http://mmbiz.qpic.cn/mmbiz_png/KyXfCrME6UJFk4ma5Y5g5wIeggZaCZ3xVesHvBMLguuoJuPmFZs3AJW0z2DFPdXibo3GYiab9D8s8JwmolDAIt0g/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

有了这两个漂亮的特性， 当张大胖给Bill发消息的时候， 就可以先用Bill的公钥去加密（反正Bill的公钥是公开的，地球人都知道）， 等到消息被Bill 收到后， 他就可以用自己的私钥去解密（只有Bill才能解开，私钥是保密的 ）



![图片](http://mmbiz.qpic.cn/mmbiz_png/KyXfCrME6UJFk4ma5Y5g5wIeggZaCZ3xl7E009LNibq0X9Qwt7rapNbUSxFZ2KuRSD0lNvu7zAv8fmADaia2r0aA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



反过来也是如此， 当Bill 想给张大胖发消息的时候，就用张大胖的公钥加密， 张大胖收到后，就用自己的私钥解密。



这样以来，通信安全固若金汤， 没有任何人能窥探他们的小秘密了。



4



 非对称加密+对称加密



两人实验了几次，  张大胖说： “Bill  , 你有没有感觉这个RSA的加密和解密有点慢啊？”



Bill叹了口气 ：“是啊， 我也注意到了， 刚才搜了一下，这个RSA算法比之前的对称密钥算法要慢上百倍。我们就是加个密而已，现在搞得都没法用了”



“回到咱们最初的问题，我们想用一个密钥来加密通信，那个对称加密算法是非常快的，但是苦于密钥无法安全传输， 现在有了RSA ,我想可以结合一下， 分两步走　**(1) 我生成一个对称加密算法的密钥， 用RSA的方式安全发给你，  (2) 我们随后就不用RSA了， 只用这个密钥，利用对称加密算法来通信,  如何**？  ”



Bill 说： “你小子可以啊， 这样以来既解决了密钥的传递问题， 又解决了RSA速度慢的问题，不错。”　



于是两人就安全地传递了对称加密的密钥， 用它来加密解密，果然快多了！



5



 中间人攻击





张大胖把和Bill 聊天的情况给老婆汇报了一次。



老婆告诫他说： “你要小心啊， 你确定网络那边坐着的确实是Bill ?”



张大胖着急地辩解说：“肯定是他啊，我都有他的公钥，我们俩的通信都是加密的。”



老婆提醒道：＂假如啊，Bill给你发公钥的时候， 有个中间人，截取了Bill的公钥， 然后把自己的公钥发给了你，冒充Bill ，你发的消息就用中间人的公钥加了密，　那中间人不就可以解密看到消息了？＂



张大胖背后出汗了，是啊，这个中间人解密以后，还可以用Bill的公钥加密，发给Bill ,  Bill和我根本都意识不到， 还以为我们在安全传输呢！



![图片](http://mmbiz.qpic.cn/mmbiz_png/KyXfCrME6UJFk4ma5Y5g5wIeggZaCZ3x2XHzfjYrw1jXdzzVFbKTz1PVKXOC4UiaI1P5PVqpRfrYCng25yyLJYA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**
**

**看来问题出现在公钥的分发上**！  虽然这个东西是公开的， 但是在别有用心的人看来，截取以后还可以干坏事 ！



6



 你到底是谁？



但是怎么安全地分发公钥呢？ 似乎又回到了最初的问题： 怎么安全的保护密钥？



可是似乎和最初的问题还不一样，这一次的公钥不用保密，但是一定得有个办法**声明这个公钥确实是Bill**的， 而不是别人的。



怎么声明呢？



张大胖突然想到： 现实中有公证处，它提供的公证材料大家都信任，那在网络世界也可以建立一个这样的具备公信力的认证中心， 这个中心给大家颁发一个证书， 用于证明一个人的身份。



这个证书里除了包含一个人的基本信息之外，还有包括最关键的一环：这个人的公钥！



这样以来我拿到证书就可以安全地取到公钥了 ！ 完美！



可是Bill 马上泼了一盆冷水：证书怎么安全传输？ 要是证书传递的过程中被篡改了怎么办？



张大胖心里不由地咒骂起来： 我操， 这简直就是鸡生蛋，蛋生鸡的问题啊。



天无绝人之路， 张大胖很快就找到了突破口： **数字签名**。



简单来讲是这样的， Bill可以把他的公钥和个人信息用一个Hash算法生成一个消息摘要， 这个Hash算法有个极好的特性，**只要输入数据有一点点变化，那生成的消息摘要就会有巨变**，这样就可以防止别人修改原始内容。



![图片](http://mmbiz.qpic.cn/mmbiz_png/KyXfCrME6UJFk4ma5Y5g5wIeggZaCZ3xz65YB4HHCtgIRdk20CwxjreqriatpLWV8wDWIwzRaqVm32zmCibSiacOQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



可是作为攻击者的中间人笑了： “虽然我没办法改公钥，但是我可以把整个原始信息都替换了， 生成一个新的消息摘要， 你不还是辨别不出来？”



张大胖说你别得意的太早 ， 我们会让有公信力的认证中心（**简称CA**）用它的私钥对消息摘要加密，形成签名：



![图片](http://mmbiz.qpic.cn/mmbiz_png/KyXfCrME6UJFk4ma5Y5g5wIeggZaCZ3xuNMsricMF31LBK90LMefWibW7zJPOpoYZgJ594g5tI5JIBuyFudcmjiaQ/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](http://mmbiz.qpic.cn/mmbiz_png/KyXfCrME6UJFk4ma5Y5g5wIeggZaCZ3xcHCS1Za6RllQr302IB7kibtADRFiaRFXj66eUPHhOicZsoJdicJibmU1Hfw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



这还不算， 还把原始信息和数据签名合并， 形成一个全新的东西，叫做“**数字证书**”



![图片](http://mmbiz.qpic.cn/mmbiz_png/KyXfCrME6UJFk4ma5Y5g5wIeggZaCZ3xviaVAYDBOyh06flLQcibdyVHiawCDRyjBOZ8kA40kMoQk4WPydvq0U9hA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](http://mmbiz.qpic.cn/mmbiz_png/KyXfCrME6UJFk4ma5Y5g5wIeggZaCZ3xuNMsricMF31LBK90LMefWibW7zJPOpoYZgJ594g5tI5JIBuyFudcmjiaQ/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

张大胖接着说：当Bill把他的证书发给我的时候， 我就用同样的Hash 算法， 再次生成消息摘要，然后用CA的公钥对数字签名解密， 得到CA创建的消息摘要， 两者一比，就知道有没有人篡改了！



如果没人篡改， 我就可以安全的拿到Bill的公钥喽，有了公钥， 后序的加密工作就可以开始了。



虽然很费劲， 但是为了防范你们这些偷窥者，实在是没办法啊。



![图片](http://mmbiz.qpic.cn/mmbiz_png/KyXfCrME6UJFk4ma5Y5g5wIeggZaCZ3x1n4IwPsiaF62PuK3aASF76C3ortagdYyFs8gUic6aJr9ibwyj2quFCMjQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

中间人恶狠狠地说： “算你小子狠！ 等着吧，我还有别的招。 对了，我且问你， 你这个CA的公钥怎么拿到？　难道不怕我在你传输ＣＡ公钥的时候发起中间人攻击吗？　如果我成功的伪装成了ＣＡ，你这一套体系彻底玩完。”



张大胖语塞了，折腾了半天，又回到了公钥安全传输的问题！



不过转念一想，想解决鸡生蛋，蛋生鸡的问题必须得打破这个怪圈才行，我必须得信任ＣＡ，并且通过安全的的方式获取他们的公钥，这样才能把游戏玩下去。



（公众号码农翻身注：这些ＣＡ本身也有证书来证明自己的身份，并且ＣＡ的信用是像树一样分级的，高层的ＣＡ给底层的ＣＡ做信用背书，而操作系统／浏览器中会内置一些顶层的ＣＡ的证书，相当于你自动信任了他们。　这些顶层的ＣＡ证书一定得安全地放入操作系统／浏览器当中，否则世界大乱。）



7



 https 





终于可以介绍https了，前面已经介绍了https的原理， 你把张大胖替换成浏览器， 把Bill 替换成某个网站就行了。



一个**简化的（例如下图没有包含Pre-Master Secret）**https流程图是这样的， 如果你理解了前面的原理，这张图就变得非常简单：



![图片](http://mmbiz.qpic.cn/mmbiz_png/KyXfCrME6UJFk4ma5Y5g5wIeggZaCZ3xKYfzxv54kPQ9q9SKRPHpnVib9MF6MfPcLJgej3wicCVZSicUMNzoVasiaA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



（完）