<template>
    <table-view :fields="fields" base-url="/TransportContract" :actions="actions" :custom-actions="customActions" :page-query-param="pageQueryParam" topic-name="运输合同"/>
</template>
<script>
import TableView from '../../components/table-view'
import transportContractField from '../../fields/FormFields/TransportContract.js'
import store from '../../store'

export default {
    name: 'transport-contract',
    components: { TableView },
    data: () => ({
        fields: transportContractField,
        actions: ['edit', 'delete'],
        pageQueryParam: [],
        customActions: [{
            label: '完成',
            url: '/TransportContract/complete',
            fields: [
                { key: 'contractNumber', label: '运输合同' },
            ],
            transformData: data => {
                data.transportContract = data.id;
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