<template>
    <table-view :fields="fields" :create-result-labels="createResultLabels" base-url="/BasicInfo/Admin"/>
</template>
<script>
import TableView from '../components/table-view'
import adminField from '../fields/LoginFields/Admin.js'

export default {
    name: 'administrator',
    components: { TableView },
    data: () => ({
        fields: adminField,
        createResultLabels: {
            UserName: '用户名',
            password: '密码'
        }
    })
}
</script>