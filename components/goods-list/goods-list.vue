<template>
	<view class="goods_list">
		<view class="goods_item" v-for="(item, index) in goods"
		 :key="item.id" @click="navigator(item.id)">
			<image :src="item.img_url"></image>
			<view class="price">
				<text>￥{{ item.sell_price }}</text>
				<text>￥{{ item.market_price }}</text>
			</view>
			<view class="name">
				{{ item.title }}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['goods'],
		methods: {
			navigator (id) {
				this.$emit('goodsItemClick', id)
			}
		}
	}
</script>

<style lang="scss">
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
</style>
