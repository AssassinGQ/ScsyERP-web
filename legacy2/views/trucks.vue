<template>
<div>
<el-form :inline="true" :model="setting">
  	<el-form-item label="定时更新">
		<el-select v-model="setting.state" placeholder="关闭" @change="stateChange">
      		<el-option v-for="item in options" :key="item.value"  :label="item.label" :value="item.value"></el-option>
    	</el-select>
    </el-form-item>
    <el-form-item label="查看地图">
    	<el-button type="primary" :disabled="getRadio" @click="showMap">查看地图</el-button>
    </el-form-item>
</el-form>
<el-table :data="result" style="width:100%" border size="mini" highlight-current-row
    @current-change="selectChange">
	<el-table-column width="50" align="center" label="选择">
    	<template slot-scope="scope">
            <el-radio class="radio" v-model="radio" :label="scope.$index"></el-radio>
        </template>
    </el-table-column>
	<el-table-column prop="trucknumber" label="车牌号"></el-table-column>
	<el-table-column prop="distance" label="里程(km)"></el-table-column>
	<el-table-column prop="speed" label="车速(km/h)">
		<template slot-scope="scope">
            <span :style = "{color:scope.row.speed>80?'red':''}">{{scope.row.speed}}</span>
        </template>
	</el-table-column>
	<el-table-column prop="fuelvol" label="油量(L)">
		<template slot-scope="scope">
            <span :style = "{color:scope.row.fuelvol<10?'red':''}">{{scope.row.fuelvol}}</span>
        </template>
	</el-table-column>
    <el-table-column prop="lefttirepressure" label="左轮胎压(kpa)">
    	<template slot-scope="scope">
            <span :style = "{color:scope.row.lefttirepressure>1200?'red':''}">{{scope.row.lefttirepressure}}</span>
        </template>
    </el-table-column>
    <el-table-column prop="lefttiretemp" label="左轮胎温"></el-table-column>
    <el-table-column prop="righttirepressure" label="右轮胎压(kpa)">
    	<template slot-scope="scope">
            <span :style = "{color:scope.row.righttirepressure>1200?'red':''}">{{scope.row.righttirepressure}}</span>
        </template>
    </el-table-column>
    <el-table-column prop="righttiretemp" label="右轮胎温"></el-table-column>
    <el-table-column prop="lock" label="安全锁"></el-table-column>
    <el-table-column prop="battery" label="网关电量"></el-table-column>
</el-table>
<div class="page_block">
    <el-pagination background :page-size="10" :total="result_num" layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" :current-page="page">
    </el-pagination>
</div>
<el-dialog title="查看地图" :visible.sync="dialogVisible" width="50%">
	<div id="map"><map-box :gpsx="gpsx" :gpsy="gpsy" v-if="dialogVisible"></map-box></div>
  	<span slot="footer" class="dialog-footer">
    	<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  	</span>
</el-dialog>
</div>
</template>
<script>
import { GET } from '../api'
import store from '../store'
export default {
	data:()=>({
		setting:{state:false},
		options:[{value:true,label:"打开"},{value:false,label:"关闭"}],
		d:[],
		result:[],
		radio:"",
		page:0,
		result_num:0,
		interval:undefined,
		dialogVisible:false,
		gpsx:0,
		gpsy:0
	}),
	methods:{
		showMap(){
			this.dialogVisible = true
			this.gpsx = this.result[this.radio].gpsx
			this.gpsy = this.result[this.radio].gpsy
		},
		stateChange(){
			//run per 20 seconds 
			if(this.setting.state){
				this.interval = setInterval(this.getTrucks(),20000)
			}else{
				if(this.interval){clearInterval(this.interval)}
			}
		},
		dataFormatter(row){
			return new Date(row.warntime).toLocaleString()
		},
		selectChange(s){
			this.radio = this.result.indexOf(s)
		},
		getTrucks(){
        	GET('/trucklogs/query_corporation',{corporationsid:store.getters.user.corporationsid}).then(({ data })=>{
        		this.d = data
        		this.result_num = data.length
        		if(this.result_num>10){
        			this.result = this.d.slice((this.page-1)*10,this.page*10)
        		}else{
        			this.result = this.d
        		}
        	})
        },
        handleCurrentChange(current_page){
        	this.page = current_page
        	this.result = this.d.slice((this.page-1)*10,this.page*10)
        },
	},
	computed:{
		getRadio:function(){
			if(this.radio===""||this.radio===-1){return true}
			else{return false}
		}
	},
	mounted(){
		this.getTrucks()
	}
}
</script>
<style>
	.el-radio__label{
        display: none!important
    }
    .page_block{display: block;margin-top:10px;margin-bottom:15px;}
    #map{
    	width: 100%;
        height:350px;
        margin: 4px auto;
    }
</style>