const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  request
}

/**
 * 封封微信的的request
 */
function request(url, data = {}, method = "GET", contentType = "application/json") {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': contentType,
        'X-Nideshop-Token': wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.statusCode == 200) {
          console.log(res)
          if (res.data.errno == 401) {
            //需要登录后才可以操作
            wx.showModal({
              title: '',
              content: '请先登录',
              success: function (res) {
                if (res.confirm) {
                  wx.removeStorageSync("userInfo");
                  wx.removeStorageSync("token");
                  wx.switchTab({
                    url: '/pages/ucenter/index/index'
                  });
                }
              }
            });
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }

      },
      fail: function (err) {
        reject(err)
      }
    })
  });
}