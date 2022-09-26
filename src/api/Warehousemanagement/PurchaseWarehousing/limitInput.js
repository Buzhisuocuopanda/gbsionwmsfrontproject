export default (Vue)=>{
    Vue.directive('limitInput',{
        bind(el, binding, vnode ){
            const dom = el.children[0]
            const { context } = vnode;
            const {formName,formKey} = binding.value;
            let value = ""
            dom.addEventListener('keyup',function(e){
                value =  dom.value  
                                .replace(/[^\d^\.]+/g, "")
                                .replace(/^0+(\d)/, "$1")
                                .replace(/^\./, "0.")
                                .match(/^\d*(\.?\d{0,2})/g)[0] || "";
                context[formName][formKey] = value
            })
            dom.addEventListener("blur",function(e){
            //如果是以小数点结尾，去掉小数点
                let val =  dom.value.endsWith('.') ? dom.value.substr(0,dom.value.length - 1) : dom.value
                //最小0.01，如果是0，则自动补为0.01
                let finalVal = val == 0 ?"0.01":val
                 context[formName][formKey] = finalVal
            })
        }
    })
}