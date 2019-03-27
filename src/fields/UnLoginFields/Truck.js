import unLoginField from '../BaseFields/UnLoginField.js'

export default Object.freeze([
    ...unLoginField,
    { key: 'carNumber', label: '车牌号', nullAble: false },
    { key: 'carLicense', label: '行驶证号', },
    { key: 'carId', label: '车辆识别号', },
    { key: 'affiliation', label: '所属单位', },
    { key: 'driver', label: '默认驾驶员', type: 'select', optionsUrl: '/BasicInfo/Driver/query', },
])