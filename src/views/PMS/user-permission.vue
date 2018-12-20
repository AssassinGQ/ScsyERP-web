<template>
    <table-view :fields="fields" :create-result-labels="createResultLabels" :actions="false" :custom-actions="customActions" query-url="/user/findAllUser"/>
</template>
<script>
import TableView from '../../components/table-view'
import baseField from '../../fields/BaseFields/BaseField.js'

export default {
    name: 'user-role-permission',
    components: { TableView },
    data: () => ({
        fields: [
            ...baseField,
            { key: 'userName', label: '用户名', },
        ],
        createResultLabels: {
            // UserName: '用户名',
            // password: '密码'
        },
        customActions: [{
            label: '给用户添加角色',
            url: '/Pms/addUserRole',
            fields: [
                { key: 'userName', label: '用户' },
                { key: 'role', label: '角色', type: 'select', optionsUrl: '/Pms/getAllRoles', }
            ],
            transformData: data => {
                data.user = data.id;
                return data;
            }
        },{
            label: '给用户移除角色',
            url: '/Pms/removeUserRole',
            fields: [
                { key: 'userName', label: '用户' },
                { key: 'role', label: '角色', type: 'select', optionsUrl: '/Pms/getAllRoles', }
            ],
            transformData: data => {
                data.user = data.id;
                return data;
            }
        },{
            label: '添加用户额外及屏蔽权限',
            url: '/Pms/addUserPermission',
            fields: [
                { key: 'userName', label: '用户' },
                { key: 'permission', label: '权限', type: 'select', optionsUrl: '/Pms/getAllPermissions', },
                { key: 'type', label: '类型', type: 'select', options:{0:'额外权限',1:'屏蔽权限'}, }
            ],
            transformData: data => {
                data.user = data.id;
                return data;
            }
        },{
            label: '移除用户额外及屏蔽权限',
            url: '/Pms/removeUserPermission',
            fields: [
                { key: 'userName', label: '用户' },
                { key: 'permission', label: '权限', type: 'select', optionsUrl: '/Pms/getAllPermissions', },
                { key: 'type', label: '类型', type: 'select', options:{0:'额外权限',1:'屏蔽权限'}, }
            ],
            transformData: data => {
                data.user = data.id;
                return data;
            }
        }],
    })
}
</script>