export default Object.freeze([
    { key: 'id', label: '用户编号', increate: false},
    { key: 'corporation', label: '所属承运方', type: 'select', optionsUrl: '/BasicInfo/Corporation/query', optionDisplayKey: 'userId', increate: false},
])