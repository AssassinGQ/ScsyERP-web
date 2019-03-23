import loginField from '../BaseFields/LoginField.js'

export default Object.freeze([
    ...loginField,
    { key: 'driverLicense', label: '驾驶证', },
    { key: 'capableCar', label: '准驾车型', },
    { key: 'iDCardPhoto', label: '身份证照片', increate: false },
])