<template>
    <table-view :fields="fields"  base-url="/BasicInfo/Project" :custom-actions="customActions" :page-query-param="pageQueryParam" topic-name="项目" />
</template>
<script>
import TableView from '../../components/table-view'
import projectField from '../../fields/UnLoginFields/Project.js'
import store from '../../store'

export default {
    name: 'project',
    components: { TableView },
    data: () => ({
        fields: projectField,
        pageQueryParam: [],
        customActions: [{
            label: '添加物料',
            url: '/BasicInfo/Project/addMaterial',
            fields: [
                { key: 'name', label: '工程项目', },
                { key: 'material', label: '物料', type: 'select', optionsUrl: '/BasicInfo/Material/query', }
            ],
            transformData: data => {
                data.project = data.id;
                return data;
            }
        },{
            label: '移除物料',
            url: '/BasicInfo/Project/removeMaterial',
            fields: [
                { key: 'name', label: '工程项目', },
                { key: 'material', label: '物料', type: 'select', optionsUrl: '/BasicInfo/Material/query', }
            ],
            transformData: data => {
                data.project = data.id;
                return data;
            }
        }],
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