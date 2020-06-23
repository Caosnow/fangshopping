// pages/tabBar/category/index.js
const { request } = require("../../../request/index.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categorList: [],//左侧分类数组
    menuRightArr: [],//右侧数组
    selected: 0,//默认被选中的
    scrollTop: 0,
    // 设置缓存
    // :wx.getStorageSync('Case') || []
  },
  arrStory:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置缓存
    /**  wx.setStorageSync('String', Object/String)
     *    注意只能 设置  对象或者  是字符串  
     * 如果是 存数组 ，需要再包一层
     * */ 
   
  const arrStory = wx.getStorageSync('Case')
    // 判断如果没有缓存就去调接
    if(!arrStory){
      this.getCategoryFn()
    }else{
      // 如果有就去 赋值
      let localList = arrStory.data
      this.setData({
        categorList: localList
      })     
      const arr = localList.map((item) => {
        return item.children
      })
      this.setData({
        menuRightArr: arr
      })
    }
    
    
  },
// 获取分类数据
getCategoryFn(){
  request({
    url: 'public/v1/categories',
    method: 'GET'
  })
    .then(res => {
      let { message, meta } = res
      if (meta.status === 200) {
        this.setData({
          categorList: message
        })
        // 设置缓存
        wx.setStorageSync('Case', {data:message})
        
        const arr = message.map((item) => {
          return item.children
        })
        this.setData({
          menuRightArr: arr
        })

      }

    })
},
// 点击左侧分类菜单
menuLeftBtn(e){
  let id = e.currentTarget.dataset.id
  let rightShopping = this.data.categorList[id]
  this.setData({
    selected: id,
    menuRightArr: rightShopping,
    scrollTop: 0
  })
},

upper(e) {
  console.log(e,)
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