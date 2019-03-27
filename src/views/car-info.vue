<template>
    <table-view :fields="fields" :actions="actions" :custom-actions="customActions"
                query-url="/basic_info/truck_info/truckarchives_query"
                update-url="/basic_info/truck_info/truckarchives_update"
                topic-name="车辆"
    />
</template>
<script>
import TableView from '../components/table-view'

export default {
    name: 'car-info',
    components: { TableView },
    data: () => ({
        actions: ['edit'],
        fields: [
            { key: 'sid', label: '档案编号', editable: false },
            { key: 'trucknumber', label: '车牌号' },
            { key: 'manname', label: '联系人', queryable: false, type: 'name' },
            { key: 'manphone', label: '联系方式', queryable: false },
            { key: 'dlyszh', label: '道路运输证号', queryable: false },
            { key: 'jyfw', label: '经营范围', queryable: false },
            { key: 'cpys', label: '车辆颜色', queryable: false },
            { key: 'ygjg', label: '运管机构', queryable: false },
            { key: 'cx', label: '车型', queryable: false },
            {
                key: 'cxfl', label: '车型分类', queryable: false, type: 'select',
                options: { '小型车': '小型车', '中型车': '中型车', '大型车': '大型车' }
            },
            { key: 'fdjh', label: '发动机号', queryable: false },
            { key: 'dph', label: '底盘号', queryable: false },
            { key: 'cljsdj', label: '技术等级', queryable: false },
            { key: 'annalduration', label: '年审周期', queryable: false, editable: false, type: 'duration' },
            { key: 'lastannualtime', label: '上次年审时间', queryable: false, editable: false, type: 'date' },
            { key: 'secondduration', label: '二级审核周期', queryable: false, editable: false, type: 'duration' },
            { key: 'lastsecondtime', label: '上次二级审核时间', queryable: false, editable: false, type: 'date' },
            { key: 'lastsecondcontent', label: '上次二级审核内容', queryable: false, editable: false, },
        ],
        customActions: [{
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
    })
}
</script>