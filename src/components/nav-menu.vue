//menu.vue;
<template>
    <div>
        <template v-for="list in this.menuList">
            <el-submenu index="1" v-if="list.children && list.children.length>0" :key="list.resourceId" :index="list.resourceName" >
                <template slot="title" >
                    <i class="el-icon-menu" ></i>
                    <span slot="title">{{ list.resourceName}}</span>
                </template>
                <Menu :menuList="list.children" :afterSeleted="afterSeleted" @foo="handleFoo" :ref="list.resourceId"  style="padding-left:20px"></Menu>
            </el-submenu>
            <el-menu-item v-else :index="list.resourceName"  :key="list.resourceId" v-on:click="selectClick(list)" >
                <span>{{list.resourceName}}</span>
            </el-menu-item>
        </template>
    </div>
</template>
<style>
    .el-menu--collapse  span,
    .el-menu--collapse  i.el-submenu__icon-arrow
    {
        height: 0;
        width: 0;
        overflow: hidden;
        visibility: hidden;
        display: inline-block;
    }
</style>
<script>
    export default{
        name:'Menu',//模板名称
        data(){
            return {
                // current:"O",
                isCollapse:false,//菜单展开功能
                unCollapse:{
                    width:'220px'
                },
                collapse:{
                    width:'50px'
                },
                unCollapseMain:{
                    paddingLeft:'220px'
                },
                collapseMain:{
                    paddingLeft:'50px'
                },
            }
        },
        beforeMount(){
        },
        props: {
            menuList:Array,
            afterSeleted:Function,
        },
        methods:{
            // setCurrent(id){
            //     this.current = id;
            //     this.$emit('foo', id);//通知父菜单
            //     if(this.$refs.id){
            //         console.log("callChild");
            //         this.$refs.id.setCurrent(id);//通知子菜单
            //     }
            // },
            selectClick(item){
                // this.setCurrent(id);
                if(this.afterSeleted)
                    this.afterSeleted(item.id);
            },
            handleFoo(id){
                // this.setCurrent(id);
            },
            // toggleClick(){//菜单展开功能
            //     this.isCollapse=!this.isCollapse;
            // }
        },
        computed:{
        }
    }
</script>