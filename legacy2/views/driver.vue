<template>
    <el-tabs :value="viewType" @tab-click="handleClick">
        <el-tab-pane label="驾驶员" name="driver" v-if="isDriver || isCorpAdmin || isSuperAdmin">
            <table-view :fields="fields" :actions="isGov ? false : undefined"
                        :additional-fields="additionalFields" base-url="/basic_info/driver_info"/>
        </el-tab-pane>
        <el-tab-pane label="押运员" name="escort" v-if="isEscort || isCorpAdmin || isSuperAdmin">
            <table-view :fields="fields" :actions="isGov ? false : undefined"
                        :additional-fields="additionalFields" base-url="/basic_info/escort_info"/>
        </el-tab-pane>
    </el-tabs>
</template>
<script>

import { mapGetters } from 'vuex'
import {
    TYPE_CORP_ADMIN,
    TYPE_SUPERADMIN,
    TYPE_DRIVER,
    TYPE_ESCORT,
} from '../store/modules/user'
import store from '../store'

export default {
    name: 'driver',
    computed: mapGetters(['isGov']),
    props: {
        viewType: String, // 'driver' or 'escort',
        default: 'driver'
    },
    data: () => ({
        fields: [
            { key: 'username', label: '用户名', columnSize: 'short', },
            { key: 'name', label: '姓名', type: 'name' },
            { key: 'phone', label: '手机', columnSize: 'medium', type: 'phone' },
            { key: 'QCnumber', label: '证件号码', },
            { key: 'QCddl', label: '证件有效期', type: 'date', columnSize: 'medium' },
            {
                key: 'status', label: '状态',
                type: 'select', columnSize: 'short',
                options: { 0: '空闲中', 1: '任务中' }
            }
        ],
        additionalFields: [
            { key: 'password', label: '密码', type: 'password' },
        ],
        isDriver: store.getters.user.type === TYPE_DRIVER,
        isEscort: store.getters.user.type === TYPE_ESCORT,
        isCorpAdmin: store.getters.user.type === TYPE_CORP_ADMIN,
        isSuperAdmin: store.getters.user.type === TYPE_SUPERADMIN
    }),
    methods: {
        handleClick(tab) {
            this.$router.push(`/driver/${tab.name}`)
        }
    }
}
</script>