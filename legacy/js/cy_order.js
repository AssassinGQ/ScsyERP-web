/**
 * Created by sjq on 2017/5/23.
 */
var url_query = "http://120.76.219.196:85/order/query";
var url_delete = "http://120.76.219.196:85/basic_info/product_info/delete";
var url_buyer = "http://120.76.219.196:85/basic_info/buyer_info/query";
var url_seller = "http://120.76.219.196:85/basic_info/seller_info/query";
var url_goods = "http://120.76.219.196:85/basic_info/product_info/query";
var url_truck = "http://120.76.219.196:85/basic_info/truck_info/query";
var url_trailer = "http://120.76.219.196:85/basic_info/trailer_info/query";
var url_escort = "http://120.76.219.196:85/basic_info/escort_info/query";
var url_route = "http://120.76.219.196:85/basic_info/route_info/query";
var url_anjian = "http://120.76.219.196:85/order/check";
var url_paifa = "http://120.76.219.196:85/order/distribute";
var url_trucklog = "http://120.76.219.196:85/trucklogs/query_new";
var distribute = {};
var parm_query = {};
var parm_delete = {};
var d = {};
var cur_sid;
var response;
var total;
var sellersid;
var limit = "10";
var cur_page;
var buyerinfo = [];
var sellerinfo = [];
var corporationinfo = [];
var trailerinfo = [];
var truckinfo = [];
var driverinfo = [];
var escortinfo = [];
var goodsinfo = [];
var routeinfo = [];
var token;

