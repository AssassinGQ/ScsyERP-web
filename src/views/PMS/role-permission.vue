<template>
    <table-view :fields="fields" :create-result-labels="createResultLabels" :actions="false" :custom-actions="customActions" query-url="/Pms/getAllRoles" />
</template>
<script>
import TableView from '../../components/table-view'
import baseField from '../../fields/BaseFields/BaseField.js'

export default {
    name: 'role-permission',
    components: { TableView },
    data: () => ({
        fields: [
            ...baseField,
            { key: 'name', label: '角色名称', },
            { key: 'desc', label: '角色描述', },
        ],
        createResultLabels: {
            // UserName: '用户名',
            // password: '密码'
        },
        customActions: [{
            label: '添加角色',
            url: '/Pms/addRole',
            fields: [
                { key: 'roleName', label: '角色名称' },
                { key: 'roleDesc', label: '角色描述' },
                { key: 'superRoleName', label: '父角色', type: 'select', optionsUrl: '/Pms/getAllRoles', optionDisplayKey:'desc', optionValueKey:'name' }
            ],
            transformData: data => {
                data.role = data.id;
                return data;
            }
        },{
            label: '删除角色',
            url: '/Pms/removeRole',
            fields: [

            ],
            transformData: data => {
                data.role = data.id;
                return data;
            }
        },{
            label: '给角色添加权限',
            url: '/Pms/addRolePermission',
            fields: [
                { key: 'desc', label: '角色' },
                { key: 'permission', label: '权限', type: 'select', optionsUrl: '/Pms/getAllPermissions', }
            ],
            transformData: data => {
                data.role = data.id;
                return data;
            }
        },{
            label: '给角色移除权限',
            url: '/Pms/removeRolePermission',
            fields: [
                { key: 'desc', label: '角色' },
                { key: 'permission', label: '权限', type: 'select', optionsUrl: '/Pms/getAllPermissions', }
            ],
            transformData: data => {
                data.role = data.id;
                return data;
            }
        }],
    })
}
</script>