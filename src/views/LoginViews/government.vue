<template>
    <table-view :fields="fields" :create-result-labels="createResultLabels" base-url="/BasicInfo/Admin" :actions="actions" :page-query-param="pageQueryParam"/>
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
        createResultLabels: {
            UserName: '用户名',
            password: '密码'
        }
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