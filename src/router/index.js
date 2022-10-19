import Vue from 'vue'
import Router from 'vue-router'
import {
  createRouter,
  createMemoryHistory
} from "vue-router";

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path(.*)',
      component: () => import('@/views/redirect')
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/warehouer',
    component: () => import('@/views/Warehousemanagement/Abpcltj/index'),
    hidden: true
  },
  {
    path: '/chuanzhi',
    component: () => import('@/components/WarehouseInfoSku/index'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [{
      path: 'index',
      component: () => import('@/views/index'),
      name: 'Index',
      meta: {
        title: '首页',
        icon: 'dashboard',
        affix: true
      }
    }]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [{
      path: 'profile',
      component: () => import('@/views/system/user/profile/index'),
      name: 'Profile',
      meta: {
        title: '个人中心',
        icon: 'user'
      }
    }]
  }
]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [{
    path: '/system/user-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [{
      path: 'role/:cbpc01(\\d+)+:status(\\d+)',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/PurchaseWarehousing/PurchaseWarehousingxq/index'),
      meta: {
        title: '采购入库详情',
        activeMenu: '/Warehousemanagement/PurchaseWarehousing'
      }
    }]
  },
  {
    path: '/system/user-authh',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [{
      path: 'role/:cbpg01(\\d+)+:status(\\d+)',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/PurchaseReturn/PurchaseReturnxq/index'),
      meta: {
        title: '采购退货详情',
        activeMenu: '/Warehousemanagement/PurchaseReturn'
      }
    }]
  },
  {
    path: '/system/user-authhh',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [{
      path: 'role/:cbsb01(\\d+)+:status(\\d+)',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/SalesShipment/SalesShipmentxq/index'),
      meta: {
        title: '销售出库详情',
        activeMenu: '/Warehousemanagement/SalesShipment'
      }
    }]
  },
  {
    path: '/system/user-authhhh',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [{
      path: 'role/:cbpc01(\\d+)+:status(\\d+)+:checkStatus(\\d+)+:edit(\\d)',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/Saleslading/Salesladingxq/index'),
      meta: {
        title: '销售提货详情',
        activeMenu: '/Warehousemanagement/Saleslading'
      }
    }]
  },
  {
    path: '/system/user-authhhhxg',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [{
      path: 'role/:cbpc01(\\d+)',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/Saleslading/Saleskadingxg/index'),
      meta: {
        title: '销售提货修改',
        activeMenu: '/Warehousemanagement/Saleslading'
      }
    }]
  },
  {
    path: '/system/user-authhhhh',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [{
      path: 'role/:cbpg01(\\d+):status(\\d+)',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/SalesStock/SalesStockxq/index'),
      meta: {
        title: '销售退库单详情',
        activeMenu: '/Warehousemanagement/SalesStock'
      }
    }]
  },
  {
    path: '/system/user-authhhhhs',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [{
      path: 'role/:cbse01(\\d+)',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/SalesStock/SalesStockxg/index'),

      meta: {
        title: '销售退库单修改',
        activeMenu: '/Warehousemanagement/SalesStock'
      }
    }]
  },
  {
    path: '/system/user-authhhhhh',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [{
      path: 'role/:cbqa01(\\d+)',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/AnalysisCertificate/AnalysisCertificatexq/index'),
      meta: {
        title: '质检单详情',
        activeMenu: '/Warehousemanagement/AnalysisCertificate'
      }
    }]
  },
  {
    path: '/system/user-authhhhhhh',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [{
      path: 'role/:cbie01(\\d+)',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/BarcodeInventorydetails/BarcodeInventorydetailsxq/index'),
      meta: {
        title: '库存初始化详情',
        activeMenu: '/Warehousemanagement/BarcodeInventorydetails'
      }
    }]
  },
  {
    path: '/system/user-authhhhhhhh',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [{
      path: 'role/:cbie01(\\d+)+:status(\\d+)',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/BarcodesSummary/BarcodesSummaryxq/index'),
      meta: {
        title: '库存初始化详情',
        activeMenu: '/Warehousemanagement/BarcodesSummary'
      }
    }]
  },
  {
    path: '/system/user-authhhhhhhhh',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [{
      path: 'role/:cbpg01(\\d+)',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/WarehouseInventory/WarehouseInventoryxq/index'),
      meta: {
        title: '仓库盘点详情',
        activeMenu: '/Warehousemanagement/WarehouseInventory'
      }
    }]
  },
  //仓库盘点明细返回
  {
    path: '/system/user-cangkupandian',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/WarehouseInventory/index'),
      meta: {
        title: '仓库盘点明细表',
        activeMenu: '/Warehousemanagement/WarehouseInventory'
      }
    }]
  },
  {
    path: '/system/user-authhhhhhhhhh',
    component: Layout,
    permissions: ['system:user:edit'],
    children: [{
      path: 'role/:userId',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/WarehouseSummary/WarehouseSummaryxq/index'),
      meta: {
        title: '仓库盘点详情',
        activeMenu: '/Warehousemanagement/WarehouseSummary'
      }
    }]
  },

  {
    path: '/system/user-authhhhhhhhhhh',
    component: Layout,
    permissions: ['system:user:edit'],
    children: [{
      path: 'role/:cbaa01(\\d+):status(\\d+)',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/WarehouseTransfer/WarehouseTransferxq/index'),
      meta: {
        title: '仓库调拨单详情',
        activeMenu: '/Warehousemanagement/WarehouseTransfer'
      }
    }]
  },

  {
    path: '/system/user-authxiaoshouyudingdang',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [{
      path: 'role/:id(\\d+)+:status(\\d+)',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/SalesBooking/SalesBookingxq/index'),
      meta: {
        title: '销售预订单详情',
        activeMenu: '/Warehousemanagement/SalesBooking'
      }
    }]
  },
  //入库单添加
  {
    path: '/system/user-cj',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/PurchaseWarehousing/PurchaseWarehousingcj/index'),
      meta: {
        title: '采购入库创建',
        activeMenu: '/Warehousemanagement/PurchaseWarehousing'
      }
    }]
  },
  //采购入库单返回
  {
    path: '/system/user-fanhui',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/PurchaseWarehousing/index'),
      meta: {
        title: '采购入库单',
        activeMenu: '/Warehousemanagement/PurchaseWarehousing'
      }
    }]
  },
  //退货单添加
  {
    path: '/system/user-th',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/PurchaseReturn/PurchaseReturncj/index'),
      meta: {
        title: '采购退库创建',
        activeMenu: '/Warehousemanagement/PurchaseReturn'
      }
    }]
  },
  //采购退货单返回
  {
    path: '/system/user-fanhuituiku',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/PurchaseReturn/index'),
      meta: {
        title: '采购退库单',
        activeMenu: '/Warehousemanagement/PurchaseReturn'
      }
    }]
  },
  //质检单添加
  {
    path: '/system/user-zjd',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/AnalysisCertificate/AnalysisCertificatecj/index'),
      meta: {
        title: '质检单创建',
        activeMenu: '/Warehousemanagement/AnalysisCertificate'
      }
    }]
  },
  //库存明细初始化添加
  {
    path: '/system/user-kcmx',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/BarcodeInventorydetails/BarcodeInventorydetailscj/index'),
      meta: {
        title: '库存明细创建',
        activeMenu: '/Warehousemanagement/BarcodeInventorydetails'
      }
    }]
  },
  //库存明细初始化
  {
    path: '/system/user-kcmxfh',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/BarcodeInventorydetails/index'),
      meta: {
        title: '库存明细初始化',
        activeMenu: '/Warehousemanagement/BarcodeInventorydetails'
      }
    }]
  },
  //库存汇总初始化添加
  {
    path: '/system/user-kchz',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/BarcodesSummary/BarcodesSummarycj/index'),
      meta: {
        title: '库存汇总创建',
        activeMenu: '/Warehousemanagement/BarcodesSummary'
      }
    }]
  },
  //销售出货添加
  {
    path: '/system/user-xsch',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/SalesShipment/SalesShipmentcj/index'),
      meta: {
        title: '销售出货创建',
        activeMenu: '/Warehousemanagement/SalesShipment'
      }
    }]
  },
  //销售提货添加
  {
    path: '/system/user-xsth',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/Saleslading/Salesladingcj/index'),
      meta: {
        title: '销售提货创建',
        activeMenu: '/Warehousemanagement/Saleslading'
      }
    }]
  },
  //销售提货添加
  {
    path: '/system/user-xstk',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/SalesStock/SalesStockcj/index'),
      meta: {
        title: '销售退库创建',
        activeMenu: '/Warehousemanagement/SalesStock'
      }
    }]
  },
  //仓库盘点明细表添加
  {
    path: '/system/user-pdmx',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/WarehouseInventory/WarehouseInventorycj/index'),
      meta: {
        title: '盘点明细创建',
        activeMenu: '/Warehousemanagement/WarehouseInventory'
      }
    }]
  },
  //仓库盘点汇总表添加
  {
    path: '/system/user-pdhz',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/WarehouseSummary/WarehouseSummarycj/index'),
      meta: {
        title: '盘点汇总创建',
        activeMenu: '/Warehousemanagement/WarehouseSummary'
      }
    }]
  },
  //采购订单添加
  {
    path: '/system/user-cgddtj',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/PurchaseOrder/PurchaseOrdercj/index'),
      meta: {
        title: '配件入库创建',
        activeMenu: '/Warehousemanagement/PurchaseOrder'
      }
    }]
  },
  //采购订单详情
  {
    path: '/system/user-cgddxq',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/:id(\\d+)',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/PurchaseOrder/PurchaseOrderxq/index'),
      meta: {
        title: '配件入库单',
        activeMenu: '/Warehousemanagement/PurchaseOrder'
      }
    }]
  },
  //采购订单返回
  {
    path: '/system/user-caigoudingdan',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/PurchaseOrder/index'),
      meta: {
        title: '采购订单',
        activeMenu: '/Warehousemanagement/PurchaseOrder'
      }
    }]
  },
  //销售预订单添加
  {
    path: '/system/user-cjxsydd',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/SalesBooking/SalesBookingcj/index'),
      meta: {
        title: '销售预订单创建',
        activeMenu: '/Warehousemanagement/SalesBooking'
      }
    }]
  },
  //销售预订单变更单添加
  {
    path: '/system/user-SalesAdvance',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/SalesAdvance/SalesAdvancecj/index'),
      meta: {
        title: '销售预订单变更单创建',
        activeMenu: '/Warehousemanagement/SalesAdvance'
      }
    }]
  },
  //销售预订单变更单返回
  {
    path: '/system/user-SalesAdvancefanhui',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/SalesAdvance/index'),
      meta: {
        title: '销售预订单变更单',
        activeMenu: '/Warehousemanagement/SalesAdvance'
      }
    }]
  },
  //销售预订单变更单修改
  {
    path: '/system/user-SalesAdvancexiugai',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/:id(\\d+)',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/SalesAdvance/SalesAdvancexg/index'),
      meta: {
        title: '销售预订单变更单修改',
        activeMenu: '/Warehousemanagement/SalesAdvance'
      }
    }]
  },

  //销售预订单入库单修改
  {
    path: '/system/user-SalesReceiptxiugai',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/:id(\\d+)',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/SalesReceipt/SalesReceiptxg/index'),
      meta: {
        title: '销售预订单入库单修改',
        activeMenu: '/Warehousemanagement/SalesReceipt'
      }
    }]
  },
  //销售预订单入库单详情
  {
    path: '/Warehousemanagement/SalesReceipt',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'detail',
      name: 'detail',
      component: () => import('@/views/Warehousemanagement/SalesReceipt/SalesReceiptxq/index'),
      meta: {
        title: '销售预订单入库单详情',
        activeMenu: '/Warehousemanagement/SalesReceipt'
      }
    }]
  },
  //销售预订单变更单详情
  {
    path: '/system/user-SalesAdvancexiangqong',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/:id(\\d+)',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/SalesAdvance/SalesAdvancexq/index'),
      meta: {
        title: '销售预订单变更单详情',
        activeMenu: '/Warehousemanagement/SalesAdvance'
      }
    }]
  },

  //销售上架单添加
  {
    path: '/system/user-xssjdan',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/SalesOnshelves/SalesOnshelvescj/index'),
      meta: {
        title: '销售上架单创建',
        activeMenu: '/Warehousemanagement/SalesOnshelves'
      }
    }]
  },
  //仓库调拨单添加
  {
    path: '/system/user-ckdb',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/WarehouseTransfer/WarehouseTransfercj/index'),
      meta: {
        title: '仓库调拨创建',
        activeMenu: '/Warehousemanagement/WarehouseTransfer'
      }
    }]
  },
  //仓库调拨单返回
  {
    path: '/system/cangkudiaobudanfh',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/WarehouseTransfer/index'),
      meta: {
        title: '仓库调拨单',
        activeMenu: '/Warehousemanagement/WarehouseTransfer'
      }
    }]
  },
  //采购入库单返回
  {
    path: '/system/user-ckrkfh',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/PurchaseWarehousing/index'),
      meta: {
        title: '采购入库单',
        activeMenu: '/Warehousemanagement/PurchaseWarehousing'
      }
    }]
  },
  // 采购入库单修改
  {
    path: '/system/user-ckrkxg',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/:id(\\d+)',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/PurchaseWarehousing/PurchaseWarehousingxg/index'),
      meta: {
        title: '采购入库单修改',
        activeMenu: '/Warehousemanagement/PurchaseWarehousing'
      }
    }]
  },
  //采购退库单返回
  {
    path: '/system/user-cktkfh',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/PurchaseReturn/index'),
      meta: {
        title: '采购退库单',
        activeMenu: '/Warehousemanagement/PurchaseReturn'
      }
    }]
  },
  // 采购退库单修改
  {
    path: '/system/user-cktkxg',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/:id(\\d+)',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/PurchaseReturn/PurchaseReturnxg/index'),
      meta: {
        title: '采购退库单修改',
        activeMenu: '/Warehousemanagement/PurchaseReturn'
      }
    }]
  },
  //销售出库单返回
  {
    path: '/system/user-xsckfh',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/SalesShipment/index'),
      meta: {
        title: '销售出库单',
        activeMenu: '/Warehousemanagement/SalesShipment'
      }
    }]
  },


  //销售出库单修改
  {
    path: '/system/user-xiugaichukuxiugai',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/:id(\\d+)',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/SalesShipment/SalesShipmentxg/index'),
      meta: {
        title: '销售出库单修改',
        activeMenu: '/Warehousemanagement/SalesShipment'
      }
    }]
  },
  //质检单返回
  {
    path: '/system/user-zjdfh',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/AnalysisCertificate/index'),
      meta: {
        title: '质检单',
        activeMenu: '/Warehousemanagement/AnalysisCertificate'
      }
    }]
  },
  //仓库盘点明细表返回
  {
    path: '/system/user-ckpdmxbfh',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/WarehouseInventory/index'),
      meta: {
        title: '仓库盘点明细表',
        activeMenu: '/Warehousemanagement/WarehouseInventory'
      }
    }]
  },
  //仓库盘点汇总表返回
  {
    path: '/system/user-ckpdhzfh',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/WarehouseSummary/index'),
      meta: {
        title: '仓库盘点汇总表',
        activeMenu: '/Warehousemanagement/WarehouseSummary'
      }
    }]
  },
  //仓库调拨单返回
  {
    path: '/system/user-ckdbdfh',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/WarehouseTransfer/index'),
      meta: {
        title: '仓库调拨单',
        activeMenu: '/Warehousemanagement/WarehouseTransfer'
      }
    }]
  },
  //销售退库单返回
  {
    path: '/Warehousemanagement/SalesStock',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: '',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/SalesStock/index'),
      meta: {
        title: '销售退库单',
        activeMenu: '/Warehousemanagement/SalesStock'
      }
    }]
  },
  //仓库调拨单修改
  {
    path: '/system/user-cangkudiaobodan',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/:id(\\d+)',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/WarehouseTransfer/WarehouseTransferxg/index'),
      meta: {
        title: '仓库调拨单修改',
        activeMenu: '/Warehousemanagement/WarehouseTransfer'
      }
    }]
  },

  //销售预订单修改
  {
    path: '/system/user-cangkudiaobodang',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/:id(\\d+)',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/SalesBooking/SalesBookingxg/index'),
      meta: {
        title: '销售预订单修改',
        activeMenu: '/Warehousemanagement/SalesBooking'
      }
    }]
  },
  //库存汇总初始化返回
  {
    path: '/system/user-kchzcshfh',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/BarcodesSummary/index'),
      meta: {
        title: '库存汇总初始化',
        activeMenu: '/Warehousemanagement/BarcodesSummary'
      }
    }]
  },
  //库存明细初始化返回
  {
    path: '/system/user-kcmxcshfh',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/BarcodeInventorydetails/index'),
      meta: {
        title: '库存明细初始化',
        activeMenu: '/Warehousemanagement/BarcodeInventorydetails'
      }
    }]
  },
  // 销售提货单返回
  {
    path: '/Warehousemanagement/Saleslading',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: '',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/Saleslading/index'),
      meta: {
        title: '销售提货单',
        activeMenu: '/Warehousemanagement/Saleslading'
      }
    }]
  },

  //根据提货单创建
  {
    path: '/system/user-authhhchuanj',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/SalesShipment/SalesShipmentcj/index'),
      meta: {
        title: '销售出库创建',
        activeMenu: '/Warehousemanagement/SalesShipment'
      }
    }]
  },
  //根据销售订单创建
  {
    path: '/system/user-authhhxsdingdan',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/SalesStock/SalesStockcj/index'),
      meta: {
        title: '销售退库创建',
        activeMenu: '/Warehousemanagement/SalesStock'
      }
    }]
  },
  //根据销售预订单入库单创建
  {
    path: '/system/user-xsyddrukudang',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/SalesReceipt/SalesReceiptcj/index'),
      meta: {
        title: '销售预订单入库单创建',
        activeMenu: '/Warehousemanagement/SalesReceipt'
      }
    }]
  },
  //根据销售预订单入库单返回
  {
    path: '/system/user-xiaoshouyddfanhui',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/SalesReceipt/index'),
      meta: {
        title: '销售预订单入库单',
        activeMenu: '/Warehousemanagement/SalesReceipt'
      }
    }]
  },
  //根据销售订单创建
  {
    path: '/system/user-authhhxsxiaosdingdantihuo',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/Saleslading/Salesladingcj/index'),
      meta: {
        title: '销售提货单创建',
        activeMenu: '/Warehousemanagement/Saleslading'
      }
    }]
  },
  //销售预订单返回
  {
    path: '/system/user-xiaosydd',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
      path: 'role/',
      name: 'AuthUser',
      component: () => import('@/views/Warehousemanagement/SalesBooking/index'),
      meta: {
        title: '销售预订单',
        activeMenu: '/Warehousemanagement/SalesBooking'
      }
    }]
  },
  //质检单返回
  {
    path: '/system/user-zhijiandan',
    component: Layout,
    permissions: ['system:user:add'],
    children: [{
        path: 'role/',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/AnalysisCertificate/AnalysisCertificatecj/index'),
        meta: {
          title: '质检单创建',
          activeMenu: '/Warehousemanagement/AnalysisCertificate'
        }
      },
      { //质检单修改页面
        path: 'roleXg/',
        name: 'zhijiandanXg',
        component: () => import('@/views/Warehousemanagement/AnalysisCertificate/AnalysisCertificatexg/index'),
        meta: {
          title: '质检单修改',
          activeMenu: '/Warehousemanagement/AnalysisCertificate'
        }
      }
    ]
  },

  {
    path: '/totalOrder',
    component: Layout,
    redirect: 'totalOrder',
    name: 'totalOrder',
    meta: {
      title: '生产总订单',
      icon: 'component'
    },
    children: [{
      path: 'totalOrder',
      component: () => import('@/views/Salesmanagement/ProductionoOrders/index'),
      name: 'totalOrder',
      meta: {
        title: '生产总订单',
        icon: 'component',
        noCache: true,
        affix: true
      }
    }, ]
  },

  {
    path: '/saleOrderGn',
    component: Layout,
    redirect: 'saleOrderGn',
    name: 'saleOrderGn',
    meta: {
      title: '国内销售订单',
      icon: 'component'
    },
    children: [{
        path: 'saleOrderGn',
        component: () => import('@/views/Salesmanagement/SaleOrderGn/index'),
        name: 'saleOrderGn',
        meta: {
          title: '国内销售订单',
          icon: 'component',
          noCache: true,
          affix: true
        }
      }

    ]
  },



  {
    path: '/Salesmanagement/saleOrderDetail',
    component: Layout,
    permissions: ['system:user:add'],
    children: [

      {
        // path: 'role/:cbpc01(\\d+)',
        path: 'auditSale',

        name: 'auditSaleOrder',
        component: () => import('@/views/Salesmanagement/saleOrderDetail/auditDetail/index'),

        meta: {
          title: '销售订单审批详情',
          activeMenu: '/Salesmanagement/saleOrderDetail/audit'
        }
      },
      {
        // path: 'role/:cbpc01(\\d+)',
        path: 'mdfSale',

        name: 'mdfSaleOrder',
        component: () => import('@/views/Salesmanagement/saleOrderDetail/mdfDetail/index'),

        meta: {
          title: '销售订单修改详情',
          activeMenu: '/Salesmanagement/saleOrderDetail/mdf'
        }
      },
      {
        path: 'mdfGjSale',
        name: 'mdfGjSaleOrder',
        component: () => import('@/views/Salesmanagement/SaleOrderGJ/mdfDetail/index'),

        meta: {
          title: '销售国际订单修改详情',
          activeMenu: '/Salesmanagement/SaleOrderGJ/mdf'
        }
      },
      {
        // path: 'role/:cbpc01(\\d+)',
        path: 'addSale',

        name: 'addSaleOrder',
        component: () => import('@/views/Salesmanagement/saleOrderDetail/index'),

        meta: {
          title: '销售订单添加',
          activeMenu: '/Salesmanagement/saleOrderDetail/add'
        }
      },
      {
        // path: 'role/:cbpc01(\\d+)',
        path: 'showSale',

        name: 'showSaleOrder',
        component: () => import('@/views/Salesmanagement/saleOrderDetail/showDetail/index'),

        meta: {
          title: '国内销售订单详情',
          activeMenu: '/Salesmanagement/saleOrderDetail/show'
        }
      }, {
        // path: 'role/:cbpc01(\\d+)',
        path: 'showGjSale',

        name: 'showGjSale',
        component: () => import('@/views/Salesmanagement/SaleOrderGJ/showDetail/index'),

        meta: {
          title: '国际销售订单详情',
          activeMenu: '/Salesmanagement/saleOrderDetailGj/show'
        }
      }
    ]
  },


  {
    path: '/saleOrderGJ',
    component: Layout,
    redirect: 'saleOrderGJ',
    name: 'saleOrderGJ',
    meta: {
      title: '国际销售订单',
      icon: 'component'
    },
    children: [{
      path: 'saleOrderGJ',
      component: () => import('@/views/Salesmanagement/SaleOrderGJ/index'),
      name: 'saleOrderGJ',
      meta: {
        title: '国际销售订单',
        icon: 'component',
        noCache: true,
        affix: true
      }
    }, ]
  },
  {
    path: '/saleOrderChange',
    component: Layout,
    redirect: 'saleOrderChange',
    name: 'saleOrderChange',
    query: {
      id: ''
    },
    meta: {
      title: '销售变更',
      icon: 'saleOrderChange'
    },

    children: [{
      path: 'saleOrderChange',
      component: () => import('@/views/Salesmanagement/SaleOrderChange/index'),
      name: 'saleOrderChange',
      meta: {
        title: '销售变更',
        icon: 'component',
        noCache: true,
        affix: true
      }
    }]
  },
  {
    path: '/saleOrderFn',
    component: Layout,
    redirect: 'saleOrderFn',
    name: 'saleOrderFn',
    meta: {
      title: '财务复审',
      icon: 'saleOrderFn'
    },
    children: [{
      path: 'saleOrderFn',
      component: () => import('@/views/Salesmanagement/SaleOrderFn/index'),
      name: 'saleOrderFn',
      meta: {
        title: '财务复审',
        icon: 'component',
        noCache: true,
        affix: true
      }
    }, ]
  },

  {
    path: '/saleOrderDetail',
    component: Layout,
    redirect: 'saleOrderDetail',
    name: 'saleOrderDetail',
    query: {
      id: ''
    },
    children: [{
      // path: 'role/:cbpc01(\\d+)',
      path: 'saleOrderDetail',

      name: 'saleOrderDetail',
      component: () => import('@/views/Salesmanagement/saleOrderDetail/index'),

      meta: {
        title: '国内销售订单创建',
        icon: 'component',
        noCache: true,
        affix: true
      }
    }]
  },
  //售后单创建
  {
    path: '/aftersalesDetails',
    component: Layout,
    redirect: 'aftersalesDetails',
    permissions: ['system:user:add'],
    name: 'aftersalesDetails',
    query: {
      id: ''
    },
    children: [{
      // path: 'role/:cbpc01(\\d+)',
      path: 'aftersalesDetails',

      name: 'aftersalesDetails',
      component: () => import('@/views/aftersales/saleOrderDetail/index'),

      meta: {
        title: '售后服务单创建',
        icon: 'component',
        noCache: true
      }
    }, {
      // path: 'role/:cbpc01(\\d+)',
      path: 'aftermdsalesDetails',
      name: 'aftermdsalesDetails',
      component: () => import('@/views/aftersales/saleOrderDetail/mdfDetail/index'),

      meta: {
        title: '售后服务单修改',
        icon: 'component',
        noCache: true
      }
    },{
      // path: 'role/:cbpc01(\\d+)',
      path: 'aftermdsalesDetailsShow',
      name: 'aftermdsalesDetailsShow',
      component: () => import('@/views/aftersales/saleOrderDetail/mdfDetailShow/index'),

      meta: {
        title: '售后服务单详情',
        icon: 'component',
        noCache: true
      }
    }, {
      // path: 'role/:cbpc01(\\d+)',
      path: 'aftermdsales',
      name: 'aftermdsales',
      component: () => import('@/views/aftersales/index'),

      meta: {
        title: '售后服务单',
        icon: 'component'
      }
    }]
  },
  //修改售后
  /* {
     path: '/aftermdsalesDetails',
     component: Layout,
     permissions: ['system:user:add'],
     redirect: 'aftermdsalesDetails',
     name: 'aftermdsalesDetails',
     query:{
       id:''
     },
     children: [
       {
         // path: 'role/:cbpc01(\\d+)',
         path: 'aftermdsalesDetails',
         name: 'aftermdsalesDetails',
         component: () => import('@/views/aftersales/saleOrderDetail/mdfDetail/index'),

         meta: { title: '修改售后', icon: 'component', noCache: true }
       }
     ]
   },*/
  // 销售订单详情
  {
    path: '/saleshowOrderDetail',
    component: Layout,
    redirect: 'saleshowOrderDetail',
    name: 'saleshowOrderDetail',
    query: {
      id: ''
    },
    children: [{
      // path: 'role/:cbpc01(\\d+)',
      path: 'saleshowOrderDetail',

      name: 'saleshowOrderDetail',
      component: () => import('@/views/Salesmanagement/saleOrderDetail/showDetail/index'),

      meta: {
        title: '销售订单详情查看',
        icon: 'component',
        noCache: true,
        affix: true
      }
    }]
  },
  // 销售订单变更单详情

  {
    path: '/Salesmanagement/saleCgshowOrderDetail',
    component: Layout,
    permissions: ['system:user:add'],
    children: [

      {
        path: 'detail',
        name: 'detailSaleChange',
        component: () => import('@/views/Salesmanagement/SaleOrderChange/showDetail/index'),
        meta: {
          title: '销售订单变更详情',
          activeMenu: '/Salesmanagement/SaleOrderChange'
        }
      }, {
        // path: 'role/:cbpc01(\\d+)',
        path: 'add',
        name: 'addSaleChange',

        // name: 'saleCgaddOrderDetail',
        component: () => import('@/views/Salesmanagement/SaleOrderChange/addDetail/index'),

        meta: {
          title: '销售订单变更创建详情',
          activeMenu: '/Salesmanagement/SaleOrderChange'
        }
      },
      {
        // path: 'role/:cbpc01(\\d+)',
        path: 'mdf',

        name: 'mdfSaleChange',
        component: () => import('@/views/Salesmanagement/SaleOrderChange/mdfDetail/index'),

        meta: {
          title: '销售订单变更修改详情',
          activeMenu: '/Salesmanagement/SaleOrderChange'
        }
      },
      {
        // path: 'role/:cbpc01(\\d+)',
        path: 'audit',

        name: 'auditSaleChange',
        component: () => import('@/views/Salesmanagement/SaleOrderChange/auditDetail/index'),

        meta: {
          title: '销售订单变更单审批详情',
          activeMenu: '/Salesmanagement/SaleOrderChange'
        }
      }
    ]
  },
  // {
  //   path: '/system/user-cgddtj',
  //   component: Layout,
  //   permissions: ['system:user:add'],
  //   children: [
  //     {
  //       path: 'role/',
  //       name: 'AuthUser',
  //       component: () => import('@/views/Warehousemanagement/PurchaseOrder/PurchaseOrdercj/index'),
  //       meta: { title: '采购订单创建', activeMenu: '/Warehousemanagement/PurchaseOrder' }
  //     }
  //   ]
  // },
  // 销售订单变更单详情
  // {
  //   path: '/saleCgshowOrderDetail',
  //   component: Layout,
  //   redirect: 'saleCgshowOrderDetail',
  //   name: 'saleCgshowOrderDetail',
  //   query:{
  //     id:''
  //   },
  //   children: [
  //     {
  //       // path: 'role/:cbpc01(\\d+)',
  //       path: 'saleCgshowOrderDetail',
  //
  //       name: 'saleCgshowOrderDetail',
  //       component: () => import('@/views/Salesmanagement/SaleOrderChange/showDetail/index'),
  //
  //       meta: { title: '销售订单详情查看', icon: 'component', noCache: true, affix: true }
  //     }
  //   ]
  // },
  // 销售订单创建单详情
  // {
  //   path: '/saleCgaddOrderDetail',
  //   component: Layout,
  //   redirect: 'saleCgaddOrderDetail',
  //   name: 'saleCgaddOrderDetail',
  //   query:{
  //     id:''
  //   },
  //   children: [
  //     {
  //       // path: 'role/:cbpc01(\\d+)',
  //       path: 'saleCgaddOrderDetail',
  //
  //       name: 'saleCgaddOrderDetail',
  //       component: () => import('@/views/Salesmanagement/SaleOrderChange/addDetail/index'),
  //
  //       meta: { title: '销售订单创建单详情', icon: 'component', noCache: true, affix: true }
  //     }
  //   ]
  // },
  // 销售订单变更单修改详情
  // {
  //   path: '/saleCgmdfOrderDetail',
  //   component: Layout,
  //   redirect: 'saleCgmdfOrderDetail',
  //   name: 'saleCgmdfOrderDetail',
  //   query:{
  //     id:''
  //   },
  //   children: [
  //     {
  //       // path: 'role/:cbpc01(\\d+)',
  //       path: 'saleCgmdfOrderDetail',
  //
  //       name: 'saleCgmdfOrderDetail',
  //       component: () => import('@/views/Salesmanagement/SaleOrderChange/mdfDetail/index'),
  //
  //       meta: { title: '销售订单变更单修改详情', icon: 'component', noCache: true, affix: true }
  //     }
  //   ]
  // },
  // 销售订单变更单审批详情
  // {
  //   path: '/saleCgauditOrderDetail',
  //   component: Layout,
  //   redirect: 'saleCgauditOrderDetail',
  //   name: 'saleCgauditOrderDetail',
  //   query:{
  //     id:''
  //   },
  //   children: [
  //     {
  //       // path: 'role/:cbpc01(\\d+)',
  //       path: 'saleCgauditOrderDetail',
  //
  //       name: 'saleCgauditOrderDetail',
  //       component: () => import('@/views/Salesmanagement/SaleOrderChange/auditDetail/index'),
  //
  //       meta: { title: '销售订单变更单审批详情', icon: 'component', noCache: true, affix: true }
  //     }
  //   ]
  // },
  // 销售订单修改
  {
    path: '/salemdfOrderDetail',
    component: Layout,
    redirect: 'salemdfOrderDetail',
    name: 'salemdfOrderDetail',
    query: {
      id: ''
    },
    children: [{
      // path: 'role/:cbpc01(\\d+)',
      path: 'salemdfOrderDetail',

      name: 'salemdfOrderDetail',
      component: () => import('@/views/Salesmanagement/saleOrderDetail/mdfDetail/index'),

      meta: {
        title: '销售订单修改',
        icon: 'component',
        noCache: true,
        affix: true
      }
    }]
  },

  // 销售修改订单详情
  {
    path: '/saleauditOrderDetail',
    component: Layout,
    redirect: 'saleauditOrderDetail',
    name: 'saleauditOrderDetail',
    query: {
      id: '',
      status: 0
    },
    children: [{
      // path: 'role/:cbpc01(\\d+)',
      path: 'saleauditOrderDetail',

      name: 'saleauditOrderDetail',
      component: () => import('@/views/Salesmanagement/saleOrderDetail/auditDetail/index'),

      meta: {
        title: '销售订单审核',
        icon: 'component',
        noCache: true,
        affix: true
      }
    }]
  },

  //缺货登记创建
  {
    path: '/Outofstockregistrationadd',
    component: Layout,
    redirect: 'Outofstockregistrationadd',
    name: 'Outofstockregistrationadd',
    permissions: ['system:user:edit'],
    query: {
      id: ''
    },
    children: [{
      // path: 'role/:cbpc01(\\d+)',
      path: 'Outofstockregistrationadd',

      name: 'Outofstockregistrationadd',
      component: () => import('@/views/Outofstockregistration/saleOrderDetail/index'),

      meta: {
        title: '缺货登记创建',
        icon: 'component',
        noCache: true
      }
    }]
  },

  //缺货登记返回
  {
    path: '/Outofstockregistrationfh',
    component: Layout,
    name: 'Outofstockregistrationfh',
    permissions: ['system:user:edit'],
    children: [{
      path: 'role/',
      name: 'OutofstockregistrationRole',
      component: (resolve) => require(['@/views/Outofstockregistration/index'], resolve),
      meta: {
        title: '缺货登记'
      }
    }]
  },


  //修改缺货等级
  {
    path: '/Outofstockregistrationmd',
    component: Layout,
    redirect: 'Outofstockregistrationmd',
    name: 'Outofstockregistrationmd',
    permissions: ['system:user:edit'],
    query: {
      id: ''
    },
    children: [{
      // path: 'role/:cbpc01(\\d+)',
      path: 'Outofstockregistrationmd',

      name: 'Outofstockregistrationmd',
      component: () => import('@/views/Outofstockregistration/saleOrderDetail/mdfDetail/index'),

      meta: {
        title: '修改缺货登记',
        icon: 'component',
        noCache: true
      }
    }, {
      // path: 'role/:cbpc01(\\d+)',
      path: 'Outofstockregistrationdetail',

      name: 'Outofstockregistrationdetail',
      component: () => import('@/views/Outofstockregistration/saleOrderDetail/showDetail/index'),

      meta: {
        title: '缺货登记详情',
        icon: 'component',
        noCache: true
      }
    }]
  },
  // 国际销售审批订单详情
  {
    path: 'gjAuditOrderDetail',
    component: Layout,
    redirect: 'gjAuditOrderDetail',
    name: 'gjAuditOrderDetail',
    query: {
      id: '',
      status: 0
    },
    children: [{
      // path: 'role/:cbpc01(\\d+)',
      path: 'gjAuditOrderDetail',

      name: 'gjAuditOrderDetail',
      component: () => import('@/views/Salesmanagement/SaleOrderGJ/auditDetail/index'),

      meta: {
        title: '国际销售审批订单详情',
        icon: 'component',
        noCache: true,
        affix: true
      }
    }]
  },

  // 库存分配页面
  {
    path: '/saleGjDistribution',
    component: Layout,
    redirect: 'saleGjDistribution',
    name: 'saleGjDistribution',
    // query:{
    //   id:'',
    //   status: 0
    // },
    children: [{
      // path: 'role/:cbpc01(\\d+)',
      path: 'saleGjDistribution',

      name: 'saleGjDistribution',
      component: () => import('@/views/Salesmanagement/SaleOrderGJ/skuskuDistribution/index'),

      meta: {
        title: '库存分配页面',
        icon: 'component',
        noCache: true,
        affix: true
      }
    }]
  },
  // {
  //   path: '/saleorder',
  //   component: Layout, // 一级这个component: Layout必填，除非是不需要在页面容器里打开的页面
  //   hidden: true, // false：显示在侧边栏菜单
  //   redirect: 'noRedirect', // noRedirect：面包屑不可点击，不写这个，父级标题样式就和首页一样，黑字可点击跳转
  //   // meta: { title: '费用管理'}, // 一级标题，写了才能显示在面包屑上
  //   children: [
  //     {
  //       path: '',
  //       component:{ render: (e) => e("router-view") }, // 如果你的'feeConfig'路径已经在系统菜单中设置过了，这里的path和component就写得和我一样就行，直接跳转三级路由
  //       hidden: true, // false：显示在侧边栏菜单
  //       redirect: 'noRedirect', // noRedirect：面包屑不可点击，不写这个，父级标题样式就和首页一样，黑字可点击跳转
  //       meta: { title: '费用配置'}, // 二级标题，写了才能显示在面包屑上
  //       // 如果你不需要二级的父级标题，那你就直接把第二个children的内容写在第一个children就行
  //       children: [
  //         {
  //           path: 'showOrderDetail',
  //           component: () => import('@/views/Salesmanagement/saleOrderDetail/showDetail/index'),
  //           name: 'showOrderDetail',
  //           meta: { title: '费用配置', activeMenu: '/feeManage/feeConfig' } // meta.title：三级标题，meta.activeMenu：侧边栏父级菜单高亮
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   path: '/saleorder/showOrderDetail',
  //   component: Layout,
  //   hidden: true,
  //   // permissions: ['system:user:edit'],
  //   children: [
  //     {
  //       // path: 'role/:cbpc01(\\d+)',
  //       path: '/saleorder/showOrderDetail',
  //
  //       name: 'saleOrderDetail',
  //       component: () => import('@/views/Salesmanagement/saleOrderDetail/showDetail'),
  //
  //       meta: { title: '国内销售订单创建', icon: 'component', noCache: true, affix: true }
  //     },
  //     {
  //       path: 'role/:cbpc01(\\d+)',
  //       name: 'AuthUser',
  //       component: () => import('@/views/Salesmanagement/saleOrderDetail/showDetail'),
  //       meta: { title: '销售提货详情' }
  //     }
  //   ]
  // },
  {
    path: '/system/role-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:role:edit'],
    children: [{
      path: 'user/:roleId(\\d+)',
      component: () => import('@/views/system/role/authUser'),
      name: 'AuthUser',
      meta: {
        title: '分配用户',
        activeMenu: '/system/role'
      }
    }]
  },
  {
    path: '/system/dict-data',
    component: Layout,
    hidden: true,
    permissions: ['system:dict:list'],
    children: [{
      path: 'index/:dictId(\\d+)',
      component: () => import('@/views/system/dict/data'),
      name: 'Data',
      meta: {
        title: '字典数据',
        activeMenu: '/system/dict'
      }
    }]
  },
  {
    path: '/monitor/job-log',
    component: Layout,
    hidden: true,
    permissions: ['monitor:job:list'],
    children: [{
      path: 'index',
      component: () => import('@/views/monitor/job/log'),
      name: 'JobLog',
      meta: {
        title: '调度日志',
        activeMenu: '/monitor/job'
      }
    }]
  },

  {
    path: '/tool/gen-edit',
    component: Layout,
    hidden: true,
    permissions: ['tool:gen:edit'],
    children: [{
      path: 'index/:tableId(\\d+)',
      component: () => import('@/views/tool/gen/editTable'),
      name: 'GenEdit',
      meta: {
        title: '修改生成配置',
        activeMenu: '/tool/gen'
      }
    }]
  },



]

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})
