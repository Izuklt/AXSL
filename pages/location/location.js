// pages/location/location.js
const {
    host,
    hotCityUrl,
    locationUrl
} = require("../../data/urlConfig");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        hotCities: []
    },

    // 手动定位：
    getLocation() {
        wx.getLocation({
            success: res => {
                console.log(res);
                //    根据获取到的经度纬度。 获取当前城市
                this.getLocationCity(res);
            }
        })
    },

    // 根据获取到的经度纬度。
    // 使用http://iwenwiki.com:3002/api/lbs/location?latitude=39.90&longitude=116.4、
    // 获取所在的城市。 并持久化 存储。 跳转到 食疗坊的 页面，切换当前定位的城市。
    getLocationCity(res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        wx.request({
            url: host + locationUrl,
            data: {
                latitude,
                longitude
            },
            success: res => {
                // console.log();
                var cityName = res.data.result.address_component.city.slice(0,-1);
                console.log(cityName);
                // 将ctiyName 持久化存储。让存储的数据，多个页面共享读取。
                wx.setStorageSync('cityName', cityName);
                wx.switchTab({
                    url: '../food/food'
                });
            }
        })
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
        // 请求热门城市。
        this.requestHotCities();
    },

    // 获取热门城市
    requestHotCities() {
        wx.request({
            url: host + hotCityUrl,
            success: res => {
                this.resolveHotCities(res);
            }
        })
    },

    // 返回热门城市数据，赋值给本地变量，绑定到页面中。
    resolveHotCities(res) {
        if (res.data.status == 200) {
            console.log(res.data.data);
            this.setData({
                hotCities: res.data.data
            });
        }
    },

    // 切换到 食疗坊 页面，并设置当前城市。
    selectHotCity(e) {
        console.log(e);
        var cityName = e.currentTarget.dataset.cityName;
        // 将ctiyName 持久化存储。让存储的数据，多个页面共享读取。
        wx.setStorageSync('cityName', cityName);
        wx.switchTab({
            url: '../food/food'
        });
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