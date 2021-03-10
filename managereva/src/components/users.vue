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
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            v-model="userData.query"
            @keyup.enter.native="getDatas"
          >
            <el-button slot="append" icon="el-icon-search" @click="getDatas"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-button type="success" plain @click="dialogFormVisible = true">添加用户</el-button>
    </el-row>

    <!-- table -->
    <template>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type='index' width="50"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="mg_state" label="用户状态">
          <!-- 插槽 必须以template开头
          slot-scope="scope" 帮助获取table的结构-->
          <template slot-scope="scope">
            <!-- scope.$index代表索引,  scope.row代表一整行的数据-->
            <!-- v-model代表的是开关的状态是true还是false,要和scope.row.ms_state关联 -->
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="statechange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <!-- scope.$index代表索引,  scope.row代表一整行的数据-->
            <el-button
              type="primary"
              icon="el-icon-edit"
              plain
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-check"
              plain
              size="mini"
              @click="handleRole(scope.$index, scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              plain
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 分页 -->
    <el-pagination
      :current-page="userData.pagenum"
      :page-sizes="[2, 3, 4, 6]"
      :page-size="userData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @current-change="currentChange"
      @size-change="sizeChange"
    ></el-pagination>

    <!-- dialog弹出框 新增用户 -->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" label-width="120px" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!-- 点击的时候校验表单并且关闭弹框 -->
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- dialog弹出框 编辑用户 -->
    <el-dialog title="修改用户" :visible.sync="dialogEditVisible">
      <el-form :model="editForm" ref="editForm">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- dialog弹出框 角色分配 -->
    <el-dialog title="修改用户" :visible.sync="roleVisible">
      <el-form :model="roleForm" ref="roleForm">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="roleForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="请选择角色" label-width="120px">
          <!-- v-model的值为当前选中的默认的value的值,所以这里输roleForm.rid 和item.id的值一致的时候就可以显示了 -->
          <el-select v-model="roleForm.rid" placeholder="请选择">
            <el-option
              v-for="item in roleOptions"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('roleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      tableData: [],
      userData: {
        query: "",
        pagenum: 1,
        pagesize: 6
      },
      //dialog开始时不可见的,新增
      dialogFormVisible: false,
      //编辑
      dialogEditVisible: false,
      addForm: {
        username: "",
        password: "",
        mobile: "",
        email: ""
      },
      editForm: {
        username: "",
        mobile: "",
        email: ""
      },
      addRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" },
          { min: 3, max: 6, message: "长度在3-6个字符", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "change" },
          { min: 6, max: 12, message: "长度在6-12个字符", trigger: "change" }
        ]
      },
      //分页总页数
      total: 0,
      //角色分配
      roleVisible: false,
      //角色分配的数据
      roleForm: {
        username:'',
        rid:''
      },
      //角色数据
      roleOptions:[],
      

    };
  },
  created() {
    this.getDatas();
  },
  methods: {
    //删除用户 index代表索引.row代表整行的数据,messageBox
    handleDelete(index, row) {
      this.$confirm("确认删除吗", "提示", {
        confirmButtonText: "残忍删除",
        cancelButtonText: "我再想想",
        type: "warning"
      })
        .then(() => {
          this.$request.deleteUsers(row.id).then(res => {
            console.log(res);
            //删除成功重新渲染
            if (res.data.meta.status == 200) {
              this.getDatas();
            }
          });
          // this.$message({
          //   type: "success",
          //   message: "删除成功!"
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑用户数据
    handleEdit(index, row) {
      console.log(index);
      console.log(row);
      // this.editForm.id = row.id;
      // this.editForm.username = row.username;
      // this.editForm.mobile = row.mobile;
      // this.editForm.email = row.email;
      // 根据id获取用户数据更可靠
      this.$request.getUserById(row.id).then(res => {
        console.log(res);
        this.editForm = res.data.data;
      });
      this.dialogEditVisible = true;
    },
    // 编辑角色数据
    handleRole(index, row) {
      console.log(index);
      console.log(row);
      //获取数据
      this.$request.getUserById(row.id).then(res=>{
        // console.log(res);
        this.roleForm = res.data.data;
        //获取用户角色
        this.$request.getRoles().then(res=>{
          console.log(res);
          this.roleOptions = res.data.data;
        })
      })

      this.roleVisible=true;
    },
    //修改状态的函数,参数是修改后的状态,传入的参数是row,可以将id和type都带进来
    statechange(row) {
      console.log(row);
      // 调用接口
      this.$request
        .updateUsersState({ id: row.id, type: row.mg_state })
        .then(res => {
          // console.log(res);
          //成功就弹框,每个请求成功都要弹框,写在响应的拦截器中
        });
    },
    //提交的时候校验表单,新增用户
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          //如果成功就发送请求
          if (formName == "addForm") {
            this.$request.addUsers(this.addForm).then(res => {
              console.log(res);
              //重置表单
              this.$refs[formName].resetFields();
              //校验成功关闭弹框
              this.dialogFormVisible = false;
              //重新获取数据
              this.getDatas();
            });
          }else if(formName=='roleForm'){
              this.$request.updateUserRole(this.roleForm).then(res=>{
                console.log(res);
                if(res.data.meta.status==200){
                    this.getDatas();
                    this.roleVisible=false;
                }
              })
          } else {
            this.$request.updateUser(this.editForm).then(res => {
              console.log(res);
              if (res.data.meta.status == 200) {
                //2.关闭dialog
                this.dialogEditVisible = false;
                //3.重新获取数据
                this.getDatas();
              }
            });
          }
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    //获取数据
    getDatas() {
      this.$request.getUsers(this.userData).then(res => {
        console.log(res);
        this.tableData = res.data.data.users;
        this.total = res.data.data.total;
      });
    },
    //修改分页页码
    currentChange(current) {
      this.userData.pagenum = current;
      this.getDatas();
    },
    sizeChange(size) {
      this.userData.pagesize = size;
      this.getDatas();
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
.el-dialog {
  width: 30%;
  .el-input__inner {
    width: 80%;
  }
}
</style>
