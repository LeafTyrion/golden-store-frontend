// pages/order/order.js
import {
  request
} from "../../utils/request";
import regeneratorRuntime from "../../lib/regenerator-runtime/runtime.js"

Page({

  data: {
    ordersList: []
  },

  QueryParams: {
    query: "",
    id: null,
    page: 1,
    size: 10
  },
  totalPages: 1,

  onLoad: function (options) {
    this.QueryParams.id=wx.getStorageSync('user').id;
    console.log(this.QueryParams)
    this.getOrdersList();
  },

  async getOrdersList() {

    const result = await request({
      url: "http://localhost:8087/wx-orders/allOrders",
      data: this.QueryParams
    })
    console.log(result);
    this.totalPages = result.data.totalPages;
    this.setData({
      ordersList:[...this.data.ordersList,...result.data.content],
    })
  },

   // 页面上滑滚动条触底
   onReachBottom() {
    // 判断下一页有没有数据
    if (this.QueryParams.page >= this.totalPages) {
      console.log("没有下一页数据啦！");
      wx.showToast({
        title: '没有啦！',
      })
    } else {
      console.log("还有呢！");
      this.QueryParams.page++;
      this.getOrdersList();
    }

  },

})