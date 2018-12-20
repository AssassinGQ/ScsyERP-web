<template>
    <table-view :fields="fields" :create-result-labels="createResultLabels" base-url="/BasicInfo/Project" :custom-actions="customActions" />
</template>
<script>
import TableView from '../../components/table-view'
import projectField from '../../fields/UnLoginFields/Project.js'

export default {
    name: 'project',
    components: { TableView },
    data: () => ({
        fields: projectField,
        createResultLabels: {
            // UserName: '用户名',
            // password: '密码'
        },
        customActions: [{
            label: '添加物料',
            url: '/BasicInfo/Project/addMaterial',
            fields: [
                { key: 'name', label: '工程项目', },
                { key: 'material', label: '物料', type: 'select', optionsUrl: '/BasicInfo/Material/query', }
            ],
            transformData: data => {
                data.project = data.id;
                return data;
            }
        },{
            label: '移除物料',
            url: '/BasicInfo/Project/removeMaterial',
            fields: [
                { key: 'name', label: '工程项目', },
                { key: 'material', label: '物料', type: 'select', optionsUrl: '/BasicInfo/Material/query', }
            ],
            transformData: data => {
                data.project = data.id;
                return data;
            }
        }],
    })
}
</script>