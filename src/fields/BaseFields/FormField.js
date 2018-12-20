import baseField from './BaseField.js';

export default Object.freeze([
    ...baseField,
    { key: 'ifCompleted', label: '是否已经完成', type: 'select', options: { 0: '已完成', 1: '未完成', }, },
])