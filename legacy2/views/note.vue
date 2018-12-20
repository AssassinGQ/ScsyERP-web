<template>
    <div>
        <el-form :inline="true">
            <el-form-item label="清空推送">
                <el-button type="danger" @click="reset" size="mini">清空</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="pushMessages" style="width:100%" border size="mini">
            <el-table-column prop="type" align="center" label="消息描述" :formatter="typeFormatter"></el-table-column>
            <el-table-column prop="time" align="center" label="推送时间" :formatter="dateFormatter"></el-table-column>
            <el-table-column prop="type" align="center" label="查看详情">
                <template slot-scope="scope">
                    <el-button @click="showDetail(scope.row)" type="text" size="small">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="titles[sidType] || '详情'" :visible.sync="detailDialogVisible" width="50%">
            <detail-view v-if="fields[sidType] && detail" :fields="fields[sidType]" :target="detail"/>
            <template v-if="sidType === SID_TYPE_HW_TEST && detail">
                <h1 :class="$style.title">异常信息</h1>
                <detail-view :fields="WARN_FIELDS" :target="detail.warnId"/>
                <h1 :class="$style.title">行车记录</h1>
                <detail-view :fields="TRUCK_LOG_FIELDS" :target="detail.trucklog"/>
            </template>
        </el-dialog>
        <div v-if="DEBUG" @click="push">推送测试</div>
    </div>
</template>
<script>
import { GET } from '../api'
import { mapGetters } from 'vuex'
import FormView from '../components/form-view'
import DetailView from '../components/detail-view'
import { WARN_FIELDS, ORDER_FIELDS, LOCK_FIELDS, TRUCK_LOG_FIELDS } from '../fields'
import { DEBUG } from '../util'

const SID_TYPE_ORDER = 0
const SID_TYPE_LOCK = 1
const SID_TYPE_WARNING = 2
const SID_TYPE_HW_TEST = 3

const QUERY_URLS = {
    [SID_TYPE_ORDER]: '/order/query',
    [SID_TYPE_LOCK]: '/lock/query',
    [SID_TYPE_WARNING]: '/warnId/query',
}

const TEST_WARN = {
    'drivername': '某某某',
    'warntime': 1521164916517,
    'updatedid': 0,
    'createdid': 0,
    'trucknumber': 'ABC456',
    'datastatus': 0,
    'sid': '424141938363990016',
    'corporationname': '某某某有限公司',
    'createdat': 1521164918282,
    'ordersid': '390864656639459328',
    'trucksid': 5,
    'warntype': 1,
    'driversid': 13,
    'corporationsid': 2,
    'gpsx': 116.41667,
    'status': 1,
    'gpsy': 39.91667,
    'updatedat': 1521164918576
}

export default {
    name: 'note-view',
    components: { FormView, DetailView },
    computed: mapGetters(['pushMessages']),
    data: () => ({
        DEBUG,
        SID_TYPE_HW_TEST,
        WARN_FIELDS,
        TRUCK_LOG_FIELDS,
        type: {
            '00': { value: '托运方已下订单', sidType: SID_TYPE_ORDER },
            '01': { value: '订单流程已派发', sidType: SID_TYPE_ORDER },
            '02': { value: '订单流程已回场', sidType: SID_TYPE_ORDER },
            '03': { value: '订单流程审核未通过,经司机修改完费用清单,现已提交', sidType: SID_TYPE_ORDER },
            '04': { value: '订单流程第一次审核通过', sidType: SID_TYPE_ORDER },
            '05': { value: '订单流程第二次审核通过', sidType: SID_TYPE_ORDER },
            '06': { value: '订单流程第三次审核通过', sidType: SID_TYPE_ORDER },
            '07': { value: '订单流程第四次审核通过', sidType: SID_TYPE_ORDER },
            '10': { value: '司机已上传锁请求', sidType: SID_TYPE_LOCK },
            '12': { value: '硬件平台已响应锁请求命令', sidType: SID_TYPE_LOCK },
            '21': { value: '硬件上传异常', sidType: SID_TYPE_WARNING },
            '22': { value: '硬件上传异常', sidType: SID_TYPE_WARNING },
            '23': { value: '司机响应异常', sidType: SID_TYPE_WARNING },
            '31': { value: '硬件测试中，收到来自硬件的反馈数据', sidType: SID_TYPE_HW_TEST }
        },
        fields: {
            [SID_TYPE_ORDER]: ORDER_FIELDS,
            [SID_TYPE_LOCK]: LOCK_FIELDS,
            [SID_TYPE_WARNING]: WARN_FIELDS
        },
        titles: {
            [SID_TYPE_ORDER]: '订单',
            [SID_TYPE_LOCK]: '锁请求信息',
            [SID_TYPE_WARNING]: '异常信息'
        },
        sid: ['订单', '锁请求信息', '异常信息'],
        detailDialogVisible: false,
        detail: undefined,
        sidType: undefined,
    }),
    methods: {
        push() {
            //push test
            // GET('/test/push', { username: this.$store.getters.user.username })
            this.$store.commit('receivePushMessage',
                // { sid: '404951311595864064', type: '00', time: Date.now() }
                {
                    type: '31', time: Date.now(),
                    content: JSON.stringify({ warnId: TEST_WARN, trucklog: {} })
                }
            )
        },
        reset() {
            this.$store.commit('resetSocket')
        },
        showDetail(row) {
            this.detail = undefined
            let { sidType } = this.type[row.type]
            this.sidType = sidType
            if (QUERY_URLS[sidType]) {
                GET(QUERY_URLS[sidType], { sid: row.sid })
                    .then(({ data: [detail] }) => {
                        this.detail = detail
                        this.detailDialogVisible = true
                    })
            } else if (sidType === SID_TYPE_HW_TEST) {
                this.detail = JSON.parse(row.content)
                this.detailDialogVisible = true
            }
        },
        dateFormatter(row) {
            return new Date(Number(row.time)).toLocaleString()
        },
        typeFormatter(row) {
            return this.type[row.type] ? this.type[row.type].value : 'undefined消息'
        }
    },
}
</script>
<style module>
    .title {
        margin-top: 0;
    }
</style>