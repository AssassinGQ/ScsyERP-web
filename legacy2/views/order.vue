<template>
    <table-view ref="order_tableView" :fields="fields" base-url="/order" :limit="5"
                :actions="false" :custom-actions="customActions">
        <template slot="customActionComponent" slot-scope="scope">
            <template v-if="scope.label === '安检'">
                <template v-if="orderstatus.options[scope.row.orderstatus] === '已调度'">
                    <table border="1px" style="margin-bottom: 20px">
                        <tbody>
                            <tr>
                                <td align="center" colspan="2" style="background-color: #f1f5f7;color:#1e91ca;font-weight: bold;">车辆审核</td>
                            </tr>
                            <tr>
                                <td>道路运输证件齐全，在审核有效期内</td>
                                <td>承运人责任险在有效期内</td>
                            </tr>
                            <tr>
                                <td>二级维护在有效期内</td>
                                <td>罐式车辆罐体应在检验有效期内</td>
                            </tr>
                            <tr>
                                <td>车辆技术等级为一级</td>
                                <td>车辆状况正常</td>
                            </tr>
                            <tr>
                                <td>道路运输证核定的经营范围与拟运货物相符</td>
                                <td>整备质量是否与牵引车牵引总质量相匹配</td>
                            </tr>
                            <tr>
                                <td>车载卫星定位装置完好，工作正常</td>
                                <td>道路危险货物安全卡与拟运货物相符</td>
                            </tr>
                            <tr>
                                <td>警示标志灯、牌齐全，符合标准</td>
                                <td>已配备必要的安全防护设备</td>
                            </tr>
                            <tr>
                                <td align="center" style="background-color: #f1f5f7;color:#1e91ca;font-weight: bold;">驾驶员审核</td>
                                <td align="center" style="background-color: #f1f5f7;color:#1e91ca;font-weight: bold;">押运员审核</td>
                            <tr>
                            <tr>
                                <td>从业资格证在有效期内</td>
                                <td>从业资格证在有效期内</td>
                            </tr>
                            <tr>
                                <td>从业资格证诚信考核为合格</td>
                                <td>从业资格证诚信考核为合格</td>
                            </tr>
                            <tr>
                                <td>聘用合同在有效期内</td>
                                <td>聘用合同在有效期内</td>
                            </tr>
                            <tr>
                                <td>按期参加企业学习培训</td>
                                <td>按期参加企业学习培训</td>
                            </tr>
                            <tr>
                                <td>机动车驾驶证在审验有效期内</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div :class="$style.buttons">
                        <el-button type="primary" @click="submitSecurityCheck(true, scope)">通过</el-button>
                        <el-button type="danger" @click="submitSecurityCheck(false, scope)">不通过</el-button>
                    </div>
                </template>
                <template v-else>当前订单状态不可安检</template>
            </template>
            <template v-if="scope.label === '派发'">
                <div v-if="orderstatus.options[scope.row.orderstatus] === '已安检'">
                    <detail-view :fields="fields" :target="scope.row"/>
                    <div :class="$style.buttons">
                        <el-button type="primary" @click="submitOrderDistribute(scope)">确认派发</el-button>
                    </div>
                </div>
                <template v-else>当前订单状态不可派发</template>
            </template>
        </template>
    </table-view>
</template>
<style module>
    .buttons {
        display: flex;
        justify-content: flex-end;
    }
</style>
<script>
import DetailView from '../components/detail-view'
import TableView from '../components/table-view'
import FormView from '../components/form-view'
import { ORDER_FIELDS, TRUCK_LOG_FIELDS } from '../fields'
import { driversid, routesid, trucksid, trailersid, escortsid } from '../fields/common'
import { arrayToDict } from '../util'
import { POST } from '../api'
import { orderstatus } from '../fields/common'

const price = { key: 'price', label: '运输单价', type: 'number', queryOnly: true, optionsUrl: '/basic_info/route_info/query' }

const ORDER_DISPATCH_FIELDS = [
    trucksid, trailersid, driversid, escortsid, routesid,
    { key: 'distance', type: 'number', label: '里程' },
    { key: 'price', type: 'number', label: '运输单价' },
    { key: 'remark', label: '注意事项' },
]

import Vue from 'vue'

export default {
    name: 'order',
    computed: {
        customActions() {
            let { isCorp, isCorpAdmin, isBuyer, isSeller } = this.$store.getters
            return isBuyer
                ? this.buyerActions
                : isSeller
                    ? this.sellerActions
                    : (isCorpAdmin || isCorp)
                        ? this.adminActions
                        : []
        }
    },
    components: { FormView, TableView, DetailView },
    data: () => ({
        fields: ORDER_FIELDS.slice(),
        orderstatus: orderstatus,
        // 托运方
        sellerActions: [{
            label: '确认装货',
            url: '/order/load',
            fields: [
                { key: 'loadweight', label: '装货重量' },
                { key: 'zbweight', label: '折白重量' }
            ]
        }],
        // 收货方
        buyerActions: [{
            label: '确认卸货',
            url: '/order/unload',
            fields: [
                { key: 'unloadweight', label: '卸货重量' },
            ]
        }],
        // 承运方
        adminActions: [{
            label: '行车日志',
            queryUrl: '/trucklogs/query_new',
            queryParamKey: 'trucksid',
            fields: TRUCK_LOG_FIELDS,
            transformData: data => {
                for(let x in data){
                    console.debug(data[x]);
                }
                let lock = data.lock.replace(/-/g, '')
                new Array(5).fill(0).forEach((_, n) => {
                    data[`lock${n + 1}`] = lock[n] === '1' ? '关闭' : '打开'
                })
                return data
            }
        }, {
            label: '调度',
            url: '/order/dispatch',
            fields: ORDER_DISPATCH_FIELDS,
            transformData: data => {
                let fieldsByKey = arrayToDict(ORDER_DISPATCH_FIELDS)
                Object.keys(data).forEach(key => {
                    let field = fieldsByKey[key]
                    if (!field) return
                    if (field.type !== 'number') {
                        data[key] = '' + data[key] // convert to string
                    }
                })
                if (data.routesid && fieldsByKey.routesid.options && !data.distance) {
                    let routeData = fieldsByKey.routesid.options.find(({ value }) => value === data.routesid).data
                    Vue.set(data, 'distance', routeData.transportdistance)
                }
                if (data.routesid && fieldsByKey.routesid.options && !data.price) {
                    let routeData = fieldsByKey.routesid.options.find(({ value }) => value === data.routesid).data
                    Vue.set(data, 'price', routeData.price)
                }
                return data
            }
        }, {
            label: '安检', useSlot: true
        }, {
            label: '派发', useSlot: true
        }]
    }),
    methods: {
        submitSecurityCheck(pass, { row, done }) {
            POST('/order/check', { sid: row.sid, checkstatus: pass ? '0' : '1' }).then(done);
            this.$refs.order_tableView.search();
            // this.autoQuery && this.search()
            // ensureFieldOptions(this.fields)
        },
        submitOrderDistribute({ row, done }) {
            POST('/order/distribute', { sid: row.sid }).then(done)
            // this.autoQuery && this.search()
            // ensureFieldOptions(this.fields)
            this.$refs.order_tableView.search();
        }
    }
}
</script>