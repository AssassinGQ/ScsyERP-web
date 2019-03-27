import formField from '../BaseFields/FormField.js'
import accountStatus from './AccountStatus.js'

export default Object.freeze([
    ...formField,
    { key: 'project', label: '项目工程', type: 'select', optionsUrl: '/BasicInfo/Project/query', nullAble: false },
    { key: 'inStorageStatus', label: '入库状态', type: 'select', options: { 0: '正在入库', 1: '入库完成'}, increate: false},
    { key: 'inStorageNumber', label: '入库单号', increate: false},
    { key: 'inStorageTime', label: '入库时间',type:'date', increate: false},
    { key: 'warehouse', label: '入库仓库', type: 'select', optionsUrl: '/BasicInfo/Warehouse/query', optionDisplayKey: 'name', nullAble: false  },
    { key: 'truck', label: '运输车辆', type: 'select', optionsUrl: '/BasicInfo/Truck/query', nullAble: false },
    { key: 'pickWorker', label: '提货人', type: 'select', optionsUrl: '/BasicInfo/Admin/query', },
    { key: 'lister', label: '制表人', type: 'select', optionsUrl: '/BasicInfo/Admin/query', },
    // { key: 'driveWorkers', label: '行车工', type: 'select', optionsUrl: '/BasicInfo/DriveWorker/query', },
    // { key: 'liftWorkers', label: '起重工', type: 'select', optionsUrl: '/BasicInfo/LiftWorker/query', },
    ...accountStatus,
    { key: 'totalAmount', label: '货物数量', increate: false },
    { key: 'totalVolume', label: '总体积', increate: false},
    { key: 'totalWeight', label: '总重量', increate: false },
    { key: 'products', label: '明细', increate: false},
])