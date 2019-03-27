<template>
    <div :class="$style.view">
        <div :class="$style.form">
            <h1 :class="$style.title">工程物流运输管理平台</h1>
            <el-input :class="$style.field" placeholder="用户名" v-model="userName"/>
            <el-input :class="$style.field" placeholder="密码" v-model="passWord" type="password"/>
            <el-button :class="$style.field" @click="login" type="primary">登录</el-button>
            <!--todo 忘记密码-->
            <el-button :class="$style.field" type="text">忘记密码?</el-button>
        </div>
    </div>
</template>
<script>
import { POST } from '../../api/index'
import {
    TYPE_CORP,
    TYPE_CORP_ADMIN,
    TYPE_SUPERADMIN,
    TYPE_MANUFACTURER,
    TYPE_DRIVER,
    TYPE_ESCORT,
    TYPE_GOV
} from '../../store/modules/user'
import store from '../../store'

export default {
    name: 'login',
    data: () => ({
        userName: '',
        passWord: ''
    }),
    methods: {
        login() {
            let { userName, passWord } = this
            POST('/user/dologin', { userName, passWord })
                .then(user => {
                    this.$store.commit('receiveUser', user);
                    if(user.userType == TYPE_SUPERADMIN){
                        this.$router.push('/GetAccount')
                    } else if(user.userType == TYPE_GOV){
                        this.$router.push('/Government')
                    } else if(user.userType == TYPE_CORP){
                        this.$router.push('/Corporation')
                    } else if(user.userType == TYPE_CORP_ADMIN){
                        this.$router.push('/Admin')
                    } else if(user.userType == TYPE_DRIVER){
                        this.$router.push('/Driver/driver')
                    } else if(user.userType == TYPE_ESCORT){
                        this.$router.push('/Driver/escort')
                    } else if(user.userType == TYPE_CUSTOMER){
                        this.$router.push('/Customer')
                    } else if(user.userType == TYPE_MANUFACTURER){
                        this.$router.push('/Manufacturer')
                    } else if(user.userType == TYPE_CONSIGNEE){
                        this.$router.push('/Consignee')
                    } else{
                        this.$router.push('/order')
                    }
                })
        }
    }
}
</script>
<style module>
    .view {
        background: #eee;
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .title {
        text-align: center;
        margin: 0 0 20px 0;
    }
    .form {
        width: 400px;
        background: white;
        padding: 40px;
        box-sizing: border-box;
    }
    .field {
        margin: 16px 0 0 0 !important;
        width: 100%;
    }
</style>