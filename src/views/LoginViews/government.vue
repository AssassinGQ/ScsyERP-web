<template>
    <table-view :fields="fields" :create-result-labels="createResultLabels" base-url="/BasicInfo/Admin" :actions="actions"/>
</template>
<script>
import TableView from '../../components/table-view'
import governmentField from '../../fields/LoginFields/Government.js'

export default {
    name: 'government',
    components: { TableView },
    data: () => ({
        actions: ['edit', 'delete'],
        fields: governmentField,
        createResultLabels: {
            UserName: '用户名',
            password: '密码'
        }
    })
}
</script>