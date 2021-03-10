<?php
header('content-type:text/html;charset=utf-8');

//1.获取轮播图数据
require_once "./admin/api/tools/doSql.php";

$sql="select * from sliders";

$sliderList = mysqli_select($sql);

// var_dump($sliderList);


//2.获取随机推荐数据

$sql = "select id,title,feature,views from posts where status = 'published' order by rand() limit 5";
$recommend = mysqli_select($sql);
// var_dump($recmmend);


//3.焦点关注,获取最新的5篇文章
$sql = "select id,title,feature from posts where status = 'published' order by id desc limit 5";
$focus = mysqli_select($sql);

//4.热门推荐,阅读量最多的5篇文章
$sql = "select id,feature,title,views,likes from posts where status = 'published' order by views desc limit 5";
$hotPosts = mysqli_select($sql);


//5.最新发布,查询最新的三篇文章
$sql ="select c.name,p.title,p.id,u.nickname,p.created,p.content,p.views,p.likes,p.feature
              from posts p 
              inner join categories c on p.category_id=c.id
              inner join users u on p.user_id=u.id
              where p.status ='published'
              order by p.id desc limit 3";
$new = mysqli_select($sql);

//6.获取分类
$sql = "select * from categories";
$categoryList = mysqli_select($sql);

//7.把字体图标的类存在一个数组里面
$iconArr = array('fa-glass','fa-phone','fa-fire','fa-gift');

//8.获取8条最新评论
$sql ="select author,created,content from comments order by id desc limit 6";
$commentList = mysqli_select($sql);
?>


