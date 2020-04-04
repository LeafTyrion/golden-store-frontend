// pages/typeList/typeList.js
const util = require("../../utils/util.js")
const api = require("../../utils/api.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    typeArray: [
      {
        "id": 1,
        "name": '冒菜'
      },
      {
        "id": 2,
        "name": '火锅'
      },
      {
        "id": 3,
        "name": '麻辣香锅'
      },
      {
        "id": 4,
        "name": '苹果'
      },
      {
        "id": 5,
        "name": '香蕉'
      },
      {
        "id": 6,
        "name": '可乐'
      },
      {
        "id": 7,
        "name": '雪碧'
      },
      {
        "id": 8,
        "name": '芬达'
      },
      {
        "id": 9,
        "name": '麦当劳'
      },
      {
        "id": 10,
        "name": '肯德基'
      },
      {
        "id": 11,
        "name": '牛肉面'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTypeData();
  },
  /**
   * 得到商品类别信息
   */
  getTypeData: function () {
    let that = this;
    util.request(api.GetAllType).then(function (res) {
      that.setData({ typeArray: res })
    })
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
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function () {
      that.getTypeData();
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500)
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

  },

  toProductList: function (e) {
    var type_id=e.currentTarget.dataset.index
    //带参跳转
    wx.navigateTo({
      url: '../productList/productList?type_id='+type_id,
      success: (result) => {

      },
      fail: () => { },
      complete: () => { }
    });
  }
})