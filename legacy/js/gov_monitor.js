/**
 * Created by sjq on 2017/8/9.
 */
var url_warn = "http://120.76.219.196:85/warn/query";
var url_order = "http://120.76.219.196:85/order/query";
var url_truck = "http://120.76.219.196:85/basic_info/truck_info/query";
var url_driver = "http://120.76.219.196:85/basic_info/escort_info/query";
var url_download = "http://120.76.219.196:80/file/download";
var url_ershen = "http://120.76.219.196:85/basic_info/truck_info/truckarchives_checksecond";
var url_nianshen = "http://120.76.219.196:85/basic_info/truck_info/truckarchives_checkannual";
var url_lockresponse = "http://120.76.219.196:85/lock/response";
var token;
var corporationsid;
var sid;
var type;
var rows = [];
var cursid;

function fill_accidentform(sid) {
    var data = {};
    var trucksid; var driversid; var ordersid; var img;
    $.ajax(url_warn,{
        type:'get',dataType:'json',data:{token:token,sid:sid},async:false,
        success:function(response){
//			alert(JSON.stringify(response));
            if(response.status == 0){
                var _data = response.content.data[0];
                data["warntype"] = tran_warntype(_data["warntype"]);
                img = data["warndriverimages"];
                data["warntime"] = new Date(_data["warntime"]).toLocaleString();
                data["gps"] = "经度:" + _data["gpsx"] + ";" + "纬度:" + _data["gpsy"];
                driversid = _data.driversid;
                ordersid = _data.ordersid;
                trucksid = _data.trucksid;
                corporationsid = _data.corporationsid;
            }
        }
    });
    /*查询车辆*/
    $.ajax({
        url:url_truck,type:'get',dataType:'json',async:false,data:{token:token,sid:trucksid,corporationsid:corporationsid},
        success:function (response) {
            if(response.status == 0){
                data["trucknumber"] = response.content.data[0]["RTCnumber"];
                data["RTCnumber"] = response.content.data[0]["RTCnumber"];
                if(response.content.data[0]["type"] == "0"){
                    data["type"] = "牵引车";
                }
                else{
                    data["type"] = "重型货车";
                }
                var RTCddl = response.content.data[0]["RTCddl"];
                if(RTCddl != null){
                    data["RTCddl"] = new Date(RTCddl).toLocaleDateString();
                    if(RTCddl < new Date().getTime()){
                        data["RTCddl"] += "(已超期)";
                        document.getElementById("RTCddl").style.color = "red";
                    }
                }
                else{
                    document.getElementById("RTCddl").style.color = "black";
                }
            }
        }
    });

    /*查询司机*/
    $.ajax({
        url:url_driver,type:'get',dataType:'json',async:false,data:{token:token,sid:driversid},
        success:function (response) {
            if(response.status == 0){
                data["drivername"] = response.content.data[0]["name"];
                data["QCnumber"] = response.content.data[0]["QCnumber"];
                var QCddl = response.content.data[0]["QCddl"];
                if(QCddl != null){
                    data["QCddl"] = new Date(QCddl).toLocaleDateString();
                    if(QCddl < new Date().getTime()){
                        data["QCddl"] += "(已超期)";
                        document.getElementById("QCddl").style.color = "red";
                    }
                }
                else{
                    document.getElementById("QCddl").style.color = "black";
                }
            }
        }
    });

    /*查询订单*/
    $.ajax({
        url:url_order,type:'get',dataType:'json',async:false,data:{token:token,sid:ordersid,corporationsid:corporationsid},
        success:function (response) {
            if(response.status == 0){
                data["sellername"] = response.content.data[0]["sellername"];
                data["ordersid"] = ordersid;
                data["corporationname"] = response.content.data[0]["corporationname"];
                data["productname"] = response.content.data[0]["productname"];
                data["productweight"] = response.content.data[0]["productweight"];
                data["producttype"] = response.content.data[0]["producttype"];
            }
        }
    });

    /*查询二级审核*/
    $.ajax({
        url:url_ershen, dataType:'json',type:'get',data:{token:token,trucksid:trucksid,corporationsid:corporationsid},
        success:function (response) {
            if(response.status == 0){
                var msg = decodeURI(response.msg);
                document.getElementById("ershen").value = msg;
                if(msg[0] != "需"){
                    document.getElementById("ershen").style.color = "black";
                }
                else{
                    document.getElementById("ershen").style.color = "red";
                }
            }
        }
    });

    /*查询年审*/
    $.ajax({
        url:url_nianshen, dataType:'json',type:'get',data:{token:token,trucksid:trucksid,corporationsid:corporationsid},
        success:function (response) {
            if(response.status == 0){
                var msg = decodeURI(response.msg);
                document.getElementById("nianshen").value = msg;
                if(msg[0] != "需"){
                    document.getElementById("nianshen").style.color = "black";
                }
                else{
                    document.getElementById("nianshen").style.color = "red";
                }
            }
        }
    });

    var form = document.getElementById("accident_form");
    var src;
    fill(form,data);
    $("#accident_modal").modal();
    $("#img1").click(function () {
        if(img == null){
            alert("无图片");
        }
        else{
            img = JSON.parse(img);
            fill_imgform(img);
        }
    })
}
function formatter(value, row, index) {
    return [
        '<a>查看详情</a>'
    ].join('');
}
window.operateEvents = {
    'click a': function (e, value, row, index) {
        setCookie("note_accidentsid",row["sid"]);
        window.open("gov_accidentquery.html");
    }
};

$(document).ready(function() {
    if(!(document.cookie || navigator.cookieEnabled)){
        alert('请启用浏览器cookie');
    }
    corporationsid = getCookie("corporationsid");
    token = getCookie("token");
    sid = getCookie("sid");
    type = getCookie("type");


    var socket = new WebSocket('ws://120.76.219.196:85/wsshake');
    socket.onopen = function(event) {
        var data = {};
        data["sid"] = sid;
        data["type"] = type;
        data["token"] = token;
        var json = JSON.stringify(data);
        socket.send(json);
        socket.onmessage = function(event) {

            var content = event.data;
            content = JSON.parse(content);
            var type = content.type;
            cursid = content.sid;
            if(type == "22"){
                document.getElementById("alarm").play();
                fill_accidentform(cursid);
                var row = {};
                row["sid"] = cursid;
                row["type"] = type;
                row["content"] = "新异常消息";
                row["time"] = new Date().toLocaleString();
                rows.splice(0,0,row);
                $("#table1").bootstrapTable('load',rows);
            }
        };
        socket.onclose = function(event) {
        };
    };


    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);
    var panel = document.getElementById("table1").parentNode;
    var width = panel.offsetWidth - 10;
    var table = document.getElementById("table1");
    $(table).css("width",width);
    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width: '5%'},
            {field: 'content', title: '消息描述', align: 'center'},
            {field: 'time', title: '通知时间',align: 'center',sortable:true},
            {title: '查看详情', align:'center',formatter:'formatter',events:operateEvents}
        ],
        sortable:true,
        pagination: true,
        height: 290,

        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });

    /*
    $("#btn_chakan").click(function () {
        var type = $("#table1").bootstrapTable('getSelections')[0].type;
        cursid = $("#table1").bootstrapTable('getSelections')[0].sid;
        fill_accidentform(cursid);
    });
    */
    $("#btn_removeall").click(function () {
        $("#table1").bootstrapTable('removeAll');
        rows = [];
    });


});
