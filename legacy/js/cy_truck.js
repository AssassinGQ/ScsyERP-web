/**
 * Created by sjq on 2017/4/25.
 */
var url_query = "http://120.76.219.196:85/basic_info/truck_info/query";
var url_update = "http://120.76.219.196:85/basic_info/truck_info/update";
var url_delete = "http://120.76.219.196:85/basic_info/truck_info/delete";
var url_add = "http://120.76.219.196:85/basic_info/truck_info/create";
var url_escort = "http://120.76.219.196:85/basic_info/escort_info/query";
var url_trailer = "http://120.76.219.196:85/basic_info/trailer_info/query";
var url_weixiu = "http://120.76.219.196:85/basic_info/truck_info/truckmaintain_add";
var url_nianshen = "http://120.76.219.196:85/basic_info/truck_info/truckarchives_setannualduration";
var url_ershen = "http://120.76.219.196:85/basic_info/truck_info/truckarchives_setsecondduration";
var url_nianshentime = "http://120.76.219.196:85/basic_info/truck_info/truckarchives_setlastannual";
var url_ershentime = "http://120.76.219.196:85/basic_info/truck_info/truckarchives_setlastsecond";
var driverinfo = [];
var escortinfo = [];
var trailerinfo = [];

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
        var index = select.selectedIndex;
        if(index != 0 && index != -1){
            param[select.name] = select.options[index].value;
        }
    }
    var ddl = document.getElementById("ddl");
    if(ddl.selectedIndex == 1){
        var max = new Date().getTime();
        var RTCddl = {};
        RTCddl["max"] = max;
        RTCddl = JSON.stringify(RTCddl);
        param["RTCddl"] = RTCddl;
    }
    /*
    var ddl2 = document.getElementById("ddl2");
    if(ddl2.selectedIndex == 2){
        var max = new Date().getTime();
        var nextapprovingtime = {};
        nextapprovingtime["max"] = max;
        nextapprovingtime = JSON.stringify(nextapprovingtime);
        param["nextapprovingtime"] = nextapprovingtime;
    }
    */
    return param;
}

function query_ddl() {
    var _total = 0;
    var content = null;
    var param = {};
    param["token"] = token;
    param["corporationsid"] = corporationsid;
    var max = new Date().getTime();
    var RTCddl = {};
    RTCddl["max"] = max;
    RTCddl = JSON.stringify(RTCddl);
    param["RTCddl"] = RTCddl;
    $.ajax({
        url:url_query,
        type:'get',
        dataType:'json',
        data:param,
        timeout:1000,
        success:function (response) {
            var total = response.content.total;
            if((total != 0)){
                content = "有"+total+"辆车证件到期,";
                document.getElementById("note1").innerText = "有"+total+"辆车证件到期";
                document.getElementById("ddl_num").innerText = total;
                alert(content);
            }
        }
    });
}

