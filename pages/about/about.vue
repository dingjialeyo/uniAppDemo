<template>
	<view class="about">
		<image src="http://www.itcast.cn/2018czydz/images/gywmban.jpg" mode=""></image>
		<view class="info">
			<view @click="callClick">联系电话：(022)88181500 </view>
			<view>联系地址：津南区大沽南路1310号 </view>
		</view>
		<map class="map" :longitude="longitude" :scale="scale" :latitude="latitude" :markers="covers"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 经度
				longitude: 117.298306,
				// 纬度
				latitude: 39.05679,
				// 地理位置标记
				covers: [
					{
						latitude: 39.05679,
						longitude: 117.298306,
						iconPath: '../../static/icon/地标.png',
						width : 40,
						height : 40
					}
				],
				// 缩放级别
				scale: 15
			}
		},
		methods: {
			callClick () {
				uni.makePhoneCall({
					phoneNumber: '18822177261'
				})
			}
		}
	}
</script>

<style lang="scss">
	.about {
		image {
			width: 750rpx;
			height: 320rpx;
		}
	}
	.info {
		padding: 10rpx;
		font-size: 30rpx;
		view {
			line-height: 50rpx;
			border-bottom: 1px solid #eee;
		}
	}
	.map {
		width: 750rpx;
		height: 750rpx;
	}
</style>
