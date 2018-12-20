/**
 * Created by sjq on 2017/6/20.
 */
var url_query = "http://120.76.219.196:85/basic_info/seller_info/query";
var url_delete = "http://120.76.219.196:85/basic_info/seller_info/delete";
var parm_query = {};
var parm_delete = {};
var d = {};
var response;
var total;
var limit = "10";
var cur_page;

function tranresponse(d) {
    return d;
}
function ajaxfun(type,url,data,success,async,error) {
    $.ajax({type:type,url:url,dataType:"json",data:data,success:success,async:async,error:error});
}
function success_query(data) {
    response = data;
}
function success_delete(data){}
function error(){alert("操作失败")}
function parmfun() {
    var parm = {};
    parm["limit"] = limit;
    if($("#search_carid").val() != "")
    {
        parm["trucknumber"] = $("#search_carid").val();
    }
    return parm;
}
function load(table) {
    if(response.content != "")
    {
        total = response.content.total;
        d = response.content.data;
        d = tranresponse(d);
        $(table).bootstrapTable('load',d);
    }
    else{
        $(table).bootstrapTable('removeAll');
    }

}
function search(page,table,yema) {
    var yema1 = '#'+yema;
    cur_page = page;
    parm_query = parmfun();
    parm_query["page"] = page;
    ajaxfun("get",url_query,parm_query,success_query,false,error);
    load(table);
    $(yema1).remove();
    var div=$('<div></div>');
    div.attr('id',yema);            //给子div设置id
    div.addClass('tcdPageCode');
    $("#panel").append(div);
    $(yema1).createPage({
        pageCount:Math.ceil(total/limit),
        current:1,
        backFn:function(p){
            parm_query["page"] = p;
            cur_page = p;
            ajaxfun("get",url_query,parm_query,success_query,false);
            load(table);
            return false;
        }
    })
}

$(document).ready(function() {

    /*
     $("#add_form").validate({
     rules: {
     phone:{
     minlength: 11,
     maxlength: 11
     }
     },
     messages:{
     phone:{
     minlength: "长度为11位",
     maxlength: "长度为11位"
     }
     }
     });
     */
    $('#add_form').submit(function(){
        $(this).ajaxSubmit({
            type:"post",
            url:"http://120.76.219.196:85/basic_info/seller_info/create",
            success:function (data) {
                var status = JSON.parse(data).status;
                if(status == "0")
                {
                    document.getElementById("add_info").innerHTML = "操作成功";
                }
                else
                {
                    document.getElementById("add_info").innerHTML = "操作失败";
                }
            },
            error:function () {
                document.getElementById("add_info").innerHTML = "操作失败";
            }
        });
        return false;
    });
    $("#btn_add").click(function () {
        $("#add_info").empty();
        $('#add_modal').modal();
    });

    $("#search").click(function () {
        search("1","#table1","page");
    });

    $("#btn_mend").click(function () {
        $("#mend_info").empty();
        var form = document.getElementById("mend_form");
        var elements = form.getElementsByTagName('input');
        for(var j = 0; j < elements.length; j++) {
            if(elements[j].type != "submit")
            {
                var name = elements[j].name;
                var data = $("#table1").bootstrapTable('getSelections')[0][name];
                if(data != null)
                {
                    elements[j].value = data;
                }
            }
        }
        $('#mend_modal').modal();
    });
    $('#mend_form').submit(function(){
        /*
         var date1 = new Date($("#mRTCtime1").val());
         if(date1=="Invalid Date")
         {
         $("#RTCtime").val("");
         }
         else
         {
         $("#mRTCtime").val(date1.getTime());
         }
         var date2 = new Date($("#mRTCddl1").val());
         if(date2=="Invalid Date")
         {
         $("#mRTCddl").val("");
         }
         else
         {
         $("#mRTCddl").val(date2.getTime());
         }
         */

        $(this).ajaxSubmit({
            type:"post",
            url:"http://120.76.219.196:85/basic_info/seller_info/update",
            success:function (data) {
                var status = JSON.parse(data).status;
                if(status == "0")
                {
                    document.getElementById("mend_info").innerHTML = "操作成功";
                    parm_query["page"] = cur_page;
                    ajaxfun("get",url_query,parm_query,success_query,false,error);
                    load("#table1");
                }
                else
                {
                    document.getElementById("mend_info").innerHTML = "操作失败";
                }
            },
            error:function () {
                document.getElementById("mend_info").innerHTML = "操作失败";
            }
        });
        return false;
    });

    $("#btn_delete").click(function () {
        parm_delete["sid"] = $("#table1").bootstrapTable('getSelections')[0].sid;
        parm_delete["token"] = "1234";
        ajaxfun("post",url_delete,parm_delete,success_delete,false,error);
        parm_query["page"] = cur_page;
        ajaxfun("get",url_query,parm_query,success_query,false,error);
        load("#table1");
    });

    $('#table1').bootstrapTable({
        columns: [
            {radio: true, width:'5%'},
            {field: 'name', title: '车牌号', width:'10%',align:'center'},
            {field: 'manname', title: 'VIN号', width:'10%',align:'center'},
            {field: 'phone', title: '部件名称', width:'10%',align:'center'},
            {field: 'address', title: '型号规格', width:'10%',align:'center'},
            {field: 'address', title: '更换日期', width:'10%',align:'center'},
            {field: 'address', title: '生产厂家', width:'10%',align:'center'},
            {field: 'address', title: '部件编号', width:'10%',align:'center'},
            {field: 'address', title: '维修单位', width:'10%',align:'center'}
        ],
        striped:true,
        height:320,
        formatNoMatches: function () {
            return '无符合条件的记录';
        }
    });
});
