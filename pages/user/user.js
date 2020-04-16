Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    collectNums: 0,

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userInfo = wx.getStorageSync("userInfo");
    const collect = wx.getStorageSync("collect");
    this.setData({
      userInfo,
      collectNums: collect.length
    })
  },
  handleGetUserInfo(e) {
    const {
      userInfo
    } = e.detail;
    wx.setStorageSync("userInfo", userInfo);
    console.log(userInfo);
    this.onShow();
  }

})