<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="my-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

   

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "goods",
 
};
</script>

<style lang='scss'>
.my-breadcrumb {
  height: 45px;
  background-color: #d3dce6;
  padding-left: 10px;
  line-height: 45px;
}

</style>
