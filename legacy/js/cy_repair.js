/**
 * Created by sjq on 2017/6/5.
 */
var url_add = "http://120.76.219.196:85/basic_info/truck_info/truckmaintain_add";
var url_query = "http://120.76.219.196:85/basic_info/truck_info/truckmaintain_query";
var url_delete = "http://120.76.219.196:85/basic_info/truck_info/truckmaintain_delete";
var url_update = "http://120.76.219.196:85/basic_info/truck_info/truckmaintain_update";
var url_truck = "http://120.76.219.196:85/basic_info/truck_info/query";

function tran_load(d){
    for(var i = 0; i < d.length; i++){
        if(d[i]["bxq"] != null){
            d[i]["bxq"] = d[i]["bxq"] / (24*60*60*1000) + "天";
        }
    }return d;
}
function tran_submit(data) {
    if(data["ccrq"] != null){
        data["ccrq"] = new Date(data["ccrq"]).getTime();
    }
    if(data["jcrq"] != null){
        data["jcrq"] = new Date(data["jcrq"]).getTime();
    }
    if(data["bxq"] != null){
        data["bxq"] = data["bxq"]*24*60*60*1000;
    }
    return data;
}
function truckinit() {
    $.ajax({
        url:url_truck,
        dataType:'json',
        type:'get',
        data:{token:token},
        timeout:500,
        async:false,
        success:function (response) {
            if(response.status == 0){
                var truckinfo = [];
                truckinfo = response.content.data;
                var select = document.getElementById("trucksid");
                select.options[0] = new Option("",-1);
                for(var i = 0; i < truckinfo.length; i++){
                    select.options[i+1] = new Option(truckinfo[i].trucknumber,truckinfo[i].sid);
                }
            }
        }
    })
}

$(document).ready(function() {

    truckinit();

    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width:'5%'},
            {field: 'trucknumber', title: '车牌号',align:'center'},
            {field: 'dph', title: '底盘号', align:'center'},
            {field: 'wxdh', title: '维修单号', align:'center'},
            {field: 'txf', title: '托修方',align:'center'},
            {field: 'txfdh', title: '联系方式',align:'center'},
            {field: 'wxnr', title: '维修内容', align:'center'},
            {field: 'fyhj', title: '费用费用', align:'center'},
            {field: 'bxq', title: '保鲜期',align:'center'}
        ],
        striped:true,
        height:320,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
    search();
});
