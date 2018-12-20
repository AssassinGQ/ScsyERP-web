<template>
    <div :class="$style.view">
        <div :class="$style.form">
            <h1 :class="$style.title">危化品运输平台</h1>
            <el-select :class="$style.select" placeholder="类型" v-model="type" type="select" size="medium" style="width: 320px">
                <el-option
                        v-for="(item, index) in options"
                        :key="index"
                        :label="item.label"
                        :value="item.value"/>
            </el-select>
            <el-input :class="$style.field" placeholder="名称" v-model="name" type="name"/>
            <el-input :class="$style.field" placeholder="用户名(不填则由系统生成)" v-model="userName" name="username"/>
            <el-input :class="$style.field" placeholder="密码(不填则由系统生成)" v-model="passWord" name="password"/>
            <el-input :class="$style.field" placeholder="手机号" v-model="phone" type="phone"/>
            <el-input :class="$style.field" placeholder="权限码" v-model="token" type="token"/>
            <el-button :class="$style.field" @click="getAccount" type="primary">生成账号</el-button>
        </div>
    </div>
</template>
<script>
    import {POST} from '../../api/index'

    export default {
        name: 'getAccount',
        data: () => ({
            token: '',
            type: '',
            name: '',
            userName: '',
            passWord: '',
            phone: '',
            options: [{
                value: '0',
                label: '承运方'
            }, {
                value: '1',
                label: '政府'
            }]
        }),
        methods: {
            getAccount() {
                let {token, type, name, userName, passWord, phone } = this
                POST('/user/getAccount', {token , type, name, UserName: userName, PassWord: passWord, Phone: phone})
                    .then(response=>{
                        this.userName = response.userName;
                        this.passWord = response.passWord;
                    })
            }
        }
    }
</script>
<style module>
    .view {
        background: white;
        /*height: 100vh;*/
        /*width: 100vw;*/
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