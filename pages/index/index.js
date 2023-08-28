// pages/index/index.js

// 导入使用外部的模块。
// 使用了ES6的对象解构赋值。
const {host,indexBannerUrl,indexListUrl} = require("../../data/urlConfig");

Page({
    /**
     * 页面的初始数据
     */
    data: {
        // 首页轮播数据。
        bannerArr: [],
        // 轮播页码数据
        swiperIndex: 1,
        // 首页列表数组
        listArr: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    // 请求首页轮播数据。
    requestBannerData() {
        // 显示loading
        wx.showLoading({
            title: '数据加载中...',
        })
        const url =host + indexBannerUrl;
        // const url = "http://127.0.0.1:3002/api/banner"
        wx.request({
            url,
            success: res => {
                this.resolveBannerData(res);
            },
            // 请求结束的回调。
            complete: () => {
                wx.hideLoading();
                wx.showToast({
                    title: '数据加载完毕',
                    icon: "success"
                });
            }
        });
    },
    // requestBannerData() {
    //     var that = this;
    //     const url = "http://127.0.0.1:3002/api/banner"
    //     wx.request({
    //         url,
    //         success: function (res) {
    //             that.resolveBannerData(res);
    //         }
    //     });
    // },
    resolveBannerData(res) {
        if (res.statusCode === 200) {
            var bannerArr = res.data.data;
            console.log("首页轮播数据", bannerArr);
            // 将返回的数据赋值给本地的数据，并同步刷新到页面。
            this.setData({
                bannerArr
            });
        }
    },

    // 轮播图切换轮播页的回调函数。
    swiperChange(e) {
        // console.log(e.detail.current);
        this.setData({
            swiperIndex: e.detail.current + 1
        });
    },

    // 获取首页列表数据
    requestIndexList() {
        // 显示加载中
        wx.showLoading({
            title: '数据加载中...',
        })
        const url =host + indexListUrl;
        // const url = "http://127.0.0.1:3002/api/indexlist";
        wx.request({
            url,
            success: res => {
                this.resolveIndexList(res);
            },
            // 请求结束的回调。
            complete: () => {
                wx.hideLoading();
                wx.showToast({
                    title: '数据加载完毕',
                    icon: "success"
                });
            }
        });
    },
    // 处理首页列表数据
    resolveIndexList(res) {
        if (res.statusCode === 200) {
            var listArr = res.data.data;
            console.log("首页列表数据", listArr);
            this.setData({
                listArr
            });
        }
    },

    // 定义点击item的事件的回调函数
    navigateToDetail(e) {
        // console.log(e);
        // 获取点击的item的保存的 id
        var id = e.currentTarget.dataset.id;
        // 页面跳转。
        wx.navigateTo({
            url: '../itemDetail/itemDetail?id=' + id,
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.requestBannerData();
        this.requestIndexList();
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