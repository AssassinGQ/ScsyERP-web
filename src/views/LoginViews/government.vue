<template>
    <table-view :fields="fields" base-url="/BasicInfo/Admin" :actions="actions" :page-query-param="pageQueryParam" topic-name="政府"/>
</template>
<script>
import TableView from '../../components/table-view'
import governmentField from '../../fields/LoginFields/Government.js'
import store from '../../store'

export default {
    name: 'government',
    components: { TableView },
    data: () => ({
        actions: ['edit', 'delete'],
        fields: governmentField,
        pageQueryParam: [],
    }),
    created(){
        if(store.getters.isSuper){
            this.pageQueryParam = [];
        }else if(store.getters.isGov){
            this.pageQueryParam = [{key : "id", value : store.getters.user.userInfo}];
        }else{
            this.pageQueryParam = [{key : "id", value : "-1"}];
        }
    },
}
</script>