function parmfun() {
    var param = {};
    param["token"] = token;
    param["limit"] = limit;
    param["corporationsid"] = corporationsid;
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
    }
    var min = $("#min").val();
    var max = $("#max").val();
    if(min.length != 0 && max.length != 0){
        var time = {};
        if(min.length != 0){
            time["min"] = new Date(min).getTime();
        }
        if(max.length != 0){
            time["max"] = new Date(max).getTime();
        }
        param["ordertime"] = JSON.stringify(time);
    }
    return param;
}
function tran_load(d) {
    for(var i = 0; i < d.length; i++){
        if(d[i]["ordertime"] != null){
            d[i]["ordertime"] = new Date(d[i]["ordertime"]).toLocaleString();
        }
        if(d[i]["distributetime"] != null){
            d[i]["distributetime"] = new Date(d[i]["distributetime"]).toLocaleString();
        }
        if(d[i]["loadtime"] != null){
            d[i]["loadtime"] = new Date(d[i]["loadtime"]).toLocaleString();
        }
        if(d[i]["unloadtime"] != null){
            d[i]["unloadtime"] = new Date(d[i]["unloadtime"]).toLocaleString();
        }
        if(d[i]["returntime"] != null){
            d[i]["returntime"] = new Date(d[i]["returntime"]).toLocaleString();
        }
        if(d[i]["verifytime"] != null){
            d[i]["verifytime"] = new Date(d[i]["verifytime"]).toLocaleString();
        }
        if(d[i]["unloaddateddl"] != null){
            d[i]["unloaddateddl"] = new Date(d[i]["unloaddateddl"]).toLocaleString();
        }
        if(d[i]["loaddateddl"] != null){
            d[i]["loaddateddl"] = new Date(d[i]["loaddateddl"]).toLocaleString();
        }
        if(d[i]["orderstatus"] == "0"){
            d[i]["orderstatus"] = "已下单";
        }
        else if(d[i]["orderstatus"] == "1"){
            d[i]["orderstatus"] = "已调度";
        }
        else if(d[i]["orderstatus"] == "2"){
            d[i]["orderstatus"] = "已安检";
        }
        else if(d[i]["orderstatus"] == "3"){
            d[i]["orderstatus"] = "已派发";
        }
        else if(d[i]["orderstatus"] == "4"){
            d[i]["orderstatus"] = "已接单";
        }
        else if(d[i]["orderstatus"] == "5"){
            d[i]["orderstatus"] = "已装货";
        }
        else if(d[i]["orderstatus"] == "6"){
            d[i]["orderstatus"] = "已卸货";
        }
        else if(d[i]["orderstatus"] == "7"){
            d[i]["orderstatus"] = "已回场";
        }
        else if(d[i]["orderstatus"] == "9"){
            d[i]["orderstatus"] = "一审通过";
        }
        else if(d[i]["orderstatus"] == "10"){
            d[i]["orderstatus"] = "二审通过";
        }
        else if(d[i]["orderstatus"] == "11"){
            d[i]["orderstatus"] = "三审通过";
        }
        else if(d[i]["orderstatus"] == "12"){
            d[i]["orderstatus"] = "四审通过";
        }
        else if(d[i]["orderstatus"] == "13"){
            d[i]["orderstatus"] = "未通过审核";
        }
    }
    return d;
}
function truckinit() {
    $.ajax({
        url:url_truck,
        dataType:'json',
        type:'get',
        data:{token:token,truckstatus:0},
        timeout:500,
        async:false,
        success:function (response) {
            if(response.status == 0){
                truckinfo = response.content.data;
                var select = document.getElementById("a_truck");
                select.options[0] = new Option("",-1);
                for(var i = 0; i < truckinfo.length; i++){
                    select.options[i+1] = new Option(truckinfo[i].trucknumber,truckinfo[i].sid);
                }
                $(select).change(function () {
                    var sid = this.value;
                    if(sid == -1){
                        document.getElementById("a_driver").value = "";
                        document.getElementById("a_escort").value = "";
                        document.getElementById("a_trailer").value = "";
                        return;
                    }
                    var option = {};
                    for(var i = 0; i < truckinfo.length; i++){
                        if(sid == truckinfo[i].sid){
                            option = truckinfo[i];
                            break;
                        }
                    }
                    if(option["defaultdriver"] != null){
                        $("#a_driver").val(option["defaultdriver"]);
                    }
                    if(option["defaultescort"] != null){
                        $("#a_escort").val(option["defaultescort"]);
                    }
                    if(option["defaulttrailer"] != null){
                        $("#a_trailer").val(option["defaulttrailer"]);
                    }
                })
            }
        }
    })
}
function driverinit() {
    $.ajax({
        url:url_escort,
        dataType:'json',
        type:'get',
        data:{token:token,type:0,status:0},
        async:false,
        timeout:500,
        success:function (response) {
            if(response.status == 0){
                driverinfo = response.content.data;
                var select = document.getElementById("a_driver");
         //       var select1 = document.getElementById("m_driver");
                select.options[0] = new Option("",-1);
        //        select1.options[0] = new Option("",-1);
                for(var i = 0; i < driverinfo.length; i++){
                    select.options[i+1] = new Option(driverinfo[i].name,driverinfo[i].sid);
                }
            }
        }
    })
}
function escortinit() {
    $.ajax({
        url:url_escort,
        dataType:'json',
        type:'get',
        data:{token:token,type:1,status:0},
        async:false,
        timout:500,
        success:function (response) {
            if(response.status == 0){
                escortinfo = response.content.data;
                var select = document.getElementById("a_escort");
 //               var select1 = document.getElementById("m_escort");
                select.options[0] = new Option("",-1);
 //               select1.options[0] = new Option("",-1);
                for(var i = 0; i < escortinfo.length; i++){
                    select.options[i+1] = new Option(escortinfo[i].name,escortinfo[i].sid);
  //                  select1.options[i+1] = new Option(escortinfo[i].name,escortinfo[i].sid);
                }
            }
        }
    })
}
function trailerinit() {
    $.ajax({
        url:url_trailer,
        dataType:'json',
        type:'get',
        data:{token:token,trailerstatus:0},
        async:false,
        timeout:500,
        success:function (response) {
            if(response.status == 0){
                trailerinfo = response.content.data;
                var select = document.getElementById("a_trailer");
                //       var select1 = document.getElementById("m_driver");
                select.options[0] = new Option("",-1);
                //        select1.options[0] = new Option("",-1);
                for(var i = 0; i < trailerinfo.length; i++){
                    select.options[i+1] = new Option(trailerinfo[i].trailernumber,trailerinfo[i].sid);
                }
            }
        }
    })
}
function buyerinit() {
    $.ajax({
        url:url_buyer,
        dataType:'json',
        type:'get',
        data:{token:token},
        async:false,
        timeout:500,
        success:function (response) {
            if(response.status == 0){
                buyerinfo = response.content.data;
                var select = document.getElementById("s_buyersid");
                select.options[0] = new Option("",-1);
                for(var i = 0; i < buyerinfo.length; i++){
                    select.options[i+1] = new Option(buyerinfo[i].name,buyerinfo[i].sid);
                }
            }
        }
    })
}
function goodsinit() {
    $.ajax({
        url:url_goods,
        dataType:'json',
        type:'get',
        data:{token:token},
        async:false,
        timeout:500,
        success:function (response) {
            if(response.status == 0){
                goodsinfo = response.content.data;
                var select = document.getElementById("s_product");
                select.options[0] = new Option("",-1);
                for(var i = 0; i < goodsinfo.length; i++){
                    select.options[i+1] = new Option(goodsinfo[i].name,goodsinfo[i].sid);
                }
            }
        }
    })
}
function sellerinit() {
    $.ajax({
        url:url_seller,
        dataType:'json',
        type:'get',
        data:{token:token},
        async:false,
        timeout:500,
        success:function (response) {
            if(response.status == 0){
                sellerinfo = response.content.data;
                var select = document.getElementById("s_sellersid");
                select.options[0] = new Option("",-1);
                for(var i = 0; i < sellerinfo.length; i++){
                    select.options[i+1] = new Option(sellerinfo[i].name,sellerinfo[i].sid);
                }
            }
        }
    })
}
function routeinit() {
    $.ajax({
        url:url_route,
        dataType:'json',
        type:'get',
        data:{token:token},
        async:false,
        timeout:500,
        success:function (response) {
            if(response.status == 0){
                routeinfo = response.content.data;
                var select = document.getElementById("a_route");
                select.options[0] = new Option("",-1);
                for(var i = 0; i < routeinfo.length; i++){
                    select.options[i+1] = new Option(routeinfo[i].name,routeinfo[i].sid);
                }
                $(select).change(function () {
                    var sid = this.value;
                    if(sid == -1){
                        document.getElementById("a_distance").value = "";
                        document.getElementById("a_remark").value = "";
                        return;
                    }
                    var option = {};
                    for(var i = 0; i < routeinfo.length; i++){
                        if(sid == routeinfo[i].sid){
                            option = routeinfo[i];
                            break;
                        }
                    }
                    if(option["transportdistance"] != null){
                        $("#a_distance").val(option["transportdistance"]);
                    }
                    if(option["remark"] != null){
                        $("#a_remark").val(option["remark"]);
                    }
                })
            }
        }
    })
}
function orderinit() {
    var content = null;
    var param = {};
    param["token"] = token;
    param["corporationsid"] = corporationsid;
    param["orderstatus"] = 0;
    $.ajax({
        url:url_query,
        type:'get',
        dataType:'json',
        data:param,
        timeout:1000,
        success:function (response) {
            var total = response.content.total;
            if((total != 0)){
                content = "有"+total+"个新订单";
                $("#note1").text(content);
                $("#num").text(total);
                alert(content);
            }
        }
    });

}

