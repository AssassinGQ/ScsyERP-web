<template>
    <table-view :fields="fields" base-url="/exam" query-url="/exam/getList"
                :custom-edit-component="$options.components.ExamView"/>
</template>
<script>
import ExamView from './exam'

export default {
    name: 'exams',
    components: { ExamView },
    data: () => ({
        fields: [
            { key: 'name', label: '试卷名称', span: 12 },
            { key: 'desc', label: '说明', span: 12 }
        ]
    })
}
</script>