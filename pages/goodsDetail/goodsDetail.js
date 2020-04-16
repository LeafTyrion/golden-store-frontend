import {
  request
} from "../../utils/request.js";
import regeneratorRuntime from "../../lib/regenerator-runtime/runtime.js"

Page({

  data: {
    goods: {},
    quantity1: {
      quantity: 1,
      min: 1,
      max: 20,
      delStatus: 'disabled',
      addStatus: 'normal'
    },
    showDialog: false,
  },

  GoodsInfo: {},

  onLoad: function (options) {
    console.log(options);
    const id = options.id;

    this.getGoodsDetail(id);
  },
  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const {
      id
    } = options;
    this.getGoodsDetail(id)

  },

  // 获取商品详情
  async getGoodsDetail(id) {
    const result = await request({
      url: "http://localhost:8086/wx-goods/getGoods",
      data: {
        id
      },
    })
    console.log(result);
    const goods = result.data;
    this.GoodsInfo = goods;
    this.setData({
      goods,
    })
  },
  // 点击轮播图，放大预览
  handlePreviewImage(e) {
    const urls = this.GoodsInfo.imagesList.map(v => v.url);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    })
  },
  // 加入购物车功能，使用缓存
  handleCartAdd() {
    let cart = wx.getStorageSync("cart") || [];

    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    if (index === -1) {
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    } else {
      cart[index].num++;
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // mask有间隔时间，避免连续多次点击
      mask: true,
    });
  },

  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });

  },
  closeDialog() {
    console.info("关闭");
    this.setData({
      showDialog: false
    });

  },

  /* 减数 */

  delCount() {
    console.log("刚刚您点击了减一");
    var count = this.data.quantity1.quantity;
    // 商品总数量-1
    if (count > 1) {
      count -= 1;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var delStatus = count <= 1 ? 'disabled' : 'normal';
    // 只有大于10件的时候，才能normal状态，否则disable状态
    var addStatus = count >= 30 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      quantity1: {
        quantity: count,
        delStatus: delStatus,
        addStatus: addStatus
      }
    });
  },

  addCount() {
    console.log("刚刚您点击了加一");
    var count = this.data.quantity1.quantity;
    // 商品总数量-1
    if (count < 30) {
      count += 1;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var delStatus = count <= 1 ? 'disabled' : 'normal';
    // 只有大于10件的时候，才能normal状态，否则disable状态
    var addStatus = count >= 30 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      quantity1: {
        quantity: count,
        delStatus: delStatus,
        addStatus: addStatus
      }
    });
  },
  /**

* 加入购物车
s
*/
  addCar() {
    wx.showToast({
      title: '加入购物车成功',
      duration: 2000
    });
    console.info("关闭");
    this.setData({
      showDialog: false
    });
  },
})