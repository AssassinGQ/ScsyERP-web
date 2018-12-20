<template>
    <table-view :fields="fields" base-url="/InStorageForm" :custom-actions="customActions" />
</template>
<script>
import TableView from '../../components/table-view'
import inStorageFormField from '../../fields/FormFields/InStorageForm.js'
// :create-result-labels="createResultLabels"
export default {
    name: 'in-storage-form',
    components: { TableView },
    data: () => ({
        fields: inStorageFormField,
        createResultLabels: {
            // UserName: '用户名',
            // password: '密码'
        },
        customActions: [{
            label: '添加明细',
            url: '/InStorageForm/addProduct',
            fields: [
                { key: 'inStorageNumber', label: '入库单' },
                { key: 'product', label: '货物', type: 'select', optionsUrl: '/BasicInfo/Product/query', }
            ],
            transformData: data => {
                data.inStorageForm = data.id;
                return data;
            }
        },{
            label: '移除明细',
            url: '/InStorageForm/removeProduct',
            fields: [
                { key: 'inStorageNumber', label: '入库单' },
                { key: 'product', label: '货物', type: 'select', optionsUrl: '/BasicInfo/Product/query', }
            ],
            transformData: data => {
                data.inStorageForm = data.id;
                return data;
            }
        },{
            label: '完成入库单',
            url: '/InStorageForm/complete',
            fields: [
                { key: 'inStorageNumber', label: '入库单' },
            ],
            transformData: data => {
                data.inStorageForm = data.id;
                return data;
            }
        }],
    })
}
</script>