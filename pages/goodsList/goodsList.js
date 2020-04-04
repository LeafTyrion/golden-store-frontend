// pages/productList/productList.js
const util = require("../../utils/util.js")
const api = require("../../utils/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['综合', '销量', '价格', '新品'],
    currentTab: 0,
    goodList: [{
      "name": "可乐",
      "price": "12",
      "stock": "123",
      "mainImg": "http://img1.imgtn.bdimg.com/it/u=1350652942,4044859795&fm=26&gp=0.jpg",
    }, {
      "name": "可乐",
      "price": "12",
      "stock": "123",
      "mainImg": "http://img1.imgtn.bdimg.com/it/u=1350652942,4044859795&fm=26&gp=0.jpg",
    }, {
      "name": "可乐",
      "price": "12",
      "stock": "123",
      "mainImg": "http://img1.imgtn.bdimg.com/it/u=1350652942,4044859795&fm=26&gp=0.jpg",
    }, {
      "name": "可乐",
      "price": "12",
      "stock": "123",
      "mainImg": "http://img1.imgtn.bdimg.com/it/u=1350652942,4044859795&fm=26&gp=0.jpg",
    }, {
      "name": "可乐",
      "price": "12",
      "stock": "123",
      "mainImg": "http://img1.imgtn.bdimg.com/it/u=1350652942,4044859795&fm=26&gp=0.jpg",
    }, {
      "name": "可乐",
      "price": "12",
      "stock": "123",
      "mainImg": "http://img1.imgtn.bdimg.com/it/u=1350652942,4044859795&fm=26&gp=0.jpg",
    }, {
      "name": "可乐",
      "price": "12",
      "stock": "123",
      "mainImg": "http://img1.imgtn.bdimg.com/it/u=1350652942,4044859795&fm=26&gp=0.jpg",
    }, {
      "name": "可乐",
      "price": "12",
      "stock": "123",
      "mainImg": "http://img1.imgtn.bdimg.com/it/u=1350652942,4044859795&fm=26&gp=0.jpg",
    }, {
      "name": "可乐",
      "price": "12",
      "stock": "123",
      "mainImg": "http://img1.imgtn.bdimg.com/it/u=1350652942,4044859795&fm=26&gp=0.jpg",
    }, ],
  },
  navbarTap: function(e) {
    console.log(e.currentTarget.dataset.idx);
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var type_id = options.type_id
    this.getAllGoodData(type_id)
  },
  getAllGoodData: function(type_id) {
    let that = this;
    util.request(api.GetGoodByType + type_id).then(function(res) {
      that.setData({
        goodList: res
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  toProductDetail: function(e) {
    var good_id = e.currentTarget.dataset.index
    //带参跳转
    wx.navigateTo({
      url: '../productDetail/productDetail?good_id=' + good_id,
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });
  }

})