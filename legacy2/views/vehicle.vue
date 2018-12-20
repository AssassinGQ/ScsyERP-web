<template>
    <el-tabs :value="viewType" @tab-click="handleClick">
        <el-tab-pane label="牵引车信息" name="truckId">
            <table-view :fields="truckFields" :custom-actions="customActions" base-url="/basic_info/truck_info"/>
        </el-tab-pane>
        <el-tab-pane label="半挂车信息" name="trailer">
            <table-view :fields="trailerFields" base-url="/basic_info/trailer_info"/>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import TableView from '../components/table-view'

const driversid = { key: 'driversid', label: '驾驶员', type: 'select', queryOnly: true, optionsUrl: '/basic_info/driver_info/query' }
const escortsid = { key: 'escortsid', label: '押运员', type: 'select', queryOnly: true, optionsUrl: '/basic_info/escort_info/query' }
const trailersid = { key: 'trailersid', label: '半挂车', type: 'select', queryOnly: true, optionsUrl: '/basic_info/trailer_info/query', optionDisplayKey: 'trailernumber' }

export default {
    name: 'vehicle',
    components: { TableView },
    props: {
        viewType: String, // 'truck' or 'trailer',
        default: 'truckId'
    },

    data: () => ({
        truckFields: [
            { key: 'trucknumber', label: '车牌号', },
            {
                key: 'trucktype',
                label: '车辆类型',
                type: 'select',
                options: {
                    0: '牵引车',
                    1: '重型货车'
                }
            },
            { key: 'weight', label: '吨位', },
            // { key: 'drivername', label: '驾驶员', type: 'name' },
            driversid,
            // { key: 'escortname', label: '押运员', type: 'name' },
            escortsid,
            trailersid,
            { key: 'model', label: '厂牌型号', },
            { key: 'RTCnumber', label: '运输证号' },
            { key: 'RTCddl', label: '证件有效期', type: 'date' },
        ],
        trailerFields: [
            { key: 'trailernumber', label: '车牌号', },
            { key: 'weight', label: '吨位', },
            { key: 'vol', label: '容积', },
            { key: 'model', label: '厂牌型号', },
        ],
        customActions: [{
            label: '添加维修记录',
            url: '/basic_info/truck_info/truckmaintain_add',
            fields: [
                { key: 'jcrq', label: '进厂日期', type: 'date' },
                { key: 'wxdh', label: '维修单号' },
                { key: 'dph', label: '底盘号' },
                { key: 'wxnr', label: '维修内容' },
                { key: 'txf', label: '托修方' },
                { key: 'ccrq', label: '出厂日期', type: 'date' },
                { key: 'cllx', label: '车辆类型' },
                { key: 'txfdh', label: '联系方式' },
                { key: 'bxq', label: '有效期', type: 'duration' },
                { key: 'fyhj', label: '维修费用' },
            ]
        }, {
            label: '设置年审周期',
            url: '/basic_info/truck_info/truckarchives_setannualduration',
            fields: [{ key: 'annualduration', label: '年审周期', type: 'duration' }]
        }, {
            label: '设置二级审核周期',
            url: '/basic_info/truck_info/truckarchives_setsecondduration',
            fields: [{ key: 'secondduration', label: '二级审核周期', type: 'duration' }]
        }, {
            label: '年审录入',
            url: '/basic_info/truck_info/truckarchives_setlastannual',
            fields: [{ key: 'lastannualtime', label: '本次年审时间', type: 'date' }]
        }, {
            label: '二级审核录入',
            url: '/basic_info/truck_info/truckarchives_setlastsecond',
            fields: [
                { key: 'lastsecondtime', label: '二级审核时间', type: 'date' },
                { key: 'lastsecondcontent', label: '二级审核内容', type: 'textarea' }
            ]
        }]
    }),
    methods: {
        handleClick(tab) {
            this.$router.push(`/vehicle/${tab.name}`)
        }
    }
}
</script>