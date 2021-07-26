<template>
	<view class="news">
		<news-list @itemClick="getDetail" :list="newsList"></news-list>
	</view>
</template>

<script>
	import newsList from '../../components/news-item/news-item.vue'
	export default {
		data() {
			return {
				newsList: []
			}
		},
		components: {
			"news-list": newsList
		},
		methods: {
			// 获取新闻资讯
			async getNews () {
				const res = await this.$myRequest({
					url: '/api/getnewslist'
				})
				console.log(res)
				this.newsList = res.data.message
			},
			// 跳转到新闻详情页
			getDetail (id) {
				uni.navigateTo({
					url: '/pages/news-detail/news-detail?id=' + id
				})
			}
		},
		onLoad() {
			this.getNews()
		}
	}
</script>

<style lang="scss">
	.news {
		
	}
</style>
