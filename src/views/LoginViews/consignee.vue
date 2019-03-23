<template>
    <table-view :fields="fields" base-url="/BasicInfo/Consignee" :page-query-param="pageQueryParam"/>
</template>
<script>
import TableView from '../../components/table-view'
import consigneeField from '../../fields/LoginFields/Consignee.js'
import store from '../../store'

export default {
    name: 'consignee',
    components: { TableView },
    data: () => ({
        fields: consigneeField,
        pageQueryParam: [],
    }),
    created(){
        if(store.getters.isSuper){
            this.pageQueryParam = [];
        }else if(store.getters.isCorp){
            this.pageQueryParam = [{key : "corporation", value : store.getters.user.userInfo}];
        }else if(store.getters.isCorpAdmin){
            this.pageQueryParam = [{key : "corporation", value : store.getters.user.corporation}];
        }else if(store.getters.isConsignee){
            this.pageQueryParam = [{key : "id", value : store.getters.user.userInfo}];
        }else{
            this.pageQueryParam = [{key : "id", value : "-1"}];
        }
    },
}
</script>