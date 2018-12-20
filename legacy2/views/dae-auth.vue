<template>
    <table-view :fields="fields" base-url="/user" query-url="/user/getList" :limit="5" :actions="false"
                :custom-actions="customActions">
        <template slot="customActionComponent" slot-scope="scope">
            <template v-if="scope.label === '修改权限'">
                <detail-view :fields="fields" :rows="2"
                             queryUrl="/user/getById" :queryParam="{ sid: scope.row.sid }">
                </detail-view>
                <div :class="$style.buttons">
                    <el-button v-if="scope.row.isdocauthd === 0" type="primary" @click="submitCheck(false, scope)">取消授权</el-button>
                    <el-button v-if="scope.row.isdocauthd === 1" type="primary" @click="submitCheck(true, scope)">授权</el-button>
                </div>
            </template>
        </template>
    </table-view>
</template>
<style module>
    .buttons {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
    }
</style>
<script>
import TableView from '../components/table-view'
import DetailView from '../components/detail-view'
import { USER_FIELDS } from '../fields'
import { POST } from '../api'

const AUTH_URLS = {
    true: '/auth/dae/adduser',
    false: '/auth/dae/removeuser',
}

export default {
    name: 'dae-auth',
    components: { TableView, DetailView },
    data: () => ({
        fields: USER_FIELDS,
        customActions: [{
            label: '修改权限', useSlot: true,
        }],
    }),
    methods: {
        submitCheck(auth, { row, done }) {

            POST(AUTH_URLS[auth], {
                usersid: row.sid
            }).then(done)
        }
    }
}
</script>