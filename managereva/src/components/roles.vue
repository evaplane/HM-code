<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="my-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 栅格 输入框和按钮-->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-button type="default" plain @click="dialogFormVisible=true">添加角色</el-button>
        </div>
      </el-col>
    </el-row>

    <!-- table -->
    <template>
      <el-table :data="tableData" style="width: 100%" border>
        <!-- table展开行 -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <!-- 最顶级的row -->
            <el-row v-for="level1 in props.row._children">
              <el-col :span="4">
                <!-- 删除tag用的是close事件 -->
                <el-tag
                  class="my-tag"
                  :key="level1.id"
                  closable
                  @close="deleteRight(props.row,level1.id)"
                >{{level1.authName}}</el-tag>
                <span class="el-icon-arrow-right"></span>
              </el-col>
              <el-col :span="20">
                <el-row v-for="level2 in level1.children">
                  <el-col :span="6">
                    <el-tag
                      class="my-tag"
                      :key="level2.id"
                      closable
                      type="success"
                      @close="deleteRight(props.row,level2.id)"
                    >{{level2.authName}}</el-tag>
                    <span class="el-icon-arrow-right"></span>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="level3 in level2.children"
                      :key="level3.id"
                      closable
                      type="warning"
                      class="my-tag"
                      @close="deleteRight(props.row,level3.id)"
                    >{{level3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="300"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="300"></el-table-column>
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

    <!-- dialog弹出框 新增角色 -->
    <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item label="角色名称" label-width="120px" prop="roleName">
          <el-input v-model="addForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px">
          <el-input v-model="addForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!-- 点击的时候校验表单并且关闭弹框 -->
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- dialog弹出框 编辑角色 -->
    <el-dialog title="编辑角色" :visible.sync="dialogEditVisible">
      <el-form :model="editForm" ref="editForm">
        <el-form-item label="用户名" label-width="120px" prop="roleName">
          <el-input v-model="editForm.roleName" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="editForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- dialog弹出框 check分配角色 -->
    <el-dialog title="分配角色" :visible.sync="dialogRightsVisible">
      <!-- show-checkbox 显示check框 
            data:所有数据
            props: 对应关系  默认children 和label
            defaultCheckKeys 默认选中的值
            node-key  key 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
            default-expand-all 默认展开所有
            node-key="id" 设置选中的字段用id识别
      -->
      <el-tree
        :data="rightsData"
        show-checkbox
        node-key="id"
        :default-checked-keys="defaultCheckedKeys"
        :props="rightsProps"
        default-expand-all
        ref="tree"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRightsVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRoleRights">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "roles",
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
      dialogFormVisible: false,
      addForm: {
        roleName: "",
        roleDesc: ""
      },
      addRules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { max: 6, min: 3, message: "输入字符在3-6个", trigger: "blur" }
        ]
      },
      dialogEditVisible: false,
      editForm: {
        roleName: "",
        roleDesc: ""
      },
      //全选分配显示
      dialogRightsVisible: false,
      //所有角色权限的数据
      rightsData: [],
      //默认选中的值
      defaultCheckedKeys: [],
      //对应关系
      rightsProps: {
        //显示的字段
        children: "children",
        //显示的值
        label: "authName"
      },
      //权限列表的数据
      rightsForm:{},

    };
  },

  methods: {  
    // 获取数据
    getDatas() {
      this.$request.getRoles().then(res => {
        // console.log(res);
        //children属性会被识别为树形结构,改名字
        let data = res.data.data;
        data.forEach(v => {
          v._children = v.children;
          delete v.children;
        });

        // console.log(data);
        this.tableData = data;
      });
    },
    // 编辑
    handleEdit(index, row) {
      this.dialogEditVisible = true;
      //获取这个id的内容
      this.$request.getRoleById(row.id).then(res => {
        console.log(res);
        if (res.data.meta.status == 200) {
          this.editForm = res.data.data;
        }
      });
    },

    //弹出角色权限框
    handleRole(index, row) {
      //存储数据,方便以后使用,这一行的选中的数据
      this.rightsForm=row
      console.log(row);
      this.dialogRightsVisible = true;
      //获取所有的数据
      this.$request.getRightsTree().then(res => {
        // console.log(res);
        //设置所有的值
        this.rightsData = res.data.data;
        //设置默认选中的值
        let checkedIds = [];
        //1.递归添加选中的id
        function getCheckedKeys(item) {
          //查找后代的children,如果有就遍历,没有就跳出递归
          //设置选中节点的时候,父节点不用考虑,没有后代的节点才添加,有后代的时候就继续递归
          //如果没有选中某个节点,他的父节点是半选中状态,服务器就会以为他的父节点是选中的,再返回结果的时候就会把父节点下面的所有子节点都选中
          //解决:如果是父代节点就不push到数组中,继续遍历就好了,没有子代节点才push
          item._children.forEach(v => {
            // checkedIds.push(v.id);
            if (v.children) {
              v._children = v.children;
              getCheckedKeys(v);
            }else{
              checkedIds.push(v.id)
            }
          });
        }
        getCheckedKeys(row)
        
        //2.普通添加选中的id
        // row._children.forEach(v=>{
        //     checkedIds.push(v.id)
        //     v.children.forEach(v=>{
        //       checkedIds.push(v.id)
        //       v.children.forEach(v=>{
        //         checkedIds.push(v.id)
        //       })
        //     })
        // })

        // console.log(checkedIds);
        this.defaultCheckedKeys = checkedIds;
      });
    },
    //删除
    handleDelete(index, row) {
      console.log(row);
      //messageBox
      this.$confirm("真的要删除吗", "提示", {
        confirmButtonText: "是的呢",
        cancelButtonText: "我再想想吧",
        type: "warning"
      })
        .then(() => {
          this.$request.deleteRole(row.id).then(res => {
            console.log(res);
            if (res.data.meta.status == 200) {
              //刷新页面
              this.getDatas();
              //弹框
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //提交的时候校验表单,新增用户
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          //如果成功就发送请求
          if (formName == "addForm") {
            this.$request.addRoles(this.addForm).then(res => {
              console.log(res);
              if (res.data.meta.status == 201) {
                //2.关闭dialog
                this.dialogFormVisible = false;
                //3.重新获取数据
                this.getDatas();
              }
            });
          } else if (formName == "editForm") {
            console.log(this.editForm);
            // 这里发送请求
            this.$request.updateRole(this.editForm).then(res => {
              console.log(res);
              if (res.data.meta.status == 200) {
                this.dialogEditVisible = false;
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
    //删除指定角色的权限
    deleteRight(row, rightId) {
      console.log(row.id);
      this.$request
        .deleteRights({
          roleId: row.id,
          rightId
        })
        .then(res => {
          console.log(res);
          // row是复杂数据类型,传递的是地址,改了row,就改了tableData,会重新渲染这一行的数据
          row._children = res.data.data;
        });
    },
    //设置权限
    setRoleRights(){
      console.log(this.$refs);//tree,指向组件实例,可以获取属性的值
        this.dialogRightsVisible=false;
        //获取选中的角色的值,权限id的数组
        //当取消一个children的时候,父节点会变成半选中状态,半选中状态的节点getCheckedKeys获取不到,提交不到服务器,服务器就会以为父节点没有被选中
        //导致下面所有的节点都不会选中
        // console.log(this.$refs.tree.getCheckedKeys());
        // console.log(this.$refs.tree.getHalfCheckedKeys());
        let checkedKeys = this.$refs.tree.getCheckedKeys();
        const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys();
        checkedKeys = checkedKeys.concat(halfCheckedKeys);
        //发送请求
        //数组转化为字符串
        const rids = checkedKeys.join(',');
        console.log(rids);
        //角色id
        const roleId = this.rightsForm.id;
        this.$request.setRights({
          roleId,
          rids
        }).then(res=>{
          // console.log(res);
          if(res.data.meta.status==200){
            this.getDatas();

            //改变左侧菜单
            //获取菜单
            this.$request.getMenus().then(res=>{
              console.log(res);
              //赋值给仓库
              this.$store.commit('changeMenuList',res.data.data)
            })
          }
        })

    }
  },
  created() {
    this.getDatas();
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
.my-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
