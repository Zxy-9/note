<!-- 物料库存 -->

<template>
	<view>
		<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
			<view class="cu-bar search">
				<view class="search-form">
					<text class="cuIcon-search"></text>
					
					<input @input="searchInput" @focus="InputFocus" @blur="InputBlur" :adjust-position="false"
						type="text" placeholder="搜索需求内容、功能程序、需求概述" confirm-type="search"  />
				</view>

			
				<text class="fontSize cuIcon-filter" @tap="showModal" data-target="viewModal"></text>
			</view>

		</scroll-view>
		<!--   回到首页箭头     -->
		<view class="DrawerClose" :class="modalName=='viewModal'?'show':''" @tap="hideModal"></view>
		
		<!-- 列表 -->
		<view class="listCon">
			<view class="cu-list menu">
				<view class="cu-item"  
					@click="goDetail">
					<view class="content flex">
						<view class="text-black flex5 rigth-text">
							<view class="text-xl margin-bottom-sm">物料描述</view>
							<view class="text-cut" style="color:#96959c;">库存地点：</view>
							<view class="flex5" style="color:#96959c;">id</view>
							<view class="text-cut" style="color:#96959c;">库存数量：</view>
							<view class="flex5" style="color:#96959c;">已过</view>
							<view class="text-cut" style="color:#96959c;">基本单位：</view>
							<view class="flex5" style="color:#96959c;">已开</view>
						</view>
						<view class="left-text ">
							<button class="cu-btn round lines-green myButton" >可用</button>
						</view>
						
					</view>
				</view>
				
			
			</view>
		
		</view>
		
		
		
		<!--   筛选条件     -->
	<scroll-view scroll-y class="DrawerWindow" :class="modalName=='viewModal'?'show':''">
		<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg">
			<view class="bg-white pd10" style="overflow-y: auto;">
				
				<view class="commonView">
					<view class="shaixuan-item-title" @click="gochangClick">工厂<view style="color: #f00;position: relative;top: 3px;margin-left: 3px;display: inline-block;">*</view></view>
					<view class="item-mb9">
						<view class='cu-tag radius cur'>45</view>
					</view>
	
					<view class="shaixuan-item-title margin-top" @click="kucundidianClick">库存地点</view>
					<view class="item-mb9">
						<view class='cu-tag radius cur' >12 </view>
					</view>
	
					<view class="shaixuan-item-title margin-top" @click="kucunleibieClick">库存类别</view>
					<view class="item-mb9">
						<view class='cu-tag radius cur' >
							33
						</view>
					</view>
	
					<view class="shaixuan-item-title margin-top" @click="zhijianClick" >质检状态
						<view class="item-mb9">
							<view class='cu-tag radius cur' >
								33
							</view>
						</view>
					</view>
	
				
					
					
					
				</view>
				
				
				<view class="foot choosedBottom">
					<button type="button" class="cu-btn round bg-white lg" @click="cancelBtn">取消</button>
					<button type="button" class="cu-btn round bg-blue lg" style="background-color: #47a4ff;"
						@click="confirmClick">确定</button>
				</view>
				<chouti ref="childList"></chouti>
			</view>
		</view>
	</scroll-view>
	
	</view>
</template>

