const sellersid = { key: 'sellersid', label: '托运方', type: 'select', queryOnly: true, optionsUrl: '/basic_info/seller_info/query' }
const loadaddr = { key: 'loadaddr', label: '装货地点', }
const loaddateddl = { key: 'loaddateddl', label: '预期装货时间', type: 'date', queryable: false, }
const sellerman = { key: 'sellerman', label: '联系人' }
const sellerphone = { key: 'sellerphone', label: '手机', type: 'phone' }
export const SELLER_INFO = Object.freeze([sellersid, loadaddr, loaddateddl, sellerman, sellerphone])

const buyersid = { key: 'buyersid', label: '收货方', type: 'select', queryOnly: true, optionsUrl: '/basic_info/buyer_info/query' }
const unloadaddr = { key: 'unloadaddr', label: '卸货地点', }
const unloaddateddl = { key: 'unloaddateddl', label: '预期卸货时间', type: 'date' }
const buyerman = { key: 'buyerman', label: '联系人' }
const buyerphone = { key: 'buyerphone', label: '手机', type: 'phone' }
export const BUYER_INFO = Object.freeze([buyersid, unloadaddr, unloaddateddl, buyerman, buyerphone])

const productsid = { key: 'productsid', label: '货物名称', type: 'select', queryOnly: true, optionsUrl: '/basic_info/product_info/query' }
const producttype = {
    key: 'producttype', label: '货物类型', type: 'select',
    options: new Array(8).fill(0).reduce((map, _, n) => {
        map[n + 1] = `${n + 1}类`
        return map
    }, {})
}
const packettype = { key: 'packettype', label: '包装类型', type: 'select', options: { 1: '罐装', 2: '捆绑' } }
const productweight = { key: 'productweight', label: '货物重量(吨)', queryable: false }
const productvol = { key: 'productvol', label: '货物体积(m³)', queryable: false }
export const PRODUCT_INFO = Object.freeze([productsid, producttype, packettype, productweight, productvol])

import { orderstatus } from './common'

export default Object.freeze([
    { key: 'sid', label: '订单号', columnWidth: '150px' },
    orderstatus,
    { key: 'ordertime', label: '创建时间', type: 'date' },
    sellersid,
    buyersid,
    productsid,
    { key: 'sellername', label: '托运方', queryable: false, type: 'name' },
    { key: 'buyername', label: '收货方', queryable: false, type: 'name' },
    { key: 'corporationname', label: '承运方', queryable: false, type: 'name' },
    loadaddr,
    unloadaddr,
    { key: 'sellerphone', label: '托运方手机', queryable: false, type: 'phone' },
    { key: 'buyerphone', label: '收货方手机', queryable: false, type: 'phone' },
    loaddateddl,
    unloaddateddl,
    { key: 'productname', label: '货物名称', queryable: false },
    producttype,
    productweight,
    productvol,
    { key: 'price', label: '运输单价', queryable: false, },
    { key: 'trucknumber', label: '车牌号', queryable: false, },
    { key: 'drivername', label: '驾驶员', queryable: false, type: 'name'},
    { key: 'escortname', label: '押运员', queryable: false, type: 'name' },
    { key: 'distributetime', label: '派发时间', type: 'date', queryable: false },
    { key: 'loadtime', label: '装货时间', type: 'date', queryable: false },
    { key: 'unloadtime', label: '卸货时间', type: 'date', queryable: false },
    { key: 'loadweight', label: '装货重量', queryable: false, },
    { key: 'zbweight', label: '折白重量', queryable: false, },
    { key: 'unloadweight', label: '卸货重量', queryable: false, },
    { key: 'returntime', label: '回场时间', type: 'date', queryable: false },
    { key: 'returnaddr', label: '回场地点', queryable: false, },
])