import {
    get_like_data,      // 获取专辑的点赞信息
    get_next,           // 获取下一张专辑数据
    get_pre,            // 获取上一张专辑数据
    get_latest_data,    // 获取最新一张专辑
    like,               // 点赞
    cancel              // 取消点赞
} from '../../utils/https'

// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        lastest_index: 0,       // 最新一期的专辑编号
        url: null,              // mp3链接
        like: 0,                // 是否被我收藏
        fav: 0,                 // 收藏数量
        title: "title...",      // 专辑标题   
        index: 1,               // 专辑编号           
        id: 99,                 // 例如你想对电影进行点赞，那这个参数就是电影的id号
        type: 200,              // 点赞类型分为四种：100 电影 200 音乐 300 句子 400 书籍
        image: null,            // 海报
        content: null           // 文字介绍
    },

    // 点赞 or 取消点赞
    like_cancel (event) {
        let behaviour = event.detail.behaviour      // behavior==="like"进行点赞操作---否则---> 执行取消点赞
        let target = {                              // 需要点赞的对象
            art_id: this.data.id,
            type: this.data.type
        }
        console.log(target)
        if (behaviour==="like") like(target).then(res=>console.log(res))      // 调用点赞接口
        if (behaviour==="cancel") cancel(target).then(res=>console.log(res))  // 调用取消点赞接口
    },
    // 获取上一张专辑数据
    pre () {
        let data = wx.getStorageSync(`home-${this.data.index-1}`)       // 获取本地储存
        if (data) {                                                     // 如果获取到了
            this.setData({...data})
            this.updata_like(data)
            console.log(this.data.url)
        }
        else this.pre_http(this.data.index)                             // 如果没有获取到
    },
    // 获取下一张专辑数据
    next () {
        let data = wx.getStorageSync(`home-${this.data.index+1}`)       // 获取本地出错
        if (data) {
            this.setData({...data})
            this.updata_like(data)
        }
        else this.next_http(this.data.index)
    },
    // 获取点赞信息
    updata_like (data) {
        let {id, type} = data
        get_like_data(id, type).then(res=>{
            let like = res.like_status
            let fav = res.fav_nums
            this.setData({like, fav})
        })
    },
    // 获取下一页
    next_http (index) {
        get_next(index)
        .then(res=>{
            // 修改本地数据
            let like = res.like_status
            let fav = res.fav_nums
            this.setData({ ...res, like, fav })
            // 保存到---> Storage
            let key = `home-${res.index}`
            wx.setStorageSync(key, res)
        })
    },
    // 获取上一页
    pre_http (index) {
        get_pre(index)
        .then(res=>{
            // 修改本地数据
            let like = res.like_status
            let fav = res.fav_nums
            this.setData({ ...res, like, fav })
            // 保存到---> Storage
            let key = `home-${res.index}`
            wx.setStorageSync(key, res)
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取最新一期的数据
        get_latest_data()
        .then(res=>{
            // 修改本地数据
            let lastest_index = res.index
            let like = res.like_status          // 是否被我收藏
            let fav = res.fav_nums              // 收藏数量
            let data = { ...res, lastest_index, like, fav }
            this.setData(data)
            // 保存到---> Storage
            let key = `home-${res.index}`
            wx.setStorageSync(key, data)        // 同步
        })
    }
})