<template>
	<view class="pics">
		<!-- 左侧分类列表滚动区域 -->
		<scroll-view class="left" scroll-y>
			<view :class="activeIndex === index ? 'active' : ''" 
			v-for="(item, index) in cates" :key="item.id"
			@click="leftClickHandle(index, item.id)"
			>{{ item.title }}</view>
			<view>家具生活</view>
			<view>手机数码</view>
		</scroll-view>
		<!-- 右侧分类详情滚动区域 -->
		<scroll-view class="right" scroll-y>
			<view class="item" v-for="(item, index) in secondData" :key="item.id">
				<image @click="previewImg(item.img_url)" :src="item.img_url"></image>
				<text>{{ item.title }}</text>
			</view>
			<text v-if="secondData.length === 0">暂无数据</text>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cates: [], // 分类列表
				activeIndex: 0, // 当前激活的分类索引
				secondData: [] //当前分类的数据
			}
		},
		methods: {
			// 获取分类列表数据
			async getPicsCate () {
				const res = await this.$myRequest({
					url: '/api/getimgcategory'
				})
				console.log(res)
				this.cates = res.data.message
				this.leftClickHandle(0, this.cates[0].id)
			},
			async leftClickHandle (index, id) {
				this.activeIndex = index
				// 获取对应分类的数据
				const res = await this.$myRequest({
					url: `/api/getimages/${id}`
				})
				console.log(res)
				this.secondData = res.data.message
			},
			previewImg (url) {
				const urls = this.secondData.map(item => {
					return item.img_url
				})
				// console.log(urls)
				uni.previewImage({
					current: url,
					urls: urls
				})
			}
		},
		onLoad() {
			this.getPicsCate()
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
		.left {
			width: 200rpx;
			height: 100%;
			border-right: 1px solid #eee;
			view {
				width: 200rpx;
				height: 100rpx;
				line-height: 100rpx;
				color: #333;
				text-align: center;
				font-size: 30rpx;
				border-top: 1px solid #eee;
			}
			.active {
				background-color: $shop-color;
				color: #FFFFFF;
			}
		}
		.right {
			height: 100%;
			width: 520rpx;
			margin: 10rpx auto;
			.item {
				image {
					width: 520rpx;
					height: 520rpx;
					border-radius: 5px;
				}
				text {
					font-size: 30rpx;
					line-height: 60rpx;
					text-align: center;
				}
			}
		}
	}
</style>
