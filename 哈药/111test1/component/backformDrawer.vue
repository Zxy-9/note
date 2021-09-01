<template>
    <view>
        <view class="cu-modal drawer-modal justify-start" :class="modalName=='DrawerModalL'?'show':''" @tap="hideModal">
            <view class="cu-dialog basis-lg" @tap.stop="" :style="[{top:CustomBar +'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
                <view class="cu-list menu text-left">
                    <view>
                        <input type="text" class="shaixuanInput" v-if="isApplyId" v-model="searchApplyId" placeholder="申请单号">
                        <input type="text" class="shaixuanInput" v-if="isDevice" v-model="searchDevice" placeholder="设备清单">
                    </view>
                    <!-- 申请单号 -->  
                    <view class="cu-item" :class="{current:applyNOCur[index]}" v-if="isApplyId" v-for="(item,index) in applyRecordList" 
                     @click="chooseApplyNO(index,item)">
                        <view class="dian">{{item.applyId}}</view>
                        <div class="duigou"></div>
                    </view>
                    
                    <!-- 设备清单 -->
                    <!-- <view class="bg-white pd10" >
                    <checkbox-group class="quanxuan" @change="quanxuan">
                        <view class="cu-form-group">
                            <checkbox :class="{checked:checkAll}"  :checked="checkAll"  value="全选"></checkbox>
                            <view class="checkAllText" @click="quanxuan" style="margin-top: -7px;">全选</view>
                        </view>
                    </checkbox-group> -->
                    <view class="cu-item" :class="{current:deviceCur[index]}" v-if="isDevice"  v-for="(item,index) in deviceListArr" @click="chooseDevice(index,item)">
                        <!-- <checkbox-group @change="CheckboxChange(index)">
                            <view class="cu-form-group" style="float: left; margin-left: 5px;margin-top: 4px;">
                                <checkbox :class="{checked:isChecked[index]}"  :checked="isChecked[index]" value="选择"></checkbox>
                            </view>
                        </checkbox-group> -->
                        <view class="dian">{{item.deviceName}} {{item.deviceId}}</view>
                        <div class="duigou"></div>
                    </view>
                    <!-- </view> -->
                </view>
                <view class="confirmBtn">
                    <button type="button" class="cu-btn round bg-green lg" @click="confirmBtn">确定</button>
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
        name:'formDrawer',
        props:{
            // //责任部门
            // responserDpt:String,
            // // 销售范围
            // rangeValue: String,

        },
        data() {
            return {
                CustomBar: this.CustomBar,
                modalName: null,
                paramValue: '',
                searchDevice: '',
                searchApplyId: '',

                //设备清单
                deviceListArr: [{text:'',value:''}],
                deviceCur: [],
                isDevice: false,
                deviceChoosedItem: [],
                deviceChoosedArr: [],
                choosedDeviceList: [],
                deviceChoosedLength: 0,
                shebeiqingdan: [],

                //设备借领：获取需要归还的的借用单列表 id列表
                //queryApplyRecordNeedGiveBackListUrl: "https://wwx.qzingtech.com:3443/jeecg-boot/sapMessage/applyRecord/getApplyRecordNeedGiveBackList",
                queryApplyRecordNeedGiveBackListUrl: "/sapMessage/applyRecord/getApplyRecordNeedGiveBackList",
                applyRecordList: [], //所有申请单
                applyIdList: [], //所有申请单id列表
                isApplyId: false,
                
                //设备借领：获取设备列表
                //queryApplyRecordGrandDeviceListUrl: "https://wwx.qzingtech.com:3443/jeecg-boot/sapMessage/applyRecord/getApplyRecordGrandDeviceList",
                queryApplyRecordGrandDeviceListUrl: "sapMessage/applyRecord/getApplyRecordGrandDeviceList",
                
                //申请单号
                // applyNOListArr: [{text:'笔记本',value:'1011'}, {text:'键盘',value:'1012'}, {text:'鼠标',value:'1013'}],
                applyNOCur: [],
                isApplyNO: false,
                applyNOChoosedItem: {text: "", value: ""},
                idsList: [],
                idsStr: '',
                checkedListLength: 0,
                checkAll: false,
                modalName: null,
                isChecked: [],
                list: [],
                choosedItem:{}
            };
        },
        
        created() {

        },
        
        mounted() {
        
        },
        
        watch: {
            
            searchApplyId() {
                console.log('用户输入参数',this.searchApplyId)
                this.queryApplyRecordNeedGiveBackList()
            },
            
            searchDevice() {
                this.queryApplyRecordGrandDeviceList()
            },
        },
        
        methods: {
            hideModal() {
                this.modalName = null
            },
            showChouTi(param,param2) {
                
                console.log('param:',param)
                this.paramValue = param
                
                //申请单号
                if (param == 'applyNo') {
                    this.modalName = "DrawerModalL"
                    this.list = []
                    this.isDevice = false
                    this.isApplyId = true
                    this.queryApplyRecordNeedGiveBackList()
                }
                
                //设备清单
                if (param == 'device') {
                    if (!this.choosedItem.applyId) {
                        uni.showModal({
                            content: "请选择申请单号",
                            showCancel: false,
                            confirmText:'关闭',
                        })
                        return;
                    } else {
                        this.modalName = "DrawerModalL"
                        this.deviceChoosedArr = []
                        this.isApplyId = false
                        this.isDevice = true
                        this.shebeiqingdan = param2
                        console.log('shebeiqingdan ', this.shebeiqingdan)
                        this.queryApplyRecordGrandDeviceList()
                    }
                    
                }
            },
            
            //设备借领：获取需要归还的的借用单列表 id列表
            queryApplyRecordNeedGiveBackList() {
            
                uni.showLoading({
                    title: '加载中...',
                    mask: true
                });
                this.loadingModal = true
            
                console.log('= = = queryApplyRecordNeedGiveBackList()')
                    
                this.$http.get(this.queryApplyRecordNeedGiveBackListUrl, {
                    params: {
                    }
                }).then(res => {
                    console.log('返回申请单号列表数据：', res)
                    if (res.data.success) {
                        if (res.data) {
                            this.queryData = res.data.result
                            //仓库数组
                            this.applyRecordList = res.data.result.records
                            
                            console.log('返回列表数据：获取所有 已发放且设备待归还的 领用申请单 this.applyRecordList == ', this.applyRecordList)
                            for (var i = 0; i < this.applyRecordList.length; ++i) {
                                this.list.push(this.applyRecordList[i].applyId)
                                // if(this.list[i] == this.applyRecordList[i].applyId){
                                //     this.list.supervisorDptName = this.applyRecordList[i].supervisorDptName
                                //     this.list.supervisorName = this.applyRecordList[i].supervisorName
                                //     this.list.applyStoreName = this.applyRecordList[i].applyStoreName
                                //     this.list.applyDptName = this.applyRecordList[i].applyDptName
                                //     this.list.applyerName = this.applyRecordList[i].applyerName
                                // }
                            }
                            
                            console.log('返回列表数据：获取所有  已发放且设备待归还的 领用申请单 id列表 this.list == ', this.list)
                        }
                    } else {
                        console.log("请求错误")
                        uni.showModal({
                            content: res.data.message,
                            showCancel: false,
                            confirmText:'关闭',
                        })
                        this.loadingModal = false
                    }
                }).catch(e => {
                    console.log("请求错误", e)
                    uni.showModal({
                        content: "请求异常,"+res.data.message,
                        showCancel: false,
                        confirmText:'关闭',
                    })
                }).finally(() => {
                    uni.hideLoading();
                    console.log('finally')
                });
                this.loadingModal = false
            },
            


            //设备借领：获取设备列表
            queryApplyRecordGrandDeviceList() {
                
                uni.showLoading({
                    title: '加载中...',
                    mask: true
                });
                this.loadingModal = true

                console.log('申请id',this.applyNOChoosedItem.text)
                this.$http.get(this.queryApplyRecordGrandDeviceListUrl, {
                    params: {
                        applyId: this.choosedItem.applyId, //申请单ID 必填 单值
                        //deviceState: '0', //设备状态 0： 获取所有设备
                        deviceState: '1', //设备状态 1: 获取闲置的设备
                        deviceName: '', //设备名称 不必填 单值
                        deviceId: '', //设备编号 不必填 单值
                    }
                }).then(res => {
                    console.log('获取设备清单数据：', res)
                    if (res.data.success) {
                        if (res.data) {
                            this.deviceListArr = res.data.result.records
                            this.deviceCur = []
                            console.log("deviceListArr: ", this.deviceListArr)
                            this.deviceListArr.forEach(index => {
                                this.deviceCur.push(false)
                            })
                            console.log("deviceCur:", this.deviceCur)

                            for (var i = 0; i < this.deviceListArr.length; ++i) {
                                this.choosedDeviceList.push('')
                                console.log("11111 choosedDeviceList:", this.choosedDeviceList)
                                for (var j = 0; j < this.shebeiqingdan.length; ++j) {
                                    if (this.deviceListArr[i].deviceId == this.shebeiqingdan[j].value) {
                                        //将传过来的项设置高亮
                                        this.$set(this.deviceCur,i,true)

                                        //将传过来的项，赋值到列表中对应的项
                                        this.choosedDeviceList.splice(i, 0,{text:this.deviceListArr[i].deviceName,value:this.deviceListArr[i].deviceId});
                                        this.choosedDeviceList.splice(i+1, 1);//移除原来位置上的该元素
                                    }

                                }
                            }
                            console.log("22222 choosedDeviceList:",this.choosedDeviceList)


                            this.deviceChoosedArr = []
                            for (var i = 0; i < this.choosedDeviceList.length; ++i) {
                                if (this.choosedDeviceList[i]) {
                                    this.deviceChoosedArr.push(this.choosedDeviceList[i])
                                }
                            }
                        }
                    } else {
                        console.log("请求错误")
                        uni.showModal({
                            content: res.data.message,
                            showCancel: false,
                            confirmText:'关闭',
                        })
                        this.loadingModal = false
                    }
                }).catch(e => {
                    console.log("请求错误", e)
                    uni.showModal({
                        content: "请求异常,"+res.data.message,
                        showCancel: false,
                        confirmText:'关闭',
                    })
                }).finally(() => {
                    uni.hideLoading();
                    console.log('finally')
                });
                this.loadingModal = false
            },

            //点击设备清单
            chooseDevice(index, item) {
                this.$set(this.deviceCur, index, !this.deviceCur[index])
                if (this.deviceCur[index] == true) {
                    this.choosedDeviceList.splice(index, 0, {text:item.deviceName, value:item.deviceId});
                    this.choosedDeviceList.splice(index+1, 1);//移除原来位置上的该元素
                } else if (this.deviceCur[index] == false) {
                    this.choosedDeviceList.splice(index, 0, '');
                    this.choosedDeviceList.splice(index+1, 1);
                }
            },
            
            //点击申请单号
            chooseApplyNO(index, item) {
                this.applyNOCur = []
                for (var i = 0; i < this.list.length; ++i) {
                    this.applyNOCur.push(false)
                }
                this.$set(this.applyNOCur, index, !this.applyNOCur[index])
                this.choosedItem = item
               
                console.log('选择的单号item', item)
                
            },

            confirmBtn() {
                this.modalName = null

                //申请单号
                if ( this.paramValue == 'applyNo') {
                    this.$emit('getChildrenValue','applyNo',this.choosedItem)
                }
                //设备清单
                if ( this.paramValue == 'device') {
                    console.log('@@@@@@choosedDeviceList:',this.choosedDeviceList)
                    this.deviceChoosedArr = []
                    for (var i = 0; i < this.choosedDeviceList.length; ++i) {
                        if (this.choosedDeviceList[i]) {
                            this.deviceChoosedArr.push(this.choosedDeviceList[i])
                        }
                    }
                    console.log('传给list的设备清单：', this.deviceChoosedArr)
                    this.$emit('getChildrenValue', 'device', this.deviceChoosedArr)
                }
            }


        },

    }
