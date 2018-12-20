<template>
    <table-view :fields="fields" query-url="/exam/queryScore" :actions="false"/>
</template>
<script>
export default {
    name: 'scores',
    data: () => ({
        fields: [
            {
                key: 'driversid', label: '驾驶员', type: 'select',
                optionsUrl: '/basic_info/driver_info/query', queryOnly: true
            },
            { key: 'drivername', label: '姓名', queryable: false, type: 'name' },
            { key: 'examname', label: '试卷名', queryable: false },
            { key: 'score', label: '成绩', queryable: false },
            { key: 'time', label: '日期', type: 'date', queryable: false }
        ]
    })
}
</script>