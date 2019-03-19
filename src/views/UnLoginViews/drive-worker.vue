<template>
    <table-view :fields="fields" :create-result-labels="createResultLabels" base-url="/BasicInfo/DriveWorker" :page-query-param="pageQueryParam"/>
</template>
<script>
import TableView from '../../components/table-view'
import driveWorkerField from '../../fields/UnLoginFields/DriveWorker.js'
import store from '../../store'

export default {
    name: 'driver-worker',
    components: { TableView },
    data: () => ({
        fields: driveWorkerField,
        pageQueryParam: [],
        createResultLabels: {
            // UserName: '用户名',
            // password: '密码'
        }
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