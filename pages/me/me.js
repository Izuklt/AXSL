// pages/me/me.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phoneNumber: "13126835297",
    },

    callPhone() {
        wx.makePhoneCall({
            phoneNumber: this.data.phoneNumber
        })
    },

    // 登录接口
    login() {
        wx.login({
            success: res => {
                // 获取登录凭证。
                var code = res.code;
                console.log("code = " + code);
                // 拿到登录凭证之后，向自己的后台发送登录凭证，目前使用测试的接口。
                wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session', //接口地址
                    data: {
                        appid: 'wx3d24d475f44a6c62',
                        secret: '7fb35444c865c6fac70c32ce8cf10c53',
                        js_code: code,
                        grant_type: 'authorization_code'
                    },
                    success: res => {
                        this.resolveLogin(res);
                    },
                    fail: err => {
                        console.log("err", err);
                    }
                })
            }
        });
    },

    // 登录成功的回调。
    resolveLogin(res) {
        console.log("openid = " + res.data.openid);
        console.log("session_key = " + res.data.session_key);
        wx.showToast({
            title: '登录成功'
        });
        wx.setStorageSync('login', res.data.openid);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})