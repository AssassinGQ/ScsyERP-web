/**
 * Created by sjq on 2017/7/29.
 */
var  url_trucklogs = "http://120.76.219.196:85/trucklogs/query";
function alarm() {
    document.getElementById("audio").play();
    $("#detail_info").empty();
    $('#detail_modal').modal();
}
$(document).ready(function() {
    $('.selectpicker').selectpicker({
        size: 10
    });

    $.ajax({
        url:url_trucklogs,
        type:'get',
        dataType:'json',
        data:{
        },
        success:function(response){
            alert(JSON.stringify(response))
        }
    });

    var socket = new WebSocket('ws://120.76.219.196:85/wsshake');
    socket.onopen = function(event) {
        var data = {};
        data["sid"] = sid;
        data["type"] = type;
        data["token"] = token;
        var json = JSON.stringify(data);
        socket.send(json);
        socket.onmessage = function(event) {
            alert(decodeURI(event.data));
        };
        socket.onclose = function(event) {
            console.log('Client notified socket has closed',event);
        };
    };

    $('#table1').bootstrapTable({
        columns: [
            {field: 'col1', title: '车牌',align: 'center'},
            {field: 'col2', title: '承运公司',align: 'center'},
            {field: 'col3', title: '事故类型',align: 'center'},
            {field: 'col4', title: '事故时间',align: 'center'},
            {field: 'col5', title: '事故地点',align: 'center'},
            {field: 'col5', title: '处理状态',align: 'center'}
        ],
        height:290,
        clickToSelect:true,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
    var row = {"col1":"1","col2":"2","col3":"1","col4":"3","col5":"5"};
    $("#table1").bootstrapTable("load",[row]);

    $("#btn_detail").click(function () {
        $("#detail_info").empty();
        $('#detail_modal').modal();
    });

});
