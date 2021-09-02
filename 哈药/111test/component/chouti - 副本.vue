<template>
	<view>
		<view class="cu-modal drawer-modal justify-end" :class="modalName=='DrawerModalR'?'show':''">
			<view class="cu-dialog basis-lg" @tap.stop=""
				:style="[{top:CustomBar +'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				<view class="cu-list menu text-left">
					<!-- 交货类型 -->
					<view class="choosedTitle">
						<p><text class="cuIcon-newshot"></text><label>{{choosedTitle}}</label></p>
					</view>
					<view class="cu-item" :class="{current:serviceTypeCur[index]}" v-if="isserviceType"
						v-for="(item,index) in serviceTypeListArr"
						@click="chooseDeliveryItem(index,item.text,item.value)">
						<view class="dian">{{item.text}}</view>
						<div class="duigou"></div>
					</view>
					<!-- 销售组织 -->
					<view class="choosedTitle">
						<p><text class="cuIcon-newshot"></text><label>{{choosedTitle}}</label></p>
					</view>
					<view class="cu-item" :class="{current:serviceTypeCur[index]}" v-if="isserviceType"
						v-for="(item,index) in serviceTypeListArr"
						@click="chooseSellItem(index,item.text,item.value)">
						<view class="dian">{{item.text}}</view>
						<div class="duigou"></div>
					</view>
					<!-- 分销渠道 -->
					<view class="choosedTitle">
						<p><text class="cuIcon-newshot"></text><label>{{choosedTitle}}</label></p>
					</view>
					<view class="cu-item" :class="{current:serviceTypeCur[index]}" v-if="isserviceType"
						v-for="(item,index) in serviceTypeListArr"
						@click="chooseDistributionItem(index,item.text,item.value)">
						<view class="dian">{{item.text}}</view>
						<div class="duigou"></div>
					</view>
					<!-- 发货状态 -->
					<view class="choosedTitle">
						<p><text class="cuIcon-newshot"></text><label>{{choosedTitle}}</label></p>
					</view>
					<view class="cu-item" :class="{current:serviceTypeCur[index]}" v-if="isserviceType"
						v-for="(item,index) in serviceTypeListArr"
						@click="chooseStatusItem(index,item.text,item.value)">
						<view class="dian">{{item.text}}</view>
						<div class="duigou"></div>
					</view>
					<!-- 销售办事处 -->
					<view class="choosedTitle">
						<p><text class="cuIcon-newshot"></text><label>{{choosedTitle}}</label></p>
					</view>
					<view class="cu-item" :class="{current:serviceTypeCur[index]}" v-if="isserviceType"
						v-for="(item,index) in serviceTypeListArr"
						@click="chooseOfficeItem(index,item.text,item.value)">
						<view class="dian">{{item.text}}</view>
						<div class="duigou"></div>
					</view>
					<!-- 创建日期 -->
					<view class="choosedTitle">
						<p><text class="cuIcon-newshot"></text><label>{{choosedTitle}}</label></p>
					</view>
					<view class="cu-item" :class="{current:serviceTypeCur[index]}" v-if="isserviceType"
						v-for="(item,index) in serviceTypeListArr"
						@click="chooseDateItem(index,item.text,item.value)">
						<view class="dian">{{item.text}}</view>
						<div class="duigou"></div>
					</view>
					

				</view>
				<view style="width: 100%;height:48px;"></view>
				<view class="confirmBtn">
					<button type="button" class="cu-btn round bg-white lg" @click="cancelBtn">取消</button>
					<button type="button" class="cu-btn round bg-blue lg" style="background-color: #47a4ff;"
						@click="confirmBtn">确定</button>
				</view>
			</view>
		</view>
		<tki-tree ref="tkitree" :selectParent="true" :multiple="true" :range="range" rangeKey="departName"
			confirmColor="#4e8af7" @confirm="getChoosedDepartmentItem" @cancel="choosedCancel" v-show='showTree' />
	</view>
</template>

