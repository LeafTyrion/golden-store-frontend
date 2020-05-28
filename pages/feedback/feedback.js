// pages/feedback/feedback.js
import {
  request
} from "../../utils/request";
import regeneratorRuntime from "../../lib/regenerator-runtime/runtime.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    opinionParams: {
      user_id: null,
      textValue: ""
    }
  },

  // 文本域输入事件
  handleTextInpue(e) {

    this.data.opinionParams.textValue = e.detail.value

  },

  async handleFormSubmit() {
    this.data.opinionParams.user_id = wx.getStorageSync('user').id;
    const textValue = this.data.opinionParams.textValue;
    // 验证内容不为空
    if (!textValue.trim()) {
      wx.showToast({
        title: '问题描述不能为空',
        icon: 'none',
        mask: true,
      });
      return;
    }
    wx.showLoading({
      title: "正在上传中...",
      mask: true,
    });

    const res = await request({
      url: "http://localhost:8085/wx-opinions/addOpinion",
      data: this.data.opinionParams,
      method: "post"
    });
    this.setData({
      textValue: ""
    })
    console.log("只写了文本")
    wx.hideLoading();
    wx.navigateBack({
      delta: 1
    });


  }
})