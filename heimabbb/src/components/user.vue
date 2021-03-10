<template>
<!-- 会员中心全部内容 -->
  <div class="el-row">
    <div class="el-col el-col-24">
      <div class="comp">
        <div class="tmpl routeanimate">
          <div class="section">
            <div class="location">
              <span>当前位置：</span>
              <a href="/index.html">首页</a> &gt;
              <a href="/user/center/index.html">会员中心</a>
            </div>
          </div>
          <div class="section clearfix">
            <div class="left-260">
              <div class="bg-wrap">
                <div class="avatar-box">
                  <a href="/user/center/avatar.html" class="img-box">
                    <i class="iconfont icon-user-full"></i>
                  </a>
                  <h3>ivanyb</h3>
                  <p>
                    <b>注册会员</b>
                  </p>
                </div>
                <div class="center-nav">
                  <ul>
                    <li>
                      <h2>
                        <i class="iconfont icon-order"></i>
                        <span>订单管理</span>
                      </h2>
                      <div class="list">
                        <p>
                          <a href="#/site/member/orderlist" class>
                            <i class="iconfont icon-arrow-right"></i>交易订单
                          </a>
                         <router-link to='/user/Index'>
                            <i class="iconfont icon-arrow-right"></i>首页
                         </router-link>
                         <router-link to='/user/Order'>
                            <i class="iconfont icon-arrow-right"></i>列表
                         </router-link>
                         <router-link to='/user/Detail'>
                            <i class="iconfont icon-arrow-right"></i>详情
                         </router-link>
                        </p>
                      </div>
                    </li>
                    <li>
                      <h2>
                        <i class="iconfont icon-user"></i>
                        <span>账户管理</span>
                      </h2>
                      <div class="list">
                        <p>
                          <a href="#/site/member/center" class="router-link-exact-active">
                            <i class="iconfont icon-arrow-right"></i>账户资料
                          </a>
                        </p>
                        <p>
                          <a href="#/site/member/center" class="router-link-exact-active">
                            <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置
                          </a>
                        </p>
                        <p>
                          <a href="#/site/member/center" class="router-link-exact-active">
                            <i class="iconfont icon-arrow-right"></i>修改密码
                          </a>
                        </p>
                        <p>
                          <a href="javascript:void(0)">
                            <i class="iconfont icon-arrow-right"></i>退出登录
                          </a>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- 右边的部分,连接右边的三个使用router-view -->
            <div class="right-auto">
                <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"user"
};
</script>

<style>
</style>
