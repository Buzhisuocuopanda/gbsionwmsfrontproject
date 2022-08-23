import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/ruoyi";
// 商品分类新增
export function ClassifyAdd(data) {
  return request({
    url: '/system/classify/SwJsGoodsClassifyadd',
    method: 'post',
    data: data
  })
}

// 商品分类查询列表
// export function ClassifyList(query) {
//   return request({
//     url: '/system/classify/SwJsGoodsClassifylist',
//     method: 'get',
//     params: query
//   })
// }

// 商品分类修改
export function ClassifyEdit(data) {
  return request({
    url: '/system/classify/SwJsGoodsClassifyedit',
    method: 'post',
    data: data
  })
}

// 商品分类删除
export function ClassifyRemove(data) {
  return request({
    url: '/system/classify/SwJsGoodsClassifyremove',
    method: 'post',
    data:data
  })
}

// 商品分类下拉树结构
export function ClassifyTreeselect() {
  return request({
    url: '/system/classify/SwJsGoodsClassifytreeselect',
    method: 'get'
  })
}

// 商品分类信息导入
export function ClassifyImport(data) {
  return request({
    url: '/system/classify/importSwJsGoodsClassify',
    method: 'post',
    data:data
  })
}
