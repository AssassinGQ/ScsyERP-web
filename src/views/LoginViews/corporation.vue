<template>
    <table-view :fields="fields" :create-result-labels="createResultLabels" base-url="/BasicInfo/Corporation" :actions="actions" :page-query-param="pageQueryParam"/>
</template>
<script>
import TableView from '../../components/table-view'
import corporationField from '../../fields/LoginFields/Corporation.js'
import store from '../../store'

export default {
    name: 'corporation',
    components: { TableView },
    data: () => ({
        actions: ['edit', 'delete'],
        fields: corporationField,
        pageQueryParam: [],
        createResultLabels: {
            UserName: '用户名',
            password: '密码'
        }
    }),
    created(){
        if(store.getters.isSuper){
            this.pageQueryParam = [];
        }else if(store.getters.isCorp){
            this.pageQueryParam = [{key : "id", value : store.getters.user.userInfo}];
        }else{
            this.pageQueryParam = [{key : "id", value : store.getters.user.corporation}];
        }
    },
}
</script>