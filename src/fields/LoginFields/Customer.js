import loginField from '../BaseFields/LoginField.js'

export default Object.freeze([
    ...loginField,
    { key: 'address', label: '地址', nullAble: false },
    { key: 'bank', label: '开户银行', },
    { key: 'taxNumber', label: '税号', },
])