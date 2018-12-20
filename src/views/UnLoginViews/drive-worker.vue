<template>
    <table-view :fields="fields" :create-result-labels="createResultLabels" base-url="/BasicInfo/DriveWorker"/>
</template>
<script>
import TableView from '../../components/table-view'
import driveWorkerField from '../../fields/UnLoginFields/DriveWorker.js'

export default {
    name: 'driver-worker',
    components: { TableView },
    data: () => ({
        fields: driveWorkerField,
        createResultLabels: {
            // UserName: '用户名',
            // password: '密码'
        }
    })
}
</script>