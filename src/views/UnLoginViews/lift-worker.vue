<template>
    <table-view :fields="fields" base-url="/BasicInfo/LiftWorker" :page-query-param="pageQueryParam" topic-name="起重工"/>
</template>
<script>
import TableView from '../../components/table-view'
import liftWorkerField from '../../fields/UnLoginFields/LiftWorker.js'
import store from '../../store'

export default {
    name: 'lift-worker',
    components: { TableView },
    data: () => ({
        fields: liftWorkerField,
        pageQueryParam: [],
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