<template>
    <div>
        <el-row :class="$style.row" :gutter="20">
            <template v-for="{ key, type, label, span, options, queryable } in fields">
                <el-col :class="$style.col" v-if="queryable !== false"
                        :span="span || (type === 'date' ? 12 :6)" :key="key">
                    <el-select size="small" v-if="type === 'select' || type === 'multi-select'"
                               v-model="searchParams[key]" :multiple="type === 'multi-select'"
                               clearable :placeholder="label">
                        <template v-if="Array.isArray(options)">
                            <!--value = 0;label = 仓库管理员;key = dept-->
                            <el-option v-for="{label, value} in options" :label="label"
                                       :key="value" :value="value"/>
                        </template>
                        <template v-else>
                            <el-option v-for="(label, value) in options" :label="label"
                                       :key="value" :value="value"/>
                        </template>
                    </el-select>
                    <el-date-picker size="small" v-else-if="type === 'date'" clearable
                                    value-format="timestamp"
                                    :value="searchParams[key] && [searchParams[key].min, searchParams[key].max]"
                                    @input="([min, max]) => searchParams[key] = { min, max }"
                                    :start-placeholder="label + '起始'" :end-placeholder="label + '截至'"
                                    type="daterange"/>
                    <el-input size="small" v-else clearable v-model="searchParams[key]"
                              :placeholder="label"/>
                </el-col>
            </template>
        </el-row>
        <el-row>
            <el-button type="primary" size="small" @click.native="search">查询</el-button>
            <template v-if="actions">
                <el-button v-for="action in actions" :key="action"
                           :data-action="action" @click.native="dispatchRowAction" size="small"
                           :disabled="(action === 'delete' || action === 'edit') && !currentRow">
                    {{ actionLabels[action] }}
                </el-button>
            </template>
            <template v-if="customActions">
                <el-button v-for="{ label } in customActions" :key="label"
                           :data-label="label" @click.native="customEdit" size="small" :disabled="!currentRow">
                    {{ label }}
                </el-button>
            </template>
            <template v-if="newDefinedActions">
                <el-button :key="newDefinedActions.label" :data-label="newDefinedActions.label" type="primary" @click.native="newDefinedmethods"
                           size="small" :disabled="!currentRow">
                    {{ newDefinedActions.label }}
                </el-button>
            </template>
        </el-row>
        <el-table :class="$style.table" :data="result" height="440" border size="mini"
                  highlight-current-row @current-change="handleCurrentChange">
            <el-table-column v-if="actions || customActions" width="50" align="center" label="选择">
                <template slot-scope="scope">
                    <el-radio class="radio" v-model="currentRow" :label="scope.row"/>
                </template>
            </el-table-column>
            <template v-for="{ key, label, type, columnSize, columnWidth, queryOnly } in fields">
                <el-table-column v-if="!queryOnly"
                                 :width="columnWidth || TYPE_WIDTH[type] || COLUMN_WIDTH[columnSize || 'short']"
                                 :key="key"
                                 :prop="key" :label="label">
                    <template slot-scope="scope">
                        <template
                                v-if="type === 'select' && fieldsByKey[key].options && fieldsByKey[key].options[scope.row[key]]">
                            {{ fieldsByKey[key].options[scope.row[key]].label }}
                        </template>
                        <template v-else-if="type === 'date'">
                            {{ scope.row[key] | format }}
                        </template>
                        <template v-else-if="type === 'duration'">
                            {{ +scope.row[key] | humanize }}
                        </template>
                        <template v-else-if="type === 'detail'">
                            <el-button v-if="scope.row[key]" type="text"
                                       @click.native="showDetail(scope.row[key], key)">
                                查看明细
                            </el-button>
                            <div v-else>无明细</div>
                        </template>
                        <template v-else-if="type === 'image'">
                            <el-button v-if="scope.row[key]" type="text"
                                       @click.native="showImages(scope.row[key])">
                                查看图片
                            </el-button>
                            <div v-else>无图片</div>
                        </template>
                        <template v-else>
                            {{ scope.row[key] }}
                        </template>
                    </template>
                </el-table-column>
            </template>
            <div slot="empty">无符合条件的记录</div>
        </el-table>
        <el-pagination v-if="searchParams.total"
                       :current-page.sync="searchParams.page" :page-size="limit"
                       layout="prev, pager, next, jumper"
                       :total="searchParams.total">
        </el-pagination>
        <el-dialog width="720px" v-if="editing" :visible.sync="editing" :title="updateTitle">
            <form-view v-if="!customEditComponent" :fields="editFields" :target="editingRow"/>
            <component v-else :is="customEditComponent" :fields="editFields" :target="editingRow"></component>
            <span slot="footer">
                <el-button @click="resetEdit">取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </span>
        </el-dialog>
        <el-dialog width="720px" v-else-if="creating" :visible.sync="creating" :title="createTitle">
            <form-view :fields="createFields" :target="editingRow"/>
            <span slot="footer">
                <el-button @click="resetEdit">取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </span>
        </el-dialog>
        <template v-if="customEditing && editingRow">
            <el-dialog v-if="customAction.useSlot"
                       :title="customAction.label" :visible.sync="customEditing">
                <slot name="customActionComponent" :row="editingRow" :done="resetCustomEdit" :label="customAction.label"></slot>
            </el-dialog>
            <el-dialog v-else-if="customAction.queryUrl"
                       :title="customAction.label" :visible.sync="customEditing">
                <detail-view :fields="customAction.fields" :target="editingRow"/>
            </el-dialog>
            <el-dialog width="720px" v-else-if="!customAction.queryUrl"
                       :title="customAction.label" :visible.sync="customEditing">
                <form-view :fields="customAction.fields" :transformData="customAction.transformData" :target="editingRow"/>
                <span slot="footer">
                    <el-button @click="resetCustomEdit">取消</el-button>
                    <el-button type="primary" @click="submitCustomEdit">确定</el-button>
                </span>
            </el-dialog>
        </template>
    </div>
