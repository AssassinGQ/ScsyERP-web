import { ordersid } from './common'

export default Object.freeze([
    { key: 'corporationname', label: '公司名称', },
    { key: 'warntime', label: '异常时间', type: 'date' },
    { key: 'drivername', label: '司机', type: 'name' },
    // { key: 'gpsx', label: 'gpsx', },
    // { key: 'gpsy', label: 'gpsy', },
    ordersid,
    { key: 'trucknumber', label: '车牌号', },
    {
        key: 'status', label: '状态', type: 'select',
        options: { 0: '已创建', 1: '已推送', 2: '司机已经阅读', 3: '司机已经做出反馈' }
    },
    {
        key: 'warntype', label: '异常类型', type: 'select',
        options: {
            1: '安全锁异常',
            2: '泄露异常',
            3: '胎压异常',
            4: '油量异常',
            5: '超速异常',
            6: '停车异常',
            7: '疲劳驾驶异常',
            8: '急刹车异常',
            9: '急加速异常',
            10: '车辆事故',
            11: '超载异常',
        }
    }
])