<template>
    <table-view :fields="fields" :create-result-labels="createResultLabels" base-url="/BasicInfo/Workshop"/>
</template>
<script>
import TableView from '../../components/table-view'
import workshopField from '../../fields/UnLoginFields/Workshop.js'

export default {
    name: 'workshop',
    components: { TableView },
    data: () => ({
        fields: workshopField,
        createResultLabels: {
            // UserName: '用户名',
            // password: '密码'
        }
    })
}
</script>