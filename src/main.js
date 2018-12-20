import Vue from 'vue'
import VueRouter from 'vue-router'
import echarts from 'echarts'

Vue.use(VueRouter)
import './load-element-ui'
import './load-font-awesome'

// Global Components
import FA from './components/fa'
import MAP from './components/map-box'
import TableView from './components/table-view'

Vue.component('fa', FA)
Vue.component('map-box', MAP)
Vue.component('table-view', TableView)

// Vue.prototype.$echarts = echarts
// Vue.prototype.$axios = Axios
// Axios.defaults.baseURL = '/api'
// Axios.defaults.headers.post['Content-Type'] = 'application/json';

import store from './store'
import App from './app.vue'

import DashboardView from './views/dashboard'
import LatestLogView from './views/latest-log'

import LoginView from './views/PMS/login'
import GetAccountView from './views/PMS/get-account'
import UserRoleShowView from './views/PMS/user-role-show'
import RolePermissionShowView from './views/PMS/role-permission-show'
import UserPermissionShowView from './views/PMS/user-permission-show'
import UserFinalPermissionShowView from './views/PMS/user-final-permission-show'
import UserPermissionView from './views/PMS/user-permission'
import RolePermissionView from './views/PMS/role-permission'

import CorporationView from './views/LoginViews/corporation'
import GovernmentView from './views/LoginViews/government'
import AdministratorView from './views/LoginViews/administrator'
import CustomerView from './views/LoginViews/customer'
import ManufacturerView from './views/LoginViews/manufacturer'
import ConsigneeView from './views/LoginViews/consignee'
import DriverView from './views/LoginViews/driver'
import EscortView from './views/LoginViews/escort'

import DriveWorkeViewr from './views/UnLoginViews/drive-worker'
import LiftWorkerView from './views/UnLoginViews/lift-worker'
import TruckView from './views/UnLoginViews/truck'
import WarehouseView from './views/UnLoginViews/warehouse'
import WorkshopView from './views/UnLoginViews/workshop'
import MaterialView from './views/UnLoginViews/material'
import ProductView from './views/UnLoginViews/product'
import ProjectView from './views/UnLoginViews/project'

import InStorageFormView from './views/FormViews/in-storage-form'
import OutStorageFormView from './views/FormViews/out-storage-form'
import OnTruckFormView from './views/FormViews/on-truck-form'
import TransportContractView from './views/FormViews/transport-contract'

const TodoView = { render: h => h('div', 'todo') }
import {
    TYPE_CORP,
    TYPE_CORP_ADMIN,
    TYPE_SUPERADMIN,
    TYPE_MANUFACTURER,
    TYPE_DRIVER,
    TYPE_ESCORT,
    TYPE_GOV,
    TYPE_CUSTOMER,
    TYPE_CONSIGNEE
} from './store/modules/user'

