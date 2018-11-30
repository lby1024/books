import {get_hot, search_hot, search_books} from '../../utils/https.js'
// pages/book/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        books: Object,      // 推荐热门书籍
        history: Object,    // 历史搜索(关键字)
        tags: Object,       // 热门搜索(关键词)
        show: false,        // 是否显示搜索页面
        show_tags: true,    // 显示 -> 热门搜索 & 历史搜索
        input_value: '',    // 搜索框的内容
        start: 0,           // 获取数据的起点
        total: 999,         // 总共有多少数据
        loading01: false,   // 首次请求搜索数据
        loading02: false,   // 上啦加载
        no_more: false,     // 没有更多了
        top: 0,             // 滚动条top值
        search_list: null   // 搜索列表
    },
    // 点击搜索框, 弹出搜索页面
    show_search () {
        console.log('点击搜索框, 弹出搜索页面')
        this.setData({show: true})
    },
    // 点击'取消', 隐藏搜索页面
    hide_search () {
        console.log('隐藏搜索页面')
        this.setData({
            show: false,
            search_list: null,
            show_tags: true
        })
    },  
    // 从服务器获取数据
    get_data () {
        let hot_books = get_hot()       // 热门书籍
        let hot_search = search_hot()   // 热门搜索
        Promise
        .all([hot_books, hot_search])
        .then(res=>{
            console.log(res[0])
            this.setData({
                books: res[0],
                tags: res[1].hot,
            })
        })
    },
    // 从本地获取数据
    get_local () {
        let history = wx.getStorageSync('history')||['python']
        this.setData({ history })
    },
    // 回车 ---> 获取搜索结果
    search (e) {
        console.log('回车, 获取搜索结果---> ', e)
        this.setData({
            input_value: '',
            show_tags: false,
            start: 0,
            no_more: false,
            loading01: true
        })                                                  // 清空搜索框
        let value = e.detail.value||e.detail.text
        if (!value) {                                       // 如果搜索内容为空
            wx.showToast({
                title: '搜索内容不能为空',                           
                icon: 'none',
                duration: 2000                              
            })
            this.setData({
                show_tags: true,
                loading01: false,
            })
            return
        }
        let history = [ value, ...this.data.history ]
        history = [...new Set(history)]                     // 去重
        this.setData({history})                             // 更新历史搜索
        search_books(this.data.start, value).then(res=>{    // 获取搜索结果
            this.setData({ 
                search_list: res.books,
                start: 20,
                input_value: value,
                loading01: false
            })
        })
    },
    // 点击 x , 清空搜索list
    clear () {
        this.setData({ 
            show_tags: true,
            input_value: '',
            search_list: null
        })
    },
    // 上啦加载
    pull_up () {
        let {loading02, history, start, total, search_list} = this.data
        if (loading02) return                                   // @ 1 : 如果正在loading... --> over
        console.log('上啦加载')
        console.log(start, total, start<total)
        if (start>total) {                                      // @ 2 : 如果没有更多数据了 ---> over
            this.setData({no_more: true})
        }
        else {                                                  // ---> : 还可以加载更多
            this.setData({ loading02: true })                   // @ 2.1: 显示动画
            search_books(start, history[0]).then(res=>{         // @ 2.2: 获取数据
                let total = res.total
                let start = res.start
                start += 20
                this.setData({                                  // @ 2.3: 更新数据
                    search_list: [...search_list, ...res.books],
                    start,
                    total,
                    loading02: false
                })
            })
        }                             
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.get_data()
        this.get_local()
    },

    onHide: function () {
        console.log("跳到别的页面 ---> 更新缓存history--->", this.data.history)
        wx.setStorageSync('history', this.data.history)
    },

})