import Vue from 'vue'
import Router from 'vue-router'
import { createRouter, createMemoryHistory } from "vue-router";

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
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
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
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index'),
        name: 'Index',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'profile',
        component: () => import('@/views/system/user/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  }
]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
 {
    path: '/system/user-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:cbpc01(\\d+)',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/PurchaseWarehousing/PurchaseWarehousingxq/index'),
        meta: { title: '采购入库详情', activeMenu: '/Warehousemanagement/PurchaseWarehousing' }
      }
    ]
  },
  {
    path: '/system/user-authh',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:cbpg01(\\d+)',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/PurchaseReturn/PurchaseReturnxq/index'),
        meta: { title: '采购退货详情', activeMenu: '/Warehousemanagement/PurchaseReturn' }
      }
    ]
  },
   {
    path: '/system/user-authhh',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:cbpc01(\\d+)',
         name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/SalesShipment/SalesShipmentxq/index'),
        meta: { title: '销售出库详情', activeMenu: '/Warehousemanagement/SalesShipment' }
      }
    ]
  },
  {
    path: '/system/user-authhhh',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:cbpc01(\\d+)',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/Saleslading/Salesladingxq/index'),
        meta: { title: '销售提货详情', activeMenu: '/Warehousemanagement/Saleslading' }
      }
    ]
  },
  {
    path: '/system/user-authhhhh',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:cbpg01(\\d+)',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/SalesStock/SalesStockxq/index'),
        meta: { title: '销售退货详情', activeMenu: '/Warehousemanagement/SalesStock' }
      }
    ]
  },
  {
    path: '/system/user-authhhhhh',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:cbqa01(\\d+)',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/AnalysisCertificate/AnalysisCertificatexq/index'),
        meta: { title: '质检单详情', activeMenu: '/Warehousemanagement/AnalysisCertificate' }
      }
    ]
  },
  {
    path: '/system/user-authhhhhhh',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:cbie01(\\d+)',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/BarcodeInventorydetails/BarcodeInventorydetailsxq/index'),
        meta: { title: '库存初始化详情', activeMenu: '/Warehousemanagement/BarcodeInventorydetails' }
      }
    ]
  },
  {
    path: '/system/user-authhhhhhhh',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:cbie01(\\d+)',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/BarcodesSummary/BarcodesSummaryxq/index'),
        meta: { title: '库存初始化详情', activeMenu: '/Warehousemanagement/BarcodesSummary' }
      }
    ]
  },
   {
    path: '/system/user-authhhhhhhhh',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:cbpg01(\\d+)',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/WarehouseInventory/WarehouseInventoryxq/index'),
        meta: { title: '仓库盘点详情', activeMenu: '/Warehousemanagement/WarehouseInventory' }
      }
    ]
  },
  {
    path: '/system/user-authhhhhhhhhh',
    component: Layout,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:cbpg01(\\d+)',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/WarehouseSummary/WarehouseSummaryxq/index'),
        meta: { title: '仓库盘点详情', activeMenu: '/Warehousemanagement/WarehouseSummary' }
      }
    ]
  },
  ,
  {
    path: '/system/user-authhhhhhhhhhh',
    component: Layout,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:cbaa01(\\d+)',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/WarehouseTransfer/WarehouseTransferxq/index'),
        meta: { title: '仓库调拨单详情', activeMenu: '/Warehousemanagement/WarehouseTransfer' }
      }
    ]
  },
