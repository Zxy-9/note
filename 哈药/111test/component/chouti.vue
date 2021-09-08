<template>
	<view>
		<view class="cu-modal drawer-modal justify-end" :class="modalName=='DrawerModalR'?'show':''">
			<view class="cu-dialog basis-lg" @tap.stop=""
				:style="[{top:CustomBar +'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				<view class="cu-list menu text-left">
					<view class="choosedTitle">
						<p><text class="cuIcon-newshot"></text><label>{{choosedTitle}}</label></p>
					</view>
					
					<!-- 工厂 -->
					
								<view class="cu-item" :class="{current:factoryCur[index]}" v-if="isFactory"
										v-for="(item,index) in factorylistArr"
										@click="chooseFactoryItem(index,item.text,item.value)">
										<view class="dian">{{item.text}}</view>
											<div class="duigou"></div>
										</view>
					<!-- 库存地点 -->
					<view class="cu-item" :class="{current:siteCur[index]}" v-if="isSite"
							v-for="(item,index) in sitelistArr"
							@click="chooseSiteItem(index,item.text,item.value)">
							<view class="dian">{{item.text}}</view>
								<div class="duigou"></div>
							</view>
					
					<!-- 库存状态 -->
					<view class="cu-item" :class="{current:inventoryCur[index]}" v-if="isInventory"
							v-for="(item,index) in inventorylistArr"
							@click="chooseInventoryItem(index,item.text,item.value)">
							<view class="dian">{{item.text}}</view>
								<div class="duigou"></div>
							</view>
					<!--采购组 -->
					<view class="cu-item" :class="{current:qualityCur[index]}" v-if="isPur"
							v-for="(item,index) in StatuslistArr"
							@click="choosePurItem(index,item.text,item.value)">
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
				
				//工厂
				gongchang:[],
				
				//库存地点
				kucundidian:[],
				
				//库存状态
				kucunzhuangtai:[],
				
				//采购组
				caigouzu:[],
			};
		},
		

		methods: {
		
			
		
			showChouTi(param, param2, param3) {
				this.paramValue = param;
			//工厂
						if(param == 'factory'){
								this.jiaohuoleixing =param2
								console.log('工厂:',this.gongchang);
								this.queryFactoryList()
								this.choosedTitle="工厂"
							}
			//库存地点
							if (param == 'site') {
								
								this.kucundidian = param2
								console.log('销售组织:', this.kucundidian);
								this.querySiteList();
								this.choosedTitle = "库存地点";
							}
			//库存状态
							if (param == 'inventory') {
							
								this.kucunzhuangtai = param2
								console.log('库存状态:', this.kucunzhuangtai);
								this.queryInventoryList();
								this.choosedTitle = "库存状态";
							}
											
			//采购组
							if (param == 'pur') {
								
								this.caigouzu = param2
								console.log('采购组:', this.caigouzu);
								this.queryPurList();
								this.choosedTitle = "采购组";
							}
			
						
							this.modalName = "DrawerModalR"
			
			
			},
			hideModal(e) {
				this.modalName = null
			},
			
			//获取工厂列表
			queryFactoryList(){
				
				
			},
			//获取库存地点列表
			querySiteList(){
				
			},
			
			//获取库存状态列表
			queryInventoryList(){
				
			},
			//获取采购组
			queryPurList(){
				
			
			},
			
	
		
		
		//点击工厂
			chooseFactoryItem(){
				
			},
		
		//点击库存地点
		chooseSiteItem(){
			
		},
		//点击库存状态
		chooseInventoryItem(){
			
		},
		//点击采购组
		choosePurItem(){
			
		},
		
	//取消按钮
	cancelBtn() {
		this.modalName = null;
		this.realname = '';
		this.reportingUserListArr = [];
		
				this.choosedReportingUserList = newArr;
				this.reportingUserChoosedArr = [];
			
		
	},
	//确认按钮
	confirmBtn() {
		this.modalName = null;
		this.realname = '';
		this.reportingUserListArr = [];
		//服务类型
		if (this.paramValue == 'delivery') {
			this.deliveryChoosedArr = [];
			for (var i = 0; i < this.chooseddeliveryList.length; i++) {
				if (this.chooseddeliveryList[i]) {
					this.deliveryChoosedArr.push(this.chooseddeliveryList[i])
				}
			}
			console.log(chooseddeliveryList)
			this.$emit('getChildrenValue', 'serviceType', this.deliveryChoosedArr)
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
</style>
