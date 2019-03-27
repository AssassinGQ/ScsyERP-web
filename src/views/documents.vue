<template>
    <table-view :fields="fields" :additional-fields="additionalFields" base-url="/document" query-url="/document/getList" topic-name="学习资料"/>
</template>
<script>
export default {
    name: 'documents',
    data: () => ({
        fields: [
            { key: 'title', label: '资料名', type: 'textarea' },
            { key: 'desc', label: '说明', type: 'textarea' },
        ],
        additionalFields: [{ key: 'content', label: '正文', type: 'textarea' }]
    })
}
</script>