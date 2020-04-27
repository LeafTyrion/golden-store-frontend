import {
  getSetting,
  openSetting,
  chooseAddress,
  showToast
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
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart") || [];
    let totalPrice = 0;
    let totalNum = 0;
    // 获取商品选中状态，并且计算价格
    cart.forEach(v => {
      totalPrice += v.quantity * v.price;
      totalNum += v.quantity;
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    })
    wx.setStorageSync("cart", cart);
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
      // 4. 调用收货地址api
      let address = await chooseAddress();
      // 拼接详细地址
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      console.log(address);
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error);
    }
  },
  // 点击支付
  async handleOrderPay() {


    try {
      const {
        address
      } = this.data;
      if (!address.userName) {
        await showToast({
          title: "您还没有选择收货地址"
        });
        return
      };

      const price = this.data.totalPrice;
      const cart = this.data.cart;
      let goods = [];
      cart.forEach(v => goods.push({
        id: v.id,
        quantity: v.quantity,
        price: v.price
      }));
      let openId = wx.getStorageSync('openId')
      const orderParams = {
        price,
        address,
        goods,
        openId
      };
      // 发送POST请求，传输订单信息
      const result = await request({
        url: "http://localhost:8087/wx-orders/creatOrders",
        method: "POST",
        data: orderParams,
      });
      await showToast({
        title: "提交订单成功，货物将尽快送达"
      });
      setTimeout(() => {
        wx.setStorageSync('cart', []);
        wx.switchTab({
          url: '/pages/cart/cart',
        })
      }, 1000);
    } catch (error) {
      console.log(error);
      await showToast({
        title: "提交订单失败，请稍后重试"
      });
    }
  }
})