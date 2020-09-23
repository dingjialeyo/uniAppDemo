<template>
	<view class="pics">
		<!-- 左侧滚动区域 -->
		<scroll-view scroll-y class="left_list">
			<view :class="active === index ? 'active' : ''" v-for="(item,index) in leftList" :key="item.id" @click="activeClick(index,item.id)">{{item.title}}</view>
		</scroll-view>
		<!-- 右侧内容区域 -->
		<scroll-view class="right_content" scroll-y>
			<view class="item" :key="item.id" v-for="(item,index) in rightContent">
				<image @click="imgClick(item.img_url)" :src="item.img_url" mode=""></image>
				<text>{{item.title}}</text>
			</view>
			<text v-if="rightContent.length === 0">暂无数据</text>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 左侧列表数据
				leftList: [],
				// 默认高亮
				active : 0,
				// 右侧数据内容
				rightContent: []
			}
		},
		methods: {
			async getLeftList () {
				const {data : res} = await this.$myRequest({
					url :'/api/getimgcategory'
				})
				// console.log(res)
				this.leftList = res.message
			},
			// 点击切换 active  且 获取 对应的右侧数据
			async activeClick(index,id) {
				// console.log(index)
				this.active = index
				// 获取右侧数据
				// console.log((id))
				const {data :res} = await this.$myRequest({
					url: '/api/getimages/' + id
				})
				// console.log(res)
				this.rightContent = res.message
				console.log(this.rightContent)
			},
			// 图片预览
			imgClick (currentImgUrl) {
				// map方法 返回数组
				const urls = this.rightContent.map(item => {
					return item.img_url
				})
				// 预览图片的方法  
				uni.previewImage({
					current: currentImgUrl,
					urls: urls
				})
			}
		},
		onLoad () {
			this.getLeftList()
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}
	.pics {
		height: 100%;
		display: flex;
		.left_list {
			width: 200rpx;
			height: 100%;
			border-right: 1px solid #eee;
			view {
				height: 60px;
				line-height: 60px;
				color: #333;
				text-align: center;
				font-size: 30rpx;
				border-bottom: 1px solid #eee;
			}
			.active {
				background-color: #b50e03;
				overflow: hidden;
				color: #fff;
			}
		}
		.right_content {
			height: 100%;
			width: 540rpx;
			margin: 6rpx auto;
			.item {
				image {
					width: 540rpx;
					height: 530rpx;
					border-radius: 15px;
				}
				text {
					font-size: 30rpx;
					line-height: 60rpx;
				}
			}
		}
	}
	
</style>
