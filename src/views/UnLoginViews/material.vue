<template>
    <table-view :fields="fields" :create-result-labels="createResultLabels" base-url="/BasicInfo/Material"/>
</template>
<script>
import TableView from '../../components/table-view'
import materialField from '../../fields/UnLoginFields/Material.js'

export default {
    name: 'material',
    components: { TableView },
    data: () => ({
        fields: materialField,
        createResultLabels: {
            // UserName: '用户名',
            // password: '密码'
        }
    })
}
</script>