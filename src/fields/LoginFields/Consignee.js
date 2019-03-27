import loginField from '../BaseFields/LoginField.js'

export default Object.freeze([
    ...loginField,
    { key: 'address', label: '地址', nullAble: false },
    { key: 'manName', label: '联系人姓名', },
])