<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>阿里百秀-发现生活，发现美!</title>
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/vendors/font-awesome/css/font-awesome.css">
  <style>
    .swipe-wrapper li img{
      height:318px;
    }
  
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="topnav">
      <ul>
    <?php foreach($categoryList as $key => $value): ?>
        <li><a href="javascript:;"><i class="fa <?php echo $iconArr[$key]?>"></i><?php echo $value['name']?></a></li>
    <?php endforeach;?>
      </ul>
    </div>
    <div class="header">
      <h1 class="logo"><a href="index.html"><img src="assets/img/logo.png" alt=""></a></h1>
      <ul class="nav">
        <?php foreach ($categoryList as $key => $value): ?>
        <!-- 跳到list.php页面,把id和name传过去 -->
        <li><a href="list.php?id=<?php echo $value['id']?>&name=<?php echo $value['name']?>"><i class="fa <?php echo $iconArr[$key]?>"></i><?php echo $value['name']?></a></li>
      <?php endforeach;?>
      </ul>
      <div class="search">
        <form action='detail1.php'>
          <input type="text" class="keys"name ='keys' id='keys' placeholder="输入关键字">
          <input type="submit" id='searchBtn' class="btn" value="搜索">
        </form>
      </div>
      <div class="slink">
        <a href="javascript:;">链接01</a> | <a href="javascript:;">链接02</a>
      </div>
    </div>
    <div class="aside">

      <div class="widgets">
        <h4>搜索</h4>
        <div class="body search">
          <form action='detail1.php'>
            <input type="text" class="keys" id ='keys' name = 'keys' placeholder="输入关键字">
            <input type="submit" class="btn" value="搜索">
            <!-- <input type="hidden" name="id"> -->
          </form>
        </div>
      </div>
      <div class="widgets">
        <h4>随机推荐</h4>
        <ul class="body random">
        
        <?php foreach ($recommend as $key => $value): ?>
          <li>
            <a href="./detail.php?id=<?php echo $value['id']?>&keys=0">
              <p class="title"><?php echo $value['title']?></p>
              <p class="reading">阅读(<?php echo $value['views'] ?>)</p>
              <div class="pic">
                <img src="<?php echo $value['feature']?>" alt="">
              </div>
            </a>
          </li>

  <?php endforeach; ?>
        </ul>
      </div>
      <div class="widgets">
        <h4>最新评论</h4>
        <ul class="body discuz">
          <?php foreach ($commentList as $key => $value): 
            //设置北京时间
            date_default_timezone_set('PRC');
            //当前时间
            $year1 = +substr($showtime=date("Y-m-d"),0,4);
            $year2 = +substr($value['created'],0,4);
            $time1 = +substr($showtime=date("Y-m-d"),5,2);
            $time2 = +substr($value['created'],5,2);
            if($year1>$year2){
              $time = ($year1-$year2)*12+($time1-$time2);
              echo "<br>";
            }else{
              $time = $time1-$time2;
            }
            
          ?>
          <li>
            <a href="javascript:;">
              <div class="avatar">
                <img src="uploads/avatar_1.jpg" alt="">
              </div>
              <div class="txt">
                <p>
                  <span><?php echo $value['author']?></span><?php echo $time?>个月前(<?php echo substr($value['created'],5,5);?>)说:
                </p>
                <p><?php echo substr($value['content'],0,60)."......";?></p>
              </div>
            </a>
          </li>
        <?php endforeach;?>
        </ul>
      </div>
    </div>
    <div class="content">
      <div class="swipe">
        <ul class="swipe-wrapper">

        <?php foreach($sliderList as $value): ?>
          <li>
            <a href="<?php echo $value['link']?>">
              <img src="<?php echo $value['image']?>">
              <span><?php echo $value['text']?></span>
            </a>
          </li>
          
      <?php endforeach; ?>
        </ul>
        <p class="cursor">

        <?php foreach ($sliderList as $key => $value):

            if($key==0):
        ?>
          
        
        <span class="active">
            
            <?php else:?>  
        </span><span>

            <?php endif;?>
            <?php endforeach;?>


        </p>
        <a href="javascript:;" class="arrow prev"><i class="fa fa-chevron-left"></i></a>
        <a href="javascript:;" class="arrow next"><i class="fa fa-chevron-right"></i></a>
      </div>
      <div class="panel focus">
        <h3>焦点关注</h3>
        <ul>

        <?php foreach($focus as $key => $value):?>
        <?php if($key==0):?>
          <li class="large">
            <?php else:?>
            <li>
            <?php endif;?>
            <a href="detail.php?id=<?php echo $value['id']?>">
              <img src="<?php echo $value['feature']?>" alt="">
              <span><?php echo $value['title']?></span>
            </a>
          </li>
          
          <?php endforeach;?>
        </ul>
      </div>
      <div class="panel top">
        <h3>一周热门排行</h3>
        <ol>

        <?php foreach ($hotPosts as $key => $value): ?>
          <li>
            <i><?php echo $key+1 ?></i>
            <a href="detail.php?id=<?php echo $value['id']?>"><?php echo $value['title']?></a>
            <!-- 5.1.声明两个自定义属性,用来存这条数据的id和赞的数量 -->
            <a href="javascript:;" postID="<?php echo $value['id']?>" class="like">赞(<?php echo $value['likes']?>)</a>
            <span>阅读 (<?php echo $value['views']?>)</span>
          </li>
            <?php endforeach;?>
        </ol>
      </div>
      <div class="panel hots">
        <h3>热门推荐</h3>
        <ul>
          <?php for($i =0;$i<4;$i++):?>
          <li>
            <a href="./detail.php?id=<?php echo $hotPosts[$i]['id']?>">
              <img src="<?php echo $hotPosts[$i]['feature']?>" alt="">
              <span><?php echo $hotPosts[$i]['title']?></span>
            </a>
          </li>
            <?php endfor;?>
         
        </ul>
      </div>
      <div class="panel new">
        <h3>最新发布</h3>
        
        <?php foreach ($new as $key => $value): 
        
        $p_id = $value['id'];
        //在循环里面找到对应的评论数
        $sql = "select * from comments where post_id ='$p_id' and status ='approved'";
        $countComments = count(mysqli_select($sql));
        ?>
        <div class="entry">
          <div class="head">
            <span class="sort"><?php echo $value['name']?></span>
            <a href="detail.php?id=<?php echo $value['id']?>"><?php echo $value['title']?></a>
          </div>
          <div class="main">
            <p class="info"><?php echo $value['nickname']?> 发表于 <?php echo $value['created']?></p>
            <p class="brief"><?php echo $value['content']?></p>
            <p class="extra">
              <span class="reading">阅读(<?php echo $value['views']?>)</span>
              <span class="comment">评论(<?php echo $countComments ?>)</span>
              <a href="javascript:;" postID="<?php echo $value['id']?>"  class="like">
                <i class="fa fa-thumbs-up"></i>
                <span>赞(<?php echo $value['likes']?>)</span>
              </a>
              <a href="javascript:;" class="tags">
                分类：<span><?php echo $value['name']?></span>
              </a>
            </p>
            <a href="javascript:;" class="thumb">
              <img src="<?php echo $value['feature']?>" alt="">
            </a>
          </div>
        </div>

            <?php endforeach;?>
      </div>
    </div>
    <div class="footer">
      <p>© 2016 XIU主题演示 本站主题由 themebetter 提供</p>
    </div>
  </div>
  <script src="assets/vendors/jquery/jquery.js"></script>
  <script src="assets/vendors/swipe/swipe.js"></script>
  <script>
    //
    var swiper = Swipe(document.querySelector('.swipe'), {
      auto: 3000,
      transitionEnd: function (index) {
        // index++;

        $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
      }
    });

    // 上/下一张
    $('.swipe .arrow').on('click', function () {
      var _this = $(this);

      if(_this.is('.prev')) {
        swiper.prev();
      } else if(_this.is('.next')) {
        swiper.next();
      }
    })


    //5.2 点击赞的时候,发送ajax请求,使赞的数量加1
    $('.like').on('click',function(){
      //5.2.1.获取id和赞的数量
      // var zan = $(this).attr('zan');
      
      
      //5.2.2 每次点击让zan自身+1
      // console.log(zan);
      // zan++;
      var postID = $(this).attr('postID');
      //声明that的值为this
      var that = this;
      //5.2.3 判断一下赞是有手的还是没有手的,有手的赞like里面的数据是>0的
      var haveHand = $(this).children().length;
      //5.2.4 发送请求
        $.post({
          url:'admin/api/zan.php',
          data:{id:postID},
          success:function(obj){
            //5.2.4 如果成功,改赞的HTML
            if(obj!='fail'){
              if(haveHand>0){
                
                $(that).html(" <i class='fa fa-thumbs-up'></i> <span>赞("+obj+")</span>");
              }else{

                $(that).html("赞("+obj+")");
              }
              // location.reload();
            }else{
              alert('点赞失败!');
            }
          }
        })

    
    })


    //发送ajax请求
        
  
  </script>
</body>
</html>
