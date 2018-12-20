/**
 * Created by Administrator on 2017/9/24.
 */
/**
 * Created by sjq on 2017/8/12.
 */
var url_query = "http://120.76.219.196:85/trucklogs/query_new";
var url_truck = "http://120.76.219.196:85/basic_info/truck_info/query";
var map;


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
        if(d[i]["time"] >= 1505145600000 && d[i]["time"] <= 1505232000000){

            d[i]["time"] = new Date(d[i]["time"] + 24 * 3600 * 8 * 1000).toLocaleString()
        }
        else{
            d[i]["time"] = new Date(d[i]["time"]).toLocaleString();
        }
    }

    return d;
}

function parmfun() {
    var param = {};
    param["token"] = token;
    param["limit"] = limit;
    param["corporationsid"] = corporationsid;
    param["trucksid"] = 6;
    var date = $("#date").val();
    if(date.length != 0){
        var time = {};
        time["min"] = new Date(date).getTime();
        time["max"] = new Date(date).getTime() + 24 * 3600 * 1000;
        param["time"] = JSON.stringify(time);
    }
    return param;
}



$(document).ready(function() {

    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width:'5%'},
            {field: 'trucknumber', title: '&nbsp&nbsp&nbsp&nbsp车牌号&nbsp&nbsp&nbsp&nbsp', align: 'center',width:"8%"},
            {field: 'distance', title: '里程', align: 'center'},
            {field: 'speed', title: '车速', align: 'center'},
            {field: 'fuelvol', title: '油量',align: 'center'},
            {field: 'lefttirepressure', title: '左胎胎压',align: 'center'},
            {field: 'lefttiretemp', title: '左胎胎温',align: 'center'},
            {field: 'righttirepressure', title: '右胎胎压',align: 'center'},
            {field: 'righttiretemp', title: '右胎胎温',align: 'center'},
            {field: 'lock1', title: '锁1',align: 'center'},
            {field: 'lock2', title: '锁2',align: 'center'},
            {field: 'lock3', title: '锁3',align: 'center'},
            {field: 'lock4', title: '锁4',align: 'center'},
            {field: 'lock5', title: '锁5',align: 'center'},
            {field: 'time', title: '时间',align: 'center'}
        ],
        dataType: 'json',
        height: 290,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
    search();

    $("#search").click(function () {
        search();
    });

});
