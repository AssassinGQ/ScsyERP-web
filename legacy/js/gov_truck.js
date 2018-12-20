/**
 * Created by sjq on 2017/9/6.
 */
var url_query = "http://120.76.219.196:85/basic_info/truck_info/query";
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
            {field: 'RTCddl', title: '证件有效期',align:'center'}
        ],
        striped:true,
        height:290,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
    search();
})
