import regeneratorRuntime from "../../lib/regenerator-runtime/runtime.js"
import {
  request
} from "../../utils/request.js";

Page({

  data: {
    //左侧菜单数据
    leftMenuList: [],
    // 右侧类别数据
    rightContent: [],
    // 被点击的左侧菜单索引
    currentIndex: 0,
    // 内容标题
    title: '',
    // 接口返回数据
    category: [],
    // 右侧内容滚动条距离顶部的距离
    scrollTop: 0,

  },

  onLoad: function (options) {
    // 缓存机制
    const category = wx.getStorageSync('catestory');
    if (!category) {
      this.getCategory();

    } else {
      // 定义过期时间
      if (Date.now() - category.time > 1000 * 10) {
        console.log("缓存过期，获取新数据")
        this.getCategory();
      } else {
        console.log("使用的是缓存数据");
        this.category = category.data
        let leftMenuList = this.category.map(v => v.name);
        let rightContent = this.category[0].subType;
        this.setData({
          leftMenuList,
          rightContent,
        })
      }
    }
  },

  async getCategory() {
    // async await语法 发送异步请求
    const result = await request({
      url: "http://localhost:8086/wx-type/allType"
    });
    console.log(result);
    this.category = result.data;
    // 获取到数据存入缓存
    wx.setStorageSync('catestory', {
      time: Date.now(),
      data: this.category
    });

    let leftMenuList = this.category.map(v => v.name);
    let rightContent = this.category[0].subType;
    let title = this.category[0].name;
    this.setData({
      leftMenuList,
      rightContent,
      title,
    })
  },

  // 左侧菜单点击事件
  handleItemTap(e) {
    const {
      index
    } = e.currentTarget.dataset;
    let rightContent = this.category[index].subType;
    let title = this.category[index].name;
    this.setData({
      currentIndex: index,
      rightContent,
      title,
      // 重新设置右侧菜单距离顶部的距离
      scrollTop: 0,
    })
  }

})