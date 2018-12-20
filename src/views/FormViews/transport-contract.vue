<template>
    <table-view :fields="fields" base-url="/TransportContract" :custom-actions="customActions"/>
</template>
<script>
import TableView from '../../components/table-view'
import transportContractField from '../../fields/FormFields/TransportContract.js'

export default {
    name: 'transport-contract',
    components: { TableView },
    data: () => ({
        fields: transportContractField,
        createResultLabels: {
            // UserName: '用户名',
            // password: '密码'
        },
        customActions: [{
            label: '完成',
            url: '/TransportContract/complete',
            fields: [
                { key: 'contractNumber', label: '运输合同' },
            ],
            transformData: data => {
                data.transportContract = data.id;
                return data;
            }
        }],
    }),
}
</script>