// 导入Vue
import Vue from 'vue';

//导入vue-router 
import VueRouter from 'vue-router';
//导入index首页
import index from './components/index.vue'
//导入detail页面详情
import detail from './components/detail.vue'
//导入会员中心
import user from './components/user.vue'
//导入会员中心的三个嵌套路由
import userIndex from './components/userIndex.vue'
import userDetail from './components/userDetail.vue'
import userOrder from './components/userOrder.vue'
import vip from './components/vip.vue'


Vue.use(VueRouter);

//重定向

const routes = [
  //重定向,页面一打开就是index首页
  {
    //原来的地址
    path:'/',
    //定向到的地址
    redirect:'/index'
  },
  {
  path:'/index',
  component:index
  },
  {
  path:'/detail/:id',
  component:detail
  },
  {
    path:"/user",
    component:user,
    //写user的嵌套路由,属性为children
    children:[
      //重定向到Index
      {
        path:'',
        redirect:'vip'
      },
      {
        path:"Index",
        component:userIndex
      },
      {
        path:"Order",
        component:userOrder
      },
      {
        path:"Detail",
        component:userDetail
      },
      {
        path:'vip',
        component:vip
      }
    ]
  }
];

let router = new VueRouter({
  routes
})
Vue.config.productionTip = false

//暴露router
export default router