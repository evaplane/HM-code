//vuex的文件

//导入Vue

import Vue from 'vue'

//导入Vuex
import Vuex from 'vuex'

Vue.use(Vuex)

//实例化仓库
const store = new Vuex.Store({
    //数据
    state:{
        menuList:[]
    },
    //修改的方法
    mutations:{
        changeMenuList(state,newMenuList){
            state.menuList = newMenuList;
        }
    }
})

//暴露数据
export default store