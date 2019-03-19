<template>
    <table-view :fields="fields" :create-result-labels="createResultLabels" base-url="/BasicInfo/Admin" query-param-key="id" :query-param-value="userId"/>
</template>
<script>
import TableView from '../../components/table-view'
import adminField from '../../fields/LoginFields/Admin.js'
import local from '../../store/modules/user'

export default {
    name: 'administrator',
    components: { TableView },
    data: () => ({
        fields: adminField,
        userId: local.state.user.id,
        createResultLabels: {
            UserName: '用户名',
            password: '密码'
        }
    })
}
</script>