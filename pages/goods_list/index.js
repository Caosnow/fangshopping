// pages/goods_list/index.js
const { request } = require("../../request/index.js")

import regeneratorRuntime from "../../lib/runtime/runtime.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params: {
      query:'',
      cid:'',
      pagenum:1,
      pagesize:10
    },
    goodsList:[],
    total:0,//总条数
    totalPage:0,//总页数
    tabs:[
      {
        id:1,
        name:'综合',
        isActived:true
      },
      {
        id:2,
        name:'销量',
        isActived:false
      },
      {
        id:3,
        name:'价格',
        isActived:false
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'params.cid':6
    })
    this.getShoppingList(this.data.params)

  },
  // 获取商品列表
  async getShoppingList(data) {
    const res = await request({ url: 'public/v1/goods/search',data})
    
    let {goods,total} = res.message
    let totalPage = Math.ceil(total/this.data.params.pagesize)
    this.setData({
      totalPage,
      goodsList:[...this.data.goodsList,...goods]
    })

    // 关闭下拉刷新的窗口 如果没有调用下拉刷新的窗口 直接关闭也不会报错
    // 数据请求回来，关闭下拉刷新等待窗口
    wx.stopPullDownRefresh();
  },
  // 接收从子组件传来的值
  isShowBtn(query){
    let {id} = query.detail
    let arr = this.data.tabs
    arr.map((item,i)=>{
      // item.id === id? (item.isActived = true):(item.isActived = false)
      let str = 'tabs['+i+'].isActived'    
      if(item.id === id){   
        this.setData({
          [str]: !item.isActived 
        })
      }else if(item.id !== id){
        this.setData({
          [str]: false 
        })
      }
    })
    // this.setData({
    //       tabs:arr
    //     })
  },
  // 上拉加载页面触底事件
  onReachBottom(){
    
    // 判断如果当前页 >= 总页数，说明没有数据了
    if(this.data.params.pagenum >=this.data.totalPage ){
      wx.showToast({title:'没有更多数据了'})
      return
    }
    let page = this.data.params.pagenum++
    // 如果当前页小于总页数的时候
    this.setData({
      pagenum:page
    })
    this.getShoppingList(this.data.params)
  },
  // 下拉刷新功能
  onPullDownRefresh(){
    // 首先将数组置空，防止 数组缓存
    this.setData({
      goodsList:[],
      'params.pagenum':1
    })
    this.getShoppingList(this.data.params)

  },
  // 跳转到商品详情页
  getDetail(e){
    console.log(e,'e')
    let goodId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../goods_detail/index?id='+goodId
    })
  }


})