<template>
	<view class="contact">
		<image class="img" src="http://www.itcast.cn/2018czydz/images/gywmban.jpg"></image>
		<view class="info">
			<view @click="phone">联系电话：15818627635（ 点击拨打 ）</view>
			<view>联系地址：深圳市龙华区xxx</view>
		</view>
		<map class="map" :scale="scale" :longitude="longitude" :markers="covers" :latitude="latitude"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude: 113.99858,
				latitude: 22.673882,
				scale: 14,
				covers: [{
					longitude: 113.99858,
					latitude: 22.673882,
					iconPath: '../../static/icon/location.png',
					width: 30,
					height: 30
				}]
			}
		},
		methods: {
			phone() {
				uni.makePhoneCall({
					phoneNumber: '15818627635'
				})
			}
		}
	}
</script>

<style lang="scss">
	.contact {
		.img {
			width: 750rpx;
			height: 320rpx;
		}

		.info {
			padding: 10rpx 20rpx;
			font-size: 30rpx;

			view {
				line-height: 80rpx;
				border-bottom: 1px solid #eee;
			}
		}

		.map {
			width: 750rpx;
			height: 750rpx;
		}
	}
</style>
