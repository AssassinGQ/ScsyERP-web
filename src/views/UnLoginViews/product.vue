<template>
    <table-view :fields="fields" base-url="/BasicInfo/Product" :page-query-param="pageQueryParam" topic-name="货物"/>
</template>
<script>
import TableView from '../../components/table-view'
import productField from '../../fields/UnLoginFields/Product.js'
import store from '../../store'

export default {
    name: 'product',
    components: { TableView },
    data: () => ({
        fields: productField,
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