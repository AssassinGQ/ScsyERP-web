import { orderstatus, ordersid } from './common'

export default Object.freeze([
    ordersid,
    orderstatus,
    { key: 'sid', label: '费用清单号', columnWidth: '150px' },
    { key: 'drivername', label: '驾驶员', type: 'name' },
    { key: 'escortname', label: '押运员', type: 'name' },
    { key: 'mileload', label: '重车里程', queryable: false },
    { key: 'realloadweight', label: '重车过磅记录', queryable: false, type: 'detail' },
    { key: 'allowanceloadroadtoll', label: '重车过路奖励', queryable: false },
    { key: 'roadtollload', label: '重车过路费', queryable: false },
    { key: 'mileunload', label: '空车里程', queryable: false },
    { key: 'realunloadweight', label: '空车过磅记录', queryable: false, type: 'detail' },
    { key: 'allowanceunloadroadtoll', label: '空车过路奖励', queryable: false },
    { key: 'roadtollunload', label: '空车过路费', queryable: false },
    { key: 'roadtolltotal', label: '过路费合计', queryable: false },
    { key: 'miletotal', label: '里程共计', queryable: false },
    {
        key: 'addfuel', label: '加油记录', queryable: false, type: 'detail',
        detailLabels: {
            addfuelcash: '现金金额',
            addfuelmoney: '刷卡金额',
            addfuelvol: '加油升数',
        }
    },
    { key: 'addfuelvol', label: '加油量合计', queryable: false },
    { key: 'addfueltotal', label: '油费合计', queryable: false },
    { key: 'fareaddwater', label: '加水费', queryable: false },
    { key: 'faremaintain', label: '维修费', queryable: false },
    { key: 'farefine', label: '罚款', queryable: false },
    { key: 'fareother', label: '其他费用', queryable: false },
    { key: 'drivercash', label: '司机发生费用合计', queryable: false },
    { key: 'allowancetotal', label: '补助奖励合计', queryable: false },
    { key: 'images', label: '票据图片', queryable: false, type: 'image' }
])