const { request } = require("../../request/index")

// pages/auth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    indicatorDots: true,
    // vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    circular:true,//是否采用衔接滑动  即  无缝轮播 行为
    indicatorActivecolor:'#eb4450',
    menuList:[],//menu菜单
    listData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getSwiperData()
   this.getMenuData()
   this.getListRequest()
  },
  // 轮播图
  getSwiperData(){
    request({
      url:'public/v1/home/swiperdata',
      method:'GET'
    })
    .then(res=>{
      let {message,meta} = res
      if(meta.status === 200){
        this.setData({
          swiperList:message
        })
      }
      
    })
  },
  // 菜单按钮 menu
  getMenuData(){
    request({
      url:'public/v1/home/catitems',
      method:'GET'
    })
    .then(res=>{
      let {message,meta} = res
      if(meta.status === 200){
        this.setData({
          menuList:message
        })
      }
      
    })
  },
  // 楼梯数据层
  getListRequest(){
    request({
      url:'public/v1/home/floordata',
      method:'GET'
    })
    .then(res=>{
      let {message,meta} = res
      if(meta.status === 200){
        this.setData({
          listData:message
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