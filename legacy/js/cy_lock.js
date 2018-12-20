/**
 * Created by sjq on 2017/8/7.
 */
var url_query = "http://120.76.219.196:85/lock/query";
var url_response = "http://120.76.219.196:85/lock/response";
var url_escort = "http://120.76.219.196:85/basic_info/escort_info/query";
var distribute = {};
var parm_query = {};
var parm_delete = {};
var d = {};
var response;
var total;
var sellersid;
var limit = "10";
var cur_page;
var token;
var curindex;

function lockinit() {
    var content = null;
    $.ajax({
        url: url_query,
        dataType: 'json',
        type: 'get',
        data: {
            token: token,
            status: 0
        },
        success: function (response) {
            var total = response.content.total;
            if ((total != 0)) {
                content = "有" + total + "条未处理开锁请求,";
                document.getElementById("note1").innerText =  content;
                document.getElementById("ddl_num").innerText = total;
                alert(content);
            }
        }
    });
}

function escortinit() {
    $.ajax({
        url:url_escort,
        dataType:'json',
        type:'get',
        data:{token:token,type:0},
        async:false,
        timout:500,
        success:function (response) {
            if(response.status == 0){
                var escortinfo = response.content.data;
                var select = document.getElementById("createdid");
                select.options[0] = new Option("",-1);
                for(var i = 0; i < escortinfo.length; i++){
                    select.options[i+1] = new Option(escortinfo[i].name,escortinfo[i].sid);
                }
            }
        }
    })
}
function tran_load(d) {
    for(var i = 0; i < d.length; i++){
        if(d[i].status != null){
            if(d[i].status == 0){
                d[i].status = "已请求"
            }
            else if(d[i].status == 1){
                d[i].status = "已回复"
            }
            else{
                d[i].status = "已处理"
            }
        }
        if(d[i].requestat != null){
            d[i].requestat = new Date(d[i].requestat).toLocaleString();
        }
        if(d[i].responseat != null){
            d[i].responseat = new Date(d[i].responseat).toLocaleString();
        }
        if(d[i].response != null){
            if(d[i].response == 0){
                d[i].response = "同意"
            }
            else if(d[i].response == 1){
                d[i].response = "拒绝"
            }
        }
        if(d[i].request != null){
            if(d[i].request == 0){
                d[i].request = "左部开锁"
            }
            else if(d[i].request == 1){
                d[i].request = "左部上锁"
            }
            else if(d[i].request == 2){
                d[i].request = "右部开锁"
            }
            else if(d[i].request == 3){
                d[i].request = "右部上锁"
            }
        }
    }
    return d;
}
function parmfun() {
    var param = {};
    param["token"] = token;
    param["limit"] = limit;
    param["corporationsid"] = corporationsid;
    var createdid = document.getElementById("createdid");
    var index = createdid.selectedIndex;
    if(index != 0){
        param["createdid"] = createdid.options[index].value;
    }
    var status = document.getElementById("status");
    index = status.selectedIndex;
    if(index != 0){
        param["status"] = status.options[index].value;
    }
    var requestat = {};
    var min = document.getElementById("start").value;
    if(min.length != 0){
        min = new Date(min).getTime();
        requestat["min"] = min;
    }
    var max = document.getElementById("end").value;
    if(max.length != 0){
        max = new Date(max).getTime();
        requestat["max"] = max;
    }
    if(max.length != 0 || min.length != 0){
        param["requestat"] = JSON.stringify(requestat);
    }
    return param;
}

$(document).ready(function() {

    escortinit();
    lockinit();
    $("#btn_feedback").click(function () {
        var row = $("#table1").bootstrapTable('getSelections')[0];
        var form = document.getElementById("feedback_form");
        var inputs = form.getElementsByTagName("input");
        for(var i = 0; i < inputs.length; i++){
            input = inputs[i];
            if(row[input.name] != null){
                input.value = row[input.name];
            }
        }
        $("#feedback_modal").modal();
    });

    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width:'3%'},
            {field: 'sid', title: '请求编号', align:'center',valign:'middle',sortable:true},
            {field: 'drivername', title: '驾驶员', align:'center',valign:'middle'},
            {field: 'trucknumber', title: '车牌号', align:'center',valign:'middle'},
            {field: 'requestat', title: '请求时间', align:'center',valign:'middle',sortable:true},
            {field: 'request', title: '请求类型',align:'center',valign:'middle'},
            {field: 'responseat', title: '响应时间',align:'center',valign:'middle'},
            {field: 'response', title: '响应结果',align:'center',valign:'middle'},
            {field: 'requestdesc', title: '司机描述',align:'center',valign:'middle'},
//          {field: 'operatedat', title: '硬件完成时间',align:'center',valign:'middle'},
            {field: 'status', title: '处理状态',align:'center',valign:'middle'}
        ],
        sortable:true,
        height:290,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
    var note_locksid = getCookie("note_locksid");
    if(note_locksid != null){
        search("sid",note_locksid);
        delCookie("note_locksid");
    }
    else{
        search();
    }

    $("#pass").click(function () {
        var data = {};
        data["sid"] = $("#table1").bootstrapTable('getSelections')[0].sid;
        data["token"] = token;
        data["response"] = 0;
        $.ajax({
            url:url_response,
            type:'post',
            dataType:'json',
            data:data,
            success:function (response) {
                if(response.status == 0){
                    document.getElementById("feedback_info").innerText = "操作成功";
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
                else{
                    document.getElementById("feedback_info").innerText = decodeURI(response.msg);
                }
            },
            error:function () {
                document.getElementById("feedback_info").innerText = "操作错误"
            }
        })
    })

    $("#reject").click(function () {
        var data = {};
        data["sid"] = $("#table1").bootstrapTable('getSelections')[0].sid;
        data["token"] = token;
        data["response"] = 1;
        $.ajax({
            url:url_response,
            type:'post',
            dataType:'json',
            data:data,
            success:function (response) {
                if(response.status == 0){
                    document.getElementById("feedback_info").innerText = "操作成功";
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
                else{
                    document.getElementById("feedback_info").innerText = decodeURI(response.msg);
                }
            },
            error:function () {
                document.getElementById("feedback_info").innerText = "操作错误"
            }
        })
    })
});
