import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/ruoyi";
// 生产总订单列表
export function totalOrderList(data) {
  return request({
    url: '/sale/totalOrderList',
    method: 'post',
    data: data
  })
}



