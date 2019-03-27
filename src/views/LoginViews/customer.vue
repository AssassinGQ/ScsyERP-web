<template>
    <table-view :fields="fields" base-url="/BasicInfo/Customer" :page-query-param="pageQueryParam" topic-name="客户"/>
</template>
<script>
import TableView from '../../components/table-view'
import customerField from '../../fields/LoginFields/Customer.js'
import store from '../../store'

export default {
    name: 'customer',
    components: { TableView },
    data: () => ({
        fields: customerField,
        pageQueryParam: []
    }),
    created(){
        if(store.getters.isSuper){
            this.pageQueryParam = [];
        }else if(store.getters.isCorp){
            this.pageQueryParam = [{key : "corporation", value : store.getters.user.userInfo}];
        }else if(store.getters.isCorpAdmin){
            this.pageQueryParam = [{key : "corporation", value : store.getters.user.corporation}];
        }else if(store.getters.isCustomer){
            this.pageQueryParam = [{key : "id", value : store.getters.user.userInfo}];
        }else{
            this.pageQueryParam = [{key : "id", value : "-1"}];
        }
    },
}
</script>