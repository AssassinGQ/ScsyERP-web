<template>
    <table-view :fields="fields"base-url="/BasicInfo/Warehouse" :custom-actions="customActions" :page-query-param="pageQueryParam"/>
</template>
<script>
import TableView from '../../components/table-view'
import warehouseField from '../../fields/UnLoginFields/Warehouse.js'
import store from '../../store'

export default {
    name: 'warehouse',
    components: { TableView },
    data: () => ({
        fields: warehouseField,
        pageQueryParam: [],
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
    }),
    created(){
        if(store.getters.isSuper){
            this.pageQueryParam = [];
        }else if(store.getters.isCorp){
            this.pageQueryParam = [{key : "corporation", value : store.getters.user.userInfo}];
        }else if(store.getters.isCorpAdmin){
            this.pageQueryParam = [{key : "corporation", value : store.getters.user.corporation}];
        }else{
            this.pageQueryParam = [{key : "id", value : "-1"}];
        }
    },
}
</script>