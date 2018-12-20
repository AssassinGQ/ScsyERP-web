export default Object.freeze([
    { key: 'sid', label: '请求编号', },
    { key: 'drivername', label: '驾驶员', type: 'name' },
    { key: 'trucknumber', label: '车牌号', },
    { key: 'request_at', label: '请求时间', type: 'date' },
    {
        key: 'request', label: '请求类型', type: 'select',
        options: { 0: '左开锁', 1: '左关锁', 2: '右开锁', 3: '右关锁' }
    },
    { key: 'response_at', label: '响应时间', type: 'date' },
    {
        key: 'response', label: '响应结果', type: 'select',
        options: { 0: '同意', 1: '拒绝' }
    },
    { key: 'requestdesc', label: '司机描述', queryable: false },
    {
        key: 'status', label: '处理状态',
        options: { 0: '已请求', 1: '已回复', 2: '已处理' }
    },
])