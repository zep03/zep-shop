<template>
	<view class="home">
		<!-- 轮播图 -->
		<swiper indicator-dots autoplay interval="2000" circular>
			<swiper-item v-for="(item, index) in swipers" :key="index">
				<image :src="item.img"></image>
			</swiper-item>
		</swiper>
		<!-- 导航区域 -->
		<view class="nav">
			<view class="nav_item" v-for="(item, index) in navs"
			 :key="index" @click="navItemClick(item)">
				<view :class="item.icon"></view>
				<text>{{ item.title }}</text>
			</view>
		</view>
		<!-- 推荐商品 -->
		<view class="hot_goods">
			<view class="tit">推荐商品</view>
			<goods-list @goodsItemClick="goGoodsDetail" :goods="goods"></goods-list>
		</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goods-list/goods-list.vue'
	export default {
		data() {
			return {
				swipers: [], // 轮播图列表
				goods: [], // 推荐商品列表
				navs: [
					{
						icon: 'iconfont icon-ziyuan',
						title: 'zep超市',
						path: '/pages/goods/goods'
					},
					{
						icon: 'iconfont icon-guanyuwomen',
						title: '联系我们',
						path: '/pages/contact/contact'
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
					}
				]
			}
		},
		components: {
			"good-list": goodsList
		},
		onLoad() {
			this.getSwipers()
			this.getHotGoods()
		},
		methods: {
			// 获取轮播图数据
			async getSwipers () {
				const res = await this.$myRequest({
					url: '/api/getlunbo'
				})
				console.log(res)
				this.swipers = res.data.message
			},
			// 获取热门商品列表数据
			async getHotGoods () {
				const res = await this.$myRequest({
					url: '/api/getgoods?pageindex=1'
				})
				console.log(res)
				this.goods = res.data.message
			},
			// 导航点击的处理函数
			navItemClick(item) {
				console.log(item.path)
				uni.navigateTo({
					url: item.path
				})
			},
			// 导航到商品详情页
			goGoodsDetail (id) {
				uni.navigateTo({
					url: '/pages/goods-detail/goods-detail?id=' + id
				})
			}

		}
	}
</script>

<style lang="scss">
	.home {
		swiper {
			width: 750rpx;
			height: 410rpx;
			image {
				height: 100%;
				width: 100%;
			}
		}
		.nav {
			display: flex;
			justify-content: space-around;
			align-items: center;
			.nav_item {
				flex: 1;
				text-align: center;
				display: flex;
				flex-direction: column;
				align-items: center;
				view {
					width: 120rpx;
					height: 120rpx;
					background-color: #b50e03;
					border-radius: 60rpx;
					margin: 10px auto;
					line-height: 120rpx;
					color: #FFFFFF;
					font-size: 50rpx;
				}
				.icon-tupian {
					font-size: 45rpx;
				}
				text {
					font-size: 30rpx;
				}
			}
		}
		.hot_goods {
			background-color: #eee;
			overflow: hidden;
			margin-top: 10px;
			.tit { 
				height: 50px;
				line-height: 50px;
				color: $shop-color;
				text-align: center;
				letter-spacing: 20px;
				background-color: #fff;
				margin: 7rpx 0;
			}
			.goods_list {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				padding: 0 15rpx;
				.goods_item {
					display: flex;
					flex-direction: column;
					align-items: center;
					background-color: #fff;
					width: 320rpx;
					margin: 10rpx;
					padding: 10rpx;
					image {
						width: 80%;
						height: 150px;
						display: block;
						margin: 0 auto;
					}
					.price {
						color: $shop-color;
						font-size: 36rpx;
						text:nth-child(2) {
							font-size: 28rpx;
							margin-left: 17rpx;
							text-decoration: line-through;
						}
					}
					.name {
						font-size: 28rpx;
						line-height: 50rpx;
						padding-bottom: 15rpx;
						padding-top: 10rpx;
					}
				}
			}
		}
	}
</style>
