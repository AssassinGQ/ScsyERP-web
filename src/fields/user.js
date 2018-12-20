export default Object.freeze([
    { key: 'id', label: '用户编号', },
    { key: 'userName', label: '用户名', type: 'name', },
    { key: 'userInfo', label: '用户信息编号', },
    { key: 'phone', label: '手机号', },
    {
        key: 'userType', label: '用户类型', type: 'select',
        options: { 8:'超级管理员', 2: '管理员', 3: '驾驶员', 5: '客户', 7: '收货方', 0: '承运方', 6: '生产厂家', 1:'政府', 4:'押运员' }
    },
])