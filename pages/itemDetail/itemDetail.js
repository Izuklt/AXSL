// pages/itemDetail/itemDetail.js
const {host,itemDetailUrl} = require("../../data/urlConfig");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detailObj:{}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("detail--",options);
        var id = options.id;
        // 请求详情信息。
        this.requestDetail(id);
    },

    // 请求详情信息
    requestDetail(id){
        const url = host + itemDetailUrl;
        // var url = "http://127.0.0.1:3002/api/indexlist/detail";
        wx.request({
          url: url,
          data:{
              id
          },
          success:(res)=>{
            this.resolveDetail(res);
          }
        })
    },

    resolveDetail(res){
        console.log(res);
        if(res.statusCode === 200){
            console.log(res.data[0]);
           
            this.setData({
                detailObj:res.data[0]
            });
             // 动态设置当前页面的标题。
            wx.setNavigationBarTitle({
                title: this.data.detailObj.title
              })
        }
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