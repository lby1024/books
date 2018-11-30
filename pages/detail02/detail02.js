import {classic_detail, like, cancel} from '../../utils/https'

// pages/detail02/detail02.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index: 0,       // 专辑编号
        like: Boolean,  // 是否已经收藏
        fav: Number,    // 专辑被收藏的数量
        id: Number,     // 专辑的id
        type: Number,   // 专辑的种类
        image: String,  // 专辑图片
        content: String,// 专辑内容
    },
    // 收藏 or 取消收藏
    like_cancel (e) {
        console.log(e.detail)
        let {behaviour} = e.detail
        let {id, type} = this.data
        let target = {                              // 需要点赞的对象
            art_id: id,
            type: type
        }
        if (behaviour=="like") like(target).then(res=>console.log(res))
        if (behaviour=="cancel") cancel(target).then(res=>console.log(res))
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        // 获取专辑详情页的数据
        let {id, type} = options
        classic_detail({id, type}).then(res=>{
            console.log(res)
            this.setData({
                index: res.index,
                like: res.like_status,
                fav: res.fav_nums,
                id: res.id,
                type: res.type,
                image: res.image,
                content: res.content
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