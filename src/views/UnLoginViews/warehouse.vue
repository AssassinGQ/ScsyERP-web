<template>
    <table-view :fields="fields" :create-result-labels="createResultLabels" base-url="/BasicInfo/Warehouse" :custom-actions="customActions" />
</template>
<script>
import TableView from '../../components/table-view'
import warehouseField from '../../fields/UnLoginFields/Warehouse.js'

export default {
    name: 'warehouse',
    components: { TableView },
    data: () => ({
        fields: warehouseField,
        createResultLabels: {
            // UserName: '用户名',
            // password: '密码'
        },
        customActions: [{
            label: '添加行车工',
            url: '/BasicInfo/Warehouse/addDriveWorker',
            fields: [
                { key: 'name', label: '仓库' },
                { key: 'driveWorker', label: '行车工', type: 'select', optionsUrl: '/BasicInfo/DriveWorker/query', }
            ],
            transformData: data => {
                data.warehouse = data.id;
                return data;
            }
        },{
            label: '移除行车工',
            url: '/BasicInfo/Warehouse/removeDriveWorker',
            fields: [
                { key: 'name', label: '仓库' },
                { key: 'driveWorker', label: '行车工', type: 'select', optionsUrl: '/BasicInfo/DriveWorker/query', }
            ],
            transformData: data => {
                data.warehouse = data.id;
                return data;
            }
        },{
            label: '添加起重工',
            url: '/BasicInfo/Warehouse/addLiftWorker',
            fields: [
                { key: 'name', label: '仓库' },
                { key: 'liftWorker', label: '起重工', type: 'select', optionsUrl: '/BasicInfo/LiftWorker/query', }
            ],
            transformData: data => {
                data.warehouse = data.id;
                return data;
            }
        },{
            label: '移除起重工',
            url: '/BasicInfo/Warehouse/removeLiftWorker',
            fields: [
                { key: 'name', label: '仓库' },
                { key: 'liftWorker', label: '起重工', type: 'select', optionsUrl: '/BasicInfo/LiftWorker/query', }
            ],
            transformData: data => {
                data.warehouse = data.id;
                return data;
            }
        }],
    })
}
</script>