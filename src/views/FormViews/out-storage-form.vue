<template>
    <table-view :fields="fields" base-url="/OutStorageForm" :custom-actions="customActions" />
</template>
<script>
import TableView from '../../components/table-view'
import outStorageFormField from '../../fields/FormFields/OutStorageForm.js'

export default {
    name: 'out-storage-form',
    components: { TableView },
    data: () => ({
        fields: outStorageFormField,
        createResultLabels: {
            // UserName: '用户名',
            // password: '密码'
        },
        customActions: [{
            label: '添加明细',
            url: '/OutStorageForm/addProduct',
            fields: [
                { key: 'outStorageNumber', label: '出库单' },
                { key: 'product', label: '货物', type: 'select', optionsUrl: '/BasicInfo/Product/query', }
            ],
            transformData: data => {
                data.outStorageForm = data.id;
                return data;
            }
        },{
            label: '移除明细',
            url: '/OutStorageForm/removeProduct',
            fields: [
                { key: 'outStorageNumber', label: '出库单' },
                { key: 'product', label: '货物', type: 'select', optionsUrl: '/BasicInfo/Product/query', }
            ],
            transformData: data => {
                data.outStorageForm = data.id;
                return data;
            }
        },{
            label: '完成出库单',
            url: '/OutStorageForm/complete',
            fields: [
                { key: 'outStorageNumber', label: '出库单' },
            ],
            transformData: data => {
                data.outStorageForm = data.id;
                return data;
            }
        }],
    })
}
</script>