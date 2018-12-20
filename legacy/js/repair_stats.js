/**
 * Created by sjq on 2017/8/10.
 */
var url_query = "http://120.76.219.196:85/basic_info/truck_info/truckmaintainstatistics_query";

function chart(rows) {
    var nums = {
        name: '维修次数',
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

    var xseries = [];
    var yseries = [];
    var nums_data = [];
    for(var i = 0; i < rows.length; i++){
        xseries[i] = rows[i].trucknumber;
        nums_data[i] = rows[i].maintaintimes;
    }
    nums["data"] = nums_data;
    yseries[0] = nums;

    var chart = document.getElementById("chart");
    chart.style.width = document.getElementById("panel").offsetWidth;
    bar(chart,xseries,yseries);
}

function bar(div,xseries,yseries) {
    var chart = echarts.init(div);
    var option = {
        title: {
            text: '车辆维修统计',
            x:'center'
        },
        legend: {
            data:['维修次数'],
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

function parmfun(param) {
    var param = {};
    param["token"] = token;
    param["limit"] = limit;
    param["corporationsid"] = corporationsid;
    var max = document.getElementById("max").value;
    var min = document.getElementById("min").value;
    var date = {};
    if(max.length != 0 || min.length != 0){
        if(max.length != 0){
            date["max"] = new Date(max).getTime();
        }
        if(min.length != 0){
            date["min"] = new Date(min).getTime();
        }
    }
    else{
        if($("#day").hasClass("active")){
            var today = new Date().setHours(0,0,0,0);
            min = today - 12*60*60*1000;
            max = today + 12*60*60*1000;
            date["min"] = min; date["max"] = max;
        }
        else if($("#month").hasClass("active")){
            max = new Date().getTime();
            min = max - 30*24*60*60*1000;
            date["min"] = min; date["max"] = max;
        }
        else if($("#year").hasClass("active")){
            max = new Date().getTime();
            min = max - 365*24*60*60*1000;
            date["min"] = min; date["max"] = max;
        }
    }
    date = JSON.stringify(date);
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
    return param;
}

$(document).ready(function() {

    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width:'5%'},
            {field: 'trucknumber', title: '车牌号',align: 'center'},
            {field: 'maintaintimes', title: '维修次数', align: 'center'}
        ],
        dataType: 'json',
        height: 300,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
    search();

});

