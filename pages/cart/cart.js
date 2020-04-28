import {
  showModal,
} from "../../utils/asyncWX.js"
import regeneratorRuntime from "../../lib/regenerator-runtime/runtime.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    const cart = wx.getStorageSync("cart") || [];
    this.setCart(cart);
  },

  // 设置购物车状态，计算全选状态，总数量，总价格等
  setCart(cart) {
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
    })
    wx.setStorageSync("cart", cart);
  },

  // 商品全选反选功能
  handleItemAllCheck() {
    let {
      cart,
      allChecked
    } = this.data;
    allChecked = !allChecked;
    cart.forEach(v => v.checked = allChecked);
    this.setCart(cart);
  },
  // 商品数量编辑功能
  async handleItemNumEdit(e) {
    const {
      operation,
      id
    } = e.currentTarget.dataset;
    let {
      cart
    } = this.data;
    const index = cart.findIndex(v => v.id === id);
    if (cart[index].quantity === 1 && operation === -1) {
      const result = await showModal({
        content: "您是否要删除此件商品？"
      });
      if (result.confirm) {
        cart.splice(index, 1);
        this.setCart(cart)
      } else if (result.cancel) {
        console.log('用户点击取消')
      }
    } else if (cart[index].quantity === cart[index].stock && operation === 1) {
      wx.showToast({
        title: '已达到购买最大数量',
      })
    } else {
      cart[index].quantity += operation;
      this.setCart(cart);
    }
  },
  async handlePay() {
    if (wx.getStorageSync('user')) {
      wx.navigateTo({
        url: '/pages/pay/pay',
      });
    } else {
      wx.showToast({
        title: '请先登录',
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/user/user',
        })
      }, 800);
    }
  },

  toIndex() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})