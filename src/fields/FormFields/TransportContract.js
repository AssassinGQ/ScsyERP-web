import formField from '../BaseFields/FormField.js'

export default Object.freeze([
    ...formField,
    { key: 'contractNumber', label: '合同号', increate: false},
    { key: 'onTruckForm', label: '随车清单', type: 'select', optionsUrl: '/OnTruckForm/query', optionDisplayKey: 'formNumber', increate: false },
    { key: 'project', label: '项目工程', type: 'select', optionsUrl: '/BasicInfo/Project/query', optionDisplayKey: 'name', increate: false},
    { key: 'outStorageForm', label: '出库单号', type: 'select', optionsUrl: '/OutStorageForm/query', optionDisplayKey: 'outStorageNumber', increate: false},
    { key: 'truck', label: '运输车辆', type: 'select', optionsUrl: '/BasicInfo/Truck/query', optionDisplayKey: 'carNumber', increate: false },
    { key: 'supplier', label: '合供方', },
    { key: 'productInsurance', label: '货物保价', },
    { key: 'realWeight', label: '实际重量', },
    { key: 'fareByWeight', label: '按重量计算费用', },
    { key: 'totalFareByWeight', label: '总按重量计算费用', },
    { key: 'fareByTruck', label: '按车计算费用', },
    { key: 'prePay', label: '预付金额', },
    { key: 'oilCardType', label: '油卡类型', type: 'select', options: { 0: '中国石油', 1: '中国石化'}, },
    { key: 'oilCardNumber', label: '油卡卡号', },
    { key: 'oilCardMoney', label: '油卡预存金额', },
    { key: 'preRepairFee', label: '预付维修费', },
])