function driverinit() {
    $.ajax({
        url:url_escort,
        dataType:'json',
        type:'get',
        data:{token:token,type:0},
        async:false,
        success:function (response) {
            if(response.status == 0){
                driverinfo = response.content.data;
                var select = document.getElementById("a_defaultdriver");
                var select1 = document.getElementById("m_defaultdriver");
                select.options[0] = new Option("",-1);
                select1.options[0] = new Option("",-1);
                for(var i = 0; i < driverinfo.length; i++){
                    select.options[i+1] = new Option(driverinfo[i].name,driverinfo[i].sid);
                    select1.options[i+1] = new Option(driverinfo[i].name,driverinfo[i].sid);
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
        data:{token:token,type:1},
        async:false,
        success:function (response) {
            if(response.status == 0){
                escortinfo = response.content.data;
                var select = document.getElementById("a_defaultescort");
                var select1 = document.getElementById("m_defaultescort");
                select.options[0] = new Option("",-1);
                select1.options[0] = new Option("",-1);
                for(var i = 0; i < escortinfo.length; i++){
                    select.options[i+1] = new Option(escortinfo[i].name,escortinfo[i].sid);
                    select1.options[i+1] = new Option(escortinfo[i].name,escortinfo[i].sid);
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
        data:{token:token},
        async:false,
        success:function (response) {
            if(response.status == 0){
                trailerinfo = response.content.data;
                var select = document.getElementById("a_defaulttrailer");
                var select1 = document.getElementById("m_defaulttrailer");
                select.options[0] = new Option("",-1);
                select1.options[0] = new Option("",-1);
                for(var i = 0; i < trailerinfo.length; i++){
                    select.options[i+1] = new Option(trailerinfo[i].trailernumber,trailerinfo[i].sid);
                    select1.options[i+1] = new Option(trailerinfo[i].trailernumber,trailerinfo[i].sid);
                }
            }
        }
    })
}
function tran_submit(d) {
    if(d["RTCddl"] != null){
        d["RTCddl"] = new Date(d["RTCddl"]).getTime();
    }
    if(d["nextapprovingtime"] != null){
        d["nextapprovingtime"] = new Date(d["nextapprovingtime"]).getTime();
    }
    return d;
}
function tran_load(d) {
    for(var i = 0; i < d.length; i++){
        if(d[i].nextapprovingtime != null){
            d[i].nextapprovingtime = new Date(d[i].nextapprovingtime).toLocaleDateString();
        }
        if(d[i].RTCddl != null){
            d[i].RTCddl = new Date(d[i].RTCddl).toLocaleDateString();
        }
        if(d[i].truckapprovingstatus != null){
            if(d[i].truckapprovingstatus == "0"){
                d[i].truckapprovingstatus = "合格";
            }
            else{
                d[i].truckapprovingstatus = "不合格";
            }
        }
        if(d[i].trucktype != null){
            if(d[i].trucktype == "0"){
                d[i].trucktype = "牵引车";
            }
            else if(d[i].trucktype == "1"){
                d[i].trucktype = "重型货车";
            }
        }
        if(d[i].truckstatus != null){
            if(d[i].truckstatus == "0"){
                d[i].truckstatus = "空闲中";
            }
            else if(d[i].truckstatus == "1"){
                d[i].truckstatus = "任务中";
            }
        }
    }
    return d;
}

$(document).ready(function() {

//    token = getCookie("token");
    driverinit();
    escortinit();
    trailerinit();
    query_ddl();

    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width:'4%'},
            {field: 'trucknumber', title: '车牌号',align:'center'},
            {field: 'trucktype', title: '车辆类型',align:'center'},
            {field: 'drivername', title: '驾驶员',align:'center'},
            {field: 'escortname', title: '押运员',align:'center'},
            {field: 'trailernumbr', title: '半挂车',align:'center'},
            {field: 'model', title: '厂牌型号',align:'center'},
            {field: 'RTCnumber', title: '运输证号',align:'center'},
            {field: 'RTCddl', title: '证件有效期',align:'center'},
            {field: 'truckstatus', title: '状态',align:'center'}
        ],
        striped:true,
        height:290,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
    search();

    $("#btn_repair").click(function () {
        var row = $("#table1").bootstrapTable('getSelections')[0];
        if(row == null){
            alert("请选择条目");
            return;
        }
        var form = document.getElementById("repair_modal");
        empty(form);
        var sid = $("#table1").bootstrapTable('getSelections')[0].sid;
        document.getElementById("repair_info").innerText = "";
        $("#repair_modal").modal();
    });
    $("#repair").click(function () {
        var data = {};
        data["trucksid"] = $("#table1").bootstrapTable('getSelections')[0].sid;
        data["token"] = token;
        var form = document.getElementById("repair_form");
        var inputs = form.getElementsByTagName("input");
        for(var i = 0; i < inputs.length; i++){
            var input = inputs[i];
            if(input.value.length != 0){
                data[input.name] = input.value;
            }
        }
        if(data["ccrq"] != null){
            data["ccrq"] = new Date(data["ccrq"]).getTime();
        }
        if(data["jcrq"] != null){
            data["jcrq"] = new Date(data["jcrq"]).getTime();
        }
        if(data["bxq"] != null){
            data["bxq"] = data["bxq"]*24*60*60*1000;
        }
        $.ajax({
            url:url_weixiu,
            type:'post',
            dataType:'json',
            data:data,
            success:function (response) {
                if(response.status == 0){
                    $("#repair_modal").modal('hide');
                    return;
                }
                document.getElementById("repair_info").innerText = decodeURI(response.msg);
            },
            error:function () {
                document.getElementById("repair_info").innerText = "操作失败";
            }

        })
    });

    $("#btn_period").click(function () {
        var form = document.getElementById("period_modal");
        empty(form);
        var row = $("#table1").bootstrapTable('getSelections')[0];
        if(row == null){
            alert("请选择条目");
            return;
        }
        cursid = $("#table1").bootstrapTable('getSelections')[0].sid;
        var annalduration = row["annalduration"];
        var secondduration = row["secondduration"];
        if(annalduration != null){
            document.getElementById("annualduration").value = annalduration;
        }
        if(secondduration != null){
            document.getElementById("secondduration").value = secondduration;
        }
        document.getElementById("period_info").innerText = "";
        $("#period_modal").modal();
    });
    $("#period").click(function () {
        var data = {};
        data["token"] = token;
        data["trucksid"] = cursid;
        var annualduration = document.getElementById("annualduration").value;
        var secondduration = document.getElementById("secondduration").value;
        var status1 = -1;
        var status2 = -1;
        if(annualduration.length != 0){
            data["annualduration"] = annualduration*24*60*60*1000;
            $.ajax({
                url:url_nianshen,
                type:'post',
                dataType:'json',
                data:data,
                async:false,
                success:function (response) {
                    status1 = response.status;
                },
                error:function () {
                    status1 = -1;
                }
            })
        }
        if(secondduration.length != 0){
            data["secondduration"] = secondduration*24*60*60*1000;
            $.ajax({
                url:url_ershen,
                type:'post',
                dataType:'json',
                data:data,
                async:false,
                success:function (response) {
                    status2 = response.status;
                },
                error:function () {
                    status2 = -1;
                }
            })
        }
        if(status1 == 0 && status2 == 0){
            document.getElementById("period_info").innerText = "提交成功";
            $("#period_modal").modal('hide');
        }
        else{
            document.getElementById("period_info").innerText = "提交失败";
        }
    });

    $("#btn_nianshen").click(function () {
        var row = $("#table1").bootstrapTable('getSelections')[0];
        if(row == null){
            alert("请选择条目");
            return;
        }
        cursid = row.sid;
        document.getElementById("nianshen_info").innerText = "";
        $("#nianshen_modal").modal();
    });
    $("#nianshen").click(function () {
        var row = $("#table1").bootstrapTable('getSelections')[0];
        if(row == null){
            alert("请选择条目");
            return;
        }
        var data = {};
        data["token"] = token;
        data["trucksid"] = cursid;
        var lastannualtime = document.getElementById("lastannualtime").value;
        if(lastannualtime.length != 0){
            data["lastannualtime"] = new Date(lastannualtime).getTime();
            $.ajax({
                url:url_nianshentime,
                type:'post',
                dataType:'json',
                data:data,
                async:false,
                success:function (response) {
                    if(response.status == 0){
                        $("#nianshen_modal").modal('hide');
                    }
                    document.getElementById("nianshen_info").innerText = decodeURI(response.msg);
                },
                error:function () {
                    document.getElementById("nianshen_info").innerText = "操作失败";
                }
            })
        }
    });

    $("#btn_ershen").click(function () {
        var row = $("#table1").bootstrapTable('getSelections')[0];
        if(row == null){
            alert("请选择条目");
            return;
        }
        cursid = $("#table1").bootstrapTable('getSelections')[0].sid;
        document.getElementById("ershen_info").innerText = "";
        $("#ershen_modal").modal();
    });
    $("#ershen").click(function () {
        var data = {};
        data["token"] = token;
        data["trucksid"] = cursid;
        var lastsecondtime = document.getElementById("lastsecondtime").value;
        if(lastsecondtime.length != 0){
            data["lastsecondtime"] = new Date(lastsecondtime).getTime();
            data["lastsecondcontent"] = document.getElementById("lastsecondcontent").value;
            $.ajax({
                url:url_ershentime,
                type:'post',
                dataType:'json',
                data:data,
                async:false,
                success:function (response) {
                    if(response.status == 0){
                        $('#ershen_modal').modal('hide');
                    }
                    document.getElementById("ershen_info").innerText = decodeURI(response.msg);
                },
                error:function () {
                    document.getElementById("ershen_info").innerText = "操作失败";
                }
            })
        }
    });

});
