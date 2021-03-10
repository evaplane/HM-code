<template>
  <div class="login">
    <div class="center-box">
      <!-- eleme-ui的表单 -->
      <h3 class="myh3">用户登录</h3>
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="submitForm('loginForm')">登录</el-button>
          <el-button type="primary"  @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      labelPosition: "top",
      loginForm: {
        username: "",
        password: ""
      },
      //表单验证规则
      loginRules: {
        username: [
          //trigger 触发方式
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 8, min: 5, message: "长度在5到8个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 12, min: 6, message: "密码长度为6-12个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //传进来的formName是loginForm
    submitForm(formName) {
      //validate:验证 $ref和ref是对应的
      this.$refs[formName].validate(valid => {
        if (valid) {
          //发送请求
          this.$request.login(this.loginForm).then(res=>{
            console.log(res);
            if(res.data.meta.status==400){
              this.$message.warning(res.data.meta.msg)
            }else if(res.data.meta.status==200){
              this.$message.success(res.data.meta.msg);
              sessionStorage.setItem('token',res.data.data.token)
              this.$router.push('/')
            }
          })
        } else {
          this.$message.error('请输入正确的格式哦')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang='scss'>
body,
html {
  height: 100%;
  margin: 0;
  padding: 0;
  .login {
    height: 100%;
    background-color: #324152;
    display: flex;
    align-items: center;
    justify-content: center;
    .center-box {
      box-sizing: border-box;
      padding: 35px;
      width: 480px;
      height: 360px;
      background-color: #fff;
      border-radius: 10px;
      .el-form-item {
        margin-bottom: 20px;
        .el-form-item__label{
          padding: 0;
        }
      }
      .my-btn {
        width: 100%;
        margin: 20px 0;
      }
      .myh3 {
        margin: 10px 0;
      }
    }
  }
}
</style>
