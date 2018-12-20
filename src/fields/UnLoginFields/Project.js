import unLoginField from '../BaseFields/UnLoginField.js'

export default Object.freeze([
    ...unLoginField,
    { key: 'projectNumber', label: '项目工程号', },
    { key: 'customer', label: '客户', type: 'select', optionsUrl: '/BasicInfo/Customer/query', },
    { key: 'manufacturer', label: '生产厂家', type: 'select', optionsUrl: '/BasicInfo/Manufacturer/query', },
    { key: 'consignee', label: '收货方', type: 'select', optionsUrl: '/BasicInfo/Consignee/query', },
    { key: 'admin', label: '项目管理员', type: 'select', optionsUrl: '/BasicInfo/Admin/query', },
    { key: 'materials', label: '物料', type: 'select', optionsUrl: '/BasicInfo/Material/query', },
])