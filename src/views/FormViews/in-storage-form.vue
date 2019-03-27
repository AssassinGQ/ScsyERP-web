<template>
    <table-view :fields="fields" base-url="/InStorageForm" :custom-actions="customActions" :page-query-param="pageQueryParam" topic-name="入库单" />
</template>
<script>
import TableView from '../../components/table-view'
import inStorageFormField from '../../fields/FormFields/InStorageForm.js'
import store from '../../store'
// :create-result-labels="createResultLabels"
export default {
    name: 'in-storage-form',
    components: { TableView },
    data: () => ({
        fields: inStorageFormField,
        pageQueryParam: [],
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