<template>
  <div>
    <!-- 消息提示 -->
    <el-alert title="消息提示的文案" type="info" center show-icon></el-alert>
    <!-- steps -->
    <!-- active属性是数字,对应的是显示的第几个从1开始,0表示都没选中 -->
     <!--active需要数字类型的值  -->
    <el-steps :active="+active" finish-status="success">
      <el-step title="基本参数"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>

    <!-- tabs栏  -->
    <!-- name属性 与选项卡绑定值value对应的标识符,表示选项卡别名 name属性和el-tabs的v-model对应显示,name的值等于v-model的值 -->
    <el-tabs tab-position="left" v-model="active" style="height: 200px;">
      <el-tab-pane name="1" label="基本参数">用户管理</el-tab-pane>
      <el-tab-pane name="2" label="商品参数">配置管理</el-tab-pane>
      <el-tab-pane name="3" label="商品属性">角色管理</el-tab-pane>
      <el-tab-pane name="4" label="商品图片">定时任务补偿</el-tab-pane>
      <el-tab-pane name="5" label="商品内容">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "goodAdd",
  data(){
      return {
        // 0表示所有都不显示
          active:0
      }
  }
};
</script>

<style>
</style>
