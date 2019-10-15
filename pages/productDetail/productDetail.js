// pages/productDetail/productDetail.js
const util = require("../../utils/util.js")
const api = require("../../utils/api.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200,
    product: {
      "id": 1,
      "name": "辣条",
      "detail": "秋田犬的祖先犬是被称为“秋田玛塔吉”（秋田マタギ）的“玛塔吉犬”（マタギ犬，山地狩猎犬）。原本在日本犬中是不存在大型犬的，而秋田玛塔吉为中型的猎熊犬。江户时代出羽国北部的秋田地方被佐竹氏平定。佐竹氏是关原之战后被常陆国转封的旁系诸侯。在庆长年间的1630年（宽永7年）左右，为了培养提升藩士斗志而提供斗犬作为奖励，这些斗犬便是让猎犬与秋田地区的土犬进行交配后生育。此一犬种成为秋田犬的原种，但在当时的大馆、能带地区被称为“大馆犬”。过去只有皇族和贵族才可以拥有秋田犬。在正式的仪式上，人们会宣布照顾和饲养秋田犬的正确方法。栓犬的皮带不同，代表秋田犬的等级和主人的地位不同。人们在谈及秋田犬的时候都用特定的称呼。每头秋田犬都有专人照料，这个人穿着与被照料的犬地位相当的华丽服饰",
      "type": {
        "id": 1,
        "name": "零食"
      },
      "mainImg": "http://img1.imgtn.bdimg.com/it/u=1350652942,4044859795&fm=26&gp=0.jpg",
      "imgUrl": [
        "http://img1.imgtn.bdimg.com/it/u=1350652942,4044859795&fm=26&gp=0.jpg",
        "http://img1.imgtn.bdimg.com/it/u=1350652942,4044859795&fm=26&gp=0.jpg",
        "http://img1.imgtn.bdimg.com/it/u=1350652942,4044859795&fm=26&gp=0.jpg"
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getGood(options.good_id)
  },

  getGood: function(good_id) {
    let that = this;
    util.request(api.GetGoodById + good_id).then(function(res) {
      that.setData({
        product: res
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
  toCart: function(){
    wx.switchTab({
      url: '/pages/shopCar/shopCar',
    })
  }
})