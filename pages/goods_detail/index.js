// pages/goods_detail/index.js
const { request } = require("../../request/index.js")

import regeneratorRuntime from "../../lib/runtime/runtime.js";
let flag;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
    swiperList: [],//轮播图数组
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    collectFlag: false//收藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getDetailList(47868)
    // this.getDetailList(options.id)
  },
  // 获取详情页接口
  async getDetailList(id) {
    let goods_id = {
      goods_id: id
    }

    let res = await request({ url: 'public/v1/goods/detail', data: goods_id })
    let { message, meta } = res
    if (meta.status === 200) {
      // 获取有没有收藏的缓存数据
      let collect = wx.getStorageSync('collect').data || []
      console.log(collect, 'collect')
      // 如果有缓存过的商品，就设置高亮颜色
      let trueFlag = collect.some(item => {
        return item.goods_id === message.goods_id
      })
      console.log(trueFlag, 'trueFlag')
      this.setData({
        detailObj: message,
        swiperList: message.pics,
        collectFlag: trueFlag
      })
    }


  },

  // 预览图片
  clickSwiperFn(e) {
    flag = true
    if (flag) {
      this.setData({
        autoplay: false
      })
    }
    const urls = this.data.swiperList.map(item => {
      return item.pics_mid_url
    })
    let current = e.currentTarget.dataset.url
    wx.previewImage({
      // current: 'String', // 当前显示图片的链接，不填则默认为 urls 的第一张
      current,
      urls

    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    if (flag) {
      flag = false
      if (!flag) {
        this.setData({
          autoplay: true
        })
      }
      return
    }

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    flag = undefined
  },
  // 点击收藏
  collectFn() {
    // 去获取有没有收藏过 
    let collect = wx.getStorageSync('collect').data || []
    console.log(collect, 'collect点击获取的')
    let goodId = this.data.detailObj
    // 判断选中的该商品有没有被收藏过
    const index = collect.findIndex(item => {
      return item.goods_id === goodId.goods_id
    })
    console.log(index, 'index')
    // 如果不等于 -1 说明收藏过，再点击就是取消收藏
    if (index !== -1) {
      // 取消的操作
      wx.showToast({ title: '取消收藏' })
      // 同时切割数组
      collect.splice(index, 1)
      // 高亮图标
      this.setData({
        collectFlag: false
      })
    } else {
      // 反之就是要收藏，加入数组
      wx.showToast({ title: '收藏成功' })
      // 高亮图标
      this.setData({
        collectFlag: true
      })
      // 存入数组
      collect.push(goodId)
      console.log(collect, '222collect')

    }
    // 存入本地缓存
    wx.setStorageSync('collect', { data: collect })

  },
  // 加入购物车
  handleCartAdd() {
    // 1 获取本地是否有购物车缓存数据
    let cart = wx.getStorageSync('Cart') || []
    let goods = this.data.detailObj
    // 2 取到数据以后需要遍历比较两个数据的id是否相等
    let index = cart.findIndex(item => {
      return item.goods_id === goods.goods_id
    })
    console.log(index,'index')
    // 3 如果=== -1 说明第一次添加，push数组即可
    if(index === -1){
      // 第一次添加
      let str = 'detailObj.num'
      let checked = 'detailObj.checked'
      this.setData({
        [str]:1,
        [checked]:true,
      })
      // let str = `detailObj`;
      // this.setData({
      //   'str.num':1,
      //   'str.checked':true
      // })
      console.log(this.data.detailObj,'this.data.detailObj')
      cart.push(goods)
    }else{
       // 4 说明之前已经添加过，需要给这个商品添加数量即可
       cart[index].num++

       console.log(cart[index].num,'cart[index].num++')
    }
    console.log(cart,'cart')
    
    // 5 设置缓存数据
  }

})