import Vue from 'vue'
import App from './App.vue'

//导入样式 style.css
import "./assets/statics/site/css/style.css"


//导入饿了么UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


//导入router.js
import router from './router.js'

//导入axios
import axios from 'axios';
Vue.prototype.$axios=axios;

//axios基地址抽取
axios.defaults.baseURL="http://111.230.232.110:8899/";

//抽取本地过滤器到全局过滤器
//1.导入moment
import moment from 'moment';
//2.
Vue.filter('formatTime',(value)=>{
    return moment(value).format("YYYY年MM月DD日")
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
