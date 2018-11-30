import {favor_books, fav_classic, like, cancel} from "../../utils/https"

// pages/user/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,            // 是否显示用户头像
        user_pic: null,         // 用户头像
        books_num: 0,           // 我搜集的书籍数量
        classic: null,          // 收藏的专辑
    },
    // 跳转到页面 ---> 关于我们
    go2page () {
        let url = '../../pages/about/about'
        wx.navigateTo({url})
    },
    // 点击按钮获取 ---> user info
    get_user_info01 (data) {
        console.log(data.detail.userInfo)
        let {avatarUrl} = data.detail.userInfo
        this.setData({
            user_pic: avatarUrl,
            show: true
        })
        this.get_all_the_info()
    },
    // 自动获取 ---> user info
    get_user_info02 (_boolean) {
        return new Promise(resolve=>{
            // 如果获取了授权
            if (_boolean) {
                wx.getUserInfo({
                    success (data) {
                        resolve(data)
                    }
                })
            }
            else {
                // 没有获得授权, 无法获取user info
                resolve(false)
            }
        })
    },
    // 判断是否获得授权
    is_authorized () {
        return new Promise(resolve=> {
            wx.getSetting({
                success (data) {
                    // 已获得授权
                    if (data.authSetting['scope.userInfo']) resolve(true)
                    // 未获得授权
                    else resolve(false)
                }
            })
        })
    },

    // 收藏 or 取消收藏
    like_cancel (e) {
        let {behaviour, iid, type} = e.detail
        console.log('收藏 or 取消收藏', behaviour, iid, type)
        let target = {                              // 需要点赞的对象
            art_id: iid,
            type: type
        }
        console.log(target)
        if (behaviour=="like") like(target).then(res=>console.log(res))
        if (behaviour=="cancel") cancel(target).then(res=>console.log(res))
    },
    // 获取用户信息
    get_all_the_info () {
        // 1 : 发送请求, ---> 获取授权信息
        this.is_authorized()
        // 2 : 根据授权信息 ---> 获取用户info
        .then(res=>this.get_user_info02(res))
        // 3 : 设置用户头像
        .then(res=>{
            if (!res) return console.log('没有获得用户授权 ---> 请先授权')
            console.log(res.userInfo.avatarUrl)
            this.setData({
                user_pic: res.userInfo.avatarUrl,
                show: true
            })
            return Promise.all([favor_books(), fav_classic()])
        })
        // 4 : 获取书籍收藏数量
        .then(res => {
            this.setData({
                books_num: res[0].count,
                classic: res[1]
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.get_all_the_info()
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.get_all_the_info()
    },

})