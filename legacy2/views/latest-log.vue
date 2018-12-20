<template>
    <div :class="Form.view">
        <el-tabs :value="viewType" @tab-click="handleClick">
            <el-tab-pane label="出行车辆" name="trucks">
                <TrucksView/>
            </el-tab-pane>
            <el-tab-pane label="行车数据" name="trucklog">
                <TrucklogView/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import TrucklogView from './trucklog'
import TrucksView from './trucks'

export default {
    name: 'latest-log',
    components: { TrucksView, TrucklogView },
    props: {
        viewType: String, // 'trucklog' or 'trucks',
        default: 'trucks'
    },
    methods: {
        handleClick(tab) {
            this.$router.push(`/latest-log/${tab.name}`)
        }
    }
}
</script>
<style module="Form" src="../form.css"/>