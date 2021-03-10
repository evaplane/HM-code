//1.MUI中的轮播图自动轮播
var slider = mui("#slider");
slider.slider({
    interval: 1000
});

//2.初始化内容滚动
mui('.mui-scroll-wrapper').scroll({
    // indicators: false, //是否显示滚动条
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
