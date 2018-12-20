import loginField from '../BaseFields/LoginField.js'

export default Object.freeze([
    ...loginField,
    { key: 'dept', label: '部门', type: 'select', options: { 0: '运管部', 1: '交警部', 2: '环保部', 3: '消防部', 4: '安监部'}, },
])