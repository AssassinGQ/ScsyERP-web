<template>
    <div>
        <form-view :target="government" :fields="fields"/>
        <el-button type="primary" @click.native="setData">修改</el-button>
    </div>
</template>
<script>
import { GET, POST } from '../api'
import FormView from '../components/form-view'

export default {
    name: 'government',
    components: { FormView },
    data: () => ({
        government: {
            name: undefined,
            phone: undefined,
            userName: undefined,
            passWord: undefined,
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
            GET('/user/query_government').then(government => {
                this.government = government
            })
        },
        setData() {
            let data = ['name', 'username', 'phone', 'password'].reduce((map, key) => {
                if (this.government[key]) map [key] = this.government[key]
                return map
            }, {})
            POST('/user/update_government', data).catch(this.getData)
        }
    },
    created() {
        this.getData()
    }
}
</script>