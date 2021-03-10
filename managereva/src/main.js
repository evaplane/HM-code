import Vue from 'vue'
import App from './App.vue'

//1.引入elemeui
import ElementUI from 'element-ui';

//cdn优化不用引入eleme-ui的样式
// import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

//引入echarts
// import echarts from 'echarts'

// Vue.prototype.$echarts = echarts 

//导入http.js
import request from './libs/http'
Vue.use(request)

//2.导入router
import router from './router'
Vue.config.productionTip = false

//导入store
import store from './store'

new Vue({
  render: h => h(App),
  //挂载到实例上
  router,
  store
}).$mount('#app')
