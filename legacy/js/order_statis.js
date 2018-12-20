/**
 * Created by sjq on 2017/7/31.
 */
var url_query;
var url_month = "http://120.76.219.196:85/statistics/query_ordermonth";
var url_year = "http://120.76.219.196:85/statistics/query_orderyear";
var url_order = "http://120.76.219.196:85/order/query";
var _param_query;
var cnt = {};
var output_data;
var distance_data;
var fuelused_data;
var order_data;
var xseries;
var yseries;
var order = {
    name: '订单总数',
    type: 'bar',
    barWidth : 15,
    barGap:'15%',
    itemStyle: {
        normal: {
            label: {
                show: true,
                position: 'top',
                textStyle:{
                    fontSize:15
                }
            }
        }
    }
};
var oil = {
    name: '耗油量',
    type: 'bar',
    barWidth : 15,
    barGap:'15%',
    itemStyle: {
        normal: {
            label: {
                show: true,
                position: 'top',
                textStyle:{
                    fontSize:15
                }
            }
        }
    }
};
var output = {
    name: '产值',
    type: 'bar',
    barWidth : 15,
    barGap:'15%',
    itemStyle: {
        normal: {
            label: {
                show: true,
                position: 'top',
                textStyle:{
                    fontSize:15
                }
            }
        }
    }
};
var mile = {
    name: '里程数',
    type: 'bar',
    barWidth : 15,
    barGap:'15%',
    itemStyle: {
        normal: {
            label: {
                show: true,
                position: 'top',
                textStyle:{
                    fontSize:15
                }
            }
        }
    }
};


