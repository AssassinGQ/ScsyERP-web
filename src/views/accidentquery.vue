<template>
	<div>
		<div>
			<el-form :inline="true" :model="acc_query" class="demo-form-inline">
  				<el-form-item label="异常类型">
    				<el-select v-model="acc_query.warntype" placeholder="异常类型">
      					<el-option v-for="(acc , index) in accs" :key="index" :label="acc+'事故'" :value="index+1"></el-option>
    				</el-select>
  				</el-form-item>
  				<el-form-item label="车牌号">
      				<el-autocomplete class="inline-input" v-model="acc_query.truckNum" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
  				</el-form-item>
  				<el-form-item label="处理状态">
    				<el-select v-model="acc_query.status" placeholder="处理状态">
      					<el-option v-for="(s , index) in statuses" :key="index" :label="s" :value="index"></el-option>
    				</el-select>
  				</el-form-item>
  				 <el-form-item label="异常时间">
    				<el-col :span="11">
      					<el-date-picker type="date" placeholder="选择日期" v-model="acc_query.min" style="width: 100%;"></el-date-picker>
    				</el-col>
    				<el-col class="line" :span="2">-</el-col>
    				<el-col :span="11">
      					<el-date-picker type="date" placeholder="选择日期" v-model="acc_query.max" style="width: 100%;"></el-date-picker>
    				</el-col>
  				</el-form-item>
  				<el-form-item>
    				<el-button type="primary" @click="queryAll">查询</el-button>
    				<el-button type="primary" icon="el-icon-delete" @click="clear">清空</el-button>
    				<el-button type="primary" :disabled="getRadio" @click="showDetail">查看详细</el-button>
  				</el-form-item>
			</el-form>
		</div>
		<div>
		<el-table :class="Form.table" :data="result"  border highlight-current-row
    @current-change="selectChange">
    		<el-table-column width="50" align="center" label="选择">
    			<template slot-scope="scope">
                    <el-radio class="radio" v-model="radio" :label="scope.$index"></el-radio>
                </template>
    		</el-table-column>
			<el-table-column prop="drivername" width="80" label="驾驶员"></el-table-column>
			<el-table-column prop="corporationname" min-width="95" fit=true label="承运公司"></el-table-column>
			<el-table-column prop="warntype" label="异常类型" :formatter="getWarntype"></el-table-column>
			<el-table-column prop="trucknumber" width="100" label="车牌号"></el-table-column>
			<el-table-column prop="warntime" min-width="105" :formatter="dataFormatter" label="异常时间"></el-table-column>
			<el-table-column prop="warnimages" align="center" label="异常图片">
				<template slot-scope="scope">
        			<el-button @click="showImgs(scope.row)" type="text" size="small">查看图片</el-button>
      			</template>
			</el-table-column>
			<el-table-column prop="warndriverresp"  align="center" label="司机反馈" :formatter="callbackFormatter"></el-table-column>
			<el-table-column prop="status" label="处理状态" :formatter="stateFormatter"></el-table-column>
		</el-table>
		<el-dialog title="异常图片" :visible.sync="imgDialogVisible" width="50%">
			<div class="warnBlock">
  				<div class="warnimage" v-for="img in warnimgs">
  					<img :src="img" style="width:100%">
  				</div>
  			</div>
  			<span slot="footer" class="dialog-footer">
    		<el-button type="primary" @click="imgDialogVisible = false">确 定</el-button>
  			</span>
		</el-dialog>
		<el-dialog title="详细信息" :visible.sync="warnDialogVisible" width="60%">
			<div class="warnTable">
  				<table class="detailTable">
  					<tr v-if="radio!==''&&radio!==-1">
  						<td class="detailTd">异常类型</td>
  						<td>{{accs[result[radio].warntype-1]+"异常"}}</td>
  						<td class="detailTd">异常时间</td>
  						<td>{{new Date(Number(result[radio].warntime)).toLocaleString()}}</td>
  						<td class="detailTd">异常地点</td>
  						<td>{{"gpsx:"+result[radio].gpsx+",gpsy:"+result[radio].gpsy}}</td>
  					</tr>
  					<tr v-for="(item,key,index) in detailItem" v-if="index%3===0">
  						<td class="detailTd">{{item}}</td>
  						<td>{{orderDetail[key]}}</td>
  						<td class="detailTd">{{detailItem[getNextItem(detailItem,index+1)]}}</td>
  						<td>{{orderDetail[getNextItem(detailItem,index+1)]}}</td>
  						<td class="detailTd">{{detailItem[getNextItem(detailItem,index+2)]}}</td>
  						<td>{{orderDetail[getNextItem(detailItem,index+2)]}}</td>
  					</tr>
  					<tr>
  						<td class="detailTd">道路运输证</td>
  						<td>{{truckDetail["RTCnumber"]}}</td>
  						<td class="detailTd">运输证有效期</td>
  						<td>{{new Date(Number(truckDetail["RTCddl"])).toLocaleString()}}</td>
  					</tr>
  				</table>
  			</div>
  			<span slot="footer" class="dialog-footer">
    		<el-button type="primary" @click="warnDialogVisible = false">确 定</el-button>
  			</span>
		</el-dialog>
		</div>
		<div class="page_block">
    		<el-pagination background :page-size="10" :total="result_num" layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" :current-page="page">
    		</el-pagination>
		</div>
	</div>
