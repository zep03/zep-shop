<template>
	<view class="news_detail">
		<text class="title">{{ this.detail.title }}</text>
		<view class="info">
			<text>发表时间：{{ this.detail.add_time | formatDate }}</text>
			<text>浏览：{{ this.detail.click }}</text>
		</view>
		<view class="content">
			<rich-text :nodes="this.detail.content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0, // 文章id
				detail: {} // 文章详情数据
			}
		},
		methods: {
			async getNewsDetail() {
				const res = await this.$myRequest({
					url: '/api/getnew/' + this.id
				})
				console.log(res)
				this.detail = res.data.message[0]
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getNewsDetail()
		},
		// filters: {
		// 	formatDate (date) {
		// 		console.log(date)
		// 		const nDate = new Date(date) 
		// 		const year = nDate.getFullYear()
		// 		const month = (parseInt(nDate.getMonth()) + 1).toString().padStart(2,0)
		// 		const day = nDate.getDay().toString().padStart(2,0)
		// 		console.log(nDate)
		// 		return year + '-' + month + '-' + day
		// 	}
		// }
	}
</script>

<style lang="scss">
	.news_detail {
		font-size: 30rpx;
		padding: 0 20rpx;

		.title {
			font-size: 35rpx;
			text-align: center;
			display: block;
			margin: 20rpx auto;
			font-weight: 800;
		}

		.info {
			display: flex;
			justify-content: space-around;
			font-size: 20rpx;
			margin-bottom: 25rpx;
		}
	}
</style>
