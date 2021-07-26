<template>
	<view class="goods-list">
		<goods-list @goodsItemClick="goGoodsDetail" :goods="goods"></goods-list>
		<view class="isOver" v-if="flag">----- end -----</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goods-list/goods-list.vue'
	export default {
		data() {
			return {
				pageIndex: 1, // 当前页码
				goods: [], // 商品列表
				flag: false // 是否显示底线
			}
		},
		components: {
			"goods-list": goodsList
		},
		onLoad() {
			this.getGoodsList()
		},
		onReachBottom() {
			// 没有下一页数据了，显示我是有底线的字样
			if (this.goods.length < this.pageIndex * 10) return this.flag = true
		
			console.log('触底啦')
			this.pageIndex++
			this.getGoodsList()
		},
		onPullDownRefresh() {
			console.log('下拉刷新了')
			this.pageIndex = 1
			this.goods = []
			this.flag = false
			setTimeout(() => {
				this.getGoodsList(() => {
					// 数据请求成功后，停止下拉刷新
					uni.stopPullDownRefresh()
				})
			}, 1000)
		},
		methods: {
			// 获取商品列表的数据
			async getGoodsList(callBack) {
				const res = await this.$myRequest({
					url: '/api/getgoods?pageindex=' + this.pageIndex
				})
				console.log(res)
				this.goods = [...this.goods, ...res.data.message]
				callBack && callBack()
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
	.goods-list {
		background-color: #eee;
	}
	.isOver {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		// background-color: #FFFFFF;
		font-size: 20rpx;
		color: #aaa;
	}
</style>
