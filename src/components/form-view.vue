<template>
    <el-form :inline="inline" :label-width="showLabel ? '100px' : ''" size="mini">
        <template v-for="{ key, label, type, options, editable, nullAble } in fields">
            <el-form-item v-if="editable !== false" :key="key" :prop="key" size="small" :label="showLabel ? (nullAble === false ? '*'+label : label) : ''">
                <el-select :class="$style.editInput" v-if="type === 'select' || type === 'multi-select'"
                           v-model="target[key]" :multiple="type === 'multi-select'"
                           clearable :placeholder="label">
                    <template v-if="Array.isArray(options)">
                        <el-option v-for="{label, value} in options" :label="label"
                                   :key="value" :value="value"/>
                    </template>
                    <template v-else>
                        <el-option v-for="(label, value) in options" :label="label"
                                   :key="value" :value="value"/>
                    </template>
                </el-select>
                <el-date-picker :class="$style.editInput" v-else-if="type === 'date'" clearable
                                v-model="target[key]" value-format="timestamp"
                                :placeholder="label"/>
                <el-input :class="$style.editInputWide" v-else-if="type === 'textarea'" type="textarea"
                          clearable
                          autosize v-model="target[key]" :placeholder="label"/>
                <el-input-number v-else-if="type === 'number'" :class="$style.editInput" clearable
                                 v-model="target[key]" :placeholder="label"/>
                <template v-else-if="type === 'duration'">
                    <el-input-number :class="$style.editInput" clearable type="number"
                                     :value="(target[key] || 0) / (24 * 3600 * 1000)"
                                     @change="val => target[key] = val * (24 * 3600 * 1000)"
                                     :placeholder="label"/>
                    天
                </template>
                <el-input :class="$style.editInput" v-else :type="type" clearable v-model="target[key]"
                          :placeholder="label"/>
            </el-form-item>
        </template>
    </el-form>
</template>
<script>
import { ensureFieldOptions } from '../fields'

export default {
    name: 'form-view',
    props: {
        fields: {
            type: Array,
        },
        target: {
            type: Object
        },
        inline: {
            type: Boolean,
            default: true
        },
        showLabel: {
            type: Boolean,
            default: true
        },
        transformData: {
            type: Function
        }
    },
    watch: {
        target: {
            handler(target) {
                if (this.transformData) this.transformData(target)
            },
            deep: true
        }
    },
    created() {
        ensureFieldOptions(this.fields).then(() => this.$forceUpdate()).then(() => {
            if (this.transformData) this.transformData(this.target)
        })
    }
}
</script>
<style module>
    .editInput {
        width: 220px;
    }
    .editInputWide {
        width: 480px;
    }
</style>