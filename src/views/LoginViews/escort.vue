<template>
    <table-view :fields="fields" :create-result-labels="createResultLabels" base-url="/BasicInfo/Escort"/>
</template>
<script>
import TableView from '../../components/table-view'
import escortField from '../../fields/LoginFields/Escort.js'

export default {
    name: 'escort',
    components: { TableView },
    data: () => ({
        fields: escortField,
        createResultLabels: {
            UserName: '用户名',
            password: '密码'
        }
    })
}
</script>