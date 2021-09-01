<template>
	<view>
		
		<view class="title" style="font-size: 16px;"><span>|</span>基本信息<button class="linkBtn" @click="backUp"
				style="top: 16px;right: 24px;width: 72px;">返回</button></view>
		
		<view class="bg-white addContent">
			<view class="cu-form-group displayFlex">
				<view class="title">物料编码</view>
				<view class="flex4">title</view>
			</view>
			<view class="cu-form-group displayFlex">
				<view class="title">物料描述</view>
				<view class="flex4">supervisorDptName</view>
			</view>
			<view class="cu-form-group displayFlex">
				<view class="title">供应商</view>
				<view class="flex4">supervisorName</view>
			</view>
			<view class="cu-form-group displayFlex">
				<view class="title">数量</view>
				<view class="flex4">supervisorStoreName</view>
			</view>
			<view class="cu-form-group displayFlex">
				<view class="title">计量单位</view>
				<view class="flex4">applyRecord</view>
			</view>
			<view class="cu-form-group displayFlex">
				<view class="title">物料类型</view>
				<view class="flex4">applyRecord</view>
			</view>
			<view class="cu-form-group displayFlex">
				<view class="title">批号</view>
				<view class="flex4">applyRecord</view>
			</view>
			<view class="cu-form-group displayFlex">
				<view class="title">辅助单位</view>
				<view class="flex4">applyRecord</view>
			</view>
			<view class="cu-form-group displayFlex">
				<view class="title">综合数量</view>
				<view class="flex4">applyRecord</view>
			</view>
			<view class="cu-form-group displayFlex">
				<view class="title">厂家批号</view>
				<view class="flex4">applyRecord</view>
			</view>
			<view class="cu-form-group displayFlex">
				<view class="title">有效期</view>
				<view class="flex4">applyRecord</view>
			</view>
		
			
		
		
		</view>
		
		
	
	</view>
</template>

<script>
</script>

<style scoped>
	.bigTitle {
		margin: 5px 10px;
		padding: 3px 0;
		font-weight: bold;
	}
	
	.flex4{
		color: #aaa;
	}
	.addContent {
		border-radius: 4px;
		margin: 5px;
		padding: 0 10px 5px 10px;
	}

	.displayFlex {
		display: flex;
	}

	.cu-form-group {
		min-height: 35px;
		padding: 0;
	}

	.cu-form-group uni-picker .picker {
		line-height: 35px;
	}

	.cu-form-group uni-picker::after {
		line-height: 35px;
	}

	.cu-form-group uni-textarea {
		margin: 5px 0;
	}

	uni-textarea {
		width: 100%;
		height: 50px;
		font-size: 14px;
		border: 0.5px solid #eee;
		border-radius: 4px;
		padding: 5px;
	}

	.cu-bar {
		height: calc(40px + env(safe-area-inset-bottom) / 2);
		min-height: 40px;
	}

	.cu-form-group .title {
		color: #333;
		flex: 1.5;
	}

	.cu-form-group uni-input,
	.uni-input-placeholder {
		color: #bebec0
	}

	.flex5 {
		flex: 5;
        color:#aaa;
	}

	.mt10 {
		margin-top: 10px;
	}

	.mt5 {
		margin-top: 5px;
	}

	.bankList {
		border-top: 0.5px solid #eee;
	}

	.bankList:first-child {
		border-top: none;
	}

	.delFlag {
		display: inline-block;
		background-color: #e54d42;
		color: #fff;
		margin-left: 3px;
		border-radius: 25px;
		font-size: 12px;
		padding: 0 5px;
	}

	.duigou-outer {
		width: 16px;
		height: 16px;
		display: inline-block;
		margin-right: 3px;
		background-color: #ccc;
		color: #333;
		position: relative;
		top: 3px;
	}

	.duigou {
		position: absolute;
		top: 0px;
		left: 5px;
		width: 6px;
		height: 12px;
		border-left: 2px solid #fff;
		border-top: 2px solid #fff;
		-webkit-transform: rotate(-132deg);
	}

	table {
		border-collapse: collapse;
		width: 100%;
		text-align: center;
	}

	.thead {
		background-color: #f1f1f1;
		padding: 5px 0;
	}

	.td {
		border-bottom: 1px solid #e9e9e9;
		padding: 5px 0;
	}

	table tr:last-child .td {
		border-bottom: none;
	}

	.approveTitle {
		padding: 10px 0;
		color: #333;
	}

	.statename{
		display: inline;
	}
	.processList {
		position: relative;
		margin-left: 10px;
		border-left: 1px solid #f1f1f1;
		padding-left: 15px;
	}

	.process-portrait {
		width: 20px;
		height: 20px;
		position: absolute;
		top: 0;
		left: -10px;
		background: #0094ff;
		color: #fff;
		border-radius: 50%;
		text-align: center;
		line-height: 20px;
		font-size: 12px;
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

	.approveList {
		position: relative;
		margin-bottom: 10px;
		text-align: right;
		color: #999;
		font-size: 12px;
		/* width: 100vw; */
	}

	.approve-add {
		float: left;
		margin-left: 7px;
		position: relative;
		color: #999;
		font-size: 12px;
		width: 35px;
		height: 35px;
		border: 1px solid #d9d9d9;
	}

	.approve-add-text {
		position: absolute;
		font-size: 25px;
		width: 15px;
		height: 30px;
		left: 50%;
		margin-left: -7px;
		top: 50%;
		margin-top: -18px;
	}

	.portrait {
		display: block;
		width: 35px;
		height: 35px;
		margin-left: 0;
	}

	.rightArrow {
		float: left;
		color: #ccc;
		margin-top: 10px;
	}

	.closeIcon {
		position: absolute;
		right: 1px;
		top: -8px;
		font-size: 14px;
		color: #fff;
		background-color: #9f9f9f;
		width: 16px;
		height: 16px;
		text-align: center;
		line-height: 14px;
		border-radius: 50%;
	}

	.haveApproval {
		display: flex;

	}

	.mt10 {
		margin-top: 10px;
	}

	.mt5 {
		margin-top: 5px;
		margin-left: 0.5rem;
	}

	.unfold {
		display: inline;
	}

	.state {
		margin-top: 8px;
		flex-grow: 1;

	}

	.submit-position {
		/*position: fixed;*/
		/*left: 0;*/
		/*bottom: 0;*/
		/*right: 0;*/
        padding:10px 15px;
	}
    .submit-position .cu-bar{height: 35px;min-height: 35px;}
    .userName{height: 35px;line-height: 35px;margin-left: 5px;}
	.isName{
		margin-left: -10px;
	}
	.cu-btn.lg {
	    padding: 0 18px;
	    font-size: 15px;
	    height: 38px;
	    float: left;
	    width: 150px;
	    margin: 15px;
	    margin-top: 30px;
	}
	.btns{
		overflow: hidden;
		display: flex;
		justify-content: center;
	}
</style>
