<template>
    <div>
        <div style="width:50%;height:100%;float:left;">
            <ul v-for="item in users">
                <li :id="item.id" :class="item.mclass" v-on:click="userClick(item.id)" >{{item.name}}</li>
            </ul>
        </div>
        <div style="width:50%;height:100%;float:left;">
            <ul v-for="item in roles">
                <li :id="item.id" :class="item.mclass" >{{item.desc}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
    // import Menu from '../../components/right-nav-menu.vue';
    // import Ui_Menu from '../../components/ui-menu.vue';
    import { GET } from '../../api/index'

    export default{
        components:{
            // Menu,
            // Ui_Menu
        },
        data(){
            return {
                userList:[],
                users:[],
                roleList:[],
                roles:[],
            }
        },
        mounted(){
            GET('/user/findAllUser', {}).then(data=>{
                this.userList = data.data;
                for(let x in this.userList){
                    let user = this.userList[x];
                    let id = user.id;
                    let userName = user.userName;
                    let userType = user.userType;
                    this.users.push({id: id, name: userName, type: userType, mclass:'li-l'})
                }
            });
            GET('/Pms/getAllRoles', {}).then(data=>{
                this.roleList = data.data;
                for(let x in this.roleList){
                    let role = this.roleList[x];
                    let id = role.id;
                    let name = role.name;
                    let desc = role.desc;
                    this.roles.push({id: id, name: name, desc: desc, mclass:'li-l'})
                }
            });
        },
        methods:{
            userClick(id){
                //全部变成白底，除了选中的变成li-z
                this.users.forEach(item => {
                    if(item.id == id)
                        item.mclass = 'li-z';
                    else
                        item.mclass = 'li-l';
                })
                //查询user-role
                this.roles.forEach(role => {
                    role.mclass = 'li-l';
                })
                GET('/Pms/getUserRoles', {user: id}).then(data=>{
                    for(let x in data.data){
                        let item = data.data[x];
                        let id = item.id;
                        this.roles.forEach(role => {
                            if(role.id == id) {
                                role.mclass = 'li-z';
                            }
                        })
                    }
                });
            },
        },
    }
</script>
<style>
    /*正选中*/
    .li-z{
        margin: 10px;
        color: #000000;
        background: #1e91ca;
    }
    /*没选中*/
    .li-l{
        margin: 10px;
        color: #000000;
        background: #ffffff;
    }
    /*负选中*/
    .li-f{
        margin: 10px;
        color: #000000;
        background: #c7254e;
    }
</style>