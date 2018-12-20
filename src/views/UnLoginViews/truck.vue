<template>
    <table-view :fields="fields" :create-result-labels="createResultLabels" base-url="/BasicInfo/Truck"/>
</template>
<script>
import TableView from '../../components/table-view'
import truckField from '../../fields/UnLoginFields/Truck.js'

export default {
    name: 'truck',
    components: { TableView },
    data: () => ({
        fields: truckField,
        createResultLabels: {
            // UserName: '用户名',
            // password: '密码'
        }
    })
}
</script>