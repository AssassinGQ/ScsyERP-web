import loginField from '../BaseFields/LoginField.js'

export default Object.freeze([
    ...loginField,
    { key: 'dept', label: '部门', type: 'select', options: { 0: '仓库管理员', 1: '项目管理员', 2: '财务管理员'}, },
])