// components/card02/card02.js
Component({
    options: {
        multipleSlots: true // <<========= 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        title: String,      
        pic: String,
        iid: Number,
        type: Number,
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
        go2detail () {
            let {iid, type} = this.properties
            console.log('跳转到详情页面', iid, type)
            let url = `../../pages/detail02/detail02?id=${iid}&type=${type}`
            wx.navigateTo({url})
        }
    }
})
