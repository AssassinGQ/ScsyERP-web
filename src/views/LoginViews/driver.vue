<template>
    <table-view :fields="fields" :create-result-labels="createResultLabels" base-url="/BasicInfo/Driver"/>
</template>
<script>
import TableView from '../../components/table-view'
import driverField from '../../fields/LoginFields/Driver.js'

export default {
    name: 'driver',
    components: { TableView },
    data: () => ({
        fields: driverField,
        createResultLabels: {
            UserName: '用户名',
            password: '密码'
        }
    })
}
</script>