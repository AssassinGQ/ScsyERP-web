import Vue from 'vue'
import { GET } from '../api'
import { arrayToDict } from '../util'

export { default as TRUCK_LOG_FIELDS } from './truck-log'
export { default as LOCK_FIELDS } from './lock'
export { default as ORDER_FIELDS } from './order'
export { default as WARN_FIELDS } from './warn'
export { default as FAREFORM_FIELDS } from './fareform'
export { default as USER_FIELDS } from './user'

//TODO 增加查询参数支持
export const ensureFieldOptions = fields => Promise.all(fields.map(field => {
    let { type, options, optionsUrl, optionsParams, optionDisplayKey, optionValueKey } = field
    if (optionsUrl && (type === 'select' || type === 'multi-select')) {
        let promise = GET(optionsUrl, optionsParams).then(({ data }) => {
            // console.log("in ensureFieldOptions, get data : ")
            // for(let x in data){
            //     console.log("get data["+x+"]:"+data[x])
            //     for(let y in data[x]){
            //         console.log("data["+x+"]["+y+"]:"+data[x][y])
            //     }
            // }
            Vue.set(field, 'options', data.map(d => ({
                value: d[optionValueKey] || d.id,
                label: d[optionDisplayKey] || d.name || d.title,
                data: d
            })))
        })
        return options ? undefined : promise
    }
}))

export const resolveOptionData = (fields, key, value) => {
    let option = arrayToDict(fields)[key].options.find(({ value: v }) => value === v)
    if (option) return option.data
}