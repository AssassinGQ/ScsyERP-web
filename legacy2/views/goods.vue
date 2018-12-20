<template>
    <table-view :fields="fields" base-url="/basic_info/product_info"/>
</template>
<script>
import TableView from '../components/table-view'

export default {
    name: 'goods',
    components: { TableView },
    data: () => ({
        fields: [
            { key: 'name', label: '货物名称', },
            { key: 'unnumber', label: '联合国编号', },
            {
                key: 'type', label: '类别', type: 'select',
                options: new Array(8).fill(0).reduce((map, _, n) => {
                    map[n + 1] = `${n + 1}类`
                    return map
                }, {})
            },
            {
                key: 'packettype', label: '包装规格', type: 'select',
                options: { 1: '罐装', 2: '捆绑' }
            }
        ]
    })
}
</script>