//入库单添加
   {
    path: '/system/user-cj',
    component: Layout,
    permissions: ['system:user:add'],
    children: [
      {
        path: 'role/',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/PurchaseWarehousing/PurchaseWarehousingcj/index'),
        meta: { title: '采购入库创建', activeMenu: '/Warehousemanagement/PurchaseWarehousing' }
      }
    ]
  },
  //退货单添加
   {
    path: '/system/user-th',
    component: Layout,
    permissions: ['system:user:add'],
    children: [
      {
        path: 'role/',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/PurchaseReturn/PurchaseReturncj/index'),
        meta: { title: '采购退库创建', activeMenu: '/Warehousemanagement/PurchaseReturn' }
      }
    ]
  },
   //质检单添加
   {
    path: '/system/user-zjd',
    component: Layout,
    permissions: ['system:user:add'],
    children: [
      {
        path: 'role/',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/AnalysisCertificate/AnalysisCertificatecj/index'),
        meta: { title: '质检单创建', activeMenu: '/Warehousemanagement/AnalysisCertificate' }
      }
    ]
  },
  //库存明细初始化添加
   {
    path: '/system/user-kcmx',
    component: Layout,
    permissions: ['system:user:add'],
    children: [
      {
        path: 'role/',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/BarcodeInventorydetails/BarcodeInventorydetailscj/index'),
        meta: { title: '库存明细创建', activeMenu: '/Warehousemanagement/BarcodeInventorydetails' }
      }
    ]
  },
  //库存汇总初始化添加
   {
    path: '/system/user-kchz',
    component: Layout,
    permissions: ['system:user:add'],
    children: [
      {
        path: 'role/',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/BarcodesSummary/BarcodesSummarycj/index'),
        meta: { title: '库存汇总创建', activeMenu: '/Warehousemanagement/BarcodesSummary' }
      }
    ]
  },
   //销售出货添加
   {
    path: '/system/user-xsch',
    component: Layout,
    permissions: ['system:user:add'],
    children: [
      {
        path: 'role/',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/SalesShipment/SalesShipmentcj/index'),
        meta: { title: '销售出货创建', activeMenu: '/Warehousemanagement/SalesShipment' }
      }
    ]
  },
  //销售提货添加
   {
    path: '/system/user-xsth',
    component: Layout,
    permissions: ['system:user:add'],
    children: [
      {
        path: 'role/',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/Saleslading/Salesladingcj/index'),
        meta: { title: '销售提货创建', activeMenu: '/Warehousemanagement/Saleslading' }
      }
    ]
  },
   //销售提货添加
   {
    path: '/system/user-xstk',
    component: Layout,
    permissions: ['system:user:add'],
    children: [
      {
        path: 'role/',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/SalesStock/SalesStockcj/index'),
        meta: { title: '销售退库创建', activeMenu: '/Warehousemanagement/SalesStock' }
      }
    ]
  },
  //仓库盘点明细表添加
   {
    path: '/system/user-pdmx',
    component: Layout,
    permissions: ['system:user:add'],
    children: [
      {
        path: 'role/',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/WarehouseInventory/WarehouseInventorycj/index'),
        meta: { title: '盘点明细创建', activeMenu: '/Warehousemanagement/WarehouseInventory' }
      }
    ]
  },
  //仓库盘点汇总表添加
   {
    path: '/system/user-pdhz',
    component: Layout,
    permissions: ['system:user:add'],
    children: [
      {
        path: 'role/',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/WarehouseSummary/WarehouseSummarycj/index'),
        meta: { title: '盘点汇总创建', activeMenu: '/Warehousemanagement/WarehouseSummary' }
      }
    ]
  },
  //仓库调拨单添加
   {
    path: '/system/user-ckdb',
    component: Layout,
    permissions: ['system:user:add'],
    children: [
      {
        path: 'role/',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/WarehouseTransfer/WarehouseTransfercj/index'),
        meta: { title: '仓库调拨创建', activeMenu: '/Warehousemanagement/WarehouseTransfer' }
      }
    ]
  },
  //采购入库单返回
   {
    path: '/system/user-ckrkfh',
    component: Layout,
    permissions: ['system:user:add'],
    children: [
      {
        path: 'role/',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/PurchaseWarehousing/index'),
        meta: { title: '采购入库单', activeMenu: '/Warehousemanagement/PurchaseWarehousing' }
      }
    ]
  },
   //采购退库单返回
   {
    path: '/system/user-cktkfh',
    component: Layout,
    permissions: ['system:user:add'],
    children: [
      {
        path: 'role/',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/PurchaseReturn/index'),
        meta: { title: '采购退库单', activeMenu: '/Warehousemanagement/PurchaseReturn' }
      }
    ]
  },
  //销售出库单返回
   {
    path: '/system/user-xsckfh',
    component: Layout,
    permissions: ['system:user:add'],
    children: [
      {
        path: 'role/',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/SalesShipment/index'),
        meta: { title: '销售出库单', activeMenu: '/Warehousemanagement/SalesShipment' }
      }
    ]
  },
   //质检单返回
   {
    path: '/system/user-zjdfh',
    component: Layout,
    permissions: ['system:user:add'],
    children: [
      {
        path: 'role/',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/AnalysisCertificate/index'),
        meta: { title: '质检单', activeMenu: '/Warehousemanagement/AnalysisCertificate' }
      }
    ]
  },
  //仓库盘点明细表返回
   {
    path: '/system/user-ckpdmxbfh',
    component: Layout,
    permissions: ['system:user:add'],
    children: [
      {
        path: 'role/',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/WarehouseInventory/index'),
        meta: { title: '仓库盘点明细表', activeMenu: '/Warehousemanagement/WarehouseInventory' }
      }
    ]
  },
   //仓库盘点汇总表返回
   {
    path: '/system/user-ckpdhzfh',
    component: Layout,
    permissions: ['system:user:add'],
    children: [
      {
        path: 'role/',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/WarehouseSummary/index'),
        meta: { title: '仓库盘点汇总表', activeMenu: '/Warehousemanagement/WarehouseSummary' }
      }
    ]
  },
   //仓库调拨单返回
   {
    path: '/system/user-ckdbdfh',
    component: Layout,
    permissions: ['system:user:add'],
    children: [
      {
        path: 'role/',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/WarehouseTransfer/index'),
        meta: { title: '仓库调拨单', activeMenu: '/Warehousemanagement/WarehouseTransfer' }
      }
    ]
  },
   //库存汇总初始化返回
   {
    path: '/system/user-kchzcshfh',
    component: Layout,
    permissions: ['system:user:add'],
    children: [
      {
        path: 'role/',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/BarcodesSummary/index'),
        meta: { title: '库存汇总初始化', activeMenu: '/Warehousemanagement/BarcodesSummary' }
      }
    ]
  },
  //库存明细初始化返回
   {
    path: '/system/user-kcmxcshfh',
    component: Layout,
    permissions: ['system:user:add'],
    children: [
      {
        path: 'role/',
        name: 'AuthUser',
        component: () => import('@/views/Warehousemanagement/BarcodeInventorydetails/index'),
        meta: { title: '库存明细初始化', activeMenu: '/Warehousemanagement/BarcodeInventorydetails' }
      }
    ]
  },
  {
    path: '/system/role-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:role:edit'],
    children: [
      {
        path: 'user/:roleId(\\d+)',
        component: () => import('@/views/system/role/authUser'),
        name: 'AuthUser',
        meta: { title: '分配用户', activeMenu: '/system/role' }
      }
    ]
  },
  {
    path: '/system/dict-data',
    component: Layout,
    hidden: true,
    permissions: ['system:dict:list'],
    children: [
      {
        path: 'index/:dictId(\\d+)',
        component: () => import('@/views/system/dict/data'),
        name: 'Data',
        meta: { title: '字典数据', activeMenu: '/system/dict' }
      }
    ]
  },
  {
    path: '/monitor/job-log',
    component: Layout,
    hidden: true,
    permissions: ['monitor:job:list'],
    children: [
      {
        path: 'index',
        component: () => import('@/views/monitor/job/log'),
        name: 'JobLog',
        meta: { title: '调度日志', activeMenu: '/monitor/job' }
      }
    ]
  },
  {
    path: '/tool/gen-edit',
    component: Layout,
    hidden: true,
    permissions: ['tool:gen:edit'],
    children: [
      {
        path: 'index/:tableId(\\d+)',
        component: () => import('@/views/tool/gen/editTable'),
        name: 'GenEdit',
        meta: { title: '修改生成配置', activeMenu: '/tool/gen' }
      }
    ]
  }
]

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
