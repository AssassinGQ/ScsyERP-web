/**
 * Created by sjq on 2017/9/6.
 */
var url_queryone = "http://120.76.219.196:85/trucklogs/query_new";
var option = {
    title:{
        text:"车辆仪表盘"
    },
    tooltip : {
        formatter: "{a} <br/>{c} {b}"
    },
    toolbox: {
        show: true,
        feature: {
            restore: {show: true},
            saveAsImage: {show: true}
        }
    }
};
var series = [];
var speed = {
    name: '速度',
    type: 'gauge',
    z: 5,
    min: 0,
    max: 220,
    splitNumber: 11,
    radius: '85%',
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
    title : {
        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder',
            fontSize: 16,
            fontStyle: 'italic'
        }
    },
    detail : {
        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder'
        }
    },
    data:[{value: 40, name: '速度(km/h)'}]
};
var lefttire = {
    name: '左胎胎压',
    type: 'gauge',
    center: ['20%', '55%'],    // 默认全局居中
    radius: '70%',
    min:0,
    max:1600,
    splitNumber:8,
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
    title: {
        offsetCenter: [0, '-30%'],
        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder',
            fontSize: 16,
            fontStyle: 'italic'
        }// x, y，单位px
    },
    detail: {
        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: '500',
            fontSize:16
        }
    },
    data:[{value: 210, name: '左胎胎压(kpa)'}]
};
var righttire = {
    name: '右胎胎压',
    type: 'gauge',
    center: ['80%', '55%'],    // 默认全局居中
    radius: '70%',
    min:0,
    max:1600,
    splitNumber:8,
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
    title: {
        offsetCenter: [0, '-30%'],
        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder',
            fontSize: 16,
            fontStyle: 'italic'
        }// x, y，单位px
    },
    detail: {
        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: '500',
            fontSize:16
        }
    },
    data:[{value: 210, name: '右胎胎压(kpa)'}]
};
function regeocoder(xy) {  //逆地理编码
    var geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: "all"
    });
    geocoder.getAddress(xy, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
            var address = result.regeocode.formattedAddress; //返回地址描述
            $("#address").text(address);
        }
    });
    map.setZoomAndCenter(14, xy);
    var marker = new AMap.Marker({
        icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: xy
    });
    marker.setMap(map);
    $("#map_modal").modal();
}
function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}
function chart(_speed, _lefttire, _righttire) {
    var speed_data = [];
    var lefttire_data = [];
    var righttire_data = [];
    speed_data[0] = {name:"速度(km/h)",value:_speed};
    speed["data"] = speed_data;
    lefttire_data[0] = {name:"左胎胎压(kpa)",value:_lefttire};
    lefttire["data"] = lefttire_data;
    righttire_data[0] = {name:"右胎胎压(kpa)",value:_righttire};
    righttire["data"] = righttire_data;
    series[0] = speed; series[1] = lefttire; series[2] = righttire;
    option["series"] = series;
    var div = document.getElementById("chart");
    var chart = echarts.init(div);
    chart.setOption(option,true);
}
$(document).ready(function() {
    var trucknumber = getCookie("trucknumber");
    var token = getCookie("token");
    var data = {};
    data["token"] = token;
    data["trucknumber"] = trucknumber;
    data["limit"] = 1;
    $.ajax({
        url:url_queryone,type:'get', dataType:'json', data:data,
        success:function (response) {
            if(response.status == 0){
                var trucklog = response.content.data[0];
                var locks = trucklog["lock"].split("-");
                for(var i = 0; i < 5; i++){
                    if(locks[i] == 0){
                        trucklog["lock"+(i+1)] = "打开";
                    }
                    else{
                        trucklog["lock"+(i+1)] = "关闭";
                    }
                }
                var batterys = trucklog["battery"];
                for(var j = 1; j <= 5; j++){
                    var per = batterys.split("-")[j-1];
                    var bar = document.getElementById("bar"+j);
                    var _per = document.getElementById("per"+j);
                    _per.innerText = per + "%";
                    bar.style.width = per + "%";
                    if(per <= 10){
                        bar.style.backgroundColor = "#f63a0f";
                    }
                    else if(per <= 25){
                        bar.style.backgroundColor = "#f27011";
                    }
                    else if(per <= 50){
                        bar.style.backgroundColor = "#f2b01e";
                    }
                    else if(per <= 75){
                        bar.style.backgroundColor = "#f2d31b";
                    }
                    else{
                        bar.style.backgroundColor = "#86e01e";
                    }
                }
                var xy = []; xy[0] = trucklog["gpsx"]; xy[1] = trucklog["gpsy"];
                regeocoder(xy);
                var speed = trucklog["speed"];
                var lefttire = trucklog["lefttirepressure"];
                var righttire = trucklog["righttirepressure"];
                chart(speed,lefttire,righttire);
                trucklog["speed"] += "(km/h)"
                trucklog["distance"] += "公里";
                trucklog["lefttiretemp"] = (trucklog["lefttiretemp"] - 40) + "℃";
                trucklog["righttiretemp"] = (trucklog["righttiretemp"] - 40) + "℃";
                var form = document.getElementById("trucklog_form");
                var spans = form.getElementsByTagName("span");
                for(var i = 0; i < spans.length; i++){
                    var span = spans[i];
                    var name = span.getAttribute("name");
                    if(trucklog[name] != null){
                        $(span).html(trucklog[name]);
                    }
                }
            }
        }
    })
    map = new AMap.Map("map", {
        zoomEnable:false,
        resizeEnable: true,
        zoom: 14
    });
    var xy = []; xy[0] = 116.307629; xy[1] = 40.058359;
    regeocoder(xy);
    chart(100,210,200);
});
