import unLoginField from '../BaseFields/UnLoginField.js'

export default Object.freeze([
    ...unLoginField,
    { key: 'address', label: '地址', },
    { key: 'admin', label: '仓库管理员', type: 'select', optionsUrl: '/BasicInfo/Admin/query', queryable:true, },
    { key: 'driveWorkers', label: '行车工', type: 'select', optionsUrl: '/BasicInfo/DriveWorker/query', },
    { key: 'liftWorkers', label: '起重工', type: 'select', optionsUrl: '/BasicInfo/LiftWorker/query', },
])