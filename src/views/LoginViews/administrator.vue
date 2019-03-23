<template>
    <table-view :fields="fields" base-url="/BasicInfo/Admin" :page-query-param="pageQueryParam"/>
</template>
<script>
import TableView from '../../components/table-view'
import adminField from '../../fields/LoginFields/Admin.js'
import store from '../../store'

export default {
    name: 'administrator',
    components: { TableView },
    data: () => ({
        fields: adminField,
        pageQueryParam: [],
        // :create-result-labels="createResultLabels"
        // createResultLabels: {
        //     userName: '用户名',
        //     password: '密码'
        // }
    }),
    created(){
        if(store.getters.isSuper){
            this.pageQueryParam = [];
        }else if(store.getters.isCorp){
            this.pageQueryParam = [{key : "corporation", value : store.getters.user.corporation}];
        }else if(store.getters.isCorpAdmin){
            this.pageQueryParam = [{key : "id", value : store.getters.user.userInfo}];
        }else{
            this.pageQueryParam = [{key : "id", value : -1}];
        }
    },
}
</script>