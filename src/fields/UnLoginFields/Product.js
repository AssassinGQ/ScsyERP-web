import unLoginField from '../BaseFields/UnLoginField.js'

export default Object.freeze([
    ...unLoginField,
    { key: 'project', label: '所属项目', type: 'select', optionsUrl: '/BasicInfo/Project/query', },
    { key: 'material', label: '所属物料', type: 'select', optionsUrl: '/BasicInfo/Material/query', },
    { key: 'status', label: '货物状态', type: 'select', options: { 0: '待入库', 1: '已出库', 2: '已出库'}, increate: false},
    { key: 'packetNumber', label: '包号', },
    { key: 'warehouse', label: '所在仓库', type: 'select', optionsUrl: '/BasicInfo/Warehouse/query', increate: false},
    { key: 'warehouseLocation', label: '库位', increate: false},
    { key: 'inStorageForm', label: '入库单', type: 'select', optionsUrl: '/InStorageForm/query', increate: false},
    { key: 'outStorageForm', label: '出库单', type: 'select', optionsUrl: '/OutStorageForm/query', increate: false},
    { key: 'packetType', label: '包装类型', type: 'select',
        options: { 0: '铁框架', 1: '铁支架', 2: '木支架', 3: '铁箱',
            4: '木箱', 5: '捆扎', 6: '裸装'}, },
    { key: 'width', label: '宽度', },
    { key: 'height', label: '高度', },
    { key: 'length', label: '长度', },
    { key: 'weight', label: '重量', },
    { key: 'volume', label: '体积', },
])