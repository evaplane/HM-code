// vue.config.js
module.exports = {
    // 选项...
    publicPath: './',
    productionSourceMap: false,
    // 希望覆盖webpack的配置
    configureWebpack: {
        // 那些模块不需要打包
        externals: {
            // 左边是模块的名字 标准名字
            // 右边是在代码中使用的名字
            vue: 'Vue',
            vuex: 'Vuex',
            'vue-router': 'VueRouter',
            // 饿了ui的 内部的使用的名字 ELEMENT
            'element-ui': 'ELEMENT',
            axios: 'axios',
            moment: 'moment'
        }
    }
}