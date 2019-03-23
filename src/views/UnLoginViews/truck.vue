<template>
    <table-view :fields="fields" base-url="/BasicInfo/Truck" :page-query-param="pageQueryParam"/>
</template>
<script>
import TableView from '../../components/table-view'
import truckField from '../../fields/UnLoginFields/Truck.js'
import store from '../../store'

export default {
    name: 'truck',
    components: { TableView },
    data: () => ({
        fields: truckField,
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