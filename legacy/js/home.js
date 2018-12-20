/**
 * Created by sjq on 2017/9/4.
 */
var url_order = "http://120.76.219.196:85/order/query";
var url_truck = "http://120.76.219.196:85/basic_info/truck_info/query";
var url_warn = "http://120.76.219.196:85/warn/query";
var map;
function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}
function mark(xy) {
    var marker = new AMap.Marker({
        icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: xy
    });
    marker.setMap(map);
}
$(document).ready(function() {
    var corporationsid = getCookie("corporationsid");
    var token = getCookie("token");
    var sid = getCookie("sid");
    var type = getCookie("type");

    $.ajax({
        url:url_order,
        type:'get',
        dataType:'json',
        data:{token:token},
        success:function (response) {
            document.getElementById("order_total").innerHTML = response.content.total + "单";
        }
    });

    $.ajax({
        url:url_warn,
        type:'get',
        dataType:'json',
        data:{token:token},
        success:function (response) {
            document.getElementById("warn_total").innerHTML = response.content.total + "次";
        }
    });

    $.ajax({
        url:url_truck,
        type:'get',
        dataType:'json',
        data:{token:token,status:1},
        success:function (response) {
            document.getElementById("truck_total").innerHTML = response.content.total + "辆";
        }
    });

    map = new AMap.Map("map", {
        zoomEnable:true,
        resizeEnable: true,
        zoom: 4
    });

    var xy = [];
    xy[0] = 116.307629; xy[1] = 40.058359;
    mark(xy);
    xy[0] = 115.307629; xy[1] = 42.058359;
    mark(xy);
});
