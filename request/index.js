
let ajaxTimr = 0
export const request=(params)=>{
  // 定义公共的url
  // 请求完成时加载中
  wx.showLoading({
    title:'加载中'
  })
  ajaxTimr++
  const baseUrl = "https://api-hmugo-web.itheima.net/api/";
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url:baseUrl+params.url,
      success:(result)=>{
        resolve(result.data)
      },
      fail:(err)=>{
        reject(err)
      },
      complete:()=>{
        ajaxTimr--
        if(ajaxTimr === 0){
          wx.hideLoading()
        }
       
      }
    })
  })
}
