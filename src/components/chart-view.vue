<template>
	<div :id="randomId"></div>
</template>
<script>
export default{
	name:"chart-view",
	props:{
		title:{
			type:String,
			required:true
		},
		xaxis:{
			type:Array,
			required:true
		},
		data:{
			type:Array,
			required:true
		},
		width:{
			type:Number,
			required:false
		},
		height:{
			type:Number,
			required:false
		}
	},
	data:() => ({
		randomId:'echarts-dom'+Date.now()+Math.random()
	}),
	methods:{
		create(){
	this.mychart = this.$echarts.init(document.getElementById(this.randomId))
	this.mychart.setOption({
		title:{
			show:true,
        	text:this.title,
        	x:'center',
        	y:'top',
        	textAlign:'center'
		},
		xAxis: {
        	type: 'category',
        	data: this.xaxis,
        	axisLabel:{
        		interval:0
        	}
    	},
    	yAxis: {
        	type: 'value'
    	},
    	series: [{
        	data: this.data,
        	type: 'bar',
        	barMaxWidth:20
    	}],
    	 label: {
          show: true,
          position: 'top'
    	},
    	itemStyle:{
       		color:'#2f4554'
    	}
	})	
	}
	},
	mounted(){
		let chart = document.getElementById(this.randomId)
		if(!this.width&&!this.height){
			chart.style.width = 600+'px'
			chart.style.height = 400+'px'
		}else{
			chart.style.width = this.width+'px'
			chart.style.height = this.height+'px'
		}
		this.create()
	},
	watch:{
		'data':'create'
	}
}
</script>