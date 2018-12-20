/**
 * Created by sjq on 2017/8/19.
 */
var url_logtest = "http://120.76.219.196:85/test/getTruckLogReq";
var url_download = "http://120.76.219.196:80/file/download";
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
    max:400,
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
    max:400,
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
function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}
$(document).ready(function() {
    var corporationsid = getCookie("corporationsid");
    var token = getCookie("token");
    var sid = getCookie("sid");
    var type = getCookie("type");

    /*
    $('.onoff').bootstrapSwitch({
        onText:"开",
        offText:"关",
        state:true,
    });
    */

    map = new AMap.Map("map", {
        zoomEnable:false,
        resizeEnable: true,
        zoom: 14
    });
    var xy = []; xy[0] = 116.307629; xy[1] = 40.058359;
    regeocoder(xy);
    chart(100,210,200);


    $("#search").click(function () {
        $.ajax({
            url:url_logtest,type:'get',dataType:'json',data:{trucknumber:$("#trucknumber").val()},
        })
    });

    var socket = new WebSocket('ws://120.76.219.196:85/wsshake');
    socket.onopen = function(event) {
        var data = {};
        data["sid"] = sid;
        data["type"] = type;
        data["token"] = token;
        var json = JSON.stringify(data);
        socket.send(json);
        socket.onmessage = function(event) {
            var data = event.data;
            alert(data);
            data = JSON.parse(data);
            var trucklog = data.content.trucklog;
            trucklog["gps"] = "经度:"+trucklog["gpsx"]+";"+"纬度:"+trucklog["gpsy"];
            var xy = []; xy[0] = trucklog["gpsx"]; xy[1] = trucklog["gpsy"];
            var speed = trucklog["speed"];
            var lefttire = trucklog["lefttirepressure"];
            var righttire = trucklog["righttirepressure"];
            chart(speed,lefttire,righttire);
            var locks = trucklog["lock"].split("-");
            for(var i = 0; i < 5; i++){
                if(locks[i] == 0){
                    trucklog["lock"+(i+1)] = "打开";
                }
                else{
                    trucklog["lock"+(i+1)] = "关闭";
                }
            }
            var form = document.getElementById("trucklog_form");
            var spans = form.getElementsByTagName("span");
            for(var i = 0; i < spans.length; i++){
                var span = spans[i];
                var name = span.getAttribute("name");
                if(trucklog[name] != null){
                    $(span).html(trucklog[name]);
                }
            }
            var warn = data.content.warn;
            var warnimages = warn.warnimages;
            warnimages = JSON.parse(warnimages);
            var img1 = warnimages[0];
            var img2 = warnimages[1];

            $.ajax({
                url:url_download,type:'get',dataType:'text',data:{sid:img1,token:token},
                success:function (response) {
                    response = decodeURIComponent(response);
                    response = JSON.parse(response);
                    var src = response.content;
                    document.getElementById("img1").setAttribute("src",src);
                }
            });
            $.ajax({
                url:url_download,type:'get',dataType:'text',data:{sid:img2,token:token},
                success:function (response) {
                    response = decodeURIComponent(response);
                    response = JSON.parse(response);
                    var src = response.content;
                    document.getElementById("img2").setAttribute("src",src);
                }
            });
            regeocoder(xy);
        };
        socket.onclose = function(event) {
        };
    };




});
