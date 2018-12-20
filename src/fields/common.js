export const trucksid = {
    key: 'trucksid', label: '牵引车', type: 'select', optionsUrl: '/basic_info/truck_info/query',
    optionDisplayKey: 'trucknumber'
}
export const trailersid = {
    key: 'trailersid', label: '半挂车', type: 'select', optionsUrl: '/basic_info/trailer_info/query',
    optionDisplayKey: 'trailernumber'
}
export const driversid = { key: 'driversid', label: '驾驶员', type: 'select', optionsUrl: '/basic_info/driver_info/query' }
export const routesid = { key: 'routesid', label: '路线名称', type: 'select', optionsUrl: '/basic_info/route_info/query' }
export const escortsid = { key: 'escortsid', label: '押运员', type: 'select', optionsUrl: '/basic_info/escort_info/query' }

export const ordersid = { key: 'ordersid', label: '订单号', columnWidth: '150px' }
export const orderstatus = {
    key: 'orderstatus', label: '订单状态', type: 'select',
    options: {
        0: '已下单',
        1: '已调度',
        2: '已安检',
        3: '已派发',
        4: '已接单',
        5: '已装货',
        6: '已卸货',
        7: '已回场',
        9: '一审通过',
        10: '二审通过',
        11: '三审通过',
        12: '四审通过',
        13: '审核失败',
    }
}