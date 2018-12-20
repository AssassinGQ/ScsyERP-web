/**
 * Created by sjq on 2017/4/19.
 */
var url_query = "http://120.76.219.196:85/basic_info/escort_info/query";
var url_delete = "http://120.76.219.196:85/basic_info/escort_info/delete";
var url_add = "http://120.76.219.196:85/basic_info/escort_info/create";
var url_update = "http://120.76.219.196:85/basic_info/escort_info/update";

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
        param["QCddl"] = RTCddl;
    }
    return param;
}
function query_ddl() {
    var param = {};
    param["token"] = token;
    param["corporationsid"] = corporationsid;
    var max = new Date().getTime();
    var QCddl = {};
    QCddl["max"] = max;
    QCddl = JSON.stringify(QCddl);
    param["QCddl"] = QCddl;
    $.ajax({
        url:url_query,
        type:'get',
        dataType:'json',
        data:param,
        timeout:1000,
        success:function (response) {
            var total = response.content.total;
            if((total != 0)){
                document.getElementById("ddl_num").innerText = total;
                var content = "有"+total+"位驾押员证件到期";
                document.getElementById("note").innerText = content;
                alert(content);
            }
        }
    })
}
function tran_load(d) {
    for(var i = 0; i < d.length; i++){
        if(d[i]["type"] != null){
            if(d[i]["type"] == 0){d[i]["type"] = "驾驶员"}
            else{d[i]["type"] = "押运员"}
        }
        if(d[i]["status"] != null){
            if(d[i]["status"] == 0){d[i]["status"] = "空闲中"}
            else{d[i]["status"] = "任务中"}
        }
        if(d[i]["QCtype"] != null){
            if(d[i]["QCtype"] == 0){d[i]["QCtype"] = "驾驶证"}
            else{d[i]["QCtype"] = "押运证"}
        }
        if(d[i]["QCddl"] != null){
            d[i]["QCddl"] = new Date(d[i]["QCddl"]).toLocaleDateString();
        }
    }
    return d;
}
function tran_submit(param) {
    if(param["QCddl"] != null){
        param["QCddl"] = new Date(param["QCddl"]).getTime();
    }
    return param;
}

$(document).ready(function() {

    query_ddl();

    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width:'5%'},
            {field: 'name', title: '姓名',align:'center'},
            {field: 'username', title: '账号',align:'center'},
            {field: 'type', title: '从业类别',align:'center'},
            {field: 'phone', title: '联系电话', align:'center'},
            {field: 'QCtype', title: '证件类型',align:'center'},
            {field: 'QCnumber', title: '证件号码',align:'center'},
            {field: 'QCddl', title: '证件有效期',align:'center'},
            {field: 'status', title: '状态',align:'center'}
        ],
        height:290,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
    search();
});

