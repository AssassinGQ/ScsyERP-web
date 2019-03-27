import unLoginField from '../BaseFields/UnLoginField.js'

export default Object.freeze([
    ...unLoginField,
    { key: 'address', label: '地址', nullAble: false },
    { key: 'manufacturer', label: '所属生产厂家', increate: false },
    { key: 'manName', label: '联系人姓名', },
])