const router = new VueRouter({
    mode: 'history',
    routes: [{
        path: '/',
        component: DashboardView,
        children: [{
            path: 'GetAccount',
            component: GetAccountView,
            meta: {
                group: '权限管理', title: '生成账号',
                permission: [TYPE_SUPERADMIN]
            },
        }, {
            path: 'UserRole',
            component: UserRoleShowView,
            meta: {
                group: '权限管理', title: '查看用户角色关系',
                permission: [TYPE_SUPERADMIN, TYPE_CORP_ADMIN]
            },
        }, {
            path: 'RolePermission',
            component: RolePermissionShowView,
            meta: {
                group: '权限管理', title: '查看角色权限关系',
                permission: [TYPE_SUPERADMIN, TYPE_CORP_ADMIN]
            },
        }, {
            path: 'UserExtraPermission',
            component: UserPermissionShowView,
            meta: {
                group: '权限管理', title: '查看用户额外屏蔽权限关系',
                permission: [TYPE_SUPERADMIN, TYPE_CORP_ADMIN]
            },
        }, {
            path: 'UserFinalPermission',
            component: UserFinalPermissionShowView,
            meta: {
                group: '权限管理', title: '查看用户最终权限关系',
                permission: [TYPE_SUPERADMIN, TYPE_CORP_ADMIN]
            },
        }, {
            path: 'UserPermission',
            component: UserPermissionView,
            meta: {
                group: '权限管理', title: '用户管理',//增删用户的角色，增删用户额外屏蔽权限
                permission: [TYPE_SUPERADMIN, TYPE_CORP_ADMIN]
            },
        }, {
            path: 'Role',
            component: RolePermissionView,
            meta: {
                group: '权限管理', title: '角色管理',//增删角色，增删角色的权限
                permission: [TYPE_SUPERADMIN, TYPE_CORP_ADMIN]
            },
        }, {
            path: 'Corporation',//查询承运方信息；修改承运方信息（仅承运方）
            component: CorporationView,
            meta: {
                group: '用户管理', title: '承运方信息'
            }
        }, {
            path: 'Government',
            component: GovernmentView,//查询政府信息；修改政府信息（仅政府）
            meta: {
                group: '用户管理', title: '政府信息',
                permission: [TYPE_SUPERADMIN, TYPE_GOV]
            }
        }, {
            path: 'Admin',
            component: AdministratorView,//增删查改管理员信息
            meta: {
                group: '用户管理', title: '管理员信息',
                permission: [TYPE_SUPERADMIN, TYPE_CORP, TYPE_CORP_ADMIN]
            }
        }, {
            path: 'Customer',
            component: CustomerView,
            meta: {
                group: '用户管理', title: '客户信息',
                permission: [TYPE_SUPERADMIN, TYPE_CORP, TYPE_CORP_ADMIN, TYPE_CUSTOMER]
            },
        }, {
            path: 'Manufacturer',
            component: ManufacturerView,
            meta: {
                group: '用户管理', title: '生产厂家信息',
                permission: [TYPE_SUPERADMIN, TYPE_CORP, TYPE_CORP_ADMIN, TYPE_MANUFACTURER]
            }
        }, {
            path: 'Consignee',
            component: ConsigneeView,
            meta: {
                group: '用户管理', title: '收货方信息',
                permission: [TYPE_SUPERADMIN, TYPE_CORP, TYPE_CORP_ADMIN, TYPE_CONSIGNEE]
            },
        }, {
            path: 'Driver',
            component: DriverView,
            meta: {
                group: '用户管理', title: '驾驶员信息',
                permission: [TYPE_SUPERADMIN, TYPE_CORP, TYPE_CORP_ADMIN, TYPE_GOV, TYPE_DRIVER, TYPE_ESCORT]
            },
        }, {
            path: 'Escort',
            component: EscortView,
            meta: {
                group: '用户管理', title: '押运员信息',
                permission: [TYPE_SUPERADMIN, TYPE_CORP, TYPE_CORP_ADMIN, TYPE_GOV, TYPE_DRIVER, TYPE_ESCORT]
            },
        }, {
            path: 'DriveWorker',
            component: DriveWorkeViewr,//增删查改管理员信息
            meta: {
                group: '基本信息', title: '行车工信息',
                permission: [TYPE_SUPERADMIN, TYPE_CORP, TYPE_CORP_ADMIN]
            }
        }, {
            path: 'LiftWorker',
            component: LiftWorkerView,//增删查改管理员信息
            meta: {
                group: '基本信息', title: '起重工信息',
                permission: [TYPE_SUPERADMIN, TYPE_CORP, TYPE_CORP_ADMIN]
            }
        }, {
            path: 'Truck',
            component: TruckView,
            props: ({ params: { viewType = 'truck' } }) => ({ viewType }),
            meta: {
                group: '基本信息', title: '车辆信息',
                permission: [TYPE_SUPERADMIN, TYPE_CORP, TYPE_CORP_ADMIN]
            },
            children: [{ path: ':viewType?' }]
        }, {
            path: 'Warehouse',
            component: WarehouseView,//增删查改管理员信息
            meta: {
                group: '基本信息', title: '仓库信息',
                permission: [TYPE_SUPERADMIN, TYPE_CORP, TYPE_CORP_ADMIN]
            }
        }, {
            path: 'Workshop',
            component: WorkshopView,//增删查改管理员信息
            meta: {
                group: '基本信息', title: '生产车间信息',
                permission: [TYPE_SUPERADMIN, TYPE_CORP, TYPE_CORP_ADMIN]
            }
        }, {
            path: 'Material',
            component: MaterialView,//增删查改管理员信息
            meta: {
                group: '基本信息', title: '物料信息',
                permission: [TYPE_SUPERADMIN, TYPE_CORP, TYPE_CORP_ADMIN]
            }
        }, {
            path: 'Product',//增删查改，在库盘点
            component: ProductView,
            meta: {
                group: '基本信息', title: '货物信息',
                permission: [TYPE_SUPERADMIN, TYPE_CORP, TYPE_CORP_ADMIN]
            }
        }, {
            path: 'Project',//创建工程（下单）,修改工程，删除工程，查询工程
            component: ProjectView,
            meta: {
                group: '工程项目', title: '项目工程',
                permission: [TYPE_SUPERADMIN, TYPE_CUSTOMER]
            }
        }, {
            path: 'InStorage',//入库，增查改，添加明细
            component: InStorageFormView,
            meta: {
                group: '入库流程', title: '入库单',
                permission: [TYPE_SUPERADMIN, TYPE_CUSTOMER]
            }
        }, {
            path: 'OutStorage',//出库，增查改，添加明细
            component: OutStorageFormView,
            meta: {
                group: '出库流程', title: '出库单',
                permission: [TYPE_SUPERADMIN, TYPE_CUSTOMER]
            }
        }, {
            path: 'OnTruckForm',
            component: OnTruckFormView,
            meta: {
                group: '费用结算', title: '随车清单',
                permission: [TYPE_SUPERADMIN, TYPE_CONSIGNEE]
            }
        }, {
            path: 'TransportContract',
            component: TransportContractView,
            meta: {
                group: '费用结算', title: '运输合同',
                permission: [TYPE_SUPERADMIN, TYPE_CONSIGNEE]
            }
        }, {
            path: 'latest-log',
            component: LatestLogView,
            props: ({ params: { viewType = 'trucks' } }) => ({ viewType }),
            meta: {
                group: '在途监控', title: '最新日志',
                permission: [TYPE_SUPERADMIN, TYPE_CORP, TYPE_CORP_ADMIN]
            },
            children: [{ path: ':viewType?' }]
        }, {
            path: 'data',
            component: DataView,
            meta: {
                group: '在途监控', title: '历史日志',
                permission: [TYPE_SUPERADMIN, TYPE_CORP, TYPE_CORP_ADMIN]
            }
        }, {
            path: 'accidentquery',
            component: DataView,
            meta: {
                group: '在途监控', title: '异常信息',
                permission: [TYPE_SUPERADMIN, TYPE_CORP, TYPE_CORP_ADMIN]
            }
        }, {
            path: 'lock',
            component: DataView,
            meta: {
                group: '在途监控', title: '开锁管理',
                permission: [TYPE_SUPERADMIN, TYPE_CORP, TYPE_CORP_ADMIN]
            }
        }, {
            path: 'realtime',
            component: DataView,
            meta: {
                group: '在途监控', title: '实时消息',
                permission: [TYPE_SUPERADMIN, TYPE_CORP, TYPE_CORP_ADMIN]
            }
        }, {
            path: 'accident-stats',
            component: DataView,
            meta: {
                group: '数据统计', title: '事故统计',
                permission: [TYPE_SUPERADMIN, TYPE_CORP, TYPE_CORP_ADMIN]
            },
            props: ({ params: { viewType = 'time' } }) => ({ viewType }),
            children: [{ path: ':viewType?' }]
        }, {
            path: 'order-stats',
            component: DataView,
            meta: {
                group: '数据统计', title: '订单统计',
                permission: [TYPE_SUPERADMIN, TYPE_CORP, TYPE_CORP_ADMIN]
            },
            props: ({ params: { viewType = 'time' } }) => ({ viewType }),
            children: [{ path: ':viewType?' }]
        }]
    }, {
        path: '/login',
        component: LoginView,
        meta: { title: '登录' },
    },{
        path: '*',
        redirect: '/login'
    }]
})

