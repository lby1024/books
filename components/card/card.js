// components/card/card.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        pic: String,
        title: String,
        author: String,
        like: Number,
        bookId: Number
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
        // 跳转到详情页面
        go2detail () {
            console.log('book_id', this.properties.bookId)
            let bookId = this.properties.bookId
            let url = `../../pages/detail/index?id=${bookId}`
            wx.navigateTo({ url })
        }
    }
})
