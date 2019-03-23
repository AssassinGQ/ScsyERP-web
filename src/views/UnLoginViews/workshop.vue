<template>
    <table-view :fields="fields" base-url="/BasicInfo/Workshop" :page-query-param="pageQueryParam"/>
</template>
<script>
import TableView from '../../components/table-view'
import workshopField from '../../fields/UnLoginFields/Workshop.js'
import store from '../../store'

export default {
    name: 'workshop',
    components: { TableView },
    data: () => ({
        fields: workshopField,
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