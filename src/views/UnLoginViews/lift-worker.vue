<template>
    <table-view :fields="fields" :create-result-labels="createResultLabels" base-url="/BasicInfo/LiftWorker"/>
</template>
<script>
import TableView from '../../components/table-view'
import liftWorkerField from '../../fields/UnLoginFields/LiftWorker.js'

export default {
    name: 'lift-worker',
    components: { TableView },
    data: () => ({
        fields: liftWorkerField,
        createResultLabels: {
            // UserName: '用户名',
            // password: '密码'
        }
    })
}
</script>