<template>
    <el-tabs :value="viewType" @tab-click="handleClick">
        <el-tab-pane label="按时间统计" name="time">
            <form-view :fields="timeFields" :target="query"/>
            <el-button class="searchButton"  type="primary" size="small" @click="search">查询</el-button>
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
            <div class="chartblocks">
                <chart-view class="chartview" :title="chart[0].title" :xaxis="chart[0].xaxis" :data="chart[0].data" :height="400" :width="500"/>
                <chart-view class="chartview" :title="chart[1].title" :xaxis="chart[1].xaxis" :data="chart[1].data" :height="400" :width="500"/>
            </div>
            <div class="chartblocks">
                <chart-view class="chartview" :title="chart[2].title" :xaxis="chart[2].xaxis" :data="chart[2].data" :height="400" :width="500"/>
                <chart-view class="chartview" :title="chart[3].title" :xaxis="chart[3].xaxis" :data="chart[3].data" :height="400" :width="500"/>
            </div>
        </el-tab-pane>
        <el-tab-pane label="按条目统计" name="item">
            <table-view :fields="itemFields" :newDefinedActions="newDefinedAction" :newDefinedmethods="showOrderDetail" base-url="/order" :actions="false" ref="table1" />
             <el-button class="searchButton"  type="primary" size="small" @click="setChart">统计</el-button>
            <chart-view class="chart2" :title="chart2.title" :xaxis="chart2.xaxis" :data="chart2.data" :width="1000" :height="250"/>
            <el-dialog title="订单详情" :visible.sync="detailDialogVisible" width="50%">
                <detail-view :fields="ORDER_FIELDS" :target="detail"/>
            </el-dialog>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
import FormView from '../components/form-view'
import ChartView from '../components/chart-view'
import TableView from '../components/table-view'
import DetailView from '../components/detail-view'
import { GET , handlers} from '../api'
import store from '../store'
import { ORDER_FIELDS } from '../fields'
import { orderstatus } from '../fields/common'

export default {
    name: 'order-stats',
    components: { FormView, ChartView, TableView, DetailView },
    props: {
        viewType: String, // 'time' or 'item',
        default: 'time'
    },
    data: () => ({
        d:[],
        result:[],
        query:{year:[],month:[],type:'0'},
        fields:[
            {key:'orderamount',label:'订单量'},
            {key:'fuelused',label:'耗油量'},
            {key:'output',label:'产量'},
            {key:'distance',label:'里程统计'}
        ],
        result_num:0,
        page:1,
        ifShow: {year:false,month:false},
        chart: [
            {title:'订单量统计',xaxis:[],data:[]},
            {title:'耗油量统计',xaxis:[],data:[]},
            {title:'产量统计',xaxis:[],data:[]},
            {title:'里程统计',xaxis:[],data:[]}
        ],
        timeFields: [
            { key: 'year', label: '年份', type: 'multi-select'},
            { key: 'month', label: '月份', type: 'multi-select' },
            { key: 'type', label: '统计类型', type: 'select',
              options:{ 0:'承运方', 1:'驾驶员', 2:'托运方', 3:'车辆' }
            }
        ],
        chart2: {title:'订单统计',xaxis:['订单量', '耗油量', '产量', '里程'],data:[]},
        itemFields: [
            { key: 'sid', label: '订单号', columnWidth: '150'},
            { key: 'trucknumber', label: '车牌号' },
            { key: 'ordertime', label: '创建时间', type: 'date' },
            { key: 'sellername', label: '托运方', type: 'name' },
            { key: 'buyername', label: '收货方', type: 'name' },
            { key: 'drivername', label: '驾驶员', type: 'name' },
            { key: 'productname', label: '货物名称', },
            orderstatus,
            {
              key: 'producttype', label: '货物类型', type: 'select',
              options: new Array(8).fill(0).reduce((map, _, n) => {
                    map[n + 1] = `${n + 1}类`
                    return map
              }, {})
            },
            { key: 'corporationname', label: '承运方', queryable: false, columnWidth: '150', type: 'name'},
        ],
        newDefinedAction:{ label: '查看详细'},
        detailDialogVisible: false,
        detail: undefined,
        ORDER_FIELDS
    }),
    methods: {
        handleClick(tab) {
            this.$router.push(`/order-stats/${tab.name}`)
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
            var querysrc = '/statistics/query_orderyear'
            var argu = {token:store.getters.user.token,objecttype:Number(this.query.type)+1,year:JSON.stringify(this.query.year)}
            if(ifMonth){
                argu.month = JSON.stringify(this.query.month)
                querysrc = '/statistics/query_ordermonth'
                this.ifShow.month = true
            }else{
                this.ifShow.year = true
            }
            GET(querysrc,argu).then((data)=>{
                console.log(data.data)
                this.d = data.data
                this.result_num = this.d.length
                this.page = 1
                this.chargeTable()
                //chart
                let stat = this.statistics(this.d)
                this.chart.forEach(i => i.xaxis = stat.ax)
                this.chart[0].data = stat.orderamount
                this.chart[1].data = stat.fuelused
                this.chart[2].data = stat.output
                this.chart[3].data = stat.distance
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
            let re = array.reduce( (p, k) => {
                const i = p.ax.indexOf(k.objectname)
                if(i > -1){
                    p.orderamount[i]+=k.orderamount
                    p.fuelused[i]+=k.fuelused
                    p.output[i]+=k.output
                    p.distance[i]+=k.distance
                }else{
                    p.ax.push(k.objectname)
                    p.orderamount.push(k.orderamount)
                    p.fuelused.push(k.fuelused)
                    p.output.push(k.output)
                    p.distance.push(k.distance)
                }
                return p
            },{ax:[],orderamount:[],fuelused:[],output:[],distance:[]})
            return re
        },
        showOrderDetail(){
            let child = this.$refs.table1
            GET('/order/query',{ token: store.getters.user.token, sid: child.currentRow.sid }).then(({ data: [detail] }) => {
                this.detail = detail
                this.detailDialogVisible = true
            })
        },
        setChart(){
            let table = this.$refs.table1
            let params = table.searchParams
            delete params.page
            delete params.total
            var sum = new Array(4).fill(0)
            GET("/order/query", { ...params }).then(({data}) => {
                data.forEach(i => {
                    sum[0]++
                    sum[1]+= i.fuelused
                    sum[2]+= i.output
                    sum[3]+= i.distance
                })
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
    margin:10px;
   }
   .chartview{
    width: 600px;
    height:400px;
    margin: 10px auto;
   }
   .chart2{
    margin: 10px auto;
   }
   .chartblocks{
    width: 100%;
    height: auto;
    margin: 10px auto 10px auto;
    display: flex;
    justify-content: space-around;
    flex-flow: row nowrap;
   }
   .chartview{
    flex:0 1 400px;
   }
</style>