<script>
	import {
		http
	} from '@/common/service/service.js'
	import tkiTree from "@/components/tki-tree/tki-tree.vue"
	export default {
		name: 'chouti',
		components: {
			tkiTree
		},
		props: {
			
			// 服务类型
			serviceType: String,
			// 提报部门
			chooseDepartment: String,
			// 提报用户
			reportingUser: String,
			// 提报时间
			reportingtime: String,
			// 期望完成
			expectedtime: String,
			// 系统模块
			systemmodule: String,
			// 运维人员
			operationperson: String,
			// 紧急程度
			urgency: String,
			// 服务状态
			demandstatus: String,
			// 审批状态
			approvalstatus: String,
			// 取消状态
			cancelstatus: String,
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				modalName: null,
				paramValue: '',


				resultCur: [],
				choosedResultList: [],
				//资产类别


				//使用部门
				dptCur: [],
				choosedDptList: [], //使用部门列表里，被选中的项+没被选中的项
				//获取所有提报部门列表
				assetUrl: "l",
				assetListArr: [],
				assetChoosedLength: 0,
				assetChoosedArr: [],


				//服务类型
				fuwuleixing: [],
				serviceTypeUrl: "/o2m/amsServTyp/listAsDict",
				serviceTypeListArr: [],
				serviceTypeChoosedCount: 0,
				serviceTypeChoosedArr: [],
				isserviceType: false,
				serviceTypeCur: [],
				choosedserviceTypeList: [],

				//提报部门
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

				//提报用户
				tibaoyonghu: [],
				arr: [],
				reportingUserUrl: "/sys/user/list",
				reportingUserListArr: [],
				reportingUserChoosedCount: 0,
				reportingUserChoosedArr: [],
				isreportingUser: false,
				reportingUserCur: [],
				choosedReportingUserList: [],
				realname: '',

				//提报时间
				reportingTimeUrl: "/sys/dict/getDictItems/ams_tm_indays",
				reportingTimeListArr: [],
				reportingTimeCur: [],
				isreportingTime: false, //3.提报时间
				choosedreportingTimeList: [],
				reportingTimeChoosedItem: {
					text: "",
					value: ""
				},

				//期望完成
				expectedTimeUrl: "/sys/dict/getDictItems/ams_tm_indays",
				expectedTimeListArr: [],
				expectedTimeCur: [],
				isexpectedTime: false,
				choosedexpectedTimeList: [],
				expectedTimeChoosedItem: {
					text: "",
					value: ""
				},

				//系统模块
				xitongmokuai: [],
				systemModuleUrl: "/o2m/amsSysMod/listAsDict",
				systemModuleListArr: [],
				systemmoduleChoosedCount: 0,
				systemmoduleChoosedArr: [],
				issystemmodule: false, //5.系统模块
				systemModuleCur: [],
				choosedsystemModuleList: [],

				//6.运维人员
				yunweirenyuan: [],
				operationPersonUrl: "/o2m/amsSupt/listAsDict",
				operationPersonListArr: [],
				operationpersonChoosedCount: 0,
				operationpersonChoosedArr: [],
				isoperationperson: false,
				operationPersonCur: [],
				choosedOperationPersonList: [],

				//紧急程度
				jinjichengdu: [],
				urgencyUrl: "/sys/dict/getDictItems/ams_urgen",
				urgencyListArr: [],
				urgencyChoosedCount: 0,
				urgencyChoosedArr: [],
				isurgency: false,
				urgencyCur: [],
				choosedUrgencyList: [],

				//服务状态
				fuwuzhuangtai: [],
				demandStatusUrl: "/sys/dict/getDictItems/ams_srsta",
				demandStatusListArr: [],
				demandStatusCount: 0,
				demandStatusChoosedArr: [],
				isdemandstatus: false, //8.
				demandStatusCur: [],
				choosedDemandStatusList: [],

				//9.审批状态
				shenpizhuangtai: [],
				approvalStatusUrl: "/sys/dict/getDictItems/ams_apval",
				approvalStatusListArr: [],
				approvalStatusCount: 0,
				approvalStatusChoosedArr: [],
				isapprovalstatus: false,
				approvalStatusCur: [],
				choosedApprovalStatusList: [],

				//10.取消状态
				quxiaozhuangtai: [],
				cancelStatusUrl: "/sys/dict/getDictItems/ams_cancl",
				cancelStatusListArr: [],
				cancelStatusCount: 0,
				cancelStatusChoosedArr: [],
				iscancelstatus: false,
				cancelStatusCur: [],
				choosedCancelStatusList: [],

				//默认隐藏提报部门树
				showTree: false,
				//提报用户上拉加载
				pageNo: 1,
				pageStatus: "more",
				//筛选面板标题
				choosedTitle: '',
				
				arr:[],
			};
		},
		watch: {
			realname: {
				handler(newVal, oldVal) {
					if (newVal) {
						this.queryreportingUserList(newVal);
					} else if (newVal == '') {
						this.reportingUserListArr = [];
					}
				},
				deep: true, //true 深度监听
			}
		},
		created() {},
		methods: {
			//提报用户上拉加载
			loadMoreData() {
				this.pageNo++
				this.queryreportingUserList(this.realname);
			},
			//提报部门
			showSelectTree() {
				this.showTree = true;
				this.$refs.tkitree._show();
			},
			showChouTi(param, param2, param3) {
				this.paramValue = param;
				//交货类型
				if (param == 'deliveryClick') {
					//获取所有服务类型的列表
					this.fuwuleixing = param2
					console.log('交货类型:', this.fuwuleixing);
					this.queryDeliveryList();
					this.choosedTitle = "交货类型";
				}
				//销售组织
				if (param == 'sellClick') {
					//获取所有服务类型的列表
					this.fuwuleixing = param2
					console.log('销售组织:', this.fuwuleixing);
					this.querySellList();
					this.choosedTitle = "销售组织";
				}
				
				//分销渠道
				if (param == 'distributionClick') {
					//获取所有服务类型的列表
					this.fuwuleixing = param2
					console.log('分销渠道:', this.fuwuleixing);
					this.queryDistributionList();
					this.choosedTitle = "分销渠道";
				}
				//发货状态
				if (param == 'statusClick') {
					//获取所有服务类型的列表
					this.fuwuleixing = param2
					console.log('发货状态:', this.fuwuleixing);
					this.queryStatusList();
					this.choosedTitle = "发货状态";
				}
				//销售办事处
				if (param == 'officeClick') {
					//获取所有服务类型的列表
					this.fuwuleixing = param2
					console.log('销售办事处:', this.fuwuleixing);
					this.queryOfficeList();
					this.choosedTitle = "销售办事处";
				}
				//创建日期
				
				if (param == 'dateClick') {
					//获取所有服务类型的列表
					this.fuwuleixing = param2
					console.log('创建日期:', this.fuwuleixing);
					this.queryDateList();
					this.choosedTitle = "创建日期";
				}
				this.modalName = "DrawerModalR"
			},
			hideModal(e) {
				this.modalName = null
			},
			//获取所有服务类型的列表
			queryserviceTypeList() {
				let _this = this;
				_this.choosedserviceTypeList = [];
				_this.$http.get(_this.serviceTypeUrl, {
					params: {}
				}).then(res => {
					if (res.data.success) {
						if (res.data) {
							_this.serviceTypeListArr = res.data.result
							console.log('服务类型列表：', _this.serviceTypeListArr)
							_this.isserviceType = true,
								_this.ischooseDepartment = false,
								_this.isreportingUser = false
							_this.isreportingtime = false //3.提报时间
							_this.isexpectedtime = false //4.期望完成
							_this.issystemmodule = false //5.系统模块
							_this.isoperationperson = false //6.运维人员
							_this.isurgency = false //7.紧急程度
							_this.isdemandstatus = false //8.服务状态
							_this.isapprovalstatus = false //9.审批状态
							_this.iscancelstatus = false //10.取消状态

							_this.serviceTypeCur = [] //服务类型
							_this.serviceTypeListArr.forEach(index => {
								_this.serviceTypeCur.push(false);
							})
							for (var i = 0; i < _this.serviceTypeListArr.length; i++) {
								_this.choosedserviceTypeList.push('');
								for (var j = 0; j < _this.fuwuleixing.length; j++) {
									if (_this.serviceTypeListArr[i].value == _this.fuwuleixing[j].value) {
										_this.$set(_this.serviceTypeCur, i, true)

										//将传过来的项，赋值到列表中对应的项
										_this.choosedserviceTypeList.splice(i, 0, {
											text: _this.serviceTypeListArr[i].text,
											value: _this.serviceTypeListArr[i].value
										});
										_this.choosedserviceTypeList.splice(i + 1, 1); //移除原来位置上的该元素
									}
								}
							}

							_this.serviceTypeChoosedArr = []
							for (var i = 0; i < _this.choosedserviceTypeList.length; i++) {
								if (_this.choosedserviceTypeList[i]) {
									_this.serviceTypeChoosedArr.push(_this.choosedserviceTypeList[i])
								}
							}
							_this.serviceTypeChoosedCount = _this.serviceTypeChoosedArr.length
							console.log('被选中的有几项：', _this.serviceTypeChoosedCount);


						}
					} else {
						this.serviceTypeListArr = []
						console.log("请求错误")
						uni.showModal({
							content: res.data.message,
							showCancel: false,
							confirmText: '关闭',
						})
					}
				}).catch(e => {
					console.log("请求错误", e)
					this.errorDialogText = "请求异常，请联系管理员！"
					this.errorDialogShow = "show"
				})
			},
			//提报部门
			querychooseDepartmentList() {
				let _this = this;
				_this.$http.get(_this.chooseDepartmentUrl, {
					params: {}
				}).then(res => {
					if (res.data.success) {
						_this.chooseDepartmentListArr = res.data.result

						_this.isserviceType = false
						_this.isreportingUser = false
						_this.isreportingtime = false //3.提报时间
						_this.isexpectedtime = false //4.期望完成
						_this.issystemmodule = false //5.系统模块
						_this.isoperationperson = false //6.运维人员
						_this.isurgency = false //7.紧急程度
						_this.isdemandstatus = false //8.服务状态
						_this.isapprovalstatus = false //9.审批状态
						_this.iscancelstatus = false //10.取消状态
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
						_this.chooseDepartmentListArr = []
						console.log("请求错误")
						uni.showModal({
							content: res.data.message,
							showCancel: false,
							confirmText: '关闭',
						})
					}
				}).catch(e => {
					console.log("请求错误", e)
					_this.errorDialogText = "请求异常，请联系管理员！"
					_this.errorDialogShow = "show"
				})
			},
			//获取提报用户
			queryreportingUserList(val) {
				let _this = this;
				_this.isserviceType = false
				_this.ischooseDepartment = false,
					_this.isreportingUser = true
				_this.isreportingtime = false //3.提报时间
				_this.isexpectedtime = false //4.期望完成
				_this.issystemmodule = false //5.系统模块
				_this.isoperationperson = false //6.运维人员
				_this.isurgency = false //7.紧急程度
				_this.isdemandstatus = false //8.服务状态
				_this.isapprovalstatus = false //9.审批状态
				_this.iscancelstatus = false //10.取消状态

				if (val == '') {

				} else {
					_this.$http.get(_this.reportingUserUrl, {
						params: {
							realname: '*' + val + '*',
							pageNo: _this.pageNo,
							pageSize: '10'
						}
					}).then(res => {
						if (res.data.success) {
							_this.reportingUserListArr = res.data.result.records;
							_this.reportingUserCur = []
							_this.reportingUserListArr.forEach(index => {
								_this.reportingUserCur.push(false)
							});
							_this.choosedReportingUserList = _this.tibaoyonghu;
							for (var i = 0; i < _this.reportingUserListArr.length; i++) {
								for (var j = 0; j < _this.tibaoyonghu.length; j++) {
									if (_this.reportingUserListArr[i].username == _this.tibaoyonghu[j].value) {
										_this.$set(_this.reportingUserCur, i, true);
									}
								}
							}
							_this.reportingUserChoosedArr = []
							for (var i = 0; i < _this.choosedReportingUserList.length; i++) {
								if (_this.choosedReportingUserList[i]) {
									_this.reportingUserChoosedArr.push(_this.choosedReportingUserList[i]);
								}
							}
							_this.reportingUserChoosedCount = _this.reportingUserChoosedArr.length;
						} else {
							_this.reportingUserListArr = []
							console.log("请求错误")
							uni.showModal({
								content: res.data.message,
								showCancel: false,
								confirmText: '关闭',
							})
						}
					}).catch(e => {
						console.log("请求错误", e)
						_this.errorDialogText = "请求异常，请联系管理员！"
						_this.errorDialogShow = "show"
					})
				}
			},
			//去重
			unique(arr) {
				const res = new Map();
				return arr.filter((arr) => !res.has(arr.value) && res.set(arr.value, 1))
			},
			//提报时间
			queryreportingTimeList() {
				let _this = this;
				_this.$http.get(_this.reportingTimeUrl, {
					params: {}
				}).then(res => {
					if (res.data.success) {
						_this.reportingTimeListArr = res.data.result
						console.log('提报时间列表：', _this.reportingTimeListArr)

						_this.isserviceType = false
						_this.ischooseDepartment = false
						_this.isreportingUser = false
						_this.isreportingtime = true //3.提报时间
						_this.isexpectedtime = false //4.期望完成
						_this.issystemmodule = false //5.系统模块
						_this.isoperationperson = false //6.运维人员
						_this.isurgency = false //7.紧急程度
						_this.isdemandstatus = false //8.服务状态
						_this.isapprovalstatus = false //9.审批状态
						_this.iscancelstatus = false //10.取消状态

						_this.reportingTimeCur = []
						for (var i = 0; i < _this.reportingTimeListArr.length; i++) {
							_this.reportingTimeCur.push(false);
							_this.choosedreportingTimeList.push('')

							if (_this.reportingTimeListArr[i].value == _this.reportingtime) {
								_this.$set(_this.reportingTimeCur, i, true)
							}
						}
					} else {
						_this.reportingTimeListArr = []
						console.log("请求错误")
						uni.showModal({
							content: res.data.message,
							showCancel: false,
							confirmText: '关闭',
						})
					}
				}).catch(e => {
					console.log("请求错误", e)
					_this.errorDialogText = "请求异常，请联系管理员！"
					_this.errorDialogShow = "show"
				})
			},
			//期望完成
			queryexpectedTimeList() {
				let _this = this;
				_this.$http.get(_this.expectedTimeUrl, {
					params: {}
				}).then(res => {
					if (res.data.success) {
						_this.expectedTimeListArr = res.data.result
						console.log('期望完成时间：', _this.expectedTimeListArr)

						_this.isserviceType = false
						_this.ischooseDepartment = false,
							_this.isreportingUser = false
						_this.isreportingtime = false //3.提报时间
						_this.isexpectedtime = true //4.期望完成
						_this.issystemmodule = false //5.系统模块
						_this.isoperationperson = false //6.运维人员
						_this.isurgency = false //7.紧急程度
						_this.isdemandstatus = false //8.服务状态
						_this.isapprovalstatus = false //9.审批状态
						_this.iscancelstatus = false //10.取消状态

						_this.expectedTimeCur = []
						for (var i = 0; i < _this.expectedTimeListArr.length; i++) {
							_this.expectedTimeCur.push(false);
							_this.choosedexpectedTimeList.push('')

							if (_this.expectedTimeListArr[i].value == _this.expectedtime) {
								_this.$set(_this.expectedTimeCur, i, true)
							}
						}
					} else {
						_this.expectedTimeListArr = []
						console.log("请求错误")
						uni.showModal({
							content: res.data.message,
							showCancel: false,
							confirmText: '关闭',
						})
					}
				}).catch(e => {
					console.log("请求错误", e)
					_this.errorDialogText = "请求异常，请联系管理员！"
					_this.errorDialogShow = "show"
				})
			},

			//系统模块
			querysystemModuleList() {
				let _this = this;
				_this.choosedsystemModuleList = [];
				_this.$http.get(_this.systemModuleUrl, {
					params: {}
				}).then(res => {
					if (res.data.success) {
						_this.systemModuleListArr = res.data.result
						console.log('系统模块：', _this.systemModuleListArr)

						_this.isserviceType = false
						_this.ischooseDepartment = false,
							_this.isreportingUser = false
						_this.isreportingtime = false //3.提报时间
						_this.isexpectedtime = false //4.期望完成
						_this.issystemmodule = true //5.系统模块
						_this.isoperationperson = false //6.运维人员
						_this.isurgency = false //7.紧急程度
						_this.isdemandstatus = false //8.服务状态
						_this.isapprovalstatus = false //9.审批状态
						_this.iscancelstatus = false //10.取消状态

						_this.systemModuleCur = []
						_this.systemModuleListArr.forEach(index => {
							_this.systemModuleCur.push(false)
						})
						for (var i = 0; i < _this.systemModuleListArr.length; i++) {
							_this.choosedsystemModuleList.push('')
							for (var j = 0; j < _this.xitongmokuai.length; j++) {
								if (_this.systemModuleListArr[i].value == _this.xitongmokuai[j].value) {
									_this.$set(_this.systemModuleCur, i, true)

									//将传过来的项，赋值到列表中对应的项
									_this.choosedsystemModuleList.splice(i, 0, {
										text: _this.systemModuleListArr[i].symod,
										value: _this.systemModuleListArr[i].value
									});
									_this.choosedsystemModuleList.splice(i + 1, 1); //移除原来位置上的该元素
								}
							}
						}
						_this.systemmoduleChoosedArr = []
						for (var i = 0; i < _this.choosedsystemModuleList.length; i++) {
							if (_this.choosedsystemModuleList[i]) {
								_this.systemmoduleChoosedArr.push(_this.choosedsystemModuleList[i])
							}
						}
						_this.systemmoduleChoosedCount = _this.systemmoduleChoosedArr.length

					} else {
						_this.systemModuleListArr = []
						console.log("请求错误")
						uni.showModal({
							content: res.data.message,
							showCancel: false,
							confirmText: '关闭',
						})
					}
				}).catch(e => {
					console.log("请求错误", e)
					_this.errorDialogText = "请求异常，请联系管理员！"
					_this.errorDialogShow = "show"
				})
			},

			//运维人员
			queryoperationPersonList() {
				let _this = this;
				_this.$http.get(_this.operationPersonUrl, {
					params: {}
				}).then(res => {
					if (res.data.success) {
						_this.operationPersonListArr = res.data.result
						console.log('运维人员：', _this.operationPersonListArr)

						_this.isserviceType = false
						_this.ischooseDepartment = false,
							_this.isreportingUser = false
						_this.isreportingtime = false //3.提报时间
						_this.isexpectedtime = false //4.期望完成
						_this.issystemmodule = false //5.系统模块
						_this.isoperationperson = true //6.运维人员
						_this.isurgency = false //7.紧急程度
						_this.isdemandstatus = false //8.服务状态
						_this.isapprovalstatus = false //9.审批状态
						_this.iscancelstatus = false //10.取消状态

						_this.operationPersonCur = []
						_this.operationPersonListArr.forEach(index => {
							_this.operationPersonCur.push(false)
						})
						for (var i = 0; i < _this.operationPersonListArr.length; i++) {
							_this.choosedOperationPersonList.push('')
							for (var j = 0; j < _this.yunweirenyuan.length; j++) {
								if (_this.operationPersonListArr[i].value == _this.yunweirenyuan[j].value) {
									_this.$set(_this.operationPersonCur, i, true)

									//将传过来的项，赋值到列表中对应的项
									_this.choosedOperationPersonList.splice(i, 0, {
										text: _this.operationPersonListArr[i].text,
										value: _this.operationPersonListArr[i].value
									});
									_this.choosedOperationPersonList.splice(i + 1, 1); //移除原来位置上的该元素
								}
							}
						}
						_this.operationpersonChoosedArr = []
						for (var i = 0; i < _this.choosedOperationPersonList.length; i++) {
							if (_this.choosedOperationPersonList[i]) {
								_this.operationpersonChoosedArr.push(_this.choosedOperationPersonList[i]);
							}
						}
						_this.operationpersonChoosedCount = _this.operationpersonChoosedArr.length

					} else {
						_this.operationPersonListArr = []
						console.log("请求错误")
						uni.showModal({
							content: res.data.message,
							showCancel: false,
							confirmText: '关闭',
						})
					}
				}).catch(e => {
					console.log("请求错误", e)
					_this.errorDialogText = "请求异常，请联系管理员！"
					_this.errorDialogShow = "show"
				})
			},

			//紧急程度
			queryUrgencyList() {
				let _this = this;
				_this.$http.get(this.urgencyUrl, {
					params: {}
				}).then(res => {
					if (res.data.success) {
						_this.urgencyListArr = res.data.result
						console.log('紧急程度：', _this.urgencyListArr)

						_this.isserviceType = false
						_this.ischooseDepartment = false,
							_this.isreportingUser = false
						_this.isreportingtime = false //3.提报时间
						_this.isexpectedtime = false //4.期望完成
						_this.issystemmodule = false //5.系统模块
						_this.isoperationperson = false //6.运维人员
						_this.isurgency = true //7.紧急程度
						_this.isdemandstatus = false //8.服务状态
						_this.isapprovalstatus = false //9.审批状态
						_this.iscancelstatus = false //10.取消状态

						_this.urgencyCur = []
						_this.urgencyListArr.forEach(index => {
							_this.urgencyCur.push(false)
						})
						for (var i = 0; i < _this.urgencyListArr.length; i++) {
							_this.choosedUrgencyList.push('')
							for (var j = 0; j < _this.jinjichengdu.length; j++) {
								if (_this.urgencyListArr[i].value == _this.jinjichengdu[j].value) {
									_this.$set(_this.urgencyCur, i, true)

									//将传过来的项，赋值到列表中对应的项
									_this.choosedUrgencyList.splice(i, 0, {
										text: _this.urgencyListArr[i].text,
										value: _this.urgencyListArr[i].value
									});
									_this.choosedUrgencyList.splice(i + 1, 1); //移除原来位置上的该元素
								}
							}
						}
						_this.urgencyChoosedArr = []
						for (var i = 0; i < _this.choosedUrgencyList.length; i++) {
							if (_this.choosedUrgencyList[i]) {
								_this.urgencyChoosedArr.push(_this.choosedUrgencyList[i]);
							}
						}
						_this.urgencyChoosedCount = _this.urgencyChoosedArr.length
					} else {
						_this.urgencyListArr = []
						console.log("请求错误")
						uni.showModal({
							content: res.data.message,
							showCancel: false,
							confirmText: '关闭',
						})
					}
				}).catch(e => {
					console.log("请求错误", e)
					_this.errorDialogText = "请求异常，请联系管理员！"
					_this.errorDialogShow = "show"
				})
			},

			//服务状态
			querydemandStatusList() {
				this.$http.get(this.demandStatusUrl, {
					params: {}
				}).then(res => {
					if (res.data.success) {
						this.demandStatusListArr = res.data.result
						console.log('服务状态列表：', this.demandStatusListArr)

						this.isserviceType = false
						this.ischooseDepartment = false,
							this.isreportingUser = false
						this.isreportingtime = false //3.提报时间
						this.isexpectedtime = false //4.期望完成
						this.issystemmodule = false //5.系统模块
						this.isoperationperson = false //6.运维人员
						this.isurgency = false //7.紧急程度
						this.isdemandstatus = true //8.服务状态
						this.isapprovalstatus = false //9.审批状态
						this.iscancelstatus = false //10.取消状态

						this.demandStatusCur = []
						this.demandStatusListArr.forEach(index => {
							this.demandStatusCur.push(false)
						})

						for (var i = 0; i < this.demandStatusListArr.length; i++) {
							this.choosedDemandStatusList.push('')
							for (var j = 0; j < this.fuwuzhuangtai.length; j++) {
								if (this.demandStatusListArr[i].value == this.fuwuzhuangtai[j].value) {
									this.$set(this.demandStatusCur, i, true)

									//将传过来的项，赋值到列表中对应的项
									this.choosedDemandStatusList.splice(i, 0, {
										text: this.demandStatusListArr[i].text,
										value: this.demandStatusListArr[i].value
									});
									this.choosedDemandStatusList.splice(i + 1, 1); //移除原来位置上的该元素
								}
							}
						}
						this.demandStatusChoosedArr = []
						for (var i = 0; i < this.choosedDemandStatusList.length; i++) {
							if (this.choosedDemandStatusList[i]) {
								this.demandStatusChoosedArr.push(this.choosedDemandStatusList[i]);
							}
						}
						this.demandStatusCount = this.demandStatusChoosedArr.length
					} else {
						this.demandStatusListArr = []
						console.log("请求错误")
						uni.showModal({
							content: res.data.message,
							showCancel: false,
							confirmText: '关闭',
						})
					}
				}).catch(e => {
					console.log("请求错误", e)
					this.errorDialogText = "请求异常，请联系管理员！"
					this.errorDialogShow = "show"
				})
			},

			//审批状态
			queryapprovalStatusList() {
				let _this = this;
				_this.$http.get(_this.approvalStatusUrl, {
					params: {}
				}).then(res => {
					if (res.data.success) {
						_this.approvalStatusListArr = res.data.result
						console.log('审批状态：', _this.approvalStatusListArr)

						_this.isserviceType = false
						_this.ischooseDepartment = false,
							_this.isreportingUser = false
						_this.isreportingtime = false //3.提报时间
						_this.isexpectedtime = false //4.期望完成
						_this.issystemmodule = false //5.系统模块
						_this.isoperationperson = false //6.运维人员
						_this.isurgency = false //7.紧急程度
						_this.isdemandstatus = false //8.服务状态
						_this.isapprovalstatus = true //9.审批状态
						_this.iscancelstatus = false //10.取消状态
						_this
						_this.approvalStatusCur = []
						_this.approvalStatusListArr.forEach(index => {
							_this.approvalStatusCur.push(false)
						})

						for (var i = 0; i < _this.approvalStatusListArr.length; i++) {
							_this.choosedApprovalStatusList.push('')
							for (var j = 0; j < _this.shenpizhuangtai.length; j++) {
								if (_this.approvalStatusListArr[i].value == _this.shenpizhuangtai[j].value) {
									_this.$set(_this.approvalStatusCur, i, true)

									//将传过来的项，赋值到列表中对应的项
									_this.choosedApprovalStatusList.splice(i, 0, {
										text: _this.approvalStatusListArr[i].text,
										value: _this.approvalStatusListArr[i].value
									});
									_this.choosedApprovalStatusList.splice(i + 1, 1); //移除原来位置上的该元素
								}
							}
						}
						_this.approvalStatusChoosedArr = []
						for (var i = 0; i < _this.choosedApprovalStatusList.length; i++) {
							if (_this.choosedApprovalStatusList[i]) {
								_this.approvalStatusChoosedArr.push(_this.choosedApprovalStatusList[i]);
							}
						}
						_this.approvalStatusCount = _this.approvalStatusChoosedArr.length
					} else {
						_this.approvalStatusListArr = []
						console.log("请求错误")
						uni.showModal({
							content: res.data.message,
							showCancel: false,
							confirmText: '关闭',
						})
					}
				}).catch(e => {
					console.log("请求错误", e)
					_this.errorDialogText = "请求异常，请联系管理员！"
					_this.errorDialogShow = "show"
				})
			},

			//取消状态
			querycancelStatussList() {
				this.$http.get(this.cancelStatusUrl, {
					params: {}
				}).then(res => {
					if (res.data.success) {
						this.cancelStatusListArr = res.data.result
						console.log('取消状态：', this.cancelStatusListArr)

						this.isserviceType = false
						this.ischooseDepartment = false,
							this.isreportingUser = false
						this.isreportingtime = false //3.提报时间
						this.isexpectedtime = false //4.期望完成
						this.issystemmodule = false //5.系统模块
						this.isoperationperson = false //6.运维人员
						this.isurgency = false //7.紧急程度
						this.isdemandstatus = false //8.服务状态
						this.isapprovalstatus = false //9.审批状态
						this.iscancelstatus = true //10.取消状态

						this.cancelStatusCur = []
						this.cancelStatusListArr.forEach(index => {
							this.cancelStatusCur.push(false)
						})

						for (var i = 0; i < this.cancelStatusListArr.length; i++) {
							this.choosedCancelStatusList.push('')
							for (var j = 0; j < this.quxiaozhuangtai.length; j++) {
								if (this.cancelStatusListArr[i].value == this.quxiaozhuangtai[j].value) {
									this.$set(this.cancelStatusCur, i, true)

									//将传过来的项，赋值到列表中对应的项
									this.choosedCancelStatusList.splice(i, 0, {
										text: this.cancelStatusListArr[i].text,
										value: this.cancelStatusListArr[i].value
									});
									this.choosedCancelStatusList.splice(i + 1, 1); //移除原来位置上的该元素
								}
							}
						}
						this.cancelStatusChoosedArr = []
						for (var i = 0; i < this.choosedCancelStatusList.length; i++) {
							if (this.choosedCancelStatusList[i]) {
								this.cancelStatusChoosedArr.push(this.choosedCancelStatusList[i]);
							}
						}
						this.cancelStatusCount = this.cancelStatusChoosedArr.length
					} else {
						this.cancelStatusListArr = []
						console.log("请求错误")
						uni.showModal({
							content: res.data.message,
							showCancel: false,
							confirmText: '关闭',
						})
					}
				}).catch(e => {
					console.log("请求错误", e)
					this.errorDialogText = "请求异常，请联系管理员！"
					this.errorDialogShow = "show"
				})
			},

			//点击服务类型项
			chooseServiceTypeItem(index, item, value) {
				// 判断不进行数量的控制
				if (this.serviceTypeCur[index] == false) {
					if (this.serviceTypeChoosedCount > 4) {
						uni.showModal({
							content: "最多只能选择五项",
							showCancel: false,
							confirmText: '关闭',
						})
						return
					}
				}
				this.$set(this.serviceTypeCur, index, !this.serviceTypeCur[index])

				if (this.serviceTypeCur[index] == true) {
					this.choosedserviceTypeList.splice(index, 0, {
						text: item,
						value: value
					});
					this.choosedserviceTypeList.splice(index + 1, 1); //移除原来位置上的该元素
					this.serviceTypeChoosedCount++

				} else if (this.serviceTypeCur[index] == false) {
					this.choosedserviceTypeList.splice(index, 0, ''); //index:元素需要放置的位置索引，从0开始
					this.choosedserviceTypeList.splice(index + 1, 1); //移除原来位置上的该元素
					this.serviceTypeChoosedCount--
				}
			},

			//点击提报用户
			chooseReportingUserItem(index, item, value) {
				// 判断不进行数量的控制
				if (this.reportingUserCur[index] == false) {
					if (this.reportingUserChoosedCount > 4) {
						uni.showModal({
							content: "最多只能选择五项",
							showCancel: false,
							confirmText: '关闭',
						})
						return
					}
				}
				this.$set(this.reportingUserCur, index, !this.reportingUserCur[index]);
				if (this.reportingUserCur[index] == true) {
					this.choosedReportingUserList.splice(value, 0, {
						text: item,
						value: value
					});
					this.reportingUserChoosedCount++;
				} else if (this.reportingUserCur[index] == false) {
					for (let i = 0; i < this.choosedReportingUserList.length; i++) {
						if (value == this.choosedReportingUserList[i].value) {
							this.choosedReportingUserList.splice(i, 1);
						}
					}
					this.reportingUserChoosedCount--
				}
			},

			//点击提报部门确定按钮
			getChoosedDepartmentItem(info) {
				this.arr = info;
				if (info.length > 5) {
					uni.showModal({
						content: "最多只能选择五项",
						showCancel: false,
						confirmText: '关闭',
					})
					this.$refs.tkitree._show();
					return
				} else {
					this.departmentChoosedArr = info;
					this.$emit('getChildrenValue', 'chooseDepartment', this.departmentChoosedArr);
					this.showTree = false;
				}
			},
			//点击提报部门取消按钮
			choosedCancel() {
				this.showTree = false;
			},
			//点击提报时间
			chooseTimeItem(index, item) {
				this.reportingTimeCur = []
				for (var i = 0; i < this.reportingTimeListArr.length; i++) {
					this.reportingTimeCur.push(false)
				}

				this.$set(this.reportingTimeCur, index, !this.reportingTimeCur[index])

				if (this.reportingTimeCur[index] == true) {
					this.reportingTimeChoosedItem.text = item.text
					this.reportingTimeChoosedItem.value = item.value
				}
			},
			//期望完成
			chooseExpectedTimeItem(index, item) {
				this.expectedTimeCur = []
				for (var i = 0; i < this.expectedTimeListArr.length; i++) {
					this.expectedTimeCur.push(false)
				}

				this.$set(this.expectedTimeCur, index, !this.expectedTimeCur[index])
				if (this.expectedTimeCur[index] == true) {
					this.expectedTimeChoosedItem.text = item.text
					this.expectedTimeChoosedItem.value = item.value
				}
			},
			//系统模块
			chooseSystemModuleItem(index, item, value) {
				if (this.systemModuleCur[index] == false) {
					if (this.systemmoduleChoosedCount > 4) {
						uni.showModal({
							content: "最多只能选择五项",
							showCancel: false,
							confirmText: '关闭',
						})
						return
					}
				}
				this.$set(this.systemModuleCur, index, !this.systemModuleCur[index])
				if (this.systemModuleCur[index] == true) {
					this.choosedsystemModuleList.splice(index, 0, {
						text: item,
						value: value
					});
					this.choosedsystemModuleList.splice(index + 1, 1); //移除原来位置上的该元素
					this.systemmoduleChoosedCount++
				} else if (this.systemModuleCur[index] == false) {
					this.choosedsystemModuleList.splice(index, 0, ''); //index:元素需要放置的位置索引，从0开始
					this.choosedsystemModuleList.splice(index + 1, 1); //移除原来位置上的该元素
					this.systemmoduleChoosedCount--
				}
			},
			// 运维人员
			choosePersonItem(index, item, value) {
				if (this.operationPersonCur[index] == false) {
					if (this.operationpersonChoosedCount > 4) {
						uni.showModal({
							content: "最多只能选择五项",
							showCancel: false,
							confirmText: '关闭',
						})
						return
					}
				}
				this.$set(this.operationPersonCur, index, !this.operationPersonCur[index])
				if (this.operationPersonCur[index] == true) {
					this.choosedOperationPersonList.splice(index, 0, {
						text: item,
						value: value
					});
					this.choosedOperationPersonList.splice(index + 1, 1); //移除原来位置上的该元素
					this.operationpersonChoosedCount++
				} else if (this.operationPersonCur[index] == false) {
					this.choosedOperationPersonList.splice(index, 0, ''); //index:元素需要放置的位置索引，从0开始
					this.choosedOperationPersonList.splice(index + 1, 1); //移除原来位置上的该元素
					this.operationpersonChoosedCount--
				}
			},
			//紧急程度
			chooseUrgencyItem(index, item, value) {
				this.$set(this.urgencyCur, index, !this.urgencyCur[index])
				if (this.urgencyCur[index] == true) {
					this.choosedUrgencyList.splice(index, 0, {
						text: item,
						value: value
					});
					this.choosedUrgencyList.splice(index + 1, 1); //移除原来位置上的该元素
					this.urgencyChoosedCount++
				} else if (this.urgencyCur[index] == false) {
					this.choosedUrgencyList.splice(index, 0, ''); //index:元素需要放置的位置索引，从0开始
					this.choosedUrgencyList.splice(index + 1, 1); //移除原来位置上的该元素
					this.urgencyChoosedCount--
				}
			},
			//服务状态
			chooseDemandItem(index, item, value) {
				if (this.demandStatusCur[index] == false) {
					if (this.demandStatusCount > 4) {
						uni.showModal({
							content: "最多只能选择五项",
							showCancel: false,
							confirmText: '关闭',
						})
						return
					}
				}

				this.$set(this.demandStatusCur, index, !this.demandStatusCur[index])
				if (this.demandStatusCur[index] == true) {
					this.choosedDemandStatusList.splice(index, 0, {
						text: item,
						value: value
					});
					this.choosedDemandStatusList.splice(index + 1, 1); //移除原来位置上的该元素
					this.demandStatusCount++
				} else if (this.demandStatusCur[index] == false) {
					this.choosedDemandStatusList.splice(index, 0, ''); //index:元素需要放置的位置索引，从0开始
					this.choosedDemandStatusList.splice(index + 1, 1); //移除原来位置上的该元素
					this.demandStatusCount--
				}
			},
			//审批状态
			chooseApprovalItem(index, item, value) {
				this.$set(this.approvalStatusCur, index, !this.approvalStatusCur[index])
				if (this.approvalStatusCur[index] == true) {
					this.choosedApprovalStatusList.splice(index, 0, {
						text: item,
						value: value
					});
					this.choosedApprovalStatusList.splice(index + 1, 1); //移除原来位置上的该元素
					this.approvalStatusCount++
				} else if (this.approvalStatusCur[index] == false) {
					this.choosedApprovalStatusList.splice(index, 0, ''); //index:元素需要放置的位置索引，从0开始
					this.choosedApprovalStatusList.splice(index + 1, 1); //移除原来位置上的该元素
					this.approvalStatusCount--
				}
			},
			//取消状态
			chooseCancelItem(index, item, value) {
				this.$set(this.cancelStatusCur, index, !this.cancelStatusCur[index])
				if (this.cancelStatusCur[index] == true) {
					this.choosedCancelStatusList.splice(index, 0, {
						text: item,
						value: value
					});
					this.choosedCancelStatusList.splice(index + 1, 1); //移除原来位置上的该元素
					this.cancelStatusCount++
				} else if (this.cancelStatusCur[index] == false) {
					this.choosedCancelStatusList.splice(index, 0, ''); //index:元素需要放置的位置索引，从0开始
					this.choosedCancelStatusList.splice(index + 1, 1); //移除原来位置上的该元素
					this.cancelStatusCount--
				}
			},
			cancelBtn() {
				this.modalName = null;
				this.realname = '';
				this.reportingUserListArr = [];
				if (this.paramValue == 'reportingUser') {
					if (this.arr.length > 0) {
						let newArr = [];
						for (let i = 0; i < this.choosedReportingUserList.length; i++) {
							for (let j = 0; j < this.arr.length; j++) {
								if (this.choosedReportingUserList[i].value == this.arr[j].value) {
									newArr.push(this.choosedReportingUserList[i]);
								}
							}
						}
						this.choosedReportingUserList = newArr;
						this.reportingUserChoosedArr = [];
						for (var i = 0; i < this.choosedReportingUserList.length; i++) {
							if (this.choosedReportingUserList[i]) {
								this.reportingUserChoosedArr.push(this.choosedReportingUserList[i])
							}
						}
						this.$emit('getChildrenValue', 'reportingUser', this.reportingUserChoosedArr)
					} else {
						this.choosedReportingUserList = [];
						this.reportingUserChoosedArr = this.choosedReportingUserList;
						this.$emit('getChildrenValue', 'reportingUser', this.reportingUserChoosedArr)
					}
				}
			},
			confirmBtn() {
				this.modalName = null;
				this.realname = '';
				this.reportingUserListArr = [];
				//服务类型
				if (this.paramValue == 'serviceType') {
					this.serviceTypeChoosedArr = [];
					for (var i = 0; i < this.choosedserviceTypeList.length; i++) {
						if (this.choosedserviceTypeList[i]) {
							this.serviceTypeChoosedArr.push(this.choosedserviceTypeList[i])
						}
					}
					this.$emit('getChildrenValue', 'serviceType', this.serviceTypeChoosedArr)
				}
				// //提报部门
				// if (this.paramValue == 'chooseDepartment') {
				// 	this.$emit('getChildrenValue', 'chooseDepartment', this.departmentChoosedArr)
				// }
				//提报用户
				if (this.paramValue == 'reportingUser') {
					this.reportingUserChoosedArr = [];
					for (var i = 0; i < this.choosedReportingUserList.length; i++) {
						if (this.choosedReportingUserList[i]) {
							this.reportingUserChoosedArr.push(this.choosedReportingUserList[i])
						}
					}
					this.$emit('getChildrenValue', 'reportingUser', this.reportingUserChoosedArr)
				}
				//提报时间
				if (this.paramValue == 'reportingtime') {
					this.$emit('getChildrenValue', 'reportingtime', this.reportingTimeChoosedItem)
				}
				//期望完成
				if (this.paramValue == 'expectedtime') {
					this.$emit('getChildrenValue', 'expectedtime', this.expectedTimeChoosedItem)
				}
				//系统模块
				if (this.paramValue == 'systemmodule') {
					this.systemmoduleChoosedArr = [];
					for (var i = 0; i < this.choosedsystemModuleList.length; i++) {
						if (this.choosedsystemModuleList[i]) {
							this.systemmoduleChoosedArr.push(this.choosedsystemModuleList[i])
						}
					}
					this.$emit('getChildrenValue', 'systemmodule', this.systemmoduleChoosedArr)
				}
				//运维人员
				if (this.paramValue == 'operationperson') {
					this.operationpersonChoosedArr = [];
					for (var i = 0; i < this.choosedOperationPersonList.length; i++) {
						if (this.choosedOperationPersonList[i]) {
							this.operationpersonChoosedArr.push(this.choosedOperationPersonList[i])
						}
					}
					this.$emit('getChildrenValue', 'operationperson', this.operationpersonChoosedArr)
				}
				//紧急程度
				if (this.paramValue == 'urgency') {
					this.urgencyChoosedArr = [];
					for (var i = 0; i < this.choosedUrgencyList.length; i++) {
						if (this.choosedUrgencyList[i]) {
							this.urgencyChoosedArr.push(this.choosedUrgencyList[i])
						}
					}
					this.$emit('getChildrenValue', 'urgency', this.urgencyChoosedArr)
				}
				//服务状态
				if (this.paramValue == 'demandstatus') {
					this.demandStatusChoosedArr = [];
					for (var i = 0; i < this.choosedDemandStatusList.length; i++) {
						if (this.choosedDemandStatusList[i]) {
							this.demandStatusChoosedArr.push(this.choosedDemandStatusList[i])
						}
					}
					this.$emit('getChildrenValue', 'demandstatus', this.demandStatusChoosedArr)
				}
				//审批状态
				if (this.paramValue == 'approvalstatus') {
					this.approvalStatusChoosedArr = [];
					for (var i = 0; i < this.choosedApprovalStatusList.length; i++) {
						if (this.choosedApprovalStatusList[i]) {
							this.approvalStatusChoosedArr.push(this.choosedApprovalStatusList[i])
						}
					}
					this.$emit('getChildrenValue', 'approvalstatus', this.approvalStatusChoosedArr)
				}
				//取消状态
				if (this.paramValue == 'cancelstatus') {
					this.cancelStatusChoosedArr = [];
					for (var i = 0; i < this.choosedCancelStatusList.length; i++) {
						if (this.choosedCancelStatusList[i]) {
							this.cancelStatusChoosedArr.push(this.choosedCancelStatusList[i])
						}
					}
					this.$emit('getChildrenValue', 'cancelstatus', this.cancelStatusChoosedArr)
				}
			}


		},
		onReachBottom() {
			alert("1");
			if (this.pageStatus == 'nomore') return;
			this.loadMoreData();
		},
		mounted() {
			this.querychooseDepartmentList();
		}
	}
