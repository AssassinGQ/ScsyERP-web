import formField from '../BaseFields/FormField.js'
import accountStatus from './AccountStatus.js'

export default Object.freeze([
    ...formField,
    { key: 'project', label: '项目工程', type: 'select', optionsUrl: '/BasicInfo/Project/query', },
    { key: 'outStorageStatus', label: '出库状态', type: 'select', options: { 0: '正在出库', 1: '出库完成'}, increate: false},
    { key: 'outStorageNumber', label: '出库单号', increate: false},
    { key: 'outStorageTime', label: '出库时间', type:"date", increate: false },
    { key: 'warehouse', label: '出库仓库', type: 'select', optionsUrl: '/BasicInfo/Warehouse/query', },
    { key: 'truck', label: '运输车辆', type: 'select', optionsUrl: '/BasicInfo/Truck/query', },
    { key: 'pickWorker', label: '提货人', type: 'select', optionsUrl: '/BasicInfo/Admin/query', },
    { key: 'lister', label: '制表人', type: 'select', optionsUrl: '/BasicInfo/Admin/query', },
    // { key: 'driveWorkers', label: '行车工', type: 'select', optionsUrl: '/BasicInfo/DriveWorker/query', },
    // { key: 'liftWorkers', label: '起重工', type: 'select', optionsUrl: '/BasicInfo/LiftWorker/query', },
    ...accountStatus,
    { key: 'totalAmount', label: '货物数量', increate: false },
    { key: 'totalVolume', label: '总体积', increate: false },
    { key: 'totalWeight', label: '总重量', increate: false},
    { key: 'RealOutStorageWeight', label: '实际出库重量', increate: false },
    { key: 'DriveWorkerAverageWeight', label: '行车工平均重量', increate: false },
    { key: 'LiftWorkerAverageWeight', label: '起重工平均重量', increate: false },
    { key: 'products', label: '明细', increate: false},
])