// components/like/like.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        like: Boolean,
        number: Number,
        iid: Number,
        type: Number
    },

    /**
     * 组件的初始数据
     */
    data: {
        pic01: './images/like.png',
        pic02: './images/like@dis.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 收藏 or 取消收藏
        click () {
            // 修改本地数据
            let like = !this.properties.like
            let number = like?this.properties.number+1: this.properties.number-1
            this.setData({like, number})
            // 修改服务端数据
            let {iid, type} = this.properties
            let behaviour = like?'like':'cancel'    // 获取服务端的状态 --->> like(点赞), cancel(未点赞)
            this.triggerEvent("like", {behaviour, iid, type}, {})
        }
    }
})