</script>

<style>
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
		display: flex;
		justify-content: space-around;
		position: absolute;
		bottom: 0;
		z-index: 1000;
		width: 100%;
	}

	.cu-list.menu {
		height: 100%;
	}

	.cu-btn.lg {
		height: 48px;
		line-height: 48px;
		font-size: 14px;
		width: 100%;
		border-radius: 0;
	}

	.cu-list.menu>.cu-item,
	.cu-item.current {
		height: 44px;
		line-height: 44px !important;
		min-height: 44px !important;
	}

	.dian {
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.searchInputStyle {
		padding: 5px 10px;
		height: 30px;
		font-size: 13px;
		border-radius: 4px;
		line-height: 30px;
		background-color: #ebecee;
	}

	.uni-input-placeholder {
		color: #bebec0;
		font-size: 13px;
	}

	.reportingInfo {
		height: 50px;
		padding: 10px;
		background: white;
		border-bottom: 1px solid #ebebeb;
		position: absolute;
		width: 100%;
		z-index: 1000;
	}

	.noMessage {
		text-align: center;
		height: 90%;
		padding-top: 60%;
	}

	.noMessage p {
		color: #bebebe;
		margin-top: 8px;
		font-size: 15px;
	}

	.cuIcon-searchlist {
		color: #bebebe;
		font-size: 60px;
	}

	.cu-dialog {
		background-color: #f1f0f5;
		position: relative;
		top: 0 !important;
		height: 100% !important;
	}

	.cu-modal.drawer-modal {
		display: inline-block;
	}

	.choosedTitle {
		height: 42px;
		line-height: 42px;
		padding: 0 10px;
		background: white;
		margin-bottom: 7px;
		border-bottom: 1px solid #e7e7e7;
	}

	.choosedTitle p {
		color: #0077e7;
	}

	.choosedTitle p label {
		margin-left: 3px;
		letter-spacing: 0.5px;
	}

	.choosedTitle p text {
		font-size: 15px;
	}

	>>>.uni-input-input {
		height: auto;
		line-height: 30px;
	}
</style>
