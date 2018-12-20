<template>
    <table-view :fields="fields" :create-result-labels="createResultLabels" base-url="/BasicInfo/Product"/>
</template>
<script>
import TableView from '../../components/table-view'
import productField from '../../fields/UnLoginFields/Product.js'

export default {
    name: 'product',
    components: { TableView },
    data: () => ({
        fields: productField,
        createResultLabels: {
            // UserName: '用户名',
            // password: '密码'
        }
    })
}
</script>