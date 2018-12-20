<template>
    <table-view :fields="fields" :create-result-labels="createResultLabels" base-url="/BasicInfo/Manufacturer" :custom-actions="customActions"/>
</template>
<script>
import TableView from '../../components/table-view'
import manufacturerField from '../../fields/LoginFields/Manufacturer.js'

export default {
    name: 'manufacturer',
        components: { TableView },
        data: () => ({
            fields: manufacturerField,
            createResultLabels: {
                UserName: '用户名',
                password: '密码'
            },
            customActions: [{
                label: '添加生产车间',
                url: '/BasicInfo/Manufacturer/addWorkshop',
                fields: [
                    { key: 'name', label: '生产厂家', },
                    { key: 'workshop', label: '生产车间', type: 'select', optionsUrl: '/BasicInfo/Workshop/query', }
                ],
                transformData: data => {
                    data.manufacturer = data.id;
                    return data;
                }
            },{
                label: '移除生产车间',
                url: '/BasicInfo/Manufacturer/removeWorkshop',
                fields: [
                    { key: 'name', label: '生产厂家', },
                    { key: 'workshop', label: '生产车间', type: 'select', optionsUrl: '/BasicInfo/Workshop/query', }
                ],
                transformData: data => {
                    data.manufacturer = data.id;
                    return data;
                }
            }],
        }),
        methods:{

        }
}
</script>