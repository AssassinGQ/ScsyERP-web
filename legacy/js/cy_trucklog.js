/**
 * Created by sjq on 2017/8/12.
 */
var url_query = "http://120.76.219.196:85/trucklogs/query_corporation";
var url_queryall = "http://120.76.219.196:85/trucklogs/query_corporation";
var url_queryone = "http://120.76.219.196:85/trucklogs/query_new";
var url_truck = "http://120.76.219.196:85/basic_info/truck_info/query";
var map;
var interval; //轮询函数实体
var cur_limit;

function truckinit() {
    $.ajax({
        url:url_truck,
        dataType:'json',
        type:'get',
        data:{token:token,truckstatus:1},
        timeout:500,
        async:false,
        success:function (response) {
            if(response.status == 0){
                var truckinfo = response.content.data;
                if(truckinfo.length != 0){
                    addOptions($("#trucksid"),truckinfo,"trucknumber","sid");
                }
            }
        }
    })
}
function tran_load(d) {
    for(var i = 0; i < d.length; i++){
        if(d[i].gpsx != null && d[i].gpsy != null){
            d[i]["gps"] = "经度=" + d[i].gpsx + ";" + "纬度=" + d[i].gpsy;
            var lock = d[i].lock;
            for(var j = 1; j <= 5; j++){
                d[i]["lock"+j] = lock.split("-")[j-1];
                if(d[i]["lock"+j] == 1){d[i]["lock"+j] = "关闭"}
                else if(d[i]["lock"+j] == 0){d[i]["lock"+j] = "打开"}
            }
        }
    }
    /*
    d[i]["lock1"] = d[i].lock.split("-")[0];
    d[i]["lock2"] = d[i].lock.split("-")[1];
    d[i]["lock3"] = d[i].lock.split("-")[2];
    */
    return d;
}
function regeocoder(xy) {  //逆地理编码
    var geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: "all"
    });
    geocoder.getAddress(xy, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
            var address = result.regeocode.formattedAddress; //返回地址描述
            $("#map_info").text(address);
        }
    });
    map.setZoomAndCenter(14, xy);
    var marker = new AMap.Marker({
        icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: xy
    });
    marker.setMap(map);
    $("#map_modal").modal();
}
function lunxun() {
    if(url_query == url_queryone){
        search();
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
                param_query["page"] = page;
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
                                $("#page1").bootstrapPaginator("show",page)
                            }
                        }
                        else{alert(decodeURI(response.msg));}
                    }
                })
            }
        };
        $("#page1").bootstrapPaginator(options);
        $("#total").text("共1页");
    }
    else{
        search();
    }
}
function formatter(value, row, index) {
    return [
        '<a>查看详情</a>'
    ].join('');
}

function speedcol(value, row, index) {
    var a = "";
    if(value > 80){
        a = '<span style="color:#FF0000">'+value+'</span>';
    }
    else{
        a = '<span style="color:#000000">'+value+'</span>';
    }
    return a;
}

function fuelcol(value, row, index) {
    var a = "";
    if(value < 20){
        a = '<span style="color:#FF0000">'+value+'</span>';
    }
    else{
        a = '<span style="color:#000000">'+value+'</span>';
    }
    return a;
}

function tempcol(value, row, index) {
    var a = "";
    if(value > 80){
        a = '<span style="color:#FF0000">'+value+'</span>';
    }
    else{
        a = '<span style="color:#000000">'+value+'</span>';
    }
    return a;
}

function tirecol(value, row, index) {
    var a = "";
    if(value > 1500){
        a = '<span style="color:#FF0000">'+value+'</span>';
    }
    else{
        a = '<span style="color:#000000">'+value+'</span>';
    }
    return a;
}

window.operateEvents = {
    'click a': function (e, value, row, index) {
        var trucknumber = row["trucknumber"];
        setCookie("trucknumber",trucknumber);
        window.open("cy_truckloginfo.html");
    }
};

$(document).ready(function() {

    truckinit();
    cur_limit = limit;
    map = new AMap.Map("map", {
        resizeEnable: true,
        zoom: 14
    });

    $("#btn_map").click(function () {
        var row =  $("#table1").bootstrapTable('getSelections')[0];
        if(row == null){
            alert("请选择条目");
            return;
        }
        $("#map_info").empty();
        var gps = row["gps"];
        var x = gps.split(';')[0].split('=')[1];
        var y = gps.split(';')[1].split('=')[1];
        var xy = []; xy[0] = x; xy[1] = y;
        regeocoder(xy);
    });

    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width:'5%'},
            {field: 'trucknumber', title: '&nbsp&nbsp&nbsp&nbsp车牌号&nbsp&nbsp&nbsp&nbsp', align: 'center',width:"8%"},
            {field: 'distance', title: '行驶里程(km)', align: 'center'},
            {field: 'speed', title: '车速(km/h)', formatter:'speedcol', align: 'center'},
            {field: 'fuelvol', title: '油量(升)', formatter:'fuelcol', align: 'center'},
            {field: 'lefttirepressure', title: '左胎胎压(kpa)', formatter:'tirecol', align: 'center'},
            {field: 'lefttiretemp', title: '左胎胎温(℃)', formatter:'tempcol',align: 'center'},
            {field: 'righttirepressure', title: '右胎胎压(kpa)', formatter:'tirecol', align: 'center'},
            {field: 'righttiretemp', title: '右胎胎温(℃)', formatter:'tempcol', align: 'center'},
            {field: 'lock1', title: '车顶前部锁',align: 'center'},
            {field: 'lock2', title: '车顶中部锁',align: 'center'},
            {field: 'lock3', title: '车顶下部锁',align: 'center'},
            {field: 'lock4', title: '左阀门锁',align: 'center'},
            {field: 'lock5', title: '右阀门锁',align: 'center'},
            {title: '查看详情', align:'center',formatter:'formatter',events:operateEvents}
        ],
        dataType: 'json',
        height: 290,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
    search();

    $("#search").click(function () {
        $("#realtime").val(1);
        clearInterval(interval);
        if(url_query == url_queryone){
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
                    param_query["page"] = page;
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
                                    $("#page1").bootstrapPaginator("show",page)
                                }
                            }
                            else{alert(decodeURI(response.msg));}
                        }
                    })
                }
            };
            $("#page1").bootstrapPaginator(options);
            $("#total").text("共1页");
        }
    });

    $("#trucksid").change(function () {
        var trucksid = $("#trucksid").val();
        if(trucksid == -1){
            limit = $("#limit").val();
            url_query = url_queryall;
        }
        else{
            url_query = url_queryone;
            limit = 1;
        }
    });

    $("#realtime").change(function () {
        var val = $("#realtime").val();
        if(val == 0){interval = setInterval(lunxun,5000);}
        else{clearInterval(interval);}
    });

});
