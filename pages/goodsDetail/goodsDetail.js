import {
  request
} from "../../utils/request.js";
import regeneratorRuntime from "../../lib/regenerator-runtime/runtime.js"

Page({

  data: {
    goods: {
      stock: 0,
    },
    btn: {
      delStatus: 'disabled',
      addStatus: 'normal',
      quantity: 1
    },
    showDialog: false,

  },
  GoodsInfo: {
    id: null,
    name: '',
    quantity: 1,
    imageUrl: '',
    price: null,
    stock: null
  },

  onLoad: function (options) {
    console.log(options);
    const id = options.id;
    this.getGoodsDetail(id);
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
    this.GoodsInfo.name = goods.name;
    this.GoodsInfo.id = goods.id;
    this.GoodsInfo.imageUrl = goods.imageUrl;
    this.GoodsInfo.price = goods.price;
    this.GoodsInfo.stock=goods.stock;
    this.setData({
      goods,
    })
  },
  // 点击轮播图，放大预览
  handlePreviewImage(e) {
    const urls = this.data.goods.imagesList.map(v => v.url);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    })
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
    var count = this.GoodsInfo.quantity;
    const stock = this.data.goods.stock
    // 商品总数量-1
    if (count > 1) {
      count -= 1;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var delStatus = count <= 1 ? 'disabled' : 'normal';
    // 只有大于10件的时候，才能normal状态，否则disable状态
    var addStatus = count >= stock ? 'disabled' : 'normal';
    this.GoodsInfo.quantity = count;
    // 将数值与状态写回
    this.setData({
      btn: {
        delStatus: delStatus,
        addStatus: addStatus,
        quantity: count
      },
    });
  },

  addCount() {
    var count = this.GoodsInfo.quantity;
    const stock = this.data.goods.stock
    // 商品总数量-1
    if (count < stock) {
      count += 1;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var delStatus = count <= 1 ? 'disabled' : 'normal';
    // 只有大于10件的时候，才能normal状态，否则disable状态
    var addStatus = count >= stock ? 'disabled' : 'normal';
    this.GoodsInfo.quantity = count;
    // 将数值与状态写回
    this.setData({
      btn: {
        delStatus: delStatus,
        addStatus: addStatus,
        quantity: count
      },
    });
  },

  // handleCartAdd() {
  //   wx.showToast({
  //     title: '加入购物车成功',
  //     duration: 2000
  //   });
  //   console.info(this.data.GoodsInfo);
  //   this.setData({
  //     showDialog: false
  //   });  
  // },

  // 加入购物车功能，使用缓存
  handleCartAdd() {
    let cart = wx.getStorageSync("cart") || [];

    let index = cart.findIndex(v => v.id === this.GoodsInfo.id)
    if (index === -1) {
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    } else {
      cart[index].quantity += this.GoodsInfo.quantity;
    }
    wx.setStorageSync("cart", cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // mask有间隔时间，避免连续多次点击
      mask: true,
    });
    this.GoodsInfo.quantity = 1;
    console.info(this.GoodsInfo);
    this.setData({
      showDialog: false,
      btn: {
        quantity: 1,
      }
    });
  },
})