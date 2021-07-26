<template>
	<view class="goods_detail">
		<!-- 轮播图 -->
		<swiper indicator-dots circular>
			<swiper-item v-for="(item, index) in swipers" :key="index">
				<image :src="item.src"></image>
			</swiper-item>
		</swiper>
		<!--  -->
		<view class="box1">
			<view class="price">
				<text>￥{{ info.sell_price }}</text>
				<text>￥{{ info.market_price }}</text>
			</view>
			<view class="goods_name">{{ info.title }}</view>
		</view>
		<view class="line"></view>
		<view class="box2">
			<view>货号：{{ info.goods_no }}</view>
			<view>库存： {{ info.stock_quantity }}</view>
		</view>
		<view class="line"></view>
		<view class="box3">
			<view class="tit">详情介绍</view>
			<view class="content">
				<rich-text :nodes="content"></rich-text>
			</view>
		</view>
		<!-- 底部按钮区域 -->
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		data() {
			return {
				id: 0, // 商品id
				swipers: [], // 轮播图列表
				info: {}, // 商品基本信息
				content: '', // 商品详细信息
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "white"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 5
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		methods: {
			async getSwipers() {
				const res = await this.$myRequest({
					url: '/api/getthumimages/' + this.id
				})
				console.log(res)
				this.swipers = res.data.message
			},
			// 获取商品基本参数
			async getDetailInfo() {
				const res = await this.$myRequest({
					url: '/api/goods/getinfo/' + this.id
				})
				console.log(res)
				this.info = res.data.message[0]
			},
			// 获取商品详细信息
			async getDetailContent() {
				const res = await this.$myRequest({
					url: '/api/goods/getdesc/' + this.id
				})
				console.log(res)
				this.content = res.data.message[0].content
			},
			onClick(e) {
				console.log(e)
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				console.log(e)
				this.options[2].info++
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getSwipers()
			this.getDetailInfo()
			this.getDetailContent()
		},
		components: {
			uniGoodsNav
		}
	}
</script>

<style lang="scss">
	.goods_detail {
		swiper {
			height: 700rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.box1 {
			padding: 10px;

			.price {
				font-size: 35rpx;
				color: $shop-color;
				line-height: 80rpx;

				text:nth-child(2) {
					font-size: 28rpx;
					text-decoration: line-through;
					color: #ccc;
					margin-left: 20rpx;
				}
			}

			.goods_name {
				font-size: 32rpx;
				line-height: 50rpx;
			}
		}

		.box2 {
			padding: 0 10px;
			font-size: 25rpx;
			line-height: 60rpx;
		}

		.box3 {
			padding-bottom: 50rpx;

			.tit {
				font-size: 30rpx;
				font-weight: 700;
				padding-left: 10px;
				border-bottom: 1px solid #eee;
				line-height: 70rpx;
			}

			.content {
				padding: 10px;
				font-size: 28rpx;
				color: #333333;
				line-height: 50rpx;

				/deep/ .gomeImgLoad {
					width: 750rpx !important;
					height: auto;
				}
			}
		}
	}

	.goods-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.line {
		height: 10rpx;
		width: 750rpx;
		background-color: #eee;
	}
</style>
