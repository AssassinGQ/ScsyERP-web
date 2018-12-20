<template>
    <table-view :fields="fields" base-url="/basic_info/route_info"/>
</template>
<script>
import TableView from '../components/table-view'

export default {
    name: 'route',
    components: { TableView },
    data: () => ({
        fields: [
            { key: 'name', label: '路线名称', },
            { key: 'transportsrc', label: '路线起点', },
            { key: 'transportdistance', label: '路线里程', },
            { key: 'transportdst', label: '路线终点', },
            { key: 'viaprovince', label: '途径省份', },
            { key: 'price', label: '单价', },
            { key: 'remark', label: '注意事项', },
        ]
    })
}
</script>