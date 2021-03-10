<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="my-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- table -->
    <template>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="300"></el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="180"></el-table-column>
        <el-table-column prop="order_pay" label="是否付款" width="180">
          <template slot-scope="scope">
            <el-button
              plain
              type="danger"
              v-if="scope.row.pay_status==0"
              size="mini"
              @click="changeState(scope.row)"
            >未付款</el-button>
            <el-button plain type="success" v-else size="mini">已付款</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" width="180"></el-table-column>
        <el-table-column prop="create_time" label="下单时间" width="300">
          <template slot-scope="scope">{{ scope.row.create_time | formatTime}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              plain
              size="mini"
              @click="dialogFormVisible=true"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 分页 -->
    <el-pagination
      :current-page="1"
      :page-sizes="[4,8,10,15]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>

    <!-- 编辑dialog框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="editForm">
        <el-form-item label="省市区/县" label-width="120px">
          <!-- <el-input v-model="form.name" autocomplete="off"></el-input> -->
          <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions2"
          ></el-cascader>
          <!-- 使用省市联动插件 -->
          <v-distpicker></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址" label-width="120px">
          <el-input v-model="editForm.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
//引入省市联动数据
import options from '../assets/city_data.js'
//导入distpicker
import VDistpicker from 'v-distpicker'
export default {
  name: "orders",
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
      //订单数据
      orderData: {
        pagenum: 1,
        pagesize: 4
      },
      //总数据条数
      total: 0,
      //编辑数据
      editForm: {
        address: ""
      },
      //是否显示编辑框
      dialogFormVisible: false,
      //级联数据
      options,
      selectedOptions2:[]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //获取数据
    getData() {
      this.$request.getOrders(this.orderData).then(res => {
        console.log(res);
        this.tableData = res.data.data.goods;
        this.total = res.data.data.total;
      });
    },
    //分页页容量改变
    handleSizeChange(size) {
      this.orderData.pagesize = size;
      this.getData();
    },
    //分页页码改变
    handleCurrentChange(current) {
      this.orderData.pagenum = current;
      this.getData();
    }
  },
  //注册本地distpicker组件
  components:{VDistpicker},
  filters: {
    formatTime(value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    }
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
