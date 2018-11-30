// components/date/date.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        index: {
            type: Number,
            value: 1,
            observer: function(new_data, old_data) {
                if (new_data<10) this.setData({_index: `0${new_data}`})
                else this.setData({_index: new_data})
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        _index: 1,
        year: 2000,
        month: '一月',
        monthes: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月', ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        click () {
            this.setData({test: 'jack'})
        }
    },

    ready () {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth()     // 0, 1, 2, 3, ...
        month = this.data.monthes[month]
        this.setData({year, month})
    }
})
