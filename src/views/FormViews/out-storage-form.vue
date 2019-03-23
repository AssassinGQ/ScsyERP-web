<template>
    <table-view :fields="fields" base-url="/OutStorageForm" :custom-actions="customActions"  :page-query-param="pageQueryParam"/>
</template>
<script>
import TableView from '../../components/table-view'
import outStorageFormField from '../../fields/FormFields/OutStorageForm.js'
import store from '../../store'

export default {
    name: 'out-storage-form',
    components: { TableView },
    data: () => ({
        fields: outStorageFormField,
        pageQueryParam: [],
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