</template>
<script>
import { GET, POST } from '../api'
import { clone } from '../util'
import FormView from './form-view'
import DetailView from './detail-view'
import { ensureFieldOptions } from '../fields'
import { showDetail, showImages } from './dialogs'

export default {
    name: 'table-view',
    components: { FormView, DetailView },
    props: {
        // 单页数据条数
        limit: {
            type: Number,
            default: 10
        },
        // 若不传queryUrl/createUrl/deleteUrl，
        // 则query使用baseUrl + '/query', 以此类推
        baseUrl: String,
        // 若传入函数，则会将searchParams作为参数传入, 以此判断需要返回的queryUrl
        queryUrl: [String, Function],
        pageQueryParam : {
            type: Array,
            default: () => []
        },
        topicName: {
            type: String,
            default: "",
        },
        createUrl: String,
        updateUrl: String,
        deleteUrl: String,
        // 后端返回的列表中每一条的字段定义
        // 字段格式为:
        // - key: String, 数据字段名
        // - label: String, 数据标题
        // - type: String, 数据类型，可为select, multi-select, date, duration, detail, image，不指定则为纯文本
        // - options: Array, 当type为select或multi-select时的选项列表，可不传
        // - optionsUrl: String, 当type为select或multi-select时的选项列表, 不传options时, 将拉取该url获得选项
        // - detailLabels: 当type为detail时，json字段的定义，若不传则在整个fields数组中查找
        // - queryable: Boolean, 是否显示在筛选条件中
        // - queryOnly: Boolean, 是否只显示在筛选条件中，而不显示在结果中
        // - columnSize: String, 列宽度，可选为short, medium, long
        // - columnWidth: Number, 直接指定列宽度px
        fields: {
            type: Array,
            required: true,
            default: () => []
        },
        // 单条记录补充字段（不在后端返回的列表中），用于编辑
        additionalFields: {
            type: Array,
            default: () => []
        },
        // 条目的id字段
        idField: {
            default: 'id',
            type: String
        },
        // 若传入，则在创建记录后展示创建结果（例:创建管理员后的账号信息）
        createResultLabels: {
            type: Object
        },
        // 对单条记录的增删改按钮，传false则不显示
        actions: {
            type: [Array, Boolean],
            default: () => ['create', 'edit', 'delete']
        },
        // 对单条记录的自定义操作, 类型为{label: String, url: String, fields: Array}
        // 其中url为该操作调用的api路径
        customActions: {
            type: Array
        },
        // 对单条记录的创建/编辑使用自定义组件，而非FormView
        customEditComponent: {
            type: Object
        },
        // 是否自动查询
        autoQuery: {
            type: Boolean,
            default: true
        },
        //用户可自定义的按钮和方法
        newDefinedActions: {
            type: Object
        },
        newDefinedmethods: {
            type: Function
        }
    },
    data: ({ pageQueryParam, fields }) => ({
        searchParams: {
            page: 1,
            total: 0,
            ...fields.reduce((map, field) => {
                map[field.key] = undefined
                return map
            }, {}),
            ...pageQueryParam.reduce((map, kv) => {
                map[kv.key] = kv.value;
                return map;
            }, {}),
        },
        result: [],
        editing: false,
        creating: false,
        createTitle: "",
        updateTitle: "",
        editingRow: undefined,
        currentRow: undefined,
        customEditing: false,
        COLUMN_WIDTH: {
            short: 80,
            medium: 140,
            long: 200
        },
        TYPE_WIDTH: {
            date: 90,
            phone: 100,
            name: 100
        },
        actionLabels: {
            create: '创建',
            edit: '编辑',
            delete: '删除'
        }
    }),
    computed: {
        fieldsByKey() {
            return this.fields.reduce((map, field) => {
                map[field.key] = field
                return map
            }, {})
        },
        editFields() {
            return [].concat(this.fields, this.additionalFields)
        },
        createFields() {
            console.log("in createFields");
            return this.fields.reduce((obj, field) => {
                // for(let x in field){
                //     console.log("field[" + x + "]=" + field[x]);
                // }
                if (field.editable !== false) {
                    if (field.increate == undefined) {
                        // console.log("push1 " + field.key);
                        obj.push(field);
                    } else {
                        if (field.increate) {
                            // console.log("push2 " + field.key);
                            obj.push(field);
                        } else {
                            // console.log("not push " + field.key);
                        }
                    }
                }
                return obj
            }, []);
            //return [].concat(this.fields, this.additionalFields)
        },
    },
    methods: {
        search() {
            let { queryUrl, baseUrl, limit, searchParams } = this;
            let url = typeof queryUrl === 'function' ? queryUrl(searchParams) : queryUrl;
            let params = { ...searchParams };
            this.fields.forEach(({ key, type }) => {
                if (type === 'multi-select' && params[key]) {
                    params[key] = JSON.stringify(params[key])
                }
            })
            return GET(url || `${baseUrl}/query`, { limit, ...params })
                .then(({ data, TotalCount }) => {
                    this.searchParams.total = TotalCount;
                    this.result = data
                })
                .catch(e => {
                    this.result = [];
                    throw e
                })
        },
        handleCurrentChange(val) { this.currentRow = val },
        showDetail,
        showImages,
        dispatchRowAction(e) {
            let { action } = e.currentTarget.dataset
            this[action] && this[action]()
        },
        create() {
            this.editingRow = this.fields.reduce((obj, field) => {
                if (field.editable !== false)
                    obj[field.key] = undefined
                return obj
            }, {})
            //this.editing = true
            this.creating = true
        },
        edit() {
            this.editingRow = clone(this.currentRow)
            this.editing = true
        },
        delete() {
            let { deleteUrl, baseUrl, currentRow, idField } = this
            // let id = currentRow[idField]
            let delete_key_name, delete_key;
            let realDeleteUrl = deleteUrl || `${baseUrl}/delete`
            if(realDeleteUrl.indexOf("Corporation") != -1 ||
                realDeleteUrl.indexOf("Admin") != -1 ||
                realDeleteUrl.indexOf("Government") != -1 ||
                realDeleteUrl.indexOf("Customer") != -1 ||
                realDeleteUrl.indexOf("Manufacturer") != -1 ||
                realDeleteUrl.indexOf("Consignee") != -1 ||
                realDeleteUrl.indexOf("Driver") != -1 ||
                realDeleteUrl.indexOf("Escort") != -1){
                delete_key_name = "userId";
                delete_key = currentRow.userId;
            }else{
                delete_key_name = "entityId";
                delete_key = currentRow.id;
            }
            this.$confirm('删除操作不可撤销', '确认删除吗?')
                .then(() => POST(realDeleteUrl, { [delete_key_name]: delete_key }))
                .then(this.search)
                .catch((e) => {
                    console.log(e)
                })
        },
        submit() {
            let { editingRow, idField, updateUrl, createUrl, baseUrl } = this
            // let isEdit = editingRow[idField]
            let isEdit;
            if(this.editing)
                isEdit = true;
            else
                isEdit = false;
            if(isEdit){
                editingRow.entityId = editingRow[idField]
            }
            // for(let x in editingRow){
            //     console.info("editingRow["+x+"] = "+editingRow[x]);
            // }
            delete(editingRow[idField])
            POST(isEdit
                ? (updateUrl || `${baseUrl}/update`)
                : (createUrl || `${baseUrl}/create`), editingRow)
                .then(data => {
                    if (!isEdit && this.createResultLabels) {
                        this.$msgbox({
                            title: '信息',
                            message: <div>
                                {Object.keys(data).map(key => {
                                    let label = this.fieldsByKey[key]
                                        ? this.fieldsByKey[key].label
                                        : this.createResultLabels[key]
                                    return label && <div>{`${label}: ${data[key]}`}</div>
                                })}
                            </div>,
                        })
                    }
                })
                .then(this.search)
                .then(this.resetEdit)
        },
        resetEdit() {
            this.editing = false;
            this.creating = false;
            this.editingRow = undefined
        },
        // 自定义操作
        customEdit(e) {
            let { label } = e.currentTarget.dataset
            this.customAction = this.customActions.find(a => a.label === label)
            this.editingRow = clone(this.currentRow)
            let { queryUrl, queryParamKey, transformData } = this.customAction
            if (queryUrl) {
                GET(queryUrl, { limit: 1, [queryParamKey]: this.currentRow[queryParamKey] })
                    .then(({ data: [row] }) => {
                        this.editingRow = transformData ? transformData(row) : row
                        this.customEditing = true
                    })
            } else {
                if (transformData) this.editingRow = transformData(this.editingRow)
                this.customEditing = true
            }
        },
        resetCustomEdit() {
            this.customEditing = false
            this.customAction = undefined
        },
        submitCustomEdit() {
            let { url } = this.customAction
            POST(url, this.editingRow)
                .then(this.search)
                .then(this.resetEdit)
        }
    },
    created() {
        this.createTitle = "创建" + this.topicName;
        this.updateTitle = "更新" + this.topicName;
        this.autoQuery && this.search();
        ensureFieldOptions(this.fields)
    },
    watch: {
        'searchParams.page': 'search',
        editingRow(row) {
            if (row && this.customAction && !this.customAction.queryUrl && this.customAction.transformData) {
                this.editingRow = this.customAction.transformData(row)
            }
        }
    }
}
</script>
<style module>
    .table {
        margin-top: 8px;
    }
    .col {
        margin-bottom: 10px;
    }
    .col > * {
        width: 100% !important;
    }
</style>