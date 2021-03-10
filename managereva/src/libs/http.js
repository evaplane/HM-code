import axios from 'axios'
import Vue from 'vue'
//暴露的就是VueRouter的实例化对象,router,是通过new VueRouter或者 Vue.use(VueRouter)
import router from '../router.js'


axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

//拦截器 axios自带的钩子函数
//发送请求的拦截器
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log('发送请求啦');
    //发送请求的时候,设置headers里面的授权Authorization,因为所有接口都要授权,在这里设置免得每次都设置了
    //config里面有headers属性
    config.headers.Authorization = sessionStorage.getItem('token');
    // console.log(config);
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

//响应数据的拦截器
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    if (response.data.meta.status == 200) {
        // console.log(response.data.meta.status);
        //这里的this代表的应该是vue实例化对象,$message设置到Vue构造函数的原型上
        //1.设置在Vue构造函数的原型上
        //2.设置在Vue实例化对象上
        Vue.prototype.$message.success(response.data.meta.msg)
        // new Vue().$message.success(response.data.meta.msg)
    }

    //登录判断如果token是伪造的,服务器返回msg='无效token'
    if (response.data.meta.msg == '无效token' && response.data.meta.status == '400') {
        //打回登录页面
        new Vue().$message.warning('你很优秀哦')
        router.push('login')
        // new Vue().$router.push('login')
        // Vue.prototype.$router.push('login')
        //服务器返回的response的data.data的值会是null,如果是null就无法点出其他的是,会报错,所以把data重新赋值为空数组
        response.data.data = [];


    }
    // console.log(response);
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

const request = {

    //登录页面
    login(params) {
        return axios.post('login', params)
    },
    //获取users的数据
    getUsers(params) {
        return axios.get('users', {
            params,//params:params
            //文档中params和headers 是并列的
            //用header携带token  需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
            // headers: {
            //     Authorization: sessionStorage.getItem('token')
            // }
        })
    },
    //修改用户状态的接口
    updateUsersState(params) {
        return axios.put(`users/${params.id}/state/${params.type}`)
    },
    //新增用户的接口
    addUsers(params) {
        return axios.post('users', params);
    },
    //删除数据的接口
    deleteUsers(id) {
        return axios.delete(`users/${id}`)
    },
    //修改用户的接口
    updateUser(params) {
        return axios.put(`users/${params.id}`, {
            email: params.email,
            mobile: params.mobile
        })
    },
    //根据id获取用户的接口
    getUserById(id) {
        return axios.get(`users/${id}`)
    },
    // 获取角色列表
    getRoles() {
        return axios.get('roles')
    },
    //分配角色列表
    updateUserRole(params) {
        return axios.put(`users/${params.id}/role`, {
            id: params.id,
            rid: params.rid
        })
    },
    //新增角色
    addRoles(params) {
        return axios.post('roles', params);
    },
    // 删除角色
    deleteRole(id) {
        return axios.delete(`roles/${id}`)
    },
    //根据id获取角色
    getRoleById(id) {
        return axios.get(`roles/${id}`)
    },
    // 编辑角色
    updateRole(params) {
        return axios.put(`roles/${params.roleId}`, {
            id: params.roleId,
            roleName: params.roleName,
            roleDesc: params.roleDesc
        })
    },
    // 获取权限数据
    getRights(){
        return axios.get('rights/list')
    },
    //获取report数据
    getReports(){
        return axios.get('/reports/type/1')
    },
    //获取订单列表
    getOrders(params){
        return axios.get('orders',{
            params
        })
    },
    //删除角色权限
    deleteRights(params){
        return axios.delete(`roles/${params.roleId}/rights/${params.rightId}`)
    },
    //获取权限树形结构
    getRightsTree(){
        return axios.get('rights/tree')
    },
    //角色授权
    setRights(params){
        return axios.post(`roles/${params.roleId}/rights`,{
            rids:params.rids
        })
    },
    //获取左侧菜单列表
    getMenus(){
        return axios.get('menus')
    },
    //获取params商品分类列表
    getCategory(){
        return axios.get('categories?type=3')
    },
    //获取params动态参数
    getDynamic(id){
        return axios.get(`categories/${id}/attributes?sel=many`)
    },
    //获取params静态参数
    getStatic(id){
        return axios.get(`categories/${id}/attributes?sel=only`)
    },


}

//暴露出去
export default {
    install(Vue) {
        Vue.prototype.$request = request;
    }
}