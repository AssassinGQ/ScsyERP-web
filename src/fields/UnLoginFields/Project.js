import unLoginField from '../BaseFields/UnLoginField.js'

export default Object.freeze([
    ...unLoginField,
    { key: 'projectNumber', label: '项目工程号', increate: false},
    { key: 'customer', label: '客户', type: 'select', optionsUrl: '/BasicInfo/Customer/query', nullAble: false },
    { key: 'manufacturer', label: '生产厂家', type: 'select', optionsUrl: '/BasicInfo/Manufacturer/query', nullAble: false },
    { key: 'consignee', label: '收货方', type: 'select', optionsUrl: '/BasicInfo/Consignee/query', nullAble: false },
    { key: 'admin', label: '项目管理员', type: 'select', optionsUrl: '/BasicInfo/Admin/query', nullAble: false },
    { key: 'materials', label: '物料', type: 'select', optionsUrl: '/BasicInfo/Material/query', increate: false},
])