<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="my-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>


    <!-- table -->
    <template>
      <el-table :data="tableData" style="width: 100%" element-loading-background='pink' v-loading="loading">
        <el-table-column type='index' width="50"></el-table-column>
        <el-table-column label="权限名称" width="200" prop="authName"></el-table-column>
        <el-table-column label="路径" width="200" prop="path"></el-table-column>
        <!-- 这里是不能写逻辑的,如果要写逻辑要在里面嵌套template,而且要有插槽范围属性 slot-scope--->
        <el-table-column label="层级" prop="level">
          <template slot-scope="scope">
            <!-- 三元表达式:判断row.level的值如果是0,就改为1,如果是1就改为2,如果是2就改为3 -->
              {{scope.row.level==0?'一级':''}}
              {{scope.row.level==1?'二级':''}}
              {{scope.row.level==2?'三级':''}}
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  name: "rights",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      //是否显示loading
      loading:false
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData(){
      this.loading=true
      this.$request.getRights().then(res=>{
        console.log(res);
        this.tableData=res.data.data;
        setTimeout(() => {
          this.loading=false;
        }, 1000);
      })
    }
  },
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
