/**
 * Created by sjq on 2017/7/25.
 */
var url_query = "http://120.76.219.196:85/order/query";
var token;
function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}
function tran_load(d) {
    for(var i = 0; i < d.length; i++){
        if(d[i]["loaddateddl"] != null){
            d[i]["loaddateddl"] = new Date(d[i]["loaddateddl"]).toLocaleDateString();
        }
        if(d[i]["ordertime"] != null){
            d[i]["ordertime"] = new Date(d[i]["ordertime"]).toLocaleDateString();
        }
        if(d[i]["unloaddateddl"] != null){
            d[i]["unloaddateddl"] = new Date(d[i]["unloaddateddl"]).toLocaleDateString();
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
        else{
            d[i]["orderstatus"] = "已回场";
        }
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
        if(value != -1){
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

$(document).ready(function() {

    token = getCookie("token");
    initSelect(url_corporation,{token:token},$("#corporationsid"),"name","sid");

    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width:'3%'},
            {field: 'sid', title: '订单号', align:'center'},
            {field: 'orderstatus', title: '订单状态',align:'center'},
            {field: 'sellername', title: '托运方',align:'center'},
            {field: 'sellerphone', title: '手机号',align:'center'},
            {field: 'buyername', title: '收货方',align:'center'},
            {field: 'buyerphone', title: '手机号',align:'center'},
            {field: 'corporationname', title: '承运方',align:'center'},
            {field: 'productname', title: '货物名称',align:'center'},
            {field: 'productweight', title: '货物重量',align:'center'},
            {field: 'productvol', title: '货物体积',align:'center'},
            {field: 'loaddateddl', title: '装货时间',align:'center'},
            {field: 'unloaddateddl', title: '卸货时间',align:'center'}
        ],
        striped:true,
        height:290,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });

    $("#btn_chakan").click(function () {
        var row = $("#table1").bootstrapTable('getSelections')[0];
        var table = document.getElementById("detail_table");
        var inputs = document.getElementsByTagName("input");
        for(var i = 0; i < inputs.length; i++){
            var input = inputs[i];
            if(row[input.id] != null){
                input.value = row[input.id];
            }
        }
        $('#check_modal').modal();
    });

});
