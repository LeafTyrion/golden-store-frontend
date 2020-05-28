// pages/orderDetail/orderDetail.js
import {
  request
} from "../../utils/request";
import regeneratorRuntime from "../../lib/regenerator-runtime/runtime.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {

    order:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const order_id = options.order_id;
    this.getOrdersDeatil(order_id);
  },

  async getOrdersDeatil(id) {
    const result = await request({
      url: "http://localhost:8087/wx-orders/queryOrders",
      data: {id}
    })
    console.log(result);
    
    this.setData({
      order:result.data,
    })
  },
})