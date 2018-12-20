<template>
	<div>
		<el-form :inline="true"  class="demo-form-inline">
			<el-form-item label="车牌号">
                <el-autocomplete class="inline-input" v-model="trucknumber" :fetch-suggestions="querySearch" placeholder="请输入车牌号" @select="handleSelect"></el-autocomplete>
  			</el-form-item>
  			<el-form-item>
    			<el-button type="primary" @click="onSubmit(trucknumber)">查询</el-button>
  			</el-form-item>
		</el-form>
		<div>
			<el-table :data="result" style="width:100%" border>
				<el-table-column prop="trucknumber" label="车牌号"></el-table-column>
				<!-- <el-table-column prop="sid" label="车辆sid"></el-table-column> -->
				<!-- <el-table-column prop="gpsx" label="GPS-X坐标"></el-table-column>
				<el-table-column prop="gpsy" label="GPS-Y坐标"></el-table-column> -->
				<el-table-column prop="distance" label="里程(km)"></el-table-column>
				<el-table-column prop="speed" label="车速(km/h)"></el-table-column>
				<el-table-column prop="fuelvol" label="油量(L)"></el-table-column>
				<el-table-column prop="lefttirepressure" label="左轮胎压(kpa)"></el-table-column>
				<el-table-column prop="lefttiretemp" label="左轮胎温"></el-table-column>
				<el-table-column prop="righttirepressure" label="右轮胎压(kpa)"></el-table-column>
				<el-table-column prop="righttiretemp" label="右轮胎温"></el-table-column>
				<!-- <el-table-column prop="lock" label="安全锁"></el-table-column>
                <el-table-column prop="battery" label="网关电量"></el-table-column> -->
				<el-table-column prop="time" min-width="115"  label="时间" :formatter="dataFormatter" ></el-table-column>
			</el-table>
		</div>
		<div id="mychart" style="width:100%;height:450px">
		</div>
        <div id="lock_battery" :style="{display:lock_show?'flex':'none'}">
            <div id="lock">
                <div class="lock_item lock_text">安全锁</div>
                <div v-for="(lock , index) in locks" class="lock_item"><div class="lock_state" :style="{backgroundColor:lock==1?'#63869e':'#c23531'}">{{lock==1?"关闭":"打开"}}</div><div class="lock_index">{{index+1}}</div></div>
            </div>
            <div id="battery">
                <div class="b_item b_text">网关电量</div>
                <div v-for="(battery , index) in batterys" class="b_item">
                    <div class="b_data">{{battery+"%"}}</div>
                    <div class="b_out" :style="{border:battery<=25?'1px solid #c23531':''}"><div class="b_in" :style="{height:battery/100*72+'px',backgroundColor:battery<75?battery<=25?'#c23531':'#c98218':'#63869e'}" ></div></div>
                    <div class="b_index">{{index+1}}</div>
                </div>
            </div>
        </div>
        <div id="map" :style="{display:lock_show?'block':'none'}"></div>
	</div>
</template>
<script>

import { GET } from '../api'
import AMap from 'AMap'
import store from '../store'

