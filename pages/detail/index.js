import {get_detail, get_tags, get_book_favor, like, cancel, add_tag} from '../../utils/https'
import utils from '../../utils/util'

// pages/detail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        data: Object,
        pic: String,        // 图片
        title: String,      // 书名
        author: String,     // 作者
        comments: Object,   // 评论[tags]
        publisher: String,  // 出版社
        pubdate: String,    // 出版日期
        pages: Number,      // 页数
        price: String,      // 价格
        binding: String,    // 装针
        id: Number,         // 书本id
        like: Boolean,      // 是否被收藏
        like_nums: Number,  // 收藏数量
        input_show: false,  // 是否弹出输入框
        summary: String     // 简介
    },
    // 点赞 or 取消点赞
    like_cancel (event) {
        let behaviour = event.detail.behaviour      // behavior==="like"进行点赞操作---否则---> 执行取消点赞
        let target = {                              // 需要点赞的对象
            art_id: this.data.id,
            type: 400
        }
        if (behaviour==="like") like(target).then(res=>console.log(res))      // 调用点赞接口
        else cancel(target).then(res=>console.log(res))                       // 调用取消点赞接口
    },
    // 弹出input框
    show_input () {
        this.setData({
            input_show: true,
        })
    },
    // 隐藏input框
    hidden_input (e) {
        this.setData({
            input_show: false,
        })
    },
    // 阻止冒泡
    stop () {
        console.log("阻止冒泡")
    },
    // 提交评论(添加tag)
    onPost (e) {
        let value = e.detail.value||e.detail.text       // 1 : 获取value
        let item = {content: value, nums: 1}            // 2 : 更新本地数据
        let comments = [item, ...this.data.comments]
        this.setData({comments, input_show: false})
        add_tag(this.data.id, value)                    // 3 : 更新服务器数据
        .then(res=>console.log(res))
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = options.id

        // 获取详情页的基本数据
        get_detail(id).then(res=>{
            let summary = utils.text_filter(res.summary)    // 处理文字, 换行符号(\n), 空格符号(&nbsp;)
            this.setData({
                data: res,
                publisher: res.publisher,
                pubdate: res.pubdate,
                pages: res.pages,
                price: res.price,
                pic: res.image,
                title: res.title,
                binding: res.binding,
                author: res.author[0],
                id,
                summary
            })
        })
        // 获取详情页的tags
        get_tags(id).then(res=>{
            this.setData({ comments: res.comments })
        })
        // 获取书籍点赞情况
        get_book_favor(id).then(res=>{
            this.setData({
                like: res.like_status,
                like_nums: res.fav_nums
            })
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