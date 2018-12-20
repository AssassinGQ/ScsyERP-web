<template>
    <table-view ref="fee_tableView" :fields="fields" base-url="/fareform" :limit="5" :actions="false"
                :custom-actions="customActions">
        <template slot="customActionComponent" slot-scope="scope">
            <template v-if="scope.label === '一审'">
                <detail-view :fields="firstCheckFields" :rows="2"
                             :queryUrl="QUERY_URLS[1]" :queryParam="{ ordersid: scope.row.ordersid }">
                    <el-form-item label="审批说明" size="mini">
                        <b slot="label">审批说明</b>
                        <el-input placeholder="审批说明" type="textarea" v-model="verifyret"></el-input>
                    </el-form-item>
                </detail-view>
                <div :class="$style.buttons">
                    <el-button type="primary" @click="submitCheck(1, true, scope)">通过</el-button>
                    <el-button type="danger" @click="submitCheck(1, false, scope)">不通过</el-button>
                </div>
            </template>
            <template v-for="n in 3">
                <template v-if="scope.label === CHINESE_NUM[n + 1] + '审'">
                    <detail-view :fields="fields" :rows="16"
                                 :queryUrl="QUERY_URLS[n + 1]" :queryParam="{ ordersid: scope.row.ordersid }">
                        <el-form-item label="审批说明" size="mini">
                            <b slot="label">审批说明</b>
                            <el-input :rows="10" placeholder="审批说明" type="textarea" v-model="verifyret"></el-input>
                        </el-form-item>
                    </detail-view>
                    <div :class="$style.buttons">
                        <el-button type="primary" @click="submitCheck(n + 1, true, scope)">通过</el-button>
                        <el-button type="danger" @click="submitCheck(n + 1, false, scope)">不通过</el-button>
                    </div>
                </template>
            </template>
        </template>
    </table-view>
</template>
<style module>
    .buttons {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
    }
</style>
<script>
import TableView from '../components/table-view'
import DetailView from '../components/detail-view'
import { FAREFORM_FIELDS, ORDER_FIELDS } from '../fields'
import { POST } from '../api'

const CHECK_URLS = {
    1: '/order/verifyppp',
    2: '/order/verifypp',
    3: '/order/verifyp',
    4: '/order/verify'
}

const QUERY_URLS = {
    1: '/fareform/getVerifypppdata',
    2: '/fareform/getVerifyppdata',
    3: '/fareform/getVerifypdata',
    4: '/fareform/getVerifydata'
}

export default {
    name: 'fee-check',
    components: { TableView, DetailView },
    data: () => ({
        QUERY_URLS,
        CHINESE_NUM: { 2: '二', 3: '三', 4: '四' },
        fields: FAREFORM_FIELDS,
        customActions: [{
            label: '查看订单',
            queryUrl: '/order/query',
            queryParamKey: 'ordersid',
            fields: ORDER_FIELDS
        }, {
            label: '一审', useSlot: true,
        }, {
            label: '二审', useSlot: true,
        }, {
            label: '三审', useSlot: true,
        }, {
            label: '四审', useSlot: true,
        }],
        verifyret: '', // 审批说明
        firstCheckFields: [
            { key: 'mileload_driver', label: '重车里程', type: 'number' },
            { key: 'mileunload_driver', label: '空车里程', type: 'number' },
            { key: 'miletotal_driver', label: '里程共计', type: 'number' },
            { key: 'milereal', label: '硬件上次里程', type: 'number' }
        ]
    }),
    methods: {
        submitCheck(stage, pass, { row, done }) {
            POST(CHECK_URLS[stage], {
                sid: row.ordersid,
                verifyret: this.verifyret,
                verifystatus: pass ? 0 : 1
            }).then(done)
            this.$refs.fee_tableView.search();
        }
    }
}
</script>