<template>
<div class="box">
	<div id="mymap"></div>
	<p>{{"gpsx:"+gpsx+",gpsy:"+gpsy}}</p>
</div>
</template>
<script>
import AMap from 'AMap'
export default {
	name:'map-box',
	props:{
		gpsx:{
			type: Number,
			required:true
		},
		gpsy:{
			type: Number,
			required:true
		}
	},
	methods:{
		createMap(){
            var map = new window.AMap.Map('mymap',{zoom: 13,zoomEnable:false,center: [this.gpsx,this.gpsy]})
            var marker = new window.AMap.Marker({position:[this.gpsx,this.gpsy],map:map})
		},
	},
	mounted(){
		  this.createMap()
	}
}
</script>
<style scoped>
	#mymap{
    	width: 100%;
        height:300px;
    }
    .box{
    	width: 100%;
    	height: 100%;
    }
</style>