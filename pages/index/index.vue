<template>
	<view class="home">
		<!-- 轮播图区域 -->
		<swiper indicator-dots circular>
			<swiper-item v-for="item in swipers" :key="item.id">
				<image :src="item.img" mode=""></image>
			</swiper-item>
		</swiper>
		<!-- 导航区域 -->
		<view class="nav">
			<view class="nav_item" v-for="(item,index) in navs" :key="index" @click="navItemClick(item.path)">
				<view :class="item.icon"></view>
				<text>{{item.title}}</text>
			</view>
		</view>
		<!-- 推荐商品区域 -->
		<view class="goods">
			<view class="tuijian">推荐商品</view>
			<view class="goods_list">
				<view class="goods_item" v-for="item in goodsList" :key="item.id">
					<image :src="item.img_url" mode=""></image>
					<view class="price">
						<text>￥{{item.market_price}}</text>
						<text>￥{{item.sell_price}}</text>
					</view>
					<view class="goods_item_name">
						{{item.title}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swipers: [],
				goodsList: [],
				navs: [
					{
						icon: 'iconfont icon-ziyuan',
						title: '商品资源',
						path: '/pages/goods/goods'
					},
					{
						icon: 'iconfont icon-tupian',
						title: '社区图片',
						path: '/pages/pics/pics'
					},
					{
						icon: 'iconfont icon-shipin',
						title: '学习视频',
						path: '/pages/videos/videos'
					},
					{
						icon: 'iconfont icon-guanyuwomen',
						title: '关于我们',
						path: '/pages/about/about'
					}
				]
			}
		},
		// 页面渲染前获取
		onLoad() {
			this.getSwipers()
			this.getGoodsList()
		},
		methods: {
			// 获取轮播图数据 
			async getSwipers() {
				// 第一种 普通的数据请求
				// 发起请求
				// uni.request({
				// 	url: 'http://localhost:8082/api/getlunbo',
				// 	// 请求成功后的数据
				// 	success(res) {
				// 		// console.log(res.data)
				// 		if (res.data.status !== 0) { 
				// 			// 提示获取数据失败！
				// 			return uni.showToast({
				// 				title: '获取轮播图数据失败！' 
				// 			})
				// 		}
				// 		// 成功   数据绑定
				// 		this.swipers = res.data.message
				// 		console.log(this.swipers)
				// 	}
				// })
				// 第二种
				// async 和 await 请求
				// const res = await uni.request({
				// 	url: 'http://localhost:8082/api/getlunbo',
				// })
				// console.log(res[1].data)
				// 第三种	自己封装的请求方法
				const { data: res} = await this.$myRequest({
					url: '/api/getlunbo'
				})
				// console.log(res)
				this.swipers = res.message
				console.log(this.swipers)
			},
			// 获取商品数据
			async getGoodsList() {
				const { data: res} = await this.$myRequest({
					url: '/api/getgoods?pageindex=1'
				})
				// console.log(res)
				this.goodsList = res.message
				console.log(this.goodsList)
			},
			// 导航点击处理
			navItemClick (path) {
				// 点击跳转
				uni.navigateTo({
					url: path
				})
			}
		},
	}
</script>

<style lang="scss">
	.home {
		swiper {
			// 宽度750rpx 为整个屏幕宽度    1px = 2rpx
			width: 750rpx;
			height: 380rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.nav {
			display: flex;
			.nav_item {
				flex: 1;
				text-align: center;
				view {
					width: 120rpx;
					height: 120rpx;
					background-color: #b50e03;
					border-radius: 60rpx;
					margin: 8px auto;
					line-height: 120rpx;
					color: #ffffff;
					font-size: 50rpx;
				}
				.icon-tupian {
					font-size: 42rpx;
					}
				text {
					font-size: 30rpx;
				}
			}
		}
		.goods {
			width: 750rpx;
			background-color: #eee;
			overflow: hidden;
			margin-top: 16rpx;
			.tuijian {
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				color: #b50e03;
				// 字体间距
				letter-spacing: 18px;
				background-color: #ffffff;
				margin: 7rpx auto;
			}
			.goods_list{
				padding: 0 15rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.goods_item {
					margin: 10rpx auto;
					background-color: #ffffff;
					width: 350rpx;
					padding: 20rpx;
					box-sizing: border-box;
					image {
						width: 80%;
						height: 280rpx;
						display: block;
						margin: 0 auto;
					}
					.price {
						color: #b50e03;
						font-size: 36rpx;
						padding: 10rpx 0 0 0;
						text:nth-child(2) {
							color: #ccc;
							font-size: 32rpx;
							margin-left: 10rpx;
							text-decoration: line-through;
						}
					}
					
					.goods_item_name {
						font-size: 30rpx;
						line-height: 50rpx;
						padding: 10rpx 0;
					}
				}
			}
		}
	}
</style>
