<template>
    <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :class="$style.menu" :default-openeds="navMenuCurrentGroup">
                <el-submenu v-for="(subroutes, group) in routes" :index="group" :key="group">
                    <template slot="title">{{ group }}</template>
                    <router-link class="el-menu-item" v-for="route in subroutes" :to="'/' + route.path"
                                 :key="route.path">
                        {{ route.meta.title }}
                    </router-link>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header :class="$style.header">
                <el-breadcrumb :class="$style.breadcrumb">
                    <template v-for="route in $route.matched">
                        <el-breadcrumb-item v-if="route.meta.group">{{ route.meta.group }}
                        </el-breadcrumb-item>
                        <el-breadcrumb-item v-if="route.meta.title" :to="route.path">{{ route.meta.title }}
                        </el-breadcrumb-item>
                    </template>
                </el-breadcrumb>
                <el-dropdown :class="$style.dropDown">
                    <div>
                        <fa name="user" :class="$style.icon" class="fa-2x"/>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <div @click="logOut">注销</div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main :class="$style.view">
                <h2 :class="$style.viewTitle">
                    <fa v-if="$route.meta.showBack" name="chevron-left" @click="back" :class="$style.back"
                        class="fa-1x"/>
                    {{ $root.pageTitle }}
                </h2>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import '../api'
import { socket } from '../api'
import store from '../store'

export default {
    components: {},
    data: () => ({}),
    methods: {
        logOut() {
            this.$store.commit('resetUser')
            this.$router.replace('/login')
        },
        back() {
            this.$router.back()
        }
    },
    computed: {
        routes() {
            let { user } = this.$store.getters
            let { routes } = this.$router.options
            let root = routes.find(r => r.path === '/')
            return root.children.reduce((map, route) => {
                if (
                    (route.meta.permission && !route.meta.permission.includes(user.userType)) || // 无权限
                    !route.meta.group // 无权限
                ) {
                    return map
                }
                (map[route.meta.group] || (map[route.meta.group] = [])).push(route)
                return map
            }, {})
        },
        navMenuCurrentGroup() {
            let matched = this.$route.matched.find(r => r.meta.group)
            return matched ? [matched.meta.group] : []
        }

    },
    // mounted() {
    //     socket.onopen = () => {
    //         console.log('socket open')
    //         socket.send(JSON.stringify({
    //             type: store.getters.user.type,
    //             sid: store.getters.user.usersid,
    //             token: store.getters.user.token
    //         }))
    //     }
    //     socket.onmessage = msg => {
    //         let data = JSON.parse(msg.data)
    //         console.log(data)
    //         if (data.type) {
    //             data.time = Date.now()
    //             this.$store.commit('receivePushMessage', data)
    //         }
    //     }
    // }
}
</script>
<style module>
    @value Grey from '../colors.css';
    .header {
        background-color: #0f88eb;
        display: flex;
        align-items: center;
    }
    .icon {
        padding: 7px;
    }
    .menu {
        min-height: 100vh;
    }
    .menu :global(.el-menu-item) {
        display: block;
    }
    .view {
        background: white;
    }
    .dropDown {
        color: white;
        cursor: pointer;
        margin-left: auto;
    }
    .back {
        color: Grey;
        margin-right: 20px;
        cursor: pointer;
        padding: 4px;
    }
    .breadcrumb * {
        color: white !important;
        font-size: 16px;
    }
    .viewTitle {
        display: flex;
        align-items: center;
    }
</style>
