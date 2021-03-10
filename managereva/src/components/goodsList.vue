<template>
  <div>
    <!-- 栅格 输入框和按钮-->
    <el-row>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-button type="warning" plain @click="$router.push('goods/add')">添加商品</el-button>
    </el-row>

    <!-- table -->
    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
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
    name:'goodsList',
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
      ]
    };
  }
};
</script>

<style>
</style>
