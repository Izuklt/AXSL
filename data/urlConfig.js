// url 模块。 
const url = {
    host:"http://127.0.0.1:3002",//主机地址
    indexBannerUrl:"/api/banner",//首页轮播
    indexListUrl:"/api/indexlist",//首页列表
    itemDetailUrl:"/api/indexlist/detail",//首页列表项详情
    foodListUrl: "/api/foods/list", //食疗坊列表
    foodListDetailUrl: "/api/foods/list/detail", //食疗坊食品详情
    foodTypeListUrl: "/api/foods/list/type", //食疗坊的分类列表
    foodSearchListUrl: "/api/foods/select", //食疗坊搜索的列表
    locationUrl: "/api/lbs/location", //获取地理信息
    hotCityUrl:"/api/hot/city",//获取热门城市列表，
    cartListUrl:"/api/cart/list",//获取购物车列表"
    cartUpdateUrl:"/api/cart/update",//修改购物车的数量
    deleteFoodUrl:"/api/cart/delete",//删除购物车的商品
    addCartUrl:"/api/cart/add",//添加购物车
};

module.exports = url;