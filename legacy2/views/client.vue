<template>
    <div :class="Form.view">
        <el-tabs :value="viewType" @tab-click="handleClick">
            <el-tab-pane label="托运方信息" name="seller" v-if="isSeller || isCorp || isCorpAdmin || isSuperAdmin">
                <table-view :fields="fields" :additionalFields="additionalFields" :createResultLabels="createResultLabels"
                            base-url="/basic_info/seller_info"/>
            </el-tab-pane>
            <el-tab-pane label="收货方信息" name="buyer" v-if="isBuyer || isCorp || isCorpAdmin || isSuperAdmin">
                <table-view :fields="fields" :additionalFields="additionalFields" :createResultLabels="createResultLabels"
                            base-url="/basic_info/buyer_info"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import TableView from '../components/table-view'
import {
    TYPE_CORP_ADMIN,
    TYPE_SUPERADMIN,
    TYPE_CUSTOMER,
    TYPE_CONSIGNEE,
    TYPE_CORP
} from '../store/modules/user'
import store from '../store'

export default {
    name: 'client',
    components: { TableView },
    props: {
        viewType: String, // 'seller' or 'buyer',
        default: 'seller'
    },
    data: () => ({
        fields: [
            { key: 'username', label: '账号', },
            { key: 'name', label: '客户名称', type: 'name' },
            { key: 'manname', label: '联系人', type: 'name' },
            { key: 'phone', label: '联系电话', },
            { key: 'address', label: '默认地址', },
        ],
        additionalFields: [
            { key: 'password', label: '密码' },
        ],
        createResultLabels: {
            UserName: '用户名',
            password: '密码',
        },
        isSeller: store.getters.user.type === TYPE_CUSTOMER,
        isBuyer: store.getters.user.type === TYPE_CONSIGNEE,
        isCorp: store.getters.user.type === TYPE_CORP,
        isCorpAdmin: store.getters.user.type === TYPE_CORP_ADMIN,
        isSuperAdmin: store.getters.user.type === TYPE_SUPERADMIN
    }),
    methods: {
        handleClick(tab) {
            this.$router.push(`/client/${tab.name}`)
        }
    }
}
</script>
<style module="Form" src="../form.css"/>