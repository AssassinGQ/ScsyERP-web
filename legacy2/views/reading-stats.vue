<template>
    <table-view :auto-query="!isCorpAdmin" :fields="fields" query-url="/document/queryDuration" :actions="false"/>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'reading-stats',
    computed: mapGetters(['isCorpAdmin']),
    data: () => ({
        fields: [
            { key: 'driversid', label: '驾驶员', type: 'select', optionsUrl: '/basic_info/driver_info/query', queryOnly: true },
            // { key: 'driver', label: '驾驶员1', type: 'select', optionsUrl: '/basic_info/driver_info/query', queryable: false, optionDisplayKey: 'name', autoQuery: true },
            { key: 'drivername', label: '姓名', queryable: false, type: 'name' },
            { key: 'docname', label: '资料名', type: 'name', optionsUrl: '/document/getList', queryable: false },
            { key: 'dur', label: '阅读时长', type: 'duration', queryable: false }
        ]
    })
}
</script>