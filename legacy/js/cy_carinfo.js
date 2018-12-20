/**
 * Created by sjq on 2017/4/8.
 */
var url_query = "http://120.76.219.196:85/basic_info/truck_info/truckarchives_query";
var url_update = "http://120.76.219.196:85/basic_info/truck_info/truckarchives_update";
var url_nianshen = "http://120.76.219.196:85/basic_info/truck_info/truckarchives_setannualduration";
var url_ershen = "http://120.76.219.196:85/basic_info/truck_info/truckarchives_setsecondduration";
var url_nianshentime = "http://120.76.219.196:85/basic_info/truck_info/truckarchives_setlastannual";
var url_ershentime = "http://120.76.219.196:85/basic_info/truck_info/truckarchives_setlastsecond";
var cursid;
function tran_load(d) {
    for(var i = 0; i < d.length; i++){
        if(d[i]["annalduration"] != null){
            d[i]["annalduration"] = d[i]["annalduration"] / (24*60*60*1000) + "天";
        }
        if(d[i]["secondduration"] != null){
            d[i]["secondduration"] = d[i]["secondduration"] / (24*60*60*1000) + "天";
        }
        if(d[i]["lastannualtime"] != null){
            d[i]["lastannualtime"] = new Date(d[i]["lastannualtime"]).toLocaleDateString();
        }
        if(d[i]["lastsecondtime"] != null){
            d[i]["lastsecondtime"] = new Date(d[i]["lastsecondtime"]).toLocaleDateString();
        }
    }
    return d;
}
function tran_submit(d) {
    if(d["annualduration"] != null){
        if(d["annualduration"] == 0){
            d["annualduration"] = 365*24*60*60*1000/2;
        }
        else if(d["annualduration"] == 1){
            d["annualduration"] = 365*24*60*60*1000;
        }
    }
    if(d["secondduration"] != null){
        if(d["secondduration"] == 0){
            d["secondduration"] = 30*24*60*60*1000;
        }
        else if(d["secondduration"] == 1){
            d["secondduration"] = 2*30*24*60*60*1000;
        }
        else if(d["secondduration"] == 2){
            d["secondduration"] = 3*30*24*60*60*1000;
        }
    }
    if(d["lastannualtime"] != null){
        d["lastannualtime"] = new Date(d["lastannualtime"]).getTime();
    }
    if(d["lastsecondtime"] != null){
        d["lastsecondtime"] = new Date(d["lastsecondtime"]).getTime();
    }
    return d;
}
$(document).ready(function() {
    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width:'4%'},
            {field: 'sid', title: '档案编号',align:'center'},
            {field: 'trucknumber', title: '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp车牌号&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp',align:'center'},
            {field: 'manname', title: '联系人',align:'center'},
            {field: 'manphone', title: '联系方式',align:'center'},
            {field: 'dlyszh', title: '道路运输证号',align:'center'},
            {field: 'jyfw', title: '经营范围',align:'center'},
            {field: 'cpys', title: '车辆颜色',align:'center'},
            {field: 'ygjg', title: '运管机构',align:'center'},
            {field: 'cx', title: '车型',align:'center'},
            {field: 'cxfl', title: '车型分类',align:'center'},
            {field: 'fdjh', title: '发动机号',align:'center'},
            {field: 'dph', title: '底盘号',align:'center'},
            {field: 'cljsdj', title: '技术等级',align:'center'},
            {field: 'annalduration', title: '年审周期',align:'center'},
            {field: 'lastannualtime', title: '上次年审时间',align:'center'},
            {field: 'secondduration', title: '二级审核周期',align:'center'},
            {field: 'lastsecondtime', title: '上次二级审核时间',align:'center'},
            {field: 'lastsecondcontent', title: '上次二级审核内容',align:'center'},
        ],
        striped:true,
        height:290,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
    search();

    $("#btn_period").click(function () {
        var row = $("#table1").bootstrapTable('getSelections')[0];
        if(row == null){
            alert("请选择条目");
            return;
        }
        cursid = $("#table1").bootstrapTable('getSelections')[0].sid;
        var annalduration = row["annalduration"];
        var secondduration = row["secondduration"];
        if(annalduration != null){
            document.getElementById("annualduration").value = annalduration;
        }
        if(secondduration != null){
            document.getElementById("secondduration").value = secondduration;
        }
        document.getElementById("period_info").innerText = "";
        $("#period_modal").modal();
    });
    $("#period").click(function () {
        var data = {};
        data["token"] = token;
        data["sid"] = cursid;
        var annualduration = document.getElementById("annualduration").value;
        var secondduration = document.getElementById("secondduration").value;
        var status1 = -1;
        var status2 = -1;
        if(annualduration.length != 0){
            data["annualduration"] = annualduration*24*60*60*1000;
            $.ajax({
                url:url_nianshen,
                type:'post',
                dataType:'json',
                data:data,
                async:false,
                success:function (response) {
                    status1 = response.status;
                },
                error:function () {
                    status1 = -1;
                }
            })
        }
        if(secondduration.length != 0){
            data["secondduration"] = secondduration*24*60*60*1000;
            $.ajax({
                url:url_ershen,
                type:'post',
                dataType:'json',
                data:data,
                async:false,
                success:function (response) {
                    status2 = response.status;
                },
                error:function () {
                    status2 = -1;
                }
            })
        }
        if(status1 == 0 && status2 == 0){
            document.getElementById("period_info").innerText = "提交成功";
        }
        else{
            document.getElementById("period_info").innerText = "提交失败";
        }
    });

    $("#btn_nianshen").click(function () {
        cursid = $("#table1").bootstrapTable('getSelections')[0].sid;
        document.getElementById("nianshen_info").innerText = "";
        $("#nianshen_modal").modal();
    });
    $("#nianshen").click(function () {
        var data = {};
        data["token"] = token;
        data["sid"] = cursid;
        var lastannualtime = document.getElementById("lastannualtime").value;
        if(lastannualtime.length != 0){
            data["lastannualtime"] = new Date(lastannualtime).getTime();
            $.ajax({
                url:url_nianshentime,
                type:'post',
                dataType:'json',
                data:data,
                async:false,
                success:function (response) {
                    document.getElementById("nianshen_info").innerText = decodeURI(response.msg);
                },
                error:function () {
                    document.getElementById("nianshen_info").innerText = "操作失败";
                }
            })
        }
    });

    $("#btn_ershen").click(function () {
        cursid = $("#table1").bootstrapTable('getSelections')[0].sid;
        document.getElementById("ershen_info").innerText = "";
        $("#ershen_modal").modal();
    });
    $("#ershen").click(function () {
        var data = {};
        data["token"] = token;
        data["sid"] = cursid;
        var lastsecondtime = document.getElementById("lastsecondtime").value;
        if(lastsecondtime.length != 0){
            data["lastsecondtime"] = new Date(lastsecondtime).getTime();
            data["lastsecondcontent"] = document.getElementById("lastsecondcontent").value;
            $.ajax({
                url:url_ershentime,
                type:'post',
                dataType:'json',
                data:data,
                async:false,
                success:function (response) {
                    document.getElementById("ershen_info").innerText = decodeURI(response.msg);
                },
                error:function () {
                    document.getElementById("ershen_info").innerText = "操作失败";
                }
            })
        }
    });

});
