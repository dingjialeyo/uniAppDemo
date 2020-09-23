import Vue from 'vue'
import App from './App'

// 全局导入封装好的 请求方法
import {myRequset} from './util/api.js'
Vue.prototype.$myRequest = myRequset

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
