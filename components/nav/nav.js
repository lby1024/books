// components/nav/nav.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: String,              // 专辑标题
        lastest: Number,            // 最新专辑号
        index: Number               // 当前专辑号
    },

    /**
     * 组件的初始数据
     */
    data: {
        first: 1,      // 第一张专辑的编号   
        pre01: './images/triangle.dis@left.png',
        pre02: './images/triangle@left.png',
        next01: './images/triangle.dis@right.png',
        next02: './images/triangle@right.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        pre () {
            let {index} = this.properties
            let {first} = this.data
            if (index===first) return       // 如果已经是第一张专辑了,
            console.log('上一张专辑')
            this.triggerEvent("pre")
        },
        next () {
            let {index, lastest} = this.properties
            if (index===lastest) return
            console.log('下一张专辑')
            this.triggerEvent("next")
        }
    }
})
