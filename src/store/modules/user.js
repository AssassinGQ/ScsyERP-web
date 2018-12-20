const defaultUser = () => ({
    id: undefined,
    userName: undefined,
    userType: undefined,
    userInfo:undefined,
    corporation: undefined,
    phone: undefined
})

const state = {
    user: defaultUser(),
    pushMessages: []
}

const mutations = {
    receiveUser: (state, { id, userName, userType, userInfo, corporation, phone }) => {
        state.user = { id, userName, userType, userInfo, corporation, phone }
    },
    resetUser: state => state.user = defaultUser(),
    receivePushMessage: (state, message) => {
        state.pushMessages.push(message)
    },
    resetSocket: state => state.pushMessages = []
}

const actions = {}

export const TYPE_CORP = 0 // 承运方
export const TYPE_GOV = 1 // 政府
export const TYPE_CORP_ADMIN = 2 // 承运方管理员
export const TYPE_DRIVER = 3 //驾驶员
export const TYPE_ESCORT = 4 // 押运员
export const TYPE_CUSTOMER = 5 // 客户
export const TYPE_MANUFACTURER = 6 // 生产厂家
export const TYPE_CONSIGNEE = 7 // 收货方
export const TYPE_SUPERADMIN = 8 // 超级管理员

const getters = {
    user: state => state.user,
    pushMessages: state => state.pushMessages,
    isCorp: state => state.user.userType === TYPE_CORP, // 承运方
    isGov: state => state.user.userType === TYPE_GOV, // 政府
    isCorpAdmin: state => state.user.userType === TYPE_CORP_ADMIN, // 承运方管理员
    isDriver: state => state.user.userType === TYPE_DRIVER,
    isEscort: state => state.user.userType === TYPE_ESCORT,
    isCustomer: state => state.user.userType === TYPE_CUSTOMER,
    isManufacturer: state => state.user.userType === TYPE_MANUFACTURER,
    isConsignee: state => state.user.userType === TYPE_CONSIGNEE,
    isSuper: state => state.user.userType === TYPE_SUPERADMIN,
}

export default { state, mutations, actions, getters }