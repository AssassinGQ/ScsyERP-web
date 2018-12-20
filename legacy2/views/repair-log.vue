<template>
    <table-view :fields="fields" query-url="/basic_info/truck_info/truckmaintain_query"/>
</template>
<script>
import TableView from '../components/table-view'

export default {
    name: 'repair-log',
    components: { TableView },
    data: () => ({
        fields: [
            { key: 'trucknumber', label: '车牌号' },
            { key: 'dph', label: '底盘号', queryable: false },
            { key: 'wxdh', label: '维修单号', queryable: false },
            { key: 'txf', label: '托修方', queryable: false },
            { key: 'txfdh', label: '联系方式', queryable: false },
            { key: 'wxnr', label: '维修内容', queryable: false },
            { key: 'fyhj', label: '费用费用', queryable: false },
            { key: 'bxq', label: '有效期', type: 'duration', queryable: false }
        ]
    })
}
</script>