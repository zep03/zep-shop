import Vue from 'vue'
import App from './App'
import { myRequest } from './util/api.js'

Vue.filter('formatDate', (date) => {
	const nDate = new Date(date)
	const year = nDate.getFullYear()
	const month = (parseInt(nDate.getMonth()) + 1).toString().padStart(2,0)
	const day = nDate.getDay().toString().padStart(2,0)
	console.log(nDate)
	return year + '-' + month + '-' + day
})

Vue.prototype.$myRequest = myRequest

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
