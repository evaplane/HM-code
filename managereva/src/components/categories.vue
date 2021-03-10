<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="my-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 栅格 输入框和按钮-->
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-button type="primary" plain>添加分类</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- table -->
    <template>
      <!-- 加了row-key属性自动渲染为树状 -->
      <el-table :data="tableData" style="width: 100%" row-key='cat_id' border>
        <!-- <el-tree :data="dataTree" :props="defaultProps"></el-tree> -->
        <el-table-column prop="cat_name" label="分类名称" width="180"></el-table-column>
        <el-table-column prop="cat_level" label="级别" width="180">
            <template slot-scope="scope">
                {{scope.row.cat_level==0?'一级':''}}
                {{scope.row.cat_level==1?'二级':''}}
                {{scope.row.cat_level==2?'三级':''}}
            </template>
        </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效"  width="180">
          <template slot-scope="scope">
            {{ scope.row.cat_deleted==false?"有效":"无效"}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type='primary' plain class='el-icon-edit' size="mini"></el-button>
            <el-button type='danger' plain class='el-icon-delete' size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 分页 -->
    <el-pagination
      :current-page="1"
      :page-sizes="[2, 3, 4, 5]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="2"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "category",
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
    };
  },
  created() {
    this.$request.getCategory().then(res => {
      console.log(res);
      this.tableData = res.data.data;
    });
  }
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
