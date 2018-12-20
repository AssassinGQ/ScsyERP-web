/**
 * Created by sjq on 2017/8/22.
 */
var url_query = "http://120.76.219.196:85/warn/query";
var url_order = "http://120.76.219.196:85/order/query";
var url_truck = "http://120.76.219.196:85/basic_info/truck_info/query";
var url_driver = "http://120.76.219.196:85/basic_info/escort_info/query";
var url_download = "http://120.76.219.196:80/file/download";
var url_corporation = "http://120.76.219.196:85/user/query_corporation";
var url_ershen = "http://120.76.219.196:85/basic_info/truck_info/truckarchives_checksecond";
var url_nianshen = "http://120.76.219.196:85/basic_info/truck_info/truckarchives_checkannual";
var data = {};
var src;
var dept;

function tran_load(d) {
    for(var i = 0; i < d.length; i++){
        if(d[i]["warntype"] == 1){d[i]["warntype"] = "安全锁异常";}
        else if(d[i]["warntype"] == 2){d[i]["warntype"] = "泄露异常";}
        else if(d[i]["warntype"] == 3){d[i]["warntype"] = "胎压异常";}
        else if(d[i]["warntype"] == 4){d[i]["warntype"] = "油量异常";}
        else if(d[i]["warntype"] == 5){d[i]["warntype"] = "超速异常";}
        else if(d[i]["warntype"] == 6){d[i]["warntype"] = "停车异常";}
        else if(d[i]["warntype"] == 7){d[i]["warntype"] = "疲劳驾驶";}
        else if(d[i]["warntype"] == 8){d[i]["warntype"] = "急刹异常";}
        else if(d[i]["warntype"] == 10){d[i]["warntype"] = "车辆事故";}
        else if(d[i]["warntype"] == 11){d[i]["warntype"] = "超载异常";}

        if(d[i]["status"] == 0){d[i]["status"] = "已发生"}
        else if(d[i]["status"] == 1){d[i]["status"] = "已通知"}
        else if(d[i]["status"] == 2){d[i]["status"] = "已阅读"}
        else if(d[i]["status"] == 3){d[i]["status"] = "已处理"}

        d[i]["warntime"] = new Date(d[i]["warntime"]).toLocaleString();
        d[i]["gps"] = "x:"+d[i]["gpsx"]+";"+"y:"+d[i]["gpsy"];
    }
    return d;
}
function parmfun() {
    var param = {};
    param["token"] = token;
    param["limit"] = limit;
    var searchform = document.getElementById("searchform");
    var inputs = searchform.getElementsByTagName("input");
    for(var i = 0; i < inputs.length; i++){
        var input = inputs[i];
        if(input.value.length != 0){
            param[input.name] = input.value;
        }
    }
    var selects = searchform.getElementsByTagName("select");
    for(var i = 0; i < selects.length; i++){
        var select = selects[i];
        var value = $(select).val();
        if(value != null && value != -1){
            param[select.name] = value;
        }
        /*
         var index = select.selectedIndex;
         if(index != 0 && index != -1){
         param[select.name] = select.options[index].value;
         }
         */
    }
    var _warntype = $("#warntype").val();
    if(_warntype == null || _warntype[0] == -1){
        param["warntype"] = JSON.stringify(warntype[dept]);
    }
    else{
        param["warntype"] = JSON.stringify(_warntype);
    }
    var min = document.getElementById("min").value;
    var max = document.getElementById("max").value;
    if(min.length != 0 || max.length != 0){
        var createdat = {};
        if(min.length != 0){
            createdat["min"] = new Date(min).getTime();
        }
        if(max.length != 0){
            createdat["max"] = new Date(max).getTime();
        }
        param["createdat"] = JSON.stringify(createdat);
    }
    return param;
}
function fill_accidentform(ordersid,trucksid,driversid,corporationsid) {
    data["warntime"] = $("#table1").bootstrapTable('getSelections')[0]["warntime"];
    data["warntype"] = $("#table1").bootstrapTable('getSelections')[0]["warntype"];
    data["gps"] = $("#table1").bootstrapTable('getSelections')[0]["gps"];
    data["warndriverresp"] = $("#table1").bootstrapTable('getSelections')[0]["warndriverresp"];
    var corporationsid;

    /*查询车辆*/
    $.ajax({
        url:url_truck,type:'get',dataType:'json',async:false,data:{token:token,sid:trucksid},
        success:function (response) {
            if(response.status == 0){
                data["trucknumber"] = response.content.data[0]["trucknumber"];
                data["RTCnumber"] = response.content.data[0]["RTCnumber"];
                corporationsid = response.content.data[0].corporationsid;
                if(response.content.data[0]["type"] == "0"){
                    data["type"] = "牵引车";
                }
                else{
                    data["type"] = "重型货车";
                }
                var RTCddl = response.content.data[0]["RTCddl"];
                if(data["RTCddl"] != null){
                    data["RTCddl"] = new Date(RTCddl).toLocaleDateString();
                }
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
                if(data["QCddl"] != null){
                    data["QCddl"] = new Date(QCddl).toLocaleDateString();
                }
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
        var img = null;
        img = $("#table1").bootstrapTable('getSelections')[0]["warndriverimages"];
        if(img == null){
            alert("无图片");
        }
        else{
            img = JSON.parse(img);
            fill_imgform(img);
        }
    })
}
function initSelect(url,data,select,name,value) {
    select.empty();
    var option = "<option value='-1'>缺省</option>";
    select.append(option);
    $.ajax({
        url:url,type:'get',dataType:'json',data:data,
        success:function (response) {
            if(response.status == 0){
                var options = response.content.data;
                for(var i = 0; i < options.length; i++){
                    var option = "<option value='"+options[i][value]+"'>"+options[i][name]+"</option>";
                    select.append(option);
                }
                select.selectpicker('render');
                select.selectpicker('refresh');
            }
        }
    })
}
function formatter(value, row, index) {
    return [
        '<span>查看明细</span>'
    ].join('');
}
window.operateEvents = {
    'click span': function (e, value, row, index) {
        var img = row["warnimages"];
        if(img == null){
            alert("无图片");
        }
        else{
            img = JSON.parse(img);
            fill_imgform(img);
        }
    }
};

$(document).ready(function() {

    $("#big_img").click(function () {
        document.getElementById("img_form").style.display = "block";
        document.getElementById("big").style.display = "none";
    });
    var select = $("#warntype");
    var options = [];
    for(var i = 0; i < warntype[dept].length; i++){
        var j = warntype[dept][i];
        options.push(warnopt[j]);
    }

    select.empty();
    select.append("<option value='-1'>缺省</option>");
    for(var i = 0; i < options.length; i++){
        var option = "<option value='"+options[i]["value"]+"'>"+options[i]["text"]+"</option>";
        select.append(option);
    }
    select.selectpicker('render');
    select.selectpicker('refresh');
    initSelect(url_truck,{token:token},$("#trucksid"),"trucknumber","sid");
    initSelect(url_corporation,{token:token},$("#corporationsid"),"name","sid");
    $('#table1').bootstrapTable({
        columns: [
            {radio:true,width:'3%'},
            {field: 'sid', title: '异常编号',align: 'center'},
            {field: 'corporationname', title: '承运公司',align: 'center'},
            {field: 'trucknumber', title: '车牌号',align: 'center'},
            {field: 'warntype', title: '事故类型',align: 'center'},
            {field: 'warntime', title: '事故时间',align: 'center'},
            {field: 'gps', title: '地理坐标',align: 'center'},
            {field: 'warnimg', title: '异常图片',align: 'center',formatter:'formatter',events:operateEvents},
            {field: 'warndriverresp', title: '司机反馈',align: 'center'},
            {field: 'status', title: '处理状态',align: 'center'}
        ],
        height:290,
        clickToSelect:true,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });

    var note_accidentsid = getCookie("note_accidentsid");
    if(note_accidentsid != null){
        search("sid",note_accidentsid);
        delCookie("note_accidentsid");
    }
    else{
        search();
    }

    $("#btn_detail").click(function () {
        var row =  $("#table1").bootstrapTable('getSelections')[0];
        if(row == null){
            alert("请选择条目");
            return;
        }
        fill_accidentform(row["ordersid"],row["trucksid"],row["driversid"],row["corporationsid"]);
        $("#accident_info").empty();
        $('#accident_modal').modal();
    });
});
