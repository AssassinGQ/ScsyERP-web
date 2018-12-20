<template>
    <el-tabs :value="viewType" @tab-click="handleClick">
        <el-tab-pane label="按时间统计" name="time">
            <form-view :fields="timeFields" :target="query"/>
            <el-button class="searchButton"  type="primary" size="small" @click="search">查询</el-button>
            <el-tabs>
                <el-tab-pane label="数据显示">
                    <el-table :data="result" border style="width:100%" size='mini'>
                        <el-table-column v-if="ifShow.year" align='center' prop="year" width="60" label="年份">
                            <template slot-scope="scope"><span>{{scope.row.year+'年'}}</span></template>
                        </el-table-column>
                        <el-table-column v-if="ifShow.month" align='center' prop="month" width="60" label="月份">
                            <template slot-scope="scope"><span>{{scope.row.month+'月'}}</span></template>
                        </el-table-column>
                        <el-table-column prop="objectname" label="名称" align='center' min-width='110'/>
                        <template v-for="{key , label} in fields" >
                            <el-table-column  :prop="key" :label="label" align='center'/>
                        </template>
                    </el-table>
                    <div class="page_block">
                        <el-pagination background :page-size="10" :total="result_num" layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" :current-page="page"/>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="图表显示">
                    <chart-view class="chartview" :title="chart.title" :xaxis="chart.xaxis" :data="chart.data"/>
                </el-tab-pane>
            </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="按条目统计" name="item">
            <table-view :fields="itemFields" base-url="/warnId" :actions="false" ref="table1"/>
            <el-button class="searchButton"  type="primary" size="small" @click="setChart">统计异常数目</el-button>
            <chart-view class="chart2" :title="chart2.title" :xaxis="chart2.xaxis" :data="chart2.data" :width="1000" :height="250"/>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import FormView from '../components/form-view'
import TableView from '../components/table-view'
import ChartView from '../components/chart-view'
import { GET , handlers} from '../api'
import store from '../store'
import { WARN_FIELDS } from '../fields'

export default {
    name: 'accident-stats',
    components: { FormView, TableView, ChartView },
    props: {
        viewType: String, // 'time' or 'item',
        default: 'time'
    },
    data: () => ({
        d:[],
        result:[],
        query:{year:[],month:[],type:'0'},
        fields:[
            {key:'lockamount',label:'安全锁异常'},
            {key:'leakamount',label:'泄露异常'},
            {key:'tireamount',label:'胎压异常'},
            {key:'overspeedamount',label:'超速异常'},
            {key:'fatiguedrivingamount',label:'疲劳驾驶'},
            {key:'overloadamount',label:'超载异常'},
            {key:'fuelamount',label:'油量异常'},
            {key:'parkamount',label:'停车异常'},
            {key:'suddenaccelamount',label:'急加速异常'},
            {key:'suddenbrakeamount',label:'急刹车异常'}
        ],
        result_num:0,
        page:1,
        ifShow: {year:false,month:false},
        chart: {title:'总异常统计',xaxis:[],data:[]},
        timeFields: [
            { key: 'year', label: '年份', type: 'multi-select'},
            { key: 'month', label: '月份', type: 'multi-select' },
            { key: 'type', label: '统计类型', type: 'select', 
              options:{ 0:'承运方', 1:'驾驶员', 2:'托运方', 3:'车辆' }
            }
        ],
        chart2: {title:'各类异常统计',xaxis:[],data:[]},
        warntype: ['安全锁异常', '泄露异常', '胎压异常', '油量异常', '超速异常', '停车异常', '疲劳驾驶异常', '急刹车异常', '急加速异常', '车辆事故', '超载异常'],
        itemFields: WARN_FIELDS
    }),
    methods: {
        handleClick(tab) {
            this.$router.push(`/accident-stats/${tab.name}`)
        },
        year_month(b,count,last) {
            let y = {}
            for(let i=0;i<count;i++){
                y[b+i] = b+i+last
            }
            return y
        },
        search(){
            this.ifShow.year = false
            this.ifShow.month = false
            var _year = this.query.year.length
            var _month = this.query.month.length
            if(_year==0){handlers.error({msg:'年份条件未选择'});return}
            else if(_year==1&&_month!=0){this._get(true)}
            else if(_year>1||(_year==1&&_month==0)){
                this.query.month=[]
                this._get(false)
            }
        },
        _get(ifMonth){
            var querysrc = '/statistics/query_warnyear'
            var argu = {token:store.getters.user.token,objecttype:Number(this.query.type)+1,year:JSON.stringify(this.query.year)}
            if(ifMonth){
                argu.month = JSON.stringify(this.query.month)
                querysrc = '/statistics/query_warnmonth'
                this.ifShow.month = true
            }else{
                this.ifShow.year = true
            }
            GET(querysrc,argu).then((data)=>{
                //console.log(data)
                this.d = data.data
                this.result_num = this.d.length
                this.page = 1
                this.chargeTable()
                //chart
                let stat = this.statistics(this.d)
                this.chart.xaxis = stat.ax
                this.chart.data = stat.data
            })
        },
        chargeTable(){
            if(this.result_num>10){this.result = this.d.slice((this.page-1)*10,this.page*10)}
            else{this.result = this.d}
        },
        handleCurrentChange(current_page){
            this.page = current_page
            this.result = this.d.slice((this.page-1)*10,this.page*10)
        },
        statistics(array){
            let ax = []
            let data = []
            array.forEach( a => {
                const sum = a.lockamount + a.leakamount + a.tireamount + a.overspeedamount + a.fatiguedrivingamount + a.overloadamount + a.fuelamount + a.parkamount + a.suddenaccelamount + a.suddenbrakeamount
                const i = ax.indexOf(a.objectname)
                if(i > -1){
                    data[i] += sum
                }else{
                    ax.push(a.objectname)
                    data.push(sum)
                }
            })
            return {ax,data}
        },
        setChart(){
            let table = this.$refs.table1
            let params = table.searchParams
            delete params.page
            delete params.total
            var sum = Array(11).fill(0)
            GET("/warnId/query", { ...params }).then(({data}) => {
                data.forEach(i => sum[i.warntype-1]++)
                this.chart2.xaxis = this.warntype
                this.chart2.data = sum
            })
        }
    },
    created(){
        this.timeFields[0].options = this.year_month(2016,16,'年')
        this.timeFields[1].options = this.year_month(1,12,'月')
    }
}
</script>
<style scoped>
   .searchButton{
    margin-left: 20px
   }
   .chartview{
    width: 600px;
    height:400px;
    margin: 10px auto;
   }
   .chart2{
    margin: 10px auto;
   }
</style>