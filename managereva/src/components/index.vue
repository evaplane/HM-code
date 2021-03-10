<template>
  <section class="el-container index-container is-vertical">
    <header class="el-header index-header" style="height: 60px;">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img class="logo" src="../assets/logo.png" alt>
          </div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple-light title">电商后台管理系统</div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple">
            <!-- type=danger表示红色 -->
            <el-button type="danger" icon="el-icon-switch-button" circle class='logout' @click='logout'></el-button>
          </div>
        </el-col>
      </el-row>
    </header>
    <section class="el-container content">
      <el-aside class="el-aside index-aside" style="width: 200px;">
        <!-- 商品列表 -->
        <el-menu default-active="2" class="el-menu-vertical-demo" router>
          <!-- 用户 -->
          <el-submenu  v-for="(item, index) in $store.state.menuList" :key="item.order" :index="item.order.toString()">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 删除这里的group就可以删除间距 -->
            <!-- index -->
            <el-menu-item  v-for="(it, i) in item.children" :key="i" :index="'/'+it.path.toString()">
              <i class="el-icon-menu"></i>{{ it.authName }}
            </el-menu-item>
          </el-submenu>
          
        </el-menu>
      </el-aside>
      <main class="el-main index-main">
        <router-view></router-view>
      </main>
    </section>
  </section>
</template>

<script>
export default {
  name:"index",
  data(){
    return {
      menuList:[]
    }
  },
  beforeCreate() {
   if(!sessionStorage.getItem('token')){
     this.$message.warning('还没有登录哦')
     this.$router.push('/login')
   }
  },
  created() {
    //获取菜单列表
    this.$request.getMenus().then(res=>{
      console.log(res);
      // this.menuList = res.data.data;
      // 保存到仓库中
     this.$store.commit('changeMenuList',res.data.data)
    })
  },
  methods: {
    logout(){
      sessionStorage.removeItem('token');
      this.$router.push('/login')
    }
  },
};
</script>

<style lang='scss'>
.index-container {
  height: 100%;
  .index-header {
    background-color: #b3c0d1;
    line-height: 60px;
    .logo {
      height: 60px;
    }
    .title {
      color: white;
      text-align: center;
      font-size: 24px;
      font-weight: 300;
    }
  }
  .index-aside {
    background-color: #fff;
  }
  .index-main {
    background-color: #e9eef3;
  }
}
</style>
