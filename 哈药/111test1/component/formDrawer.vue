q<template>
    <view>
        <view class="cu-modal drawer-modal justify-start" :class="modalName=='DrawerModalL'?'show':''" @tap="hideModal">
            <view class="cu-dialog basis-lg" @tap.stop=""
                :style="[{top:CustomBar +'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
                <view class="cu-list menu text-left">
                    <view>
                        <!-- <input type="text" class="shaixuanInput" v-if="isResponserDpt" v-model="searchDuty"
                            placeholder="责任部门"> -->
                        <input type="text" class="shaixuanInput" v-if="isResponser" v-model="searchDutyUser"
                            placeholder="责任人">
                        <input type="text" class="shaixuanInput" v-if="isStore" v-model="searchStore" placeholder="仓库">
                        <input type="text" class="shaixuanInput" v-if="isApplyDpt" v-model="searchApply"
                            placeholder="申请部门">
                        <input type="text" class="shaixuanInput" v-if="isApplier" v-model="searchApplyUser"
                            placeholder="申请人">
                        <input type="text" class="shaixuanInput" v-if="isStorer" v-model="searchStorer"
                            placeholder="申请仓库">
                        <input type="text" class="shaixuanInput" v-if="isDevice" v-model="searchDevice"
                            placeholder="设备清单">
                    </view>
                    <!-- 责任部门 -->
<!--                      <view class="cu-item" :class="{current:responserDptCur[index]}" v-if="isResponserDpt"  v-for="(item,index) in allDepartTreeList" @click="chooseResponserDpt(index,item)">-->
<!--                        <view class="dian">{{item.departName}}</view>-->
<!--                        <div class="duigou"></div>-->
<!--                    </view>-->


                    <!-- 责任人 -->
                    <view class="cu-item" :class="{current:responserCur[index]}" v-if="isResponser"
                        v-for="(item,index) in usersByDepartIdList" @click="chooseResponser(index,item)">
                        <view class="dian">{{item.realname}}</view>
                        <div class="duigou"></div>
                    </view>
                    <!-- 责任仓库 -->
                    <view class="cu-item" :class="{current:storeCur[index]}" v-if="isStore"
                        v-for="(item,index) in storeList" @click="chooseStore(index,item)">
                        <view class="dian">{{item.storeName}}</view>
                        <div class="duigou"></div>
                    </view>
                    <!-- 申请部门 -->
                    <view class="cu-item" :class="{current:applyDptCur[index]}" v-if="isApplyDpt"
                        v-for="(item,index) in currentUserDepartsList" @click="chooseApplyDpt(index,item)">
                        <view class="dian">{{item.departName}}</view>
                        <div class="duigou"></div>
                    </view>
                    <!-- 申请人 -->
                    <!-- 申请人 -->
                    <view class="cu-item" v-if="isApplier && (searchApplyUser == '' || searchApplyUser.length < 2)"
                        :class="{current:applierCur[0]}" @click="chooseApplier(0)">
                        <view class="dian">{{this.currentUserInfo.realName}}</view>
                        <div class="duigou"></div>
                    </view>
                    <!-- 申请人 -->
                    <view class="cu-item" v-else-if="isApplier && searchApplyUser.length >= 2"
                        v-for="(item,index) in usersByDepartIdList" :class="{current:applierCur[index]}"
                        @click="chooseApplier(index)">
                        <view class="dian">{{item.realname}}</view>
                        <div class="duigou"></div>
                    </view>
                    <!-- 申请仓库 -->
                    <view class="cu-item" :class="{current:storerCur[index]}" v-if="isStorer"
                        v-for="(item,index) in storeList" @click="chooseStorer(index,item)">
                        <view class="dian">{{item.storeName}}</view>
                        <div class="duigou"></div>
                    </view>
                    <!-- 设备清单 -->
                    <view class="cu-item" :class="{current:deviceCur[index]}" v-if="isDevice"
                        v-for="(item,index) in deviceListArr" @click="chooseDevice(index,item)">
                        <view class="dian">{{item.deviceName}} {{item.deviceId}}</view>
                        <div class="duigou"></div>
                    </view>

                </view>

                <view class="confirmBtn">
                    <button type="button" class="cu-btn round bg-green lg" @click="confirmBtn">确定</button>
                </view>

                <tki-tree ref="tkitree" :selectParent="true" :multiple="false" :range="range" rangeKey="departName"
                    confirmColor="#4e8af7" @confirm="getChoosedDepartmentItem" @cancel="choosedCancel" v-show='showTree'>
                </tki-tree>

            </view>


        </view>
    </view>
</template>

