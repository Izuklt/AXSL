const {host, foodListDetailUrl ,addCartUrl} = require("../../data/urlConfig");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 
    foodDetailObj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 接收传入的商品id
    var id = options.id;
    this.requestFoodDetail(id);
  },

  // 请求商品详情信息。
  requestFoodDetail(id){
    wx.request({
      url: host+foodListDetailUrl,
      data:{
        id,
      },
      success:res=>{
        this.resolveFoodDetail(res);
      }
    })
  },

  resolveFoodDetail(res){
    console.log(res);
    this.setData({
      foodDetailObj:res.data.data[0]
    });
  },

  // 加入购物车
  addCart(){
    var name = this.data.foodDetailObj.name;
    var pic = this.data.foodDetailObj.pic;
    var num = 1;
    var info = this.data.foodDetailObj.description;
    var price = this.data.foodDetailObj.price;
    wx.request({
      url: host+addCartUrl,
      data:{
        name,
        pic,
        num,
        info,
        price
      },
      success:res=>{
        wx.showToast({
          title: '添加购物车成功'
        })
      }
    })
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