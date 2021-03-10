//1.引入vue
import Vue from 'vue'
//2.引入vue-router
import VueRouter from 'vue-router'
//导入login页面
// import login from './components/login.vue'
// import index from './components/index.vue'
// import users from './components/users.vue'
// import roles from './components/roles.vue'
// import rights from './components/rights.vue'
// import goods from './components/goods.vue'
// import params from './components/params.vue'
// import categories from './components/categories.vue'
// import orders from './components/orders.vue'
// import reports from './components/reports.vue'
// import error from './components/error.vue'
// import goodAdd from './components/goodAdd.vue'
// import goodsList from './components/goodsList.vue'

//懒加载
const login =() => import ('./components/login.vue')
const index =() => import ('./components/index.vue')
const users =() => import ('./components/users.vue')
const roles =() => import ('./components/roles.vue')
const rights =() => import ('./components/rights.vue')
const goods =() => import ('./components/goods.vue')
const params =() => import ('./components/params.vue')
const categories =() => import ('./components/categories.vue')
const orders =() => import ('./components/orders.vue')
const reports =() => import ('./components/reports.vue')
const error =() => import ('./components/error.vue')
const goodAdd =() => import ('./components/goodAdd.vue')
const goodsList =() => import ('./components/goodsList.vue')

//3.使用
Vue.use(VueRouter);

//4.写规则
const routes = [
    {
        path: '/login',
        component: login
    },
    {
        path: '/',
        component: index,
        children: [
            {
                path: '/',
                redirect: '/users'
            },
            {
                path: 'users',
                component: users
            },
            {
                path: 'roles',
                component: roles
            },
            {
                path: 'rights',
                component: rights
            },
            {
                path: 'goods',
                component: goods,
                children:[
                    {
                        path:'add',
                        component:goodAdd
                    },
                    {
                        path:'',
                        component:goodsList
                    },
                ]
            },
            {
                path: 'params',
                component: params
            },
            {
                path: 'categories',
                component: categories
            },
            {
                path: 'orders',
                component: orders
            },
            {
                path: 'reports',
                component: reports
            },
            {
                path: 'error',
                component: error
            },
        ]
    }
]

//5.实例化对象,这个就是router
const router = new VueRouter({
    routes,
    //美化url
    mode:'history'
})

// 注册全局导航前置守卫,通过跳转或者取消的方式守卫导航
//在没有写next之前.后面得到代码都不执行
router.beforeEach((to, from, next) => {
    // console.log(to);
    //to里面有matched属性,是一个数组,匹配到路由则会有值,如果没有匹配到就会是空数组,判断如果,matched是空数组,就跳转到error页面
    if(to.matched.length==0){
        // router.push('error')
        //跳转到错误的页面
        next('error');
    }else{
        next();
    }

})

//6.暴露出去
export default router