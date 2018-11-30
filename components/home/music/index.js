import {home_store} from '../home_store.js'

let player = wx.getBackgroundAudioManager()

Component({
    behaviors:[home_store],
    /**
     * 组件的属性列表
     */
    properties: {
        url: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        cur_song: null,                             // 正在播放的歌曲id
        is_playing: false,                          // 是否正在播放音乐
        pic_play: './images/player@playing.png',
        pic_pause: './images/player@waitting.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        init () {
            // 当前页面的音乐是否是正在播放的音乐
            let a = player.src===this.properties.url
            // 当前音乐是否处于播放状态
            let b = player.paused===false  
            // 如果两个条件都满足 ---> 执行旋转动画
            if (a&&b) this.setData({is_playing: true})
        },
        // 点击播放按钮
        click_play_btn () {
            if (this.data.is_playing) {
                this.setData({is_playing: false})
                player.pause()
            }
            else {
                this.setData({is_playing: true})
                player.src = this.properties.url
            }
        },
        // 监听播放器
        _watch_player () {
            // 当音乐播放时触发
            player.onPlay(() => {
                console.log('player ------> 播放')
                this.setData({is_playing: true})
            })
            // 当音乐暂停时触发
            player.onPause(() => {
                console.log('player ------> pause')
                this.setData({is_playing: false})
            })
            // 当点击 X 时触发
            player.onStop(() => this.setData({is_playing: false}))
            // 当播放结束时触发
            player.onEnded(() => this.setData({is_playing: false}))
        }
    },
    // 钩子函数 ------> 加载到页面
    attached () {
        this._watch_player()
        this.init()
    },
    // 钩子函数 ------> 从页面移除
    detached () {
        console.log("------> detached")
    },
})
