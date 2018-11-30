const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

// 处理文本 " ... \n ... " ------>> " ... \n&bnsp;&bnsp;&bnsp; ... "
const text_filter = text => {
    let reg = /\\n/g
    return text.replace(reg, item=>{
        return '\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
    })
}

module.exports = { formatTime, text_filter }
