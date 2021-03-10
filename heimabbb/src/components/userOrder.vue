<template>
    <div class="bg-wrap" style="min-height: 765px;">
                                        <div class="sub-tit">
                                            <ul>
                                                <li class="selected">
                                                    <a href="/user/order-list.html">交易订单</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="table-wrap">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
                                                <tbody>
                                                    <tr>
                                                        <th width="16%" align="left">订单号</th>
                                                        <th width="10%">姓名</th>
                                                        <th width="12%">订单金额</th>
                                                        <th width="11%">下单时间</th>
                                                        <th width="10%">状态</th>
                                                        <th width="12%">操作</th>
                                                    </tr>
                                                    <tr>
                                                        <td>BD20171025213815752</td>
                                                        <td align="left">ivanyb1212</td>
                                                        <td align="left">
                                                            <strong style="color: red;">￥7220</strong>
                                                            <br> 在线支付
                                                        </td>
                                                        <td align="left">2017-10-25 21:38:15</td>
                                                        <td align="left">
                                                            待付款
                                                        </td>
                                                        <td align="left">
                                                            <a href="#/site/member/orderinfo/12" class="">查看订单</a>
                                                            <br>
                                                            <a href="#/site/goods/payment/12" class="">|去付款</a>
                                                            <br>
                                                            <a href="javascript:void(0)">|取消</a>
                                                            <br>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class="page-foot">
                                                
                                            </div>
                                        </div>
                                    </div>
</template>

<script>
export default {
    name:'userOrder'
}
</script>

<style>

</style>
