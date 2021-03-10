<template>
  <div class="app">
    <div class="header">
      <!-- 1.0 导航栏头部 -->
      <div class="head-top">
        <div class="section">
          <div class="left-box">
            <span>
              <font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">黑马买买买</font>
              </font>
            </span>
            <a target="_blank" href="#"></a>
            <a target="_blank" href="#"></a>
          </div>
          <div id="menu" class="right-box">
            <span style="display: none;">
              <a href class>
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">登录</font>
                </font>
              </a>
              <strong>
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">|</font>
                </font>
              </strong>
              <a href class>
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">注册</font>
                </font>
              </a>
              <strong>
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">|</font>
                </font>
              </strong>
            </span>
            <span>
              <!-- <a href class> -->
              <router-link to="user">
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">中心会员</font>
                </font>
              </router-link>
              <!-- </a> -->
              <strong>
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">|</font>
                </font>
              </strong>
              <a>
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">退出</font>
                </font>
              </a>
              <strong>
                <font style="vertical-align: inherit;">
                  <font style="vertical-align: inherit;">|</font>
                </font>
              </strong>
            </span>
            <a href class>
              <i class="iconfont icon-cart"></i>
              <font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">购物车（</font>
                <span id="shoppingCartCount">
                  <span>
                    <font style="vertical-align: inherit;">4</font>
                  </span>
                </span>
                <font style="vertical-align: inherit;">）</font>
              </font>
              <span id="shoppingCartCount">
                <span>
                  <font style="vertical-align: inherit;"></font>
                </span>
              </span>
              <font style="vertical-align: inherit;"></font>
            </a>
          </div>
        </div>
      </div>

      <!-- 2.0 导航条 -->
      <div class="head-nav">
        <div class="section">
          <div id="menu2" class="nav-box menuhd">
            <ul>
              <li class="index">
                <router-link to="/index">
                  <span class="out" style="top: 0px;">
                    <font style="vertical-align: inherit;">
                      <font style="vertical-align: inherit;">首页</font>
                    </font>
                  </span>
                </router-link>
              </li>
              <li class="news">
                <a href="#" class>
                  <span class="out" style="top: 0px;">
                    <font style="vertical-align: inherit;">
                      <font style="vertical-align: inherit;">每日精选</font>
                    </font>
                  </span>
                </a>
              </li>
              <li class="photo">
                <a href="#" class>
                  <span class="out" style="top: 0px;">
                    <font style="vertical-align: inherit;">
                      <font style="vertical-align: inherit;">秒杀专区</font>
                    </font>
                  </span>
                </a>
              </li>
              <li class="video">
                <a href="#" class>
                  <span class="out" style="top: 0px;">
                    <font style="vertical-align: inherit;">
                      <font style="vertical-align: inherit;">黑马超市</font>
                    </font>
                  </span>
                </a>
              </li>
              <li class="down">
                <a href="#" class>
                  <span class="out" style="top: 0px;">
                    <font style="vertical-align: inherit;">
                      <font style="vertical-align: inherit;">会员权益</font>
                    </font>
                  </span>
                </a>
              </li>
              <li class="goods">
                <a href class="router-link-exact-active">
                  <span class="out" style="top: 0px;">
                    <font style="vertical-align: inherit;">
                      <font style="vertical-align: inherit;">购物商城</font>
                    </font>
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div class="search-box">
            <div class="input-box">
              <input
                id="keywords"
                name="keywords"
                type="text"
                onkeydown="if(event.keyCode==13){};"
                placeholder="输入关健字"
                x-webkit-speech
              >
            </div>
            <a href="javascript:;">
              <i class="iconfont icon-search"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <router-view></router-view>

    <!-- 底部 -->
    <div class="footer">
      <div class="section">
        <div class="foot-nav">
          <a href>关于我们</a>
          <strong>|</strong>
          <a href>联系我们</a>
          <strong>|</strong>
          <a href>联系客服</a>
          <strong>|</strong>
          <a href>合作招商</a>
          <strong>|</strong>
          <a href>商家帮助</a>
          <strong>|</strong>
          <a href>营销中心</a>
          <strong>|</strong>
          <a href>隐私政策</a>
        </div>
        <div class="foot-box">
          <div class="copyright">
            <p>版权所有 黑马买买买</p>
            <p>公司地址： 联系电话：</p>
            <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
          </div>
          <div class="service">
            <p>周一至周日 9:00-24:00</p>
            <a href="#">
              <i class="iconfont icon-phone"></i>在线客服
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>


<style lang="scss">
.app .footer {
  background-color: skyblue;
}
.app .header .head-top {
  background: pink;
}
.app .header .head-nav {
  background: pink; 
}
</style>
