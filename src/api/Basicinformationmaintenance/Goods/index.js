import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/ruoyi";
// 新增配置
export function GoodsAdd(data) {
  return request({
    url: '/system/goods/SwJsGoodsadd',
    method: 'post',
    data: data
  })
}


// 新增商品信息维护关联表
export function GoodsAddss(data) {
  return request({
    url: '/system/goods/SwJsGoodsadds',
    method: 'post',
    data: data
  })
}

// 查询用户列表
export function GoodsList(query) {
  return request({
    url: '/system/goods/SwJsGoodslist',
    method: 'get',
    params: query
  })
}


// 修改用户
export function GoodsEdit(data) {
  return request({
    url: '/system/goods/SwJsGoodsedit',
    method: 'post',
    data: data
  })
}

// 删除用户
export function GoodsRemove(data) {
  return request({
    url: '/system/goods/SwJsGoodsremove',
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

