// pages/shopcar/shopCar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [], //数据 
    iscart: true,
    hidden: null,
    // isAllSelect: true,
    totalMoney: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取产品展示页保存的缓存数据（购物车的缓存数组，没有数据，则赋予一个空数组）  

    var arr = wx.getStorageSync('cart') || [];
    console.info("缓存数据：" + arr);
    // 有数据的话，就遍历数据，计算总金额 和 总数量  
    if (arr.length > 0) {
      // 更新数据  
      this.setData({
        carts: arr,
        iscart: true,
        hidden: false,

      });
      console.info("缓存数据：" + this.data.carts);
    } else {
      this.setData({
        iscart: false,
        hidden: true,
      });
    }
    var totalMoney = 0
    for (var i = 0; i < this.data.carts.length; i++) {

      totalMoney += (this.data.carts[i].price * this.data.carts[i].count);
    }
    this.setData({
      totalMoney: totalMoney,
    })
    wx.setStorageSync("totalMoney", totalMoney)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})