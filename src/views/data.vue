<template>
	<div>
		<el-form :inline="true" :model="condition">
				<el-form-item label="车牌号">
  					 <el-select v-model="condition.trucknumber" @change="truckChange" placeholder="请选择">
    					<el-option v-for="(item,index) in vehicles" :key="index" :label="item" :value="item"></el-option>
    				</el-select>
   				</el-form-item>
  				<el-form-item label="时间">
    				<el-date-picker size="small" clearable value-format="timestamp" :value="condition.time && [condition.time.min, condition.time.max]" @input="([min, max]) => condition.time = { min, max }"
                        :start-placeholder="'起始'" :end-placeholder="'截至'" type="daterange" />
  				</el-form-item>
  				<el-form-item>
    				<el-button type="primary" @click="query">筛选</el-button>
  				</el-form-item>			
  		</el-form>
  		 <el-table :class="Form.table" :data="result"  border highlight-current-row size="small">
    		<!-- <el-table-column width="50" align="center" label="选择">
    			<template slot-scope="scope">
                    <el-radio class="radio" v-model="radio" :label="scope.$index"></el-radio>
                </template>
    		</el-table-column> -->
    		<el-table-column prop="trucknumber" width="80" label="车牌号"></el-table-column>
			<el-table-column prop="distance" label="里程(km)"></el-table-column>
			<el-table-column prop="speed" label="车速(km/h)"></el-table-column>
			<el-table-column prop="fuelvol" label="油量(L)"></el-table-column>
			<el-table-column prop="lefttirepressure" label="左轮胎压(kpa)"></el-table-column>
			<el-table-column prop="lefttiretemp" label="左轮胎温"></el-table-column>
			<el-table-column prop="righttirepressure" label="右轮胎压(kpa)"></el-table-column>
			<el-table-column prop="righttiretemp" label="右轮胎温"></el-table-column>
			<el-table-column prop="lock" label="安全锁1~5">
				<template slot-scope="scope">
					<span>{{scope.row.lock | lockFilter}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="time" min-width="115"  label="时间" :formatter="dateFilter"></el-table-column>
		</el-table> 
		<div class="page_block">
    		<el-pagination background :page-size="10" :total="result_num" layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" :current-page="page">
    		</el-pagination>
		</div>
	</div>
</template>
<script>
import { GET, GET_NOERROR } from '../api'
import store from '../store'
export default {
	data:()=>({
		condition:{ trucknumber:"", time:{min:undefined, max:undefined} },
		result:[],
		result_num:0,
		page:1,
		vehicles:[],
	}),
	methods:{
		truckChange(){
		},
		query(){
   			let argu = { limit: 10, page: this.page, trucknumber: this.condition.trucknumber, time: JSON.stringify(this.condition.time) }
            GET_NOERROR('/trucklogs/query_new', argu).then((content)=>{
                if(content == null){
                    console.debug("get null");
                    this.result_num = 0;
                    this.result = [];
                }else{
                    console.debug(content.total);
                    this.result_num = content.total;
                    this.result = content.data;
                }
			})
		},
		handleCurrentChange(current_page){
			this.page = current_page
            this.query()
		},
		getTrucks(){
        	GET('/trucklogs/query_corporation',{corporationsid:store.getters.user.corporationsid,limit:10}).then(({ data })=>{
        		this.vehicles = data.map((i)=>{return i.trucknumber})
        		this.condition.trucknumber = this.vehicles[0]
        	})
        },
        dateFilter(row){
			return new Date(Number(row.time)).toLocaleString()
		}
	},
	mounted(){
		this.getTrucks()
	},
	filters:{
		lockFilter:function(i)
		{
			return i.split('-').map((item)=>{
				return Number(item)===1?'关':'开'
			}).join('-')
		}
	}
}
</script>
<style module="Form" src="../form.css"/>
<style scoped>
</style>