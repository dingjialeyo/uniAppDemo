<template>
	<view>
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
		<view class="isOver" v-if="flag">----------------暂无数据----------------</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList: [],
				pageIndex: 1,
				flag: false
			}
		},
		methods: {
			// 获取商品数据
			async getGoodsList(callback) {
				const { data: res} = await this.$myRequest({
					url: '/api/getgoods?pageindex=' + this.pageIndex
				})
				// console.log(res)
				// 将获取过来的数据保存在数组中   下次获取数据 上次的数据也不会被刷新
				this.goodsList = [...this.goodsList,...res.message]
				console.log(this.goodsList)
				// 数据获取成功  停止刷新
				uni.stopPullDownRefresh()
				// 触底时 就 不触发 停止刷新  
				callback && callback()
			}
		},
		onLoad () {
			this.getGoodsList()
		},
		// 滑屏触底部 触发
		onReachBottom () {
			if (this.goodsList.length < this.pageIndex*10) return this.flag = true
			this.pageIndex++
			this.getGoodsList()
		},
		// 下拉刷新时触发
		onPullDownRefresh () {
			this.pageIndex = 1
			this.goodsList = []
			this.flag = false
			setTimeout(() => {
				this.getGoodsList(() => {
					
				})
			},1000)
		}
	}
</script>

<style lang="scss">
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
	.isOver {
		text-align: center;
		}
</style>
