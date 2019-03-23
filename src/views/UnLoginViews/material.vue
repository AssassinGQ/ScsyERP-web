<template>
    <table-view :fields="fields" base-url="/BasicInfo/Material" :page-query-param="pageQueryParam"/>
</template>
<script>
import TableView from '../../components/table-view'
import materialField from '../../fields/UnLoginFields/Material.js'
import store from '../../store'

export default {
    name: 'material',
    components: { TableView },
    data: () => ({
        fields: materialField,
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