export default{
	name:"trucklog",
	data:() => ({
		trucknumber:"",
		result:[],
		option:{},
        locks:[],
        lock_show:false,
        batterys:[],
        vehicles:[]
	}),
	methods:{
		onSubmit(trucknumber){
			
			GET('/trucklogs/query_new', {trucknumber:trucknumber,limit:1})
                .then(({ data }) => {
                    this.result = data
                    // console.log(data)
                    this.createChart()
                    this.option.series[0].data[0].value = data[0].speed
                    this.option.series[1].data[0].value = data[0].lefttirepressure
                    this.option.series[2].data[0].value = data[0].fuelvol
                    this.option.series[3].data[0].value = data[0].righttirepressure
                    this.mychart.setOption(this.option,true)
                    this.lock_show = true
                    this.locks = data[0].lock.split("-").map((i)=>{return Number(i)})
                    this.batterys = data[0].battery.split("-")
                    // this.batterys = [90,75,50,30,20]
                    this.createMap(data[0].gpsx,data[0].gpsy)

            },err => console.log(err))
		},
		dataFormatter(row){
			return new Date(row.time).toLocaleString()
		},
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
            this.trucknumber = item.value
        },
        createMap(x,y){
            var map = new window.AMap.Map('map',{zoom: 13,zoomEnable:false,center: [x,y]})
            var marker = new window.AMap.Marker({position:[x,y],map:map})
            // new window.AMap.service('window.AMap.Geocoder',()=>{geocoder.getAddress([x,y],(status, result)=>{console.log([status,result]);if(status === 'complete' && result.info === 'OK'){console.log(result.regeocode.formattedAddress)}else{console.log("map error")}})})
        },
		createChart(){
			 this.mychart = this.$echarts.init(document.getElementById('mychart'));
				this.option = {
				title: {text:"车辆仪表盘"},
    			tooltip : {
       			 	formatter: "{a} <br/>{c} {b}"
    			},
    			toolbox: {
        			show: true,
        			feature: {
            			restore: {show: true},
            			saveAsImage: {show: true}
        			}
    			},
    			series:[
            {
            name: '车速',
            type: 'gauge',
            z: 3,
            min: 0,
            max: 100,
            splitNumber: 10,
            radius: '50%',
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 10
                }
            },
            axisTick: {            // 坐标轴小标记
                length: 15,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            splitLine: {           // 分隔线
                length: 20,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            axisLabel: {
                backgroundColor: 'auto',
                borderRadius: 2,
                color: '#000',
                padding: 3,
                textShadowBlur: 2,
                textShadowOffsetX: 1,
                textShadowOffsetY: 1,
                textShadowColor: '#222'
            },
            title : {
                fontWeight: 'bolder',
                fontSize: 15,
                fontStyle: 'italic'
            },
            detail : {
                formatter: function (value) {
                    value = (value + '').split('.');
                    value.length < 2 && (value.push('00'));
                    return ('00' + value[0]).slice(-2)
                        + '.' + (value[1] + '00').slice(0, 1);
                },
                fontWeight: 'bolder',
                // backgroundColor: '#444',
                shadowBlur: 5,
                shadowColor: '#333',
                shadowOffsetX: 0,
                shadowOffsetY: 3,
                fontFamily: 'Arial',
                width: 100,
                color: '#000',
                rich: {}
            },
            data:[{value: 40, name: '车速km/h'}]
            },
            {
            name: '左轮压力kpa',
            type: 'gauge',
            center: ['20%', '55%'],    // 默认全局居中
            radius: '50%',
            min:0,
            max:1500,
            splitNumber:10,
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 8
                }
            },
            axisTick: {            // 坐标轴小标记
                length:12,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
             axisLabel: {
                backgroundColor: 'auto',
                borderRadius: 2,
                color: '#000',
                padding: 3,
                textShadowBlur: 2,
                textShadowOffsetX: 1,
                textShadowOffsetY: 1,
                textShadowColor: '#222'
            },
            splitLine: {           // 分隔线
                length:20,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            pointer: {
                width:5
            },
            title : {
                fontWeight: 'bolder',
                fontSize: 15,
                fontStyle: 'italic',
                bottom:'5px',
                offsetCenter: [0, '5px']
            },
            detail: {
                fontWeight: 'bolder',
                // backgroundColor: '#444',
                shadowBlur: 5,
                shadowColor: '#333',
                shadowOffsetX: 0,
                shadowOffsetY: 3,
                fontFamily: 'Arial',
                width: 100,
                color: '#000',
                rich: {}
            },
            data:[{value: 1450, name: '左轮压力kpa'}]
            },
            {
            name: '油表',
            type: 'gauge',
            center: ['65%', '30%'],
            radius: '35%',
            min: 0,
            max: 120,
            startAngle: 130,
            endAngle: 50,
            splitNumber: 4,
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 8
                }
            },
            axisTick: {           
                show:true
            }, 
            axisLabel: {
            },
            splitLine: {           // 分隔线
                length: 15,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            pointer: {
                width:3
            },
            title : {
                offsetCenter: [0, '50px'],
                textStyle: {       
                    color: '#000',
                    fontSize: 15
                }
            },
            detail : {
            	fontWeight:"bolder",
                // backgroundColor: '#444',
                shadowBlur: 2,
                shadowColor: '#333',
                shadowOffsetX: 0,
                shadowOffsetY: 3,
                fontFamily: 'Arial',
                width: 100,
                color: '#000',
                fontSize:"14px"
            },
            data:[{value: 40, name: '油量/L'}]
            },
            {
            name: '右轮压力kpa',
            type: 'gauge',
            center: ['80%', '55%'],    // 默认全局居中
            radius: '50%',
            min:0,
            max:1500,
            splitNumber:10,
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 8
                }
            },
            axisTick: {            // 坐标轴小标记
                length:12,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            splitLine: {           // 分隔线
                length:20,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            pointer: {
                width:5
            },
            axisLabel: {
                backgroundColor: 'auto',
                borderRadius: 2,
                color: '#000',
                padding: 3,
                textShadowBlur: 2,
                textShadowOffsetX: 1,
                textShadowOffsetY: 1,
                textShadowColor: '#222'
            },
            title : {
                fontWeight: 'bolder',
                fontSize: 15,
                fontStyle: 'italic',
                offsetCenter: [0, '5px']
            },
            detail : {
                fontWeight: 'bolder',
                // backgroundColor: '#444',
                shadowBlur: 5,
                shadowColor: '#333',
                shadowOffsetX: 0,
                shadowOffsetY: 3,
                fontFamily: 'Arial',
                width: 100,
                color: '#000',
                rich: {}
            },
            data:[{value: 1450, name: '右轮压力kpa'}]
            }]
   			};
		this.mychart.setOption(this.option);  
		}
	},
    mounted(){
        this.getTrucks()
    }
}
</script>
<style module="Form" src="../form.css"/>
<style scoped>
    #lock_battery{
        width: 100%;
        height: 100px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
    }
    #lock,#battery{
        padding: 5px;
        flex:0 1 300px;
        height: 100px;
        border: 1px solid #606266;
        display: flex;
        flex-flow: row nowrap;
        justify-content:center;
    }
    .lock_item{
        flex:0 1 60px;
        text-align: center;
        height: 100px;
        margin-left: 2px;
    }
    .lock_text{flex:0 1 80px;line-height: 100px;font-size: 16px;font-weight: bold;}
    .lock_state{height: 60px;line-height: 60px;border-radius: 2px;cursor:pointer;}
    .lock_state:hover{zoom:1.05;}
    .lock_index{height: 40px;line-height:40px;font-size: 15px;}
    .b_item{
        flex:0 1 40px;
        text-align: center;
        height: 100px;
        margin-left: 5px;
    }
    .b_text{flex:0 1 70px;font-size:16px;font-weight: bold;line-height:100px}
    .b_out{width:30px;height:72px;margin-left:auto;margin-right:auto;border-radius: 2px;background-color:#d5d5d5;position: relative;}
    .b_in{width:30px;border-radius: 2px;background-color:#63869e;position:absolute;bottom:0px;}
    .b_data,.b_index{height: 14px;font-size:10px}

    #map{
        width: 90%;
        height:300px;
        margin: 60px auto;
    }
</style>