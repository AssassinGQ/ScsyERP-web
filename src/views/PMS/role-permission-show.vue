<template>
    <div>
        <div style="width:50%;height:100%;float:left;">
            <el-menu class="el-menu-role" >
                <Menu :menuList="this.roleList" :afterSeleted="roleSelected" ></Menu>
            </el-menu>
        </div>
        <div style="width:50%;height:100%;float:left;">
            <ul v-for="item in permissions">
                <li :id="item.id" :class="item.mclass" v-on:click="permissionClick(item.id)" >{{item.desc}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import Menu from '../../components/nav-menu.vue';
    // import Ui_Menu from '../../components/ui-menu.vue';
    import { GET } from '../../api/index'

    export default{
        components:{
            Menu,
            // Ui_Menu
        },
        data(){
            return {
                roleList:[],
                permissionList:[],
                permissions:[],
                role_permissions:[],
            }
        },
        mounted(){
            GET('/Pms/getRolesInherit', {}).then(data=>{
                this.roleList = data.data;
            });
            GET('/Pms/getAllPermissions', {}).then(data=>{
                this.permissionList = data.data;
                for(let x in this.permissionList){
                    let item = this.permissionList[x];
                    let id = item.id;
                    let name = item.name;
                    let desc = item.desc;
                    this.permissions.push({id: id, name: name, desc: desc, mclass: 'li-l'})
                }
            })
        },
        methods:{
            roleSelected(id){
                this.permissions.forEach(function (item) {
                    item.mclass = 'li-l';
                })
                GET('/Pms/getRolePermission', {role: id}).then(data=>{
                    this.role_permissions = data.data;
                    if(this.role_permissions && this.permissions){
                        this.role_permissions.forEach(item1 =>{
                            this.permissions.forEach(function (item) {
                                if(item.id == item1.id){
                                    item.mclass = 'li-z';
                                }
                            })
                        })
                    }
                })
            },
            permissionClick(id){
            },
        },
    }
</script>
<style>
    /*正选中*/
    .li-z{
        margin: 10px;
        color: #0000FF;
        background: #ffffff;
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
        color: #c7254e;
        background: #ffffff;
    }
</style>