<template>
	<div>
		<el-form :inline="true" :model="query_str">
  				<el-form-item label="请求时间">
    				<el-col :span="11">
      					<el-date-picker type="date" placeholder="起始日期" v-model="query_str.min" style="width: 100%;"></el-date-picker>
    				</el-col>
    				<el-col class="line" :span="2">-</el-col>
    				<el-col :span="11">
      					<el-date-picker type="date" placeholder="结束日期" v-model="query_str.max" style="width: 100%;"></el-date-picker>
    				</el-col>
  				</el-form-item>
  				<el-form-item label="车牌号">
  					 <el-select v-model="query_str.trucknumber" placeholder="请选择">
    					<el-option v-for="(item,index) in vehicles" :key="index" :label="item.value" :value="item.value"></el-option>
    				</el-select>
   				</el-form-item>
				<el-form-item label="处理状态">
  					<el-select v-model="query_str.state" placeholder="请选择">
    					<el-option v-for="(item,index) in status" :key="index" :label="item" :value="item"></el-option>
    				</el-select>
  				</el-form-item>
  				<el-form-item>
    				<el-button type="primary" @click="toFilter">筛选</el-button>
    				<el-button type="primary" @click="clear">初始化</el-button>
    				<el-button type="primary" :disabled="getRadio" @click="responseSet">响应请求</el-button>
  				</el-form-item>			
  		</el-form>
  		 <el-table :class="Form.table" :data="result"  border highlight-current-row
    @current-change="selectChange" size="small">
    		<el-table-column width="50" align="center" label="选择">
    			<template slot-scope="scope">
                    <el-radio class="radio" v-model="radio" :label="scope.$index"></el-radio>
                </template>
    		</el-table-column>
    		<el-table-column prop="sid" align="center" min-width="110" label="请求编号"></el-table-column>
			<el-table-column prop="drivername" align="center" width="80" label="驾驶员"></el-table-column>
			<el-table-column prop="trucknumber" width="80" label="车牌号"></el-table-column>
			<el-table-column prop="request_at" min-width="110" label="请求时间" :formatter="dataReq"></el-table-column> 
			<el-table-column prop="request" align="center" width="80" label="请求类型" :formatter="requestFormatter"></el-table-column>
			<el-table-column prop="response_at" min-width="110" align="center" label="响应时间" :formatter="dataRes">
			</el-table-column>
			<el-table-column prop="response" width="70" align="center" label="响应结果" :formatter="responseFormatter">
			</el-table-column>
			 <el-table-column prop="requestdesc"  align="center" label="司机描述" :formatter="requestdescFmr"></el-table-column>
			<el-table-column prop="status" label="处理状态" :formatter="statusFormatter"></el-table-column> 
		</el-table> 
		<div class="page_block">
    		<el-pagination background :page-size="10" :total="result_num" layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" :current-page="page">
    		</el-pagination>
		</div>
		<el-dialog title="响应请求" :visible.sync="resDialogVisible" width="50%">
			<div>
  				<table class="detailTable">
  					<tr>
  						<td class="detailTd">驾驶员</td>
  						<td>{{selectItem.drivername}}</td>
  						<td class="detailTd">车牌号</td>
  						<td>{{selectItem.trucknumber}}</td>
  						<td class="detailTd">请求时间</td>
  						<td>{{selectItem.requestat | dataFilter}}</td>
  					</tr>
  					<tr>
  						<td class="detailTd">请求类型</td>
  						<td>{{request[selectItem.request]}}</td>
  						<td class="detailTd">司机描述</td>
  						<td>{{selectItem.requestdesc}}</td>
  					</tr>
  				</table>
  			</div>
  			<span slot="footer" class="dialog-footer">
    		<el-button type="primary" @click="response(0)">同 意</el-button>
    		<el-button type="danger" @click="response(1)">拒 绝</el-button>
  			</span>
		</el-dialog>
	</div>
</template>
<script>
import { GET,POST } from '../api'
import store from '../store'
export default {
	data:()=>({
		query_str:{state:"",trucknumber:"",min:"",max:Number(new Date())},
		result:[],
		dataAll:[],
		d:[],
		radio:'',
		states:[],
		drivers:[],
		result_num:0,
		page:1,
		status:["已请求","已回复","已处理"],
		request:["左开锁","左关锁","右开锁","右关锁"],
		vehicles:[],
		resDialogVisible:false,
		selectItem:{drivername:"",trucknumber:"",requestat:"",request:"",requestdesc:"",sid:""}
	}),
	methods:{
		queryAll(){
			GET('/lock/query',{token:store.getters.user.token}).then((data)=>{
				// console.log(data)
				this.d = data.data
				this.dataAll = this.d
				this.result_num = data.total
            	this.chargeTable()
			})
			this.page = 1
		},
		selectChange(s){this.radio = this.result.indexOf(s)},
		dataReq(row){return new Date(Number(row.requestat)).toLocaleString()},
		dataRes(row){return row.responseat?new Date(Number(row.responseat)).toLocaleString():'-'},
		statusFormatter(row){return this.status[row.status]}, 
		requestFormatter(row){return this.request[row.request]},
		requestdescFmr(row){return row.requestdesc?row.requestdesc:"-"},
		responseFormatter(row){
			if(row.response===undefined){return "-"}
			else{return row.response==0?"同意":"拒绝"}
		},
		handleCurrentChange(current_page){
			this.page = current_page
        	this.result = this.d.slice((this.page-1)*10,this.page*10)
		},
		getTrucks(){
        	GET('/trucklogs/query_corporation',{corporationsid:store.getters.user.corporationsid,limit:10}).then(({ data })=>{
        		this.vehicles = data.map((i)=>{return {value:i.trucknumber}})
        	})
        },
        responseSet(){
        	this.resDialogVisible = true
        	this.selectItem = this.result[this.radio]
        },
        response(i){
        	if(i===0||i===1){
        	POST('/lock/response',{token:store.getters.user.token,sid:this.selectItem.sid,response:i}).then((data)=>{
            // alert(data)
          })
        	this.resDialogVisible = false
        	}else{
        		alert("错误")
        	}
        },
        toFilter(){
        	this.d = this.dataAll.filter((item)=>{
        		if(this.query_str.min!=""){
        			if(item.requestat<this.query_str.min||item.requestat>this.query_str.max){
        				return false
        			}
        		}
        		if(this.query_str.state!=""){
        			if(this.status[item.status]!=this.query_str.state){return false}
        		}
        		if(this.query_str.trucknumber!=""){
        			if(this.query_str.trucknumber!=item.trucknumber){return false}
        		}
        		return true
        	})
        	this.result_num = this.d.length
        	this.page = 1
        	this.chargeTable()
        },
        clear(){
        	this.d = this.dataAll
        	this.result_num = this.d.length
        	this.page = 1
        	this.chargeTable()
        	this.query_str = {state:"",trucknumber:"",min:"",max:Number(new Date())}
        },
        chargeTable(){
        	if(this.result_num>10){
              		this.result = this.d.slice((this.page-1)*10,this.page*10)
        	}else{
              		this.result = this.d
            }
        }
	},
	computed:{
		getRadio:function(){
			if(this.radio===""||this.radio===-1){return true}
			else{return false}
		}
	},
	mounted(){
		this.queryAll()
		this.getTrucks()
	},
	filters:{
		dataFilter:function(i){
			return new Date(Number(i)).toLocaleString()
		}
	}
}
</script>
<style module="Form" src="../form.css"/>
<style scoped>
	.el-radio__label{
        display: none!important
    }
</style>