import request from '@/utils/request'
export function saleoutOrderdetailsexport1(url,data) {
    return request({
        url: url,
        method: 'post',
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        responseType: 'blob'
    })
}
export function prient (url,data,type) {
    saleoutOrderdetailsexport1(url,data).then((response) =>{
        const content = response
        // 主要的是在这里的转换，必须要加上{ type: 'application/pdf' }
        // 要不然无法进行打印
        let types = 'application/pdf'
        const blob = new Blob([content], { type: types })
        var date = (new Date()).getTime()
        var ifr = document.createElement('iframe')
        ifr.style.frameborder = 'no'
        ifr.style.display = 'none'
        ifr.style.pageBreakBefore = 'always'
        ifr.setAttribute('id', 'printPdf' + date)
        ifr.setAttribute('name', 'printPdf' + date)
        ifr.src = window.URL.createObjectURL(blob)
        document.body.appendChild(ifr)
        console.log(ifr)
        doPrint('printPdf' + date)
        window.URL.revokeObjectURL(ifr.src) // 释放URL 对象
    
    })
}

  // 打印
export function doPrint(val) {
    var ordonnance = document.getElementById(val).contentWindow
    console.log(ordonnance)
    setTimeout(() => {
        // window.print()
        ordonnance.print()
        // this.pdfLoading = false
    }, 100)
}