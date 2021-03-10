<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/" class="my-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- <img src="../assets/report.gif" alt=""> -->
    <div class="chart">
      <div id="myChart"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: "reports",
  data() {
    return {
      option: {
        title: {
          text: "用户来源"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    };
  },
  //发送请求以后调用的钩子函数,在服务器渲染期间不被调用,只会执行一次
  mounted() {
    this.drawLine();
    // this.init();
    // console.log(this.myChart);
  },
  // 在服务器渲染期间不被调用
  // beforeUpdated() {
  //   console.log(this.myChart);
  // },
  methods: {
    // init() {

    // },
    //获取数据,赋值给页面
    drawLine() {
      this.$request.getReports().then(res => {
        console.log(res);
        if (res.data.meta.status == 200) {
          //赋值可以,但是显示不行
          // this.option.xAxis[0].data = res.data.data.xAxis[0].data;
          // this.option.legend.data = res.data.data.legend.data;
          // this.option.series = res.data.data.series;
          // this.option.yAxis = res.data.data.yAxis;

          const backData = res.data.data;
          //循环遍历赋值
          for(let key in backData){
              this.option[key]=backData[key]
          }
          //设置定格
          //默认就是category,设置不设置都可以
          this.option.xAxis[0].type='category'
          //留白,默认值为true
          this.option.xAxis[0].boundaryGap=false


          //请求是异步的,需要在获取到数据之后再初始化
          // 基于准备好的dom，初始化echarts实例
          let myChart = echarts.init(document.getElementById("myChart"));
          // 绘制图表
          myChart.setOption(this.option, true);
          console.log(myChart);
        }
      });
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
.chart {
  width: 100%;
  height: 500px;
  background-color: #fff;
  #myChart {
    width: 800px;
    height: 500px;
  }
}
</style>
