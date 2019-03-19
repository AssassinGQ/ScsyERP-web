<template>
    <table-view :fields="fields" base-url="/OnTruckForm" :custom-actions="customActions" :page-query-param="pageQueryParam"/>
</template>
<script>
import TableView from '../../components/table-view'
import onTruckFormField from '../../fields/FormFields/OnTruckForm.js'
import store from '../../store'

export default {
    name: 'on-truck-form',
    components: { TableView },
    data: () => ({
        fields: onTruckFormField,
        pageQueryParam: [],
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