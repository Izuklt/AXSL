// pages/foodSearch/foodSearch.js
const {
    host,
    foodSearchListUrl
} = require("../../data/urlConfig");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchFoodArr:[]
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

    searchFood(e) {
        console.log(e);
        // http://iwenwiki.com:3002/api/foods/select?name=产品名字city=城市名
        var value = e.detail.value;
        if(!value.trim()){
            // 输入了无效的信息，没有任何的输入。
            this.setData({
                searchFoodArr:[]
            });
            return;
        }
        var cityName = wx.getStorageSync('cityName');
        console.log("cityName",cityName);
        wx.request({
            url: host + foodSearchListUrl,
            data: {
                name: value,
                ctiy: cityName
            },
            success: res => {
                this.resolveSearchFood(res);
            }
        })
    },

    resolveSearchFood(res){
        console.log(res);
        this.setData({
            searchFoodArr:res.data.data
        });
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