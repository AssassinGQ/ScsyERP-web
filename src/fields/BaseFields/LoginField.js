import baseField from './BaseField.js';

export default Object.freeze([
    ...baseField,
    { key: 'userName', label: '用户名', },//todo 后台添加join查询，前端添加专用的按钮修改用户名，密码，手机号（修改接口已做）
    { key: 'passWord', label: '密码', },
    { key: 'phone', label: '手机号', nullAble: false },
    { key: 'name', label: '名称', },
    { key: 'userId', label: '登录信息', queryOnly:true, increate: false },
])