function _tran_load(d) {
    cnt = {};
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
        d[i]["orderstatus"] = tran_orderstatus( d[i]["orderstatus"]);

        if(d[i]["output"] != null){
            if(cnt["output"] == null){
                cnt["output"] = d[i]["output"];
            }
            else cnt["output"] += d[i]["output"];
        }
        if(d[i]["fuelused"] != null){
            if(cnt["fuelused"] == null){
                cnt["fuelused"] = d[i]["fuelused"];
            }
            else cnt["fuelused"] += d[i]["fuelused"];
        }
        if(d[i]["distance"] != null){
            if(cnt["distance"] == null){
                cnt["distance"] = d[i]["distance"];
            }
            else cnt["distance"] += d[i]["distance"];
        }
    }
    cnt["orderamount"] = d.length;

    var form = document.getElementById("_statis");
    var ps = form.getElementsByTagName("p");
    for(var i = 0; i < ps.length; i++){
        var p = ps[i];
        if(cnt[p.id] != null){
            p.innerText = cnt[p.id];
        }
        else{
            p.innerText = 0;
        }
    }
    return d;
}
function bar(div,option) {
    var chart = echarts.init(div);
    var option = option;
    option["xAxis"] = {data:xseries};
    option["series"] = yseries;
    chart.setOption(option,true);
}
function _parmfun() {
    var param = {};
    param["token"] = token;
    param["limit"] = limit;
    if(corporationsid != -1){
        param["corporationsid"] = corporationsid;
    }
    var searchform = document.getElementById("_searchform");
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
    var min = document.getElementById("min").value;
    var max = document.getElementById("max").value;
    if(min.length != 0 || max.length != 0){
        var ordertime = {};
        if(min.length != 0){
            ordertime["min"] = new Date(min).getTime();
        }
        if(max.length != 0){
            ordertime["max"] = new Date(max).getTime();
        }
        param["ordertime"] = JSON.stringify(ordertime);
    }
    return param;
}
function _search() {
    _param_query = _parmfun();
    _param_query["page"] = 1;
    $.ajax({
        type:"get",dataType:"json",url:url_order,data:_param_query,async:false,timeout:1000,
        success:function (response) {
            if(response.status == 0){
                if(response.content != ""){
                    var total = response.content.total;
                    var rows = response.content.data;
                    var option;
                    rows = _tran_load(rows);
                    $("#_table1").bootstrapTable("load",rows);
                    var pagenum;
                    if(total == 0){pagenum = 1;}
                    else{pagenum = Math.ceil(total/limit);}
                    option = {
                        bootstrapMajorVersion:1,
                        numberOfPages:5,
                        totalPages:pagenum,
                        currentPage:1
                    };
                    $("#_page1").bootstrapPaginator("setOptions",option);
                    document.getElementById("_total").innerText = "共"+pagenum+"页";
                }
                else {
                    $("#_table1").bootstrapTable("removeAll");
                    option = {
                        bootstrapMajorVersion:1,
                        numberOfPages:5,
                        totalPages:1,
                        currentPage:1
                    };
                    document.getElementById("_total").innerText = "共1页";
                    $("#_page1").bootstrapPaginator("setOptions",option);
                }
            }
            else{
                alert(decodeURI(response.msg));
                $("#_table1").bootstrapTable("removeAll");
                option = {
                    bootstrapMajorVersion:1,
                    numberOfPages:5,
                    totalPages:1,
                    currentPage:1
                };
                document.getElementById("_total").innerText = "共1页";
                $("#_page1").bootstrapPaginator("setOptions",option);
            }
        },
        error:function () {
            alert(decodeURI("操作失败"));
        }
    })
}
function _change(select) {
    var index= select.selectedIndex;
    var value = select.options[index].text;
    var height;
    if(value == 5){
        height = 160;
    }
    else if(value == 10){
        height = 290;
    }
    else if(value == 15){
        height = 420;
    }
    else if(value == 20){
        height = 550;
    }
    else if(value == 50){
        height = 550;
    }
    limit = value;
    $("#_table1").bootstrapTable('refreshOptions',{height:height});
    $("#_table1").bootstrapTable('removeAll');
    _param_query["limit"] = limit;
    _param_query["page"] = 1;
    $.ajax({
        type:"get",
        dataType:"json",
        url:url_order,
        data:_param_query,
        success:function (response) {
            if(response.status == 0){
                if(response.content != ""){
                    var rows = response.content.data;
                    var total = response.content.total;
                    rows = _tran_load(rows);
                    $("#_table1").bootstrapTable("load",rows);
                    var pagenum;
                    if(total == 0){pagenum = 1;}
                    else{pagenum = Math.ceil(total/limit);}
                    var option = {
                        bootstrapMajorVersion:1,
                        numberOfPages:5,
                        totalPages:pagenum,
                        currentPage:1
                    };
                    $("#_page1").bootstrapPaginator("setOptions",option);
                    document.getElementById("_total").innerText = "共"+pagenum+"页";
                }
                else{
                    $("#_table1").bootstrapTable("removeAll");
                    option = {
                        bootstrapMajorVersion:1,
                        numberOfPages:5,
                        totalPages:1,
                        currentPage:1
                    };
                    document.getElementById("_total").innerText = "共1页";
                    $("#_page1").bootstrapPaginator("setOptions",option);
                }
            }
            else{alert(decodeURI(response.msg));}
        },
        error:function () {
            alert("操作失败");
        }
    });
}
function tran_load(d) {
    xseries = [];
    yseries = [];
    output_data = [];
    distance_data = [];
    fuelused_data = [];
    order_data = [];
    for(var i = 0; i < d.length; i++){
        var objectname = d[i].objectname;
        var index = xseries.indexOf(objectname);
        var _output = d[i].output;
        var _distance = d[i].distance;
        var _fuelused = d[i].fuelused;
        var _orderamount = d[i].orderamount;
        if(index == -1){
            xseries.push(objectname);
            order_data.push(_orderamount);
            output_data.push(_output);
            distance_data.push(_distance);
            fuelused_data.push(_fuelused);
        }
        else{
            order_data[index] += 1;
            output_data[index] += _output;
            distance_data[index] += _distance;
            fuelused_data[index] += _fuelused;
        }
    }
    order["data"] = order_data;
    yseries[0] = order;
    oil["data"] = fuelused_data;
    yseries[1] = oil;
    mile["data"] = distance_data;
    yseries[2] = mile;
    output["data"] = output_data;
    yseries[3] = output;
    var chart = document.getElementById("chart");
    chart.style.width = document.getElementById("panel").offsetWidth;
    var option;
    option = {
        title: {
            text: '订单统计',
            x:'center'
        },
        legend: {
            data:['订单总数',"耗油量","产值","里程数"],
            left: 'left'
        },
        yAxis: {}
    };
    bar(chart,option);

    chart = document.getElementById("output_chart");
    option = {
        title: {
            text: '产值统计',
            x:'center'
        },
        legend: {
            data:["产值"],
            left: 'left'
        },
        color:['#E98F6F'],
        yAxis: {}
    };
    yseries = []; yseries[0] = output;
    bar(chart,option);

    chart = document.getElementById("total_chart");
    option = {
        title: {
            text: '订单数统计',
            x:'center'
        },
        legend: {
            data:["订单总数"],
            left: 'left'
        },
        yAxis: {}
    };
    yseries = []; yseries[0] = order;
    bar(chart,option);

    chart = document.getElementById("mile_chart");
    option = {
        title: {
            text: '里程统计',
            x:'center'
        },
        legend: {
            data:["里程数"],
            left: 'left'
        },
        color:['#61A0A8'],
        yAxis: {}
    };
    yseries = []; yseries[0] = mile;
    bar(chart,option);

    chart = document.getElementById("fuel_chart");
    option = {
        title: {
            text: '耗油量统计',
            x:'center'
        },
        legend: {
            data:["耗油量"],
            left: 'left'
        },
        color:['#2F4554'],
        yAxis: {}
    };
    yseries = []; yseries[0] = oil;
    bar(chart,option);
    return d;
}

