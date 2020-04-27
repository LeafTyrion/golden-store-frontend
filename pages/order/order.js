// pages/order/order.js
import { request } from "../../utils/request";
import regeneratorRuntime from "../../lib/regenerator-runtime/runtime.js"

Page({

  data: {
    orders: [
      {
        "order_number": "HMDD20190802000000000428",
        "order_price": 13999,
        "create_time": 1564731518,
      },
      {
        "order_number": "HMDD20190802000000000428",
        "order_price": 13999,
        "create_time": 1564731518,
      },
      {
        "order_number": "HMDD20190802000000000428",
        "order_price": 13999,
        "create_time": 1564731518,
      },
    ]
  },

  onLoad: function(options){

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   

    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    console.log(currentPage.options);
    const { type } = currentPage.options;
    this.getOrders(type);
  },
  async getOrders(type) {
    const result = this.data.orders;
    // const result = await request({ url: "/my/orders/all", data: { type } })
    console.log(result);
    // this.setData({
    //   orders: result.data.message,
    // })
  
    this.setData({
      orders: result.map(v => ({ ...v, create_time_cn: (new Date(v.create_time * 1000).toLocaleString()) }))
    })
  },

})