<script>
	import {
		http
	} from '@/common/service/service.js'

	import chouti from "./component/chouti";

	//扫码功能需要：识别产品编码
	import wx from 'weixin-js-sdk'

	export default {
		name: 'operationsManageList',
		components: {
			chouti
		},
		data() {
			return {
				modalName:null,
				InputBottom:"",
				isExpectedTime: false,
				urgencyValue: '',
				}
		},
		
	
		methods: {
			showModal(e){
				this.modalName = e.currentTarget.dataset.target
				
			},
			hideModal(e){
				this.modalName = null
			},
			
			//点击工厂
			gochangClick() {
				console.log(this.$refs)
				this.$refs.childList.showChouTi("gongchanClick");
			},
			//点击库存类别
			kucunleibieClick() {
				console.log(this.$refs)
				this.$refs.childList.showChouTi("kucunleibieClick");
			},
			//点击库存地点
			kucundidianClick() {
				console.log(this.$refs)
				this.$refs.childList.showChouTi("kucundidianClick");
			},
			//点击质检状态
			zhijianClick() {
				console.log(this.$refs)
				this.$refs.childList.showChouTi("zhijianClick");
			},
			//子组件点击确定按钮时调用该方法
			getChildren(data1, data2) {
				console.log('从子组件传递过来的值：', data1, data2)
				if (data1 == 'serviceType') {
					this.serviceTypeList = data2;
				} else if (data1 == 'chooseDepartment') {
					this.chooseDepartmentList = data2
				} else if (data1 == 'reportingUser') {
					this.reportingUserList = this.unique(data2);
				} else if (data1 == 'reportingtime') {
					this.reportingtimeText = data2.text;
					this.reportingtimeValue = data2.value;
					if (data2.text != "") {
						this.isReportingTime = true
					} else {
						this.isReportingTime = false
					}
				} else if (data1 == 'expectedtime') {
					this.expectedtimeText = data2.text;
					this.expectedtimeValue = data2.value;
					if (data2.text != "") {
						this.isExpectedTime = true
					} else {
						this.isExpectedTime = false
					}
				} else if (data1 == 'systemmodule') {
					this.systemModuleList = data2
				} else if (data1 == 'operationperson') {
					this.operationPersonList = data2
				} else if (data1 == 'urgency') {
					this.urgencyList = data2
				} else if (data1 == 'demandstatus') {
					this.demandStatusList = data2
				} else if (data1 == 'approvalstatus') {
					this.approvalStatusList = data2
				} else if (data1 == 'cancelstatus') {
					this.cancelStatusList = data2
				}
			},
			//点击筛选条件的取消按钮
			cancelBtn() {
				this.modalName = null;
				
			},
			
			//InputFocus
			InputFocus(e){
				this.InputBottom = e.detail.height
				console.log(e.detail.height)
			},
			InputBlur(e){
				this.InputBottom = 0
			},
			//点击筛选条件的确定按钮
			confirmClick() {
				this.modalName = null
				this.showFixed = true;
				this.pageNo = 1;
				this.queryData = [];
				this.list = [];
				
			},
		}, //end of methods:
	
	}
</script>