<script>
    import {
        http
    } from '@/common/service/service.js'

	import tkiTree from "@/components/tki-tree/tki-tree.vue"

    export default {
        name: 'formDrawer',

        components: {
            tkiTree
        },

        props: {
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
                searchDuty: '', //输入的搜索条件：责任部门名字，用户输入>=2个字符时开始搜索
                searchDutyUser: '', //输入的搜索条件：责任人名字，用户输入>=2个字符时开始搜索
                searchStore: '',
                searchApply: '',
                searchApplyUser: '',
                searchDevice: '',
                searchStorer: '',
                index: '1',

				defindObj:{},//传递过来的数据，用于抽屉内展示
                //责任部门
                responserDptListArr: [{
                    text: 'aaa',
                    value: '111'
                }, {
                    text: 'bbb',
                    value: '222'
                }, {
                    text: 'ccc',
                    value: '333'
                }],
                responserDptCur: [],
                isResponserDpt: false,
                responserDptChoosedItem: {
                    text: "",
                    value: ""
                },

                //TODO: -ymao -2021-6-17
                //【责任部门】：获取全公司部门树
                tibaobumen: [],

                chooseDepartmentUrl: "/sys/sysDepart/queryTreeList",
                chooseDepartmentListArr: [],
                departmentChoosedCount: 0,
                departmentChoosedArr: [],
                ischooseDepartment: false,
                chooseDepartmentCur: [],
                choosedchooseDepartmentList: [],
                range: [{}],
                departName: '',

                //默认隐藏【责任部门】部门树
                showTree: false,

                //责任人
                responserListArr: [{
                    text: '张华',
                    value: '444'
                }, {
                    text: '李天',
                    value: '555'
                }, {
                    text: '赵倩',
                    value: '666'
                }],
                responserCur: [],
                isResponser: false,
                responserChoosedItem: {
                    text: "",
                    value: ""
                },

                //仓库
                storeListArr: [{
                    text: '华北仓',
                    value: '777'
                }, {
                    text: '华南仓',
                    value: '888'
                }, {
                    text: '华中仓',
                    value: '999'
                }],
                storeCur: [],
                storerCur: [],
                isStore: false,
                isStorer: false,
                storeChoosedItem: {
                    text: "",
                    value: ""
                },
                storerChoosedItem: {
                    text: "",
                    value: ""
                },

                //申请部门
                applyDptListArr: [{
                    text: '开发部',
                    value: '11'
                }, {
                    text: '人力资源部',
                    value: '22'
                }, {
                    text: '销售部',
                    value: '33'
                }],
                applyDptCur: [],
                isApplyDpt: false,
                applyDptChoosedItem: {
                    text: "",
                    value: ""
                },

                //申请人
                applierListArr: [{
                    text: '张晓晓',
                    value: '1001011'
                }, {
                    text: '陈晨',
                    value: '1001012'
                }, {
                    text: '王浩',
                    value: '1001013'
                }],
                applierCur: [],
                isApplier: false,
                applierChoosedItem: {
                    text: "",
                    value: ""
                },

                //设备清单
                deviceListArr: [{
                    text: '',
                    value: ''
                }],
                deviceCur: [],
                isDevice: false,
                deviceChoosedItem: [],
                deviceChoosedArr: [],
                choosedDeviceList: [],
                deviceChoosedLength: 0,
                shebeiqingdan: [],

                //设备借领：获取设备列表
                //queryStoreDeviceListUrl: "https://wwx.qzingtech.com:3443/jeecg-boot/sapMessage/applyStoreDevice/getStoreDeviceList",
                queryStoreDeviceListUrl: "sapMessage/applyStoreDevice/getStoreDeviceList",


                //设备借领：获取指定责任人的仓库列表
                //1.若责任人为空，则返回全部仓库列表
                //2.若责任人非空，则返回对应的仓库列表
                //queryStoreListUrl: "https://wwx.qzingtech.com:3443/jeecg-boot/sapMessage/applyStore/getStoreList",
                queryStoreListUrl: "sapMessage/applyStore/getStoreList",
                storeList: [], //仓库数组

                // 1.0.获取当前用户信息
                queryLoginUserInfoUrl: "/sys/user/getLoginUserInfo",
                currentUserInfo: {}, //Json

                // (1).部门和责任人
                // 1.1.全部部门树：
                queryAllDepartTreeListUrl: "/sys/sysDepart/queryTreeList",
                allDepartTreeList: [], //全部部门树



                // 1.2.根据部门id获得部门成员：/sys/sysDepart/getUsersByDepartId? id=****
                //queryUsersByDepartIdUrl: "https://wwx.qzingtech.com:3443/jeecg-boot/sys/sysDepart/getUsersByDepartId",
                queryUsersByDepartIdUrl: "/sys/sysDepart/getUsersByDepartId",
                usersByDepartIdList: [], //根据部门id获得部门成员列表

                // 1.3.当前登录用户部门列表：/sys/user/getCurrentUserDeparts
                //queryCurrentUserDepartsUrl: "https://wwx.qzingtech.com:3443/jeecg-boot/sys/user/getCurrentUserDeparts",
                queryCurrentUserDepartsUrl: "/sys/user/getCurrentUserDeparts",
                currentUserDepartsList: [], //当前登录用户部门列表

                // 1.4.根据指定的部门id和指定的用户名-获取用户信息
                queryUsersByDepartIdAndSearchUserNameUrl: "/sys/sysDepart/getUsersByDepartIdAndSearchUserName",
                //usersByDepartIdList: [], //根据部门id获得部门成员列表

                // 1.5.【责任人搜索】根据指定的责任部门id（1个或多个）和指定的用户名-获取部门成员列表
                querySupervisorByDepartIdAndSearchUserNameUrl: "/sys/sysDepart/getSupervisorByDepartIdAndSearchUserName",
                //usersByDepartIdList: [], //根据部门id获得部门成员列表

            };
        },

        created() {

        },

        watch: {
            //【责任部门搜索框】：默认为全公司部门树
            searchDuty() {
                // console.log('---searchDuty()-【责任部门搜索框】用户输入的责任部门名字的搜索参数：this.searchDuty = ', this.searchDuty)

                this.queryAllDepartTreeList()
            },

            //【责任人搜索框】：在全公司或者指定部门搜索
            searchDutyUser() {
				this.searchDutyUser=this.searchDutyUser.trim()
                // console.log('---searchDutyUser()---【责任人搜索框】用户输入的责任人名字的搜索参数：this.searchDutyUser = ', this.searchDutyUser)

                // 根据部门id搜索部门成员（若部门id为空，则在全公司成员中搜索；若部门id非空，则在指定部门成员中搜索）
                // this.queryUsersByDepartId()
                if (this.searchDutyUser.length == 0 || this.searchDutyUser.length == 1) {

                    // 【注意】：默认不显示部门成员了，必须输入两个字符或者以上的姓名，才能在指定的部门查询
                    //this.queryLoginUserInfo()

                    // console.log(this.searchDutyUser.length, '用户输入参数长度小于等于1')
                    //根据部门id获得部门成员列表数组
                    this.usersByDepartIdList = ''

                } else if (this.searchDutyUser.length >= 2) {
                    // 1.4.根据指定的部门id和指定的用户名-获取用户信息

                    this.querySupervisorByDepartIdAndSearchUserName()
                    // console.log(this.searchDutyUser.length, '用户输入参数长度大于等于2')
                }

            },

            //【申请部门】：默认为当前用户所在部门
            searchApply() {
                this.queryCurrentUserDeparts()
            },

            //【申请人】：默认为当前用户
            searchApplyUser() {
				this.searchApplyUser=this.searchApplyUser.trim()
                // console.log('【申请人搜索框】用户输入的申请人名字的搜索参数：this.searchApplyUser = ', this.searchApplyUser)
                if (this.searchApplyUser.length == 0 || this.searchApplyUser.length == 1) {
                    this.queryLoginUserInfo()
                    // console.log(this.searchApplyUser.length, '用户输入参数长度小于等于1')
                } else if (this.searchApplyUser.length >= 2) {

                    //TODO: -ymao -这里应该是搜索部门！！！应该调用部门的方法

                    // 根据部门id搜索部门成员
                    //this.queryUsersByDepartId()

                    // 1.4.根据指定的部门id和指定的用户名-获取用户信息
                    this.queryUsersByDepartIdAndSearchUserName()

                    // console.log(this.searchApplyUser.length, '用户输入参数长度大于等于2')
                }
            },

            searchStore() {
                this.queryStoreList()
            },

            searchStorer() {
                this.queryStoreList()
            },

            searchDevice() {
                this.queryStoreDeviceList()
            },
			defindObj(){
				if(this.defindObj.supervisorStoreId){
					this.queryStoreList()
				}
				else if(this.defindObj.applyDptId){
					this.queryCurrentUserDeparts()
				}
				else if(this.defindObj.applyerId){
					this.chooseApplier(0)
				}

			}
        },

        mounted() {

            //设备借领：获取仓库列表
            this.queryStoreList()

            //设备借领： (1).部门和责任人
            // 1.0.获取当前用户信息
            this.queryLoginUserInfo()



            // 【注意】：默认不显示部门成员，必须输入两个字符或者以上的姓名，才能在指定的部门查询
            // 1.2.根据部门id获得部门成员
            // this.queryUsersByDepartId()

            // 1.3.当前登录用户部门列表
            this.queryCurrentUserDeparts()

            // 1.4.根据指定的部门id和指定的用户名-获取用户信息
            //this.queryUsersByDepartIdAndSearchUserName()

        },

        methods: {
            hideModal() {
                this.modalName = null
            },

            //【责任部门】点击显示下拉框视图--显示按钮
            showSelectTree() {
                // console.log('11111显示树')
                this.showTree = true;
                this.$refs.tkitree._show();
            },
            //【责任部门】点击显示下拉框视图--取消按钮
            choosedCancel() {
                this.showTree = false;
            },

             //【责任部门】点击显示下拉框视图--确定按钮
            getChoosedDepartmentItem(info) {
                // if (info.length > 5) {
                //     uni.showModal({
                //         content: "最多只能选择五项",
                //         showCancel: false,
                //         confirmText: '关闭',
                //     })
                //     this.$refs.tkitree._show();
                //     return
                // } else {
                //     this.departmentChoosedArr = info;
                //     this.$emit('getChildrenValue', 'chooseDepartment', this.departmentChoosedArr);
                //     this.showTree = false;
                // }

                //【责任部门】已设置单选
                this.departmentChoosedArr = info;
                // console.log('[formDrawer]: getChoosedDepartmentItem(info) -- 返回选择的责任部门，this.departmentChoosedArr：', this.departmentChoosedArr)

                if (info.length >= 1) {
                    this.responserDptChoosedItem.value = this.departmentChoosedArr[0].id
                    this.responserDptChoosedItem.text = this.departmentChoosedArr[0].departName

                    // console.log('[formDrawer]: getChoosedDepartmentItem(info) -- 返回选择的责任部门，this.responserDptChoosedItem：', this.responserDptChoosedItem)
                }

                this.showTree = false;
                this.confirmBtn()
            },

            showChouTi(param, param2) {
                this.modalName = "DrawerModalL"

                // console.log('param:', param)
				// console.log('param2',param2)
                this.paramValue = param
				this.defindObj=param2
                //责任部门
                if (param == 'responserDpt') {
                    //获取责任部门的列表
                    // this.queryCodeList()
                    this.isResponserDpt = true
                    this.isResponser = false
                    this.isStore = false
                    this.isApplyDpt = false
                    this.isApplier = false
                    this.isDevice = false
                    this.isStorer = false
                    // 1.1.全部部门树
                    this.queryAllDepartTreeList()

                    //【责任部门】点击显示下拉框视图--显示按钮
                    this.showSelectTree()
                }
                //责任人
                if (param == 'responser') {
                    //获取责任部门的列表
                    // this.queryCodeList()
                    this.isResponserDpt = false
                    this.isResponser = true
                    this.isStore = false
                    this.isApplyDpt = false
                    this.isApplier = false
                    this.isDevice = false
                    this.isStorer = false
					this.showTree = false;
                }
                //责任仓库
                if (param == 'store') {
                    //获取责任部门的列表
                    // this.queryCodeList()
                    this.isResponserDpt = false
                    this.isResponser = false
                    this.isStore = true
                    this.isApplyDpt = false
                    this.isApplier = false
                    this.isDevice = false
                    this.isStorer = false
					this.showTree = false;
                }
                //申请部门
                if (param == 'applyDpt') {
                    // this.queryCodeList()
                    this.isResponserDpt = false
                    this.isResponser = false
                    this.isStore = false
                    this.isApplyDpt = true
                    this.isApplier = false
                    this.isDevice = false
					this.showTree = false;
                }
                //申请人
                if (param == 'applier') {
                    //获取责任部门的列表
                    // this.queryCodeList()
                    this.isResponserDpt = false
                    this.isResponser = false
                    this.isStore = false
                    this.isApplyDpt = false
                    this.isApplier = true
                    this.isDevice = false
                    this.isStorer = false
					this.showTree = false;
                }
                //申请仓库
                if (param == 'storer') {
                    //获取责任部门的列表
                    // this.queryCodeList()
                    this.isStorer = true
                    this.isResponserDpt = false
                    this.isResponser = false
                    this.isStore = false
                    this.isApplyDpt = false
                    this.isApplier = false
                    this.isDevice = false
					this.showTree = false;
                }
                //设备清单
                if (param == 'device') {
                    //获取责任部门的列表
                    // this.queryCodeList()
                    this.isResponserDpt = false
                    this.isResponser = false
                    this.isStore = false
                    this.isApplyDpt = false
                    this.isApplier = false
                    this.isDevice = true
                    this.isStorer = false
					this.showTree = false;
                    this.shebeiqingdan = param2
                    // console.log('shebeiqingdan ', this.shebeiqingdan)

                    this.queryStoreDeviceList()
                }
            },


            //设备借领： (1).部门和责任人
            // 1.0.获取当前用户信息
            queryLoginUserInfo() {

                uni.showLoading({
                    title: '加载中...',
                    mask: true
                });
                this.loadingModal = true

                // console.log('= = = queryLoginUserInfo()')

                this.$http.get(this.queryLoginUserInfoUrl, {
                    params: {}
                }).then(res => {
                    // console.log('返回列表数据：', res)
                    if (res.data.success) {
                        if (res.data) {
                            // 1.0.获取当前用户信息
                            this.currentUserInfo = res.data.result
                            // console.log('返回列表数据：获取当前用户信息 this.currentUserInfo.userId == ', this.currentUserInfo)
                            // console.log('返回列表数据：获取当前用户信息 this.currentUserInfo.realName == ', this.currentUserInfo.realName)

                        }
                    } else {
                        // console.log("请求错误")
                        uni.showModal({
                            content: res.data.message,
                            showCancel: false,
                            confirmText: '关闭',
                        })
                        this.loadingModal = false
                    }
                }).catch(e => {
                    // console.log("请求错误", e)
                    uni.showModal({
                        content: "请求异常," + res.data.message,
                        showCancel: false,
                        confirmText: '关闭',
                    })
                }).finally(() => {
                    uni.hideLoading();
                    // console.log('finally')
                });
                this.loadingModal = false
            },

			//【责任部门】：获取全部部门列表
            queryAllDepartTreeList() {
                let _this = this;
                _this.$http.get(_this.chooseDepartmentUrl, {
                    params: {}
                }).then(res => {
                    console.log('获取全部部门树：',res)
                    if (res.data.success) {
                        _this.chooseDepartmentListArr = res.data.result
                        console.log('---searchDuty()-【责任部门】：获取全部部门列表树：_this.chooseDepartmentListArr = ', _this.chooseDepartmentListArr)

                        _this.ischooseDepartment = false,
                        _this.chooseDepartmentCur = [];

                        _this.chooseDepartmentListArr.forEach(index => {
                            _this.chooseDepartmentCur.push(false)
                        })

                        for (var i = 0; i < _this.chooseDepartmentListArr.length; i++) {
                            _this.choosedchooseDepartmentList.push('')

                            for (var j = 0; j < _this.tibaobumen.length; j++) {
                                if (_this.chooseDepartmentListArr[i].value == _this.tibaobumen[j].value) {
                                    _this.$set(_this.chooseDepartmentCur, i, true)
                                    //将传过来的项，赋值到列表中对应的项
                                    _this.choosedchooseDepartmentList.splice(i, 0, {
                                        text: _this.chooseDepartmentListArr[i].text,
                                        value: _this.chooseDepartmentListArr[i].value
                                    });
                                    _this.choosedchooseDepartmentList.splice(i + 1, 1); //移除原来位置上的该元素
                                }
                            }
                        }
                        _this.chooseDepartmentCur = []
                        for (var i = 0; i < _this.chooseDepartmentListArr.length; i++) {
                            if (_this.chooseDepartmentListArr[i]) {
                                _this.chooseDepartmentCur.push(_this.chooseDepartmentListArr[i]);
                            }
                        }
                        _this.range = _this.chooseDepartmentListArr;
                    } else {
                        // _this.chooseDepartmentListArr = []
                        uni.showModal({
                            content: res.data.message,
                            showCancel: false,
                            confirmText: '关闭',
                        })
                    }
                }).catch(e => {
                    // console.log("请求错误", e)
                    _this.errorDialogText = "请求异常，请联系管理员！"
                    _this.errorDialogShow = "show"
                })
            },


            // 1.4.根据指定的部门id和指定的用户名-获取部门成员列表
            queryUsersByDepartIdAndSearchUserName() {

                uni.showLoading({
                    title: '加载中...',
                    mask: true
                });
                this.loadingModal = true

                // console.log('= = = queryUsersByDepartId()')
                // console.log('= = = queryUsersByDepartId(): this.applyDptChoosedItem.value = ', this.applyDptChoosedItem.value)
                // console.log('= = = queryUsersByDepartId(): this.searchApplyUser = ', this.searchApplyUser)


                this.$http.get(this.queryUsersByDepartIdAndSearchUserNameUrl, {
                    params: {
                        dptId: this.applyDptChoosedItem.value, //申请部门编号（没选为空）
                        searchUserName: this.searchApplyUser, //搜索框输入的申请人名字对应的 userId
                    }
                }).then(res => {
                    // console.log('返回列表数据：', res)
                    if (res.data.success) {
                        if (res.data) {
                            this.queryData = res.data.result
                            //根据部门id获得部门成员列表数组
                            this.usersByDepartIdList = res.data.result
							// console.log('返回列表数据：1.4.根据指定的部门id和指定的用户名-获取部门成员列表 this.usersByDepartIdList == ',this.usersByDepartIdList)



                        }
                    } else {
                        // console.log("请求错误")
                        uni.showModal({
                            content: res.data.message,
                            showCancel: false,
                            confirmText: '关闭',
                        })
                        this.loadingModal = false
                    }
                }).catch(e => {
                    // console.log("请求错误", e)
                    uni.showModal({
                        content: "请求异常," + res.data.message,
                        showCancel: false,
                        confirmText: '关闭',
                    })
                }).finally(() => {
                    uni.hideLoading();
                    // console.log('finally')
                });
                this.loadingModal = false
            },


            // 1.5.【责任人搜索】根据指定的责任部门id（1个或多个）和指定的用户名-获取部门成员列表
            querySupervisorByDepartIdAndSearchUserName() {

                uni.showLoading({
                    title: '加载中...',
                    mask: true
                });
                this.loadingModal = true

                // console.log('= = = queryUsersByDepartId()')
                // console.log('= = = queryUsersByDepartId(): this.responserDptChoosedItem.value = ', this.responserDptChoosedItem.value)
                // console.log('= = = queryUsersByDepartId(): this.searchDutyUser = ', this.searchDutyUser)
                this.$http.get(this.querySupervisorByDepartIdAndSearchUserNameUrl, {
                    params: {

                        //TODO: -ymao -2021-6-15 -需要根据输入的责任部门和责任人名字修改参数

                        dptId: this.responserDptChoosedItem.value, //责任部门编号（没选为空）
                        searchUserName: this.searchDutyUser, //搜索框输入的责任人名字对应的 userId
                    }
                }).then(res => {
                    // console.log('返回列表数据：', res)
                    if (res.data.success) {
                        if (res.data) {
                            this.queryData = res.data.result
                            //根据部门id获得部门成员列表数组
                            this.usersByDepartIdList = res.data.result

                            // console.log('返回列表数据：1.5.【责任人搜索】根据指定的责任部门id（1个或多个）和指定的用户名-获取部门成员列表 this.usersByDepartIdList == ',this.usersByDepartIdList)

							for(var i=0;i<this.usersByDepartIdList.length;i++){
								this.responserCur[i]=false
								if(this.usersByDepartIdList[i].username==this.defindObj.supervisorId){
									this.$set(this.responserCur,i,true)
								}
							}

                        }
                    } else {
                        // console.log("请求错误")
                        uni.showModal({
                            content: res.data.message,
                            showCancel: false,
                            confirmText: '关闭',
                        })
                        this.loadingModal = false
                    }
                }).catch(e => {
                    // console.log("请求错误", e)
                    uni.showModal({
                        content: "请求异常," + res.data.message,
                        showCancel: false,
                        confirmText: '关闭',
                    })
                }).finally(() => {
                    uni.hideLoading();
                    // console.log('finally')
                });
                this.loadingModal = false
            },


            // 1.3.当前登录用户部门列表
            queryCurrentUserDeparts() {

                uni.showLoading({
                    title: '加载中...',
                    mask: true
                });
                this.loadingModal = true

                // console.log('= = = queryCurrentUserDeparts()')

                this.$http.get(this.queryCurrentUserDepartsUrl, {
                    params: {}
                }).then(res => {
                    console.log('获取当前用户所在部门：', res)
                    if (res.data.success) {
                        if (res.data) {
                            this.queryData = res.data.result
                            //获取所有申请单id列表
                            this.currentUserDepartsList = res.data.result.list

                            // console.log('返回列表数据：当前登录用户部门列表 this.currentUserDepartsList == ', this.currentUserDepartsList)

							for(var i=0;i<this.currentUserDepartsList.length;i++){
								this.applyDptCur[i]=false
								if(this.currentUserDepartsList[i].id==this.defindObj.applyDptId){
									this.$set(this.applyDptCur,i,true)
								}
							}


                        }
                    } else {
                        // console.log("请求错误")
                        uni.showModal({
                            content: res.data.message,
                            showCancel: false,
                            confirmText: '关闭',
                        })
                        this.loadingModal = false
                    }
                }).catch(e => {
                    // console.log("请求错误", e)
                    uni.showModal({
                        content: "请求异常," + res.data.message,
                        showCancel: false,
                        confirmText: '关闭',
                    })
                }).finally(() => {
                    uni.hideLoading();
                    // console.log('finally')
                });
                this.loadingModal = false
            },


            //设备借领：获取仓库列表
            queryStoreList() {

                uni.showLoading({
                    title: '加载中...',
                    mask: true
                });
                this.loadingModal = true

                // console.log('= = = queryStoreList()')

                // console.log('query---搜索',this.searchNameTXT50)

                this.$http.get(this.queryStoreListUrl, {
                    params: {
                        //1.若责任人为空，则返回全部仓库列表
                        //2.若责任人非空，则返回对应的仓库列表
                        supervisorId: '', //'10002550', //责任人 不必填 单值
                    }
                }).then(res => {
                    // console.log('返回列表数据：', res)
                    if (res.data.success) {
                        if (res.data) {
                            this.queryData = res.data.result
                            //仓库数组
                            this.storeList = res.data.result.records

                            // console.log('返回列表数据：仓库列表 this.storeList == ', this.storeList)

                            for(var i=0;i<this.storeList.length;i++){
                            	this.storeCur[i]=false
                            	if(this.storeList[i].storeId==this.defindObj.supervisorStoreId){
                            		this.$set(this.storeCur,i,true)
                            	}
                            }
                        }
                    } else {
                        // console.log("请求错误")
                        uni.showModal({
                            content: res.data.message,
                            showCancel: false,
                            confirmText: '关闭',
                        })
                        this.loadingModal = false
                    }
                }).catch(e => {
                    // console.log("请求错误", e)
                    uni.showModal({
                        content: "请求异常," + res.data.message,
                        showCancel: false,
                        confirmText: '关闭',
                    })
                }).finally(() => {
                    uni.hideLoading();
                    // console.log('finally')
                });
                this.loadingModal = false
            },


            //设备借领：获取设备列表
            queryStoreDeviceList() {

                uni.showLoading({
                    title: '加载中...',
                    mask: true
                });
                this.loadingModal = true


                this.$http.get(this.queryStoreDeviceListUrl, {
                    params: {
                        //deviceState: '0', //设备状态 0： 获取所有设备
                        deviceState: '1', //设备状态 1: 获取闲置的设备
                        // 0：所有设备
                        // 1：闲置
                        // 2：借用中
                        // 3：已领用
                        // 4：归还中
                        // 5：封存
                        // 6：报废
                    }
                }).then(res => {
                    // console.log('获取设备清单数据：', res)
                    if (res.data.success) {
                        if (res.data) {
                            this.deviceListArr = res.data.result.records
                            this.deviceCur = []
                            // console.log("deviceListArr: ", this.deviceListArr)
														// console.log("传递过来的设备清单 ", this.shebeiqingdan)
                            this.deviceListArr.forEach(index => {
                                this.deviceCur.push(false)
                            })

                            for (var i = 0; i < this.deviceListArr.length; ++i) {
                                this.choosedDeviceList[i]=false
                                // console.log("11111choosedDeviceList: ", this.choosedDeviceList)

                                for (var j = 0; j < this.shebeiqingdan.length; ++j) {

                                    if ((this.deviceListArr[i].deviceId == this.shebeiqingdan[j].value)&&this.shebeiqingdan[j]!=undefined) {
                                        //将传过来的项设置高亮
                                        this.$set(this.deviceCur, i, true)

                                        //将传过来的项，赋值到列表中对应的项
                                        this.choosedDeviceList.splice(i, 0, {
                                            text: this.deviceListArr[i].deviceName,
                                            value: this.deviceListArr[i].deviceId
                                        });
                                        this.choosedDeviceList.splice(i + 1, 1); //移除原来位置上的该元素
                                    }

                                }
                            }
                            // console.log("22222choosedDeviceList:", this.choosedDeviceList)



        //                     for (var i = 0; i < this.choosedDeviceList.length; ++i) {
								// this.deviceChoosedArr[i]=''
        //                         if (this.choosedDeviceList[i]) {
        //                             this.deviceChoosedArr[i]=this.choosedDeviceList[i]
        //                         }
        //                     }
                        }
                    } else {
                        // console.log("请求错误")
                        uni.showModal({
                            content: res.data.message,
                            showCancel: false,
                            confirmText: '关闭',
                        })
                        this.loadingModal = false
                    }
                }).catch(e => {
                    // console.log("请求错误", e)
                    uni.showModal({
                        content: "请求异常," + res.data.message,
                        showCancel: false,
                        confirmText: '关闭',
                    })
                }).finally(() => {
                    uni.hideLoading();
                    // console.log('finally')
                });
                this.loadingModal = false
            },

            //点击责任部门
            // chooseResponserDpt(index, item) {
            //     this.responserDptCur = []
            //     for (var i = 0; i < this.responserDptListArr.length; i++) {
            //         this.responserDptCur.push(false)
            //     }
            //     this.$set(this.responserDptCur, index, !this.responserDptCur[index])
            //     if (this.responserDptCur[index] == true) {
            //         this.responserDptChoosedItem.text = item.departName
            //         this.responserDptChoosedItem.value = item.id
            //     }
            //     console.log('选择的责任部门：', this.responserDptChoosedItem.text)
            // },

            //点击责任人
            chooseResponser(index, item) {
                this.responserCur = []



                for (var i = 0; i < this.responserListArr.length; i++) {
                    this.responserCur.push(false)
                }
                this.$set(this.responserCur, index, !this.responserCur[index])
                if (this.responserCur[index] == true) {
                    this.responserChoosedItem.text = item.realname
                    this.responserChoosedItem.value = item.username
                }
            },

            //点击责任仓库
            chooseStore(index, item) {
                this.storeCur = []
                for (var i = 0; i < this.storeList.length; i++) {
                    this.storeCur.push(false)
                }
                this.$set(this.storeCur, index, !this.storeCur[index])
                if (this.storeCur[index] == true) {
                    this.storeChoosedItem.text = item.storeName
                    this.storeChoosedItem.value = item.storeId
                }
            },

            //点击申请部门
            chooseApplyDpt(index, item) {
                this.applyDptCur = []
                for (var i = 0; i < this.currentUserDepartsList.length; i++) {
                    this.applyDptCur.push(false)
                }
                this.$set(this.applyDptCur, index, !this.applyDptCur[index])
                if (this.applyDptCur[index] == true) {
                    this.applyDptChoosedItem.text = item.departName
                    this.applyDptChoosedItem.value = item.id
                }
            },

            //点击申请人
            chooseApplier(index) {
                this.applierCur = []
                this.$set(this.applierCur, index, !this.applierCur[index])
                this.applierChoosedItem.text = this.currentUserInfo.realName
                this.applierChoosedItem.value = this.currentUserInfo.userId
                if (this.searchApplyUser.length >= 2) {
                    for (var i = 0; i < this.usersByDepartIdList.length; i++) {
                        this.applierChoosedItem.text = this.usersByDepartIdList[i].realname
                        this.applierChoosedItem.value = this.usersByDepartIdList[i].username
                    }

                }

            },
            //点击申请仓库
            chooseStorer(index, item) {
                this.storerCur = []
                for (var i = 0; i < this.storeList.length; i++) {
                    this.storerCur.push(false)
                }
                this.$set(this.storerCur, index, !this.storerCur[index])
                if (this.storerCur[index] == true) {
                    this.storerChoosedItem.text = item.storeName
                    this.storerChoosedItem.value = item.storeId
                }
            },
            //点击设备清单
            chooseDevice(index, item) {
                this.$set(this.deviceCur, index, !this.deviceCur[index])
                if (this.deviceCur[index] == true) {
                    this.choosedDeviceList.splice(index, 0, {
                        text: item.deviceName,
                        value: item.deviceId
                    });
                    this.choosedDeviceList.splice(index + 1, 1); //移除原来位置上的该元素
                } else if (this.deviceCur[index] == false) {
                    this.choosedDeviceList.splice(index, 0, '');
                    this.choosedDeviceList.splice(index + 1, 1);
                }
            },

            confirmBtn() {
                this.modalName = null
                this.searchAll = ''
                this.searchUser = ''
                this.searchCurrent = ''
                this.searchStore = ''
                this.searchStorer = ''
                this.searchDepart = ''
                this.searchDevice = ''

                //责任部门
                if (this.paramValue == 'responserDpt') {
                    // console.log('[formDrawer]: confirmBtn() -- 返回选择的责任部门：', this.responserDptChoosedItem)
                    this.$emit('getChildrenValue', 'responserDpt', this.responserDptChoosedItem)

                    // console.log('[formDrawer]: confirmBtn() -- 返回选择的责任部门：', this.departmentChoosedArr)
                    //this.$emit('getChildrenValue', 'responserDpt', this.departmentChoosedArr);
                }
                //责任人
                if (this.paramValue == 'responser') {
                    this.$emit('getChildrenValue', 'responser', this.responserChoosedItem)
                }
                //责任仓库
                if (this.paramValue == 'store') {
                    this.$emit('getChildrenValue', 'store', this.storeChoosedItem)
                }
                //申请部门
                if (this.paramValue == 'applyDpt') {
                    this.$emit('getChildrenValue', 'applyDpt', this.applyDptChoosedItem)
                }
                //申请人
                if (this.paramValue == 'applier') {
                    this.$emit('getChildrenValue', 'applier', this.applierChoosedItem)
                }
                //申请仓库
                if (this.paramValue == 'storer') {
                    this.$emit('getChildrenValue', 'storer', this.storerChoosedItem)
                }
                //设备清单
                if (this.paramValue == 'device') {
					this.deviceChoosedArr=[]
                    // console.log('@@@@@@choosedDeviceList:', this.choosedDeviceList)

                    for (var i = 0; i < this.choosedDeviceList.length; i++) {
                        if (this.choosedDeviceList[i]) {
                            this.deviceChoosedArr.push({
								text:this.deviceListArr[i].deviceName,
								value:this.deviceListArr[i].deviceId
							})
                        }
                    }
                    // console.log('传给list的设备清单：', this.deviceChoosedArr)
                    this.$emit('getChildrenValue', 'device', this.deviceChoosedArr)
                }
            }
        },

    }
