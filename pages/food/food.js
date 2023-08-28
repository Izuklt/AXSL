// pages/food/food.js
const foodNav = require("../../data/foodNav");

const {
    host,
    foodListUrl,
} = require("../../data/urlConfig");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 当前所在的城市。需要动态修改。
        location: "北京",
        foodNav,

        foodList: [],
        page: 1,
        flag:false
        // 控制渲染 是否显示有底线。
    },

     // 请求食疗坊的列表数据。
     requestFoodList(city,page) {
         console.log(city,page);
        wx.request({
            url: host + foodListUrl,
            data: {
                city,
                page
            },
            success: res => {
                this.resolveFoodList(res);
            },
            fail: err => {
                console.log("获取食疗坊数据失败");
            }
        })
    },

    // 处理列表数据。
    resolveFoodList(res) {
        console.log(res);
        if (res.data.status === 200) {
            // 新返回的数据，和之前的数据要一并显示。
            var newFoodList = this.data.foodList.concat(res.data.data.result);
            // 有数据
            this.setData({
                foodList: newFoodList
            });
        } else {
            //无数据
            // 要显示 有底线
            this.setData({
                flag:true
            });
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 将默认的城市持久化存储。
        wx.setStorageSync('cityName', this.data.location);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
       
    },

    //  //读取本地的存储，设置当前城市
    readLocation() {
        var cityName = wx.getStorageSync("cityName");
        console.log(cityName);
        if (cityName) {
            this.setData({
                location: cityName
            });
        }
    },

    resetPage(){
        this.data.page = 1;
        this.setData({
            foodList:[],
            flag:false
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.resetPage();
        this.readLocation();
        // 
        this.requestFoodList(this.data.location,this.data.page);
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
        // 请求下一页的数据。
        this.nextPageFood();
    },

    nextPageFood(){
        this.requestFoodList(this.data.location,++this.data.page);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})