</script>

<style>
    *{box-sizing: border-box;}
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
    .confirmBtn{width: 75px;margin: 15px auto 0;}
    .cu-list.menu{height:90%;overflow-y: auto;}
    .cu-btn.lg{height: 30px;line-height:30px;font-size: 14px;display: block;width:70px;margin: 0 auto;padding: 0;}
    .cu-list.menu>.cu-item,.cu-item.current{height: 50px;line-height: 50px;}
    .dian{width: 100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .uni-scroll-view{background-color: #f1f1f1;}
    .basis-lg{
        -webkit-flex-basis: 82%;
        flex-basis: 82%;
    }
    .shaixuanInput{
        padding: 5px 10px;
        height: 30px;
        border: 1px solid #e9e9e9;
        margin: 10px;
        border-radius: 4px;
        background-color: #fff;
    }
    .cu-list.card-menu{margin: 0 5px 5px 5px;border-radius: 0;}
    .cu-list.menu-avatar>.cu-item .content{left: 15px;width:calc(100% - 105px);}
    .cu-list.menu-avatar>.cu-item .action{width: 75px;text-align: right;}
    .cu-list+.cu-list{margin-top: 0;}
    .cu-list.menu-avatar>.cu-item{padding: 0 5px;height: 65px;position: relative;}
    .mt20{margin-top: 20px;}
    .cu-dialog{padding: 15px;}
    .cu-list.menu-avatar>.cu-item{padding: 0 15px;}
    .cu-form-group{padding:0;padding-right: 5px;}
    .quanxuan{width: 100%;}
    .quanxuan .cu-form-group{padding: 0 6px;position: relative;}
    .mt5{margin-top: 5px;}
    .confirmBtn{width: 75px;margin: 15px auto 0;}
    .checkAllText{position: absolute;left: 45px;top: 20px;}
    .cu-btn.lg {
        padding: 0 19px;
        font-size: 15px;
        height: 30px;
        width: 80px;
    }
    .text-cut {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin-top: 5px;
        }
        
</style>
