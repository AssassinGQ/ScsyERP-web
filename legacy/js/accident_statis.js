/**
 * Created by sjq on 2017/7/31.
 */
var url_driver = "http://120.76.219.196:85/basic_info/escort_info/query";
var url_truck = "http://120.76.219.196:85/basic_info/truck_info/query";
var url_seller = "http://120.76.219.196:85/basic_info/seller_info/query";
var url_corporation = "http://120.76.219.196:85/user/query_corporation";
var url_query;
var _url_query = "http://120.76.219.196:85/warn/query";
var url_month = "http://120.76.219.196:85/statistics/query_warnmonth";
var url_year = "http://120.76.219.196:85/statistics/query_warnyear";
var cnt = {};
var accident_data;
var xseries;
var yseries;
var accident = {
    name: '异常总数',
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
        if(d[i]["warntype"] == 1){
            d[i]["warntype"] = "安全锁异常";
            if(cnt["lock"] == null){cnt["lock"] = 1;}
            else{cnt["lock"]++;}
        }
        else if(d[i]["warntype"] == 2){
            d[i]["warntype"] = "泄露异常";
            if(cnt["leak"] == null){cnt["leak"] = 1;}
            else{cnt["leak"]++;}
        }
        else if(d[i]["warntype"] == 3){
            d[i]["warntype"] = "胎压异常";
            if(cnt["tire"] == null){cnt["tire"] = 1;}
            else{cnt["tire"]++;}
        }
        else if(d[i]["warntype"] == 4){
            d[i]["warntype"] = "油量异常";
            if(cnt["fuel"] == null){cnt["fuel"] = 1;}
            else{cnt["fuel"]++;}
        }
        else if(d[i]["warntype"] == 5){
            d[i]["warntype"] = "超速异常";
            if(cnt["speed"] == null){cnt["speed"] = 1;}
            else{cnt["speed"]++;}
        }
        else if(d[i]["warntype"] == 6){
            d[i]["warntype"] = "停车异常";
            if(cnt["park"] == null){cnt["park"] = 1;}
            else{cnt["park"]++;}
        }
        else if(d[i]["warntype"] == 7){
            d[i]["warntype"] = "疲劳驾驶";
            if(cnt["tired"] == null){cnt["tired"] = 1;}
            else{cnt["tired"]++;}
        }
        else if(d[i]["warntype"] == 8){
            d[i]["warntype"] = "急刹异常";
            if(cnt["break"] == null){cnt["break"] = 1;}
            else{cnt["break"]++;}
        }
        else if(d[i]["warntype"] == 10){
            d[i]["warntype"] = "车辆事故";
            if(cnt["accident"] == null){cnt["accident"] = 1;}
            else{cnt["accident"]++;}
        }
        else if(d[i]["warntype"] == 11){
            d[i]["warntype"] = "超载异常";
            if(cnt["overload"] == null){cnt["overload"] = 1;}
            else{cnt["overload"]++;}
        }

        if(d[i]["status"] == 0){d[i]["status"] = "已发生"}
        else if(d[i]["status"] == 1){d[i]["status"] = "已通知"}
        else if(d[i]["status"] == 2){d[i]["status"] = "已阅读"}
        else if(d[i]["status"] == 3){d[i]["status"] = "已处理"}

        d[i]["warntime"] = new Date(d[i]["warntime"]).toLocaleString();
        d[i]["gps"] = "x:"+d[i]["gpsx"]+";"+"y:"+d[i]["gpsy"];
    }
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
function bar(div,xseries,yseries) {
    var chart = echarts.init(div);
    var option = {
        title: {
            text: '异常统计',
            x:'center'
        },
        legend: {
            data:['异常总数'],
            left: 'left'
        },
        xAxis: {
            data: xseries
        },
        yAxis: {},
        series:yseries
    };
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
    var _warntype = $("#_warntype").val();
    if(_warntype == null || _warntype[0] == -1){
        if(type == 6){
            param["warntype"] = JSON.stringify(warntype[dept]);
        }
    }
    else{
        param["warntype"] = JSON.stringify(_warntype);
    }

    return param;
}
function _search() {
    _param_query = _parmfun();
    _param_query["page"] = 1;
    $.ajax({
        type:"get",dataType:"json",url:_url_query,data:_param_query,async:false,timeout:1000,
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
        url:_url_query,
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
    accident_data = [];
    for(var i = 0; i < d.length; i++){
        var objectname = d[i].objectname;
        var index = xseries.indexOf(objectname);
        var total;
        if(type != 5){
            total = d[i].overspeedamount + d[i].parkamount + d[i].suddenbrakeamount +
                d[i].tireamount + d[i].fatiguedrivingamount + d[i].lockamount +
                d[i].overloadamount + d[i].accidentamount + d[i].fuelamount +
                d[i].leakamount + d[i].suddenaccelamount;
        }
        else if(dept == 0){
            total = d[i].overspeedamount + d[i].tireamount + d[i].fatiguedrivingamount +
                d[i].overloadamount + d[i].accidentamount + d[i].leakamount;
        }
        else if(dept == 1){
            total = d[i].overspeedamount + d[i].fatiguedrivingamount +
                d[i].overloadamount + d[i].accidentamount;
        }
        else if(dept == 2){
            total = d[i].leakamount;
        }
        else if(dept == 3){
            total = d[i].accidentamount + d[i].leakamount;
        }
        else if(dept == 4){
            total = d[i].overspeedamount + d[i].tireamount + d[i].fatiguedrivingamount +
                d[i].overloadamount + d[i].accidentamount + d[i].leakamount;
        }
        if(index == -1){
            xseries.push(objectname);
            accident_data.push(total);
        }
        else{
            accident_data[index] += total;
        }
    }
    accident["data"] = accident_data;
    yseries[0] = accident;
    var chart = document.getElementById("chart");
    chart.style.width = document.getElementById("panel").offsetWidth;
    bar(chart,xseries,yseries);
    return d;
}

$(document).ready(function() {

    if(type == 6){
        var select = $("#_warntype");
        options = [];
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
        select.selectpicker('refresh')

        if(dept == 0){
            $('#table1').bootstrapTable({
                columns: [
                    {radio: true, width:'5%'},
                    {field: 'objectname', title: '承运公司',align: 'center'},
                    {field: 'leakamount', title: '泄露异常', align: 'center'},
                    {field: 'tireamount', title: '胎压异常', align: 'center'},
                    {field: 'overspeedamount', title: '超速异常', align: 'center'},
                    {field: 'fatiguedrivingamount', title: '疲劳驾驶', align: 'center'},
                    {field: 'overloadamount', title: '超载异常', align: 'center'},
                    {field: 'accidentamount', title: '车辆事故', align: 'center'}
                ],
                dataType: 'json',
                height: 290,
                formatNoMatches: function () {
                    return '无符合条件的记录';
                }
            });
        }
        else if(dept == 1){
            $('#table1').bootstrapTable({
                columns: [
                    {radio: true, width:'5%'},
                    {field: 'objectname', title: '承运公司',align: 'center'},
                    {field: 'overspeedamount', title: '超速异常', align: 'center'},
                    {field: 'fatiguedrivingamount', title: '疲劳驾驶', align: 'center'},
                    {field: 'overloadamount', title: '超载异常', align: 'center'},
                    {field: 'accidentamount', title: '车辆事故', align: 'center'}
                ],
                dataType: 'json',
                height: 290,
                formatNoMatches: function () {
                    return '无符合条件的记录';
                }
            });
            /*
            $("#leak").css("display","none");
            $("#tire").css("display","none");
            */
        }
        else if(dept == 2){
            $('#table1').bootstrapTable({
                columns: [
                    {radio: true, width:'5%'},
                    {field: 'objectname', title: '承运公司',align: 'center'},
                    {field: 'leakamount', title: '泄露异常', align: 'center'}
                ],
                dataType: 'json',
                height: 290,
                formatNoMatches: function () {
                    return '无符合条件的记录';
                }
            });
            /*
            $("#tire").css("display","none");
            $("#accident").css("display","none");
            $("#speed").css("display","none");
            $("#overweight").css("display","none");
            $("#tired").css("display","none");
            */
        }
        else if(dept == 3){
            $('#table1').bootstrapTable({
                columns: [
                    {radio: true, width:'5%'},
                    {field: 'objectname', title: '承运公司',align: 'center'},
                    {field: 'leakamount', title: '泄露异常', align: 'center'},
                    {field: 'accidentamount', title: '交通事故', align: 'center'}
                ],
                dataType: 'json',
                height: 290,
                formatNoMatches: function () {
                    return '无符合条件的记录';
                }
            });
            /*
            $("#tire").css("display","none");
            */
        }
        else if(dept == 4){
            $('#table1').bootstrapTable({
                columns: [
                    {radio: true, width:'5%'},
                    {field: 'objectname', title: '承运公司',align: 'center'},
                    {field: 'leakamount', title: '泄露异常', align: 'center'},
                    {field: 'tireamount', title: '胎压异常', align: 'center'},
                    {field: 'overspeedamount', title: '超速异常', align: 'center'},
                    {field: 'fatiguedrivingamount', title: '疲劳驾驶', align: 'center'},
                    {field: 'overloadamount', title: '超载异常', align: 'center'},
                    {field: 'accidentamount', title: '车辆事故', align: 'center'}
                ],
                dataType: 'json',
                height: 290,
                formatNoMatches: function () {
                    return '无符合条件的记录';
                }
            });
        }
        for(var i = 0; i < warntype[dept].length; i++){
            document.getElementById(warntype[dept][i]).style.display = "block";
        }

        initSelect(url_corporation,{token:token},$("#_corporationsid"),"name","sid");

        for(var i = 0; i < options.length; i++){
            var id = options[i].value;
            document.getElementById(id).style.display = "block";
        }
    }
    else{
            $('#table1').bootstrapTable({
                columns: [
                    {radio: true, width:'5%'},
                    {field: 'objectname', title: '名称',align: 'center'},
                    {field: 'lockamount', title: '安全锁异常', align: 'center'},
                    {field: 'leakamount', title: '泄露异常', align: 'center'},
                    {field: 'tireamount', title: '胎压异常', align: 'center'},
                    {field: 'overspeedamount', title: '超速异常', align: 'center'},
                    {field: 'fatiguedrivingamount', title: '疲劳驾驶', align: 'center'},
                    {field: 'overloadamount', title: '超载异常', align: 'center'},
                    {field: 'accidentamount', title: '车辆事故', align: 'center'},
                    {field: 'parkamount', title: '停车异常', align: 'center'},
                ],
                dataType: 'json',
                height: 290,
                formatNoMatches: function () {
                    return '无符合条件的记录';
                }
            });
        }
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
                url:_url_query,
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
                url:_url_query,
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
            {field: 'trucknumber', title: '车牌号',align: 'center'},
            {field: 'drivername', title: '驾驶员',align: 'center'},
            {field: 'warntype', title: '异常类型',align: 'center'},
            {field: 'warntime', title: '异常时间',align: 'center'},
            {field: 'gps', title: '地理坐标',align: 'center'},
            {field: 'status', title: '处理状态',align: 'center'}
        ],
        sortable:true,
        height:290,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
    _search();

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
            if(rows[i]["warntype"] == "安全锁异常"){
                if(cnt["lock"] == null){cnt["lock"] = 1;}
                else{cnt["lock"]++;}
            }
            else if(rows[i]["warntype"] == "泄露异常"){
                if(cnt["leak"] == null){cnt["leak"] = 1;}
                else{cnt["leak"]++;}
            }
            else if(rows[i]["warntype"] == "胎压异常"){
                if(cnt["tire"] == null){cnt["tire"] = 1;}
                else{cnt["tire"]++;}
            }
            else if(rows[i]["warntype"] == "油量异常"){
                if(cnt["fuel"] == null){cnt["fuel"] = 1;}
                else{cnt["fuel"]++;}
            }
            else if(rows[i]["warntype"] == "超速异常"){
                if(cnt["speed"] == null){cnt["speed"] = 1;}
                else{cnt["speed"]++;}
            }
            else if(rows[i]["warntype"] == "停车异常"){
                if(cnt["park"] == null){cnt["park"] = 1;}
                else{cnt["park"]++;}
            }
            else if(rows[i]["warntype"] == "疲劳驾驶"){
                if(cnt["tired"] == null){cnt["tired"] = 1;}
                else{cnt["tired"]++;}
            }
            else if(rows[i]["warntype"] == "急刹异常"){
                if(cnt["break"] == null){cnt["break"] = 1;}
                else{cnt["break"]++;}
            }
            else if(rows[i]["warntype"] == "车辆事故"){
                if(cnt["accident"] == null){cnt["accident"] = 1;}
                else{cnt["accident"]++;}
            }
            else if(rows[i]["warntype"] == "超载异常"){
                if(cnt["overload"] == null){cnt["overload"] = 1;}
                else{cnt["overload"]++;}
            }
        }
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

