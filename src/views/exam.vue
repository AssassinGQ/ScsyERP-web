<template>
    <div>
        <el-form size="mini" label-position="top">
            <el-form-item label="名称">
                <el-input v-model="target.name"/>
            </el-form-item>
            <el-form-item label="说明">
                <el-input type="textarea" :maxlength="30" v-model="target.desc"/>
            </el-form-item>
            <el-form-item label="题目">
                <el-card :class="$style.question"
                         v-for="({ score, question, choices, questionid, answer }, index) in questions"
                         :key="questionid">
                    <div :class="$style.questionHeader" slot="header">
                        <h3 :class="$style.questionTitle">{{ index + 1 }}. ({{ score }}分) {{ question }}</h3>
                        <el-button size="mini" @click.native="editQuestion" :data-id="questionid"
                                   :class="$style.questionEdit">
                            编辑
                        </el-button>
                        <el-button size="mini" @click.native="deleteQuestion" :data-id="questionid"
                                   :class="$style.questionEdit">
                            删除
                        </el-button>
                    </div>
                    <div :class="choice === answer ? $style.answer : $style.choice" v-for="(desc, choice) in choices"
                         :key="choice">
                        {{ choice }}. {{ desc }}
                    </div>
                </el-card>
                <el-button type="primary" @click.native="addQuestion">添加题目</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="编辑问题" append-to-body v-if="showQuestionDialog" :visible="true"
                   :before-close="handleQuestionClose">
            <el-form size="mini" :model="editingQuestion" label-width="60px">
                <el-form-item label="问题">
                    <el-input v-model="editingQuestion.question"/>
                </el-form-item>
                <el-form-item label="分值">
                    <el-input-number v-model="editingQuestion.score"/>
                </el-form-item>
                <el-form-item v-for="(desc, choice) in editingQuestion.choices"
                              :key="choice"
                              :label="`选项${choice}`">
                    <el-input v-model="editingQuestion.choices[choice]"/>
                </el-form-item>
                <el-form-item label="答案">
                    <el-select v-model="editingQuestion.answer">
                        <el-option v-for="item in ['A','B','C','D']"
                                   :key="item" :value="item"/>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="handleQuestionClose">取消</el-button>
                <el-button type="primary" @click="handleQuestionSubmit">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { clone } from '../util'

const defaultQuestion = (questionid) => ({
    questionid,
    type: 1,
    score: 10,
    question: '',
    choices: { A: '', B: '', C: '', D: '' },
    answer: 'A'
})

export default {
    name: 'exam',
    props: {
        sid: String,
        onSubmit: Function,
        target: {
            type: Object,
            required: true
        },
        fields: Array
    },
    data: ({ target }) => ({
        showQuestionDialog: false,
        questions: JSON.parse(target.questions || '[]'),
        editingQuestion: {}
    }),
    watch: {
        questions(val) { this.target.questions = JSON.stringify(val) }
    },
    methods: {
        resolveQuestion(clickEvent) {
            let id = clickEvent.currentTarget.dataset.id | 0
            return this.questions.find(q => q.questionid === id)
        },
        deleteQuestion(e) {
            let question = this.resolveQuestion(e)
            this.$confirm('确认要删除问题吗?')
                .then(() => {
                    let index = this.questions.findIndex(q => q.questionid === question.questionid)
                    this.questions.splice(index, 1)
                })
                .catch(() => {})
        },
        editQuestion(e) {
            this.editingQuestion = clone(this.resolveQuestion(e))
            this.showQuestionDialog = true
        },
        addQuestion() {
            let newId = this.questions.length > 0
                ? Math.max.apply(null, this.questions.map(q => q.questionid)) + 1
                : 0
            this.editingQuestion = defaultQuestion(newId)
            this.showQuestionDialog = true
        },
        handleQuestionClose() {
            this.showQuestionDialog = false
        },
        handleQuestionSubmit() {
            let { questionid } = this.editingQuestion
            let index = this.questions.findIndex(q => q.questionid === questionid)
            index !== -1
                // edit
                ? this.questions.splice(index, 1, this.editingQuestion)
                // add
                : this.questions.push(this.editingQuestion)
            this.showQuestionDialog = false
        }
    }
}
</script>
<style module>
    @value Green from '../colors.css';
    .question {
        margin-bottom: 20px;
    }
    .questionHeader {
        display: flex;
        align-items: center;
    }
    .questionTitle {
        margin: 0;
        margin-right: auto;
    }
    .questionEdit {
        margin-left: 20px;
    }
    .answer {
        color: Green;
        font-weight: bold;
    }
</style>