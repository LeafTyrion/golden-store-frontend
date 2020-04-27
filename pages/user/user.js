import {
  getSetting,
  openSetting,
  chooseAddress,
  login,
  showToast,
  showModal
} from "../../utils/asyncWX.js"
import regeneratorRuntime from "../../lib/regenerator-runtime/runtime.js"
import {
  request
} from "../../utils/request.js"
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

  // 获取用户收货地址
  async handleChooseAddress() {
    try {
      // 1. 获取权限信息
      const result = await getSetting();
      const scopeAddress = result.authSetting["scope.address"];
      // 2. 判断权限状态
      if (scopeAddress === false) {
        // 3. 诱导用户打开授权页面
        await openSetting();
      }
      // 4. 调用收货地址apiß
      let address = await chooseAddress();
      // 拼接详细地址
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      console.log(address);
      wx.setStorageSync("address", address);

    } catch (error) {
      console.log(error);
    }
  },
  async handleGetUserInfo(e) {
    try {
      const {
        encryptedData,
        rawData,
        iv,
        signature
      } = e.detail;
      const {
        code
      } = await login();
      const loginParams = {
        encryptedData,
        rawData,
        iv,
        signature,
        code
      };
      const res = await request({
        url: "http://localhost:8088/wx-login/login",
        data: loginParams,
        method: "post"
      });
      console.log(res);
      // wx.setStorageSync("token", res.data.token);
      wx.setStorageSync("openId", res.data.openid);
      const {
        userInfo
      } = e.detail;
      wx.setStorageSync("userInfo", userInfo);
      console.log(userInfo);
      await showToast({
        title: "登录成功"
      });
    } catch (error) {
      console.log(error);
      await showToast({
        title: "登录失败，请稍后再试"
      });
      return
    };
    this.onShow();
  },

  async logout() {
    const result = await showModal({
      content: "退出后将会清除用户信息和购物车信息，是否确认？"
    });
    if (result.confirm) {
      wx.clearStorageSync();
      this.onShow();
    } else if (result.cancel) {
      console.log('用户点击取消')
    }
  }
})