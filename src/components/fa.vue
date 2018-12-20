<script>
// Font-Awesome component wrapper
import fontawesome from '@fortawesome/fontawesome'

export default {
    name: 'fa',
    functional: true,
    props: {
        name: {
            type: String,
            required: true
        }
    },
    render: (h, { props: { name }, data }) => {
        let { abstract } = fontawesome.icon({ iconName: name })
        return convert(h, abstract[0], {}, data)
    }
}
const spaceRe = /\s+/

function classToObject(cls) {
    return cls.split(spaceRe)
        .reduce((acc, c) => {
            acc[c] = true
            return acc
        }, {})
}

function combineClassObjects(...objs) {
    return objs.reduce((acc, obj) => {
        if (Array.isArray(obj)) {
            acc = acc.concat(obj)
        } else {
            acc.push(obj)
        }

        return acc
    }, [])
}

function convert(h, element, props = {}, data = {}) {
    const children = (element.children || []).map(convert.bind(null, h))

    const mixins = Object.keys(element.attributes || {}).reduce((acc, key) => {
        const val = element.attributes[key]

        switch (key) {
            case 'class':
                acc['class'] = classToObject(val)
                break
            default:
                acc.attrs[key] = val
        }

        return acc
    }, { 'class': {}, style: {}, attrs: {} })

    const { class: dClass = {}, style: dStyle = {}, attrs: dAttrs = {}, ...remainingData } = data

    if (typeof element === 'string') {
        return element
    } else {
        return h(
            element.tag,
            {
                class: combineClassObjects(mixins.class, dClass),
                style: { ...mixins.style, ...dStyle },
                attrs: { ...mixins.attrs, ...dAttrs },
                ...remainingData,
                props
            },
            children
        )
    }
}

</script>