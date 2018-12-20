export const DEBUG = process.env.NODE_ENV !== 'production'
export const clone = o => JSON.parse(JSON.stringify(o))
export const noop = () => {}
export const arrayToDict = (arr, key = 'key') => arr.reduce((dict, item) => {
    dict[item[key]] = item
    return dict
}, {})