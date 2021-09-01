<template>
    <view>
        <view class="cu-modal drawer-modal justify-start" :class="modalName=='DrawerModalL'?'show':''">
            <view class="cu-dialog basis-lg drawerStyle" @tap.stop="" >
                <view class="cu-list menu text-left">
                    <view class="choosedTitle">
                        <p><text class="cuIcon-newshot"></text><label>{{titleText}}</label></p>
                    </view>
                    <!--账户组（接收用户）-->
                    <view class="cu-item" :class="{current:accountCur[index]}" v-if="isAccount" v-for="(item,index) in accountListArr" @click="chooseAccountItem(index,item.text,item.value)">
                        <view class="dian"> {{item.text}}</view>
                        <div class="duigou"></div>
                    </view>
                    <!--抄送用户-->
                    <view class="cu-item" :class="{current:chaosongCur[index]}" v-if="isChaosong" v-for="(item,index) in chaosongListArr" @click="chooseChaosongItem(index,item.text,item.value)">
                        <view class="dian"> {{item.text}}</view>
                        <div class="duigou"></div>
                    </view>
                    <!-- 公司代码（参考方案） -->
                    <view class="cu-item"  :class="{current:codeCur[index]}" v-if="isCode" v-for="(item,index) in codeListArr" @click="chooseCodeItem(index,item)">
                        <view class="dian">{{item.id}}：{{item.sltit}}</view>
                        <div class="duigou"></div>
                    </view>
                    <!-- 销售范围 -->
                    <view class="cu-item" :class="{current:rangeCur[index]}" v-if="isRange" v-for="(item,index) in rangeListArr" @click="chooseRangeItem(index,item)">
                        <view class="dian">{{item.text}}</view>
                        <div class="duigou"></div>
                    </view>


                </view>

                <view class="confirmBtn">
                    <button type="button" class="cu-btn round bg-white lg" @click="cancelBtn">取消</button>
                    <button type="button" class="cu-btn round bg-blue lg" style="background-color: #47a4ff;" @click="confirmBtn">确定</button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import {
        http
    } from '@/common/service/service.js'

    export default {
        name:'drawer',
        props:{
            //公司代码
            companyCode:String,
            // 销售范围（服务状态）
            rangeValue: String,
            //服务请求id
            serverId:String
        },
        data() {
            return {
                //begin
                CustomBar: this.CustomBar,
                modalName: null,
                paramValue:'',
                titleText:'',

                //账户组（接收用户）---多选
                zhanghuzu:[],
                accountUrl:"/o2m/bizz/amsSrMstr/getRUsrs",
                accountListArr:[],
                accountChoosedLength:0,
                accountChoosedArr:[],
                isAccount:false,
                accountCur:[],
                choosedAccountList:[],
                //抄送---多选
                chaosong:[],
                chaosongUrl:"/o2m/bizz/amsSrMstr/getRUsrs",
                chaosongListArr:[],
                chaosongChoosedLength:0,
                chaosongChoosedArr:[],
                isChaosong:false,
                chaosongCur:[],
                choosedChaosongList:[],

                //公司代码---单选
                codeListUrl: "/o2m/bizz/amsSrSolu/list",
                codeListArr:[],
                codeChoosedItem:{text:"",value:""},
                codeCur:[],
                isCode:false,
                choosedCodeList:[],


                // 销售范围---单选
                rangeListArr:[],
                rangeChoosedItem:{text:"",value:""},
                rangeCur:[],
                isRange:false,
                choosedRangeList:[],

            };
        },
        created(){

        },
        methods: {
            showChouTi(param,param2) {
                this.modalName = "DrawerModalL"

                console.log('param:',param)

                this.paramValue = param

                //账户组
                if( param == 'zhanghuzu'){
                    this.zhanghuzu = param2
                    console.log('zhanghuzu:',this.zhanghuzu)
                    this.titleText = "接收用户"
                    //获取账户组列表
                    this.queryAccountList()
                }
                //抄送
                if( param == 'chaosong'){
                    this.chaosong = param2
                    console.log('chaosong:',this.chaosong)
                    this.titleText = "抄送用户"

                    //获取抄送列表
                    this.queryChaosongList()
                }
                //公司代码
                if( param == 'companyCode'){
                    //获取所有公司代码的列表
                    this.queryCodeList()
                    this.titleText = "参考方案"

                }
                //销售范围
                if( param == 'range'){
                    this.titleText = "更新服务状态"

                    this.rangeListArr = [
                        {
                            text:'处理中',
                            value:'W'
                        },
                        {
                            text:'已处理',
                            value:'F'
                        },
                        {
                            text:'已确认',
                            value:'C'
                        },
                    ]
                    console.log('销售范围列表：', this.rangeListArr)
                    this.isAccount = false
                    this.isChaosong = false
                    this.isCode = false
                    this.isRange = true
                    this.rangeCur = []
                    for(var i = 0;i<this.rangeListArr.length;i++){
                        this.rangeCur.push(false)
                        this.choosedRangeList.push('')
                        if(this.rangeListArr[i].value == this.rangeValue){
                            this.$set(this.rangeCur,i,true)
                        }
                    }
                }


            },


            //获取账户组(接收用户)列表
            queryAccountList(){
                this.$http.get(this.accountUrl, {
                    params: {
                        id:this.serverId
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.accountListArr = res.data.result
                        console.log('账户组列表：', this.accountListArr)

                        this.isAccount = true
                        this.isChaosong = false
                        this.isCode = false
                        this.isRange = false

                        this.accountCur = []
                        this.accountListArr.forEach(index =>{
                            this.accountCur.push(false)
                        })
                        for(var i = 0;i<this.accountListArr.length;i++){
                            this.choosedAccountList.push('')
                            for(var j = 0;j<this.zhanghuzu.length;j++){
                                if(this.accountListArr[i].value == this.zhanghuzu[j].value){
                                    //将传过来的项设置高亮
                                    this.$set(this.accountCur,i,true)
                                    //将传过来的项，赋值到列表中对应的项
                                    this.choosedAccountList.splice(i, 0,{text:this.accountListArr[i].text,value:this.accountListArr[i].value});
                                    this.choosedAccountList.splice(i+1, 1);//移除原来位置上的该元素
                                }
                            }
                        }

                        this.accountChoosedArr = []
                        for(var i = 0;i<this.choosedAccountList.length;i++){
                            if(this.choosedAccountList[i]){
                                this.accountChoosedArr.push(this.choosedAccountList[i])
                            }
                        }
                        this.accountChoosedLength = this.accountChoosedArr.length
                        console.log('被选中的有几项：',this.accountChoosedLength)

                    }
                    else{
                        this.accountListArr = []
                        console.log("请求错误")
                        uni.showModal({
                            content: res.data.message,
                            showCancel: false,
                            confirmText:'关闭',
                        })
                    }
                }).catch(e => {
                    console.log("请求错误", e)
                    this.errorDialogText = "请求异常，请联系管理员！"
                    this.errorDialogShow = "show"
                })
            },
            //获取抄送列表
            queryChaosongList(){
                this.$http.get(this.chaosongUrl, {
                    params: {
                        id:this.serverId
                    }
                }).then(res => {
                    if (res.data.success) {
                        this.chaosongListArr = res.data.result
                        console.log('抄送列表：', this.chaosongListArr)

                        this.isAccount = false
                        this.isChaosong = true
                        this.isCode = false
                        this.isRange = false

                        this.chaosongCur = []
                        this.chaosongListArr.forEach(index =>{
                            this.chaosongCur.push(false)
                        })
                        console.log('00000chaosong:',this.chaosong)
                        console.log('00000chaosongListArr:',this.chaosongListArr)
                        for(var i = 0;i<this.chaosongListArr.length;i++){
                            this.choosedChaosongList.push('')
                            for(var j = 0;j<this.chaosong.length;j++){
                                if(this.chaosongListArr[i].value == this.chaosong[j].value){
                                    //将传过来的项设置高亮
                                    this.$set(this.chaosongCur,i,true)
                                    //将传过来的项，赋值到列表中对应的项
                                    this.choosedChaosongList.splice(i, 0,{text:this.chaosongListArr[i].text,value:this.chaosongListArr[i].value});
                                    console.log('1111choosedChaosongList:', this.choosedChaosongList)
                                    this.choosedChaosongList.splice(i+1, 1);//移除原来位置上的该元素
                                    console.log('2222choosedChaosongList:', this.choosedChaosongList)
                                }
                            }
                        }

                        this.chaosongChoosedArr = []
                        for(var i = 0;i<this.choosedChaosongList.length;i++){
                            if(this.choosedChaosongList[i]){
                                this.chaosongChoosedArr.push(this.choosedChaosongList[i])
                            }
                        }
                        this.chaosongChoosedLength = this.chaosongChoosedArr.length
                        console.log('被选中的有几项：',this.chaosongChoosedLength)

                    }
                    else{
                        this.chaosongListArr = []
                        console.log("请求错误")
                        uni.showModal({
                            content: res.data.message,
                            showCancel: false,
                            confirmText:'关闭',
                        })
                    }
                }).catch(e => {
                    console.log("请求错误", e)
                    this.errorDialogText = "请求异常，请联系管理员！"
                    this.errorDialogShow = "show"
                })
            },

            //获取所有公司代码的列表
            queryCodeList() {
                this.$http.get(this.codeListUrl, {
                    params: {
                    }
                }).then(res => {
                    console.log('获取参考方案列表：', res)

                    if (res.data.success) {
                        if (res.data) {
                            this.codeListArr = res.data.result.records

                            this.isAccount = false
                            this.isChaosong = false
                            this.isCode = true
                            this.isRange = false
                            console.log('@@@@@this.companyCode:',this.companyCode)
                            this.codeCur = []
                            for(var i = 0;i<this.codeListArr.length;i++){
                                this.codeCur.push(false)
                                this.choosedCodeList.push('')

                                if(this.codeListArr[i].id == this.companyCode){
                                    this.$set(this.codeCur,i,true)
                                }
                            }
                        }
                    }
                    else{
                        this.codeListArr = []
                        console.log("请求错误")
                        uni.showModal({
                            content: res.data.message,
                            showCancel: false,
                            confirmText:'关闭',
                        })
                    }
                }).catch(e => {
                    console.log("请求错误", e)
                    this.errorDialogText = "请求异常，请联系管理员！"
                    this.errorDialogShow = "show"
                })
            },



            //点击账户组列表项
            chooseAccountItem(index,text,value){
                this.$set(this.accountCur,index,!this.accountCur[index])

                if(this.accountCur[index] == true){
                    this.choosedAccountList.splice(index, 0,{text:text,value:value});
                    this.choosedAccountList.splice(index+1, 1);//移除原来位置上的该元素
                    this.accountChoosedLength ++
                }
                else if(this.accountCur[index] == false){
                    this.choosedAccountList.splice(index, 0,'');//index:元素需要放置的位置索引，从0开始
                    this.choosedAccountList.splice(index+1, 1);//移除原来位置上的该元素
                    this.accountChoosedLength --
                }
            },
            //点击抄送列表项
            chooseChaosongItem(index,text,value){
                this.$set(this.chaosongCur,index,!this.chaosongCur[index])

                if(this.chaosongCur[index] == true){
                    this.choosedChaosongList.splice(index, 0,{text:text,value:value});
                    this.choosedChaosongList.splice(index+1, 1);//移除原来位置上的该元素
                    this.chaosongChoosedLength ++
                }
                else if(this.chaosongCur[index] == false){
                    this.choosedChaosongList.splice(index, 0,'');//index:元素需要放置的位置索引，从0开始
                    this.choosedChaosongList.splice(index+1, 1);//移除原来位置上的该元素
                    this.chaosongChoosedLength --
                }
            },

            //点击公司代码（参考方案）
            chooseCodeItem(index,item){
                //不是当前项的，设置成false
                this.codeCur.forEach((item,codeIndex) =>{
                    if(index != codeIndex){
                        this.codeCur[codeIndex] = false
                    }
                })
                this.$set(this.codeCur,index,!this.codeCur[index])

                if(this.codeCur[index] == true){
                    this.codeChoosedItem.text = item.sltit
                    this.codeChoosedItem.value = item.id
                }
            },

            //点击销售渠道
            chooseRangeItem(index,item){
                this.rangeCur = []
                for(var i = 0;i<this.rangeListArr.length;i++){
                    this.rangeCur.push(false)
                }
                this.$set(this.rangeCur,index,!this.rangeCur[index])
                if(this.rangeCur[index] == true){
                    this.rangeChoosedItem.text = item.text
                    this.rangeChoosedItem.value = item.value
                }
            },

            //点击取消按钮
            cancelBtn(){
                this.modalName = null;
                // this.realname = '';
                // this.reportingUserListArr = [];
            },

            confirmBtn(){
                this.modalName = null
                //账户组
                if( this.paramValue == 'zhanghuzu'){
                    this.accountChoosedArr = []
                    for(var i = 0;i<this.choosedAccountList.length;i++){
                        if(this.choosedAccountList[i]){
                            this.accountChoosedArr.push(this.choosedAccountList[i])
                        }
                    }
                    this.$emit('getChildrenValue','zhanghuzu',this.accountChoosedArr)
                }
                //抄送
                if( this.paramValue == 'chaosong'){
                    this.chaosongChoosedArr = []
                    for(var i = 0;i<this.choosedChaosongList.length;i++){
                        if(this.choosedChaosongList[i]){
                            this.chaosongChoosedArr.push(this.choosedChaosongList[i])
                        }
                    }
                    this.$emit('getChildrenValue','chaosong',this.chaosongChoosedArr)
                }
                //公司代码
                if( this.paramValue == 'companyCode'){
                    this.$emit('getChildrenValue','companyCode',this.codeChoosedItem)
                }

                // 销售范围
                if( this.paramValue == 'range'){
                    this.$emit('getChildrenValue','range',this.rangeChoosedItem)
                }

            },



        },
        mounted(){

        }
    }
