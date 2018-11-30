import {config} from './config.js'

// 向后台获取数据
function get_data (options) {
    return new Promise((resolve, reject) => {
        // 1 : 准备 参数
        let method = options.method                 // 请求数据的方式
        let url = options.url                       // 接口地址
        let data = options.data||null               // 携带的数据
        let header = {                              // 请求头
            'content-type': 'application/json',
            'appKey': options.app_key
        }
        // 2 : 成功和服务器通信
        let success = res => {
            let code = `${res.statusCode}`                      
            if (res.statusCode===201) resolve(res.data)
            else if (res.statusCode===200) resolve(res.data)
            else alert_err(`从服务器接收到报错${res.statusCode}`)
        }
        // 3 : 和服务器通信失败
        let fail = err => {
            reject(err)
            alert_err('未能从服务器获取到数据--->例如: 断网')
        }
        // 4 : 发送请求
        wx.request({ method, url, data, header, success, fail })
    })
}

// 数据请求失败时的---> 报错弹框
function alert_err (msg) {
    wx.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
    })
}
// 调用接口=========调用接口=========调用接口=========调用接口=========调用接口=========
// 1 : 获取最新一期的数据
export function get_latest_data () {
    let method = 'GET'
    let url = config.base + config.latest
    let app_key = config.app_key
    let data = null
    return get_data({method, url, data, app_key})    
}
// 2.1 : 进行点赞
export function like (params) {
    let method = 'POST'
    let url = config.base + config.like
    let app_key = config.app_key
    let data = {
        art_id: params.art_id,
        type: params.type
    }
    return get_data({method, url, data, app_key})
}
// 2.2 : 取消点赞
export function cancel (params) {
    let method = 'POST'
    let url = config.base + config.cancel
    let app_key = config.app_key
    let data = {
        art_id: params.art_id,
        type: params.type
    }
    return get_data({method, url, data, app_key})
}
// 3.1 : 获取上一张专辑 ---> 参数: index ---> 当前专辑期号
export function get_pre (index) {
    let method = 'GET'
    let url = config.base + `/classic/${index}/previous`
    let app_key = config.app_key
    return get_data({method, url, app_key})
}
// 3.2 : 获取下一张专辑 ---> 参数: index ---> 当前专辑期号
export function get_next (index) {
    let method = 'GET'
    let url = config.base + `/classic/${index}/next`
    let app_key = config.app_key
    return get_data({method, url, app_key})
}
// 4 : 获取专辑点赞数据 
// ---> 参数: id ---> 专辑的id 
// ---> 参数: type ---> 专辑类型
export function get_like_data (id, type) {
    let method = 'GET'
    let url = config.base + `/classic/${type}/${id}/favor`
    let app_key = config.app_key
    return get_data({method, url, app_key})
}
// 5 : 获取热门推荐
export function get_hot () {
    let method = 'GET'
    let url = config.base + config.hot
    let app_key = config.app_key
    return get_data({method, url, app_key})
}
// 6 : 获取书籍详情
export function get_detail (id) {
    let method = 'GET'
    let url = config.base + `/book/${id}/detail`
    let app_key = config.app_key
    return get_data({method, url, app_key})
}
// 7 : 获取详情页___标签
export function get_tags (id) {
    let method = 'GET'
    let url = config.base + `/book/${id}/short_comment`
    let app_key = config.app_key
    return get_data({method, url, app_key})
}
// 8 : 获取书籍点赞数据
export function get_book_favor (id) {
    let method = 'GET'
    let url = config.base + `/book/${id}/favor`
    let app_key = config.app_key
    return get_data({method, url, app_key})
}
// 9 : 添加标签
export function add_tag (book_id, content) {
    let method = 'POST'
    let url = config.base + config.add_tag
    let app_key = config.app_key
    let data = {book_id, content}
    return get_data({method, url, app_key, data})
}
// 10 : 获取热门搜索关键词
export function search_hot () {
    let method = 'GET'
    let url = config.base + '/book/hot_keyword'
    let app_key = config.app_key
    return get_data({method, url, app_key})
}
// 11 : 搜索书籍
export function search_books (start, value) {
    let method = 'GET'
    let url = config.base + '/book/search'
    let data = {
        start,
        count: 20,
        summary: 1,
        q: value
    }
    let app_key = config.app_key
    return get_data({method, url, data, app_key})
}
// 12 : 获取 ---> 我收藏的书籍数量
export function favor_books () {
    let method = "GET"
    let url = config.base + config.fav_books
    let app_key = config.app_key
    return get_data({method, url, app_key})
}
// 13 : 获取收藏的专辑
export function fav_classic () {
    let method = "get"
    let url = config.base + config.fav_classic
    let app_key = config.app_key
    return get_data({method, url, app_key})
}
// 14 : 获取期刊详情
export function classic_detail ({type, id}) {
    let method = "GET"
    let url = config.base + `/classic/${type}/${id}`
    let app_key = config.app_key
    return get_data({method, url, app_key})
}