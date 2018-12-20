/**
 * Created by sjq on 2017/8/10.
 */
var url_warn = "http://120.76.219.196:85/warn/query";
var url_lock = "http://120.76.219.196:85/lock/query";
var url_order = "http://120.76.219.196:85/order/query";
var url_truck = "http://120.76.219.196:85/basic_info/truck_info/query";
var url_driver = "http://120.76.219.196:85/basic_info/escort_info/query";
var url_fee2 = ""
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
function setCookie(name,value) {
    document.cookie = name + "="+ escape (value);
}
function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}
function fill(form,data) {
    var inputs = form.getElementsByTagName("input");
    for(var i = 0; i < inputs.length; i++){
        var input = inputs[i];
        if(data[input.name] != null){
            input.value = data[input.name];
        }
    }
}
function tran_lock(info) {
    if(info["requestat"] != null){info["requestat"] = new Date(info["requestat"]).toLocaleString();}
    if(info["responseat"] != null){info["responseat"] = new Date(info["responseat"]).toLocaleString();}
    if(info["request"] == 0){info["request"] = "上部开锁";}
    else if(info["request"] == 1){info["request"] = "上部上锁";}
    else if(info["request"] == 2){info["request"] = "下部开锁";}
    else if(info["request"] == 3){info["request"] = "下部上锁";}
    if(info["status"] == 0){info["status"] = "已请求";}
    else if(info["status"] == 1){info["status"] = "已回复";}
    else {info["status"] = "已处理";}
    return info;
}
function tran_order(data) {
    data["orderstatus"] = tran_orderstatus(data["orderstatus"]);
    if(data["ordertime"] != null){
        data["ordertime"] = new Date(data["ordertime"]).toLocaleString();
    }
    if(data["distributetime"] != null){
        data["distributetime"] = new Date(data["distributetime"]).toLocaleString();
    }
    if(data["loadtime"] != null){
        data["loadtime"] = new Date(data["loadtime"]).toLocaleString();
    }
    if(data["unloadtime"] != null){
        data["unloadtime"] = new Date(data["unloadtime"]).toLocaleString();
    }
    if(data["returntime"] != null){
        data["returntime"] = new Date(data["returntime"]).toLocaleString();
    }
    if(data["verifytime"] != null){
        data["verifytime"] = new Date(data["verifytime"]).toLocaleString();
    }
    if(data["unloaddateddl"] != null){
        data["unloaddateddl"] = new Date(data["unloaddateddl"]).toLocaleString();
    }
    if(data["loaddateddl"] != null){
        data["loaddateddl"] = new Date(data["loaddateddl"]).toLocaleString();
    }
    return data;

}
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
        url:url_truck,type:'get',dataType:'json',async:false,data:{token:token,sid:trucksid},
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
                data["RTCddl"] = new Date(RTCddl).toLocaleDateString();
                if(RTCddl < new Date().getTime()){
                    data["RTCddl"] += "(已超期)";
                    document.getElementById("RTCddl").style.color = "red";
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
                data["QCddl"] = new Date(QCddl).toLocaleDateString();
                if(QCddl < new Date().getTime()){
                    data["QCddl"] += "(已超期)";
                    document.getElementById("QCddl").style.color = "red";
                }
                else{
                    document.getElementById("QCddl").style.color = "black";
                }
            }
        }
    });

    /*查询订单*/
    $.ajax({
        url:url_order,type:'get',dataType:'json',async:false,data:{token:token,sid:ordersid},
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
        url:url_ershen, dataType:'json',type:'get',data:{token:token,trucksid:trucksid},
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
        url:url_nianshen, dataType:'json',type:'get',data:{token:token,trucksid:trucksid},
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
        var type = row["type"];
        if(type == "00" || type == "02"){
            setCookie("note_ordersid",row["sid"]);
            window.open("cy_order.html");
        }
        else if(type[0] == "0"){
            setCookie("note_ordersid",row["sid"]);
            window.open("cy_feecheck.html");
        }
        else if(type == "10"){
            setCookie("note_locksid",row["sid"]);
            window.open("cy_lock.html");
        }
        else if(type == "21"){
            setCookie("note_accidentsid",row["sid"]);
            window.open("cy_accidentquery.html");
        }
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
            if(type == "10"){
//              fill_lockform(cursid);
                alert("有新开锁请求");
                var row = {};
                row["sid"] = cursid;
                row["type"] = type;
                row["content"] = "新开锁请求";
                row["time"] = new Date().toLocaleString();
                rows.splice(0,0,row);
                $("#table1").bootstrapTable('load',rows);
            }
            else if(type == "00"){
//                fill_orderform(cursid);
                alert("有新订单消息");
                var row = {};
                row["sid"] = cursid;
                row["type"] = type;
                row["content"] = "新订单消息";
                row["time"] = new Date().toLocaleString();
                rows.splice(0,0,row);
                $("#table1").bootstrapTable('load',rows);
            }
            else if(type == "21"){
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
            else if(type == "02"){
                alert("有车辆回场,等待一审");
                var row = {};
                row["sid"] = cursid;
                row["type"] = type;
                row["content"] = "车辆回场,等待一审";
                row["time"] = new Date().toLocaleString();
                rows.splice(0,0,row);
                $("#table1").bootstrapTable('load',rows);
            }
            else if(type == "03"){
                var content = "费用清单" + cursid + "重新提交";
                alert(content);
                var row = {};
                row["sid"] = cursid;
                row["type"] = type;
                row["content"] = content;
                row["time"] = new Date().toLocaleString();
                rows.splice(0,0,row);
                $("#table1").bootstrapTable('load',rows);
            }
            else if(type == "04"){
                var content = "费用清单" + cursid + "通过一审,等待二审";
                alert(content);
                var row = {};
                row["sid"] = cursid;
                row["type"] = type;
                row["content"] = content;
                row["time"] = new Date().toLocaleString();
                rows.splice(0,0,row);
                $("#table1").bootstrapTable('load',rows);
            }
            else if(type == "05"){
                var content = "费用清单" + cursid + "通过二审,等待三审";
                var row = {};
                row["sid"] = cursid;
                row["type"] = type;
                row["content"] = content;
                row["time"] = new Date().toLocaleString();
                rows.splice(0,0,row);
                $("#table1").bootstrapTable('load',rows);
            }
            else if(type == "06"){
                var content = "费用清单" + cursid + "通过三审,等待四审";
                alert(content);
                var row = {};
                row["sid"] = cursid;
                row["type"] = type;
                row["content"] = content;
                row["time"] = new Date().toLocaleString();
                rows.splice(0,0,row);
                $("#table1").bootstrapTable('load',rows);
            }
            else if(type == "07"){
                var content = "费用清单" + cursid + "通过四审,订单完成";
                alert(content);
                var row = {};
                row["sid"] = cursid;
                row["type"] = type;
                row["content"] = content;
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


    $("#btn_removeall").click(function () {
        $("#table1").bootstrapTable('removeAll');
        rows = [];
    });

    /*
    $("#pass").click(function () {
        var data = {};
        data["sid"] = cursid;
        data["token"] = token;
        data["response"] = 0;
        $.ajax({
            url:url_lockresponse,
            type:'post',
            dataType:'json',
            data:data,
            success:function (response) {
                document.getElementById("lock_info").innerText = decodeURI(response.msg);
            },
            error:function () {
                document.getElementById("lock_info").innerText = "操作错误"
            }
        })
    });
    $("#reject").click(function () {
        var data = {};
        data["sid"] = cursid;
        data["token"] = token;
        data["response"] = 1;
        $.ajax({
            url:url_lockresponse,
            type:'post',
            dataType:'json',
            data:data,
            success:function (response) {
                document.getElementById("lock_info").innerText = decodeURI(response.msg);
            },
            error:function () {
                document.getElementById("lock_info").innerText = "操作错误"
            }
        })
    })
    */
});
