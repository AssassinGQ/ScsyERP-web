var url_query = "http://120.76.219.196:85/trucklogs/query_corporation";
var url_queryall = "http://120.76.219.196:85/trucklogs/query_corporation";
var url_querynone = "http://120.76.219.196:85/trucklogs/query_new";
var url_truck = "http://120.76.219.196:85/basic_info/truck_info/query";
var location = "";

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
                var options = "<option value='-1'></option>";
                for(var i = 0; i < truckinfo.length; i++){
                    options += "<option value='"+truckinfo[i].sid+"'>"+truckinfo[i].trucknumber+"</option>";
                }
                $("#trucksid").empty();
                $("#trucksid").append(options);
                //更新内容刷新到相应的位置
                $('#trucksid').selectpicker('render');
                $('#trucksid').selectpicker('refresh');
            }
        }
    })
}
function tran_load(d) {
    for(var i = 0; i < d.length; i++){
        if(d[i].gpsx != null && d[i].gpsy != null){
            var xy = [];
            xy[0] = d[i].gpsx; xy[1] = d[i].gpsy;
        }
    }
    return d;
}
/*
function regeocoder(lnglatXY) {  //逆地理编码
    var geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: "all"
    });
    geocoder.getAddress(lnglatXY, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
            address(result)
        }
    });

}

function address(result) {
    var str = result.regeocode.formattedAddress;
    alert(str)
}
*/
$(document).ready(function() {

    var lnglatXY;
    $('.selectpicker').selectpicker({
        size: 10
    });
    truckinit();
    var interval;
    $("#realtime").change(function () {
        var val = $("#realtime").val();
        /*
        if(val == 0){
            interval = setInterval(search,5000);
        }
        else{
            clearInterval(interval);
        }
        */
    });

    var map = new AMap.Map('map',{
        zoom: 12,
        center:[114.396574, 37.992706]//new AMap.LngLat(116.39,39.9)
    });


    $("#btn_map").click(function () {
        var lnglatXY = [115.396574, 37.992706];
        regeocoder(lnglatXY);
        $('#map_modal').modal();
    });

    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width:'5%'},
            {field: 'carid', title: '车牌号', width: '10%', align: 'center'},
            {field: 'speed', title: '车速', width: '10%', align: 'center'},
            {field: 'oil', title: '油量', width: '10%', align: 'center'},
            {field: 'lock1', title: '左胎胎压', width: '10%', align: 'center'},
            {field: 'lock2', title: '右胎胎压', width: '10%', align: 'center'},
            {field: 'location', title: '位置', width: '25%', align: 'center'}
        ],
        dataType: 'json',
        height: 290,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });

    $("#search1").click(function () {
        var trucksid = $("#trucksid").val();
        if(trucksid == -1){
            url_query = url_queryall;
        }
        else{
            url_query = url_querynone;
        }
        clearInterval(interval);
        search();
    });


//    search()




});