</template>
<script>
import { GET } from '../api'
import store from '../store'
export default {
	data:()=>({
		result:[],
		result_num:0,
		page:1,
		vehicles:[],
		statuses:["已创建","已推送","司机已阅读","司机已反馈"],
		accs:["安全锁","泄露","胎压","油量","超速","停车","疲劳驾驶","急刹车","急加速","车辆","超载"],
		acc_query:{warntype:"",trucksid:"",status:"",min:"",max:Number(new Date())},
		d:[],
		warnimgs:[],
		imgDialogVisible:false,
		radio:"",
		disabled:false,
		warnDialogVisible:false,
		orderDetail:{},
		truckDetail:{},
		detailItem:{corporationname:"承运方",sellername:"托运方",buyername:"收货方",sid:"订单号",productname:"货物名称",productweight:"货物重量",producttype:"货物类型",trucknumber:"货车车牌号",escortname:"驾押员",drivername:"驾驶员",unloadaddr:"卸货地址",loadaddr:"装货地址"},
		detailItem2:{RTCnumber:"道路运输证",RTCddl:"运输证有效期"}
	}),
	methods:{
		querySearch(queryString, cb) {
        var vehicle = queryString ? this.vehicles.filter((i)=>{return i.value.indexOf(queryString) === 0}) : this.vehicles;
        cb(vehicle);
        },
        getTrucks(){
        	GET('/trucklogs/query_corporation',{corporationsid:store.getters.user.corporationsid,limit:10}).then(({ data })=>{
        		this.vehicles = data.map((i)=>{return {value:i.trucknumber,trucksid:i.trucksid}})
        	})
        },
        handleSelect(item){
        	this.acc_query.trucksid = item.trucksid
        },
        queryAll(){
        	var argu = {token:store.getters.user.token,trucksid:this.acc_query.trucksid,status:this.acc_query.status,warntype:this.acc_query.warntype,warntime:{min:Number(this.acc_query.min),max:Number(this.acc_query.max)}}
        	GET('/warnId/query',argu).then(({ data })=>{
        		//console.log(data)
        		this.d = data;
        		this.result_num = data.length
            if(this.result_num>10){
              this.result = this.d.slice((this.page-1)*10,this.page*10)
            }else{
              this.result = this.d
            }
        	})
        	this.page = 1;
        },
        clear(){for(var key in this.acc_query){this.acc_query[key]=""};this.acc_query.max=Number(new Date())},
        handleCurrentChange(current_page){
        	this.page = current_page
        	this.result = this.d.slice((this.page-1)*10,this.page*10)
        },
        getWarntype(row){return this.accs[Number(row.warntype)-1]+"异常"},
        dataFormatter(row){return new Date(row.warntime).toLocaleString()},
        callbackFormatter(row){if(!row.warndriverresp){return "-"}else{return row.warndriverresp}},
        stateFormatter(row){return this.statuses[Number(row.status)]},
        showImgs(row){
        	if(row.warnimages){
        		this.getWarnImages(row.warnimages)
        		this.imgDialogVisible = true
        	}
        	else{
        		this.$alert('图片不存在', '提示', {
        			confirmButtonText: '确定',
        			})
        		}
    	},
    	getWarnImages(images){
    		var array = images.slice(1,-1).split(",");
    		this.warnimgs = []
    		array.forEach((img)=>{
    			GET('/file/download',{token:store.getters.user.token,sid:img}).then((data)=>{
    				this.warnimgs.push(data)
    			})
    		})
    	},
    	selectChange(s){this.radio = this.result.indexOf(s)},
    	showDetail(){
    		if(this.radio>=0){
    			this.orderDetail = {}
				this.truckDetail = {}
    			this.warnDialogVisible = true
    			var ordersid = this.result[this.radio].ordersid
    			GET('/order/query',{token:store.getters.user.token,sid:ordersid}).then((data)=>{
    				this.orderDetail = data.data[0]
    				GET('/basic_info/truck_info/query',{token:store.getters.user.token,sid:this.orderDetail.trucksid}).then((result)=>{
    					this.truckDetail = result.data[0]
    				})

    			})

    		}
    	},
		getNextItem(obj,index){
			return Object.keys(obj)[index]
		}
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
<style module="Form" src="../form.css"/>
<style>
	.page_block{display: block;margin-top:10px;margin-bottom:15px;}
	.line{text-align:center;}
	.warnBlock{
		display: flex;
		display: -webkit-flex;
		flex-grow: row nowrap;
		justify-content: space-around;
	}
	.warnimage{
		flex:0 1 32%;
		margin-right:5px;  
		height: auto;
	}
	.el-radio__label{
        display: none!important
    }
    .detailTable{
    	width: 100%; line-height: 20px; text-align: center; 
    	border-collapse: collapse; padding:2px;
    }
    .detailTable,.detailTable tr td { border:1px solid #ebeef5; }
    .detailTd{background-color: #E2E2E2}
</style>
