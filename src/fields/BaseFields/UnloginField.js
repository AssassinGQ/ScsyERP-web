import baseField from './BaseField.js';

export default Object.freeze([
    ...baseField,
    { key: 'phone', label: '手机号', },//可能为空
    { key: 'name', label: '名称', },
])