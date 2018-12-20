<template>
    <div>
        <form-view :target="corporation" :fields="fields"/>
        <el-button type="primary" @click.native="setData">修改</el-button>
    </div>
</template>
<script>
import { GET, POST } from '../api'
import FormView from '../components/form-view'

export default {
    name: 'corporation',
    components: { FormView },
    data: () => ({
        corporation: {
            name: undefined,
            phone: undefined,
            UserName: undefined,
            password: undefined,
        },
        fields: [
            { key: 'name', label: '名称', type: 'name' },
            { key: 'phone', label: '联系方式' },
            { key: 'username', label: '用户名' },
            { key: 'password', label: '密码', type: 'password' },
        ],
    }),
    methods: {
        getData() {
            GET('/user/query_corporation').then(corporation => {
                this.corporation = corporation
            })
        },
        setData() {
            let data = ['name', 'username', 'phone', 'password'].reduce((map, key) => {
                if (this.corporation[key]) map [key] = this.corporation[key]
                return map
            }, {})
            POST('/user/update_corporation', data).catch(this.getData)
        }
    },
    created() {
        this.getData()
    }
}
</script>