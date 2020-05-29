// pages/index/index.js
import {
  request
} from "../../utils/request";
import regeneratorRuntime from "../../lib/regenerator-runtime/runtime.js";

Page({

  data: {
    // 轮播图数组
    swiperList: [],
    //楼层数据
    floorList: [],

  },
  QueryParams: {
    page: 1,
    size: 5
  },

  onLoad: function (options) {
    this.getSwiperList();
    this.getFloorDataList();
  },

 async getSwiperList() {
    const result = await request({
      url: "http://localhost:8086/wx-goods/allGoods",
      data: this.QueryParams
    });
    console.log(result);
    this.setData({
      swiperList: result.data.content,
    })
   
  },


  async getFloorDataList() {
    const result = await request({
      url: "http://localhost:8086/wx-goods/allGoods",
      data: this.QueryParams
    });
    console.log(result);
    this.setData({
      floorList: result.data.content,
    })
   
  }


})