</script>

<style>
    button .cu-tag {
        position: absolute;
        top: 8upx;
        right: 8upx;
    }
    .basis-lg{flex-basis: 77%;}
    .cu-item{font-size: 14px;line-height: 48px;}
    .current{display: none;}
    .cu-item.current{display: block;background-color: #0094ff;color: #fff;position: relative;}
    .duigou{position: absolute;display: none;width: 7px;height: 13px;border-right:2px solid #fff;border-bottom:2px solid #fff;right: 15px;transform: rotate(45deg);top: 50%;margin-top:-9px;}
    .cu-item.current .duigou{display: block;}
    .confirmBtn {
        display: flex;
        justify-content: space-around;
        position: absolute;
        bottom: 0;
        z-index: 1000;
        width: 100%;
    }
    .cu-list.menu{height:90%;overflow-y: auto;}
    .cu-btn.lg{height: 30px;line-height:30px;font-size: 14px;display: block;width:70px;margin: 0 auto;padding: 0;}
    .cu-list.menu>.cu-item,.cu-item.current{height: 50px;line-height: 50px;}
    .dian{width: 100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;height: 55px;line-height: 55px;}
    .uni-scroll-view{background-color: #f1f1f1;}
    .basis-lg {
        flex-basis: 90%;
    }
    .choosedTitle{
        height: 42px;
        line-height: 42px;
        padding: 0 10px;
        background: white;
        margin-bottom: 7px;
        border-bottom: 1px solid #e7e7e7;
    }
    .choosedTitle p {
        color:#0077e7;
    }
    .choosedTitle p label{
        margin-left: 3px;
        letter-spacing: 0.5px;
    }
    .choosedTitle p text{
        font-size: 15px;
    }
    .cu-modal.drawer-modal .cu-dialog{background-color: #f1f0f5}
    .cu-btn.lg {
        height: 48px;
        line-height: 48px;
        font-size: 14px;
        width: 100%;
        border-radius: 0;
    }
</style>