<style scoped>
	.line {
		height: 1px;
		background-color: #d9d9d9;
		margin-top: 15px;
	}

	.cu-bar.search {
		padding: 0 15px;
		background: white;
		border-bottom: 1px solid #e7e7e7;
	}

	.cu-bar .search-form {
		padding: 5px 10px;
		height: 32px;
		font-size: 14px;
		border-radius: 4px;
		line-height: 32px;
		background-color: #ebecee;
		margin: 0;
	}

	.cuIcon-search {
		margin: 0 0.5em 0 0 !important;
	}

	.cu-list.menu-avatar>.cu-item .content {
		left: 15px;
		width: calc(100% - 105px);
	}

	.cu-list.menu-avatar>.cu-item .action {
		width: 75px;
		text-align: right;
	}

	.cu-list+.cu-list {
		margin-top: 0;
	}

	.cu-list.menu-avatar>.cu-item {
		padding: 0 5px;
		height: 57px;
		position: relative;
	}

	.fontSize {
		font-size: 20px;
		margin-left: 10px;
	}

	.mt5 {
		margin-top: 5px;
	}

	.item-mb10 {
		display: flex;
		justify-content: space-between;
	}

	.cu-tag {
		color: #2b2b2b;
		background-color: #f1f0f5;
		border: 1px solid #f1f0f5;
		width: 31%;
		height: 28px;
		border-radius: 2px;
		margin: 10px 0 0 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;
		text-align: center;
		line-height: 27px;
	}
	.cuIcon-roundclose{
		margin-left: 8px;
		font-size: 14px;
		vertical-align: middle;
		display: inline-block;
		margin-top: -3px;
	}
	page {
		background-image: var(--gradualBlue);
		width: 100vw;
		height: 100vh;
		background-color: #f1f0f5;
	}

	.DrawerPage {
		/*position: fixed;*/
		width: 100vw;
		/*height: 100vh;*/
		/*left: 0vw;*/
		background-color: #f1f0f5;
		transition: all 0.4s;
	}

	.DrawerPage.show {
		transform: scale(0.9, 0.9);
		left: 85vw;
		height: 100vh;
		box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
		transform-origin: 0;
	}

	.DrawerWindow {
		position: absolute;
		width: 90vw;
		height: 100vh;
		left: 0;
		top: 0;
		transform: scale(0.9, 0.9) translateX(-100%);
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
		/*padding: 33px 0;*/
		padding: 0;
	}

	.DrawerWindow.show {
		transform: scale(1, 1) translateX(0%);
		opacity: 1;
		pointer-events: all;
		background-color: #f1f0f5;
	}

	.DrawerClose {
		position: absolute;
		width: 40vw;
		height: 100vh;
		right: 0;
		top: 0;
		color: transparent;
		padding-bottom: 30upx;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
		letter-spacing: 5px;
		font-size: 50upx;
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
	}

	.DrawerClose.show {
		opacity: 1;
		pointer-events: all;
		width: 100vw !important;
		color: #fff;
	}

	.DrawerPage .cu-bar.tabbar .action button.cuIcon {
		width: 64upx;
		height: 64upx;
		line-height: 64upx;
		margin: 0;
		display: inline-block;
	}

	.DrawerPage .cu-bar.tabbar .action .cu-avatar {
		margin: 0;
	}

	.DrawerPage .nav {
		flex: 1;
	}

	.DrawerPage .nav .cu-item.cur {
		border-bottom: 0;
		position: relative;
	}

	.DrawerPage .nav .cu-item.cur::after {
		content: "";
		width: 10upx;
		height: 10upx;
		background-color: currentColor;
		position: absolute;
		bottom: 10upx;
		border-radius: 10upx;
		left: 0;
		right: 0;
		margin: auto;
	}

	.DrawerPage .cu-bar.tabbar .action {
		flex: initial;
	}

	.cu-list.card-menu {
		margin: 0;
		border-radius: 0;
		overflow-y: auto !important;
	}

	/* .pd10{padding: 15px;} */
	.shaixuan-item-title {
		color: #333;
		font-size: 15px;
		position: relative;
		font-weight: 400;
	}

	.title {
		color: #000000;
		line-height: 22px;
		font-size: 15px;
		font-weight: 400;
	}

	.shaixuan-item-title:after {
		font-family: cuIcon;
		display: block;
		content: "\e6a3";
		position: absolute;
		font-size: 16px;
		color: #cfcfcf;
		line-height: 22px;
		width: 28px;
		text-align: center;
		top: 0;
		bottom: 0;
		right: -9px;
		margin: auto;
	}

	.shaixuan-item-title.shaixuan-item-title-noarrow:after {
		display: none;
	}

	.pop {
		position: fixed;
		right: 3px;
		bottom: 100px;
	}

	.mb5 {
		margin-bottom: 5px;
	}

	.tongbu {
		width: 36px;
		height: 36px;
		position: relative;
		background: #fff;
		border-radius: 50%;
		box-shadow: 0 3px 12px 0 rgba(7, 17, 27, .2);
	}

	.tongbu img {
		position: absolute;
		display: block;
		width: 26px;
		height: 26px;
		left: 50%;
		top: 50%;
		margin-left: -13px;
		margin-top: -13px;
	}

	.tongbuPop {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 9998;
	}

	.tongbuContent {
		background-color: #fff;
		border-radius: 4px;
		padding: 15px;
		width: 80%;
		height: 130px;
		position: absolute;
		left: 10%;
		top: 50%;
		margin-top: -65px;
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

	.cu-tag+.cu-tag {
		margin-left: 0;
	}

	.cu-tag.cur {
		background-color: rgba(0, 119, 231, 0.1);
		border: 1px solid rgba(0, 119, 231, 0.7);
		color: rgba(0, 119, 231, 0.7);
	}

	.cu-tag:empty:not([class*="cuIcon-"]) {
		width: 0;
		height: 0;
		margin-left: 0;
	}

	.glBtn {
		width: 140px;
		margin: 10px auto 0;
	}

	.foot {
		text-align: center;
	}

	.foot ul {
		display: inline;
		margin-left: -10px;
	}

	.foot ul li {
		display: inline-block;
		margin-left: 10px;
		line-height: 30px;
	}

	.foot ul li a {
		background-color: #900;
		color: #fff;
		line-height: 20px;
		padding: 3px 5px;
	}

	.DrawerClose.show {
		width: 12vw;
	}

	.fanhui {
		width: 30px;
		height: 27px;
		position: absolute;
		top: 50%;
		margin-top: -13px;
		color: #fff;
		right: 7px;
		font-size: 28px;
		font-weight: bold;
	}

	.searchbutton {
		background: transparent;
		/*按钮背景透明*/
		border-width: 0px;
		/*边框透明*/
		outline: none;
		/*点击后没边框*/
	}

	.DrawerPage.show {
		transform: scale(0.9, 1);
	}

	.line {
		height: 1px;
		background-color: #d9d9d9;
		margin-top: 15px;
	}

	.item-mb10 .cu-tag {}

	.triangle-topleft {
		width: 0;
		height: 0;
		border-top: 20px solid red;
		border-right: 20px solid transparent;
		position: absolute;
		left: 0;
		top: 0;
	}

	.newTask {
		position: absolute;
		color: #fff;
		left: 1px;
		top: -21px;
		font-size: 11px;
	}

	.uni-scroll-view-content {
		background-color: #F1F0F5;
	}

	.cu-form-group+.cu-form-group {
		border-top: none;
	}

	.cu-list.menu>.cu-item:after {
		border-bottom: none;
	}

	.cu-list.menu>.cu-item {
		margin: 10px;
		border-radius: 2px;
		padding: 6px 10px;
		display: block;
		position: relative;
	}

	.cu-list.menu>.cu-item .content {
		font-size: 13px;
		line-height: 1.3rem;
		font-weight: 400;
	}

	/* .cu-list.menu{background-color: #f2f2f2;} */
	.bg-white {
		background-color: transparent;
	}

	.clearfix {
		*zoom: 1;
	}

	.clearfix:after {
		content: ".";
		display: block;
		height: 0;
		clear: both;
		overflow: hidden;
	}

	.flex5 {
		/* display: flex; */
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.text-cut {
		float: left;
	}

	.rightInfo {
		color: #96959c;
		display: flex;
		justify-content: space-between;
	}

	.timeInfo {
		font-size: 12px;
		display: inline-block;
		float: right;
	}

	.cu-list.menu>.cu-item .content>uni-view:first-child {
		display: block;
	}

	.status {
		position: absolute;
		top: 8px;
		right: 12px;
		font-size: 12px;
		border-radius: 3px;
		height: 20px;
		width: 46px;
		line-height: 19px;
		text-align: center;
		color: white;
	}

	.greenStyle {
		background-color: rgba(48, 205, 81, 0.1);
		color: rgba(48, 205, 81, .9);
		border: 1px solid rgba(48, 205, 81, .9);
	}

	.blueStyle {
		background-color: rgba(18, 150, 219, 0.1);
		color: rgba(18, 150, 219, .9);
		border: 1px solid rgba(18, 150, 219, .9);
	}

	.greyStyle {
		background-color: rgba(112, 112, 112, 0.1);
		color: rgba(112, 112, 112, .9);
		border: 1px solid rgba(112, 112, 112, 0.9);
	}

	.redStyle {
		background-color: rgba(214, 77, 64, 0.1);
		color: rgba(214, 77, 64, .9);
		border: 1px solid rgba(214, 77, 64, 0.9);
	}

	.orangeStyle {
		background-color: rgba(248, 188, 60, 0.1);
		color: rgba(248, 188, 60, .9);
		border: 1px solid rgba(248, 188, 60, 0.9);
	}

	.lightBlue {
		background-color: rgba(14, 133, 118, 0.1);
		color: rgba(14, 133, 118, .9);
		border: 1px solid rgba(6, 110, 163, 0.9);
	}

	.imgBox {
		float: right;
		display: inline-block;
	}

	.urgen image {
		width: 18px;
		height: 17px;
		display: inline-block;
		overflow: hidden;
		position: relative;
		vertical-align: text-bottom;
	}

	.demandIntr {
		font-size: 13px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.commonView {
		padding: 15px;
		margin-bottom: 7px;
		background-color: white;
		border-bottom: 1px solid #e7e7e7;
	}

	.radius:nth-of-type(2) {
		margin: 10px 3.5% 0 !important;
	}

	.radius:nth-of-type(5) {
		margin: 10px 3.5% 0 !important;
	}

	.choosedBottom {
		display: flex;
		justify-content: space-around;
		bottom: 0;
		z-index: 1000;
		width: 100%;
		background-color: white;
	}

	.cu-btn.lg {
		height: 48px;
		line-height: 48px;
		font-size: 14px;
		width: 100%;
		border-radius: 0;
	}

	.cu-bar .search-form uni-input {
		font-size: 13px;
	}
	.chooseOne{
		margin-right: 12px;
		font-size: 13px;
		margin-top: 1.5px;
		color: rgba(0, 119, 231, 0.7);
	}
	.linkBtn {
		height: 27px;
		width: 72px;
		line-height: 27px;
		font-size: 13px;
		padding: 0 10px;
		color: white;
		background-color: #0077E7;
		border-radius: 3px;
		position: absolute;
		top: 6px;
		right: 15px;
	}
	.left-text{
		margin-left: 200px;
		margin-top: 35px;
	}
	
</style>
