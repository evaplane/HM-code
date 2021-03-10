<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="my-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- alert-->
    <el-alert title="注意：只允许为第三级分类设置相关参数！" show-icon class="alert" type="warning"></el-alert>
    <!-- 级联 -->
    <div class="mycascader">
      <span>请选择商品分类:&nbsp;&nbsp;&nbsp;</span>
      <el-cascader
        :show-all-levels="false"
        expand-trigger="hover"
        v-model="selectedOptions"
        :options="options"
        placeholder="请选择商品分类"
        :props="props"
        @change="change"
      ></el-cascader>
    </div>

    <!-- tabs -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="动态参数" name="first">
        <!-- 按钮 -->
        <el-button type="primary" class="btn-blue" disabled size="small">添加动态参数</el-button>
        <!-- table -->
        <template>
          <el-table :data="tableDataDynamic" style="width: 100%" border>
             <el-table-column type="index" width="50px"></el-table-column>
            <el-table-column prop="attr_name" label="属性名" width="200px"></el-table-column>
            <el-table-column prop="attr_vas" label="属性值" width="200px"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleEditDynamic(scope.$index, scope.row)" icon="el-icon-edit" plain></el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete"  @click="handleDeleteDynamic(scope.$index, scope.row)" plain></el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="second">
        <!-- 按钮 -->
        <el-button type="primary" class="btn-blue" disabled size="small">添加动态参数</el-button>
        <!-- table -->
        <template>
          <el-table :data="tableDataStatic" style="width: 100%" border>
            <el-table-column type="index" width="50px"></el-table-column>
            <el-table-column prop="attr_name" label="属性名" width="200px"></el-table-column>
            <el-table-column prop="attr_vas" label="属性值" width="200px"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleEditStatic(scope.$index, scope.row)" icon="el-icon-edit" plain></el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDeleteStatic(scope.$index, scope.row)" plain></el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "params",
  data() {
    return {
      tableDataDynamic: [],
      tableDataStatic: [],
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      activeName: "first",
      //级联选择器配置选项,指定props里面选项的值为options某个对象的属性值
      props: {
        children: "children",
        value: "cat_id",
        label: "cat_name"
      },
      //级联选择器选中项绑定值
      selectedOptions: [],
    };
  },
  created() {
    this.$request.getCategory().then(res => {
      console.log(res);
      this.options = res.data.data;
    });
  },
  methods: {
    change(value) {
      console.log(value);
      this.$request.getDynamic(this.selectedOptions[2]).then(res => {
        console.log(res);
        //赋值给动态页面
        this.tableDataDynamic = res.data.data;
      });
      this.$request.getStatic(this.selectedOptions[2]).then(res => {
        console.log(res);
        //赋值给动态页面
        this.tableDataStatic = res.data.data;
      });
    },
    handleEditStatic(){},
    handleDeleteStatic(){},
    handleEditDynamic(){},
    handleDeleteDynamic(){}
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
.alert {
  margin: 20px 0;
}
.btn-blue {
  margin-bottom: 20px;
}
.mycascader {
  margin: 20px 0;
}
</style>
