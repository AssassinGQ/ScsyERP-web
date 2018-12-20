<template>
    <table-view :fields="fields" :create-result-labels="createResultLabels" base-url="/BasicInfo/Corporation" :actions="actions"/>
</template>
<script>
import TableView from '../../components/table-view'
import corporationField from '../../fields/LoginFields/Corporation.js'

export default {
    name: 'corporation',
    components: { TableView },
    data: () => ({
        actions: ['edit', 'delete'],
        fields: corporationField,
        createResultLabels: {
            UserName: '用户名',
            password: '密码'
        }
    })
}
</script>