$(document).ready(function() {

    if(document.getElementById("_corporationsid") != null){
        initSelect(url_corporation,{token:token},$("#_corporationsid"),"name","sid");
    }

    var chart; var option;
    chart = document.getElementById("output_chart");
    option = {
        title: {
            text: '产值统计',
            x:'center'
        },
        legend: {
            data:["产值"],
            left: 'left'
        },
        color:['#E98F6F'],
        yAxis: {}
    };
    yseries = [];
    bar(chart,option);

    chart = document.getElementById("total_chart");
    option = {
        title: {
            text: '订单数统计',
            x:'center'
        },
        legend: {
            data:["订单总数"],
            left: 'left'
        },
        yAxis: {}
    };
    yseries = [];
    bar(chart,option);

    chart = document.getElementById("mile_chart");
    option = {
        title: {
            text: '里程统计',
            x:'center'
        },
        legend: {
            data:["里程数"],
            left: 'left'
        },
        color:['#61A0A8'],
        yAxis: {}
    };
    yseries = [];
    bar(chart,option);

    chart = document.getElementById("fuel_chart");
    option = {
        title: {
            text: '耗油量统计',
            x:'center'
        },
        legend: {
            data:["耗油量"],
            left: 'left'
        },
        color:['#2F4554'],
        yAxis: {}
    };
    yseries = [];
    bar(chart,option);

    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width:'5%'},
            {field: 'objectname', title: '名称',align: 'center'},
            {field: 'year', title: '年份',align: 'center'},
            {field: 'month', title: '月份',align: 'center'},
            {field: 'orderamount', title: '订单总数', align: 'center'},
            {field: 'output', title: '产值', align: 'center'},
            {field: 'fuelused', title: '耗油量', align: 'center'},
            {field: 'distance', title: '里程数', align: 'center'}
        ],
        dataType: 'json',
        height: 290,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });

    var options={
        bootstrapMajorVersion:1,currentPage:1,numberOfPages:5,totalPages:1,
        itemTexts: function (type, page, current) {
            switch (type) {
                case "first":
                    return "首页";
                case "prev":
                    return "上页";
                case "next":
                    return "下页";
                case "last":
                    return "末页";
                case "page":
                    return page;
            }
        },
        onPageClicked:function(e,originalEvent,type,page){
            _param_query["page"] = page;
            $.ajax({
                type:"get",
                dataType:"json",
                url:url_order,
                data:_param_query,
                success:function (response) {
                    if(response.status == 0){
                        if(response.content != ""){
                            var rows = response.content.data;
                            rows = _tran_load(rows);
                            $("#_table1").bootstrapTable("load",rows);
                            $("#_page1").bootstrapPaginator("show",page)
                        }
                    }
                    else{alert(decodeURI(response.msg));}
                }
            })
        }
    };
    $("#_page1").bootstrapPaginator(options);
    $("#_to").click(function () {
        var index = document.getElementById("_index").value;
        if(index.length != 0){
            _param_query["page"] = index;
            $.ajax({
                type:"get",
                dataType:"json",
                url:url_order,
                data:_param_query,
                success:function (response) {
                    if(response.status == 0){
                        if(response.content != ""){
                            var rows = response.content.data;
                            rows = _tran_load(rows);
                            $("#_table1").bootstrapTable("load",rows);
                            $("#_page1").bootstrapPaginator("show",index)
                        }
                    }
                    else{alert(decodeURI(response.msg));}
                },
                error:function () {
                    alert("操作失败");
                }
            });
        }
    });

    $("#_search").click(function () {
        _search();
    });

    $('#_table1').bootstrapTable({
        columns: [
            {checkbox:true,width:'3%'},
            {field: 'sid', title: '订单号', align:'center',valign:'middle',sortable:true},
            {field: 'ordertime', title: '创建时间', align:'center',valign:'middle',sortable:true},
            {field: 'output', title: '产值', align:'center',valign:'middle',sortable:true},
            {field: 'distance', title: '里程', align:'center',valign:'middle',sortable:true},
            {field: 'fuelused', title: '油耗', align:'center',valign:'middle',sortable:true},
            {field: 'orderstatus', title: '订单状态',align:'center',valign:'middle'},
            {field: 'sellername', title: '托运方',align:'center',valign:'middle'},
            {field: 'buyername', title: '收货方',align:'center',valign:'middle'},
            {field: 'corporationname', title: '承运方',align:'center',valign:'middle'},
            {field: 'productname', title: '货物名称',align:'center',valign:'middle'},
            {field: 'productweight', title: '货物重量',align:'center',valign:'middle'},
            {field: 'drivername', title: '驾驶员',align:'center',valign:'middle'},
            {field: 'trucknumber', title: '车牌号',align:'center',valign:'middle'}
        ],
        sortable:true,
        height:290,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });

    $("#btn_chakan").click(function () {
        var row = $("#_table1").bootstrapTable('getSelections')[0];
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

    $("#btn_statis").click(function () {
        var rows = $("#_table1").bootstrapTable('getAllSelections');
        if(rows.length == 0){
            alert("请选择条目");
            return;
        }
        cnt = {};
        for(var i = 0; i < rows.length; i++){
            if(rows[i]["output"] != null){
                if(cnt["output"] == null){cnt["output"] = rows[i]["output"];}
                else{cnt["output"] += rows[i]["output"];}
            }
            if(rows[i]["fuelused"] != null){
                if(cnt["fuelused"] == null){cnt["fuelused"] = rows[i]["fuelused"];}
                else{cnt["fuelused"] += rows[i]["fuelused"];}
            }
            if(rows[i]["distance"] != null){
                if(cnt["distance"] == null){cnt["distance"] = rows[i]["distance"];}
                else{cnt["distance"] += rows[i]["distance"];}
            }
        }
        cnt["orderamount"] = rows.length;
        var form = document.getElementById("_statis");
        var ps = form.getElementsByTagName("p");
        for(var i = 0; i < ps.length; i++){
            var p = ps[i];
            if(cnt[p.id] != null){
                p.innerText = cnt[p.id];
            }
            else{
                p.innerText = 0;
            }
        }
    });

});

