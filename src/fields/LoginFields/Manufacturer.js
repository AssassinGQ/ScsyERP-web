import loginField from '../BaseFields/LoginField.js'

export default Object.freeze([
    ...loginField,
    { key: 'address', label: '地址', },
    { key: 'manName', label: '联系人姓名', },
    { key: 'workshops', label: '下属生产车间', },
])