$(document).ready(function() {

    trailerinit();
    truckinit();
    driverinit();
    escortinit();
    buyerinit();
    sellerinit();
    goodsinit();
    routeinit();
    orderinit();

    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width:'3%'},
            {field: 'sid', title: '订单号', align:'center',valign:'middle',sortable:true},
            {field: 'ordertime', title: '创建时间', align:'center',valign:'middle',sortable:true},
            {field: 'orderstatus', title: '订单状态',align:'center',valign:'middle'},
            {field: 'sellername', title: '托运方',align:'center',valign:'middle'},
            {field: 'buyername', title: '收货方',align:'center',valign:'middle'},
            {field: 'corporationname', title: '承运方',align:'center',valign:'middle'},
            {field: 'productname', title: '货物名称',align:'center',valign:'middle'},
            {field: 'productweight', title: '货物重量',align:'center',valign:'middle'},
            {field: 'productvol', title: '货物体积',align:'center',valign:'middle'}
        ],
        sortable:true,
        height:290,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
    var note_ordersid = getCookie("note_ordersid");
    if(note_ordersid != null){
        search("sid",note_ordersid);
        delCookie("note_ordersid");
    }
    else{
        search();
    }

    $("#btn_trucklog").click(function () {
        var row = $("#table1").bootstrapTable('getSelections')[0];
        if(row == null){
            alert("请选择条目");
            return;
        }
        var trucksid = row.trucksid;
        var data = {}; data["trucksid"] = trucksid; data["token"] = token; data["limit"] = 1;
        $.ajax({
            url:url_trucklog,type:'get',dataType:'json',data:data,
            success:function (response) {
                var form = document.getElementById("trucklog_form");
                if(response.status == 0){
                    var data = response.content.data[0];
                    data["fuelvol"] += "升";
                    data["speed"] += "km/h";
                    data["distance"] += "公里";
                    data["righttirepressure"] += "kpa";
                    data["lefttirepressure"] += "kpa";
                    data["gps"] = "经度:"+data["gpsx"]+"纬度:"+data["gpsy"];
                    var lock = data.lock;
                    for(var j = 1; j <= 5; j++){
                        data["lock"+j] = lock.split("-")[j-1];
                        if(data["lock"+j] == 1){data["lock"+j] = "关闭"}
                        else if(data["lock"+j] == 0){data["lock"+j] = "打开"}
                    }
                    fill(form,data);
                    $("#trcuklog_modal").modal();
                }
                else{
                    alert(decodeURI(response.msg));
                }
            },
            error:function () {
                alert("操作失败")
            }
        });
    });

    $("#btn_chakan").click(function () {
        var row = $("#table1").bootstrapTable('getSelections')[0];
        if(row == null){
            alert("请选择条目");
            return;
        }
        var table = document.getElementById("detail_table");
        var inputs = table.getElementsByTagName("input");
        for(var i = 0; i < inputs.length; i++){
            var input = inputs[i];
            input.value = "";
        }
        for(var i = 0; i < inputs.length; i++){
            var input = inputs[i];
            if(row[input.id] != null){
                input.value = row[input.id];
            }
        }
        $('#check_modal').modal();
    });

    $("#btn_manage").click(function () {
        var row = $("#table1").bootstrapTable('getSelections')[0];
        if(row == null){
            alert("请选择条目");
            return;
        }
        cur_sid = row.sid;
        var orderstatus = row.orderstatus;
        if(orderstatus == "已下单"){
            document.getElementById("diaodu_info").innerHTML  = "";
            document.getElementById("anjian_info").innerHTML  = "";
            $("#modal2").css("display","none");
            $("#modal1").css("display","block");
            $('#manage_modal').modal();
        }
        else{
            alert("订单当前状态不可调度");
        }
    });

    $("#diaodu").click(function () {
        var diaoduinfo = {};
        diaoduinfo["sid"] = cur_sid;
        diaoduinfo["token"] = token;
        var modal1 = document.getElementById("diaodu_form");
        var inputs = modal1.getElementsByTagName("input");
        var flag = 0;
        for(var i = 0; i < inputs.length; i++){
            var input = inputs[i];
            if(input.length != 0){
                diaoduinfo[input.name] = input.value;
            }
            else{flag = 1;}
        }
        var selects = modal1.getElementsByTagName("select");
        for(var i = 0; i < selects.length; i++){
            var select = selects[i];
            var index = select.selectedIndex;
            if(index != 0 && index != -1){
                diaoduinfo[select.name] = select.options[index].value;
            }
            else{flag = 1;}
        }
        var remark = document.getElementById("a_remark");
        if(remark.value.length != 0){
            diaoduinfo["remark"] = remark.value;
        }
        var route = document.getElementById("a_route");
        var index = route.selectedIndex;
        diaoduinfo["route"] = route.options[index].text;
        if(flag == 0){
            $.ajax({
                url:"http://120.76.219.196:85/order/dispatch",
                type:'post',
                dataType:'json',
                data:diaoduinfo,
                success:function (response) {
                    var msg = decodeURI(response.msg);
                    document.getElementById("diaodu_info").innerText = msg;
                    if(response.status == 0){
                        $.ajax({
                            type:"get",
                            dataType:"json",
                            url:url_query,
                            data:param_query,
                            success:function (response) {
                                if(response.status == 0){
                                    if(response.content != ""){
                                        var rows = response.content.data;
                                        rows = tran_load(rows);
                                        $("#table1").bootstrapTable("load",rows);
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
        else{
            document.getElementById("diaodu_info").innerText = "请完善调度信息"
        }
    });
    $("#to_anjian").click(function () {
        $("#modal1").css("display","none");
        $("#modal2").css("display","block");
    });
    $("#back").click(function () {
        $("#modal2").css("display","none");
        $("#modal1").css("display","block");
    });
    $("#pass").click(function () {
        var data = {};
        data["sid"] = cur_sid;
        data["checkstatus"] = "0";
        data["token"] = token;
        $.ajax({
            url:url_anjian,
            type:'post',
            dataType:'json',
            data:data,
            success:function (response) {
                var info = document.getElementById("anjian_info");
                info.innerHTML = decodeURI(response.msg);
                if(response.status == 0){
                    $.ajax({
                        type:"get",
                        dataType:"json",
                        url:url_query,
                        data:param_query,
                        success:function (response) {
                            if(response.status == 0){
                                if(response.content != ""){
                                    var rows = response.content.data;
                                    rows = tran_load(rows);
                                    $("#table1").bootstrapTable("load",rows);
                                }
                            }
                        }
                    });
                }
            }
        })

    });
    $("#reject").click(function () {
        var data = {};
        data["sid"] = cur_sid;
        data["checkstatus"] = "1";
        data["token"] = token;
        $.ajax({
            url:url_anjian,
            type:'post',
            dataType:'json',
            data:data,
            success:function (response) {
                var info = document.getElementById("anjian_info");
                info.innerHTML = decodeURI(response.msg);
                if(response.status == 0){
                    $.ajax({
                        type:"get",
                        dataType:"json",
                        url:url_query,
                        data:param_query,
                        success:function (response) {
                            if(response.status == 0){
                                if(response.content != ""){
                                    var rows = response.content.data;
                                    rows = tran_load(rows);
                                    $("#table1").bootstrapTable("load",rows);
                                }
                            }
                        }
                    });
                }
            }
        })

    });
    $("#_paifa").click(function (){
        var data = {};
        data["sid"] = cur_sid;
        data["token"] = token;
        $.ajax({
            url:url_paifa,
            type:'post',
            dataType:'json',
            data:data,
            success:function (response) {
                var info = document.getElementById("anjian_info");
                info.innerHTML = decodeURI(response.msg);
                if(response.status == 0){
                    $.ajax({
                        type:"get",
                        dataType:"json",
                        url:url_query,
                        data:param_query,
                        success:function (response) {
                            if(response.status == 0){
                                if(response.content != ""){
                                    var rows = response.content.data;
                                    rows = tran_load(rows);
                                    $("#table1").bootstrapTable("load",rows);
                                }
                            }
                        }
                    });
                }
            }
        })

    });

    $("#btn_anjian").click(function () {
        var row = $("#table1").bootstrapTable('getSelections')[0];
        if(row == null){
            alert("请选择条目");
            return;
        }
        cur_sid = row.sid;
        var orderstatus = row.orderstatus;
        if(orderstatus == "已调度"){
            document.getElementById("anjian_info2").innerHTML = "";
            cur_sid = row.sid;
            $('#anjian_modal').modal();
        }
        else{
            alert("订单当前状态不可安检");
        }
    });
    $("#pass2").click(function () {
        var data = {};
        data["sid"] = cur_sid;
        data["checkstatus"] = "0";
        data["token"] = token;
        $.ajax({
            url:url_anjian,
            type:'post',
            dataType:'json',
            data:data,
            success:function (response) {
                var info = document.getElementById("anjian_info2");
                info.innerHTML = decodeURI(response.msg);
                if(response.status == 0){
                    $.ajax({
                        type:"get",
                        dataType:"json",
                        url:url_query,
                        data:param_query,
                        success:function (response) {
                            if(response.status == 0){
                                if(response.content != ""){
                                    var rows = response.content.data;
                                    rows = tran_load(rows);
                                    $("#table1").bootstrapTable("load",rows);
                                }
                            }
                        }
                    });
                }
            }
        })

    });
    $("#reject2").click(function () {
        var data = {};
        data["sid"] = cur_sid;
        data["checkstatus"] = "1";
        data["token"] = token;
        $.ajax({
            url:url_anjian,
            type:'post',
            dataType:'json',
            data:data,
            success:function (response) {
                var info = document.getElementById("anjian_info2");
                info.innerHTML = decodeURI(response.msg);
                if(response.status == 0){
                    $.ajax({
                        type:"get",
                        dataType:"json",
                        url:url_query,
                        data:param_query,
                        success:function (response) {
                            if(response.status == 0){
                                if(response.content != ""){
                                    var rows = response.content.data;
                                    rows = tran_load(rows);
                                    $("#table1").bootstrapTable("load",rows);
                                }
                            }
                        }
                    });
                }
            }
        })

    });
    $("#paifa2").click(function (){
        var data = {};
        data["sid"] = cur_sid;
        data["token"] = token;
        $.ajax({
            url:url_paifa,
            type:'post',
            dataType:'json',
            data:data,
            success:function (response) {
                var info = document.getElementById("anjian_info2");
                info.innerHTML = decodeURI(response.msg);
                if(response.status == 0){
                    $.ajax({
                        type:"get",
                        dataType:"json",
                        url:url_query,
                        data:param_query,
                        success:function (response) {
                            if(response.status == 0){
                                if(response.content != ""){
                                    var rows = response.content.data;
                                    rows = tran_load(rows);
                                    $("#table1").bootstrapTable("load",rows);
                                }
                            }
                        }
                    });
                }
            }
        })

    });

    $("#btn_paifa").click(function () {
        var row = $("#table1").bootstrapTable('getSelections')[0];
        if(row == null){
            alert("请选择条目");
            return;
        }
        cur_sid = row.sid;
        var orderstatus = row.orderstatus;
        if(orderstatus == "已安检"){
            document.getElementById("ordersid").innerHTML = "订单号:"+ cur_sid;
            document.getElementById("paifa_info").innerHTML = "";
            $('#paifa_modal').modal();
        }
        else{
            alert("订单当前状态不可派发")
        }
    });
    $("#paifa").click(function () {
        var data = {};
        data["sid"] = cur_sid;
        data["token"] = token;
        $.ajax({
            url:url_paifa,
            type:'post',
            dataType:'json',
            data:data,
            success:function (response) {
                var info = document.getElementById("paifa_info");
                info.innerHTML = decodeURI(response.msg);
                if(response.status == 0){
                    $.ajax({
                        type:"get",
                        dataType:"json",
                        url:url_query,
                        data:param_query,
                        success:function (response) {
                            if(response.status == 0){
                                if(response.content != ""){
                                    var rows = response.content.data;
                                    rows = tran_load(rows);
                                    $("#table1").bootstrapTable("load",rows);
                                }
                            }
                        }
                    });
                }
            }
        })
    });

});


