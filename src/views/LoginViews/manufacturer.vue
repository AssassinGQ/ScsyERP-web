<template>
    <table-view :fields="fields" base-url="/BasicInfo/Manufacturer" :custom-actions="customActions" :page-query-param="pageQueryParam"/>
</template>
<script>
import TableView from '../../components/table-view'
import manufacturerField from '../../fields/LoginFields/Manufacturer.js'
import store from '../../store'

export default {
    name: 'manufacturer',
        components: { TableView },
        data: () => ({
            fields: manufacturerField,
            pageQueryParam: [],
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
        created(){
            if(store.getters.isSuper){
                this.pageQueryParam = [];
            }else if(store.getters.isCorp){
                this.pageQueryParam = [{key : "corporation", value : store.getters.user.userInfo}];
            }else if(store.getters.isCorpAdmin){
                this.pageQueryParam = [{key : "corporation", value : store.getters.user.corporation}];
            }else if(store.getters.isManufacturer){
                this.pageQueryParam = [{key : "id", value : store.getters.user.userInfo}];
            }else{
                this.pageQueryParam = [{key : "id", value : "-1"}];
            }
        },
        methods:{

        }
}
</script>