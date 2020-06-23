// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      value:[],
      observer(newval){
        
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabBtnFn(e){
      let id = e.currentTarget.dataset.id
      let show = e.currentTarget.dataset.show
      this.triggerEvent('isShowBtn',{id,show},{})
    }
  }
})
