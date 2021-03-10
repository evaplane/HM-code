<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a> &gt;
        <a href="/goods/42/1.html">商品详情</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <div class="left-925">
            <div class="goods-box clearfix">
              <div class="pic-box">
                <el-carousel height="312px">
                  <el-carousel-item v-for="(item,index) in imglist" :key="index">
                    <img :src="item.original_path" class="goods-img" alt>
                  </el-carousel-item>
                </el-carousel>
              </div>
              <div class="goods-spec">
                <h1>{{ goodsinfo.title}}</h1>
                <!-- 是 -->
                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{ goodsinfo.goods_no }}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{ goodsinfo.market_price}}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em id="commoditySellPrice" class="price">¥{{ goodsinfo.sell_price }}</em>
                    </dd>
                  </dl>
                </div>
                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <!-- 饿了么UI中的计数器,用不到@change事件就不用,在data里面声明num -->
                        <el-input-number
                          v-model="num"
                          :min="1"
                          :max="goodsinfo.stock_quantity"
                          label="描述文字"
                        ></el-input-number>
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div id="buyButton" class="btn-buy">
                        <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                        <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div id="goodsTabs" class="goods-tab bg-wrap">
              <div
                id="tabHead"
                class="tab-head"
                style="position: static; top: 517px; width: 925px;"
              >
                <ul>
                  <li>
                    <a href="javascript:;" :class="{selected:index==1}" @click="index=1">商品介绍</a>
                  </li>
                  <li>
                    <a href="javascript:;" :class="{selected:index==2}" @click="index=2">商品评论</a>
                  </li>
                </ul>
              </div>
              <div
                class="tab-content entry"
                style="display: block;"
                v-html="goodsinfo.content"
                v-show="index==1"
              ></div>
              <div class="tab-content" style="display: block;" v-show="index==2">
                <div class="comment-box">
                  <div id="commentForm" name="commentForm" class="form-box">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea
                          id="txtContent"
                          name="txtContent"
                          sucmsg=" "
                          data-type="*10-1000"
                          nullmsg="请填写评论内容！"
                          v-model.trim="comment"
                        ></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input
                          id="btnSubmit"
                          name="submit"
                          type="submit"
                          value="提交评论"
                          class="submit"
                          @click="postComment"
                          :plain="true"
                        >
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </div>
                  <ul id="commentList" class="list-box">
                    <p
                      style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                    >暂无评论，快来抢沙发吧！</p>
                    <li v-for="(item, index) in commentList" :key="index">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span>{{ item.user_name }}</span>
                          <span>{{ item.add_time | formatTime}}</span>
                        </div>
                        <p>{{ item.content }}</p>
                      </div>
                    </li>
                  </ul>
                  <div class="page-box" style="margin: 5px 0px 0px 62px;">
                    <!-- page-sizes代表的是页容量是可以选择的,current-page动态改变为pageIndex,handleCurrentChange和handleSizeChange是两个
                        函数,
                    -->
                    <el-pagination
                    background
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="pageIndex"
                      :page-sizes="[5, 10, 15, 20]"
                      :page-size="10"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="totalComments"
                    ></el-pagination>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="left-220">
          <div class="bg-wrap nobg">
            <div class="sidebar-box">
              <h4>推荐商品</h4>
              <ul class="side-img-list">
                <li v-for="(item, index) in hotgoodslist" :key="index">
                  <div class="img-box">
                    <!-- <a href="#/site/goodsinfo/90" class> -->
                    <router-link :to="'/detail/'+item.id">
                      <img :src="item.img_url ">
                    </router-link>
                    <!-- </a> -->
                  </div>
                  <div class="txt-box">
                    <!-- <a href="#/site/goodsinfo/90" class> -->
                    <router-link :to="'/detail/'+item.id">
                      {{ item.title }}
                      <!-- </a> -->
                    </router-link>
                    <span>2015-04-20</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 获取评论
 *    调用接口,传入参数,调用接口在methods里面写
 */
// import axios from "axios";
// import moment from "moment";
export default {
  name: "detail",
  data() {
    return {
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],
      //tab栏的切换,点击哪个就显示哪个
      index: 1,
      //评论的内容
      comment: "",
      //获取的评论
      commentList: [],
      //获取的评论的总条数
      totalComments: 0,
      //页码
      pageIndex: 1,
      //页容量
      pageSize: 10,
      num:1
    };
  },
  created() {
    // console.log(this.$route.params.id);
    //获取id
    const id = this.$route.params.id;
    // console.log(id);

    //调用获得详情的接口
    this.$axios
      .get(
        `site/goods/getgoodsinfo/${
          this.$route.params.id
        }`
      )
      .then(res => {
        // console.log(res.data);
        this.goodsinfo = res.data.message.goodsinfo;
        this.hotgoodslist = res.data.message.hotgoodslist;
        this.imglist = res.data.message.imglist;
      });

    this.getPage();
  },
  //侦听器,侦听如果id改变,就重新获取数据
  watch:{
      "$route.params.id"(nv){
        //重新发请求就是重新获取数据
      this.$axios
      .get(
        `site/goods/getgoodsinfo/${
          nv
        }`
      )
      .then(res => {
        // console.log(res.data);
        this.goodsinfo = res.data.message.goodsinfo;
        this.hotgoodslist = res.data.message.hotgoodslist;
        this.imglist = res.data.message.imglist;
      });

      //获取评论
      this.getPage();

      }
  },
  methods: {
    postComment() {
      //1.判断是否为空,如果为空弹出饿了么UI中的弹框
      //饿了么UI中写的是open4,直接把open4的代码写在postComment里面
      if (this.comment == "") {
        //$message是elemeUI写的,这个是一个弹框
        this.$message.error("评论内容不能为空哦");
        return;
      } else {
        //axios发送post请求,第二个参数是对象,里面可以写参数
        //http://111.230.232.110:8899/site/validate/comment/post/goods/102   this.$route.params.id  需要商品id
        this.$axios
          .post(
            `site/validate/comment/post/goods/${
              this.$route.params.id
            }`,
            {
              commenttxt: this.comment
            }
          )
          .then(res => {
            console.log(res);
            //发表成功
            if (res.data.status == 0) {
              //成功的提示
              this.$message.success("评论成功");
              //把页面重新赋值为1
              this.pageIndex=1;
              //调用获取评论的接口欧
              this.getPage();
              
              //清空textarea
              this.comment = "";
            }
          });
      }
    },
    getPage() {
      this.$axios
        .get(
          `http://111.230.232.110:8899/site/comment/getbypage/goods/${
            this.$route.params.id
          }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(res => {
          console.log(res);
          //获取评论的内容
          this.commentList = res.data.message;

          //获取评论的总条数
          this.totalComments = res.data.totalcount;
        });
    },
    //改变页容量,参数是每页的条数
    handleSizeChange(size){
       this.pageSize=size;
       //获取之后重新刷新页面
       this.getPage();
    },
    //改变页码,参数是页码
    handleCurrentChange(current){
      this.pageIndex=current;
      //重新刷新页面
      this.getPage();
    }
  },
  // filters: {
  //   //用moment过滤时间
  //   formatTime(value) {
  //     return moment(value).format("YYYY年MM月DD日");
  //   }
  // }
};
</script>

<style>
.tab-content.entry img {
  display: block;
  width: 100%;
}
.pic-box {
  width: 300px;
}
.goods-img {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
