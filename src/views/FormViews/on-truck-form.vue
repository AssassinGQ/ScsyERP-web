<template>
    <table-view :fields="fields" base-url="/OnTruckForm" :custom-actions="customActions"/>
</template>
<script>
import TableView from '../../components/table-view'
import onTruckFormField from '../../fields/FormFields/OnTruckForm.js'

export default {
    name: 'on-truck-form',
    components: { TableView },
    data: () => ({
        fields: onTruckFormField,
        createResultLabels: {
            // UserName: '用户名',
            // password: '密码'
        },
        customActions: [{
            label: '添加图片',
            url: '/OnTruckForm/addPicture',
            fields: [
                { key: 'formNumber', label: '随车清单' },
                { key: 'picture', label: '图片', type: 'select', optionsUrl: '/MyFile/query', }
            ],
            transformData: data => {
                data.onTruckForm = data.id;
                return data;
            }
        },{
            label: '移除图片',
            url: '/OnTruckForm/removePicture',
            fields: [
                { key: 'formNumber', label: '随车清单' },
                { key: 'picture', label: '货物', type: 'select', optionsUrl: '/MyFile/query', }
            ],
            transformData: data => {
                data.onTruckForm = data.id;
                return data;
            }
        },{
            label: '完成',
            url: '/OnTruckForm/complete',
            fields: [
                { key: 'formNumber', label: '随车清单' },
            ],
            transformData: data => {
                data.onTruckForm = data.id;
                return data;
            }
        }],
    })
}
</script>