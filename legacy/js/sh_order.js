/**
 * Created by sjq on 2017/8/6.
 */
var url_query = "http://120.76.219.196:85/order/query";
var url_buyer = "http://120.76.219.196:85/basic_info/buyer_info/query";
var url_seller = "http://120.76.219.196:85/basic_info/seller_info/query";
var url_goods = "http://120.76.219.196:85/basic_info/product_info/query";
var url_unload = "http://120.76.219.196:85/order/unload";
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
var goodsinfo = [];
var token;

function parmfun() {
    var param = {};
    param["token"] = token;
    param["limit"] = limit;
    param["buyersid"] = sid;
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
        /*
         var index = select.selectedIndex;
         if(index != 0 && index != -1){
         param[select.name] = select.options[index].value;
         }
         */
    }
    var min = document.getElementById("min0").value;
    var max = document.getElementById("max0").value;
    if(min.length != 0 || max.length != 0){
        var createdat = {};
        if(min.length != 0){
            createdat["min"] = new Date(min).getTime();
        }
        if(max.length != 0){
            createdat["max"] = new Date("max").getTime();
        }
        createdat = JSON.stringify(createdat);
        param["createdat"] = createdat;
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
        else{
            d[i]["orderstatus"] = "已回场";
        }
    }
    return d;
}
function sellerinit() {
    $.ajax({
        url:url_seller,
        dataType:'json',
        type:'get',
        data:{token:token},
        async:false,
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
$(document).ready(function() {

    sellerinit();
    goodsinit();

    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width:'3%'},
            {field: 'sid', title: '订单号', align:'center',valign:'middle',sortable:true},
            {field: 'ordertime', title: '创建时间', align:'center',valign:'middle',sortable:true},
            {field: 'orderstatus', title: '订单状态',align:'center',valign:'middle'},
            {field: 'sellername', title: '托运方',align:'center',valign:'middle'},
            {field: 'sellerphone', title: '手机号',align:'center',valign:'middle'},
            {field: 'buyername', title: '托运方',align:'center',valign:'middle'},
            {field: 'buyerphone', title: '手机号',align:'center',valign:'middle'},
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
    search();

    $("#btn_chakan").click(function () {
        var row = $("#table1").bootstrapTable('getSelections')[0];
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

    $("#btn_unload").click(function () {
        var row = $("#table1").bootstrapTable('getSelections')[0];
        if(row["orderstatus"] == "已装货"){
            $('#unload_modal').modal();
        }
        else{
            alert("当前订单状态不可卸货")
        }
    });

    $("#unload").click(function () {
        var data = {};
        data["token"] = token;
        data["sid"] = $("#table1").bootstrapTable('getSelections')[0].sid;
        data["unloadweight"] = document.getElementById("_unloadweight").value;
        $.ajax({
            url:url_unload,
            dataType:'json',
            type:'post',
            data:data,
            success:function (response) {
                document.getElementById("unload_info").innerText = decodeURI(response.msg);
            },
            error:function () {
                document.getElementById("unload_info").innerText = "操作错误";
            }
        })
    })

});
