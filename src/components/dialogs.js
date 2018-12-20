import { arrayToDict } from '../util'
import { GET } from '../api'

export function showDetail(details, key) {
    const h = this.$createElement
    details = JSON.parse(details)
    const fieldsByKey = arrayToDict(this.fields)
    const field = fieldsByKey[key]
    this.$msgbox({
        title: '明细',
        message: <div>
            {details.map(d => <div>{
                Object.keys(d)
                    .map(key => {
                        let label = fieldsByKey[key]
                            ? fieldsByKey[key].label
                            : field.detailLabels[key]
                        return `${label}: ${d[key]}`
                    })
                    .join(', ')}
            </div>)}
        </div>,
        options: {}
    }).catch(() => {})
}

export function showImages(images) {
    const h = this.$createElement
    images = JSON.parse(images)
    Promise.all(images.map(sid => GET('/file/download', { sid })))
        .then(urls =>
            this.$msgbox({
                title: '图片',
                message: (<div>{urls.map(url => <img src={url}/>)}</div>),
            }).catch(() => {})
        )
}