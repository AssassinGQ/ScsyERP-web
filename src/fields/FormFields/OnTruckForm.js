import formField from '../BaseFields/FormField.js'
import accountStatus from './AccountStatus.js'

export default Object.freeze([
    ...formField,
    { key: 'formNumber', label: '随车清单号', },
    { key: 'project', label: '项目工程', type: 'select', optionsUrl: '/BasicInfo/Project/query', },
    { key: 'outStorageForm', label: '出库单', type: 'select', optionsUrl: '/OutStorageForm/query', optionDisplayKey: 'outStorageNumber' },
    { key: 'tallyMan', label: '理货员', type: 'select', optionsUrl: '/BasicInfo/Admin/query', },
    { key: 'qualityTestMan', label: '质检放行员', type: 'select', optionsUrl: '/BasicInfo/Admin/query', },
    { key: 'signMan', label: '签收人', },
    { key: 'signTime', label: '签收时间', type: 'date' },
    ...accountStatus,
])