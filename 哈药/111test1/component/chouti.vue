<template>
	<view>
		<view class="cu-modal drawer-modal justify-end" :class="modalName=='DrawerModalR'?'show':''">
			<view class="cu-dialog basis-lg" @tap.stop=""
				:style="[{top:CustomBar +'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				<view class="cu-list menu text-left">
					<view class="choosedTitle">
						<p><text class="cuIcon-newshot"></text><label>{{choosedTitle}}</label></p>
					</view>
					
					<!-- 交货类型 -->
					
								<view class="cu-item" :class="{current:deliveryCur[index]}" v-if="isDelivery"
										v-for="(item,index) in DeliverylistArr"
										@click="chooseDeliveryItem(index,item.text,item.value)">
										<view class="dian">{{item.text}}</view>
											<div class="duigou"></div>
										</view>
					<!-- 销售组织 -->
					<!-- 分销渠道 -->
					<!--发货状态 -->
					<view class="cu-item" :class="{current:statusCur[index]}" v-if="isStatus"
							v-for="(item,index) in StatuslistArr"
							@click="choosestatusItem(index,item.text,item.value)">
							<view class="dian">{{item.text}}</view>
								<div class="duigou"></div>
							</view>
					<!-- 销售办事处 -->
					<view class="cu-item" :class="{current:officeCur[index]}" v-if="isOffice"
							v-for="(item,index) in officelistArr"
							@click="chooseOfficeItem(index,item.text,item.value)">
							<view class="dian">{{item.text}}</view>
								<div class="duigou"></div>
							</view>
							<!-- 创建日期 -->
							<view class="cu-item" :class="{current:dateCur[index]}" v-if="isDate"
									v-for="(item,index) in datelistArr"  @click="chooseDateItem(index,item)">
											<view class="dian">最近一天</view>
											<div class="duigou"></div>
		
									</view>
								
						<view class="cu-form-group" >
						    <view class="title">选择时间</view>
						    <picker class="data" mode="date"  @change="starDateClick">
						        <view class="picker">
						            {{date}}
						        </view>
						    </picker>
						    <view class="polangxian">~</view>
						    <picker class="data"  mode="date"   @change="endDateClick">
						        <view class="picker">
						            {{date1}}
						        </view>
						    </picker>
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
			
		
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				modalName: null,
				paramValue: '',
				//默认隐藏提报部门树
				showTree: false,
				//提报用户上拉加载
				pageNo: 1,
				pageStatus: "more",
				//筛选面板标题
				choosedTitle: '',
				arr:[],
			
			    //交货类型
				jiaohuoleixing:[],
				deliveryUrl:"/o2m/amsServTyp/listAsDict",
				DeliverylistArr:[],
				deliveryChoosedCount:0,
				deliveryChoosedArr:[],
				isDelivery:false,
				deliveryCur:[],
				chooseddeliveryList:[],
				
				//销售组织
				xiaoshouzuzhi:[],
				sellUrl:"",
				selllistArr:[],
				sellChoosedCount:0,
				sellChoosedArr:[],
				isSell:false,
				sellCur:[],
				choosedsellList:[],
				
				//分销渠道
				
				//发货状态
				fahuozhuangtai:[],
				statusUrl:"",
				StatuslistArr:[],
				statusChoosedCount:0,
				statusChoosedArr:[],
				isStatus:false,
				statusCur:[],
				choosedstatusList:[],
				
				//销售办事处
				xiaoshoubanshichu:[],
				officeUrl:"",
				officelistArr:[],
				officeChoosedCount:0,
				officeChoosedArr:[],
				isOffice:false,
				officeCur:[],
				choosedofficeList:[],
				
				//创建日期
				chuangjianriqi:[],
				dateUrl:"/sys/dict/getDictItems/ams_tm_indays",
				datelistArr:[],
				dateChoosedCount:0,
				dateChoosedArr:[],
				isDate:false,
				dateCur:[],
				chooseddateList:[],
				dateTimeChoosedItem: {
					text: "",
					value: ""
				},
				isChoosePiker:false, //日期选择器
				date:'',
				date1:""
			};
		},
		created() {
		    var nowDate = new Date();
		    var cloneNowDate = new Date();
		    var fullYear = nowDate.getFullYear();
		    var month = nowDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
		    var endOfMonth = new Date(fullYear, month, 0).getDate(); // 获取本月最后一天
		    function getFullDate(targetDate) {
		        var D, y, m, d;
		        if (targetDate) {
		            D = new Date(targetDate);
		            y = D.getFullYear();
		            m = D.getMonth() + 1;
		            d = D.getDate();
		        } else {
		            y = fullYear;
		            m = month;
		            d = date;
		        }
		        m = m > 9 ? m : '0' + m;
		        d = d > 9 ? d : '0' + d;
		        return y + '-' + m + '-' + d;
		    };
		
		    var starDate = getFullDate(cloneNowDate.setDate(1));//当月第一天
		    var endDate = getFullDate(cloneNowDate.setDate(endOfMonth));//当月最后一天
		
		    this.date = starDate
		    this.date1 = endDate
			
			console.log(this.date)
			
		
		},
		

		methods: {
			showDatePicker(){
				console.log(111)
				this.isChoosePiker = !this.isChoosePiker 
				
			},
			starDateClick(e) {
				this.date = e.detail.value
				var fomatTime = new RegExp(/-/g);
				this.begin = parseInt(this.date.replace(fomatTime,""));
				this.finish = parseInt(this.date1.replace(fomatTime,""));
				if(this.begin > this.finish) {
				    uni.showModal({
				        content: "开始时间不能大于结束时间",
				        showCancel: false,
				        confirmText:'关闭',
				    })
				    return false;
				}
			},
			endDateClick(e) {
				this.date1 = e.detail.value
				var fomatTime = new RegExp(/-/g);
				this.begin = parseInt(this.date.replace(fomatTime,""));
				this.finish = parseInt(this.date1.replace(fomatTime,""));
				if(this.begin > this.finish) {
				    uni.showModal({
				        content: "开始时间不能大于结束时间",
				        showCancel: false,
				        confirmText:'关闭',
				    })
				    return false;
				}
			},
			
		
			showChouTi(param, param2, param3) {
				this.paramValue = param;
			
							if(param == 'delivery'){
								this.jiaohuoleixing =param2
								console.log('交货类型:',this.jiaohuoleixing);
								this.queryDeliveryList()
								this.choosedTitle="交货类型"
									}
			//销售组织
							if (param == 'sell') {
								
								this.xiaoshouzuzhi = param2
								console.log('销售组织:', this.xiaoshouzuzhi);
								this.querySellList();
								this.choosedTitle = "销售组织";
							}
			//分销渠道
							if (param == 'distribution') {
							
								this.fenxiao = param2
								console.log('分销渠道:', this.fuwuleixing);
								this.queryDistributionList();
								this.choosedTitle = "分销渠道";
							}
											
			//发货状态
							if (param == 'status') {
								
								this.fahuozhuangtai = param2
								console.log('发货状态:', this.fuwuleixing);
								this.queryStatusList();
								this.choosedTitle = "发货状态";
							}
			//销售办事处
							if (param == 'office') {
								this.xiaoshoubanshichu = param2
								console.log('销售办事处:', this.fuwuleixing);
								this.queryOfficeList();
								this.choosedTitle = "销售办事处";
							}
							//创建日期
							
							if (param == 'date') {
							
								this.chuangjianriqi = param2
								console.log('创建日期:', this.chuangjianriqi);
								this.queryDateList();
								this.choosedTitle = "创建日期";
							}
							this.modalName = "DrawerModalR"
			
			
			},
			hideModal(e) {
				this.modalName = null
			},
			
					//获取交货类型列表
			queryDeliveryList(){
						let _this = this;
				
						_this.$http.get(_this.deliveryUrl, {
							params: {}
						}).then(res => {
							if (res.data.success) {
								if (res.data) {
									_this.DeliverylistArr = res.data.result
							
							console.log('交货类型：', _this.DeliverylistArr)
							_this.isserviceType = false,
							_this.isDelivery = true
							
							
							_this.deliveryCur = [] 
							_this.DeliverylistArr.forEach(index => {
								_this.deliveryCur.push(false);
								
								})
							for (var i = 0; i < _this.DeliverylistArr.length; i++) {
								_this.chooseddeliveryList.push('');
								for (var j = 0; j < _this.jiaohuoleixing.length; j++) {
									if (_this.DeliverylistArr[i].value == _this.jiaohuoleixing[j].value) {
										_this.$set(_this.deliveryCur, i, true)
				
										//将传过来的项，赋值到列表中对应的项
										_this.chooseddeliveryList.splice(i, 0, {
											text: _this.DeliverylistArr[i].text,
											value: _this.DeliverylistArr[i].value
										});
										_this.chooseddeliveryList.splice(i + 1, 1); //移除原来位置上的该元素
									}
								}
							}
				
							_this.deliveryChoosedArr = []
							for (var i = 0; i < _this.chooseddeliveryList.length; i++) {
								if (_this.chooseddeliveryList[i]) {
									_this.deliveryChoosedArr.push(_this.chooseddeliveryList[i])
								}
							}
							_this.deliveryChoosedCount = _this.deliveryChoosedArr.length
							console.log('被选中的有几项：', _this.deliveryChoosedCount);
				
				
						}
							} else {
						this.DeliverylistArr = []
						
					
					}
				})
			},
			//获取销售组织列表
			querySellList(){
				
			},
			//获取分销渠道列表
			queryDistributionList(){
				
			},
			//获取发货状态
			queryStatusList(){
				
			},
			//获取销售办事处
			queryOfficeList(){
				
			},
			//获取创建日期
			queryDateList(){
				let _this = this;
				_this.$http.get(_this.dateUrl, {
					params: {}
				}).then(res => {
					if (res.data.success) {
						_this.datelistArr = res.data.result
						console.log('创建日期：', _this.datelistArr)
						
						
						_this.isDelivery = false
						_this.isSell = false,
						_this.isStatus = false
						_this.isDate = true 
						
						
					}
				})
				
			},
			//点击交货类型
			chooseDeliveryItem(index, item, value){
		
				this.$set(this.deliveryCur, index, !this.deliveryCur[index])
		
					if (this.deliveryCur[index] == true) {
					this.chooseddeliveryList.splice(index, 0, {
						text: item,
						value: value
					});
					this.chooseddeliveryList.splice(index + 1, 1); //移除原来位置上的该元素
					this.deliveryChoosedCount++
		
				} else if (this.deliveryCur [index] == false) {
					this.chooseddeliveryList.splice(index, 0, ''); //index:元素需要放置的位置索引，从0开始
					this.chooseddeliveryList.splice(index + 1, 1); //移除原来位置上的该元素
					this.deliveryChoosedCount--
					}
		
			},
				//点击销售组织
					chooseSellItem(){
		
				},
				//点击分销渠道
				chooseDistributionItem(){
		
				},
				//点击发货状态
				chooseStatusItem(){
		
				},
				//点击销售办事处
				chooseOfficeItem(){
		
				},
		//点击创建日期
			chooseDateItem(index,item){
				this.dateCur = []
				console.log("this.datelistArr1111",this.datelistArr)
				for (var i = 0; i < this.datelistArr.length; i++) {
					this.dateCur.push(false)
				}
				
				this.$set(this.dateCur, index, !this.dateCur[index])
				if (this.dateCur[index] == true) {
					this.dateTimeChoosedItem.text = item.text
					this.dateTimeChoosedItem.value = item.value
				}
		
			},
		//取消按钮
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
		//确认按钮
			confirmBtn() {
				
				this.modalName = null;
				this.realname = '';
				this.reportingUserListArr = [];
		
			//期望完成
				if (this.paramValue == 'date') {
					this.$emit('getChildrenValue', 'date', this.dateTimeChoosedItem)
					}
			
				}
	

		},
			onReachBottom() {
				alert("1");
			if (this.pageStatus == 'nomore') return;
			this.loadMoreData();
			},
		mounted() {
			
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
	.cu-form-group+.cu-form-group{border-top: none;}
	.cu-form-group{min-height: 30px;padding:0 10px;flex: 1;}
	.cu-form-group uni-picker{flex: 0.68}
	.cu-form-group uni-picker .picker{line-height: 30px;}
	.cu-form-group uni-picker::after{line-height: 30px;top:1px;}
	.pt10{padding-top:10px;}
	.pb10{padding-bottom:10px;}
	.cu-form-group uni-picker.data::after{display: none;}
	.cu-form-group uni-picker.data{border:1px solid #ddd;padding:0;}
	.cu-form-group uni-picker.data .picker{text-align: center;line-height: 30px;}
	.polangxian{margin:0 5px;}
	.cu-btn{height: 33px;}
	.subtitle{font-weight: bold}
	.ml150{margin-left:150px;}
	.cu-form-group .title{padding-right:5px;}
	
	.cu-btn.lg{
	    margin:7px 10px;
	    height:32px;
	    font-size: 15px;
	}
	.cu-form-group{min-height: 45px;}
	.cu-form-group uni-picker .picker{line-height: 45px;}
	.cu-form-group uni-picker::after{line-height: 46px;}
	
	
</style>
