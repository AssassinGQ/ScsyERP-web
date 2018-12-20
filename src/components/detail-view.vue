<template>
    <div :class="$style.container" v-if="resolvedTarget">
        <el-form v-for="(fields, n) in chunkedFields" :key="n" v-if="ready" size="mini" label-width="100px">
            <template v-for="{ key, label, type, options } in fields">
                <el-form-item :class="$style.item" :key="key" :prop="key" size="mini">
                    <b slot="label">{{ label }}</b>
                    <div v-if="type === 'select' || type === 'multi-select'">
                        {{ options[resolvedTarget[key]] }}
                    </div>
                    <div v-else-if="type === 'date'">{{ resolvedTarget[key] | format }}</div>
                    <div v-else-if="type === 'duration'">{{ resolvedTarget[key] | humanize }}</div>
                    <template v-else-if="type === 'detail'">
                        <el-button v-if="resolvedTarget[key]" type="text"
                                   @click.native="showDetail(resolvedTarget[key], key)">
                            查看明细
                        </el-button>
                        <div v-else>无明细</div>
                    </template>
                    <template v-else-if="type === 'image'">
                        <el-button v-if="resolvedTarget[key]" type="text"
                                   @click.native="showImages(resolvedTarget[key])">
                            查看图片
                        </el-button>
                        <div v-else>无图片</div>
                    </template>
                    <div v-else>{{ resolvedTarget[key] }}</div>
                </el-form-item>
            </template>
        </el-form>
        <el-form size="mini" label-width="120px">
            <slot/>
        </el-form>
    </div>
</template>
<style module>
    .container {
        display: flex;
    }
    .item {
        margin-bottom: 4px !important;
    }
</style>
<script>
import { ensureFieldOptions } from '../fields'
import { showDetail, showImages } from './dialogs'
import { GET } from '../api'

export default {
    name: 'detail-view',
    props: {
        fields: {
            type: Array,
        },
        target: {
            type: Object
        },
        rows: {
            type: Number,
            default: 16
        },
        queryUrl: String,
        queryParam: Object
    },
    data: () => ({ ready: false, localTarget: undefined }),
    computed: {
        resolvedTarget() {
            return this.target || this.localTarget
        },
        chunkedFields() {
            let chunks = Math.ceil(this.fields.length / this.rows)
            return new Array(chunks).fill(0).map((_, n) => this.fields.slice(n * this.rows, (n + 1) * this.rows))
        }
    },
    created() {
        ensureFieldOptions(this.fields).then(() => this.ready = true)
        if (this.queryUrl) {
            GET(this.queryUrl, this.queryParam).then(data => {
                this.localTarget = data
            })
        }
    },
    methods: {
        showDetail,
        showImages
    }
}
</script>