</script>

<style>
    * {
        box-sizing: border-box;
    }

    button .cu-tag {
        position: absolute;
        top: 8upx;
        right: 8upx;
    }

    .basis-lg {
        flex-basis: 77%;
    }

    .cu-item {
        font-size: 14px;
        line-height: 48px;
    }

    .current {
        display: none;
    }

    .cu-item.current {
        display: block;
        background-color: #0094ff;
        color: #fff;
        position: relative;
    }

    .duigou {
        position: absolute;
        display: none;
        width: 7px;
        height: 13px;
        border-right: 2px solid #fff;
        border-bottom: 2px solid #fff;
        right: 15px;
        transform: rotate(45deg);
        top: 50%;
        margin-top: -9px;
    }

    .cu-item.current .duigou {
        display: block;
    }

    .confirmBtn {
        width: 75px;
        margin: 15px auto 0;
    }

    .cu-list.menu {
        height: 90%;
        overflow-y: auto;
    }

    .cu-btn.lg {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        display: block;
        width: 70px;
        margin: 0 auto;
        padding: 0;
    }

    .cu-list.menu>.cu-item,
    .cu-item.current {
        height: 50px;
        line-height: 50px;
    }

    .dian {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .uni-scroll-view {
        background-color: #f1f1f1;
    }

    .basis-lg {
        -webkit-flex-basis: 82%;
        flex-basis: 82%;
    }

    .shaixuanInput {
        padding: 5px 10px;
        height: 30px;
        border: 1px solid #e9e9e9;
        margin: 10px;
        border-radius: 4px;
        background-color: #fff;
    }

    .tree-ctn {
        border-radius: 2px;
        border: 1px solid rgba(208, 208, 208, 1);
        position: relative;
        max-height: 300px;
        overflow-y: auto;
        /*  禁止选中文字 */
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        text-align: left;
    }
</style>