router.beforeEach((to, from, next) => {
    next();
    // if (to.path !== '/login' && !store.getters.user.token) {
    //     next({ path: '/login', replace: true })
    // } else {
    //     next()
    // }
})

/* Global Filters */
import { format } from 'date-fns'
import humanize from 'humanize-duration'

Vue.filter('format', (timestamp, tokens = 'YYYY-MM-DD') => timestamp ? format(timestamp, tokens) : '暂无')
Vue.filter('humanize', duration => humanize(duration, {
    language: 'zh_CN', largest: 1, units: ['d', 'm']
}))

const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    computed: {
        pageTitle() {
            let title = this.$route.meta.title
            if (!title) {
                let matched = this.$route.matched.find(t => t.meta.title)
                if (matched) title = matched.meta.title
            }
            return title
        }
    }
})

router.afterEach(() => {
    document.title = app.pageTitle
})


/* Show API Errors */
import { handlers } from './api'

handlers.error = ({ msg: message }) => {
    // if (message === 'token失效') {
    //     store.commit('resetUser')
    //     router.replace('/login')
    // }
    app.$notify.error({ title: '错误', message })
}
handlers.success = ({ msg: message }) => {
    app.$notify.success({ message })
}
// handlers.message = message => app.$notify.success({ message })

import { DEBUG } from './util'
import InStorageForm from "./fields/FormFields/InStorageForm";
import OnTruckForm from "./fields/FormFields/OnTruckForm";
import TransportContract from "./fields/FormFields/TransportContract";

if (DEBUG) {
    window.router = router
    window.app = app
}