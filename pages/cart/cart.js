// pages/cart/cart.js

const {
    host,
    cartListUrl,
    cartUpdateUrl,
    deleteFoodUrl
} = require("../../data/urlConfig");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartListArr: [],
        // 全选按钮
        checkedAll: false,
        // 总价
        totalPrice:0
    },

    showTotalPrice(){
        var totalPrice = 0;
        for(var i=0;i<this.data.cartListArr.length;i++){
            var item = this.data.cartListArr[i];
            if(item.checked){
                var price = item.price;
                // 处理价格。
                if(price.includes("-")){
                    price = price.slice(0,price.indexOf("-"));
                }
                var num = item.num;
                totalPrice += price * num;
            }
        }

        // 保留两位小数
        if(totalPrice > 0){
            totalPrice = (totalPrice).toFixed(2);
        }
       
        console.log(totalPrice);
        this.setData({
            totalPrice
        });
    },

    // 全选按钮的事件处理。
    selectedAll() {
        // 
        this.setData({
            checkedAll: !this.data.checkedAll
        });
        // 和上面的所有的item 关联操作。
        this.setItemSelected(this.data.cartListArr, this.data.checkedAll);

        // 统计总价
        this.showTotalPrice();
    },

    // 选中或者取消选中某一个item。
    selectItem(e) {
        var index = e.currentTarget.dataset.index;
        console.log(index);
        var item = this.data.cartListArr[index];
        // 把当前点击的 item 的checked 属性取反。
        item.checked = !item.checked;
        //    同步视图层。
        this.setData({
            cartListArr: this.data.cartListArr
        });

        // 如果某一个item被取消选中。那么全选按钮不选中。
        if (!item.checked) {
            this.setData({
                checkedAll: false
            });
        } else {
            // 某一个item 被选中了。判断是否所有的都被选中了，如果都被选中，全选选中。
            if (this.isAllSelected()) {
                this.setData({
                    checkedAll: true
                });
            }
        }

         // 统计总价
         this.showTotalPrice();
    },

    // 判断所有的item 是否都被选中了。
    isAllSelected() {
        for (var i = 0; i < this.data.cartListArr.length; i++) {
            if (!this.data.cartListArr[i].checked)
                return false;
        }
        return true;
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
        this.requestCartList();
    },

    // 请求购物车的数据。
    requestCartList() {
        wx.request({
            url: host + cartListUrl,
            success: res => {
                this.resolveCartList(res);
            }
        })
    },
    // 处理购物车的数据
    resolveCartList(res) {
        console.log(res);
        // 给数组中的每个对象添加一个是否被选中的属性。
        var items = res.data.data.result;
        // 初始化所有的item 都补选中。
        this.setItemSelected(items, false);
    },

    // 设置所有的item 是否被选中。
    setItemSelected(items, checked) {
        for (var i = 0; i < items.length; i++) {
            items[i].checked = checked;
        }
        this.setData({
            cartListArr: items
        });
    },

    // 更新购物车商品的数据，删除商品
    cartAdd(e) {
        // 获取当前item的数量，通过下标来获取修改的item的num。
        var index = e.currentTarget.dataset.index;
        var num = this.data.cartListArr[index].num;
        var id = this.data.cartListArr[index].id;
        console.log(num, id);
        // 自增1
        num++;
        // 同步数据库
        wx.request({
            url: host + cartUpdateUrl,
            data: {
                id,
                num
            },
            success: res => {
                // 同步页面
                this.data.cartListArr[index].num = num;
                this.setData({
                    cartListArr: this.data.cartListArr
                });
                wx.showToast({
                    title: '更新成功',
                    duration: 500
                });

                this.showTotalPrice();
            }
        });
    },
    cartMinus() {
        // 购买数量最下是1。
    },
    cartDelete(e) {
        var index = e.currentTarget.dataset.index;
        // 二次确认
        wx.showModal({
            title: '是否确定删除？',
            success :res=> {
              if (res.confirm) {
                this.confirmDelete(index);
              } 
            }
          });
    },

    confirmDelete(index){
        // 通过id删除。
        // 获取删除的item 的id。
      
        var id = this.data.cartListArr[index].id;
        // 发送请求删除。
        wx.request({
            url: host + deleteFoodUrl,
            data: {
                id
            },
            success: res => {
                this.data.cartListArr.splice(index,1);
                this.setData({
                    cartListArr: this.data.cartListArr
                });
                wx.showToast({
                    title: '删除成功',
                    duration: 500
                });
               this.showTotalPrice();
            }
        })
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